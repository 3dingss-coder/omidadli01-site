import React, { createContext, useContext, useState, useEffect } from 'react';
import * as initialData from '../data/content';

import { 
  CustomPage, 
  MediaItem, 
  PageSeoConfig, 
  GlobalSeoConfig, 
  NavigationMenuItem, 
  PageSectionItem, 
  VersionSnapshot, 
  AuditLogEntry, 
  ThemeConfig,
  BlogComment
} from '../types';

const LOCAL_STORAGE_KEY = 'OMID_ADLI_SITE_CONTENT_V3';
const LOCAL_STORAGE_PIN_KEY = 'OMID_ADLI_ADMIN_PIN_CODE';
const DEFAULT_PIN = '1234';

// --- Server sync (Cloudflare D1 via Worker API) ---
// localStorage stays as an instant local cache; the API call is fire-and-forget
// so the UI never blocks/waits on the network for a save to *feel* instant.
let syncTimer: ReturnType<typeof setTimeout> | null = null;
function persistContent(value: any) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save content to localStorage', e);
  }
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('OMID_ADLI_SESSION_TOKEN')
          ? { Authorization: 'Bearer ' + localStorage.getItem('OMID_ADLI_SESSION_TOKEN') }
          : {}),
      },
      body: JSON.stringify(value),
    }).catch((e) => console.error('Failed to sync content to server', e));
  }, 500);
}


export const defaultGlobalSeo: GlobalSeoConfig = {
  siteTitle: 'امید عدلی | مشاور و مجری پرفورمنس مارکتینگ و CRO',
  titleTemplate: '%s | امید عدلی',
  defaultMetaDesc: 'خدمات تخصصی پرفورمنس مارکتینگ، بهینه‌سازی نرخ تبدیل (CRO)، کمپین‌های گوگل ادز و آنالیز پیشرفته رفتار کاربر.',
  defaultKeywords: 'پرفورمنس مارکتینگ, CRO, دیجیتال مارکتینگ, گوگل ادز, امید عدلی, بهینه‌سازی نرخ تبدیل',
  faviconUrl: '/favicon.ico',
  ogImage: '/profile-photo-web.jpg',
  canonicalBaseUrl: 'https://omidadli01.site',
  robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://omidadli01.site/sitemap.xml',
};

export const defaultNavigationMenu: NavigationMenuItem[] = [
  { id: 'nav-1', label: 'صفحه اصلی', pageSlug: 'home', order: 1, isHidden: false },
  { id: 'nav-2', label: 'خدمات تخصصی', pageSlug: 'services', order: 2, isHidden: false },
  { id: 'nav-3', label: 'نمونه‌کارها', pageSlug: 'portfolio', order: 3, isHidden: false },
  { id: 'nav-4', label: 'درباره من', pageSlug: 'about', order: 4, isHidden: false },
  { id: 'nav-6', label: 'پروژه‌ها', pageSlug: 'projects', order: 5, isHidden: false },
  { id: 'nav-7', label: 'آموزش', pageSlug: 'blog', order: 6, isHidden: false },
  { id: 'nav-8', label: 'محصولات', pageSlug: 'products', order: 7, isHidden: false },
  { id: 'nav-9', label: 'تماس', pageSlug: 'contact', order: 8, isHidden: false },
];

export const defaultPageSections: Record<string, PageSectionItem[]> = {
  home: [
    { id: 'sec-hero', name: 'HERO', label: 'بنر اصلی (Hero)', isHidden: false },
    { id: 'sec-path-nav', name: 'PATH_NAV', label: 'مسیریابی سه‌گانه (الان کجای مسیره؟)', isHidden: false },
    { id: 'sec-stats', name: 'STATS', label: 'آمار و شاخص‌های کلیدی (Stats / Proof)', isHidden: false },
    { id: 'sec-services', name: 'SERVICES_TABS', label: 'خدمات سه‌مرحله‌ای (تب‌بندی شده)', isHidden: false },
    { id: 'sec-case-studies', name: 'CASE_STUDIES', label: 'نمونه‌کارها و کیس‌استادی‌ها', isHidden: false },
    { id: 'sec-how-i-work', name: 'HOW_I_WORK', label: 'فرآیند همکاری (How I Work)', isHidden: false },
    { id: 'sec-why-omid', name: 'WHY_OMID', label: 'چرا با من کار کنید؟ (Why Omid)', isHidden: false },
    { id: 'sec-experience', name: 'EXPERIENCE', label: 'تجربه و سوابق کاری', isHidden: false },
    { id: 'sec-final-cta', name: 'FINAL_CTA', label: 'فراخوان نهایی اقدام', isHidden: false },
  ],
  services: [
    { id: 'sec-srv-header', name: 'HEADER', label: 'سربرگ خدمات', isHidden: false },
    { id: 'sec-srv-grid', name: 'SERVICES_GRID', label: 'لیست کامل خدمات', isHidden: false },
    { id: 'sec-srv-roas', name: 'ROAS_CALCULATOR', label: 'ماشین‌حساب ROAS', isHidden: false },
    { id: 'sec-srv-[#how-it-works]', name: 'HOW_IT_WORKS', label: 'مراحل کاری ۴ گانه', isHidden: false },
  ],
  portfolio: [
    { id: 'sec-port-header', name: 'HEADER', label: 'سربرگ نمونه‌کارها', isHidden: false },
    { id: 'sec-port-grid', name: 'PORTFOLIO_GRID', label: 'شبکه نمونه‌کارها', isHidden: false },
  ],
  about: [
    { id: 'sec-abt-bio', name: 'BIO', label: 'بیوگرافی و معرفی', isHidden: false },
    { id: 'sec-abt-skills', name: 'SKILLS', label: 'مهارت‌ها و ابزارها', isHidden: false },
    { id: 'sec-abt-timeline', name: 'TIMELINE', label: 'سوابق کاری', isHidden: false },
  ],
  blog: [
    { id: 'sec-blg-grid', name: 'BLOG_GRID', label: 'لیست مقالات', isHidden: false },
  ],
  contact: [
    { id: 'sec-cnt-form', name: 'CONTACT_FORM', label: 'فرم تماس و راه‌های ارتباطی', isHidden: false },
    { id: 'sec-cnt-cal', name: 'CALENDAR', label: 'تقویم رزرو زمان جلسه', isHidden: false },
  ],
  projects: [
    { id: 'sec-prj-list', name: 'PROJECTS_LIST', label: 'لیست پروژه‌ها', isHidden: false },
  ],
  products: [
    { id: 'sec-prd-grid', name: 'PRODUCTS_GRID', label: 'لیست دوره‌ها و محصولات', isHidden: false },
  ]
};

