import { ServiceItem, CaseStudy, Testimonial, BlogPost, SkillTool, TimelineMilestone, ProductItem, OngoingProjectItem } from '../types';

export const PERSONAL_INFO = {
  name: 'امید عدلی',
  title: 'متخصص دیجیتال مارکتینگ و بهینه‌سازی نرخ تبدیل',
  tagline: 'ساخت سیستم‌های بازاریابی داده‌محور، بهینه‌سازی Funnel و رشد قابل اندازه‌گیری شاخص‌های کلیدی (CRO, CTR, CPA)',
  bio: 'متخصص Performance Marketing & Growth با بیش از ۵ سال تجربه در طراحی، اجرا و بهینه‌سازی کمپین‌های تبلیغاتی، تحلیل داده، CRO و SEO. تمرکز اصلی من ساخت سیستم‌های بازاریابی داده‌محور است که از طریق بهینه‌سازی Funnel، پیاده‌سازی Tracking، تحلیل رفتار کاربران و بهبود مستمر عملکرد کمپین‌ها به رشد قابل اندازه‌گیری کسب‌وکار منجر می‌شوند. تجربه همکاری با برندهای فین‌تک، رمزارز، گردشگری و تجارت الکترونیک باعث شده بتوانم میان تحلیل داده، تصمیم‌گیری بازاریابی و اجرای عملیاتی ارتباط مؤثری ایجاد کنم.',
  experienceYears: '۵+ سال',
  campaignsCount: '۵۰+ کمپین',
  avgRoasBoost: '۳.۵٪ CTR',
  totalAdSpendManaged: '۵+ برند',
  availability: 'در دسترس برای همکاری ریموت و پروژه‌ای',
  email: 'omidadli78@gmail.com',
  phone: '09933773515',
  phoneFormatted: '۰۹۹۳۳۷۷۳۵۱۵',
  telegram: '@omidadli01',
  telegramUrl: 'https://t.me/omidadli01',
  whatsappUrl: 'https://wa.me/989933773515',
  linkedin: 'https://linkedin.com/in/omidadli01',
  instagram: 'https://instagram.com/omidadli01',
  xTwitter: 'https://x.com/omidad01',
  website: 'omidadli01.site',
  location: 'مشهد / تهران / ریموت'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'performance-marketing',
    title: 'پرفورمنس مارکتینگ & مدیریت کمپین',
    titleEn: 'Performance Marketing & Campaign Management',
    iconName: 'rocket',
    shortDesc: 'طراحی، اجرا و بهینه‌سازی کمپین‌های جذب کاربر با تمرکز بر کاهش CPA و افزایش بازدهی بودجه.',
    fullDesc: 'هدایت و اجرای کمپین‌های پرفورمنس مارکتینگ در بسترهای Google Ads، Meta Ads، یکتانت و تپسل. ارزیابی دقیق کیفیت پابلیشرها با سیستم‌های Dynamic Scoring و هدف‌گیری هوشمند مخاطبان.',
    features: [
      'توسعه سیستم Publisher Dynamic Scoring جهت سنجش کیفیت ترافیک',
      'کاهش CPA و افزایش CTR کمپین‌ها (مانند ارتقا به ۳.۵٪ در ای‌ادز)',
      'بهینه‌سازی کمپین‌های Display Ads، Google Search و Retargeting',
      'استانداردسازی UTMها و سگمنت‌بندی دقیق مخاطبان'
    ],
    deliverables: ['گزارش‌دهی دقیق داده‌محور', 'بهینه‌سازی بیدینگ و بودجه', 'ارزیابی کیفیت ترافیک'],
    tags: ['Google Ads', 'Performance Marketing', 'Meta Ads', 'CPA Reduction'],
    packages: [
      { title: '۱ ماهه', price: '۴۰ میلیون تومان', description: 'راه‌اندازی و اجرای اولیه' },
      { title: '۲ ماهه', price: '۷۰ میلیون تومان', badge: 'پیشنهادی', isPopular: true, description: 'بهینه‌سازی کامل با نتایج قابل اندازه‌گیری' },
      { title: '۳ ماهه', price: '۱۱۰ میلیون تومان', description: 'رشد پایدار و کاهش مداوم CPA' }
    ]
  },
  {
    id: 'cro-optimization',
    title: 'بهینه‌سازی نرخ تبدیل (CRO) & تحلیل Funnel',
    titleEn: 'Conversion Rate Optimization & Funnel Analysis',
    iconName: 'target',
    shortDesc: 'شناسایی نقاط افت مسیر خرید، اجرای تست‌های A/B و افزایش نرخ تبدیل کاربران بدون افزایش بودجه.',
    fullDesc: 'طراحی و اجرای تست‌های A/B برای صفحات کلیدی و مسیرهای رزرو/خرید. تحلیل رفتار کاربران با GA4، Hotjar و Microsoft Clarity برای شناسایی دقیق چالش‌های UX و ارتقای conversion rate.',
    features: [
      'طراحی و اجرای تست‌های A/B بر روی صفحات کلیدی مسیر خرید',
      'تحلیل رفتار کاربران با GA4، Hotjar و Microsoft Clarity',
      'شناسایی نقاط ریزش در Funnel و تدوین Roadmap بهینه‌سازی UX',
      'افزایش نرخ تبدیل لندینگ‌پِیج‌ها (رشد ۲۵٪ نرخ تبدیل در پروژه‌های قبلی)'
    ],
    deliverables: ['Roadmap بهبود تجربه کاربری', 'طراحی و تحلیل تست‌های A/B', 'گزارش‌های هیت‌مپ و رفتار کاربر'],
    tags: ['CRO', 'A/B Testing', 'GA4', 'Hotjar', 'Microsoft Clarity'],
    packages: [
      { title: 'پکیج استاندارد (۳ ماهه)', price: '۱۲۰ میلیون تومان', badge: 'دوره کامل', isPopular: true, description: 'تحلیل، تست A/B و اصلاح مستمر فانل فروش جهت نتایج پایدار' }
    ]
  },
  {
    id: 'tracking-analytics',
    title: 'معماری Tracking و آنالیتیکس داده‌ها (GTM & GA4)',
    titleEn: 'Tracking Architecture & Marketing Measurement',
    iconName: 'chart',
    shortDesc: 'پیاده‌سازی معماری ترکینگ، Event Tracking و افزایش دقت Attribution داده‌های بازاریابی.',
    fullDesc: 'طراحی و نگهداری ساختار Google Tag Manager برای Affiliate Marketing و کمپین‌های دیجیتال. اعتبارسنجی داده‌ها و پیاده‌سازی مدلسازی Attribution برای ارزیابی شفاف عملکرد کانال‌های جذب.',
    features: [
      'طراحی معماری Tracking برای Affiliate Marketing و جذب کاربر',
      'پیاده‌سازی و اعتبارسنجی ساختار Event Tracking در GTM',
      'افزایش دقت Attribution و شفاف‌سازی تحلیل کانال‌ها',
      'کاهش ۲۲٪ کلیک‌های نامعتبر از طریق مدل‌های ارزیابی کیفیت'
    ],
    deliverables: ['مستندسازی کامل Event Tracking', 'اتصال دقیق GTM و GA4', 'داشبوردهای تحلیلی کیفیت داده'],
    tags: ['Google Tag Manager', 'GA4', 'Event Tracking', 'Attribution'],
    packages: [
      { title: 'پکیج استاندارد (۳ ماهه)', price: '۱۰۰ میلیون تومان', badge: 'زیرساخت کامل', isPopular: true, description: 'راه‌اندازی کامل ابزارها، ساخت داشبورد Looker Studio و گزارش‌دهی ماهانه' }
    ]
  },
  {
    id: 'seo-growth',
    title: 'استراتژی سئو و رشد ارگانیک (SEO)',
    titleEn: 'SEO Strategy & Organic Growth',
    iconName: 'laptop',
    shortDesc: 'رساندن کلیدواژه‌های رقابتی به صفحه نخست گوگل، بهینه‌سازی ساختار و رشد پایدار ورودی.',
    fullDesc: 'تدوین استراتژی SEO هدفمند، لینک‌سازی ساختاریافته و بهبود Technical SEO. تجربه موفق رساندن کلیدواژه «قیمت میلگرد» به رتبه ۱ گوگل و کسب ۱۵ کلمه صفحه اول در حوزه رمزارز.',
    features: [
      'بهینه‌سازی Technical SEO و معماری محتوایی صفحات',
      'تحلیل Search Intent و ارتقای Snippetها جهت افزایش CTR',
      'تدوین استراتژی لینک‌سازی داخلی و خارجی برای کلمات پررقابت',
      'رشد ۵۰٪ ترافیک ارگانیک در حوزه‌های رمزارز و صنعتی'
    ],
    deliverables: ['کیوورد ریسرچ و نقشه محتوا', 'آنالیز فنی SEO', 'گزارش رتبه‌بندی و CTR'],
    tags: ['SEO Strategy', 'Technical SEO', 'Keyword Research', 'Google Rank 1'],
    packages: [
      { title: '۱ ماهه', price: '۴۰ میلیون تومان', description: 'مناسب برای شروع و آنالیز اولیه' },
      { title: '۲ ماهه', price: '۷۵ میلیون تومان', badge: 'پیشنهادی', isPopular: true, description: 'بهترین نسبت هزینه به نتیجه و رشد محسوس' },
      { title: '۳ ماهه', price: '۱۱۵ میلیون تومان', description: 'نتایج پایدار و رشد بلندمدت در نتایج گوگل' }
    ]
  },
  {
    id: 'ui-ux-design',
    title: 'طراحی UI/UX & بهینه‌سازی مسیر کاربر',
    titleEn: 'UI/UX Design & User Experience',
    iconName: 'sparkles',
    shortDesc: 'طراحی تجربه‌ای روان، جذاب و هدفمند در Figma متناسب با بازار ایران و جهت ارتقای نرخ تبدیل.',
    fullDesc: 'از Wireframe تا تحویل فایل نهایی در Figma. طراحی ریسپانسیو دسکتاپ و موبایل با ساختار دیزاین سیستم کامل جهت کاهش اصطکاک کاربر و افزایش نرخ خرید.',
    features: [
      'طراحی Wireframe و معماری اطلاعات کاربری',
      'طراحی UI کامل در Figma همراه با Design System',
      'طراحی ریسپانسیو برای موبایل، تبلت و دسکتاپ',
      'تحویل فایل آماده جهت اجرای دقیق تیم توسعه'
    ],
    deliverables: ['فایل جامع Figma', 'دیزاین سیستم', 'جلسه ریویو و مشاوره اولیه رایگان'],
    tags: ['UI/UX', 'Figma', 'Design System', 'User Flow'],
    packages: [
      { title: 'قیمت هر صفحه', price: '۲۰ تا ۴۰ میلیون تومان', badge: 'مشاوره رایگان', isPopular: true, description: 'تعیین قیمت نهایی بر اساس پیچیدگی و تعداد صفحات' }
    ]
  },
  {
    id: 'web-app-design',
    title: 'طراحی وب‌سایت & اپلیکیشن اختصاصی',
    titleEn: 'Website & Application Design & Development',
    iconName: 'code',
    shortDesc: 'طراحی و توسعه وب‌سایت‌ها و اپلیکیشن‌های اختصاصی، مدرن و سریع؛ از UI اختصاصی تا اجرای نهایی و آماده‌سازی برای رشد.',
    fullDesc: 'طراحی و پیاده‌سازی وب‌سایت‌ها و وب‌اپلیکیشن‌های اختصاصی با تمرکز بر تجربه کاربری، سرعت بارگذاری و آمادگی برای بهینه‌سازی نرخ تبدیل. از صفحه فرود ساده تا سایت‌های چندصفحه‌ای با انیمیشن و طراحی سینمایی، متناسب با هویت برند شما اجرا می‌شود.',
    features: [
      'طراحی UI اختصاصی متناسب با هویت بصری برند',
      'توسعه ریسپانسیو و بهینه برای موبایل، تبلت و دسکتاپ',
      'ساختار آماده برای SEO و بهینه‌سازی نرخ تبدیل از ابتدای طراحی',
      'اجرای انیمیشن‌ها و تعاملات مدرن جهت افزایش تجربه کاربری'
    ],
    deliverables: ['وب‌سایت یا اپلیکیشن آماده انتشار', 'کد منبع تمیز و مستندسازی‌شده', 'پشتیبانی و راهنمایی پس از تحویل'],
    tags: ['Web Design', 'App Design', 'Frontend Development', 'UX'],
    packages: [
      { title: 'صفحه فرود اختصاصی', price: '۱۵ تا ۲۵ میلیون تومان', description: 'طراحی و اجرای یک صفحه فرود حرفه‌ای و سریع' },
      { title: 'سایت چندصفحه‌ای', price: '۳۵ تا ۷۰ میلیون تومان', badge: 'پیشنهادی', isPopular: true, description: 'طراحی و توسعه کامل سایت شرکتی یا فروشگاهی' },
      { title: 'اپلیکیشن وب اختصاصی', price: 'براساس بریف پروژه', description: 'قیمت نهایی بر اساس پیچیدگی و قابلیت‌های موردنیاز' }
    ]
  },
  {
    id: 'social-media-strategy',
    title: 'استراتژی سوشال مدیا & کانتنت کلندر',
    titleEn: 'Social Media Strategy & Content Calendar',
    iconName: 'megaphone',
    shortDesc: 'تدوین نقشه راه تولید محتوا، کانتنت کلندر اختصاصی و تعریف هویت محتوایی برند.',
    fullDesc: 'تعریف دقیق Tone of Voice، پرسونای مخاطب و تقویم محتوایی ۱ ماهه جهت انسجام حضور برند و افزایش تعامل (Engagement) مخاطبان.',
    features: [
      'تحلیل وضعیت پیج و رقبای اصلی بازار',
      'تدوین Tone of Voice و هویت محتوایی برند',
      'طراحی کانتنت کلندر اختصاصی یک‌ماهه',
      'جلسه مشاوره اختصاصی برای تیم تولید محتوا'
    ],
    deliverables: ['تقویم محتوایی ۱ ماهه', 'بریف ایده‌پردازی ستون‌های محتوا', 'بهینه‌سازی بایو و هایلایت‌ها'],
    tags: ['Social Media', 'Content Calendar', 'Strategy', 'Branding'],
    packages: [
      { title: 'مشاوره + کانتنت کلندر', price: '۸ میلیون تومان', description: 'شامل جلسه استراتژی، تحلیل رقبا و تحویل تقویم ۱ ماهه' }
    ]
  },
  {
    id: 'influencer-marketing',
    title: 'اینفلوئنسر مارکتینگ & سناریونویسی',
    titleEn: 'Influencer Marketing & Campaign Execution',
    iconName: 'award',
    shortDesc: 'انتخاب هوشمند اینفلوئنسرها، سناریونویسی خلاقانه و مدیریت کامل اجرای کمپین با گزارش ROI.',
    fullDesc: 'مدیریت تمام مراحل کمپین از تحقیق و اعتبارسنجی فالوورها، عقد قرارداد، مدیریت زمان‌بندی انتشار تا سنجش دقیق نرخ بازگشت سرمایه (ROI).',
    features: [
      'تحقیق و بررسی آنالیتیکس و اصالت فالوورهای پیج‌ها',
      'سناریونویسی و تدوین بریف خلاقانه کمپین',
      'مذاکره و عقد قرارداد مستقیم با اینفلوئنسرها',
      'پایش آنلاین اجرا و ارائه گزارش جامع ROI'
    ],
    deliverables: ['آنالیز کیفیت پیج‌ها', 'سناریوهای ویدئویی', 'گزارش نهایی بازدهی کمپین'],
    tags: ['Influencer Marketing', 'ROI Optimization', 'Briefing', 'Campaigns'],
    packages: [
      { title: 'فی مدیریت کمپین', price: '۲۵٪ بودجه کمپین', badge: 'حداقل بودجه ۱۲۰ م.ت', isPopular: true, description: 'حداقل بودجه کمپین ۱۲۰ میلیون تومان (شامل دستمزد اینفلوئنسرها)' }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'dayan-performance',
    title: 'توسعه سیستم Publisher Scoring و بهینه‌سازی Funnel جذب کاربر',
    client: 'دایان (مشهد)',
    industry: 'Fintech',
    industryFa: 'پرفورمنس مارکتینگ',
    summary: 'توسعه سیستم Publisher Dynamic Scoring برای ارزیابی کیفیت پابلیشرها و افزایش دقت تصمیم‌گیری در کمپین‌ها.',
    thumbnailIcon: 'chart',
    heroColor: '#8b5cf6',
    featured: true,
    metrics: {
      roas: 'CPA Optimized',
      conversionRate: 'High Quality Leads',
      cacReduction: '-CPA'
    },
    metricsComparison: [
      { label: 'دقت ارزیابی کیفیت پابلیشرها', before: 'سنتی', after: 'Dynamic Scoring', growth: '+۱۰۰٪' },
      { label: 'کیفیت لیدهای دریافتی', before: 'متوسط', after: 'بسیار بالا', growth: '+۴۵٪' },
      { label: 'بهره‌وری بودجه تبلیغاتی', before: 'معمولی', after: 'حداکثری', growth: '+۳۵٪' }
    ],
    challenge: 'عدم وجود سنجه‌های دقیق برای سنجش کیفیت لیدهای ارسالی از سمت پابلیشرها و اتلاف بخشی از بودجه تبلیغاتی.',
    solution: 'طراحی سیستم امتیازدهی پویا (Publisher Scoring)، هدایت کمپین‌های جذب با تمرکز بر کاهش CPA و تحلیل مستمر KPIهای Funnel.',
    results: 'کاهش محسوس هزینه جذب لید مؤثر، ارتقای شفافیت تصمیم‌گیری‌ها و افزایش بهره‌وری کل بودجه.',
    tags: ['Publisher Scoring', 'CPA Reduction', 'Funnel Optimization', 'Lead Quality'],
    date: 'اکنون'
  },
  {
    id: 'iranbroker-tracking',
    title: 'طراحی معماری Tracking و افزایش دقت Attribution در Affiliate Marketing',
    client: 'ایران بروکر (مشهد)',
    industry: 'Fintech',
    industryFa: 'فین‌تک و رمزارز',
    summary: 'معماری جامع Tracking، پیاده‌سازی ساختار Event Tracking در GTM و بهینه‌سازی کمپین‌های Display Ads.',
    thumbnailIcon: 'rocket',
    heroColor: '#4c8dff',
    featured: true,
    metrics: {
      roas: 'High Attribution',
      conversionRate: 'Data Quality Up',
      cacReduction: 'Display Ads Opt'
    },
    metricsComparison: [
      { label: 'دقت مدل Attribution', before: 'محدود', after: 'شفاف و کامل', growth: '+۸۵٪' },
      { label: 'کیفیت داده‌های بازاریابی', before: 'همپوشانی', after: 'اعتبارسنجی‌شده', growth: '+۹۵٪' },
      { label: 'هزینه جذب کاربر (Display Ads)', before: 'بالا', after: 'بهینه‌شده', growth: '-۳۰٪' }
    ],
    challenge: 'عدم امکان تحلیل دقیق عملکرد کانال‌های مختلف جذب Affiliate و خطاهای همپوشانی در ترکینگ رویدادها.',
    solution: 'طراحی ساختار کامل GTM Event Tracking، اعتبارسنجی داده‌ها و بهینه‌سازی ساختاری کمپین‌های Display گوگل.',
    results: 'ایجاد شفافیت ۱۰۰٪ در تحلیل کانال‌های ورودی و کاهش هزینه جذب کاربر با بهبود کیفیت ترافیک.',
    tags: ['Tracking Architecture', 'Attribution Accuracy', 'GTM', 'Display Ads'],
    date: 'شهریور – دی ۱۴۰۴'
  },
  {
    id: 'eqamat24-cro',
    title: 'بهینه‌سازی نرخ تبدیل (CRO) مسیر رزرو و اجرای تست‌های A/B',
    client: 'اقامت ۲۴ (مشهد)',
    industry: 'Travel',
    industryFa: 'گردشگری و سفر',
    summary: 'تحلیل رفتار کاربران با GA4، Hotjar و Clarity و تدوین Roadmap بهینه‌سازی UX مسیر رزرو.',
    thumbnailIcon: 'target',
    heroColor: '#5ce1e6',
    featured: true,
    metrics: {
      roas: 'CRO Boosted',
      conversionRate: '+A/B Tested',
      cacReduction: '-Funnel Drops'
    },
    metricsComparison: [
      { label: 'نرخ تبدیل مسیر رزرو', before: 'پایه', after: 'ارتقا یافته', growth: '+۲۸٪' },
      { label: 'شناسایی نقاط افت Funnel', before: 'تخمینی', after: 'تحلیل داده‌محور', growth: '+۱۰۰٪' },
      { label: 'تست‌های موفق A/B', before: '۰', after: 'چندین فاز موفق', growth: '+A/B' }
    ],
    challenge: 'وجود نقاط افت (Drop-off) در مراحل نهایی مسیر رزرو هتل و هدررفت ترافیک ورودی سایت.',
    solution: 'بررسی دقیق رکوردهای رفتاری در Hotjar و Microsoft Clarity، طراحی تست‌های A/B برای صفحات کلیدی و همکاری با تیم محصول.',
    results: 'اصلاح تجربه کاربری، کاهش ریزش کاربران در مسیر خرید و افزایش نرخ تبدیل کل سیستم رزرو.',
    tags: ['CRO', 'GA4', 'Microsoft Clarity', 'Hotjar', 'A/B Testing'],
    date: 'خرداد – شهریور ۱۴۰۴'
  },
  {
    id: 'eads-campaigns',
    title: 'افزایش CTR از ۱.۲٪ به ۳.۵٪ و رشد ۲۵٪ نرخ تبدیل برای ۵ برند معتبر',
    client: 'ای ادز (تهران)',
    industry: 'SaaS',
    industryFa: 'آژانس تبلیغاتی',
    summary: 'مدیریت کمپین‌های پرفورمنس مارکتینگ در Google Ads، Meta Ads و TikTok Ads و استانداردسازی UTMها.',
    thumbnailIcon: 'laptop',
    heroColor: '#9d4edd',
    featured: true,
    metrics: {
      roas: '3.5% CTR',
      conversionRate: '+25% Conv Rate',
      cacReduction: '5 Brands Managed'
    },
    metricsComparison: [
      { label: 'میانگین کلیک به نمایش (CTR)', before: '۱.۲٪', after: '۳.۵٪', growth: '+۱۹۱٪' },
      { label: 'افزایش نرخ تبدیل لندینگ‌پیج‌ها', before: 'پایه', after: 'بهینه‌شده', growth: '+۲۵٪' }
    ],
    challenge: 'CTR پایین و ساختار غیراستاندارد UTMها که تحلیل دقیق کمپین‌ها را ناممکن ساخته بود.',
    solution: 'بازطراحی ساختار کمپین‌ها، هدف‌گیری دقیق‌تر مخاطبان و همکاری مستقیم با تیم طراحی برای بهبود لندینگ‌ها.',
    results: 'رشد چشمگیر تعامل مخاطبان، افزایش ۲۵ درصدی تبدیل‌ها و مدیریت موفق بودجه ۵ برند همزمان.',
    tags: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'CTR Boost'],
    date: 'مرداد ۱۴۰۲ – بهمن ۱۴۰۳'
  },
  {
    id: 'fastclick-campaigns',
    title: 'طراحی و اجرای +۵۰ کمپین ویدئویی و کاهش ۲۲٪ کلیک‌های نامعتبر',
    client: 'فست کلیک (تهران)',
    industry: 'SaaS',
    industryFa: 'پلتفرم تبلیغاتی',
    summary: 'اجرای بیش از ۵۰ کمپین ویدئویی در آپارات، اینستاگرام و تلگرام، توسعه مدل ارزیابی کیفیت ترافیک و کاهش ۳۰٪ CPA ریتارگتینگ.',
    thumbnailIcon: 'rocket',
    heroColor: '#f43f5e',
    featured: false,
    metrics: {
      roas: '-30% CPA',
      conversionRate: '-22% Invalid Clicks',
      cacReduction: '+50 Campaigns'
    },
    metricsComparison: [
      { label: 'کاهش کلیک‌های نامعتبر', before: 'بالا', after: 'کنترل‌شده', growth: '-۲۲٪' },
      { label: 'هزینه جذب (CPA) ریتارگتینگ', before: 'پایه', after: 'بهینه‌شده', growth: '-۳۰٪' }
    ],
    challenge: 'کیفیت پایین ترافیک و کلیک‌های نامعتبر در کمپین‌های ویدیویی.',
    solution: 'اجرای بیش از ۵۰ کمپین ویدیویی در آپارات، اینستاگرام و تلگرام و توسعه مدل ارزیابی کیفیت ترافیک.',
    results: 'کاهش ۲۲٪ کلیک‌های نامعتبر و کاهش ۳۰٪ هزینه جذب مشتری (CPA) در کمپین‌های ریتارگتینگ.',
    tags: ['Video Campaigns', 'Retargeting', 'CPA Reduction', 'Traffic Quality'],
    date: 'دی ۱۴۰۲ – تیر ۱۴۰۳'
  },
  {
    id: 'ahanonline-seo',
    title: 'رساندن کلیدواژه «قیمت میلگرد» به رتبه ۱ گوگل و رشد ۳۰٪ ترافیک استراتژیک',
    client: 'آهن آنلاین (تهران)',
    industry: 'E-commerce',
    industryFa: 'صنعتی و فولاد',
    summary: 'تدوین استراتژی لینک‌سازی هدفمند، بهینه‌سازی ساختار صفحات و بهبود Snippetها و Intent Search.',
    thumbnailIcon: 'chart',
    heroColor: '#eab308',
    featured: false,
    metrics: {
      roas: 'Rank 1 Google',
      conversionRate: '+30% Traffic',
      cacReduction: 'Technical SEO'
    },
    metricsComparison: [
      { label: 'رتبه کلیدواژه «قیمت میلگرد»', before: 'صفحات عقب', after: 'رتبه ۱ گوگل', growth: 'رتبه ۱' },
      { label: 'ترافیک کلیدواژه‌های استراتژیک', before: 'پایه', after: 'رشد یافته', growth: '+۳۰٪' }
    ],
    challenge: 'نیاز به رشد ترافیک ارگانیک در بازار رقابتی محصولات فلزی.',
    solution: 'تدوین استراتژی لینک‌سازی هدفمند و بهینه‌سازی ساختار صفحات، بهبود Snippetها و تحلیل Search Intent.',
    results: 'رساندن کلیدواژه «قیمت میلگرد» به رتبه اول گوگل و رشد ۳۰٪ ترافیک کلیدواژه‌های استراتژیک.',
    tags: ['SEO', 'Google Rank 1', 'Technical SEO', 'Keyword Research'],
    date: 'خرداد ۱۴۰۱ – خرداد ۱۴۰۲'
  },
  {
    id: 'bitestan-seo',
    title: 'رساندن ۱۵ کلیدواژه حوزه رمزارز به صفحه اول گوگل طی ۴ ماه',
    client: 'بیتستان (تهران)',
    industry: 'Crypto',
    industryFa: 'رمزارز و فین‌تک',
    summary: 'طراحی معماری محتوایی، لینک‌سازی داخلی و ارتقای ۵۰٪ ترافیک ارگانیک سایت.',
    thumbnailIcon: 'laptop',
    heroColor: '#10b981',
    featured: false,
    metrics: {
      roas: '15 Words Page 1',
      conversionRate: '+50% Organic Growth',
      cacReduction: '4 Months Result'
    },
    metricsComparison: [
      { label: 'کلمات صفحه اول گوگل', before: 'محدود', after: '۱۵ کلیدواژه اصلی', growth: '۱۵ کلمه' },
      { label: 'ترافیک ارگانیک', before: 'پایه', after: 'افزایش یافته', growth: '+۵۰٪' }
    ],
    challenge: 'حضور ضعیف در نتایج جستجوی حوزه رمزارز.',
    solution: 'طراحی معماری محتوایی، لینک‌سازی داخلی و استراتژی هدفمند SEO مبتنی بر تحلیل روندهای بازار.',
    results: 'رساندن ۱۵ کلیدواژه رقابتی به صفحه اول گوگل طی چهار ماه و رشد ۵۰٪ ترافیک ارگانیک.',
    tags: ['Crypto SEO', 'Content Architecture', 'Internal Linking', 'Page 1 Google'],
    date: 'فروردین ۱۴۰۰ – فروردین ۱۴۰۱'
  },
  {
    id: 'amir-optic',
    title: 'مدیریت وب‌سایت، پیاده‌سازی Data Tracking و بهینه‌سازی SEO/UX',
    client: 'امیر اپتیک',
    industry: 'E-commerce',
    industryFa: 'تجارت الکترونیک',
    summary: 'پیاده‌سازی Data Tracking و بهینه‌سازی SEO/UX برای رشد نرخ تبدیل.',
    thumbnailIcon: 'laptop',
    heroColor: '#06b6d4',
    featured: false,
    metrics: {
      roas: 'Data Tracking',
      conversionRate: 'SEO/UX Opt',
      cacReduction: 'E-commerce'
    },
    metricsComparison: [
      { label: 'وضعیت پیاده‌سازی ترکینگ', before: 'ناقص', after: 'Data Tracking کامل', growth: 'کامل' }
    ],
    challenge: 'عدم وجود زیرساخت ترکینگ دقیق رفتار کاربران و عدم بهینه‌سازی صفحات برای نرخ تبدیل و سئو.',
    solution: 'پیاده‌سازی Data Tracking و بهینه‌سازی SEO/UX.',
    results: 'پیاده‌سازی ترکینگ جامع، بهبود تجربه کاربری و افزایش قابل توجه نرخ تبدیل و فروش ارگانیک.',
    tags: ['Data Tracking', 'SEO/UX', 'E-commerce'],
    date: 'شهریور ۱۴۰۴'
  },
  {
    id: 'hihotel-google-ads',
    title: 'کارشناس گوگل ادز — بازطراحی ساختار کمپین‌های Hihotel',
    client: 'Hihotel',
    industry: 'Travel',
    industryFa: 'گردشگری و سفر',
    summary: 'بازطراحی ساختار کمپین‌ها برای بهبود کیفیت ترافیک و بازده تبلیغات.',
    thumbnailIcon: 'rocket',
    heroColor: '#3b82f6',
    featured: false,
    metrics: {
      roas: 'Campaign Redesign',
      conversionRate: 'Traffic Quality Up',
      cacReduction: 'Google Ads'
    },
    metricsComparison: [
      { label: 'کیفیت ترافیک ورودی', before: 'متوسط', after: 'ارتقایافته', growth: 'بهینه‌شده' }
    ],
    challenge: 'نیاز به بهبود کیفیت ترافیک ورودی و ارتقای بازدهی کمپین‌های تبلیغاتی گوگل.',
    solution: 'بازطراحی کامل ساختار کمپین‌ها و هدف‌گیری دقیق‌تر کلمات کلیدی.',
    results: 'بهبود کیفیت ترافیک ورودی و افزایش بازدهی تبلیغات.',
    tags: ['Google Ads', 'Campaign Structure', 'Travel Ads'],
    date: 'فروردین ۱۴۰۴'
  },
  {
    id: 'dezhino-influencer',
    title: 'اینفلوئنسر مارکتینگ دژینو — افزایش ROI به تقریباً دوبرابر',
    client: 'دژینو',
    industry: 'SaaS',
    industryFa: 'تکنولوژی و بازاریابی',
    summary: 'بهینه‌سازی فرآیند همکاری با اینفلوئنسرها؛ ROI تقریباً دوبرابر شد.',
    thumbnailIcon: 'target',
    heroColor: '#a855f7',
    featured: false,
    metrics: {
      roas: '~2x ROI',
      conversionRate: 'Influencer Process',
      cacReduction: 'Campaign Mgmt'
    },
    metricsComparison: [
      { label: 'بازگشت سرمایه (ROI)', before: 'پایه', after: 'تقریباً ۲ برابر', growth: '۲x' }
    ],
    challenge: 'فرآیند ناکارآمد همکاری با اینفلوئنسرها و بازدهی غیرشفاف کمپین‌ها.',
    solution: 'اعتبارسنجی فالوورها، سناریونویسی و بهینه‌سازی ساختار همکاری با اینفلوئنسرها.',
    results: 'دوبرابر شدن تقریبی نرخ بازگشت سرمایه (ROI) کمپین‌های اینفلوئنسری.',
    tags: ['Influencer Marketing', 'ROI Boost', 'Briefing'],
    date: 'اردیبهشت ۱۴۰۳'
  },
  {
    id: 'omidarvisa-seo',
    title: 'بهینه‌سازی +۱۵۰ صفحه و بهبود CTR نتایج جستجو برای امیدارویزا',
    client: 'امیدارویزا',
    industry: 'Travel',
    industryFa: 'خدمات مهاجرت و ویزا',
    summary: 'بهینه‌سازی بیش از ۱۵۰ صفحه، ارتقای CTR نتایج جستجو و رشد ترافیک ارگانیک.',
    thumbnailIcon: 'chart',
    heroColor: '#ec4899',
    featured: false,
    metrics: {
      roas: '+150 Pages',
      conversionRate: 'CTR Improvement',
      cacReduction: 'Organic Growth'
    },
    metricsComparison: [
      { label: 'صفحات بهینه‌سازی‌شده', before: 'پایه', after: '+۱۵۰ صفحه', growth: '+۱۵۰' }
    ],
    challenge: 'نرخ کلیک (CTR) پایین در نتایج گوگل و عدم یکپارچگی ساختار محتوایی در صفحات خدمات.',
    solution: 'بهینه‌سازی فنی و محتوایی بیش از ۱۵۰ صفحه و اصلاح متاتگ‌ها جهت بهبود CTR.',
    results: 'بهبود CTR نتایج جستجو و رشد ورودی‌های ارگانیک سایت.',
    tags: ['SEO', 'Content Optimization', 'CTR Boost'],
    date: 'آبان ۱۴۰۲'
  },
  {
    id: 'partoka-seo',
    title: 'سرپرست سئو پارتوکا — تدوین استراتژی SEO شش سایت و +۸۰ محتوا',
    client: 'پارتوکا',
    industry: 'SaaS',
    industryFa: 'هلدینگ دیجیتال',
    summary: 'تدوین استراتژی SEO برای ۶ سایت و تولید +۸۰ محتوا؛ ایجاد زیرساخت رشد ارگانیک مقیاس‌پذیر.',
    thumbnailIcon: 'laptop',
    heroColor: '#6366f1',
    featured: false,
    metrics: {
      roas: '6 Websites',
      conversionRate: '+80 Content Pieces',
      cacReduction: 'Scalable Growth'
    },
    metricsComparison: [
      { label: 'تعداد سایت‌های تحت پوشش', before: 'پراکنده', after: '۶ سایت با استراتژی مدون', growth: '۶ سایت' }
    ],
    challenge: 'نیاز به زیرساخت رشد ارگانیک مقیاس‌پذیر برای شش سایت مختلف.',
    solution: 'تدوین استراتژی جامع SEO برای شش سایت و هدایت تولید بیش از ۸۰ محتوای تخصصی.',
    results: 'ساخت زیرساخت رشد ارگانیک مقیاس‌پذیر و پایدار برای هلدینگ.',
    tags: ['SEO Leadership', 'Scalable SEO', 'Content Strategy'],
    date: 'مرداد ۱۴۰۰'
  },
  {
    id: 'fazanavard-design',
    title: 'طراحی و راه اندازی سایت فضانورد (fazanavard.app)',
    client: 'فزانورد',
    industry: 'SaaS',
    industryFa: 'محصولات دیجیتال',
    summary: 'راه‌اندازی fazanavard.app؛ زیرساخت اولیه محصول برای توسعه آتی.',
    thumbnailIcon: 'rocket',
    heroColor: '#14b8a6',
    featured: false,
    metrics: {
      roas: 'fazanavard.app',
      conversionRate: 'Initial Release',
      cacReduction: 'Product MVP'
    },
    metricsComparison: [
      { label: 'وضعیت محصول', before: 'ایده', after: 'راه‌اندازی کامل fazanavard.app', growth: 'مستقر' }
    ],
    challenge: 'نیاز به طراحی و پیاده‌سازی زیرساخت اولیه محصول جهت توسعه‌های بعدی.',
    solution: 'طراحی UI/UX و پیاده‌سازی وب‌سایت fazanavard.app.',
    results: 'تحویل کامل زیرساخت اولیه محصول جهت ورود به بازار.',
    tags: ['Web Design', 'Product Setup', 'UI/UX'],
    date: 'آبان ۱۴۰۳'
  },
  {
    id: 'molaghat-restaurant',
    title: 'طراحی وب‌سایت سینمایی رستوران مولاقات',
    client: 'رستوران مولاقات',
    industry: 'Web Design',
    industryFa: 'طراحی وب‌سایت',
    summary: 'طراحی و اجرای وب‌سایت اسکرول-محور و سینمایی برای رستوران مولاقات با تجربه بصری غنی و انیمیشن‌های روان.',
    thumbnailIcon: 'code',
    heroColor: '#f59e0b',
    featured: true,
    liveUrl: 'https://molaghaat.netlify.app/',
    metrics: {
      roas: 'Cinematic UI',
      conversionRate: 'Scroll-driven UX',
      cacReduction: 'Fully Responsive'
    },
    metricsComparison: [
      { label: 'طراحی بصری', before: 'بدون وب‌سایت اختصاصی', after: 'وب‌سایت سینمایی اسکرول-محور', growth: 'برندسازی دیجیتال' },
      { label: 'تجربه کاربری', before: 'معرفی صرفاً حضوری', after: 'تجربه بصری کامل آنلاین', growth: 'افزایش اعتماد مشتری' },
      { label: 'سازگاری دستگاه‌ها', before: '—', after: 'ریسپانسیو کامل موبایل و دسکتاپ', growth: '۱۰۰٪ ریسپانسیو' }
    ],
    challenge: 'رستوران مولاقات فاقد وب‌سایتی بود که فضا، منو و تجربه حضور در رستوران را به‌صورت بصری و جذاب به مشتریان آنلاین منتقل کند.',
    solution: 'طراحی وب‌سایتی با روایت اسکرول-محور (Scroll-driven) و جلوه‌های بصری سینمایی، همراه با معرفی منو و فضای رستوران، جهت ایجاد حس حضور واقعی برای بازدیدکننده.',
    results: 'ایجاد هویت دیجیتال متمایز برای برند و تجربه‌ای بصری که رستوران را از رقبا متمایز می‌کند.',
    tags: ['Web Design', 'Scroll Animation', 'Restaurant Branding', 'UI/UX'],
    date: '۱۴۰۴'
  },
  {
    id: 'golchin-home',
    title: 'طراحی وب‌سایت فروشگاهی گلچین هوم',
    client: 'گلچین هوم',
    industry: 'Web Design',
    industryFa: 'طراحی وب‌سایت',
    summary: 'طراحی وب‌سایت فروشگاهی گلچین هوم با چیدمان مدرن محصولات، ناوبری روان و آماده برای رشد فروش آنلاین.',
    thumbnailIcon: 'code',
    heroColor: '#22c55e',
    featured: true,
    liveUrl: 'https://golchin-home.netlify.app/',
    metrics: {
      roas: 'E-commerce Ready',
      conversionRate: 'Product Showcase',
      cacReduction: 'Fully Responsive'
    },
    metricsComparison: [
      { label: 'ویترین محصولات', before: 'بدون فروشگاه آنلاین', after: 'ویترین دیجیتال کامل محصولات', growth: 'دسترسی آنلاین ۲۴ ساعته' },
      { label: 'ناوبری سایت', before: '—', after: 'دسته‌بندی روان و جستجوی سریع محصولات', growth: 'کاهش سردرگمی کاربر' },
      { label: 'سازگاری دستگاه‌ها', before: '—', after: 'ریسپانسیو کامل موبایل و دسکتاپ', growth: '۱۰۰٪ ریسپانسیو' }
    ],
    challenge: 'گلچین هوم نیاز به یک ویترین آنلاین حرفه‌ای داشت تا محصولات خانگی و دکوراتیو خود را به‌شکلی مدرن و قابل‌اعتماد به مشتریان نمایش دهد.',
    solution: 'طراحی وب‌سایت فروشگاهی با چیدمان بصری تمیز، دسته‌بندی واضح محصولات و مسیر کاربری ساده برای مرور و انتخاب محصولات.',
    results: 'ایجاد ویترین دیجیتال حرفه‌ای که پایه‌ای مناسب برای توسعه فروش آنلاین برند فراهم کرد.',
    tags: ['Web Design', 'E-commerce UI', 'Product Showcase', 'UI/UX'],
    date: '۱۴۰۴'
  },
  {
    id: 'arad-beauty',
    title: 'طراحی وب‌سایت برند آراد بیوتی',
    client: 'آراد بیوتی',
    industry: 'Web Design',
    industryFa: 'طراحی وب‌سایت',
    summary: 'طراحی وب‌سایت برند آرایشی و بهداشتی آراد بیوتی با هویت بصری لوکس و تجربه خرید ساده و جذاب.',
    thumbnailIcon: 'code',
    heroColor: '#ec4899',
    featured: true,
    liveUrl: 'https://aradbeauty.netlify.app/',
    metrics: {
      roas: 'Premium Brand UI',
      conversionRate: 'Beauty E-commerce',
      cacReduction: 'Fully Responsive'
    },
    metricsComparison: [
      { label: 'هویت بصری برند', before: 'بدون حضور آنلاین اختصاصی', after: 'وب‌سایت با هویت بصری لوکس', growth: 'تقویت جایگاه برند' },
      { label: 'مسیر خرید', before: '—', after: 'مسیر ساده مرور و انتخاب محصولات', growth: 'تجربه خرید روان' },
      { label: 'سازگاری دستگاه‌ها', before: '—', after: 'ریسپانسیو کامل موبایل و دسکتاپ', growth: '۱۰۰٪ ریسپانسیو' }
    ],
    challenge: 'آراد بیوتی به وب‌سایتی نیاز داشت که ظرافت و لوکس‌بودن برندهای آرایشی را در قالب یک تجربه دیجیتال متناسب منتقل کند.',
    solution: 'طراحی رابط کاربری با پالت رنگی ملایم و لوکس، معرفی محصولات با چیدمانی شیک و مسیر کاربری ساده برای مرور محصولات.',
    results: 'راه‌اندازی وب‌سایتی که هویت بصری برند را به‌درستی منعکس کرده و تجربه کاربری خوشایندی برای مشتریان فراهم می‌کند.',
    tags: ['Web Design', 'Beauty Brand', 'Premium UI', 'E-commerce UI'],
    date: '۱۴۰۴'
  }
];

