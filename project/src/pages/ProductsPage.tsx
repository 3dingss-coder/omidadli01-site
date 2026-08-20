import React from 'react';
import { motion } from 'motion/react';
import { Package, Target, BarChart, Monitor, Rocket, ArrowLeft, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { SectionEditHeader } from '../components/cms/SectionEditHeader';
import { Page, Theme } from '../types';

interface ProductsPageProps {
  theme?: Theme;
  onNavigate: (page: Page) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ theme = 'dark', onNavigate }) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const productsList = data.PRODUCTS || [];

  const getIcon = (name: string) => {
    switch (name) {
      case 'target': return <Target className="w-6 h-6 text-cyan-400" />;
      case 'chart': return <BarChart className="w-6 h-6 text-blue-400" />;
      case 'laptop': return <Monitor className="w-6 h-6 text-purple-400" />;
      default: return <Rocket className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
          <Package className="w-3.5 h-3.5" />
          <span>ابزارها و محصولات کاربردی</span>
        </div>
        <h1 className={`text-3xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>
          راه‌حل‌های آماده، برای شروع سریع‌تر
        </h1>
        <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          مجموعه‌ای از ابزارها، قالب‌ها و جلسات تخصصی برای کسب‌وکارهایی که می‌خواهند فرآیند رشد را سریع‌تر کلید بزنند.
        </p>
      </motion.section>

      {/* Products Grid */}
      <section className="space-y-6">
        <SectionEditHeader title="محصولات و دوره‌ها" arrayPath="PRODUCTS" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productsList.map((prod, idx) => (
            <motion.div
              key={prod.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 rounded-3xl border flex flex-col justify-between hover:border-purple-500/30 transition-all group ${
                isDark ? 'glass-card-dark' : 'glass-card-light'
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
                  }`}>
                    {getIcon(prod.iconName)}
                  </div>
                  {prod.badge && (
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
                      <EditableText path={`PRODUCTS.${idx}.badge`} defaultValue={prod.badge} label="نشان" />
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-[#1a1240]'}`}>
                    <EditableText path={`PRODUCTS.${idx}.title`} defaultValue={prod.title} label="عنوان محصول" />
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <EditableText path={`PRODUCTS.${idx}.description`} defaultValue={prod.description} label="توضیح" multiline />
                  </p>
                </div>

                <div className={`p-4 rounded-xl border space-y-1 ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-xs text-[#8b5cf6] font-semibold block">مناسب برای:</span>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <EditableText path={`PRODUCTS.${idx}.targetAudience`} defaultValue={prod.targetAudience} label="مخاطبان هدف" />
                  </p>
                </div>
              </div>

              <div className={`pt-6 mt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <button
                  onClick={() => onNavigate('contact')}
                  className="glow-btn w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>
                    <EditableText path={`PRODUCTS.${idx}.actionText`} defaultValue={prod.actionText || 'درخواست / دریافت'} label="متن دکمه" />
                  </span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
