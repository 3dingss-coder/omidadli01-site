import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, CheckCircle2, ArrowLeft, BarChart2, ShieldCheck, Users, HelpCircle, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { Page, Theme } from '../types';

interface BusinessAnalysisPageProps {
  theme?: Theme;
  onNavigate: (page: Page) => void;
}

export const BusinessAnalysisPage: React.FC<BusinessAnalysisPageProps> = ({ theme = 'dark', onNavigate }) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const businessAnalysis = data.BUSINESS_ANALYSIS_DATA || { headline: '', subheadline: '', steps: [], deliverables: [], packages: [] };

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
          <Search className="w-3.5 h-3.5" />
          <span>ارزیابی اولیه و تحلیل نیازمندی‌ها</span>
        </div>
        <h1 className={`text-3xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>
          <EditableText path="BUSINESS_ANALYSIS_DATA.headline" defaultValue={businessAnalysis.headline} label="تیتر اصلی" />
        </h1>
        <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          <EditableText path="BUSINESS_ANALYSIS_DATA.subheadline" defaultValue={businessAnalysis.subheadline} label="زیرتیتر" multiline />
        </p>
      </motion.section>

      {/* 4 Steps Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>فرآیند ۴ گام تحلیل بیزینس</h2>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>چگونه وضعیت فعلی بازاریابی شما را بدون حدس و گمان بررسی می‌کنم</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(businessAnalysis.steps || []).map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border transition-all group ${
                isDark ? 'glass-card-dark hover:border-cyan-500/40' : 'glass-card-light hover:border-cyan-500/40'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center text-sm mb-4 group-hover:scale-110 transition-transform">
                {step.step}
              </div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>
                <EditableText path={`BUSINESS_ANALYSIS_DATA.steps.${idx}.title`} defaultValue={step.title} label="عنوان گام" />
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <EditableText path={`BUSINESS_ANALYSIS_DATA.steps.${idx}.desc`} defaultValue={step.desc} label="توضیح گام" multiline />
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Checklist Interactive Section */}
      <section className={`p-8 rounded-3xl border space-y-8 ${
        isDark ? 'glass-card-dark' : 'glass-card-light shadow-lg'
      }`}>
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6 ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>چک‌لیست خودارزیابی سریع</span>
            </div>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>۸ سوال کلیدی قبل از شروع کمپین</h2>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full ${
            isDark ? 'text-slate-400 bg-slate-800' : 'text-slate-700 bg-slate-100 border border-slate-200'
          }`}>
            {Object.values(checkedItems).filter(Boolean).length} از {(businessAnalysis.checklist || []).length} تیک خورده
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(businessAnalysis.checklist || []).map((question, idx) => {
            const isChecked = !!checkedItems[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isChecked 
                    ? 'bg-cyan-500/10 border-cyan-500/50 ' + (isDark ? 'text-slate-100' : 'text-[#1a1240]')
                    : isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors ${
                  isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'
                }`}>
                  {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </div>
                <span className="text-sm font-medium leading-relaxed">
                  <EditableText path={`BUSINESS_ANALYSIS_DATA.checklist.${idx}`} defaultValue={question} label="سوال چک لیست" />
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="pt-4 text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="glow-btn px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-white inline-flex items-center gap-3 cursor-pointer shadow-xl"
          >
            <span>
              <EditableText path="BUSINESS_ANALYSIS_DATA.ctaText" defaultValue={businessAnalysis.ctaText || 'درخواست تحلیل و ممیزی تخصصی'} label="متن دکمه" />
            </span>
            <Send className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </section>
    </div>
  );
};
