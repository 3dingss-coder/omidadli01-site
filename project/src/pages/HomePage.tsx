import React, { useState } from 'react';
import { Theme, Page, CaseStudy } from '../types';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { RepeaterControls } from '../components/cms/RepeaterControls';
import { SectionEditHeader } from '../components/cms/SectionEditHeader';
import { SectionWrapper } from '../components/cms/SectionWrapper';
import { HeroSlider } from '../components/HeroSlider';
import { ServiceHeroVisual, ServiceVisualId } from '../components/ServiceHeroVisual';
import { IconBadge3D } from '../components/3D/3DIconBadge';
import { TiltCard } from '../components/3D/TiltCard';
import { FAQSection } from '../components/FAQSection';
import { ResumeModal } from '../components/ResumeModal';
import { ChevronLeft, Calendar, ArrowUpLeft } from 'lucide-react';

interface HomePageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ theme, onNavigate, onSelectCaseStudy }) => {
  const isDark = theme === 'dark';
  const [showResume, setShowResume] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState<ServiceVisualId>('performance');
  const { data } = useContent();

  const stats = data.STATS || [];
  const services = data.SERVICES || [];
  const caseStudies = data.CASE_STUDIES || [];
  const homeSections = data.PAGE_SECTIONS['home'] || [];

