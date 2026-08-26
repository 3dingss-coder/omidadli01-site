import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme, Page } from '../types';
import { Home, Briefcase, GraduationCap, Package, PhoneCall } from 'lucide-react';

interface QuickActionDockProps {
  theme: Theme;
  currentPage?: Page;
  onNavigate: (page: Page) => void;
}

interface NavItem {
  id: Page;
  label: string;
  icon: React.ElementType;
  gradient: string;
  glowColor: string;
  glowHex: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'services',
    label: 'خدمات',
    icon: Briefcase,
    gradient: 'from-[#06b6d4] via-[#3b82f6] to-[#6366f1]',
    glowColor: 'rgba(59, 130, 246, 0.65)',
    glowHex: '#3b82f6',
  },
  {
    id: 'products',
    label: 'نمونه‌کارها',
    icon: Package,
    gradient: 'from-[#10b981] via-[#059669] to-[#047857]',
    glowColor: 'rgba(16, 185, 129, 0.65)',
    glowHex: '#10b981',
  },
  {
    id: 'home',
    label: 'خانه',
    icon: Home,
    gradient: 'from-[#6366f1] via-[#8b5cf6] to-[#a855f7]',
    glowColor: 'rgba(139, 92, 246, 0.65)',
    glowHex: '#8b5cf6',
  },
  {
    id: 'blog',
    label: 'آموزش',
    icon: GraduationCap,
    gradient: 'from-[#f59e0b] via-[#f97316] to-[#ef4444]',
    glowColor: 'rgba(249, 115, 22, 0.65)',
    glowHex: '#f97316',
  },
  {
    id: 'contact',
    label: 'تماس',
    icon: PhoneCall,
    gradient: 'from-[#ec4899] via-[#d946ef] to-[#8b5cf6]',
    glowColor: 'rgba(217, 70, 239, 0.65)',
    glowHex: '#d946ef',
  },
];

// High-precision synthesized organic bubble pop sound
const playBubbleSound = () => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Oscillator 1: Primary buoyant bubble sweep
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(380, now);
    osc1.frequency.exponentialRampToValueAtTime(1250, now + 0.07);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.3, now + 0.012);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.085);

    // Oscillator 2: High resonant harmonic pop
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(650, now + 0.012);
    osc2.frequency.exponentialRampToValueAtTime(1750, now + 0.075);

    gain2.gain.setValueAtTime(0.001, now + 0.012);
    gain2.gain.exponentialRampToValueAtTime(0.15, now + 0.025);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.012);
    osc2.stop(now + 0.085);
  } catch {
    // Gracefully ignore audio restrictions
  }
};

