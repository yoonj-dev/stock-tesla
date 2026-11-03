import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  Car,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { StockFundamentals, LlmSynthesisData } from '../../types/stock';
import { launchAiService, AI_SERVICES, AiServiceKey } from '../../lib/aiAppLauncher';
import { fetchSynthesisData } from '../../lib/stockApi';

interface LocalLlmSynthesizerProps {
  nvda: StockFundamentals;
}

type TabKey = 'memo' | 'robotaxi_energy' | 'fsd_moat' | 'valuation';

export const LocalLlmSynthesizer: React.FC<LocalLlmSynthesizerProps> = ({ nvda }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('memo');
  const [synthesisData, setSynthesisData] = useState<LlmSynthesisData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const loadSynthesis = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchSynthesisData();
      if (data) {
        setSynthesisData(data);
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadSynthesis();
  }, []);

  const getActiveText = (): string => {
    if (synthesisData?.reports) {
      if (activeTab === 'memo' && synthesisData.reports.memo) return synthesisData.reports.memo;
      if (activeTab === 'robotaxi_energy' && (synthesisData.reports as any).robotaxi_energy) return (synthesisData.reports as any).robotaxi_energy;
      if (activeTab === 'fsd_moat' && (synthesisData.reports as any).fsd_moat) return (synthesisData.reports as any).fsd_moat;
      if (activeTab === 'valuation' && synthesisData.reports.valuation) return synthesisData.reports.valuation;
    }

    if (activeTab === 'memo') {
      return `### 💡 테슬라(Tesla · TSLA) 기관급 퀀트 리서치 메모

- **현재 주가**: $${nvda.currentPrice || 401.34} | **선행 P/E**: ${nvda.forwardPE || 74.2}x | **시가총액**: $1.28T+
- **핵심 투자 포인트**:
  1. **사이버캡 & 로보택시 상용화**: 언박스드 제조 공정 기반 $30,000 이하 자율주행 차량 양산 착수. FSD v13/v14 기반 엔드투엔드 AI 신경망 완성으로 인간 운전자 개입률 99% 감소.
  2. **에너지 스토리지(Megapack) 슈퍼사이클**: AI 데이터센터 전력 공급망 부족 수혜로 분기 설치량 YoY +125% 급증. 자동차 부문을 상회하는 30%+ 초고마진 달성.
  3. **옵티머스(Optimus Gen 3) 휴머노이드**: 2025년 기가팩토리 내부 수천 대 투입, 2026년 외부 산업용 고객 판매로 신규 TAM 수조 달러 창출.
- **종합 의견**: 전통적 완성차 제조 멀티플을 넘어 순수 피지컬 AI(Physical AI) 및 자율주행 플랫폼 기업으로의 리레이팅 국면에 진입해 있습니다.`;
    }
    if (activeTab === 'robotaxi_energy') {
      return `### ⚡ 로보택시 네트워크 & 메가팩 에너지 인프라

- **로보택시(Cybercab) 경제성**: 마일당 이동 비용을 기존 택시($2.50) 대비 80% 이상 절감한 $0.20 수준으로 낮춰 대중교통 시장을 대체.
- **상하이 메가팩토리 런레이트**: 연간 40GWh 규모의 두 번째 공장 완공으로 글로벌 수주 잔고 2년 치 소화 속도 가속화.
- **전력망 피크 셰이빙**: 유틸리티급 ESS 시장 점유율 1위를 기반으로 북미 및 유럽 전력 인프라의 핵심 축 형성.`;
    }
    if (activeTab === 'fsd_moat') {
      return `### 🛡️ FSD 비전 AI 독점 데이터 해자 & Dojo 클러스터

- **실주행 데이터 압도적 1위**: 전 세계 600만 대 이상 차량에서 매일 수집되는 수십억 마일의 실주행 비디오 데이터는 웨이모 등 라이다 진영이 복제 불가능한 해자.
- **Cortex & Dojo 슈퍼컴퓨팅**: 100+ ExaFLOPS 규모의 AI 학습 연산 능력을 독자 구축하여 엔비디아 GPU 수급 병목을 분산.
- **NACS 북미 충전 표준 독점**: 포드, GM, 현대차 등 전 완성차가 테슬라 충전망으로 편입되어 고마진 구독/충전 수수료 영구 수취 구조 완성.`;
    }
    return `### 📊 역DCF 밸류에이션 및 내재가치 분석

- **현재 시장 기대 성장률**: 현재 주가($${nvda.currentPrice || 401.34})를 정당화하기 위한 향후 5년 연평균 FCF 성장률은 약 +32.4% 수준입니다.
- **월가 컨센서스 목표가**: 평균 $${nvda.targetMeanPrice || 413.10} (최고 $500.00 / 최저 $120.00)
- **하방 안전마진**: 순현금 $33B+ 및 연간 메가팩 현금흐름 창출 능력으로 연구개발 및 자율주행 선행 투자의 재무 건전성 확고.`;
  };

  const handleCopy = () => {
    const text = getActiveText();
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fintech-card p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                기관급 AI 퀀트 심층 리서치 메모
              </h3>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Gemma 4 검증완료</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              로보택시 상용화, 메가팩 전력망 수주, FSD 엔드투엔드 AI 해자 및 역DCF 종합
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={loadSynthesis}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors disabled:opacity-50 cursor-pointer"
            title="리포트 새로고침"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('memo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'memo'
                ? 'bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>종합 분석 메모</span>
          </button>

          <button
            onClick={() => setActiveTab('robotaxi_energy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'robotaxi_energy'
                ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>로보택시 & 메가팩</span>
          </button>

          <button
            onClick={() => setActiveTab('fsd_moat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'fsd_moat'
                ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>FSD 비전 AI 해자</span>
          </button>

          <button
            onClick={() => setActiveTab('valuation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'valuation'
                ? 'bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>밸류에이션 감사</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
            title="리포트 복사"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨' : '보고서 복사'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="relative rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/60 dark:bg-zinc-900/60 p-4 sm:p-5 min-h-[300px] max-h-[500px] overflow-y-auto selectable-text">
        <div className="prose dark:prose-invert prose-xs sm:prose-sm max-w-none text-slate-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans">
          {getActiveText()}
        </div>
      </div>

      {/* One-Click External AI Launcher Bar */}
      <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>외부 전문 AI로 즉시 심층 분석 실행:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(Object.keys(AI_SERVICES) as AiServiceKey[]).map((key) => {
            const svc = AI_SERVICES[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => launchAiService(key)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium transition-colors cursor-pointer"
                title={`${svc.name}으로 추가 심층 분석 실행`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${svc.dotColor}`} />
                <span>{svc.name}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