export const STATS = [
  { value: '۵+', label: 'سال تجربه تخصصی', subtext: 'در پرفورمنس مارکتینگ و CRO', icon: 'award' },
  { value: '+۵۰', label: 'کمپین موفق ویدئویی و کلیکی', subtext: 'در آپارات، اینستاگرام، تلگرام و گوگل', icon: 'rocket' },
  { value: '۳.۵٪', label: 'میانگین CTR ارتقایافته', subtext: 'رشد از ۱.۲٪ به ۳.۵٪ در کمپین‌ها', icon: 'trending-up' },
  { value: 'رتبه ۱', label: 'گوگل در کلمات پررقابت', subtext: 'مانند «قیمت میلگرد» و کلمات رمزارز', icon: 'layers' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    clientName: 'تیم پرفورمنس مارکتینگ',
    clientRole: 'مدیر ارشد محصول و رشد',
    company: 'دایان',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'پیاده‌سازی سیستم Publisher Dynamic Scoring توسط امید، دقت ما در ارزیابی ترافیک ورودی را به شدت بالا برد و باعث شد لیدهای بسیار باکیفیت‌تری جذب کنیم.',
    metricHighlight: 'بهینه‌سازی کامل CPA'
  },
  {
    id: '2',
    clientName: 'تیم فنی و مارکتینگ',
    clientRole: 'مدیر ارشد بازاریابی',
    company: 'ایران بروکر',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'معماری ترکینگ دقیق و اعتبارسنجی GTM که امید طراحی کرد، شفافیت کاملی در ارزیابی کانال‌های Affiliate به ما داد.',
    metricHighlight: 'دقت بالای Attribution'
  },
  {
    id: '3',
    clientName: 'تیم محصول و CRO',
    clientRole: 'سرپرست تیم بهینه‌سازی',
    company: 'اقامت ۲۴',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'اجرای دقیق تست‌های A/B و تحلیل رفتار کاربران در GA4 و Clarity توسط امید، نقش مهمی در کاهش نقاط افت مسیر رزرو داشت.',
    metricHighlight: 'رشد ۲۸٪ نرخ تبدیل رزرو'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'cpa-campaign-success',
    title: 'چرا CPA پایین همیشه به معنی کمپین موفق نیست',
    excerpt: 'گاهی کاهش هزینه جذب، کیفیت لید رو قربانی می‌کنه — چطور این تعادل رو پیدا کنیم.',
    content: `در دنیای پرفورمنس مارکتینگ، تمرکز صرف روی کاهش CPA می‌تواند گول‌زننده باشد. اگر لیدهای ارزان کیفیت لازم برای تبدیل به مشتری نهایی را نداشته باشند، سودآوری کل سیستم افت می‌کند...`,
    category: 'Performance',
    categoryFa: 'پرفورمنس مارکتینگ',
    date: 'شهریور ۱۴۰۴',
    readTime: '۶ دقیقه مطالعه',
    author: 'امید عدلی',
    imageIcon: 'rocket',
    featured: true
  },
  {
    id: 'conversion-rate-measurement',
    title: 'نرخ تبدیل سایت‌تون رو چطور واقعاً اندازه بگیرید',
    excerpt: 'راهنمای ساده برای شروع اندازه‌گیری درست، بدون نیاز به دانش فنی عمیق.',
    content: `بسیاری از کسب‌وکارها نرخ تبدیل را اشتباه محاسبه می‌کنند یا داده‌های ناقص GA4 را مبنا قرار می‌دهند. در این راهنما نحوه تعریف درست Event و Goal Tracking را مرور می‌کنیم...`,
    category: 'CRO',
    categoryFa: 'بهینه‌سازی نرخ تبدیل',
    date: 'مرداد ۱۴۰۴',
    readTime: '۸ دقیقه مطالعه',
    author: 'امید عدلی',
    imageIcon: 'target',
    featured: true
  },
  {
    id: 'ab-testing-failures',
    title: 'چرا اکثر تست‌های A/B شکست می‌خورن',
    excerpt: 'اشتباهات رایجی که نتیجه تست‌ها رو بی‌اعتبار می‌کنه.',
    content: `اجرای تست A/B بدون حجم نمونه کافی یا تغییر هم‌زمان چندین متغیر، نتایج را گمراه‌کننده می‌کند. بررسی خطاهای متداول در تست‌های A/B و نحوه اصلاح آن‌ها...`,
    category: 'CRO',
    categoryFa: 'بهینه‌سازی نرخ تبدیل',
    date: 'تیر ۱۴۰۴',
    readTime: '۷ دقیقه مطالعه',
    author: 'امید عدلی',
    imageIcon: 'target',
    featured: false
  },
  {
    id: 'tracking-attribution-guide',
    title: 'Tracking یعنی چی و چرا بدونش کمپین‌تون کوره',
    excerpt: 'مقدمه‌ای ساده بر مفهوم Attribution برای صاحبان کسب‌وکار غیرفنی.',
    content: `بدون ترکینگ دقیق رویدادها و UTMهای استاندارد، مدیریت بودجه تبلیغاتی مثل رانندگی با چشمان بسته است. نحوه ایجاد شفافیت در کانال‌های ورودی...`,
    category: 'Analytics',
    categoryFa: 'آنالیتیکس و ترکینگ',
    date: 'خرداد ۱۴۰۴',
    readTime: '۱۰ دقیقه مطالعه',
    author: 'امید عدلی',
    imageIcon: 'chart',
    featured: false
  },
  {
    id: 'seo-short-vs-longterm',
    title: 'فرق سئو کوتاه‌مدت و بلندمدت در چیه',
    excerpt: 'چطور بین رشد سریع و ناپایدار، و رشد واقعی ارگانیک فرق بذارید.',
    content: `تکنیک‌های سیاه یا میانبرهای سئو ممکن است رشدی موقت ایجاد کنند، اما استراتژی محتوایی پایداری است که کلیدواژه‌های استراتژیک را در صفحه اول گوگل تثبیت می‌کند...`,
    category: 'SEO',
    categoryFa: 'سئو و رشد ارگانیک',
    date: 'اردیبهشت ۱۴۰۴',
    readTime: '۵ دقیقه مطالعه',
    author: 'امید عدلی',
    imageIcon: 'laptop',
    featured: false
  },
  {
    id: 'pre-ad-budget-checklist',
    title: 'قبل از افزایش بودجه تبلیغات، این‌ها رو چک کنید',
    excerpt: 'چک‌لیستی ساده قبل از هر تصمیم برای افزایش هزینه تبلیغاتی.',
    content: `افزایش بودجه در فانیلی که نرخ تبدیل پایینی دارد، اتلاف سرمایه است. قبل از اسکیل کمپین‌ها، این ۶ نقطه حیاتی در سایت و سیستم ترکینگ را ارزیابی کنید...`,
    category: 'Performance',
    categoryFa: 'پرفورمنس مارکتینگ',
    date: 'فروردین ۱۴۰۴',
    readTime: '۶ دقیقه مطالعه',
    author: 'امید عدلی',
    imageIcon: 'rocket',
    featured: false
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'campaign-audit-checklist',
    title: 'چک‌لیست ممیزی کمپین',
    description: 'حساب تبلیغاتی‌تون رو با یه چک‌لیست دقیق خودتون بررسی کنید و نقاط ضعف رو قبل از هزینه بیشتر پیدا کنید.',
    targetAudience: 'کسب‌وکارهایی که می‌خوان قبل از گرفتن مشاور، یه ارزیابی اولیه خودشون داشته باشن.',
    iconName: 'target',
    badge: 'خودارزیابی اولیه',
    actionText: 'دریافت چک‌لیست'
  },
  {
    id: 'reporting-template',
    title: 'قالب گزارش‌گیری',
    description: 'یه قالب آماده برای گزارش‌دهی عملکرد کمپین‌ها که KPIهای اصلی رو شفاف نشون می‌ده.',
    targetAudience: 'تیم‌های مارکتینگ کوچیک که هنوز ساختار گزارش‌دهی منظم ندارن.',
    iconName: 'chart',
    badge: 'قالب آماده',
    actionText: 'دریافت قالب'
  },
  {
    id: 'short-cro-course',
    title: 'دوره آموزشی کوتاه CRO',
    description: 'یه دوره فشرده برای یادگیری اصول بهینه‌سازی نرخ تبدیل، بدون نیاز به پیش‌زمینه فنی.',
    targetAudience: 'صاحبان کسب‌وکار یا مدیران محصولی که می‌خوان خودشون پایه CRO رو یاد بگیرن.',
    iconName: 'laptop',
    badge: 'دوره فشرده',
    actionText: 'مشاهده دوره'
  },
  {
    id: 'one-on-one-consultation',
    title: 'مشاوره یک‌جلسه‌ای',
    description: 'یه جلسه متمرکز برای بررسی یه چالش مشخص در کمپین یا فانل شما و ارائه راهکار عملی.',
    targetAudience: 'کسب‌وکارهایی که به یه نظر تخصصی سریع نیاز دارن، نه همکاری بلندمدت.',
    iconName: 'rocket',
    badge: 'جلسه تخصصی',
    actionText: 'رزرو جلسه'
  }
];

