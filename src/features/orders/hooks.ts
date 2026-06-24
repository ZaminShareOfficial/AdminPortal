"use client";

import { useCallback, useEffect, useState } from "react";
import { mapOpenOrderToRow, mapOrderToFeedItem } from "@/features/orders/mappers";
import { listOpenOrders } from "@/features/orders/services/open-orders";
import { getErrorMessage } from "@/lib/api/errors";
import type { OrdersPageData } from "@/features/orders/types";

const FEED_ITEM_LIMIT = 8;

type OrdersPageState = OrdersPageData & {
  isLoading: boolean;
};

export const useOrdersPageData = (): OrdersPageState => {
  const [orders, setOrders] = useState<OrdersPageState["orders"]>([]);
  const [feed, setFeed] = useState<OrdersPageState["feed"]>([]);
  const [openOrderCount, setOpenOrderCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const openOrders = await listOpenOrders();
      setOrders(openOrders.map(mapOpenOrderToRow));
      setFeed(openOrders.slice(0, FEED_ITEM_LIMIT).map(mapOrderToFeedItem));
      setOpenOrderCount(openOrders.length);
    } catch (loadError) {
      setOrders([]);
      setFeed([]);
      setOpenOrderCount(0);
      setError(getErrorMessage(loadError, "Could not load orders from the backend."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect justified: data fetch — load orders on mount
  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  return { orders, feed, openOrderCount, error, isLoading };
};