export const QuickActionDock: React.FC<QuickActionDockProps> = ({
  theme,
  currentPage = 'home',
  onNavigate,
}) => {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeCenterPercent, setActiveCenterPercent] = useState<number>(50);

  // Normalize current page to one of the 5 main navigation tabs
  const activeTabId: Page = (() => {
    if (currentPage === 'blog') return 'blog';
    if (currentPage === 'services' || currentPage === 'portfolio') return 'services';
    if (currentPage === 'products' || currentPage === 'projects') return 'products';
    if (currentPage === 'contact') return 'contact';
    return 'home';
  })();

  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeTabId);
  const safeActiveIndex = activeIndex === -1 ? 2 : activeIndex;
  const activeItem = NAV_ITEMS[safeActiveIndex];

  // Dynamically calculate the horizontal center percentage of the active tab for smooth curve alignment
  useEffect(() => {
    const updatePosition = () => {
      const btn = buttonRefs.current[safeActiveIndex];
      const container = containerRef.current;
      if (btn && container) {
        const btnRect = btn.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        if (contRect.width > 0) {
          const centerPx = (btnRect.left + btnRect.width / 2) - contRect.left;
          const percent = Math.min(Math.max((centerPx / contRect.width) * 100, 8), 92);
          setActiveCenterPercent(percent);
          return;
        }
      }
      
      // Fallback calculation taking RTL into consideration
      const isRTL = typeof document !== 'undefined' && (document.documentElement.dir === 'rtl' || document.body.dir === 'rtl');
      const visualIndex = isRTL ? (4 - safeActiveIndex) : safeActiveIndex;
      setActiveCenterPercent(10 + visualIndex * 20);
    };

    updatePosition();
    const timer = setTimeout(updatePosition, 80);
    window.addEventListener('resize', updatePosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
    };
  }, [safeActiveIndex]);

  const handleTabClick = (tabId: Page) => {
    if (activeTabId !== tabId) {
      playBubbleSound();
    }
    onNavigate(tabId);
  };

  return (
    <div
      id="meniscus-bottom-nav"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[420px] sm:w-auto sm:min-w-[430px] pb-[env(safe-area-inset-bottom,0px)] pointer-events-auto"
    >
      {/* 3D Main Chassis with Meniscus Curved Cutout */}
      <div
        ref={containerRef}
        className="relative pt-5 select-none"
      >
        {/* Soft Ambient Depth Glow behind the dock */}
        <div
          className="absolute inset-x-8 top-7 h-12 blur-2xl pointer-events-none -z-10 transition-colors duration-500 opacity-60"
          style={{ backgroundColor: activeItem.glowHex }}
        />

        {/* The Bar Frame SVG with Real-time Smooth SVG Curve Notch */}
        <div className="relative w-full rounded-[28px] overflow-visible">
          {/* Background Vector Notch Path */}
          <div className="relative w-full h-[68px] sm:h-[72px]">
            <svg
              className="w-full h-full overflow-visible drop-shadow-[0_16px_35px_rgba(0,0,0,0.85)]"
              viewBox="0 0 440 68"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="dockGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#18113a" stopOpacity="0.96" />
                  <stop offset="100%" stopColor="#0c0724" stopOpacity="0.99" />
                </linearGradient>
                <linearGradient id="dockGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.99" />
                </linearGradient>
                <linearGradient id="dockBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                  <stop offset="50%" stopColor="rgba(139,92,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                </linearGradient>
              </defs>

              {/* Dynamic Animated Organic SVG Path with Smooth Notch */}
              <motion.path
                d={(() => {
                  const cx = (activeCenterPercent / 100) * 440;
                  const w = 36; // half width of curve scoop
                  const depth = 26; // depth of dip
                  const p1x = Math.max(cx - w - 16, 20);
                  const p2x = Math.min(cx + w + 16, 420);
                  return `M 24 0
                          L ${p1x} 0
                          C ${cx - w} 0, ${cx - 24} ${depth}, ${cx} ${depth}
                          C ${cx + 24} ${depth}, ${cx + w} 0, ${p2x} 0
                          L 416 0
                          C 430 0, 440 10, 440 24
                          L 440 44
                          C 440 58, 430 68, 416 68
                          L 24 68
                          C 10 68, 0 58, 0 44
                          L 0 24
                          C 0 10, 10 0, 24 0 Z`;
                })()}
                fill={isDark ? 'url(#dockGradDark)' : 'url(#dockGradLight)'}
                stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(203,213,225,0.8)'}
                strokeWidth="1.5"
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 30,
                }}
              />
            </svg>

            {/* Glowing Accent Ring inside the curve dip */}
            <motion.div
              className="absolute top-0 w-16 h-8 -translate-x-1/2 pointer-events-none rounded-b-full opacity-40 blur-sm"
              style={{
                left: `${activeCenterPercent}%`,
                backgroundColor: activeItem.glowHex,
              }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 30,
              }}
            />
          </div>

          {/* Interactive Navigation Items Row */}
          <div className="absolute inset-0 flex items-center justify-between px-1.5 sm:px-3">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeTabId === item.id;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="relative flex-1 flex flex-col items-center justify-center h-full"
                >
                  {/* Floating Elevated Circular Bubble Button */}
                  {isActive && (
                    <motion.button
                      layoutId="floating-bubble-bead"
                      onClick={() => handleTabClick(item.id)}
                      className="absolute -top-6 sm:-top-7 z-30 flex flex-col items-center cursor-pointer pointer-events-auto"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 28,
                      }}
                      aria-label={item.label}
                    >
                      {/* 3D Spherical Glowing Bubble */}
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr ${item.gradient} flex items-center justify-center border-2 border-white/90 transition-transform duration-200 hover:scale-105 active:scale-95 shadow-xl`}
                        style={{
                          boxShadow: `0 10px 24px ${item.glowColor}, inset 0 3px 6px rgba(255,255,255,0.7), inset 0 -3px 6px rgba(0,0,0,0.35)`,
                        }}
                      >
                        {/* Top 3D Specular Light Glint */}
                        <div className="absolute top-1.5 inset-x-2.5 h-2 bg-gradient-to-b from-white/80 to-transparent rounded-full pointer-events-none" />

                        {/* Animated Glow Ping */}
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
                          style={{ backgroundColor: item.glowColor }}
                        />

                        {/* Active Icon */}
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.5] drop-shadow-md relative z-10" />
                      </div>
                    </motion.button>
                  )}

                  {/* Clickable Nav Item Button */}
                  <button
                    ref={(el) => {
                      buttonRefs.current[idx] = el;
                    }}
                    onClick={() => handleTabClick(item.id)}
                    className="w-full flex flex-col items-center justify-center h-full pt-1.5 pb-1 group cursor-pointer focus:outline-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    aria-label={item.label}
                  >
                    {/* Inactive Icon Slot */}
                    <div className="h-5 flex items-center justify-center">
                      {!isActive ? (
                        <Icon
                          className={`w-5 h-5 transition-all duration-200 group-hover:scale-110 ${
                            isDark
                              ? 'text-slate-400 group-hover:text-white'
                              : 'text-slate-500 group-hover:text-slate-900'
                          }`}
                        />
                      ) : (
                        // Spacer to maintain alignment under the bubble
                        <div className="w-5 h-5 opacity-0 pointer-events-none" />
                      )}
                    </div>

                    {/* Label with highlighted active state */}
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold mt-1 transition-all duration-200 whitespace-nowrap leading-none ${
                        isActive
                          ? 'font-black scale-105'
                          : isDark
                          ? 'text-slate-400 group-hover:text-slate-200 font-semibold'
                          : 'text-slate-500 group-hover:text-slate-800 font-semibold'
                      }`}
                      style={{
                        color: isActive ? item.glowHex : undefined,
                        textShadow: isActive && isDark ? `0 0 8px ${item.glowColor}` : undefined,
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};