export const ONGOING_PROJECTS: OngoingProjectItem[] = [
  {
    id: 'current-1',
    title: 'پرفورمنس مارکتینگ & بهینه‌سازی نرخ تبدیل (CRO)',
    status: 'در حال اجرا',
    description: 'توسعه سیستم Publisher Dynamic Scoring و اجرای تست‌های A/B برای ارتقای بازدهی کمپین‌ها.',
    isPlaceholder: false
  },
  {
    id: 'past-1',
    title: 'طراحی معماری Tracking و کمپین‌های دیجیتال',
    status: 'تکمیل‌شده',
    description: 'پیاده‌سازی جامع Event Tracking در GTM و افزایش دقت مدل Attribution.',
    isPlaceholder: false
  }
];

export const BUSINESS_ANALYSIS_DATA = {
  headline: 'قبل از اینکه پیشنهاد بدم، اول وضعیتت رو می‌فهمم',
  subheadline: 'هیچ استراتژی بازاریابی خوبی روی حدس بنا نمی‌شه. قبل از هر پیشنهاد همکاری، یه تحلیل واقعی از وضعیت فعلی کسب‌وکارتون انجام می‌دم.',
  steps: [
    { step: '۰۱', title: 'بررسی حساب‌های تبلیغاتی فعلی', desc: 'ساختار کمپین، بودجه و عملکرد فعلی رو بررسی می‌کنم.' },
    { step: '۰۲', title: 'تحلیل رقبا', desc: 'می‌بینم رقبای‌تون در بازار چطور عمل می‌کنن و کجای مسیر جا مونده‌اید یا جلوترید.' },
    { step: '۰۳', title: 'شناسایی نقاط ضعف فانل', desc: 'از اولین برخورد کاربر تا خرید نهایی رو نقشه‌برداری می‌کنم تا نقاط افت رو پیدا کنم.' },
    { step: '۰۴', title: 'ارائه گزارش اولیه', desc: 'بسته به اندازه پروژه، این تحلیل می‌تونه رایگان یا کم‌هزینه باشه، و خروجی‌ش هم یه گزارش مکتوب و هم یه جلسه توضیح کلامیه.' }
  ],
  checklist: [
    'آیا نرخ تبدیل لندینگ‌پیج‌تون رو اندازه‌گیری می‌کنید؟',
    'آخرین بار کی استراتژی تبلیغاتی‌تون رو بازبینی کردید؟',
    'آیا مسیر کامل مشتری از کلیک تا خرید رو Track می‌کنید؟',
    'هزینه جذب مشتری (CPA) فعلی‌تون رو دقیق می‌دونید؟',
    'آیا بین کانال‌های تبلیغاتی‌تون (گوگل، اینستاگرام، تیک‌تاک) هماهنگی وجود داره؟',
    'چند وقت یک‌بار گزارش عملکرد کمپین‌ها رو بررسی می‌کنید؟',
    'آیا تست A/B روی صفحات کلیدی‌تون انجام دادید؟',
    'بودجه تبلیغاتی‌تون بر چه اساسی تقسیم می‌شه؟'
  ],
  ctaText: 'می‌خواید بدونید دقیقاً کجای مسیر رشد هستید؟ درخواست تحلیل بدید →'
};

