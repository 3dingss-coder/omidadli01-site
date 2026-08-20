import React from 'react';
import { Theme } from '../types';
import { IconBadge3D } from './3D/3DIconBadge';
import {
  TrendingUp, MousePointerClick, Code2, Smartphone, Rocket, BarChart3,
  Calendar, Instagram, Send, Hash, ArrowUpRight, CheckCircle2, Activity
} from 'lucide-react';

export type ServiceVisualId = 'cro' | 'webdesign' | 'performance' | 'social';

interface ServiceHeroVisualProps {
  theme: Theme;
  serviceId: ServiceVisualId;
}

const ScreenFrame: React.FC<{ theme: Theme; children: React.ReactNode; tag: string }> = ({ theme, children, tag }) => {
  const isDark = theme === 'dark';
  return (
    <div
      className="relative z-10 transition-transform duration-500 hover:rotate-1"
      style={{
        transform: 'perspective(1000px) rotateX(12deg) rotateY(-10deg) rotateZ(2deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className={`p-4 md:p-6 rounded-[28px] border backdrop-blur-2xl transition-all duration-300 ${
        isDark
          ? 'bg-[#1a1240]/80 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(76,141,255,0.25)]'
          : 'bg-white/85 border-white shadow-[0_25px_60px_rgba(76,141,255,0.2)]'
      }`}>
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block" />
            <span className="text-xs text-slate-400 font-mono mr-2">{tag}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>پایدار - Live</span>
          </div>
        </div>
        {children}
      </div>
      <div className={`h-4 w-[104%] -mr-[2%] rounded-b-2xl border-x border-b backdrop-blur-xl transition-colors ${
        theme === 'dark' ? 'bg-gradient-to-r from-[#2d1b5e] via-[#1a1240] to-[#2d1b5e] border-white/20' : 'bg-slate-200 border-slate-300'
      }`} />
    </div>
  );
};

const Wrapper: React.FC<{ children: React.ReactNode; badges: { icon: React.ReactNode; pos: string; glow: 'blue' | 'magenta' | 'cyan' | 'purple'; float?: string }[] }> = ({ children, badges }) => (
  <div className="relative w-full max-w-xl mx-auto py-6">
    <div
      className="absolute inset-0 rounded-full blur-[80px] opacity-70 pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(76,141,255,0.4) 0%, rgba(255,79,216,0.3) 50%, transparent 70%)' }}
    />
    {badges.map((b, i) => (
      <div key={i} className={`absolute ${b.pos} z-20 ${b.float || 'animate-float'}`}>
        {b.icon}
      </div>
    ))}
    {children}
  </div>
);

// 1) CRO — Conversion Rate Optimization: funnel + A/B split test visual
const CROVisual: React.FC<{ theme: Theme }> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <Wrapper
      badges={[
        { icon: <IconBadge3D iconName="target" theme={theme} size="lg" glowColor="magenta" />, pos: '-top-6 -right-2', float: 'animate-float' },
        { icon: <IconBadge3D iconName="bar-chart" theme={theme} size="md" glowColor="cyan" />, pos: 'top-1/2 -left-6', float: 'animate-float-delayed' },
        { icon: <IconBadge3D iconName="zap" theme={theme} size="md" glowColor="blue" />, pos: '-bottom-4 right-10', float: 'animate-float' },
      ]}
    >
      <ScreenFrame theme={theme} tag="CRO_AB_Testing_Engine">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400">نسخه A (فعلی)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10 text-slate-300">Control</span>
            </div>
            <div className="h-16 flex items-end gap-1.5">
              {[40, 55, 35, 60].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-slate-500/40" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className={`text-lg font-extrabold mt-2 dir-ltr text-right ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>2.1%</div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-white/5 border-emerald-500/30' : 'bg-emerald-50 border-emerald-300'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-emerald-400 font-bold">نسخه B (بهینه‌شده)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400">Winner</span>
            </div>
            <div className="h-16 flex items-end gap-1.5">
              {[65, 80, 70, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500 to-cyan-400" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="text-lg font-extrabold mt-2 dir-ltr text-right text-emerald-400">4.8%</div>
          </div>
        </div>
        <div className={`p-4 rounded-2xl border relative overflow-hidden ${isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-200 shadow-inner'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs font-bold">قیف تبدیل کاربر</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> +۱۲۸٪</span>
          </div>
          <div className="space-y-1.5">
            {[{ w: '100%', label: 'بازدید صفحه' }, { w: '72%', label: 'مشاهده محصول' }, { w: '48%', label: 'افزودن به سبد' }, { w: '31%', label: 'خرید نهایی' }].map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1 h-5 rounded-lg bg-white/5 overflow-hidden">
                  <div className="h-full rounded-lg bg-gradient-to-l from-[#2563eb] to-[#5ce1e6]" style={{ width: r.w }} />
                </div>
                <span className="text-[10px] text-slate-400 w-20 shrink-0">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </ScreenFrame>
    </Wrapper>
  );
};

// 2) Web & App Design — device mockups
const WebDesignVisual: React.FC<{ theme: Theme }> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <Wrapper
      badges={[
        { icon: <IconBadge3D iconName="code" theme={theme} size="lg" glowColor="blue" />, pos: '-top-6 -right-2', float: 'animate-float' },
        { icon: <IconBadge3D iconName="layers" theme={theme} size="md" glowColor="purple" />, pos: 'top-1/2 -left-6', float: 'animate-float-delayed' },
        { icon: <IconBadge3D iconName="award" theme={theme} size="md" glowColor="cyan" />, pos: '-bottom-4 right-10', float: 'animate-float' },
      ]}
    >
      <ScreenFrame theme={theme} tag="Web_App_Studio_Preview">
        <div className="flex gap-4 items-end">
          <div className={`flex-1 rounded-2xl border p-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-1.5 mb-3">
              <Code2 className="w-3.5 h-3.5 text-[#5ce1e6]" />
              <span className="text-[11px] font-bold text-slate-300">وب‌سایت اختصاصی</span>
            </div>
            <div className="space-y-2">
              <div className="h-16 rounded-xl bg-gradient-to-br from-[#2563eb]/40 to-[#8b5cf6]/30" />
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-8 rounded-lg bg-white/10" />
                <div className="h-8 rounded-lg bg-white/10" />
                <div className="h-8 rounded-lg bg-white/10" />
              </div>
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="h-2 w-1/2 rounded bg-white/10" />
            </div>
          </div>
          <div className={`w-24 rounded-[20px] border p-2 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-center mb-2">
              <Smartphone className="w-3.5 h-3.5 text-[#8b5cf6]" />
            </div>
            <div className="space-y-1.5">
              <div className="h-10 rounded-lg bg-gradient-to-br from-[#8b5cf6]/40 to-[#5ce1e6]/30" />
              <div className="h-5 rounded-lg bg-white/10" />
              <div className="h-5 rounded-lg bg-white/10" />
              <div className="h-5 rounded-lg bg-emerald-500/30" />
            </div>
          </div>
        </div>
        <div className={`mt-4 p-3.5 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold">۹۸/۱۰۰ سرعت بارگذاری (Core Web Vitals)</span>
          </div>
          <span className="text-[11px] text-slate-400">UI/UX سفارشی</span>
        </div>
      </ScreenFrame>
    </Wrapper>
  );
};

// 3) Performance Marketing & Campaign Management — reuse dashboard-style visual
const PerformanceVisual: React.FC<{ theme: Theme }> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <Wrapper
      badges={[
        { icon: <IconBadge3D iconName="rocket" theme={theme} size="lg" glowColor="magenta" />, pos: '-top-6 -right-2', float: 'animate-float' },
        { icon: <IconBadge3D iconName="target" theme={theme} size="md" glowColor="cyan" />, pos: 'top-1/2 -left-6', float: 'animate-float-delayed' },
        { icon: <IconBadge3D iconName="chart" theme={theme} size="md" glowColor="blue" />, pos: '-bottom-4 right-10', float: 'animate-float' },
      ]}
    >
      <ScreenFrame theme={theme} tag="Performance_Campaign_Manager">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className={`p-3 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-lg font-extrabold text-[#5ce1e6]">5.4x</div>
            <div className="text-[10px] text-slate-400 mt-0.5">ROAS</div>
          </div>
          <div className={`p-3 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-lg font-extrabold text-emerald-400">-۵۴٪</div>
            <div className="text-[10px] text-slate-400 mt-0.5">CAC</div>
          </div>
          <div className={`p-3 rounded-xl border text-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="text-lg font-extrabold text-[#8b5cf6]">+۲۴۰٪</div>
            <div className="text-[10px] text-slate-400 mt-0.5">CTR</div>
          </div>
        </div>
        <div className={`p-4 rounded-2xl border relative overflow-hidden ${isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-200 shadow-inner'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs font-bold">روند فروش کمپین (۳۰ روز اخیر)</span>
            </div>
            <span className="text-[11px] text-slate-400">$248,500</span>
          </div>
          <div className="h-24 w-full relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="perfChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4c8dff" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="perfLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5ce1e6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#4c8dff" />
                </linearGradient>
              </defs>
              <path d="M0,80 Q40,65 80,75 T160,35 T240,40 T300,10 L300,100 L0,100 Z" fill="url(#perfChartGrad)" />
              <path d="M0,80 Q40,65 80,75 T160,35 T240,40 T300,10" fill="none" stroke="url(#perfLineGrad)" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="absolute top-2 right-4 w-3.5 h-3.5 rounded-full bg-[#8b5cf6] shadow-[0_0_15px_#8b5cf6] animate-ping" />
            <div className="absolute top-2 right-4 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#8b5cf6]" />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10 mt-2">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" />Google Ads + Meta Ads Live</span>
            <span>مدیریت کمپین چندکاناله</span>
          </div>
        </div>
      </ScreenFrame>
    </Wrapper>
  );
};

// 4) Social Media Strategy & Content Calendar
const SocialVisual: React.FC<{ theme: Theme }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const filledDays = [1, 2, 4, 5, 6];
  return (
    <Wrapper
      badges={[
        { icon: <IconBadge3D iconName="megaphone" theme={theme} size="lg" glowColor="magenta" />, pos: '-top-6 -right-2', float: 'animate-float' },
        { icon: <IconBadge3D iconName="bar-chart" theme={theme} size="md" glowColor="cyan" />, pos: 'top-1/2 -left-6', float: 'animate-float-delayed' },
        { icon: <IconBadge3D iconName="sparkles" theme={theme} size="md" glowColor="purple" />, pos: '-bottom-4 right-10', float: 'animate-float' },
      ]}
    >
      <ScreenFrame theme={theme} tag="Social_Content_Calendar">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5ce1e6]" />
            <span className="text-xs font-bold">تقویم محتوایی هفتگی</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Instagram className="w-3.5 h-3.5" />
            <Send className="w-3.5 h-3.5" />
            <Hash className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 mb-4">
          {days.map((d, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold border ${
                filledDays.includes(i)
                  ? 'bg-gradient-to-br from-[#2563eb] to-[#8b5cf6] border-transparent text-white shadow-lg shadow-blue-500/25'
                  : isDark ? 'bg-white/5 border-white/10 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className={`p-4 rounded-2xl border relative overflow-hidden ${isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-200 shadow-inner'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs font-bold">رشد تعامل مخاطب</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> +۱۹۶٪</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] text-slate-400 mb-1">فالوور جدید ماهانه</div>
              <div className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>+۱۲,۴۰۰</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 mb-1">نرخ تعامل</div>
              <div className="text-xl font-extrabold text-[#5ce1e6]">۸.۳٪</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 mt-3 border-t border-white/10">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" />زمان‌بندی هوشمند پست‌ها</span>
            <span>استراتژی محتوا و برندینگ</span>
          </div>
        </div>
      </ScreenFrame>
    </Wrapper>
  );
};

export const ServiceHeroVisual: React.FC<ServiceHeroVisualProps> = ({ theme, serviceId }) => {
  switch (serviceId) {
    case 'cro':
      return <CROVisual theme={theme} />;
    case 'webdesign':
      return <WebDesignVisual theme={theme} />;
    case 'social':
      return <SocialVisual theme={theme} />;
    case 'performance':
    default:
      return <PerformanceVisual theme={theme} />;
  }
};
