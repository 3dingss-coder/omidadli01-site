import React, { useState } from 'react';
import { Theme } from '../types';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQSectionProps {
  theme: Theme;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'شرایط همکاری',
    question: 'حداقل بودجه تبلیغاتی ماهانه برای شروع همکاری چقدر است؟',
    answer: 'برای دستیابی به حجم داده معنی‌دار جهت A/B تست و بهینه‌سازی دقیق الگوریتم‌ها، حداقل بودجه تبلیغات پیشنهادی ۱۰۰ میلیون تومان ماهانه (یا معادل آن) است. البته برای مشاوره استراتژیک CRO و ممیزی صفحات فروش محدودیتی وجود ندارد.'
  },
  {
    category: 'نحوه گزارش‌دهی',
    question: 'گزارش‌دهی کمپین‌ها و تحلیل نتایج به چه صورت خواهد بود؟',
    answer: 'تمام داده‌ها به صورت شفاف در یک داشبورد اختصاصی و زنده Looker Studio پیاده‌سازی می‌شوند تا هر زمان بتوانید ورودی، هزینه‌ها، ROAS و تعداد فروش را لحظه‌ای چک کنید. همچنین جلسات تحلیل ویدیوکنفرانسی هفتگی/دوهفتگی داریم.'
  },
  {
    category: 'امنیتی و قرارداد',
    question: 'آیا امکان امضای قرارداد عدم افشای اطلاعات (NDA) وجود دارد؟',
    answer: 'بله، صد در صد. حفظ محرمانه بودن آمار فروش، استراتژی‌های داخلی و داده‌های مشتریان شما اولویت اصلی من است و قبل از شروع هرگونه دسترسی، قرارداد رسمی NDA منعقد خواهد شد.'
  },
  {
    category: 'نرخ تبدیل و CRO',
    question: 'بهینه‌سازی نرخ تبدیل (CRO) چقدر زمان می‌برد تا به نتیجه برسد؟',
    answer: 'معمولاً نتایج ممیزی اولیه و اصلاح هوک‌های اصلی لندینگ‌پِیج ظرف ۲ الی ۳ هفته اول اثر خود را نشان می‌دهند. فاز کامل تست‌های A/B بر پایه آمار، بسته به میزان ترافیک ورودی سایت بین ۱ تا ۳ ماه زمان می‌برد.'
  },
  {
    category: 'ترکینگ و GA4',
    question: 'اگر ترکینگ سایت ما مشکل داشته باشد چه می‌شود؟',
    answer: 'قبل از هر اقدامی در کمپین‌ها، ابتدا زیرساخت GA4 و Server-Side GTM سایت شما را تست و کالیبره می‌کنیم تا مطمئن شویم حتی ۱ دلار از بودجه شما بدون ترکینگ دقیق خرج نمی‌شود.'
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-8 my-16">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8b5cf6]/20 to-[#4c8dff]/20 border border-[#8b5cf6]/30 text-xs font-black text-[#8b5cf6]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>پاسخ به سوالات متداول</span>
        </div>
        <h2 className={`text-2xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
          سوالاتی که ممکن است قبل از همکاری داشته باشید
        </h2>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          شفافیت در مدل کاری و انتظارات متقابل، کلید موفقیت کمپین‌های بلندمدت است.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                isDark 
                  ? isOpen ? 'bg-white/10 border-[#5ce1e6]/40 shadow-xl' : 'bg-white/5 border-white/10 hover:border-white/20' 
                  : isOpen ? 'bg-white border-indigo-300 shadow-md' : 'bg-white/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full p-6 text-right flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#8b5cf6]/20 text-[#8b5cf6]">
                    {faq.category}
                  </span>
                  <h3 className={`font-black text-sm sm:text-base ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
                    {faq.question}
                  </h3>
                </div>

                <div className={`p-2 rounded-full transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-[#5ce1e6]/20 text-[#5ce1e6]' : 'text-slate-400'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-xs sm:text-sm leading-relaxed text-slate-300 border-t border-white/10 pt-4">
                  <p className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