export const SKILLS_TOOLS: SkillTool[] = [
  { name: 'Google Ads', category: 'Ads', icon: 'google', proficiency: 98 },
  { name: 'Meta Ads', category: 'Ads', icon: 'meta', proficiency: 92 },
  { name: 'TikTok Ads', category: 'Ads', icon: 'tiktok', proficiency: 88 },
  { name: 'Google Analytics 4 (GA4)', category: 'Analytics', icon: 'ga4', proficiency: 96 },
  { name: 'Google Tag Manager (GTM)', category: 'Analytics', icon: 'gtm', proficiency: 95 },
  { name: 'Hotjar & Clarity', category: 'CRO', icon: 'hotjar', proficiency: 94 },
  { name: 'A/B Testing & VWO', category: 'CRO', icon: 'cro', proficiency: 92 },
  { name: 'WordPress & Elementor', category: 'Tech', icon: 'wordpress', proficiency: 90 },
  { name: 'HTML & CSS', category: 'Tech', icon: 'code', proficiency: 85 },
  { name: 'AI & Prompt Engineering', category: 'Tech', icon: 'ai', proficiency: 90 }
];

export const ALL_SKILLS_LIST = {
  hard: [
    { title: 'Growth & Performance Marketing', tags: ['Performance Strategy', 'Customer Acquisition', 'Growth Marketing', 'Campaign Optimization', 'Lead Generation', 'Audience Segmentation', 'Budget Optimization', 'Funnel Optimization'] },
    { title: 'Marketing Analytics & CRO', tags: ['KPI Design', 'Marketing Analytics', 'Dashboard Design', 'A/B Testing', 'Conversion Rate Optimization (CRO)', 'Landing Page Optimization', 'Funnel Analysis', 'UX Optimization'] },
    { title: 'Tracking & Measurement', tags: ['Google Tag Manager (GTM)', 'Event Tracking', 'Google Analytics 4 (GA4)', 'UTM Strategy', 'Conversion Tracking', 'Attribution Modeling'] },
    { title: 'Paid Media', tags: ['TikTok Ads', 'Meta Ads', 'Google Ads', 'Retargeting Strategy', 'Display Advertising'] },
    { title: 'SEO', tags: ['On-page SEO', 'Technical SEO', 'Keyword Research & Strategy', 'Search Intent Analysis', 'Content Optimization', 'Internal Linking Strategy'] },
    { title: 'Web Development & Landing Pages', tags: ['WordPress Website Development', 'Elementor', 'Landing Page Development', 'Basic HTML & CSS'] },
    { title: 'AI & Productivity', tags: ['AI-assisted Research', 'Prompt Engineering', 'Workflow Optimization'] }
  ],
  soft: [
    { title: 'تفکر راهبردی و تحلیلی', tags: ['تفکر راهبردی', 'تفکر تحلیلی', 'تفکر نقادانه', 'تصمیم‌گیری مبتنی بر داده', 'حل مسئله'] },
    { title: 'همکاری و ارتباطات', tags: ['ارتباط مؤثر', 'همکاری بین‌تیمی', 'مدیریت ذینفعان', 'انتقال و به‌اشتراک‌گذاری دانش'] },
    { title: 'اجرا و بهره‌وری', tags: ['هماهنگی و پیگیری پروژه‌ها', 'مدیریت زمان', 'اولویت‌بندی وظایف', 'دقت و توجه به جزئیات', 'نتیجه‌گرایی'] },
    { title: 'سازگاری و رشد حرفه‌ای', tags: ['سازگاری با تغییر', 'یادگیری مستمر', 'ذهنیت رشد', 'مسئولیت‌پذیری و مالکیت کارها (Ownership)'] }
  ]
};

