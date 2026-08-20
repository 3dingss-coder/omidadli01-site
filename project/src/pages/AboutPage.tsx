import React, { useState } from 'react';
import { Theme, Page } from '../types';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { EditableImage } from '../components/cms/EditableImage';
import { RepeaterControls } from '../components/cms/RepeaterControls';
import { IconBadge3D } from '../components/3D/3DIconBadge';
import { PageHeader } from '../components/PageHeader';
import { Award, Briefcase, CheckCircle2, ArrowUpLeft, Sparkles, Code2, Zap, Heart, Shield, GraduationCap, Star, Building2 } from 'lucide-react';

interface AboutPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ theme, onNavigate }) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const personal = data.PERSONAL_INFO || {};
  const skillsTools = data.SKILLS_TOOLS || [];
  const timeline = data.TIMELINE || [];
  const selectProjects = data.SELECT_PROJECTS || [];
  const otherCollaborations = data.OTHER_COLLABORATIONS || [];
  const allSkillsList = data.ALL_SKILLS_LIST || { hard: [], soft: [] };
  const educationAndCourses = data.EDUCATION_AND_COURSES || { education: [], courses: [] };

  const [skillCategory, setSkillCategory] = useState<string>('All');
  const categories = ['All', 'Ads', 'Analytics', 'CRO', 'Tech'];

  const filteredSkills = skillCategory === 'All'
    ? skillsTools
    : skillsTools.filter(s => s.category === skillCategory);

  return (
    <div className="space-y-16 py-4">
      {/* Top Page Header & Breadcrumb */}
      <PageHeader
        theme={theme}
        page="about"
        title="درباره امید عدلی | متخصص Performance Marketing & CRO"
        subtitle="بیش از ۵ سال سابقه طراحی، اجرا و بهینه‌سازی کمپین‌های تبلیغاتی، تحلیل داده، CRO و SEO."
        badgeText="بیوگرافی و رزومه شغلی"
        onNavigate={onNavigate}
      />

      {/* Split Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Profile Card / 3D Avatar Frame */}
        <div className="lg:col-span-5 relative">
          <div className={`p-8 rounded-[40px] border backdrop-blur-2xl relative z-10 transition-transform duration-500 hover:rotate-1 ${
            isDark ? 'bg-gradient-to-br from-[#1a1240]/90 to-[#2d1b5e]/90 border-white/20 shadow-2xl' : 'bg-white/90 border-slate-200 shadow-xl'
          }`}>
            <div className="relative mb-6">
              <EditableImage
                path="PERSONAL_INFO.avatar"
                src={personal.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"}
                alt={personal.name || "امید عدلی"}
                className="w-full h-80 object-cover rounded-[28px] border-2 border-[#8b5cf6] shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4">
                <IconBadge3D iconName="award" theme={theme} size="lg" glowColor="magenta" />
              </div>
            </div>

            <div className="space-y-2 text-center">
              <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                <EditableText path="PERSONAL_INFO.name">{personal.name}</EditableText>
              </h2>
              <p className={`text-xs font-bold ${isDark ? 'text-[#5ce1e6]' : 'text-[#2563eb]'}`}>
                <EditableText path="PERSONAL_INFO.title">{personal.title}</EditableText>
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[11px] font-mono border ${
                  isDark ? 'bg-white/10 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  <EditableText path="PERSONAL_INFO.location">{personal.location}</EditableText>
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#4c8dff]/30 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Personal Story Copywriting */}
        <div className="lg:col-span-7 space-y-6 text-right">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#4c8dff]/20 to-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-xs font-black text-[#8b5cf6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خلاصه بیوگرافی و رویکرد کاری</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black leading-tight ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
            تمرکز بر بازاریابی داده‌محور و بهینه‌سازی Funnel
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <EditableText path="PERSONAL_INFO.bio" multiline>{personal.bio}</EditableText>
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-3xl font-black gradient-text dir-ltr block">
                <EditableText path="PERSONAL_INFO.experienceYears">{personal.experienceYears}</EditableText>
              </span>
              <span className="text-xs text-slate-400 font-bold">سال تجربه کاری</span>
            </div>
            <div>
              <span className="text-3xl font-black gradient-text dir-ltr block">
                <EditableText path="PERSONAL_INFO.campaignsCount">{personal.campaignsCount}</EditableText>
              </span>
              <span className="text-xs text-slate-400 font-bold">کمپین اجراشده و ۵+ برند</span>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-[#8b5cf6] uppercase">سوابق شغلی</span>
          <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
            تجربیات و دستاوردهای اجرایی
          </h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-[32px] transition-all duration-300 flex flex-col md:flex-row gap-6 relative ${
                isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
              }`}
            >
              <div className="md:w-1/3 shrink-0">
                <span className="px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#8b5cf6] to-[#4c8dff] text-white inline-block">
                  {item.year}
                </span>
                <p className="text-xs font-bold text-[#5ce1e6] mt-2">{item.company}</p>
              </div>

              <div className="md:w-2/3 space-y-2">
                <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>{item.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.description}</p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>دستاوردها: {item.achievement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Select Projects & Collaborations */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-[#5ce1e6] uppercase">پروژه‌های شاخص</span>
          <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
            پروژه‌های منتخب و سایر همکاری‌ها
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {selectProjects.map((proj, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-black text-sm ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>{proj.title}</h3>
                <span className="text-xs text-[#8b5cf6] font-mono">{proj.date}</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{proj.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-6 text-center max-w-3xl mx-auto">
          <h4 className="text-sm font-bold text-[#4c8dff] mb-4">سایر همکاری‌های سازمانی:</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {otherCollaborations.map((c, i) => (
              <span key={i} className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                <strong className="text-white">{c.company}</strong> ({c.role})
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix (Hard & Soft) */}
      <section className="space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-[#8b5cf6] uppercase">تخصص‌ها</span>
          <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
            مهارت‌های تخصصی و نرم
          </h2>
        </div>

        {/* Hard Skills */}
        <div className="space-y-6">
          <h3 className="text-lg font-black text-[#5ce1e6] border-r-4 border-[#5ce1e6] pr-3">مهارت‌های تخصصی (Hard Skills)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSkillsList.hard.map((grp, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}>
                <h4 className={`font-black text-sm mb-4 ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>{grp.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {grp.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-slate-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="space-y-6 pt-6 border-t border-white/10">
          <h3 className="text-lg font-black text-[#8b5cf6] border-r-4 border-[#8b5cf6] pr-3">مهارت‌های نرم (Soft Skills)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allSkillsList.soft.map((grp, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}>
                <h4 className={`font-black text-sm mb-4 ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>{grp.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {grp.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-slate-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Courses Section */}
      <section className="space-y-8">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-extrabold text-amber-400 uppercase">تحصیلات و دوره‌ها</span>
          <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
            مدارک تحصیلی و آموزشی
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Education */}
          <div className={`p-8 rounded-3xl border space-y-4 ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}>
            <div className="flex items-center gap-3 text-[#5ce1e6]">
              <GraduationCap className="w-6 h-6" />
              <h3 className="font-black text-lg">تحصیلات</h3>
            </div>
            {educationAndCourses.education.map((edu, idx) => (
              <div key={idx} className="space-y-1 border-t border-white/10 pt-4">
                <div className="font-black text-white text-base">{edu.title}</div>
                <p className="text-xs text-slate-300">{edu.institute} · {edu.year}</p>
                <p className="text-xs font-bold text-emerald-400">{edu.grade}</p>
              </div>
            ))}
          </div>

          {/* Courses */}
          <div className={`p-8 rounded-3xl border space-y-4 ${isDark ? 'glass-card-dark' : 'glass-card-light'}`}>
            <div className="flex items-center gap-3 text-[#8b5cf6]">
              <Award className="w-6 h-6" />
              <h3 className="font-black text-lg">دوره‌های تخصصی گذرانده‌شده</h3>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-4">
              {educationAndCourses.courses.map((crs, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                  <div>
                    <span className="font-bold text-white block">{crs.title}</span>
                    <span className="text-slate-400">{crs.provider}</span>
                  </div>
                  <span className="text-[#5ce1e6] font-mono">{crs.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center pt-6">
        <button
          onClick={() => onNavigate('contact')}
          className="glow-btn px-10 py-5 rounded-full text-sm font-black text-white inline-flex items-center gap-3"
        >
          <span>شروع همکاری با امید عدلی</span>
          <ArrowUpLeft className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
};
