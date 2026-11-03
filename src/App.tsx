import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { SingleStockTerminal } from './components/dashboard/SingleStockTerminal';
import { Footer } from './components/layout/Footer';
import { ThemeMode, getStoredThemeMode, applyThemeToDom, resolveTheme } from './lib/theme';
import { fetchStockData } from './lib/stockApi';
import { StockData, StockFundamentals } from './types/stock';
import { TESLA_PROFILE } from './lib/profiles/teslaProfile';

const BASELINE_TESLA_DATA: StockFundamentals = {
  ticker: 'TSLA',
  symbol: 'TSLA',
  currentPrice: 401.34,
  previousClose: 403.93,
  change: -2.59,
  changePercent: -0.64,
  marketState: 'OVERNIGHT',
  marketCap: 1280000000000,
  trailingPE: 68.4,
  forwardPE: 74.2,
  priceToBook: 12.8,
  pegRatio: 2.85,
  fiftyTwoWeekLow: 138.80,
  fiftyTwoWeekHigh: 414.19,
  targetMeanPrice: 413.10,
  targetHighPrice: 500.0,
  targetLowPrice: 120.0,
};

export const App: React.FC = () => {
  const [currentThemeMode, setCurrentThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const [teslaData, setTeslaData] = useState<StockData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    applyThemeToDom(currentThemeMode, true);
  }, [currentThemeMode]);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchStockData('TSLA');
      if (data?.fundamentals) {
        setTeslaData(data);
      }
    } catch (err) {
      console.warn('[App] Failed to refresh live data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fundamentals = teslaData?.fundamentals || BASELINE_TESLA_DATA;
  const candles = teslaData?.candles?.['1d_intraday'] || [];
  const resolvedTheme = resolveTheme(currentThemeMode);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f7] dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors">
      <Header
        currentThemeMode={currentThemeMode}
        onThemeModeChanged={setCurrentThemeMode}
        fundamentals={fundamentals}
        isRefreshing={isRefreshing}
        onRefresh={loadData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-5">
        <SingleStockTerminal
          profile={TESLA_PROFILE}
          fundamentals={fundamentals}
          candles={candles}
          resolvedTheme={resolvedTheme}
          isRefreshing={isRefreshing}
          onRefresh={loadData}
        />
      </main>

      <Footer />
    </div>
  );
};
