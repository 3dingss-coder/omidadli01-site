import React, { useState, useEffect, useRef } from 'react';
import { Theme, Page } from '../types';
import { useContent } from '../context/ContentContext';
import { EditableText } from './cms/EditableText';
import { ArrowUpLeft, FileText, CheckCircle2, Sparkles, ChevronRight, ChevronLeft, Pause, Play, Target, Rocket, BarChart3, Search, Code2, Megaphone } from 'lucide-react';
import { ServiceVisualId } from './ServiceHeroVisual';

interface SlideItem {
  id: ServiceVisualId;
  badgePath: string;
  badge: string;
  icon: React.ReactNode;
  title1Path: string;
  titlePart1: string;
  title2Path: string;
  titlePart2: string;
  descPath: string;
  description: string;
  primaryCtaText: string;
  primaryCtaType: 'contact' | 'services' | 'portfolio' | 'about';
  secondaryCtaText: string;
  secondaryCtaType: 'resume' | 'portfolio' | 'services' | 'about';
  badges: string[];
  gradientTheme: string;
}

interface HeroSliderProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
  onOpenResume: () => void;
  onSlideChange?: (slideId: ServiceVisualId) => void;
}

const SLIDE_INTERVAL_MS = 4000;

export const HeroSlider: React.FC<HeroSliderProps> = ({ theme, onNavigate, onOpenResume, onSlideChange }) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const personal = data.PERSONAL_INFO;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides: SlideItem[] = [
    {
      id: 'performance',
      badgePath: 'PERSONAL_INFO.title',
      badge: personal.title,
      icon: <Rocket className="w-4 h-4 text-[#2563eb]" />,
      title1Path: 'PERSONAL_INFO.name',
      titlePart1: 'امید عدلی | متخصص رشد و',
      title2Path: 'PERSONAL_INFO.experienceYears',
      titlePart2: 'پرفورمنس مارکتینگ داده‌محور',
      descPath: 'PERSONAL_INFO.bio',
      description: personal.bio,
      primaryCtaText: 'درخواست مشاوره رشد',
      primaryCtaType: 'contact',
      secondaryCtaText: 'مشاهده رزومه کاری',
      secondaryCtaType: 'resume',
      badges: ['ضمانت شفافیت داده‌ها', '+۵۰ کمپین موفق ویدئویی و کلیکی', 'گزارش‌دهی زنده Looker Studio'],
      gradientTheme: 'from-[#2563eb] via-[#3b82f6] to-[#5ce1e6]'
    },
    {
      id: 'cro',
      badgePath: 'BUSINESS_ANALYSIS_DATA.headline',
      badge: data.BUSINESS_ANALYSIS_DATA?.headline || 'بهینه‌سازی نرخ تبدیل (CRO) & A/B Testing',
      icon: <Target className="w-4 h-4 text-[#2563eb]" />,
      title1Path: 'BUSINESS_ANALYSIS_DATA.headline',
      titlePart1: 'کاهش ریزش کاربران در',
      title2Path: 'PERSONAL_INFO.campaignsCount',
      titlePart2: 'مسیر خرید و رزرو آنلاین',
      descPath: 'BUSINESS_ANALYSIS_DATA.subheadline',
      description: data.BUSINESS_ANALYSIS_DATA?.subheadline || 'شناسایی دقیق نقاط افت کاربران با Hotjar، Microsoft Clarity و GA4.',
      primaryCtaText: 'درخواست آنالیز Funnel',
      primaryCtaType: 'contact',
      secondaryCtaText: 'مشاهده نمونه پروژه‌ها',
      secondaryCtaType: 'portfolio',
      badges: ['کاهش Drop-off در مسیر خرید', 'اجرای موفق تست‌های A/B', 'تحلیل رفتار کاربر با Clarity'],
      gradientTheme: 'from-[#1d4ed8] via-[#2563eb] to-[#3b82f6]'
    },
    {
      id: 'webdesign',
      badgePath: 'HERO_SLIDES.webdesign.badge',
      badge: 'طراحی وب‌سایت & اپلیکیشن اختصاصی',
      icon: <Code2 className="w-4 h-4 text-[#2563eb]" />,
      title1Path: 'HERO_SLIDES.webdesign.title1',
      titlePart1: 'طراحی و توسعه وب‌سایت و',
      title2Path: 'HERO_SLIDES.webdesign.title2',
      titlePart2: 'اپلیکیشن اختصاصی با تمرکز بر تبدیل',
      descPath: 'HERO_SLIDES.webdesign.desc',
      description: 'طراحی UI/UX مدرن، سریع و کاملاً واکنش‌گرا برای وب‌سایت و اپلیکیشن کسب‌وکار شما؛ ساخته‌شده با استانداردهای فنی روز و بهینه برای تبدیل کاربر.',
      primaryCtaText: 'شروع پروژه طراحی',
      primaryCtaType: 'contact',
      secondaryCtaText: 'مشاهده نمونه‌کارها',
      secondaryCtaType: 'portfolio',
      badges: ['طراحی واکنش‌گرا (Responsive)', 'سرعت بارگذاری بالا', 'تجربه کاربری اختصاصی'],
      gradientTheme: 'from-[#2563eb] via-[#8b5cf6] to-[#5ce1e6]'
    },
    {
      id: 'social',
      badgePath: 'HERO_SLIDES.social.badge',
      badge: 'استراتژی سوشال مدیا & کانتنت کلندر',
      icon: <Megaphone className="w-4 h-4 text-[#2563eb]" />,
      title1Path: 'HERO_SLIDES.social.title1',
      titlePart1: 'رشد پایدار برند شما در',
      title2Path: 'HERO_SLIDES.social.title2',
      titlePart2: 'شبکه‌های اجتماعی با محتوای هدفمند',
      descPath: 'HERO_SLIDES.social.desc',
      description: 'تدوین استراتژی محتوا، تقویم انتشار منظم و مدیریت حرفه‌ای شبکه‌های اجتماعی برای افزایش تعامل و اعتماد مخاطب به برند شما.',
      primaryCtaText: 'درخواست استراتژی محتوا',
      primaryCtaType: 'contact',
      secondaryCtaText: 'مشاهده نمونه‌کارها',
      secondaryCtaType: 'portfolio',
      badges: ['تقویم محتوایی منظم', 'رشد تعامل مخاطب', 'استراتژی برندینگ اختصاصی'],
      gradientTheme: 'from-[#8b5cf6] via-[#3b82f6] to-[#5ce1e6]'
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, slides.length]);

  // Notify parent about the currently active slide (used to sync the hero visual)
  useEffect(() => {
    onSlideChange?.(slides[currentSlide].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext(); // swipe left (next in RTL)
      else handlePrev(); // swipe right (prev in RTL)
    }
    touchStartX.current = null;
  };

  const activeSlide = slides[currentSlide];

  const handlePrimaryCta = (type: SlideItem['primaryCtaType']) => {
    onNavigate(type);
  };

  const handleSecondaryCta = (type: SlideItem['secondaryCtaType']) => {
    if (type === 'resume') {
      onOpenResume();
    } else {
      onNavigate(type);
    }
  };

  return (
    <div 
      className="relative space-y-5 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Slider Navigation Header / Indicators */}
      <div className="flex items-center justify-between gap-3">
        {/* Category Badge pill with icon */}
        <div 
          key={`badge-${activeSlide.id}`}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-500 animate-fadeIn ${
            isDark 
              ? 'bg-white/10 border-[#3b82f6]/40 text-[#60a5fa]' 
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}
        >
          {activeSlide.icon}
          <span className="text-[11px] sm:text-xs font-black tracking-wide">{activeSlide.badge}</span>
        </div>
      </div>

      {/* Main Slide Content Wrapper */}
      <div className="min-h-[210px] sm:min-h-[230px] flex flex-col justify-center space-y-3.5">
        {/* Main Headline */}
        <h1 
          key={`title-${activeSlide.id}`}
          className="text-2xl sm:text-4xl lg:text-5xl font-black leading-[1.25] tracking-tight text-white transition-all duration-500 animate-fadeIn"
        >
          <span className={isDark ? 'text-white' : 'text-[#1a1240]'}>
            {activeSlide.titlePart1}
          </span>
          <br />
          <span className={`bg-gradient-to-r ${activeSlide.gradientTheme} bg-clip-text text-transparent`}>
            {activeSlide.titlePart2}
          </span>
        </h1>

        {/* Subheadline Description */}
        <p 
          key={`desc-${activeSlide.id}`}
          className={`text-sm sm:text-base leading-relaxed max-w-2xl transition-all duration-500 animate-fadeIn ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {activeSlide.description}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3.5 pt-1">
        <button
          onClick={() => handlePrimaryCta(activeSlide.primaryCtaType)}
          className="glow-btn px-6 py-3 rounded-full text-xs sm:text-sm font-black text-white flex items-center gap-2.5 cursor-pointer group shadow-xl"
        >
          <span>{activeSlide.primaryCtaText}</span>
          <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>

        <button
          onClick={() => handleSecondaryCta(activeSlide.secondaryCtaType)}
          className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold border backdrop-blur-xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isDark 
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-[#3b82f6]/50' 
              : 'bg-white border-slate-300 text-[#1a1240] hover:bg-slate-50 hover:border-blue-400 shadow-md'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>{activeSlide.secondaryCtaText}</span>
        </button>
      </div>

      {/* Dynamic Trust Micro-Badges */}
      <div 
        key={`badges-${activeSlide.id}`}
        className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-5 text-[11px] sm:text-xs text-slate-400 transition-all duration-500 animate-fadeIn"
      >
        {activeSlide.badges.map((badgeText, idx) => (
          <div key={idx} className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{badgeText}</span>
          </div>
        ))}
      </div>

      {/* Slide Pagination Dots / Progress Bars */}
      <div className="flex items-center gap-1.5 pt-1">
        {slides.map((s, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`رفتن به اسلاید ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'w-8 bg-gradient-to-r from-[#2563eb] to-[#3b82f6]' 
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
