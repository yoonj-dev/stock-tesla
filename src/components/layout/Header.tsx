import React, { useState } from 'react';
import {
  MoreVertical,
  Beer,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { ThemeMode } from '../../lib/theme';
import { formatCurrency, formatPercent } from '../../lib/stockApi';
import { StockFundamentals } from '../../types/stock';

interface HeaderProps {
  currentThemeMode: ThemeMode;
  onThemeModeChanged: (mode: ThemeMode) => void;
  fundamentals: StockFundamentals;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentThemeMode,
  onThemeModeChanged,
  fundamentals,
  isRefreshing,
  onRefresh,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isPositive = (fundamentals.change ?? 0) >= 0;

  const handleDonate = () => {
    if (typeof window !== 'undefined' && (window as any).BrandUI?.openDonate) {
      (window as any).BrandUI.openDonate();
    } else {
      window.open('https://brand-ui.on-tap.xyz/donate', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#09090b]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-15 flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#E82127] p-1 flex items-center justify-center text-white font-black text-lg shadow-xs">
              T
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                  Tesla on Tap
                </span>
                <span className="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 font-mono text-[10px] font-bold border border-rose-500/20">
                  TSLA
                </span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                로보택시 & 메가팩 AI 퀀트 인텔리전스
              </p>
            </div>
          </a>
        </div>

        {/* Center: Live Quick Ticker */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800 font-mono text-xs">
          <span className="font-extrabold text-slate-900 dark:text-white">TSLA</span>
          <span className="font-black text-sm">{formatCurrency(fundamentals.currentPrice)}</span>
          <div className={`flex items-center gap-0.5 font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" /> : <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />}
            <span>{isPositive ? '+' : ''}{fundamentals.change?.toFixed(2)}</span>
            <span>({formatPercent(fundamentals.changePercent || 0)})</span>
          </div>
        </div>

        {/* Right: Controls & Context Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Stock on Tap Direct Header Link */}
          <a
            href="https://stock.on-tap.xyz/?symbol=TSLA"
            target="_blank"
            rel="noopener noreferrer"
            title="Stock on Tap 전체 주식 퀀트 플랫폼으로 이동"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-rose-200/80 dark:border-rose-900/40 bg-rose-50/70 hover:bg-rose-100/80 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-bold transition-all shrink-0 shadow-2xs"
          >
            <TrendingUp className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
            <span className="text-[11.5px] sm:text-xs font-bold whitespace-nowrap">Stock on Tap</span>
            <ExternalLink className="w-3 h-3 opacity-60 hidden sm:inline shrink-0" />
          </a>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="실시간 시세 새로고침"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-rose-500' : ''}`} />
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-brand-context-menu="true"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="더보기 메뉴"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xl p-2 z-50 text-xs space-y-2">
                  <div className="p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => onThemeModeChanged('auto')}
                      className={`flex-1 py-1 rounded-lg text-center font-bold transition-all ${
                        currentThemeMode === 'auto'
                          ? 'bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-xs'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      자동
                    </button>
                    <button
                      onClick={() => onThemeModeChanged('light')}
                      className={`flex-1 py-1 rounded-lg text-center font-bold transition-all ${
                        currentThemeMode === 'light'
                          ? 'bg-white dark:bg-zinc-900 text-amber-600 shadow-xs'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      라이트
                    </button>
                    <button
                      onClick={() => onThemeModeChanged('dark')}
                      className={`flex-1 py-1 rounded-lg text-center font-bold transition-all ${
                        currentThemeMode === 'dark'
                          ? 'bg-white dark:bg-zinc-900 text-rose-400 shadow-xs'
                          : 'text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      다크
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-100 dark:border-zinc-800 space-y-1">
                    <a
                      href="https://stock.on-tap.xyz/?symbol=TSLA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                    >
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
                        <span>📈 Stock on Tap (미국주식)</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <a
                      href="https://dev.on-tap.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                    >
                      <span>🚀 개발자 페이지 (On Tap)</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleDonate();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold cursor-pointer"
                    >
                      <Beer className="w-3.5 h-3.5 text-amber-500" />
                      <span>🍺 Buy me a beer (후원하기)</span>
                    </button>

                    <a
                      href="https://pay.on-tap.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                    >
                      <span>💳 Payments on Tap</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <a
                      href="https://google.on-tap.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                    >
                      <span>🌐 Alphabet on Tap</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <a
                      href="https://nvda.on-tap.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
                    >
                      <span>⚡ NVIDIA on Tap</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
