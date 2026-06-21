"use client";

import { Button, Modal } from "@heroui/react";
import { formatPaise, formatRelativeTime } from "@/lib/format";
import type { TradeResponse } from "@/types/backend";

type OrderTradesModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  orderLabel: string;
  trades: TradeResponse[];
  isLoading: boolean;
  error: string | null;
};

export const OrderTradesModal = ({
  isOpen,
  onOpenChange,
  orderLabel,
  trades,
  isLoading,
  error
}: OrderTradesModalProps) => (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Heading>Order trades</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-4 text-xs text-on-surface-variant">
              GET /orders/{orderLabel}/trades
            </p>
            {error ? (
              <p className="text-sm text-error" role="alert">
                {error}
              </p>
            ) : null}
            {isLoading ? (
              <p className="text-sm text-on-surface-variant">Loading trades...</p>
            ) : trades.length === 0 ? (
              <p className="text-sm text-on-surface-variant">
                No trades recorded for this order yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {trades.map((trade) => (
                  <li
                    key={trade.tradeId}
                    className="rounded bg-surface-container-low p-3 text-xs"
                  >
                    <p className="font-bold text-on-surface">
                      {trade.side} · {trade.quantity ?? "—"} tokens
                    </p>
                    <p className="text-on-surface-variant">
                      {formatPaise(trade.price)} · {formatRelativeTime(trade.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onPress={() => onOpenChange(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal>
);
