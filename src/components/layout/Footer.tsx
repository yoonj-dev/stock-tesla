import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 py-6 mt-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-zinc-200">Tesla on Tap</span>
          <span>·</span>
          <span>Robotaxi, Megapack & Optimus Autonomous AI Intelligence Hub</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <a
            href="https://nvda.on-tap.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-500 transition-colors"
          >
            NVIDIA on Tap
          </a>
          <a
            href="https://google.on-tap.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            Alphabet on Tap
          </a>
          <a
            href="https://pay.on-tap.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            Payments on Tap
          </a>
          <a
            href="https://stock.on-tap.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition-colors"
          >
            Stock on Tap
          </a>
        </div>
      </div>
    </footer>
  );
};