export const defaultMediaLibrary: MediaItem[] = [
  {
    id: 'media-1',
    url: (initialData.PERSONAL_INFO as any).avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    title: 'تصویر پروفایل امید عدلی',
    sizeKb: 145,
    dimensions: '600x600',
    createdAt: '1404/01/01',
    tags: ['پروفایل', 'امید عدلی', 'آواتار']
  },
  {
    id: 'media-2',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    title: 'نمودار پرفورمنس مارکتینگ',
    sizeKb: 210,
    dimensions: '800x533',
    createdAt: '1404/01/05',
    tags: ['مارکتینگ', 'آنالیز', 'داشبورد']
  },
  {
    id: 'media-3',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    title: 'داشبورد گوگل آنالیتیکس و داده‌ها',
    sizeKb: 280,
    dimensions: '800x533',
    createdAt: '1404/01/10',
    tags: ['داده', 'آنالیتیکس', 'رشد']
  }
];

export interface ContentState {
  PERSONAL_INFO: typeof initialData.PERSONAL_INFO;
  SERVICES: typeof initialData.SERVICES;
  CASE_STUDIES: typeof initialData.CASE_STUDIES;
  STATS: typeof initialData.STATS;
  TESTIMONIALS: typeof initialData.TESTIMONIALS;
  BLOG_POSTS: typeof initialData.BLOG_POSTS;
  BLOG_COMMENTS: BlogComment[];
  PRODUCTS: typeof initialData.PRODUCTS;
  PRODUCTS_PAGE_DATA: typeof initialData.PRODUCTS_PAGE_DATA;
  PROJECTS_PAGE_DATA: typeof initialData.PROJECTS_PAGE_DATA;
  BLOG_PAGE_DATA: typeof initialData.BLOG_PAGE_DATA;
  ONGOING_PROJECTS: typeof initialData.ONGOING_PROJECTS;
  BUSINESS_ANALYSIS_DATA: typeof initialData.BUSINESS_ANALYSIS_DATA;
  SKILLS_TOOLS: typeof initialData.SKILLS_TOOLS;
  ALL_SKILLS_LIST: typeof initialData.ALL_SKILLS_LIST;
  TIMELINE: typeof initialData.TIMELINE;
  OTHER_COLLABORATIONS: typeof initialData.OTHER_COLLABORATIONS;
  SELECT_PROJECTS: typeof initialData.SELECT_PROJECTS;
  EDUCATION_AND_COURSES: typeof initialData.EDUCATION_AND_COURSES;
  HOW_I_WORK_STEPS: typeof initialData.HOW_I_WORK_STEPS;
  HOMEPAGE_HOW_I_WORK_STEPS: typeof initialData.HOMEPAGE_HOW_I_WORK_STEPS;
  WHY_OMID_POINTS: typeof initialData.WHY_OMID_POINTS;
  CUSTOM_PAGES: CustomPage[];
  GLOBAL_SEO: GlobalSeoConfig;
  PAGE_SEO: Record<string, PageSeoConfig>;
  NAVIGATION_MENU: NavigationMenuItem[];
  PAGE_SECTIONS: Record<string, PageSectionItem[]>;
  MEDIA_LIBRARY: MediaItem[];
  VERSION_HISTORY: VersionSnapshot[];
  AUDIT_LOGS: AuditLogEntry[];
  THEME_CONFIG: ThemeConfig;
  [key: string]: any;
}