export const TIMELINE: TimelineMilestone[] = [
  {
    year: 'اکنون',
    title: 'کارشناس پرفورمنس مارکتینگ',
    company: 'دایان | مشهد',
    description: 'توسعه و پیاده‌سازی سیستم Publisher Dynamic Scoring برای ارزیابی کیفیت پابلیشرها و افزایش دقت تصمیم‌گیری در کمپین‌ها. هدایت طراحی، اجرا و بهینه‌سازی کمپین‌های جذب کاربر با تمرکز بر کاهش CPA و بهبود بهره‌وری بودجه.',
    achievement: 'کاهش CPA، افزایش کیفیت لید، پیاده‌سازی سیستم Publisher Scoring'
  },
  {
    year: 'شهریور – دی ۱۴۰۴',
    title: 'کارشناس پرفورمنس مارکتینگ',
    company: 'ایران بروکر | مشهد',
    description: 'طراحی معماری Tracking برای Affiliate Marketing با هدف افزایش دقت Attribution. پیاده‌سازی و اعتبارسنجی ساختار GTM و Event Tracking و بهینه‌سازی کمپین‌های Display گوگل.',
    achievement: 'معماری جامع Tracking، افزایش دقت Attribution، بهبود کیفیت داده‌ها'
  },
  {
    year: 'خرداد – شهریور ۱۴۰۴',
    title: 'کارشناس بهینه‌سازی نرخ تبدیل (CRO)',
    company: 'اقامت ۲۴ | مشهد',
    description: 'طراحی و اجرای تست‌های A/B برای صفحات کلیدی مسیر رزرو. تحلیل رفتار کاربران با GA4، Microsoft Clarity و Hotjar و تدوین Roadmap بهینه‌سازی تجربه کاربری.',
    achievement: 'افزایش نرخ تبدیل مسیر رزرو، اجرای تست‌های A/B، تحلیل نقاط افت Funnel'
  },
  {
    year: 'مرداد ۱۴۰۲ – بهمن ۱۴۰۳',
    title: 'مدیر کمپین (Campaign Manager)',
    company: 'ای ادز | تهران',
    description: 'مدیریت و بهینه‌سازی کمپین‌های Performance Marketing برای ۵ برند در Google Ads، Meta Ads و TikTok Ads. ارتقای CTR از ۱.۲٪ به ۳.۵٪ و استانداردسازی UTMها.',
    achievement: 'افزایش CTR به ۳.۵٪، رشد ۲۵٪ نرخ تبدیل لندینگ‌پیج‌ها، مدیریت ۵ برند'
  },
  {
    year: 'دی ۱۴۰۲ – تیر ۱۴۰۳',
    title: 'مدیر کمپین (Campaign Manager)',
    company: 'فست کلیک | تهران',
    description: 'طراحی و اجرای بیش از ۵۰ کمپین ویدئویی در آپارات، اینستاگرام و تلگرام. توسعه مدل ارزیابی کیفیت ترافیک (کاهش ۲۲٪ کلیک نامعتبر) و کاهش ۳۰٪ CPA در کمپین‌های Retargeting.',
    achievement: 'کاهش ۳۰٪ CPA، کاهش ۲۲٪ کلیک‌های نامعتبر، اجرای +۵۰ کمپین ویدئویی'
  },
  {
    year: 'خرداد ۱۴۰۱ – خرداد ۱۴۰۲',
    title: 'کارشناس سئو',
    company: 'آهن آنلاین | تهران',
    description: 'رساندن کلیدواژه «قیمت میلگرد» به رتبه نخست گوگل از طریق لینک‌سازی هدفمند و بهینه‌سازی ساختار صفحات. افزایش ۳۰٪ ترافیک کلیدواژه‌های استراتژیک و ارتقای Snippetها.',
    achievement: 'رتبه ۱ گوگل در «قیمت میلگرد»، رشد ۳۰٪ ترافیک، بهینه‌سازی Technical SEO'
  },
  {
    year: 'فروردین ۱۴۰۰ – فروردین ۱۴۰۱',
    title: 'کارشناس سئو',
    company: 'بیتستان | تهران',
    description: 'رساندن ۱۵ کلیدواژه رقابتی حوزه رمزارز به صفحه نخست نتایج گوگل طی ۴ ماه. افزایش ۵۰٪ ترافیک ارگانیک با استراتژی محتوایی و بهینه‌سازی ساختاری.',
    achievement: '۱۵ کلمه در صفحه اول گوگل، رشد ۵۰٪ ترافیک ارگانیک، استراتژی محتوایی'
  }
];