  const renderSectionByName = (secName: string) => {
    switch (secName) {
      case 'HERO':
        return (
          <section className="relative pt-6 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 text-right">
                <HeroSlider 
                  theme={theme} 
                  onNavigate={onNavigate} 
                  onOpenResume={() => setShowResume(true)} 
                  onSlideChange={setActiveHeroSlide}
                />
              </div>
              <div className="lg:col-span-5">
                <ServiceHeroVisual theme={theme} serviceId={activeHeroSlide} />
              </div>
            </div>
          </section>
        );

      case 'STATS':
        return (
          <section className="relative z-10">
            <SectionEditHeader title="آمار و شاخص‌های کلیدی" arrayPath="STATS" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <TiltCard key={idx} maxTilt={8} glowColor="rgba(92, 225, 230, 0.2)">
                  <div
                    className={`p-6 sm:p-8 rounded-[28px] transition-all duration-300 relative overflow-hidden group h-full ${
                      isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
                    }`}
                  >
                    <RepeaterControls arrayPath="STATS" index={idx} totalCount={stats.length} className="absolute top-2 left-2" />

                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text mb-2 dir-ltr text-right">
                      <EditableText path={`STATS.${idx}.value`}>{stat.value}</EditableText>
                    </div>

                    <div className={`font-bold text-sm sm:text-base mb-1 ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                      <EditableText path={`STATS.${idx}.label`}>{stat.label}</EditableText>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">
                      <EditableText path={`STATS.${idx}.subtext`}>{stat.subtext}</EditableText>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        );

      case 'SERVICES':
        return (
          <section className="space-y-12">
            <SectionEditHeader title="خدمات اصلی" arrayPath="SERVICES" />
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8b5cf6]/20 to-[#4c8dff]/20 border border-[#8b5cf6]/30 text-xs font-extrabold text-[#8b5cf6]">
                خدمات اختصاصی
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                چگونه به رشد سریع کسب‌وکار شما کمک می‌کنم؟
              </h2>
              <p className={`text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                تمرکز من بر سه ستون اصلی مارکتینگ پاداش‌محور است: جلب ترافیک هدفمند، تبدیل کاربر و ترکینگ دقیق داده‌ها.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, idx) => (
                <TiltCard key={service.id || idx} maxTilt={10} glowColor={idx === 0 ? 'rgba(255, 79, 216, 0.2)' : idx === 1 ? 'rgba(92, 225, 230, 0.2)' : 'rgba(76, 141, 255, 0.2)'}>
                  <div
                    className={`p-8 rounded-[32px] flex flex-col justify-between transition-all duration-300 relative group h-full ${
                      isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
                    }`}
                  >
                    <RepeaterControls arrayPath="SERVICES" index={idx} totalCount={services.length} className="absolute top-3 left-3" />

                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <IconBadge3D
                          iconName={service.iconName}
                          theme={theme}
                          size="lg"
                          glowColor={idx === 0 ? 'magenta' : idx === 1 ? 'cyan' : 'blue'}
                        />
                        <span className="text-3xl font-black opacity-20 font-mono">0{idx + 1}</span>
                      </div>

                      <h3 className={`text-xl font-black mb-3 ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                        <EditableText path={`SERVICES.${idx}.title`}>{service.title}</EditableText>
                      </h3>

                      <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <EditableText path={`SERVICES.${idx}.shortDesc`} multiline>{service.shortDesc}</EditableText>
                      </p>

                      <ul className={`space-y-2 mb-8 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {(service.features || []).slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5ce1e6] shrink-0" />
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                              <EditableText path={`SERVICES.${idx}.features.${fIdx}`}>{feat}</EditableText>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onNavigate('services')}
                      className={`w-full py-3 rounded-2xl border text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isDark 
                          ? 'bg-white/5 hover:bg-gradient-to-r hover:from-[#1d4ed8] hover:to-[#3b82f6] border-white/10 text-white hover:border-transparent' 
                          : 'bg-slate-100 hover:bg-gradient-to-r hover:from-[#1d4ed8] hover:to-[#3b82f6] border-slate-200 text-slate-800 hover:text-white hover:border-transparent'
                      }`}
                    >
                      <span>مشاهده جزئیات کامل</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>
        );

      case 'PORTFOLIO':
        return (
          <section className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-[#5ce1e6] uppercase tracking-wider">نتایج واقعی</span>
                <h2 className={`text-3xl sm:text-4xl font-black mt-2 ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                  کیس‌استاندی‌ها و نمونه‌کارهای برتر
                </h2>
              </div>

              <button
                onClick={() => onNavigate('portfolio')}
                className={`px-6 py-3 rounded-full text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                  isDark ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>مشاهده همه پروژه‌ها</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {caseStudies.filter(c => c.featured).slice(0, 3).map((study, idx) => (
                <div
                  key={study.id || idx}
                  onClick={() => onSelectCaseStudy(study)}
                  className={`p-7 rounded-[32px] cursor-pointer transition-all duration-300 flex flex-col justify-between group relative ${
                    isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
                  }`}
                >
                  <RepeaterControls arrayPath="CASE_STUDIES" index={idx} totalCount={caseStudies.length} className="absolute top-3 left-3 z-10" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#8b5cf6]">
                        <EditableText path={`CASE_STUDIES.${idx}.industryFa`}>{study.industryFa}</EditableText>
                      </span>
                      <IconBadge3D iconName={study.thumbnailIcon} theme={theme} size="sm" glowColor="blue" floating={false} />
                    </div>

                    <h3 className={`text-lg font-black mb-3 group-hover:text-[#5ce1e6] transition-colors leading-snug ${
                      isDark ? 'text-white' : 'text-[#1a1240]'
                    }`}>
                      <EditableText path={`CASE_STUDIES.${idx}.title`}>{study.title}</EditableText>
                    </h3>

                    <p className={`text-xs leading-relaxed mb-6 line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      <EditableText path={`CASE_STUDIES.${idx}.summary`} multiline>{study.summary}</EditableText>
                    </p>

                    <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-black/20 border border-white/10 mb-6">
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 block">ROAS</span>
                        <span className="text-xs font-black text-emerald-400 dir-ltr">
                          <EditableText path={`CASE_STUDIES.${idx}.metrics.roas`}>{study.metrics.roas}</EditableText>
                        </span>
                      </div>
                      <div className="text-center border-x border-white/10">
                        <span className="text-[10px] text-slate-400 block">نرخ تبدیل</span>
                        <span className="text-xs font-black text-[#5ce1e6] dir-ltr">
                          <EditableText path={`CASE_STUDIES.${idx}.metrics.conversionRate`}>{study.metrics.conversionRate}</EditableText>
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-slate-400 block">کاهش CAC</span>
                        <span className="text-xs font-black text-[#8b5cf6] dir-ltr">
                          <EditableText path={`CASE_STUDIES.${idx}.metrics.cacReduction`}>{study.metrics.cacReduction}</EditableText>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs font-bold text-[#5ce1e6] group-hover:text-white transition-colors">
                    <span>مطالعه کامل کیس‌استاندی</span>
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'FAQ':
        return <FAQSection theme={theme} onNavigate={onNavigate} />;

      case 'CTA':
        return (
          <section className="relative z-10">
            <div className="p-8 sm:p-14 rounded-[40px] bg-gradient-to-r from-[#1a1240] via-[#2d1b5e] to-[#0f0a2e] border border-white/20 text-center space-y-6 shadow-[0_25px_70px_rgba(139,92,246,0.25)] relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#8b5cf6]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#4c8dff]/30 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight max-w-2xl mx-auto">
                آماده جهش فروش و کاهش هزینه‌های تبلیغات خود هستید؟
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
                همین امروز جلسه‌ ۳۰ دقیقه‌ای مشاوره استراتژیک رایگان رزرو کنید تا وضعیت فعلی کمپین‌ها و لندینگ پیج شما را تحلیل کنیم.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="glow-btn px-10 py-5 rounded-full text-base font-black text-white inline-flex items-center gap-3 shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <span>رزرو مشاوره استراتژیک رایگان</span>
                  <ArrowUpLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-24 md:space-y-32 py-8">
      {homeSections.map((sec) => (
        <SectionWrapper key={sec.id} pageKey="home" sectionName={sec.name}>
          {renderSectionByName(sec.name)}
        </SectionWrapper>
      ))}

      {/* Resume Modal */}
      {showResume && (
        <ResumeModal theme={theme} onClose={() => setShowResume(false)} />
      )}
    </div>
  );
};

