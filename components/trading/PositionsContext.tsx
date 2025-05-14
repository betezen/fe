import React, { createContext, useContext, useState, useCallback } from "react";

type Position = {
  positionId: number;
  countryId: string;
  trader: string;
  direction: number;
  size: number;
  leverage: number;
  entryPrice: number;
  openTime: number;
  takeProfit: number;
  stopLoss: number;
  isOpen: boolean;
  liquidationPrice: number;
};

type TradeHistoryItem = {
  id: string;
  positionId: string;
  type: "open" | "close" | "liquidation";
  date: Date;
  country: {
    id: string;
    name: string;
    flagUrl?: string;
  };
  direction: number;
  size: number;
  leverage: number;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  fundingFee?: number;
  txHash?: string;
};

type PositionsContextType = {
  positions: Position[];
  tradeHistory: TradeHistoryItem[];
  loading: boolean;
  error: string | null;
  refreshPositionsFn: (() => void) | null;
  setRefreshPositionsFn: (fn: () => void) => void;
  triggerRefresh: () => void;
  addPosition: (position: Position) => void;
  closePosition: (
    id: string,
    exitPrice?: number,
    pnl?: number,
    fundingFee?: number
  ) => void;
  addTradeToHistory: (trade: TradeHistoryItem) => void;
  updatePosition: (positionId: string, updates: Partial<Position>) => void;
  removePosition: (positionId: string) => void;
};

const PositionsContext = createContext<PositionsContextType>({
  positions: [],
  tradeHistory: [],
  loading: false,
  error: null,
  refreshPositionsFn: null,
  setRefreshPositionsFn: () => {},
  triggerRefresh: () => {},
  addPosition: () => {},
  closePosition: () => {},
  addTradeToHistory: () => {},
  updatePosition: () => {},
  removePosition: () => {},
});

export const PositionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [refreshPositionsFn, setRefreshPositionsFn] = useState<
    (() => void) | null
  >(null);

  const [positions, setPositions] = useState<Position[]>([]);
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerRefresh = useCallback(() => {
    if (refreshPositionsFn) {
      refreshPositionsFn();
    }
  }, [refreshPositionsFn]);

  const addPosition = useCallback(
    (position: Position) => {
      // Add position to state
      setPositions((prev) => [...prev, position]);

      // Add to history as 'open'
      const openTrade: TradeHistoryItem = {
        id: `trade-${Date.now()}-open`,
        positionId: position.positionId.toString(),
        type: "open",
        date: new Date(),
        country: {
          id: position.countryId,
          name: position.countryId, // Use this or map to a real name
        },
        direction: position.direction,
        size: position.size,
        leverage: position.leverage,
        entryPrice: position.entryPrice,
      };

      setTradeHistory((prev) => [...prev, openTrade]);

      // Store in localStorage if needed
      try {
        localStorage.setItem(
          "realPositions",
          JSON.stringify([...positions, position])
        );
      } catch (e) {
        console.error("Error saving positions to localStorage:", e);
      }
    },
    [positions]
  );

  const closePosition = useCallback(
    (id: string, exitPrice?: number, pnl?: number, fundingFee?: number) => {
      // Find position
      const position = positions.find((p) => p.positionId.toString() === id);
      if (!position) return;

      // Remove from active positions
      setPositions((prev) =>
        prev.filter((p) => p.positionId.toString() !== id)
      );

      // Add to history as 'close'
      const closeTrade: TradeHistoryItem = {
        id: `trade-${Date.now()}`,
        positionId: id,
        type: "close",
        date: new Date(),
        country: {
          id: position.countryId,
          name: position.countryId, // Use this or map to a real name
        },
        direction: position.direction,
        size: position.size,
        leverage: position.leverage,
        entryPrice: position.entryPrice,
        exitPrice: exitPrice || 0, // Use a default if not provided
        pnl,
        fundingFee,
      };

      setTradeHistory((prev) => [...prev, closeTrade]);

      // Update localStorage
      try {
        localStorage.setItem(
          "realPositions",
          JSON.stringify(
            positions.filter((p) => p.positionId.toString() !== id)
          )
        );
      } catch (e) {
        console.error("Error saving positions to localStorage:", e);
      }
    },
    [positions]
  );

  const addTradeToHistory = useCallback((trade: TradeHistoryItem) => {
    setTradeHistory((prev) => [...prev, trade]);
  }, []);

  const updatePosition = useCallback(
    (positionId: string, updates: Partial<Position>) => {
      setPositions((prev) =>
        prev.map((p) =>
          p.positionId.toString() === positionId ? { ...p, ...updates } : p
        )
      );

      // Update localStorage
      try {
        localStorage.setItem(
          "realPositions",
          JSON.stringify(
            positions.map((p) =>
              p.positionId.toString() === positionId ? { ...p, ...updates } : p
            )
          )
        );
      } catch (e) {
        console.error("Error saving positions to localStorage:", e);
      }
    },
    [positions]
  );

  const removePosition = useCallback(
    (positionId: string) => {
      setPositions((prev) =>
        prev.filter((p) => p.positionId.toString() !== positionId)
      );

      // Update localStorage
      try {
        localStorage.setItem(
          "realPositions",
          JSON.stringify(
            positions.filter((p) => p.positionId.toString() !== positionId)
          )
        );
      } catch (e) {
        console.error("Error saving positions to localStorage:", e);
      }
    },
    [positions]
  );

  return (
    <PositionsContext.Provider
      value={{
        positions,
        tradeHistory,
        loading,
        error,
        refreshPositionsFn,
        setRefreshPositionsFn,
        triggerRefresh,
        addPosition,
        closePosition,
        addTradeToHistory,
        updatePosition,
        removePosition,
      }}
    >
      {children}
    </PositionsContext.Provider>
  );
};

export const usePositionsStore = () => useContext(PositionsContext);
