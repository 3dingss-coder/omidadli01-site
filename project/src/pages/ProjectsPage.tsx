import React from 'react';
import { motion } from 'motion/react';
import { Layers, CheckCircle2, Clock, ArrowRight, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { SectionEditHeader } from '../components/cms/SectionEditHeader';
import { Page, Theme } from '../types';

interface ProjectsPageProps {
  theme?: Theme;
  onNavigate: (page: Page) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ theme = 'dark', onNavigate }) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const projectsList = data.ONGOING_PROJECTS || [];

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
          <Layers className="w-3.5 h-3.5" />
          <span>وضوح و وضعیت ظرفیت همکاری</span>
        </div>
        <h1 className={`text-3xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>
          شفافیت درباره وضعیت همکاری‌ها و پروژه‌ها
        </h1>
        <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          این صفحه نشان‌دهنده وضعیت فعالیت‌های جاری و ظرفیت پذیرش پروژه‌های جدید برای مدیریت کمپین و مشاوره است.
        </p>

        {/* Capacity Banner */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-medium text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>در حال حاضر ظرفیت پذیرش پروژه جدید فعال است.</span>
        </div>
      </motion.section>

      {/* Projects List Section */}
      <section className="space-y-8">
        <SectionEditHeader title="پروژه‌ها و وضعیت‌های جاری" arrayPath="ONGOING_PROJECTS" />
        <h2 className={`text-xl font-bold border-r-4 border-cyan-500 pr-3 ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>
          وضعیت پروژه‌های جاری و سابق
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsList.map((proj, idx) => (
            <motion.div
              key={proj.id || idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border space-y-4 transition-all ${
                isDark ? 'glass-card-dark' : 'glass-card-light'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`font-bold text-base ${isDark ? 'text-slate-200' : 'text-[#1a1240]'}`}>
                  <EditableText path={`ONGOING_PROJECTS.${idx}.title`} defaultValue={proj.title} label="عنوان پروژه" />
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  proj.status === 'در حال اجرا' 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  <EditableText path={`ONGOING_PROJECTS.${idx}.status`} defaultValue={proj.status} label="وضعیت" />
                </span>
              </div>

              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <EditableText path={`ONGOING_PROJECTS.${idx}.description`} defaultValue={proj.description} label="توضیحات پروژه" multiline />
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Link to Portfolio */}
      <section className={`p-8 rounded-3xl border text-center space-y-4 ${
        isDark ? 'glass-card-dark' : 'glass-card-light'
      }`}>
        <h3 className={`text-lg font-bold ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>برای مشاهده نمونه‌کارهای اجرا شده و نتایج عددی:</h3>
        <p className={`text-sm max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          پروژه‌های ثبت‌شده در بخش نمونه‌کارها همراه با جزئیات چالش، راهکار و رشد درصد تبدیل موجود است.
        </p>
        <button
          onClick={() => onNavigate('portfolio')}
          className="glow-btn px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white inline-flex items-center gap-2 cursor-pointer shadow-xl"
        >
          <span>مشاهده کامل نمونه‌کارها</span>
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </section>
    </div>
  );
};