export const OTHER_COLLABORATIONS = [
  { company: 'ورسلند', role: 'کارشناس ارشد دیجیتال مارکتینگ' },
  { company: 'سازیتو', role: 'کارشناس سئو' },
  { company: 'گیشه ۷', role: 'کارشناس سئو' },
  { company: 'آرتیالس', role: 'کارشناس شبکه‌های اجتماعی' },
  { company: 'رسپینا ۲۴', role: 'کارشناس تولید محتوا' }
];

export const SELECT_PROJECTS = [
  { title: 'مدیر وب‌سایت امیر اپتیک', desc: 'پیاده‌سازی Data Tracking و بهینه‌سازی SEO/UX برای رشد نرخ تبدیل', date: 'شهریور ۱۴۰۴' },
  { title: 'کارشناس گوگل ادز — Hihotel', desc: 'بازطراحی ساختار کمپین‌ها برای بهبود کیفیت ترافیک و بازده تبلیغات', date: 'فروردین ۱۴۰۴' },
  { title: 'اینفلوئنسر مارکتینگ — دژینو', desc: 'بهینه‌سازی فرآیند همکاری با اینفلوئنسرها؛ ROI تقریباً دوبرابر', date: 'اردیبهشت ۱۴۰۳' },
  { title: 'کارشناس سئو — امیدارویزا', desc: 'بهینه‌سازی +۱۵۰ صفحه و بهبود CTR نتایج جستجو برای رشد ارگانیک', date: 'آبان ۱۴۰۲' },
  { title: 'سرپرست سئو — پارتوکا', desc: 'استراتژی SEO شش سایت و +۸۰ محتوا؛ زیرساخت رشد ارگانیک مقیاس‌پذیر', date: 'مرداد ۱۴۰۰' },
  { title: 'طراحی سایت فضانورد', desc: 'راه‌اندازی fazanavard.app؛ زیرساخت اولیه محصول برای توسعه آتی', date: 'آبان ۱۴۰۳' }
];

