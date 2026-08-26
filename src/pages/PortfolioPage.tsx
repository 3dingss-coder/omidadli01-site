import React, { useState, useMemo } from 'react';
import { Theme, Page, CaseStudy } from '../types';
import { useContent } from '../context/ContentContext';
import { SectionEditHeader } from '../components/cms/SectionEditHeader';
import { IconBadge3D } from '../components/3D/3DIconBadge';
import { PageHeader } from '../components/PageHeader';
import { CinematicSection, CinematicStagger, CinematicItem } from '../components/motion/CinematicSection';
import { ChevronLeft, Globe, Briefcase, Target, Rocket, Layers } from 'lucide-react';

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

  // Filter 1: Strategic Path (Primary)
  const [selectedPath, setSelectedPath] = useState<string>('all');

  // Filter 2: Industry (Secondary)
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const pathFilters = [
    { key: 'all', label: 'همه مسیرها', icon: Layers },
    { key: 'start', label: 'شروع کنیم', icon: Briefcase },
    { key: 'sell', label: 'بهتر بفروشیم', icon: Target },
    { key: 'grow', label: 'رشد کنیم', icon: Rocket },
  ];

  // Dynamic clustered industries according to content strategy:
  // فین‌تک و رمزارز | گردشگری و سفر | تجارت الکترونیک | طراحی وب‌سایت | تبلیغات و تکنولوژی
  const industries = [
    { key: 'all', label: 'همه صنایع' },
    { key: 'فین‌تک و رمزارز', label: 'فین‌تک و رمزارز', matches: ['فین‌تک و رمزارز', 'رمزارز و فین‌تک'] },
    { key: 'گردشگری و سفر', label: 'گردشگری و سفر', matches: ['گردشگری و سفر', 'خدمات مهاجرت و ویزا'] },
    { key: 'تجارت الکترونیک', label: 'تجارت الکترونیک', matches: ['تجارت الکترونیک', 'صنعتی و فولاد'] },
    { key: 'طراحی وب‌سایت', label: 'طراحی وب‌سایت', matches: ['طراحی وب‌سایت', 'محصولات دیجیتال'] },
    { key: 'تبلیغات و تکنولوژی', label: 'تبلیغات و تکنولوژی', matches: ['پرفورمنس مارکتینگ', 'آژانس تبلیغاتی', 'پلتفرم تبلیغاتی', 'تکنولوژی و بازاریابی', 'هلدینگ دیجیتال'] },
  ];

  // Combined AND filtering logic
  const filteredStudies = useMemo(() => {
    return caseStudiesList.filter((study) => {
      const matchPath = selectedPath === 'all' || study.pathCategory === selectedPath;
      let matchIndustry = true;
      if (selectedIndustry !== 'all') {
        const indObj = industries.find(i => i.key === selectedIndustry);
        if (indObj && indObj.matches) {
          matchIndustry = indObj.matches.includes(study.industryFa) || study.industryFa === selectedIndustry;
        } else {
          matchIndustry = study.industryFa === selectedIndustry;
        }
      }
      return matchPath && matchIndustry;
    });
  }, [caseStudiesList, selectedPath, selectedIndustry]);

  return (
    <div className="space-y-12 py-4">
      {/* 1. Page Header */}
      <PageHeader
        theme={theme}
        page="portfolio"
        title="چند نمونه از پروژه‌هایی که روشون کار کردم"
        subtitle="از فروشگاه‌های کوچیک تا برندهای بزرگ‌تر — هرکدوم یه چالش واقعی داشتن؛ این‌ها نتیجه‌ی کاریه که روشون انجام دادم."
        badgeText="نمونه‌کارهای واقعی"
        onNavigate={onNavigate}
      />

      {/* 2. Dual Filters Section */}
      <CinematicSection variant="fade-up" showGlowBeam glowColor="purple" className="space-y-4 max-w-4xl mx-auto" id="portfolio-filters">
        {/* Filter 1: Strategic Path (Primary, prominent pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {pathFilters.map((opt) => {
            const active = selectedPath === opt.key;
            const Icon = opt.icon;
            return (
              <button
                key={opt.key}
                onClick={() => setSelectedPath(opt.key)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 border border-violet-400/50 scale-105'
                    : isDark 
                      ? 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10' 
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter 2: Industry (Secondary, smaller subtle pills) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {industries.map((ind) => {
            const active = selectedIndustry === ind.key;
            return (
              <button
                key={ind.key}
                onClick={() => setSelectedIndustry(ind.key)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-150 cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-[#5ce1e6]/20 text-[#5ce1e6] border border-[#5ce1e6]/40 shadow-sm'
                      : 'bg-slate-900 text-white shadow-sm'
                    : isDark
                      ? 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {ind.label}
              </button>
            );
          })}
        </div>

        {/* Active Filter Counter & Reset */}
        {(selectedPath !== 'all' || selectedIndustry !== 'all') && (
          <div className="flex items-center justify-center gap-3 pt-2 text-xs">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              نمایش {filteredStudies.length} نمونه‌کار
            </span>
            <button
              onClick={() => {
                setSelectedPath('all');
                setSelectedIndustry('all');
              }}
              className="text-violet-400 hover:underline font-bold text-[11px] cursor-pointer"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}
      </CinematicSection>

      {/* 3. Portfolio Cards Grid */}
      <CinematicSection variant="fade-up" showGlowBeam glowColor="cyan" className="space-y-6">
        <SectionEditHeader title="نمونه‌کارها و کیس‌استادی‌های تخصصی" arrayPath="CASE_STUDIES" />

        {filteredStudies.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              با این ترکیب فیلترها، موردی یافت نشد. می‌توانید فیلترها را ریست کنید.
            </p>
            <button
              onClick={() => {
                setSelectedPath('all');
                setSelectedIndustry('all');
              }}
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold bg-violet-600 text-white cursor-pointer"
            >
              نمایش همه نمونه‌کارها
            </button>
          </div>
        ) : (
          <CinematicStagger key={`${selectedPath}-${selectedIndustry}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
            {filteredStudies.map((study) => (
              <CinematicItem key={study.id} className="h-full">
                <div
                  onClick={() => onSelectCaseStudy(study)}
                  className={`p-7 rounded-[36px] cursor-pointer transition-all duration-300 flex flex-col justify-between group h-full ${
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

                    {/* 3 Metric Cards with Simplified Persian Labels */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/25 border border-white/10 mb-6">
                      <div className="text-center">
                        <span className="text-[9px] text-slate-400 block mb-1 leading-tight line-clamp-1">بازگشت سرمایه از تبلیغات</span>
                        <span className="text-[11px] font-black text-emerald-400 dir-ltr">{study.metrics.roas}</span>
                      </div>
                      <div className="text-center border-x border-white/10 px-1">
                        <span className="text-[9px] text-slate-400 block mb-1 leading-tight line-clamp-1">نرخ تبدیل</span>
                        <span className="text-[11px] font-black text-[#5ce1e6] dir-ltr">{study.metrics.conversionRate}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[9px] text-slate-400 block mb-1 leading-tight line-clamp-1">کاهش هزینه‌ی جذب مشتری</span>
                        <span className="text-[11px] font-black text-[#8b5cf6] dir-ltr">{study.metrics.cacReduction}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-bold text-[#5ce1e6] group-hover:text-white transition-colors border-t border-white/5 mt-2">
                    <span>بررسی کامل نمونه‌کار</span>
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </CinematicItem>
            ))}
          </CinematicStagger>
        )}
      </CinematicSection>
    </div>
  );
};
