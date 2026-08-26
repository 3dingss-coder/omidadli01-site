import React, { useEffect, useRef, useState } from 'react';
import { Theme, Page, CaseStudy } from '../types';
import { IconBadge3D } from './3D/3DIconBadge';
import {
  X,
  Globe,
  ExternalLink,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ArrowUpLeft,
  Calendar,
  Building2,
  Tag,
  Share2,
  Check,
  Layers,
  Target,
  Rocket,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudyModalProps {
  theme: Theme;
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  theme,
  caseStudy,
  onClose,
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'challenge' | 'solution' | 'results'>('all');

  // Prevent background scroll and reset modal scroll when opened
  useEffect(() => {
    if (caseStudy) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Reset scroll position to top
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPathBadge = (path?: string) => {
    switch (path) {
      case 'start':
        return { label: 'مسیر شروع و لانچ', icon: Layers, color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30' };
      case 'grow':
        return { label: 'مسیر مقیاس و رشد', icon: Rocket, color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30' };
      case 'sell':
      default:
        return { label: 'مسیر فروش و بهینه‌سازی', icon: Target, color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30' };
    }
  };

  const pathInfo = getPathBadge(caseStudy.pathCategory);
  const PathIcon = pathInfo.icon;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-xl flex justify-center p-2 sm:p-4 md:p-6 lg:p-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          ref={scrollContainerRef}
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative w-full max-w-4xl my-auto rounded-[32px] sm:rounded-[40px] border shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ${
            isDark
              ? 'bg-[#0f092b] border-white/15 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Top Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#8b5cf6]/20 to-[#5ce1e6]/20 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Sticky Header Bar */}
          <div
            className={`sticky top-0 z-30 px-5 sm:px-8 py-4 border-b backdrop-blur-xl flex items-center justify-between gap-4 transition-colors ${
              isDark
                ? 'bg-[#0f092b]/85 border-white/10'
                : 'bg-white/90 border-slate-100'
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-[#8b5cf6]/15 text-[#a78bfa] border border-[#8b5cf6]/30">
                بررسی کیس‌استادی
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 truncate">
                <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span className="font-semibold text-slate-300 truncate">
                  {caseStudy.client}
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-400 truncate">{caseStudy.industryFa}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                title="اشتراک‌گذاری لینک"
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : isDark
                    ? 'bg-white/5 hover:bg-white/15 text-slate-300 border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                aria-label="بستن پنجره"
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/15 hover:rotate-90'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 hover:rotate-90'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Scrollable Content */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Top Badges & Meta */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className={`px-3.5 py-1.5 rounded-full text-xs font-black border flex items-center gap-1.5 bg-gradient-to-r ${pathInfo.color}`}
              >
                <PathIcon className="w-3.5 h-3.5" />
                <span>{pathInfo.label}</span>
              </div>

              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#5ce1e6]/10 text-[#5ce1e6] border border-[#5ce1e6]/30">
                {caseStudy.industryFa}
              </span>

              {caseStudy.date && (
                <span className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 bg-white/5 border border-white/5 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>{caseStudy.date}</span>
                </span>
              )}
            </div>

            {/* Title & Summary */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                {caseStudy.title}
              </h1>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {caseStudy.summary}
              </p>
            </div>

            {/* Key Metrics Highlight Grid (Glass HUD) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-500/25 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-400">بازگشت سرمایه (ROAS)</span>
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white dir-ltr font-mono">
                  {caseStudy.metrics.roas}
                </div>
                <span className="text-[10px] text-emerald-300/70 mt-1 block">شاخص بهینه‌سازی بودجه</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#5ce1e6]/15 via-[#5ce1e6]/5 to-transparent border border-[#5ce1e6]/25 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#5ce1e6]">نرخ تبدیل (CR)</span>
                  <TrendingUp className="w-4 h-4 text-[#5ce1e6]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white dir-ltr font-mono">
                  {caseStudy.metrics.conversionRate}
                </div>
                <span className="text-[10px] text-[#5ce1e6]/70 mt-1 block">رشد ثبت سفارش و لید</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/15 via-[#8b5cf6]/5 to-transparent border border-[#8b5cf6]/25 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#a78bfa]">کاهش هزینه جذب (CAC)</span>
                  <ShieldCheck className="w-4 h-4 text-[#a78bfa]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-white dir-ltr font-mono">
                  {caseStudy.metrics.cacReduction}
                </div>
                <span className="text-[10px] text-[#a78bfa]/70 mt-1 block">کاهش هزینه به ازای هر مشتری</span>
              </div>
            </div>

            {/* Live Interactive Preview Browser (if liveUrl exists) */}
            {caseStudy.liveUrl && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-black text-base flex items-center gap-2 text-[#5ce1e6]">
                    <Globe className="w-4 h-4" />
                    <span>پیش‌نمایش زنده وب‌سایت</span>
                  </h3>
                  <a
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/15 text-slate-200 border-white/10 hover:border-white/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    <span>مشاهده سایت در تب جدید</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div
                  className={`rounded-3xl border overflow-hidden shadow-2xl ${
                    isDark ? 'border-white/15 bg-black/40' : 'border-slate-300 bg-slate-100'
                  }`}
                >
                  {/* Browser Toolbar Mockup */}
                  <div
                    className={`flex items-center justify-between px-4 py-3 border-b ${
                      isDark ? 'bg-[#150e38] border-white/10' : 'bg-slate-200 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    <div
                      className={`flex-1 max-w-md mx-4 px-3 py-1 rounded-lg text-[11px] font-mono text-center truncate dir-ltr ${
                        isDark ? 'bg-black/40 text-slate-400 border border-white/5' : 'bg-white text-slate-600 border border-slate-300'
                      }`}
                    >
                      {caseStudy.liveUrl}
                    </div>

                    <div className="w-12" />
                  </div>

                  <iframe
                    src={caseStudy.liveUrl}
                    title={caseStudy.title}
                    loading="lazy"
                    className="w-full h-[360px] sm:h-[460px] bg-white border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            )}

            {/* Strategic Breakdown: 3 Narrative Cards (Challenge -> Solution -> Impact) */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-black flex items-center gap-2 border-r-4 border-[#8b5cf6] pr-3">
                <span>مسیر پیاده‌سازی و استراتژی پروژه</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. Challenge */}
                <div
                  className={`p-6 rounded-3xl border space-y-3 relative overflow-hidden ${
                    isDark
                      ? 'bg-gradient-to-b from-rose-500/10 to-transparent border-rose-500/20'
                      : 'bg-rose-50/70 border-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>۱. چالش و مسئله اولیه</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {caseStudy.challenge}
                  </p>
                </div>

                {/* 2. Solution */}
                <div
                  className={`p-6 rounded-3xl border space-y-3 relative overflow-hidden ${
                    isDark
                      ? 'bg-gradient-to-b from-blue-500/10 to-transparent border-blue-500/20'
                      : 'bg-blue-50/70 border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-[#4c8dff] font-bold text-sm">
                    <Lightbulb className="w-5 h-5" />
                    <span>۲. راهکار و معماری اقدام</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {caseStudy.solution}
                  </p>
                </div>

                {/* 3. Results */}
                <div
                  className={`p-6 rounded-3xl border space-y-3 relative overflow-hidden ${
                    isDark
                      ? 'bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-500/20'
                      : 'bg-emerald-50/70 border-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <TrendingUp className="w-5 h-5" />
                    <span>۳. دستاورد و نتایج واقعی</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {caseStudy.results}
                  </p>
                </div>
              </div>
            </div>

            {/* Before vs After Metric Comparison (Visual Progress Bars) */}
            {caseStudy.metricsComparison && caseStudy.metricsComparison.length > 0 && (
              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-black flex items-center gap-2 border-r-4 border-[#5ce1e6] pr-3">
                  <span>مقایسه دقیق شاخص‌ها (قبل و بعد از اجرای استراتژی)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {caseStudy.metricsComparison.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border space-y-3 relative ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className={`text-xs font-bold block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {metric.label}
                      </span>

                      <div className="flex items-center justify-between pt-1">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-slate-500 block">قبل از پروژه</span>
                          <span className="text-xs font-bold text-rose-400 dir-ltr">{metric.before}</span>
                        </div>

                        <div className="text-slate-600 font-bold text-sm">←</div>

                        <div className="space-y-0.5 text-left">
                          <span className="text-[10px] text-slate-500 block">بعد از بهینه‌سازی</span>
                          <span className="text-sm font-extrabold text-emerald-400 dir-ltr">{metric.after}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">میزان بهبود:</span>
                        <span className="font-black text-[#5ce1e6] px-2 py-0.5 rounded-md bg-[#5ce1e6]/10 border border-[#5ce1e6]/20">
                          {metric.growth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Tech Stack */}
            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>تکنولوژی‌ها و متدولوژی‌های استفاده‌شده:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-slate-300'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Unified CTA & Actions */}
            <div
              className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => {
                  onClose();
                  onNavigate('contact');
                }}
                className="w-full sm:w-auto glow-btn px-8 py-4 rounded-full text-xs font-black text-white flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:scale-105 transition-transform"
              >
                <span>مشاوره و ارزیابی پروژه شما بر اساس این نتایج</span>
                <ArrowUpLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-bold transition-colors cursor-pointer text-center ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                بستن و ادامه بررسی
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
