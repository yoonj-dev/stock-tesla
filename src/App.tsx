import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { SingleStockTerminal } from './components/dashboard/SingleStockTerminal';
import { Footer } from './components/layout/Footer';
import { ThemeMode, getStoredThemeMode, applyThemeToDom, resolveTheme } from './lib/theme';
import { StockFundamentals } from './types/stock';
import { TESLA_PROFILE } from './lib/profiles/teslaProfile';

const MOCK_TESLA_DATA: StockFundamentals = {
  ticker: 'TSLA',
  symbol: 'TSLA',
  currentPrice: 269.19,
  previousClose: 260.48,
  change: 8.71,
  changePercent: 3.34,
  marketState: 'REGULAR',
  marketCap: 860000000000,
  trailingPE: 68.4,
  forwardPE: 74.2,
  priceToBook: 12.8,
  pegRatio: 2.85,
  fiftyTwoWeekLow: 138.80,
  fiftyTwoWeekHigh: 273.54,
  targetMeanPrice: 285.0,
  targetHighPrice: 350.0,
  targetLowPrice: 120.0,
};

export const App: React.FC = () => {
  const [currentThemeMode, setCurrentThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const [stockData, setStockData] = useState<StockFundamentals>(MOCK_TESLA_DATA);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    applyThemeToDom(currentThemeMode, true);
  }, [currentThemeMode]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setStockData((prev) => ({
        ...prev,
        currentPrice: Number((prev.currentPrice + (Math.random() * 1.5 - 0.75)).toFixed(2)),
      }));
      setIsRefreshing(false);
    }, 600);
  };

  const resolvedTheme = resolveTheme(currentThemeMode);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors">
      <Header
        currentThemeMode={currentThemeMode}
        onThemeModeChanged={setCurrentThemeMode}
        fundamentals={stockData}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-5">
        <SingleStockTerminal
          profile={TESLA_PROFILE}
          fundamentals={stockData}
          resolvedTheme={resolvedTheme}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </main>

      <Footer />
    </div>
  );
};
