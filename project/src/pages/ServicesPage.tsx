import React, { useState } from 'react';
import { Theme, Page, ServiceItem } from '../types';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { SectionEditHeader } from '../components/cms/SectionEditHeader';
import { IconBadge3D } from '../components/3D/3DIconBadge';
import { PageHeader } from '../components/PageHeader';
import { FAQSection } from '../components/FAQSection';
import { CheckCircle2, ArrowUpLeft, Calculator, Sparkles, ChevronLeft, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ theme, onNavigate }) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const servicesList = data.SERVICES || [];
  const howIWorkSteps = data.HOW_I_WORK_STEPS || [];

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Interactive ROAS Calculator State (Values in Toman)
  const [monthlySpend, setMonthlySpend] = useState<number>(100000000);
  const [currentRoas, setCurrentRoas] = useState<number>(1.8);
  
  const estimatedNewRoas = (currentRoas * 1.85).toFixed(1);
  const extraRevenue = Math.round(monthlySpend * (parseFloat(estimatedNewRoas) - currentRoas));

  return (
    <div className="space-y-16 py-4">
      {/* Top Page Header & Breadcrumb */}
      <PageHeader
        theme={theme}
        page="services"
        title="معماری رشد و بهینه‌سازی دقیق فانل بازاریابی"
        subtitle="خدمات تخصصی پاداش‌محور بدون اتکا به حدس و گمان و همراه با تعهد به شاخص‌های کلیدی عملکرد (KPIs)."
        badgeText="خدمات تخصصی CRO & Performance"
        onNavigate={onNavigate}
      />

      {/* Services Grid (Large Glass Cards) */}
      <div className="space-y-6">
        <SectionEditHeader title="خدمات و سرویس‌های تخصصی" arrayPath="SERVICES" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, idx) => (
          <div
            key={service.id}
            className={`p-8 sm:p-10 rounded-[36px] flex flex-col justify-between transition-all duration-300 relative group ${
              isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <IconBadge3D
                  iconName={service.iconName}
                  theme={theme}
                  size="xl"
                  glowColor={idx % 2 === 0 ? 'magenta' : 'cyan'}
                />
                <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-white/10 text-[#5ce1e6] border border-white/15">
                  {service.titleEn}
                </span>
              </div>

              <h2 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                {service.title}
              </h2>

              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {service.fullDesc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-xl text-[11px] font-bold bg-[#4c8dff]/15 border border-[#4c8dff]/30 text-[#4c8dff]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-slate-400 block mb-2">دستاوردهای کلیدی این سرویس:</span>
                {service.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Packages from omidadli01.site/services */}
              {service.packages && service.packages.length > 0 && (
                <div className="space-y-3 mb-8 pt-4 border-t border-white/10">
                  <span className="text-xs font-bold text-amber-400 block mb-2">تعرفه و پکیج‌های قیمت‌گذاری (تومان):</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {service.packages.map((pkg, pIdx) => (
                      <div
                        key={pIdx}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          pkg.isPopular
                            ? 'bg-gradient-to-r from-[#8b5cf6]/20 to-[#4c8dff]/20 border-[#8b5cf6]/50 shadow-md'
                            : isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100/80 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {pkg.title}
                            </span>
                            {pkg.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#5ce1e6]/20 text-[#5ce1e6] border border-[#5ce1e6]/30">
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-black text-amber-300 font-mono">
                            {pkg.price}
                          </span>
                        </div>
                        {pkg.description && (
                          <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                            {pkg.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full glow-btn py-4 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-4"
            >
              <span>سفارش این سرویس و مشاوره</span>
              <ArrowUpLeft className="w-4 h-4" />
            </button>
          </div>
        ))}
        </div>
      </div>

      {/* Interactive ROAS Calculator Widget */}
      <section className="relative my-12">
        <div className={`p-8 sm:p-12 rounded-[40px] border backdrop-blur-2xl ${
          isDark ? 'bg-gradient-to-br from-[#1a1240] to-[#2d1b5e] border-white/20' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'
        }`}>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5ce1e6]/20 text-[#5ce1e6] text-xs font-black">
                <Calculator className="w-4 h-4" />
                <span>محاسبه‌گر هوشمند پتانسیل رشد ROAS</span>
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                تخمین افزایش سود ماهانه با اجرای استراتژی CRO
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Sliders Input */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>بودجه تبلیغات ماهانه (تومان)</span>
                    <span className="text-[#8b5cf6] font-mono">
                      {(monthlySpend / 1000000).toLocaleString()} میلیون تومان
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20000000"
                    max="500000000"
                    step="10000000"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full accent-[#8b5cf6] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>ROAS فعلی شما</span>
                    <span className="text-[#5ce1e6] font-mono">{currentRoas}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="4.0"
                    step="0.1"
                    value={currentRoas}
                    onChange={(e) => setCurrentRoas(Number(e.target.value))}
                    className="w-full accent-[#5ce1e6] cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Calculation Result Card */}
              <div className={`p-6 rounded-3xl border text-center space-y-3 ${
                isDark ? 'bg-black/30 border-white/15' : 'bg-white border-slate-200 shadow-lg'
              }`}>
                <span className="text-xs text-slate-400 font-bold block">تخمین ROAS جدید پس از بهینه‌سازی:</span>
                <div className="text-4xl font-black gradient-text dir-ltr">
                  ~{estimatedNewRoas}x
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  تخمین سود اضافی ماهانه: <strong className="text-white text-base font-mono">{(extraRevenue / 1000000).toLocaleString()} میلیون تومان</strong>
                </div>
                <p className="text-[11px] text-slate-400">
                  * بر اساس میانگین نتایج +۸۵٪ بهبود در ۳ ماه اول بهینه‌سازی لندینگ و کمپین‌ها
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section "How I Work" */}
      <section className="space-y-12">
        <SectionEditHeader title="مراحل فرایند کاری" arrayPath="HOW_I_WORK_STEPS" />
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-[#5ce1e6] uppercase">فرایند کاری شفاف</span>
          <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
            مسیر ۴ مرحله‌ای از ممیزی تا اسکیل
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howIWorkSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-[32px] relative flex flex-col justify-between transition-all duration-300 ${
                isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black gradient-text font-mono">{step.step}</span>
                  <IconBadge3D iconName={step.icon} theme={theme} size="sm" glowColor="magenta" floating={false} />
                </div>

                <h3 className={`text-lg font-black mb-2 ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                  {step.title}
                </h3>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute top-1/2 -left-3 translate-y-[-50%] text-slate-500 text-xl font-bold">
                  ←
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection theme={theme} />

      {/* Bottom CTA */}
      <section className="text-center pt-8">
        <button
          onClick={() => onNavigate('contact')}
          className="glow-btn px-10 py-5 rounded-full text-sm font-black text-white inline-flex items-center gap-3 shadow-2xl cursor-pointer"
        >
          <span>درخواست ممیزی رایگان (Free Audit)</span>
          <ArrowUpLeft className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
};
