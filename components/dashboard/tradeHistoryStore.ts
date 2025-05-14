import { create } from 'zustand';

export interface TradeHistoryItem {
  id?: string;
  country: string;
  countryCode: string;
  time: string;
  entryPrice: string;
  marketPrice: string;
  pnl: {
    amount: string;
    percentage: string;
    isProfit: boolean;
  };
  status: string;
}

interface TradeHistoryState {
  history: TradeHistoryItem[];
  addTrade: (trade: TradeHistoryItem) => void;
  updateTrade: (id: string, updates: Partial<TradeHistoryItem>) => void;
}

export const useTradeHistoryStore = create<TradeHistoryState>((set) => ({
  history: [],
  addTrade: (trade) => set((state) => {
    const newTrade = {
      ...trade,
      id: trade.id || `trade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    return { history: [newTrade, ...state.history] };
  }),
  updateTrade: (id, updates) => set((state) => ({
    history: state.history.map(trade => 
      trade.id === id ? { ...trade, ...updates } : trade
    )
  }))
})); 