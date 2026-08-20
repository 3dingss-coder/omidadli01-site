import React, { useState } from 'react';
import { Theme, Page } from '../types';
import { Menu, X, ArrowUpLeft, ShieldCheck, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  theme?: Theme;
  onToggleTheme?: () => void;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onReplaySplash?: () => void;
  onOpenAdminModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  currentPage,
  onNavigate,
  onOpenAdminModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';
  const { data, isAdmin } = useContent();

  const rawNavItems = data.NAVIGATION_MENU || [];
  const customPages = (data.CUSTOM_PAGES || []).filter((cp) => cp.showInMenu !== false);

  // Combine standard nav items and active custom pages
  const visibleNavItems = rawNavItems
    .filter((item) => !item.isHidden || isAdmin)
    .sort((a, b) => a.order - b.order);

  const handleNavClick = (pageSlug: string) => {
    onNavigate(pageSlug as Page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3">
      <div className={`max-w-7xl mx-auto rounded-3xl transition-all duration-300 backdrop-blur-xl border px-4 sm:px-6 py-3 flex items-center justify-between ${
        isDark 
          ? 'bg-[#1a1240]/75 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)]' 
          : 'bg-white/80 border-white/90 shadow-[0_10px_30px_rgba(76,141,255,0.12)]'
      }`}>
        {/* Logo & Brand */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-right group focus:outline-none cursor-pointer"
        >
          <div className="relative p-1.5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#5ce1e6]/50 transition-all duration-300 shadow-lg shadow-cyan-500/10 flex items-center justify-center">
            <Logo className="w-9 h-9" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#5ce1e6] animate-pulse" />
          </div>

          <div>
            <div className={`font-black text-base sm:text-lg leading-tight ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
              {data.PERSONAL_INFO?.name || 'امید عدلی'}
            </div>
            <div className="text-[11px] font-medium text-slate-400">
              {data.PERSONAL_INFO?.title || 'متخصص دیجیتال مارکتینگ و بهینه‌سازی نرخ تبدیل'}
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          {visibleNavItems.map((item) => {
            const active = currentPage === item.pageSlug;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.pageSlug)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-full text-[11px] xl:text-xs font-bold transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                  active
                    ? 'text-white bg-gradient-to-r from-[#2563eb] to-[#3b82f6] shadow-md shadow-blue-500/25'
                    : isDark 
                      ? 'text-slate-300 hover:text-white hover:bg-white/10' 
                      : 'text-slate-700 hover:text-[#1a1240] hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Render custom pages if any */}
          {customPages.map((cp) => (
            <button
              key={cp.id}
              onClick={() => handleNavClick(cp.slug)}
              className={`px-2.5 xl:px-3 py-1.5 rounded-full text-[11px] xl:text-xs font-bold transition-all duration-300 cursor-pointer ${
                currentPage === cp.slug
                  ? 'text-white bg-amber-500'
                  : 'text-amber-300 hover:bg-white/10'
              }`}
            >
              {cp.title}
            </button>
          ))}
        </nav>

        {/* Right Actions: Contact CTA Pill & CMS Access */}
        <div className="hidden sm:flex items-center gap-2 xl:gap-3">
          <button
            onClick={() => handleNavClick('admin')}
            className={`px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              isAdmin
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400 hover:text-slate-950'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
            title="پیشخوان مدیریت CMS"
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4 text-slate-400" />}
            <span>{isAdmin ? 'مدیریت CMS' : 'ورود ادمین'}</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="glow-btn px-4 xl:px-5 py-2.5 rounded-full text-xs font-bold text-white flex items-center gap-2 group cursor-pointer"
          >
            <span>مشاوره و تماس</span>
            <ArrowUpLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`sm:hidden mt-3 p-5 rounded-3xl backdrop-blur-2xl border transition-all duration-300 ${
          isDark 
            ? 'bg-[#1a1240]/95 border-white/20 shadow-2xl text-white' 
            : 'bg-white/95 border-slate-200 shadow-2xl text-slate-900'
        }`}>
          <div className="flex flex-col gap-2">
            {visibleNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.pageSlug)}
                className={`w-full text-right py-3 px-4 rounded-2xl text-sm font-bold transition-colors ${
                  currentPage === item.pageSlug
                    ? 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white'
                    : isDark ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-slate-100 text-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}

            {customPages.map((cp) => (
              <button
                key={cp.id}
                onClick={() => handleNavClick(cp.slug)}
                className={`w-full text-right py-3 px-4 rounded-2xl text-sm font-bold transition-colors ${
                  currentPage === cp.slug
                    ? 'bg-amber-500 text-white'
                    : 'text-amber-300 hover:bg-white/10'
                }`}
              >
                {cp.title}
              </button>
            ))}

            <div className="pt-3 border-t border-white/10 mt-2 space-y-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-3 rounded-2xl text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isAdmin ? 'پیشخوان مدیریت CMS' : 'ورود مدیریت'}</span>
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className="w-full glow-btn py-3.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
              >
                <span>درخواست مشاوره اختصاصی</span>
                <ArrowUpLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