const defaultContentState: ContentState = {
  PERSONAL_INFO: initialData.PERSONAL_INFO,
  SERVICES: initialData.SERVICES,
  CASE_STUDIES: initialData.CASE_STUDIES,
  STATS: initialData.STATS,
  TESTIMONIALS: initialData.TESTIMONIALS,
  BLOG_POSTS: initialData.BLOG_POSTS,
  BLOG_COMMENTS: initialData.INITIAL_BLOG_COMMENTS || [],
  PRODUCTS: initialData.PRODUCTS,
  PRODUCTS_PAGE_DATA: initialData.PRODUCTS_PAGE_DATA,
  PROJECTS_PAGE_DATA: initialData.PROJECTS_PAGE_DATA,
  BLOG_PAGE_DATA: initialData.BLOG_PAGE_DATA,
  ONGOING_PROJECTS: initialData.ONGOING_PROJECTS,
  BUSINESS_ANALYSIS_DATA: initialData.BUSINESS_ANALYSIS_DATA,
  SKILLS_TOOLS: initialData.SKILLS_TOOLS,
  ALL_SKILLS_LIST: initialData.ALL_SKILLS_LIST,
  TIMELINE: initialData.TIMELINE,
  OTHER_COLLABORATIONS: initialData.OTHER_COLLABORATIONS,
  SELECT_PROJECTS: initialData.SELECT_PROJECTS,
  EDUCATION_AND_COURSES: initialData.EDUCATION_AND_COURSES,
  HOW_I_WORK_STEPS: initialData.HOW_I_WORK_STEPS,
  HOMEPAGE_HOW_I_WORK_STEPS: initialData.HOMEPAGE_HOW_I_WORK_STEPS,
  WHY_OMID_POINTS: initialData.WHY_OMID_POINTS,
  CUSTOM_PAGES: [],
  GLOBAL_SEO: defaultGlobalSeo,
  PAGE_SEO: {},
  NAVIGATION_MENU: defaultNavigationMenu,
  PAGE_SECTIONS: defaultPageSections,
  MEDIA_LIBRARY: defaultMediaLibrary,
  VERSION_HISTORY: [
    {
      id: 'snap-initial',
      timestamp: new Date().toLocaleString('fa-IR'),
      label: 'نسخه اولیه (پیش‌فرض سیستم)',
      data: initialData
    }
  ],
  AUDIT_LOGS: [
    {
      id: 'log-1',
      timestamp: new Date().toLocaleString('fa-IR'),
      action: 'راه‌اندازی سیستم CMS',
      details: 'سیستم با تمام داده‌های اولیه با موفقیت لود گردید.',
      user: 'ادمین'
    }
  ],
  THEME_CONFIG: {
    accentColor: '#8b5cf6',
    secondaryColor: '#5ce1e6',
    fontScale: 1
  }
};

// Helper for deep property getter/setter by dot path (e.g. 'PERSONAL_INFO.name' or 'SERVICES.0.title')
export function getByPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => {
    if (acc === undefined || acc === null) return undefined;
    return acc[part];
  }, obj);
}

export function setByPath(obj: any, path: string, value: any): any {
  const parts = path.split('.');
  const newObj = JSON.parse(JSON.stringify(obj));
  let current = newObj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) {
      current[part] = isNaN(Number(parts[i + 1])) ? {} : [];
    }
    current = current[part];
  }

  current[parts[parts.length - 1]] = value;
  return newObj;
}

interface ContentContextType {
  data: ContentState;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  pinCode: string;
  changePin: (newPin: string) => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  updateField: (path: string, newValue: any) => void;
  addItem: (arrayPath: string, templateItem?: any) => void;
  removeItem: (arrayPath: string, index: number) => void;
  moveItem: (arrayPath: string, fromIndex: number, toIndex: number) => void;
  resetToDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonStr: string) => boolean;
  activeEditModal: EditModalConfig | null;
  openEditModal: (config: EditModalConfig) => void;
  closeEditModal: () => void;
  hasUnsavedChanges: boolean;
  saveChanges: () => void;
  duplicateItem: (arrayPath: string, index: number) => void;
  duplicateSection: (pageKey: string, sectionId: string) => void;
  duplicatePage: (pageSlug: string) => void;
  updateSectionStyle: (pageKey: string, sectionId: string, styleProps: any) => void;
  // New CMS Functions
  createSnapshot: (label?: string) => void;
  rollbackSnapshot: (snapshotId: string) => void;
  deleteSnapshot: (snapshotId: string) => void;
  addMediaItem: (itemOrUrl: string | { url: string; title?: string; alt?: string; sizeKb?: number; dimensions?: string; tags?: string[] }, title?: string, sizeKb?: number, dimensions?: string, tags?: string[]) => void;
  removeMediaItem: (id: string) => void;
  logActivity: (action: string, details?: string) => void;
  toggleSectionVisibility: (pageKey: string, sectionId: string) => void;
  reorderPageSection: (pageKey: string, fromIndex: number, toIndex: number) => void;
  addPageSection: (pageKey: string, name: string, label: string) => void;
  removePageSection: (pageKey: string, sectionId: string) => void;
  updatePageSeo: (pageKey: string, seo: Partial<PageSeoConfig>) => void;
  updateGlobalSeo: (seo: Partial<GlobalSeoConfig>) => void;
  updateNavMenu: (menu: NavigationMenuItem[]) => void;
  generateSitemapXml: () => string;
  generateRobotsTxt: () => string;
  addBlogComment: (comment: { postId: string; authorName: string; authorEmail: string; content: string }) => void;
  toggleCommentApproval: (commentId: string) => void;
  deleteBlogComment: (commentId: string) => void;
  replyBlogComment: (commentId: string, reply: string) => void;
}

