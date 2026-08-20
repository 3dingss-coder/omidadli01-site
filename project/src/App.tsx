import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Theme, Page, CaseStudy } from './types';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundBlobs } from './components/BackgroundBlobs';
import { QuickActionDock } from './components/QuickActionDock';
import { CustomCursor } from './components/CustomCursor';
import { SplashScreen } from './components/SplashScreen';
import { AdminFloatingBar } from './components/cms/AdminFloatingBar';
import { AdminLoginModal } from './components/cms/AdminLoginModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { BusinessAnalysisPage } from './pages/BusinessAnalysisPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProductsPage } from './pages/ProductsPage';
import { AdminPage } from './pages/AdminPage';
import { CustomPageView } from './pages/CustomPageView';

function MainLayout() {
  const [theme] = useState<Theme>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const { isAdmin, setIsAdmin, data } = useContent();
  const customPages = data.CUSTOM_PAGES || [];

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleReplaySplash = useCallback(() => {
    setShowSplash(true);
  }, []);

  // Read initial page & admin trigger from URL hash or pathname on load
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '');
      const pathname = window.location.pathname;

      if (rawHash === 'admin' || pathname === '/admin' || pathname.startsWith('/admin')) {
        setCurrentPage('admin');
        return;
      }
      const validPages: Page[] = [
        'home', 'services', 'portfolio', 'about', 'blog', 'contact', 
        'business-analysis', 'projects', 'products', 'admin'
      ];
      if (validPages.includes(rawHash as Page)) {
        setCurrentPage(rawHash as Page);
      } else if (!rawHash) {
        setCurrentPage('home');
      } else if (customPages.some((cp) => cp.slug === rawHash)) {
        setCurrentPage(rawHash as Page);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [customPages]);

  // Lock document root to dark class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedCaseStudy(null);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCaseStudy = (study: CaseStudy | null) => {
    setSelectedCaseStudy(study);
    if (study && currentPage !== 'portfolio') {
      setCurrentPage('portfolio');
      window.location.hash = 'portfolio';
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col transition-colors duration-500 font-['Vazirmatn',sans-serif] bg-[#0a0624] text-[#eae6ff] overflow-x-hidden">
      {/* Animated Motion Graphic Preloader Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Custom Interactive Floating Cursor */}
      <CustomCursor />

      {/* Background Interactive Beam & Grid */}
      <BackgroundBlobs theme="dark" />

      {/* Glassmorphic Navigation Header */}
      <Navbar
        theme="dark"
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onReplaySplash={handleReplaySplash}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Area with Cinematic Motion Page Transitions */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 relative z-10 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentPage === 'home' && (
              <HomePage
                theme={theme}
                onNavigate={handleNavigate}
                onSelectCaseStudy={handleSelectCaseStudy}
              />
            )}

            {currentPage === 'services' && (
              <ServicesPage
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'portfolio' && (
              <PortfolioPage
                theme={theme}
                onNavigate={handleNavigate}
                selectedCaseStudy={selectedCaseStudy}
                onSelectCaseStudy={setSelectedCaseStudy}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'blog' && (
              <BlogPage
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'business-analysis' && (
              <BusinessAnalysisPage
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'projects' && (
              <ProjectsPage
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'products' && (
              <ProductsPage
                theme={theme}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'admin' && (
              <AdminPage
                onNavigate={handleNavigate}
              />
            )}

            {customPages.some((cp) => cp.slug === currentPage) && (
              <CustomPageView
                theme={theme}
                customPage={customPages.find((cp) => cp.slug === currentPage)!}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Admin Floating Toolbar */}
      <AdminFloatingBar />

      {/* Admin PIN Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Bottom Floating Quick Action Dock */}
      <QuickActionDock theme={theme} onNavigate={handleNavigate} />

      {/* Footer */}
      <Footer
        theme={theme}
        onNavigate={handleNavigate}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <MainLayout />
    </ContentProvider>
  );
}