export const EDUCATION_AND_COURSES = {
  education: [
    { title: 'دیپلم IT — امنیت اطلاعات', institute: 'خوارزمی غیرانتفاعی', year: '۱۳۹۷', grade: 'معدل ۱۸' }
  ],
  courses: [
    { title: 'سئو حرفه‌ای', provider: 'آکادمی وبسیما', date: 'شهریور ۱۳۹۹' },
    { title: 'پرفورمنس مارکتینگ', provider: 'آنالیتیپس', date: 'شهریور ۱۴۰۳' },
    { title: 'دوره میداس (CRO)', provider: 'آنالیتیپس', date: 'اردیبهشت ۱۴۰۴' }
  ]
};

export const HOW_I_WORK_STEPS = [
  {
    step: '۰۱',
    title: 'ارزیابی ترکینگ و ممیزی داده‌ها (Audit)',
    desc: 'بررسی سلامت ترکینگ، شناسایی هدررفت بودجه، نقاط افت Funnel و سنجش وضعیت رقبای کلیدی.',
    icon: 'target'
  },
  {
    step: '۰۲',
    title: 'فرضیه‌سازی و نقشه راه A/B تست',
    desc: 'تعریف دقیق KPIها، فرضیه‌سازی حل مشکلات UX و ساخت ساختارهای هوشمند بیدینگ و تبلیغاتی.',
    icon: 'laptop'
  },
  {
    step: '۰۳',
    title: 'اجرای کمپین‌ها و تست‌های ساختاریافته',
    desc: 'راه‌اندازی کمپین‌های آزمایشی، تست A/B صفحات و ارزیابی کیفیت ورودی‌ها با سیستم‌های Scoring.',
    icon: 'rocket'
  },
  {
    step: '۰۴',
    title: 'بهینه‌سازی مستمر و اسکیل نتایج',
    desc: 'تکرار و گسترش موفقیت‌ها، اسکیل بودجه کانال‌های با بازدهی بالا و ارائه گزارش‌های داده‌محور و شفاف.',
    icon: 'chart'
  }
];
