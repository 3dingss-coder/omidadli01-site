import React, { useState } from 'react';
import { Theme, Page } from '../types';
import { Calendar, FileText, Send, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/content';
import { ResumeModal } from './ResumeModal';

interface QuickActionDockProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

export const QuickActionDock: React.FC<QuickActionDockProps> = ({ theme, onNavigate }) => {
  const isDark = theme === 'dark';
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      {/* Floating WhatsApp Button - Custom Brand Cyan/Blue Gradient Glow */}
      <a
        href={PERSONAL_INFO.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        title="ارتباط مستقیم در واتساپ"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-gradient-to-tr from-[#2563eb] via-[#4c8dff] to-[#5ce1e6] text-white flex items-center justify-center shadow-[0_0_24px_rgba(92,225,230,0.45)] hover:scale-110 hover:shadow-[0_0_32px_rgba(92,225,230,0.7)] transition-all duration-300 border border-white/30 group"
      >
        <MessageCircle className="w-6 h-6 stroke-[2.2] group-hover:rotate-12 transition-transform" />
      </a>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto">
        <div className={`p-2 sm:p-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 shadow-2xl flex items-center justify-between gap-1.5 sm:gap-3 ${
          isDark
            ? 'bg-[#1a1240]/90 border-white/20 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)]'
            : 'bg-white/90 border-slate-300 text-slate-900 shadow-[0_20px_50px_rgba(76,141,255,0.2)]'
        }`}>
          {/* Quick Action 1: Calendar Booking */}
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-[#5ce1e6] shrink-0" />
            <span className="hidden xs:inline sm:inline">رزرو جلسه</span>
          </button>

          {/* Quick Action 2: Resume */}
          <button
            onClick={() => setShowResume(true)}
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-[#4c8dff] shrink-0" />
            <span className="hidden xs:inline sm:inline">مشاهده رزومه</span>
          </button>

          {/* Quick Action 3: Main CTA */}
          <button
            onClick={() => onNavigate('contact')}
            className="glow-btn px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold text-white shrink-0 flex items-center gap-1.5 shadow-lg"
          >
            <Send className="w-3.5 h-3.5" />
            <span>تماس و همکاری</span>
          </button>
        </div>
      </div>

      {/* Resume Modal */}
      {showResume && (
        <ResumeModal theme={theme} onClose={() => setShowResume(false)} />
      )}
    </>
  );
};
