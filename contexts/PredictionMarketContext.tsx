"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface PredictionMarketContextType {
  isLoading: boolean;
  isDemo: boolean;
  contractHandler: any;
  error: string | null;
}

const PredictionMarketContext = createContext<PredictionMarketContextType>({
  isLoading: true,
  isDemo: true,
  contractHandler: null,
  error: null,
});

export function PredictionMarketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


}
