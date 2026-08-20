import React, { useState } from 'react';
import { Theme, Page, BlogPost } from '../types';
import { useContent } from '../context/ContentContext';
import { EditableText } from '../components/cms/EditableText';
import { RepeaterControls } from '../components/cms/RepeaterControls';
import { IconBadge3D } from '../components/3D/3DIconBadge';
import { PageHeader } from '../components/PageHeader';
import { Search, Sparkles, Clock, Calendar, ArrowUpLeft, ChevronLeft, X, Mail, CheckCircle2 } from 'lucide-react';

interface BlogPageProps {
  theme: Theme;
  onNavigate: (page: Page) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ theme, onNavigate }) => {
  const isDark = theme === 'dark';
  const { data } = useContent();
  const blogPosts = data.BLOG_POSTS || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = ['All', 'CRO', 'Analytics', 'Paid Ads'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.includes(searchTerm) || post.excerpt.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Top Page Header & Breadcrumb */}
      <PageHeader
        theme={theme}
        page="blog"
        title="دانش کاربردی و فریم‌ورک‌های اختصاصی CRO"
        subtitle="تحلیل‌های عملی، راهنماهای پیاده‌سازی ترکینگ سرور ساید و فرمول‌های ساخت آگهی‌های تبلیغاتی پربازده."
        badgeText="مقالات و تحلیل‌ها"
        onNavigate={onNavigate}
      />

      {/* Search Bar Glass Pill */}
      <div className="max-w-lg mx-auto relative">
        <input
          type="text"
          placeholder="جستجو در مقالات (مثلا: CRO، GA4، Meta Ads)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full py-4 pr-12 pl-4 rounded-full text-xs font-bold border transition-all focus:outline-none ${
            isDark 
              ? 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-[#5ce1e6]' 
              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500 shadow-md'
          }`}
        />
        <Search className="w-5 h-5 text-slate-400 absolute top-1/2 right-4 -translate-y-1/2" />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-lg'
                : isDark ? 'bg-white/10 text-slate-300 hover:bg-white/20' : 'bg-white text-slate-700 shadow-sm'
            }`}
          >
            {cat === 'All' ? 'همه موضوعات' : cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <article
            key={post.id || idx}
            onClick={() => setActivePost(post)}
            className={`p-7 rounded-[36px] cursor-pointer transition-all duration-300 flex flex-col justify-between group relative ${
              isDark ? 'glass-card-dark glass-card-dark-hover' : 'glass-card-light glass-card-light-hover'
            }`}
          >
            <RepeaterControls arrayPath="BLOG_POSTS" index={idx} totalCount={blogPosts.length} className="absolute top-3 left-3 z-10" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-bold bg-[#5ce1e6]/15 border border-[#5ce1e6]/30 text-[#5ce1e6]">
                  <EditableText path={`BLOG_POSTS.${idx}.categoryFa`}>{post.categoryFa}</EditableText>
                </span>
                <IconBadge3D iconName={post.imageIcon} theme={theme} size="sm" glowColor="magenta" floating={false} />
              </div>

              <h2 className={`text-lg font-black mb-3 group-hover:text-[#5ce1e6] transition-colors leading-snug ${
                isDark ? 'text-white' : 'text-[#1a1240]'
              }`}>
                <EditableText path={`BLOG_POSTS.${idx}.title`}>{post.title}</EditableText>
              </h2>

              <p className={`text-xs leading-relaxed mb-6 line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <EditableText path={`BLOG_POSTS.${idx}.excerpt`} multiline>{post.excerpt}</EditableText>
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  <EditableText path={`BLOG_POSTS.${idx}.date`}>{post.date}</EditableText>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  <EditableText path={`BLOG_POSTS.${idx}.readTime`}>{post.readTime}</EditableText>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup Glass Card */}
      <section className="relative max-w-3xl mx-auto">
        <div className={`p-8 sm:p-12 rounded-[40px] border backdrop-blur-2xl text-center space-y-6 ${
          isDark ? 'bg-gradient-to-r from-[#1a1240] to-[#2d1b5e] border-white/20' : 'bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#4c8dff] to-[#8b5cf6] flex items-center justify-center mx-auto text-white shadow-lg">
            <Mail className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-[#1a1240]'}`}>
              عضویت در خبرنامه هفتگی Growth & CRO
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              جدیدترین تکنیک‌های A/B تست، هوک‌های تبلیغاتی و چک‌لیست‌های لندینگ پیج مستقیم در اینباکس شما.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>ایمیل شما با موفقیت ثبت شد. به زودی اولین خبرنامه برایتان ارسال می‌شود!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="آدرس ایمیل شما..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className={`flex-1 py-3.5 px-5 rounded-full text-xs font-bold border focus:outline-none ${
                  isDark ? 'bg-white/10 border-white/20 text-white placeholder-slate-400' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <button
                type="submit"
                className="glow-btn px-6 py-3.5 rounded-full text-xs font-bold text-white shrink-0 cursor-pointer"
              >
                عضویت رایگان
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ARTICLE READING MODAL */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
          <div className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[40px] p-8 border shadow-2xl ${
            isDark ? 'bg-[#1a1240] border-white/20 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setActivePost(null)}
              className={`absolute top-6 left-6 p-3 rounded-full transition-colors ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <X className="w-6 h-6" />
            </button>

            <div className={`space-y-4 pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#8b5cf6]/20 text-[#8b5cf6]">
                {activePost.categoryFa}
              </span>

              <h2 className="text-2xl sm:text-3xl font-black leading-snug">
                {activePost.title}
              </h2>

              <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <span>نویسنده: {activePost.author}</span>
                <span>•</span>
                <span>{activePost.date}</span>
                <span>•</span>
                <span>{activePost.readTime}</span>
              </div>
            </div>

            <div className={`py-6 space-y-4 text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <p className="text-base font-bold text-[#2563eb]">
                {activePost.excerpt}
              </p>
              <p>{activePost.content}</p>
              <p>
                برای دستیابی به حداکثر بازدهی در کمپین‌ها، ترکیب داده‌های تحلیلی با روانشناسی مشتری در صفحه خرید بسیار ضروری است...
              </p>
            </div>

            <div className={`pt-6 border-t flex justify-end ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <button
                onClick={() => setActivePost(null)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-colors ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                بستن مقاله
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
