import React, { useState } from 'react';
import { Theme, Page, CaseStudy } from '../types';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { SectionEditHeader } from '../components/cms/SectionEditHeader';
import { IconBadge3D } from '../components/3D/3DIconBadge';
import { PageHeader } from '../components/PageHeader';
import { ArrowUpLeft, ChevronLeft, Filter, CheckCircle2, TrendingUp, X, Sparkles, AlertTriangle, Lightbulb, Globe, ExternalLink } from 'lucide-react';

interface PortfolioPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
  selectedCaseStudy: CaseStudy | null;
  onSelectCaseStudy: (study: CaseStudy | null) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  theme,
  onNavigate,
  selectedCaseStudy,
  onSelectCaseStudy
}) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const caseStudiesList = data.CASE_STUDIES || [];

  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Web Design', 'Crypto', 'Travel', 'E-commerce', 'SaaS'];

  const filteredStudies = filter === 'All' 
    ? caseStudiesList 
    : caseStudiesList.filter(s => s.industry === filter);

  return (
    <div className="space-y-12 py-4">
      {/* Top Page Header & Breadcrumb */}
      <PageHeader
        theme={theme}
        page="portfolio"
        title="نتایج اثبات‌شده و کیس‌استاندی‌های واقعی"
        subtitle="بررسی دقیق چالش‌ها، راهکارهای بازطراحی لندینگ پیج و نتایج عددی قبل و بعد در پروژه‌های پیشرو."
        badgeText="نمونه‌کارهای اختصاصی"
        onNavigate={onNavigate}
      />

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                active
                  ? 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-lg shadow-blue-500/25'
                  : isDark 
                    ? 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              {cat === 'All' ? 'همه صنایع' : cat}
            </button>
          );
        })}
      </div>

      {/* Portfolio Grid */}
      <div className="space-y-6">
        <SectionEditHeader title="نمونه‌کارها و کیس‌استادی‌های تخصصی" arrayPath="CASE_STUDIES" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            onClick={() => onSelectCaseStudy(study)}
            className={`p-7 rounded-[36px] cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
              isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-bold bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6]">
                  {study.industryFa}
                </span>
                <IconBadge3D iconName={study.thumbnailIcon} theme={theme} size="sm" glowColor="cyan" floating={false} />
              </div>

              <h2 className={`text-lg font-black mb-3 group-hover:text-[#5ce1e6] transition-colors leading-snug ${
                isDark ? 'text-white' : 'text-[#1a1240]'
              }`}>
                {study.title}
              </h2>

              {study.liveUrl && (
                <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Globe className="w-3 h-3" />
                  پیش‌نمایش زنده در همین صفحه
                </span>
              )}

              <p className={`text-xs leading-relaxed mb-6 line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {study.summary}
              </p>

              {/* Before/After Metrics Glow Cards */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-black/25 border border-white/10 mb-6">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 block">ROAS</span>
                  <span className="text-xs font-black text-emerald-400 dir-ltr">{study.metrics.roas}</span>
                </div>
                <div className="text-center border-x border-white/10">
                  <span className="text-[10px] text-slate-400 block">نرخ تبدیل</span>
                  <span className="text-xs font-black text-[#5ce1e6] dir-ltr">{study.metrics.conversionRate}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 block">کاهش CAC</span>
                  <span className="text-xs font-black text-[#8b5cf6] dir-ltr">{study.metrics.cacReduction}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs font-bold text-[#5ce1e6] group-hover:text-white transition-colors">
              <span>بررسی کامل کیس‌استاندی</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* CASE STUDY DETAIL MODAL LAYOUT */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] p-6 sm:p-10 border shadow-2xl my-auto ${
            isDark ? 'bg-[#1a1240] border-white/20 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Close Button */}
            <button
              onClick={() => onSelectCaseStudy(null)}
              className="absolute top-6 left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Case Study Header */}
            <div className={`space-y-4 pt-2 pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/40">
                  {selectedCaseStudy.industryFa}
                </span>
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>مشتری: {selectedCaseStudy.client}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black leading-tight">
                {selectedCaseStudy.title}
              </h2>
            </div>

            {/* Live In-Site Website Preview (no need to leave the site) */}
            {selectedCaseStudy.liveUrl && (
              <div className="my-8 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-black text-lg border-r-4 border-[#5ce1e6] pr-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#5ce1e6]" />
                    پیش‌نمایش زنده وب‌سایت
                  </h3>
                  <a
                    href={selectedCaseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-colors ${
                      isDark ? 'bg-white/10 hover:bg-white/20 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    باز کردن در تب جدید
                  </a>
                </div>

                <div className={`relative rounded-3xl border overflow-hidden shadow-2xl ${
                  isDark ? 'border-white/15 bg-black/30' : 'border-slate-200 bg-slate-100'
                }`}>
                  {/* Fake Browser Chrome Bar */}
                  <div className={`flex items-center gap-2 px-4 py-3 border-b ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    <span className={`ms-3 text-[11px] font-mono truncate dir-ltr ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {selectedCaseStudy.liveUrl}
                    </span>
                  </div>
                  <iframe
                    src={selectedCaseStudy.liveUrl}
                    title={selectedCaseStudy.title}
                    loading="lazy"
                    className="w-full h-[420px] sm:h-[560px] bg-white"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            )}

            {/* 3-Column Challenge / Solution / Results Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {/* Challenge */}
              <div className={`p-6 rounded-3xl border space-y-3 ${
                isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>چالش اولیه</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedCaseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className={`p-6 rounded-3xl border space-y-3 ${
                isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center gap-2 text-[#2563eb] font-bold text-sm">
                  <Lightbulb className="w-5 h-5" />
                  <span>راهکار پیاده‌شده</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedCaseStudy.solution}
                </p>
              </div>

              {/* Results */}
              <div className={`p-6 rounded-3xl border space-y-3 ${
                isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'
              }`}>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <TrendingUp className="w-5 h-5" />
                  <span>نتایج حاصله</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedCaseStudy.results}
                </p>
              </div>
            </div>

            {/* Before vs After Metric Comparison Table/Grid */}
            <div className="space-y-4 my-8">
              <h3 className="font-black text-lg border-r-4 border-[#8b5cf6] pr-3">
                مقایسه دقیق شاخص‌ها (قبل و بعد از پروژه)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedCaseStudy.metricsComparison.map((metric, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border space-y-2 ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className={`text-xs font-bold block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{metric.label}</span>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] text-slate-500 block">قبل</span>
                        <span className="text-sm font-bold text-red-500 dir-ltr">{metric.before}</span>
                      </div>
                      <div className="text-slate-400">←</div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">بعد</span>
                        <span className="text-sm font-extrabold text-emerald-600 dir-ltr">{metric.after}</span>
                      </div>
                    </div>
                    <div className="pt-2 text-center text-xs font-black text-[#2563eb]">
                      رشد: {metric.growth}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <button
                onClick={() => {
                  onSelectCaseStudy(null);
                  onNavigate('contact');
                }}
                className="w-full sm:w-auto glow-btn px-8 py-3.5 rounded-full text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>درخواست پروژه مشابه برای شما</span>
                <ArrowUpLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectCaseStudy(null)}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                بستن کیس‌استاندی
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
