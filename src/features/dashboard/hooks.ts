"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "@/lib/api/errors";
import { formatNumber, formatPaise } from "@/lib/format";
import {
  getPropertyStatusClass,
  mapPropertyStatus
} from "@/lib/mappers/property";
import { summarizePortfolios } from "@/lib/mappers/portfolio";
import { loadDashboardData } from "@/lib/services/dashboard-api-service";

type DashboardMetric = {
  label: string;
  value: string;
  trend: string;
  trendIcon: string;
  trendClass: string;
  valueClass: string;
  icon: string;
};

type DashboardDetailMetric = {
  label: string;
  value: string;
  icon: string;
  iconClass: string;
  valueClass?: string;
  footerLabel: string;
};

type RecentPropertyRow = {
  name: string;
  type: string;
  valuation: string;
  status: string;
  statusClass: string;
  broker: string;
  highlighted: boolean;
};

type LiveOrderRow = {
  symbol: string;
  detail: string;
  price: string;
  time: string;
  borderClass: string;
  priceClass: string;
};

type DashboardPageData = {
  error: string | null;
  isLoading: boolean;
  topMetrics: DashboardMetric[];
  detailMetrics: DashboardDetailMetric[];
  chartBars: Array<{ height: string; value: string; active: boolean }>;
  recentProperties: RecentPropertyRow[];
  liveOrders: LiveOrderRow[];
};

const EMPTY_METRICS: DashboardPageData = {
  error: null,
  isLoading: true,
  topMetrics: [],
  detailMetrics: [],
  chartBars: [],
  recentProperties: [],
  liveOrders: []
};

export const useDashboardPageData = (): DashboardPageData => {
  const [data, setData] = useState<DashboardPageData>(EMPTY_METRICS);

  const fetchDashboard = useCallback(async () => {
    setData((current) => ({ ...current, isLoading: true, error: null }));

    try {
      const dashboardData = await loadDashboardData();
      const propertyCount = dashboardData.properties.length;
      const activeIpoCount = dashboardData.ipos.length;
      const openOrderCount = dashboardData.openOrders.length;
      const investorCount = dashboardData.userPortfolios.length;
      const portfolioSummary = summarizePortfolios(dashboardData.userPortfolios);
      const totalInvested = formatPaise(portfolioSummary.totalInvested);
      const totalCurrent = formatPaise(portfolioSummary.totalCurrent);

      const recentProperties = dashboardData.properties.slice(0, 3).map(
        (property, index) => ({
          name: property.title,
          type: property.propertyType ?? "Property",
          valuation: formatPaise(property.valuation),
          status: mapPropertyStatus(property.status),
          statusClass: getPropertyStatusClass(mapPropertyStatus(property.status)),
          broker: property.listingBroker ?? "—",
          highlighted: index === 1
        })
      );

      const liveOrders = dashboardData.openOrders.slice(0, 4).map((order) => {
        const isBuy = order.side === "BUY";
        return {
          symbol: order.propertyTitle,
          detail: `${isBuy ? "Buy" : "Sell"} • ${order.remainingQuantity ?? "—"} Units`,
          price: formatPaise(order.price),
          time: "Live",
          borderClass: isBuy ? "border-primary" : "border-error",
          priceClass: isBuy ? "text-primary" : "text-on-surface"
        };
      });

      const topMetrics: DashboardMetric[] = [
        {
          label: "Total Properties",
          value: formatNumber(propertyCount),
          trend: "Live",
          trendIcon: "trending_up",
          trendClass: "text-primary",
          valueClass: "text-on-surface",
          icon: "domain"
        },
        {
          label: "Active IPOs",
          value: formatNumber(activeIpoCount),
          trend: "Live",
          trendIcon: "rocket",
          trendClass: "text-secondary",
          valueClass: "text-secondary",
          icon: "rocket_launch"
        },
        {
          label: "Total Investors",
          value: formatNumber(investorCount),
          trend: "Live",
          trendIcon: "trending_up",
          trendClass: "text-primary",
          valueClass: "text-on-surface",
          icon: "group"
        },
        {
          label: "Portfolio Value",
          value: totalCurrent,
          trend: "Live",
          trendIcon: "payments",
          trendClass: "text-primary",
          valueClass: "text-primary",
          icon: "account_balance_wallet"
        },
        {
          label: "Total Invested",
          value: totalInvested,
          trend: "Live",
          trendIcon: "bar_chart",
          trendClass: "text-primary",
          valueClass: "text-on-surface",
          icon: "bar_chart"
        },
        {
          label: "Orders Pending",
          value: `${formatNumber(openOrderCount)} Orders`,
          trend: "Live book",
          trendIcon: "pending",
          trendClass: "text-tertiary",
          valueClass: "text-tertiary",
          icon: "pending"
        }
      ];

      const detailMetrics: DashboardDetailMetric[] = [
        {
          label: "Active Properties",
          value: formatNumber(propertyCount),
          icon: "domain",
          iconClass: "text-primary",
          footerLabel: "From GET /properties"
        },
        {
          label: "Active IPOs",
          value: formatNumber(activeIpoCount),
          icon: "rocket_launch",
          iconClass: "text-secondary",
          valueClass: "text-secondary",
          footerLabel: "From GET /ipos?active=true"
        },
        {
          label: "Investors",
          value: formatNumber(investorCount),
          icon: "group",
          iconClass: "text-tertiary",
          valueClass: "text-tertiary",
          footerLabel: "From GET /portfolio"
        },
        {
          label: "Orders Pending",
          value: `${formatNumber(openOrderCount)} Orders`,
          icon: "pending",
          iconClass: "text-tertiary",
          valueClass: "text-tertiary",
          footerLabel: "From GET /orders/all"
        }
      ];

      const chartBars =
        recentProperties.length > 0
          ? recentProperties.map((property, index) => ({
              height: `${55 + index * 15}%`,
              value: property.valuation,
              active: index === recentProperties.length - 1
            }))
          : [];

      setData({
        error: null,
        isLoading: false,
        topMetrics,
        detailMetrics,
        chartBars,
        recentProperties,
        liveOrders
      });
    } catch (loadError) {
      setData({
        ...EMPTY_METRICS,
        error: getErrorMessage(
          loadError,
          "Could not load dashboard data from the backend."
        ),
        isLoading: false
      });
    }
  }, []);

  // useEffect justified: data fetch — load dashboard data on mount
  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return useMemo(() => data, [data]);
};
