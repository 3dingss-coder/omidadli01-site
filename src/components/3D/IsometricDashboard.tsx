import React, { useState, useEffect } from 'react';
import { Theme, CaseStudy } from '../../types';
import { IconBadge3D } from './3DIconBadge';
import { 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink,
  Rocket,
  MousePointer2,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES } from '../../data/content';

interface ShowcaseExperience {
  id: string;
  client: string;
  location: string;
  domain: string;
  role: string;
  badge: string;
  gradient: string;
  glowColor: string;
  glowHex: string;
  heroColor: string;
  mainStat: {
    value: string;
    label: string;
    trend: string;
    trendType: 'up' | 'down';
  };
  secondaryStat: {
    value: string;
    label: string;
    trend: string;
  };
  tertiaryStat: {
    value: string;
    label: string;
    growth: string;
  };
  chartPoints: number[];
  chartType: string;
  userSimulatedAction: string;
  cursorTarget: 'metric' | 'chart' | 'button';
  caseStudyId?: string;
  quote: string;
  timeCode: string;
}

const EXPERIENCES: ShowcaseExperience[] = [
  {
    id: 'amir-optic-web',
    client: 'امیر اپتیک',
    location: 'تهران',
    domain: 'طراحی سایت و فروشگاه آنلاین',
    role: 'طراحی UI/UX، توسعه وب‌سایت فروشگاهی و Data Tracking',
    badge: 'طراحی سایت فروشگاهی + UX & Tracking',
    gradient: 'from-[#06b6d4] via-[#0284c7] to-[#2563eb]',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    glowHex: '#06b6d4',
    heroColor: '#06b6d4',
    mainStat: {
      value: '+۱۴۰٪',
      label: 'رشد فروش آنلاین پس از بازطراحی',
      trend: 'طراحی مدرن و ریسپانسیو',
      trendType: 'up'
    },
    secondaryStat: {
      value: '+۳۸٪',
      label: 'افزایش نرخ تبدیل سبد خرید',
      trend: 'ساده‌سازی فرایند تسویه‌حساب'
    },
    tertiaryStat: {
      value: '۱۰۰٪',
      label: 'پیاده‌سازی Data Tracking و سرعت بالا',
      growth: 'SEO & Speed'
    },
    chartPoints: [18, 28, 42, 56, 72, 85, 96],
    chartType: 'روند صعودی تراکنش‌ها و سفارش‌های موفق پس از بازطراحی سایت',
    userSimulatedAction: 'بررسی فرایند تسویه‌حساب و تجربه کاربری در وب‌سایت امیر اپتیک...',
    cursorTarget: 'metric',
    caseStudyId: 'amir-optic',
    quote: '«بازطراحی معماری صفحات فروشگاه و بهینه‌سازی مسیر خرید باعث جهش بیش از دو برابری فروش شد.»',
    timeCode: '00:04'
  },
  {
    id: 'fazanavard-landing',
    client: 'فضانورد',
    location: 'تهران',
    domain: 'طراحی سایت محصول و وب‌اپلیکیشن (fazanavard.app)',
    role: 'طراحی رابط کاربری (UI/UX) و راه‌اندازی وب‌سایت اختصاصی محصول',
    badge: 'Landing Page & Web App Design',
    gradient: 'from-[#6366f1] via-[#8b5cf6] to-[#ec4899]',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    glowHex: '#6366f1',
    heroColor: '#818cf8',
    mainStat: {
      value: '۹۸/۱۰۰',
      label: 'امتیاز سرعت و عملکرد (PageSpeed)',
      trend: 'کدنویسی بهینه و سبک',
      trendType: 'up'
    },
    secondaryStat: {
      value: '+۶۵٪',
      label: 'نرخ تعامل و ثبت‌نام اولیه کاربران',
      trend: 'طراحی مینیمال و گیرا'
    },
    tertiaryStat: {
      value: 'Mobile-First',
      label: 'نمایش بی‌نقص در موبایل و دسکتاپ',
      growth: 'Responsive Design'
    },
    chartPoints: [22, 38, 45, 62, 78, 88, 98],
    chartType: 'نرخ رشد ثبت‌نام کاربران در وب‌سایت محصول',
    userSimulatedAction: 'تست عملکرد لودینگ و رابط کاربری وب‌سایت فضانورد...',
    cursorTarget: 'chart',
    caseStudyId: 'fazanavard',
    quote: '«طراحی هویت بصری جذاب و لود زیر ۱ ثانیه باعث شد بیش از ۶۰٪ بازدیدکنندگان دمو را امتحان کنند.»',
    timeCode: '00:09'
  },
  {
    id: 'partoka-corporate',
    client: 'پارتوکا',
    location: 'تهران',
    domain: 'طراحی و توسعه وب‌سایت‌های سازمانی و شرکتی',
    role: 'طراحی ساختار، توسعه ۶ سایت سازمانی و زیرساخت SEO',
    badge: 'طراحی ۶ وب‌سایت شرکتی + سئو',
    gradient: 'from-[#0d9488] via-[#059669] to-[#10b981]',
    glowColor: 'rgba(13, 148, 136, 0.5)',
    glowHex: '#0d9488',
    heroColor: '#14b8a6',
    mainStat: {
      value: '۶ وب‌سایت',
      label: 'طراحی و استقرار وب‌سایت‌های شرکتی',
      trend: 'سیستم منسجم و سریع',
      trendType: 'up'
    },
    secondaryStat: {
      value: '+۸۰',
      label: 'صفحات لندینگ و محتوای استاندارد',
      trend: 'طراحی سئومحور و منعطف'
    },
    tertiaryStat: {
      value: '۳ برابر',
      label: 'جذب لیدهای سازمانی B2B',
      growth: 'فرم‌های تماس بهینه'
    },
    chartPoints: [20, 32, 48, 60, 74, 86, 95],
    chartType: 'رشد درخواست‌های ثبت‌شده در وب‌سایت‌های سازمانی',
    userSimulatedAction: 'مشاهده معماری سایت و فرم‌های درخواست همکاری سازمانی...',
    cursorTarget: 'metric',
    caseStudyId: 'partoka',
    quote: '«طراحی ساختاریافته وب‌سایت‌ها همراه با سئوی تکنیکال، جریان ورودی لیدهای B2B را ۳ برابر کرد.»',
    timeCode: '00:15'
  },
  {
    id: 'eqamat24-cro',
    client: 'اقامت ۲۴',
    location: 'مشهد',
    domain: 'گردشگری و سفر آنلاین',
    role: 'بهینه‌سازی نرخ تبدیل (CRO) و فانل رزرو',
    badge: 'تست‌های موفق A/B و کاهش Drop-off',
    gradient: 'from-[#06b6d4] via-[#3b82f6] to-[#6366f1]',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    glowHex: '#06b6d4',
    heroColor: '#5ce1e6',
    mainStat: {
      value: '+۲۸٪',
      label: 'افزایش نرخ تبدیل مسیر رزرو',
      trend: 'A/B Testing Winner',
      trendType: 'up'
    },
    secondaryStat: {
      value: '-۳۵٪',
      label: 'کاهش ریزش مرحله پرداخت',
      trend: 'بهینه‌سازی چک‌اوت'
    },
    tertiaryStat: {
      value: '۱۰۰٪',
      label: 'شناسایی گلوگاه‌های رفتار با Clarity',
      growth: 'Hotjar & Clarity'
    },
    chartPoints: [25, 32, 45, 42, 68, 74, 95],
    chartType: 'روند صعودی نرخ رزرو نهایی پس از تست‌های A/B',
    userSimulatedAction: 'تحلیل نقشه حرارتی و نتایج تست A/B مسیر خرید اقامت ۲۴...',
    cursorTarget: 'metric',
    caseStudyId: 'eqamat24-cro',
    quote: '«بررسی رکوردهای رفتاری و اصلاح مرحله پرداخت باعث شد نرخ کنسلی خرید بیش از یک سوم کم بشه.»',
    timeCode: '00:20'
  },
  {
    id: 'iranbroker-tracking',
    client: 'ایران بروکر',
    location: 'مشهد',
    domain: 'فین‌تک، رمزارز و خدمات مالی',
    role: 'معماری جامع ترکینگ و انتساب (Attribution)',
    badge: 'GTM Event Architecture & Server-Side',
    gradient: 'from-[#3b82f6] via-[#6366f1] to-[#8b5cf6]',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    glowHex: '#3b82f6',
    heroColor: '#4c8dff',
    mainStat: {
      value: '+۸۵٪',
      label: 'دقت در مدل انتساب ترافیک',
      trend: 'حذف همپوشانی داده‌ها',
      trendType: 'up'
    },
    secondaryStat: {
      value: '-۳۰٪',
      label: 'هزینه جذب کاربر (Display Ads)',
      trend: 'کاهش چشمگیر CPA'
    },
    tertiaryStat: {
      value: '+۹۵٪',
      label: 'اعتبارسنجی ایونت‌های GTM',
      growth: 'دقت ۱۰۰٪ دیتابیس'
    },
    chartPoints: [30, 28, 55, 62, 70, 82, 92],
    chartType: 'کیفیت داده‌های ورودی و همبستگی کانال‌های جذب',
    userSimulatedAction: 'بررسی ساختار ایونت‌های سرورساید و کاهش CPA در ایران بروکر...',
    cursorTarget: 'chart',
    caseStudyId: 'iranbroker-tracking',
    quote: '«با معماری جدید GTM، کانال‌های ورودی کاملاً شفاف شدند و هزینه تبلیغات بنری ۳۰٪ کاهش یافت.»',
    timeCode: '00:26'
  },
  {
    id: 'dayan-performance',
    client: 'دایان',
    location: 'مشهد',
    domain: 'پرفورمنس مارکتینگ و بهینه‌سازی بودجه',
    role: 'توسعه سیستم امتیازدهی هوشمند (Publisher Scoring)',
    badge: 'Dynamic Scoring & Funnel',
    gradient: 'from-[#8b5cf6] via-[#a855f7] to-[#ec4899]',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    glowHex: '#8b5cf6',
    heroColor: '#8b5cf6',
    mainStat: {
      value: '+۴۵٪',
      label: 'کیفیت لیدهای دریافتی',
      trend: 'ارزیابی خودکار لیدها',
      trendType: 'up'
    },
    secondaryStat: {
      value: '+۳۵٪',
      label: 'بهره‌وری کل بودجه بازاریابی',
      trend: 'حذف بودجه‌های سوخته'
    },
    tertiaryStat: {
      value: '۱۰۰٪',
      label: 'امتیازدهی لحظه‌ای پابلیشرها',
      growth: 'الگوریتم اختصاصی'
    },
    chartPoints: [20, 38, 35, 58, 64, 78, 96],
    chartType: 'نرخ رشد لیدهای واجد شرایط و باکیفیت بالا',
    userSimulatedAction: 'فیلتر کردن ناشران تبلیغاتی با بالاترین بازده و حذف کانال‌های هرز...',
    cursorTarget: 'metric',
    caseStudyId: 'dayan-performance',
    quote: '«سیستم امتیازدهی باعث شد بودجه دقیقا جایی خرج بشه که مشتری واقعی تولید میکنه.»',
    timeCode: '00:32'
  },
  {
    id: 'eads-campaigns',
    client: 'ای ادز',
    location: 'تهران',
    domain: 'آژانس تبلیغات دیجیتال و بین‌الملل',
    role: 'مدیریت کمپین‌های پرفورمنس Google & Meta Ads',
    badge: 'مدیریت کمپین‌های ۵ برند تجاری همزمان',
    gradient: 'from-[#f59e0b] via-[#f97316] to-[#ef4444]',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    glowHex: '#f59e0b',
    heroColor: '#f59e0b',
    mainStat: {
      value: '۳.۵٪',
      label: 'نرخ کلیک به نمایش (از ۱.۲٪)',
      trend: 'رشد +۱۹۱٪ CTR',
      trendType: 'up'
    },
    secondaryStat: {
      value: '+۲۵٪',
      label: 'افزایش نرخ تبدیل لندینگ‌ها',
      trend: 'بهینه‌سازی صفحه فرود'
    },
    tertiaryStat: {
      value: '۵ برند',
      label: 'مدیریت همزمان بدون خطای UTM',
      growth: 'Google + Meta Ads'
    },
    chartPoints: [18, 30, 48, 52, 69, 85, 94],
    chartType: 'نمودار اثر بخشی تست نسخه‌های تبلیغاتی و جهش CTR',
    userSimulatedAction: 'مشاهده نرخ تبدیل کمپین‌های گوگل ادز و متا ادز در داشبورد ای ادز...',
    cursorTarget: 'button',
    caseStudyId: 'eads-campaigns',
    quote: '«استانداردسازی UTMها و تست نسخه‌های تبلیغاتی CTR رو بیش از ۲.۵ برابر کرد.»',
    timeCode: '00:38'
  },
  {
    id: 'ahanonline-seo',
    client: 'آهن آنلاین',
    location: 'تهران',
    domain: 'صنعتی، فولاد و تجارت سازمانی',
    role: 'استراتژیست سئو و رتبه ۱ عبارات استراتژیک',
    badge: 'رساندن «قیمت میلگرد» به رتبه ۱ گوگل',
    gradient: 'from-[#10b981] via-[#059669] to-[#047857]',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    glowHex: '#10b981',
    heroColor: '#10b981',
    mainStat: {
      value: 'رتبه ۱',
      label: 'کلمه کلیدی «قیمت میلگرد» در گوگل',
      trend: 'جایگاه اول ارگانیک',
      trendType: 'up'
    },
    secondaryStat: {
      value: '+۳۰٪',
      label: 'ترافیک کلیدواژه‌های استراتژیک',
      trend: 'سئوی تکنیکال و محتوا'
    },
    tertiaryStat: {
      value: '۱۰+ کلمه',
      label: 'حضور در رتبه‌های بالای صفحه ۱',
      growth: 'Search Intent'
    },
    chartPoints: [22, 35, 42, 60, 72, 80, 98],
    chartType: 'رشد ترافیک ارگانیک روزانه و جایگاه‌های برتر جستجو',
    userSimulatedAction: 'مشاهده جایگاه اول کلمات کلیدی پررقابت حوزه فولاد در سرچ کنسول...',
    cursorTarget: 'metric',
    caseStudyId: 'ahanonline-seo',
    quote: '«با معماری ساختار صفحات و بهینه‌سازی بر اساس Search Intent به رتبه یک گوگل رسیدیم.»',
    timeCode: '00:44'
  }
];