export interface EditModalConfig {
  type: 'text' | 'image' | 'icon' | 'button' | 'repeater';
  path: string;
  label: string;
  value?: any;
  extraProps?: any;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Merge any raw content object (from localStorage or from the server) over the
// defaults, so a partial/older-shaped object never leaves required fields
// missing (which is what was crashing pages like "About" with a blank screen).
function mergeWithDefaults(parsed: any): ContentState {
  if (parsed && parsed.PERSONAL_INFO) {
    if (!parsed.PERSONAL_INFO.title || parsed.PERSONAL_INFO.title !== initialData.PERSONAL_INFO.title) {
      parsed.PERSONAL_INFO.title = initialData.PERSONAL_INFO.title;
    }
    if (!parsed.PERSONAL_INFO.avatar || parsed.PERSONAL_INFO.avatar.includes('unsplash')) {
      parsed.PERSONAL_INFO.avatar = initialData.PERSONAL_INFO.avatar;
    }
  }
  return {
    ...defaultContentState,
    ...parsed,
    SERVICES: (parsed && parsed.SERVICES) || initialData.SERVICES,
    STATS: (parsed && parsed.STATS) || initialData.STATS,
    TIMELINE: (parsed && parsed.TIMELINE) || initialData.TIMELINE,
    HOW_I_WORK_STEPS: (parsed && parsed.HOW_I_WORK_STEPS) || initialData.HOW_I_WORK_STEPS,
    PROJECTS_PAGE_DATA: { ...initialData.PROJECTS_PAGE_DATA, ...((parsed && parsed.PROJECTS_PAGE_DATA) || {}) },
    BLOG_PAGE_DATA: { ...initialData.BLOG_PAGE_DATA, ...((parsed && parsed.BLOG_PAGE_DATA) || {}) },
    BLOG_POSTS: (parsed && parsed.BLOG_POSTS) || initialData.BLOG_POSTS,
    ONGOING_PROJECTS: (parsed && parsed.ONGOING_PROJECTS) || initialData.ONGOING_PROJECTS,
    PERSONAL_INFO: { ...defaultContentState.PERSONAL_INFO, ...((parsed && parsed.PERSONAL_INFO) || {}) },
    GLOBAL_SEO: { ...defaultGlobalSeo, ...(parsed && parsed.GLOBAL_SEO) },
    NAVIGATION_MENU: ((parsed && parsed.NAVIGATION_MENU) || defaultNavigationMenu).filter(
      (item: NavigationMenuItem) => item.pageSlug !== 'business-analysis'
    ),
    PAGE_SECTIONS: { ...defaultPageSections, ...(parsed && parsed.PAGE_SECTIONS) },
    MEDIA_LIBRARY: (parsed && parsed.MEDIA_LIBRARY) || defaultMediaLibrary,
  };
}

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ContentState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return mergeWithDefaults(parsed);
      }
    } catch (e) {
      console.error('Failed to load content from localStorage', e);
    }
    return defaultContentState;
  });

  // On mount, pull the latest content from the server (D1 via the Worker API).
  // The server is the source of truth; localStorage above is just an instant
  // first paint so the page never flashes empty while the network call resolves.
  useEffect(() => {
    fetch('/api/content')
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((server) => {
        if (server && typeof server === 'object' && Object.keys(server).length > 0) {
          try {
            const merged = mergeWithDefaults(server);
            setData(merged);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
          } catch (e) {
            console.error('Failed to merge server content, keeping local copy', e);
          }
        }
      })
      .catch((e) => console.error('Failed to fetch content from server, using local copy', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('OMID_ADLI_ADMIN_ACTIVE') === 'true';
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [activeEditModal, setActiveEditModal] = useState<EditModalConfig | null>(null);

  // Sync admin state to localStorage
  useEffect(() => {
    localStorage.setItem('OMID_ADLI_ADMIN_ACTIVE', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // Activity logger helper
  const logActivity = (action: string, details?: string) => {
    const newEntry: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleString('fa-IR'),
      action,
      details: details || '',
      user: 'ادمین'
    };
    setData((prev) => {
      const updatedLogs = [newEntry, ...(prev.AUDIT_LOGS || [])].slice(0, 50);
      const updated = { ...prev, AUDIT_LOGS: updatedLogs };
      persistContent(updated);
      return updated;
    });
  };

  // Save changes to localStorage
  const saveChanges = () => {
    try {
      persistContent(data);
      setHasUnsavedChanges(false);
      logActivity('ذخیره تغییرات', 'تغییرات محتوا در مرورگر ذخیره شد.');
    } catch (e) {
      console.error('Failed to save content to localStorage', e);
    }
  };

  // Update specific field by dot path
  const updateField = (path: string, newValue: any) => {
    setData((prev) => {
      const updated = setByPath(prev, path, newValue);
      persistContent(updated);
      return updated;
    });
    setHasUnsavedChanges(false);
    logActivity('ویرایش فیلد', `فیلد ${path} به‌روزرسانی شد.`);
  };

  // Add item to array
  const addItem = (arrayPath: string, templateItem?: any) => {
    setData((prev) => {
      const currentArray = getByPath(prev, arrayPath) || [];
      const defaultItem = templateItem || createDefaultItemForPath(arrayPath);
      const updatedArray = [defaultItem, ...currentArray];
      const updated = setByPath(prev, arrayPath, updatedArray);
      persistContent(updated);
      return updated;
    });
    logActivity('افزودن آیتم جدید', `آیتم به بخش ${arrayPath} اضافه شد.`);
  };

  // Remove item from array
  const removeItem = (arrayPath: string, index: number) => {
    setData((prev) => {
      const currentArray = getByPath(prev, arrayPath) || [];
      const updatedArray = currentArray.filter((_: any, i: number) => i !== index);
      const updated = setByPath(prev, arrayPath, updatedArray);
      persistContent(updated);
      return updated;
    });
    logActivity('حذف آیتم', `آیتم شماره ${index + 1} از بخش ${arrayPath} حذف گردید.`);
  };

  // Move item in array (reorder)
  const moveItem = (arrayPath: string, fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const currentArray = [...(getByPath(prev, arrayPath) || [])];
      if (fromIndex < 0 || fromIndex >= currentArray.length || toIndex < 0 || toIndex >= currentArray.length) {
        return prev;
      }
      const [moved] = currentArray.splice(fromIndex, 1);
      currentArray.splice(toIndex, 0, moved);
      const updated = setByPath(prev, arrayPath, currentArray);
      persistContent(updated);
      return updated;
    });
    logActivity('تغییر ترتیب', `ترتیب آیتم‌ها در ${arrayPath} جابجا شد.`);
  };

  const resetToDefaults = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setData(defaultContentState);
    setHasUnsavedChanges(false);
    logActivity('بازنشانی کل سایت', 'تمام داده‌های سایت به حالت پیش‌فرض اولیه بازگشت.');
  };

  const [pinCode, setPinCode] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_PIN_KEY) || DEFAULT_PIN;
  });

  const changePin = (newPin: string) => {
    setPinCode(newPin);
    localStorage.setItem(LOCAL_STORAGE_PIN_KEY, newPin);
    // Update the pin on the server (D1 admin_auth) too, so login works from any device/browser.
    const token = localStorage.getItem('OMID_ADLI_SESSION_TOKEN');
    fetch('/api/auth/set-pin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: 'Bearer ' + token } : {}),
      },
      body: JSON.stringify({ pin: newPin }),
    }).catch((e) => console.error('Failed to sync new pin to server', e));
    logActivity('تغییر پین‌کد ادمین', 'رمز عبور ورود به پیشخوان مدیریت بروزرسانی شد.');
  };

  const loginAdmin = (pin: string) => {
    // Try the server first (D1 admin_auth) so login works from any device;
    // fall back to the local pin so the panel still works if the API/D1 is unreachable.
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((result) => {
        if (result && result.token) {
          localStorage.setItem('OMID_ADLI_SESSION_TOKEN', result.token);
        }
      })
      .catch((e) => console.error('Server login failed, using local pin only', e));

    if (pin === pinCode) {
      setIsAdmin(true);
      logActivity('ورود موفق', 'کاربر ادمین وارد پیشخوان شد.');
      return true;
    }
    logActivity('ورود ناموفق', 'تلاش برای ورود با رمز اشتباه.');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('OMID_ADLI_SESSION_TOKEN');
    logActivity('خروج از سیستم', 'کاربر ادمین از سیستم خارج گردید.');
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omid-adli-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    logActivity('خروجی گرفتن بکاپ', 'فایل JSON کامل محتوا و تنظیمات دانلود شد.');
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const merged = { ...defaultContentState, ...parsed };
        setData(merged);
        persistContent(merged);
        setHasUnsavedChanges(false);
        logActivity('بازیابی بکاپ JSON', 'محتوا و تنظیمات از فایل بکاپ خارجی وارد گردید.');
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file', e);
    }
    return false;
  };

  const duplicateItem = (arrayPath: string, index: number) => {
    setData((prev) => {
      const currentArray = [...(getByPath(prev, arrayPath) || [])];
      if (index < 0 || index >= currentArray.length) return prev;
      const original = currentArray[index];
      const cloned = JSON.parse(JSON.stringify(original));
      cloned.id = 'dup-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      if (cloned.title) cloned.title = `${cloned.title} (کپی)`;
      else if (cloned.name) cloned.name = `${cloned.name} (کپی)`;
      else if (cloned.label) cloned.label = `${cloned.label} (کپی)`;
      
      currentArray.splice(index + 1, 0, cloned);
      const updated = setByPath(prev, arrayPath, currentArray);
      persistContent(updated);
      return updated;
    });
    logActivity('شبیه‌سازی آیتم', `آیتم شماره ${index + 1} از ${arrayPath} تکثیر شد.`);
  };

  const duplicateSection = (pageKey: string, sectionId: string) => {
    setData((prev) => {
      const currentSections = prev.PAGE_SECTIONS[pageKey] || defaultPageSections[pageKey] || [];
      const section = currentSections.find((s) => s.id === sectionId);
      if (!section) return prev;
      
      const newSec: PageSectionItem = {
        ...JSON.parse(JSON.stringify(section)),
        id: 'sec-' + Date.now(),
        name: section.name + '_COPY',
        label: `${section.label} (کپی)`
      };
      const updatedSections = [...currentSections, newSec];
      const updated = {
        ...prev,
        PAGE_SECTIONS: { ...prev.PAGE_SECTIONS, [pageKey]: updatedSections }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('شبیه‌سازی سکشن', `سکشن ${sectionId} در برگه ${pageKey} کپی شد.`);
  };

  const duplicatePage = (pageSlug: string) => {
    setData((prev) => {
      const navItem = prev.NAVIGATION_MENU.find(n => n.pageSlug === pageSlug);
      const customPage = prev.CUSTOM_PAGES.find(c => c.slug === pageSlug);
      const newSlug = `${pageSlug}-copy-${Date.now().toString().slice(-4)}`;
      const newTitle = `${navItem?.label || customPage?.title || pageSlug} (کپی)`;

      const newNavItem: NavigationMenuItem = {
        id: 'nav-' + Date.now(),
        label: newTitle,
        pageSlug: newSlug,
        order: prev.NAVIGATION_MENU.length + 1,
        isHidden: false
      };

      const pageSections = prev.PAGE_SECTIONS[pageSlug] ? JSON.parse(JSON.stringify(prev.PAGE_SECTIONS[pageSlug])) : [];

      const updated = {
        ...prev,
        NAVIGATION_MENU: [...prev.NAVIGATION_MENU, newNavItem],
        PAGE_SECTIONS: { ...prev.PAGE_SECTIONS, [newSlug]: pageSections }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('شبیه‌سازی برگه', `برگه ${pageSlug} با موفقیت شبیه‌سازی شد.`);
  };

  const updateSectionStyle = (pageKey: string, sectionId: string, styleProps: any) => {
    setData((prev) => {
      const currentSections = prev.PAGE_SECTIONS[pageKey] || defaultPageSections[pageKey] || [];
      const updatedSections = currentSections.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            style: {
              ...(sec.style || {}),
              ...styleProps
            }
          };
        }
        return sec;
      });
      const updated = {
        ...prev,
        PAGE_SECTIONS: { ...prev.PAGE_SECTIONS, [pageKey]: updatedSections }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('تغییر استایل سکشن', `استایل و چیدمان سکشن ${sectionId} به‌روزرسانی گردید.`);
  };

  const createSnapshot = (label?: string) => {
    const snapshotLabel = label || `بکاپ اتوماتیک - ${new Date().toLocaleTimeString('fa-IR')}`;
    const newSnap: VersionSnapshot = {
      id: 'snap-' + Date.now(),
      timestamp: new Date().toLocaleString('fa-IR'),
      label: snapshotLabel,
      data: JSON.parse(JSON.stringify(data))
    };
    setData((prev) => {
      const history = [newSnap, ...(prev.VERSION_HISTORY || [])].slice(0, 20); // Keep last 20 snapshots
      const updated = { ...prev, VERSION_HISTORY: history };
      persistContent(updated);
      return updated;
    });
    logActivity('ایجاد نقطه بازگشت', `نسخه پشتیبان "${snapshotLabel}" ایجاد شد.`);
  };

  const rollbackSnapshot = (snapshotId: string) => {
    const snap = data.VERSION_HISTORY?.find((s) => s.id === snapshotId);
    if (snap && snap.data) {
      setData((prev) => {
        const restored = { ...snap.data, VERSION_HISTORY: prev.VERSION_HISTORY };
        persistContent(restored);
        return restored;
      });
      logActivity('بازگردانی به نسخه قبل', `اطلاعات سایت به نسخه "${snap.label}" بازگردانده شد.`);
    }
  };

  const deleteSnapshot = (snapshotId: string) => {
    setData((prev) => {
      const filtered = (prev.VERSION_HISTORY || []).filter((s) => s.id !== snapshotId);
      const updated = { ...prev, VERSION_HISTORY: filtered };
      persistContent(updated);
      return updated;
    });
  };

  const addMediaItem = (itemOrUrl: string | { url: string; title?: string; alt?: string; sizeKb?: number; dimensions?: string; tags?: string[] }, title?: string, sizeKb?: number, dimensions?: string, tags?: string[]) => {
    let newItem: MediaItem;
    if (typeof itemOrUrl === 'object') {
      newItem = {
        id: 'media-' + Date.now(),
        url: itemOrUrl.url,
        title: itemOrUrl.title || 'تصویر آپلود شده',
        alt: itemOrUrl.alt || itemOrUrl.title || 'تصویر',
        sizeKb: itemOrUrl.sizeKb || Math.round(itemOrUrl.url.length / 1024),
        dimensions: itemOrUrl.dimensions || 'نامشخص',
        createdAt: new Date().toLocaleDateString('fa-IR'),
        tags: itemOrUrl.tags || ['آپلود شده']
      };
    } else {
      newItem = {
        id: 'media-' + Date.now(),
        url: itemOrUrl,
        title: title || 'تصویر آپلود شده',
        alt: title || 'تصویر',
        sizeKb: sizeKb || Math.round(itemOrUrl.length / 1024),
        dimensions: dimensions || 'نامشخص',
        createdAt: new Date().toLocaleDateString('fa-IR'),
        tags: tags || ['آپلود شده']
      };
    }
    setData((prev) => {
      const updatedMedia = [newItem, ...(prev.MEDIA_LIBRARY || [])];
      const updated = { ...prev, MEDIA_LIBRARY: updatedMedia };
      persistContent(updated);
      return updated;
    });
    logActivity('افزودن تصویر به رسانه', `تصویر "${newItem.title}" به کتابخانه اضافه شد.`);
  };

  const removeMediaItem = (id: string) => {
    setData((prev) => {
      const updatedMedia = (prev.MEDIA_LIBRARY || []).filter((m) => m.id !== id);
      const updated = { ...prev, MEDIA_LIBRARY: updatedMedia };
      persistContent(updated);
      return updated;
    });
    logActivity('حذف تصویر از رسانه', 'تصویر از کتابخانه رسانه حذف شد.');
  };

  const toggleSectionVisibility = (pageKey: string, sectionId: string) => {
    setData((prev) => {
      const currentSections = prev.PAGE_SECTIONS[pageKey] || defaultPageSections[pageKey] || [];
      const updatedSections = currentSections.map((sec) => 
        sec.id === sectionId ? { ...sec, isHidden: !sec.isHidden } : sec
      );
      const updated = {
        ...prev,
        PAGE_SECTIONS: { ...prev.PAGE_SECTIONS, [pageKey]: updatedSections }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('تغییر نمایش سکشن', `وضعیت نمایش سکشن ${sectionId} در برگه ${pageKey} تغییر کرد.`);
  };

  const reorderPageSection = (pageKey: string, fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const currentSections = [...(prev.PAGE_SECTIONS[pageKey] || defaultPageSections[pageKey] || [])];
      if (fromIndex < 0 || fromIndex >= currentSections.length || toIndex < 0 || toIndex >= currentSections.length) {
        return prev;
      }
      const [moved] = currentSections.splice(fromIndex, 1);
      currentSections.splice(toIndex, 0, moved);
      const updated = {
        ...prev,
        PAGE_SECTIONS: { ...prev.PAGE_SECTIONS, [pageKey]: currentSections }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('تغییر ترتیب سکشن‌ها', `ترتیب سکشن‌های برگه ${pageKey} بروزرسانی شد.`);
  };

  const addPageSection = (pageKey: string, name: string, label: string) => {
    const newSection: PageSectionItem = {
      id: 'sec-' + Date.now(),
      name: name.toUpperCase().replace(/\s+/g, '_'),
      label: label || name,
      isHidden: false
    };
    setData((prev) => {
      const currentSections = prev.PAGE_SECTIONS[pageKey] || [];
      const updated = {
        ...prev,
        PAGE_SECTIONS: { ...prev.PAGE_SECTIONS, [pageKey]: [...currentSections, newSection] }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('افزودن سکشن به برگه', `سکشن "${label}" به برگه ${pageKey} اضافه شد.`);
  };

  const removePageSection = (pageKey: string, sectionId: string) => {
    setData((prev) => {
      const currentSections = prev.PAGE_SECTIONS[pageKey] || [];
      const updated = {
        ...prev,
        PAGE_SECTIONS: { ...prev.PAGE_SECTIONS, [pageKey]: currentSections.filter((s) => s.id !== sectionId) }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('حذف سکشن از برگه', `سکشن ${sectionId} از برگه ${pageKey} حذف گردید.`);
  };

  const updatePageSeo = (pageKey: string, seo: Partial<PageSeoConfig>) => {
    setData((prev) => {
      const currentSeo = prev.PAGE_SEO[pageKey] || {};
      const updated = {
        ...prev,
        PAGE_SEO: { ...prev.PAGE_SEO, [pageKey]: { ...currentSeo, ...seo } }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('ویرایش سئوی برگه', `تنظیمات سئوی برگه ${pageKey} تغییر کرد.`);
  };

  const updateGlobalSeo = (seo: Partial<GlobalSeoConfig>) => {
    setData((prev) => {
      const updated = {
        ...prev,
        GLOBAL_SEO: { ...prev.GLOBAL_SEO, ...seo }
      };
      persistContent(updated);
      return updated;
    });
    logActivity('ویرایش سئوی عمومی', 'تنظیمات کلی سئوی سایت به‌روزرسانی شد.');
  };

  const updateNavMenu = (menu: NavigationMenuItem[]) => {
    setData((prev) => {
      const updated = { ...prev, NAVIGATION_MENU: menu };
      persistContent(updated);
      return updated;
    });
    logActivity('ویرایش منوی ناوبری', 'آیتم‌ها و لینک‌های منوی بالای سایت به روز شد.');
  };

  const generateSitemapXml = () => {
    const baseUrl = data.GLOBAL_SEO.canonicalBaseUrl || 'https://omidadli01.site';
    const pages = ['/', '/services', '/portfolio', '/about', '/projects', '/blog', '/products', '/contact'];
    
    (data.CUSTOM_PAGES || []).forEach((cp) => {
      pages.push(`/${cp.slug}`);
    });

    const urlsXml = pages
      .map(
        (path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>`;
  };

  const generateRobotsTxt = () => {
    return data.GLOBAL_SEO.robotsTxt || 'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://omidadli01.site/sitemap.xml';
  };

  const addBlogComment = (comment: { postId: string; authorName: string; authorEmail: string; content: string }) => {
    const newComment: BlogComment = {
      id: 'comm-' + Date.now(),
      postId: comment.postId,
      authorName: comment.authorName,
      authorEmail: comment.authorEmail,
      content: comment.content,
      date: 'هم‌اکنون',
      isApproved: true,
      likes: 0
    };
    setData((prev) => {
      const updatedComments = [newComment, ...(prev.BLOG_COMMENTS || [])];
      // update commentsCount in post
      const updatedPosts = prev.BLOG_POSTS.map((p) => {
        if (p.id === comment.postId) {
          return { ...p, commentsCount: (p.commentsCount || 0) + 1 };
        }
        return p;
      });
      const updated = {
        ...prev,
        BLOG_COMMENTS: updatedComments,
        BLOG_POSTS: updatedPosts
      };
      persistContent(updated);
      return updated;
    });
    logActivity('دیدگاه جدید', `دیدگاه جدید توسط ${comment.authorName} برای مقاله ${comment.postId} ثبت شد.`);
  };

  const toggleCommentApproval = (commentId: string) => {
    setData((prev) => {
      const updatedComments = (prev.BLOG_COMMENTS || []).map((c) => {
        if (c.id === commentId) {
          return { ...c, isApproved: !c.isApproved };
        }
        return c;
      });
      const updated = { ...prev, BLOG_COMMENTS: updatedComments };
      persistContent(updated);
      return updated;
    });
  };

  const deleteBlogComment = (commentId: string) => {
    setData((prev) => {
      const updatedComments = (prev.BLOG_COMMENTS || []).filter((c) => c.id !== commentId);
      const updated = { ...prev, BLOG_COMMENTS: updatedComments };
      persistContent(updated);
      return updated;
    });
    logActivity('حذف دیدگاه', `دیدگاه ${commentId} حذف شد.`);
  };

  const replyBlogComment = (commentId: string, reply: string) => {
    setData((prev) => {
      const updatedComments = (prev.BLOG_COMMENTS || []).map((c) => {
        if (c.id === commentId) {
          return { ...c, reply };
        }
        return c;
      });
      const updated = { ...prev, BLOG_COMMENTS: updatedComments };
      persistContent(updated);
      return updated;
    });
    logActivity('پاسخ به دیدگاه', `پاسخ به دیدگاه ${commentId} ثبت شد.`);
  };

  const openEditModal = (config: EditModalConfig) => {
    setActiveEditModal(config);
  };

  const closeEditModal = () => {
    setActiveEditModal(null);
  };

  return (
    <ContentContext.Provider
      value={{
        data,
        isAdmin,
        setIsAdmin,
        pinCode,
        changePin,
        loginAdmin,
        logoutAdmin,
        updateField,
        addItem,
        removeItem,
        moveItem,
        resetToDefaults,
        exportJSON,
        importJSON,
        activeEditModal,
        openEditModal,
        closeEditModal,
        hasUnsavedChanges,
        saveChanges,
        duplicateItem,
        duplicateSection,
        duplicatePage,
        updateSectionStyle,
        createSnapshot,
        rollbackSnapshot,
        deleteSnapshot,
        addMediaItem,
        removeMediaItem,
        logActivity,
        toggleSectionVisibility,
        reorderPageSection,
        addPageSection,
        removePageSection,
        updatePageSeo,
        updateGlobalSeo,
        updateNavMenu,
        generateSitemapXml,
        generateRobotsTxt,
        addBlogComment,
        toggleCommentApproval,
        deleteBlogComment,
        replyBlogComment
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// Default item generator for various list paths
function createDefaultItemForPath(arrayPath: string): any {
  const id = 'item-' + Date.now();
  if (arrayPath.includes('SERVICES')) {
    return {
      id,
      title: 'عنوان خدمت جدید',
      titleEn: 'New Service Title',
      iconName: 'rocket',
      shortDesc: 'توضیحات کوتاه خدمت جدید...',
      fullDesc: 'توضیحات کامل خدمت جدید و ارزش افزوده آن برای مشتری.',
      features: ['ویژگی ۱', 'ویژگی ۲', 'ویژگی ۳'],
      deliverables: ['خروجی ۱', 'خروجی ۲'],
      tags: ['New Tag', 'Performance'],
      packages: [{ title: 'پکیج پایه', price: '۳۰ میلیون تومان', description: 'توضیحات پکیج' }]
    };
  }
  if (arrayPath.includes('CASE_STUDIES')) {
    return {
      id,
      title: 'عنوان کیس‌استادی جدید',
      client: 'مشتری جدید',
      industry: 'Fintech',
      industryFa: 'فین‌تک',
      summary: 'خلاصه نتایج و پروژه‌های انجام‌شده برای برند جدید.',
      thumbnailIcon: 'chart',
      heroColor: '#8b5cf6',
      featured: true,
      metrics: { roas: '+200% ROAS', conversionRate: '+40% Conv', cacReduction: '-25% CPA' },
      metricsComparison: [{ label: 'رشد خروجی', before: 'قبل', after: 'بعد', growth: '+۱۰۰٪' }],
      challenge: 'توصیف چالش اولیه برند...',
      solution: 'راهکار ارائه شده...',
      results: 'نتایج به دست آمده...',
      tags: ['Performance', 'Growth'],
      date: '۱۴۰۴'
    };
  }
  if (arrayPath.includes('STATS')) {
    return {
      value: '+100',
      label: 'عنوان آمار جدید',
      subtext: 'توضیحات کوتاه آمار',
      icon: 'rocket'
    };
  }
  if (arrayPath.includes('TESTIMONIALS')) {
    return {
      id,
      clientName: 'نام مدیر / مشتری',
      clientRole: 'سمت شغلی',
      company: 'نام شرکت',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      quote: 'متن نظر مشتری درباره کیفیت همکاری و نتایج حاصل‌شده...',
      metricHighlight: 'هایلایت نتیجه'
    };
  }
  if (arrayPath.includes('BLOG_POSTS')) {
    return {
      id,
      title: 'عنوان مقاله جدید',
      excerpt: 'خلاصه کوتاه مقاله برای نمایش در کارت و صفحه اصلی وبلاگ...',
      content: 'متن کامل مقاله جدید که شامل توضیحات تخصصی، راهکارهای عملی و توصیه‌های تجربی است...',
      category: 'Performance',
      categoryFa: 'پرفورمنس مارکتینگ',
      pathCategory: 'sell',
      date: '۱۴۰۴',
      updatedAt: '۱۴۰۴',
      readTime: '۵ دقیقه مطالعه',
      author: 'امید عدلی',
      authorRole: 'استراتژیست رشد و دیجیتال مارکتینگ',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      imageIcon: 'rocket',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      isPopular: false,
      tableOfContents: [
        { id: 'sec-1', title: '۱. بخش اول و مقدمه' },
        { id: 'sec-2', title: '۲. راهکارها و اصول اجرایی' }
      ],
      sections: [
        {
          id: 'sec-1',
          heading: '۱. بخش اول و مقدمه',
          content: 'در این بخش به بررسی مفاهیم اساسی و دلایل اهمیت این موضوع پرداخته می‌شود.',
          callout: 'نکته کلیدی: همواره قبل از اجرا، پیش‌نیازها و شاخص‌های کلیدی عملکرد را تعریف کنید.'
        },
        {
          id: 'sec-2',
          heading: '۲. راهکارها و اصول اجرایی',
          content: 'گام‌های عملی برای پیاده‌سازی و دستیابی به بالاترین راندمان ممکن در فروشگاه یا کسب‌وکار.',
          keyPoints: ['اقدام عملی شماره ۱', 'اقدام عملی شماره ۲']
        }
      ],
      tags: ['دیجیتال مارکتینگ', 'فروش', 'رشد'],
      viewsCount: 100,
      commentsCount: 0
    };
  }
  if (arrayPath.includes('PRODUCTS')) {
    return {
      id,
      title: 'عنوان محصول جدید',
      description: 'توضیحات کامل محصول دیجیتال یا دوره...',
      targetAudience: 'مخاطبان هدف',
      iconName: 'target',
      badge: 'جدید',
      actionText: 'دریافت محصول'
    };
  }
  if (arrayPath.includes('TIMELINE')) {
    return {
      year: '۱۴۰۴',
      title: 'عنوان سابقه / دستاورد',
      company: 'نام شرکت / مجموعه',
      description: 'توضیحات فعالیت‌ها و مسئولیت‌ها...',
      achievement: 'دستاورد کلیدی'
    };
  }
  if (arrayPath.includes('SKILLS_TOOLS')) {
    return {
      name: 'ابزار جدید',
      category: 'Analytics',
      icon: 'code',
      proficiency: 90
    };
  }
  return { id, title: 'آیتم جدید', description: 'توضیحات آیتم جدید' };
}