// High-precision synthesized organic tone
const playInteractionTone = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.05);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // Ignore audio restrictions
  }
};

interface IsometricDashboardProps {
  theme: Theme;
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
  onNavigate?: (page: string) => void;
}

export const IsometricDashboard: React.FC<IsometricDashboardProps> = ({ 
  theme, 
  onSelectCaseStudy,
  onNavigate 
}) => {
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFinalCta, setShowFinalCta] = useState(false);

  const activeExp = EXPERIENCES[currentIndex];

  // Auto-rotation loop (increased duration by 1.5 seconds: 5900ms per experience)
  useEffect(() => {
    if (isPaused || showFinalCta) return;

    const DURATION = 5900; // 5.9 seconds per experience (1.5s longer)
    const INTERVAL = 50;
    const step = (INTERVAL / DURATION) * 100;

    const intervalId = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => {
            if (idx === EXPERIENCES.length - 1) {
              // After cycling all experiences, briefly show celebratory CTA overlay
              setShowFinalCta(true);
              return 0;
            }
            return idx + 1;
          });
          return 0;
        }
        return prev + step;
      });
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, [isPaused, showFinalCta]);

  const handleSelectExperience = (index: number) => {
    playInteractionTone();
    setShowFinalCta(false);
    setCurrentIndex(index);
    setProgress(0);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    playInteractionTone();
    setShowFinalCta(false);
    setCurrentIndex((idx) => (idx - 1 + EXPERIENCES.length) % EXPERIENCES.length);
    setProgress(0);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    playInteractionTone();
    setShowFinalCta(false);
    setCurrentIndex((idx) => (idx + 1) % EXPERIENCES.length);
    setProgress(0);
  };

  const handleViewDetails = () => {
    if (activeExp.caseStudyId && onSelectCaseStudy) {
      const found = CASE_STUDIES.find((cs) => cs.id === activeExp.caseStudyId);
      if (found) {
        onSelectCaseStudy(found);
        return;
      }
    }
    if (onNavigate) {
      onNavigate('portfolio');
    }
  };

  const handleStartCollaboration = () => {
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  // Convert chart points into smooth SVG path
  const renderSmoothPath = (points: number[]) => {
    const width = 340;
    const height = 80;
    const step = width / (points.length - 1);
    
    const coords = points.map((val, idx) => ({
      x: idx * step,
      y: height - (val / 100) * (height - 18) - 8
    }));

    if (coords.length === 0) return { linePath: '', areaPath: '', lastPoint: null };

    let linePath = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 2;
      const cp1y = curr.y;
      const cp2x = curr.x + (next.x - curr.x) / 2;
      const cp2y = next.y;
      linePath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }

    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
    return { linePath, areaPath, lastPoint: coords[coords.length - 1] };
  };

  const { linePath, areaPath, lastPoint } = renderSmoothPath(activeExp.chartPoints);

  return (
    <div 
      className="relative w-full max-w-xl mx-auto py-2 sm:py-4 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Dynamic Ambient Glow aura */}
      <motion.div 
        animate={{
          background: `radial-gradient(circle, ${activeExp.glowHex}45 0%, ${activeExp.glowHex}15 45%, transparent 70%)`
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 rounded-full blur-[80px] opacity-80 pointer-events-none -z-10"
      />

      {/* Floating 3D Satellite Badges */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -right-2 z-20"
      >
        <IconBadge3D iconName="rocket" theme={theme} size="lg" glowColor="magenta" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 -left-6 z-20 hidden sm:block"
      >
        <IconBadge3D iconName="target" theme={theme} size="md" glowColor="cyan" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-4 right-8 z-20"
      >
        <IconBadge3D iconName="chart" theme={theme} size="md" glowColor="blue" />
      </motion.div>

      {/* Main Isometric Container with 3D Depth Frame */}
      <div 
        className="relative z-10 transition-transform duration-500 hover:rotate-0"
        style={{
          transform: 'perspective(1100px) rotateX(8deg) rotateY(-6deg) rotateZ(1deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Main Terminal / Screen Player Window */}
        <div className={`relative p-4 sm:p-5 rounded-[26px] border backdrop-blur-2xl transition-all duration-500 overflow-hidden ${
          isDark 
            ? 'bg-[#10092d]/92 border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(92,225,230,0.18)]' 
            : 'bg-white/95 border-slate-200/90 shadow-[0_25px_55px_rgba(76,141,255,0.2),0_4px_20px_rgba(0,0,0,0.06)]'
        }`}>
          
          {/* Top Player Header: "بخشی از تجربیات من" + Screen Record Indicator & Controls */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 flex-wrap gap-2">
            {/* Title & Live Rec Indicator */}
            <div className="flex items-center gap-2.5">
              {/* Red Blinking REC dot */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-[10px] font-bold text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-mono">{activeExp.timeCode} REC</span>
              </div>

              {/* Exact Clean Title without sparkle icon */}
              <h2 className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                بخشی از تجربیات من
              </h2>
            </div>

            {/* Step Controls (Clean and Minimalist) */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isDark ? 'bg-white/8 hover:bg-white/15 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                aria-label="تجربه قبلی"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleNext}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isDark ? 'bg-white/8 hover:bg-white/15 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                aria-label="تجربه بعدی"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Pills for Real Brands */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-3">
            {EXPERIENCES.map((exp, idx) => {
              const isActive = idx === currentIndex && !showFinalCta;
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelectExperience(idx)}
                  className={`relative px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'text-white shadow-md'
                      : isDark
                      ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${exp.glowHex}, #4c8dff)` : undefined,
                    boxShadow: isActive ? `0 4px 14px ${exp.glowColor}` : undefined
                  }}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  <span>{exp.client}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Interactive Experience Screen or Final Collaboration CTA */}
          <div className="relative min-h-[260px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {showFinalCta ? (
                /* Final Collaboration Invite Overlay (دعوت به همکاری نهایی) */
                <motion.div
                  key="final-cta"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-4 my-auto ${
                    isDark 
                      ? 'bg-gradient-to-b from-[#1a1040] via-[#0d0726] to-[#070318] border-[#5ce1e6]/40 shadow-[0_0_30px_rgba(92,225,230,0.25)]' 
                      : 'bg-gradient-to-b from-cyan-50 via-white to-indigo-50/50 border-cyan-300 shadow-lg'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5ce1e6] to-[#8b5cf6] flex items-center justify-center text-white shadow-lg border border-white/40">
                    <Rocket className="w-6 h-6 animate-bounce" />
                  </div>

                  <div className="space-y-1.5 max-w-sm">
                    <h3 className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                      آماده‌اید پروژه بعدی شما، داستان موفقیت بعدی باشه؟
                    </h3>
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      از طراحی سایت تا سئو، ترکینگ و تبلیغات پرفورمنس — بیاید در یک جلسه رایگان مسیر رشد شما رو بررسی کنیم.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleStartCollaboration}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5ce1e6] via-[#4c8dff] to-[#8b5cf6] text-white text-xs font-black shadow-lg hover:shadow-cyan-500/40 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>شروع همکاری و مشاوره</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setShowFinalCta(false);
                        setCurrentIndex(0);
                        setProgress(0);
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        isDark ? 'bg-white/10 hover:bg-white/20 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      مشاهده مجدد
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Single Experience Real Data Screen */
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-3"
                >
                  {/* Brand Header + Domain + Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm sm:text-base font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                          {activeExp.client} ({activeExp.location})
                        </h3>
                        <span className="text-[10px] sm:text-[11px] text-slate-400">
                          • {activeExp.domain}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">
                        {activeExp.role}
                      </p>
                    </div>

                    <div 
                      className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border flex items-center gap-1.5 shrink-0"
                      style={{
                        backgroundColor: `${activeExp.glowHex}15`,
                        borderColor: `${activeExp.glowHex}40`,
                        color: isDark ? '#ffffff' : '#0f172a'
                      }}
                    >
                      <span>{activeExp.badge}</span>
                    </div>
                  </div>

                  {/* Real Metric Results 3-Column Display */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Primary Hero Result */}
                    <div className={`p-2.5 rounded-xl border relative transition-all ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-slate-400 truncate">دست‌آورد اصلی</span>
                        <span className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-black">
                          ▲
                        </span>
                      </div>
                      <div 
                        className="text-base sm:text-lg font-black dir-ltr text-right"
                        style={{ color: activeExp.glowHex }}
                      >
                        {activeExp.mainStat.value}
                      </div>
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-300 mt-0.5 truncate">
                        {activeExp.mainStat.label}
                      </p>
                    </div>

                    {/* Secondary Result */}
                    <div className={`p-2.5 rounded-xl border ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-slate-400 truncate">شاخص دوم</span>
                        <span className="p-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[9px] font-black">
                          ✓
                        </span>
                      </div>
                      <div className={`text-base sm:text-lg font-black dir-ltr text-right ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                        {activeExp.secondaryStat.value}
                      </div>
                      <p className="text-[9px] sm:text-[10px] font-medium text-slate-400 mt-0.5 truncate">
                        {activeExp.secondaryStat.label}
                      </p>
                    </div>

                    {/* Tertiary Result */}
                    <div className={`p-2.5 rounded-xl border ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-slate-400 truncate">ابزار و دقت</span>
                        <span className="p-0.5 rounded bg-purple-500/20 text-purple-400 text-[9px] font-black">
                          ★
                        </span>
                      </div>
                      <div className={`text-base sm:text-lg font-black dir-ltr text-right ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                        {activeExp.tertiaryStat.value}
                      </div>
                      <p className="text-[9px] sm:text-[10px] font-medium text-slate-400 mt-0.5 truncate">
                        {activeExp.tertiaryStat.label}
                      </p>
                    </div>
                  </div>

                  {/* Simulated Screen Viewing Graph & User Interaction Cursor */}
                  <div className={`p-3 rounded-xl border relative overflow-hidden ${
                    isDark ? 'bg-black/40 border-white/10' : 'bg-white border-slate-200 shadow-inner'
                  }`}>
                    {/* Simulated Floating User Cursor inspecting the live data */}
                    <motion.div
                      animate={{
                        x: [20, 160, 240, 60],
                        y: [10, 40, 20, 50]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut'
                      }}
                      className="absolute z-20 pointer-events-none flex items-center gap-1.5"
                    >
                      <MousePointer2 className="w-4 h-4 text-[#5ce1e6] drop-shadow-[0_2px_8px_rgba(92,225,230,0.8)] fill-[#5ce1e6]" />
                      <span className="px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-bold text-cyan-200 border border-cyan-400/40 backdrop-blur-sm whitespace-nowrap">
                        امید عدلی در حال تحلیل
                      </span>
                    </motion.div>

                    {/* Chart Header */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" style={{ color: activeExp.glowHex }} />
                        <span className="text-[10px] sm:text-[11px] font-bold">
                          {activeExp.chartType}
                        </span>
                      </div>

                      <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Live Result
                      </span>
                    </div>

                    {/* SVG Curve */}
                    <div className="h-16 w-full relative flex items-end">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 340 80" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`grad-${activeExp.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={activeExp.glowHex} stopOpacity="0.4" />
                            <stop offset="100%" stopColor={activeExp.glowHex} stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id={`stroke-${activeExp.id}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5ce1e6" />
                            <stop offset="50%" stopColor={activeExp.glowHex} />
                            <stop offset="100%" stopColor="#4c8dff" />
                          </linearGradient>
                        </defs>

                        <motion.path
                          initial={{ d: `M 0,80 L 340,80 L 340,80 L 0,80 Z` }}
                          animate={{ d: areaPath }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          fill={`url(#grad-${activeExp.id})`}
                        />

                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1, d: linePath }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          fill="none"
                          stroke={`url(#stroke-${activeExp.id})`}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      {lastPoint && (
                        <div 
                          className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          style={{
                            left: `${(lastPoint.x / 340) * 100}%`,
                            top: `${(lastPoint.y / 80) * 100}%`
                          }}
                        >
                          <div 
                            className="w-full h-full rounded-full animate-ping opacity-75"
                            style={{ backgroundColor: activeExp.glowHex }}
                          />
                          <div className="absolute inset-0 rounded-full bg-white shadow-md" />
                        </div>
                      )}
                    </div>

                    {/* Quote statement */}
                    <div className="pt-1.5 border-t border-white/10 text-[10px] text-slate-300 italic font-medium leading-relaxed">
                      {activeExp.quote}
                    </div>
                  </div>

                  {/* Action Bar: Case Study CTA + Collaboration Trigger */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={handleViewDetails}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5ce1e6] hover:text-white transition-colors cursor-pointer group/btn"
                    >
                      <span>مشاهده جزئیات {activeExp.client}</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-0.5" />
                    </button>

                    <button
                      onClick={handleStartCollaboration}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#5ce1e6] to-[#4c8dff] text-white text-[11px] font-black shadow-md hover:shadow-cyan-500/30 hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>درخواست پروژه مشابه</span>
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Video Timeline Progress Bar */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div 
                className="h-full rounded-full"
                style={{
                  width: showFinalCta ? '100%' : `${progress}%`,
                  backgroundColor: showFinalCta ? '#5ce1e6' : activeExp.glowHex
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">
              {showFinalCta ? 'همکاری' : `${currentIndex + 1} / ${EXPERIENCES.length}`}
            </span>
          </div>

        </div>

        {/* Isometric Base Stand Frame */}
        <div className={`h-3 w-[102%] -mr-[1%] rounded-b-2xl border-x border-b backdrop-blur-xl transition-colors ${
          isDark 
            ? 'bg-gradient-to-r from-[#1c0e3e] via-[#10092d] to-[#1c0e3e] border-white/15 shadow-xl' 
            : 'bg-slate-200 border-slate-300 shadow-md'
        }`} />
      </div>
    </div>
  );
};
