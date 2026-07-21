import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { Navbar, Sidebar, Footer, BottomNav, BackToTop } from '../../components/layout';
import { WelcomeScreen } from '../../components/common';
import { DetailsModal, FavoritesModal } from '../../components/modals';
import { ToastContainer, Loading } from '../../components/ui';
import type { SectionId, Resource } from '../../types';

const DashboardPage = lazy(() => import('../../features/dashboard').then((m) => ({ default: m.DashboardPage })));
const LearningPage = lazy(() => import('../../features/learning').then((m) => ({ default: m.LearningPage })));
const YoutubePage = lazy(() => import('../../features/youtube').then((m) => ({ default: m.YoutubePage })));
const WorkPage = lazy(() => import('../../features/freelancing').then((m) => ({ default: m.WorkPage })));
const ToolsPage = lazy(() => import('../../features/tools').then((m) => ({ default: m.ToolsPage })));
const TestsPage = lazy(() => import('../../features/tests').then((m) => ({ default: m.TestsPage })));
const AiPage = lazy(() => import('../../features/ai').then((m) => ({ default: m.AiPage })));
const AboutPage = lazy(() => import('../../features/about').then((m) => ({ default: m.AboutPage })));
const DesignPage = lazy(() => import('../../features/design').then((m) => ({ default: m.DesignPage })));
const BusinessPage = lazy(() => import('../../features/business').then((m) => ({ default: m.BusinessPage })));
const ProductivityPage = lazy(() => import('../../features/productivity').then((m) => ({ default: m.ProductivityPage })));
const MarketingPage = lazy(() => import('../../features/marketing').then((m) => ({ default: m.MarketingPage })));
const FreelancingPage = lazy(() => import('../../features/freelancing').then((m) => ({ default: m.FreelancingPage })));
const CommunitiesPage = lazy(() => import('../../features/communities').then((m) => ({ default: m.CommunitiesPage })));
const PodcastsPage = lazy(() => import('../../features/podcasts').then((m) => ({ default: m.PodcastsPage })));
const NewslettersPage = lazy(() => import('../../features/newsletters').then((m) => ({ default: m.NewslettersPage })));
const BooksPage = lazy(() => import('../../features/books').then((m) => ({ default: m.BooksPage })));
const OpenSourcePage = lazy(() => import('../../features/open-source').then((m) => ({ default: m.OpenSourcePage })));
const SettingsPage = lazy(() => import('../../features/settings').then((m) => ({ default: m.SettingsPage })));

export default function AppRouter() {
  const [section, setSection] = useState<SectionId>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

  const handleNavigate = useCallback((s: SectionId) => {
    setSection(s);
    setSearchQuery('');
  }, []);

  const handleDetails = useCallback((resource: Resource) => {
    setSelectedResource(resource);
    setDetailsModalOpen(true);
  }, []);

  const canSearch = useMemo(() => !['dashboard', 'about', 'settings'].includes(section), [section]);
  const effectiveQuery = canSearch ? searchQuery : '';

  if (!welcomeDone) {
    return <WelcomeScreen onStart={() => setWelcomeDone(true)} />;
  }

  return (
    <div className="min-h-screen bg-base transition-colors duration-300">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
      />

      <div className="flex pt-14 md:pt-20">
        <Sidebar
          isOpen={sidebarOpen}
          activeSection={section}
          onClose={() => setSidebarOpen(false)}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 px-4 md:px-8 pb-24 md:pb-12 min-h-screen">
          <div className="max-w-7xl mx-auto py-8">
            <Suspense fallback={<Loading />}>
              {section === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
              {section === 'learning' && <LearningPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'youtube' && <YoutubePage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'work' && <WorkPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'tools' && <ToolsPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'tests' && <TestsPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'ai' && <AiPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'about' && <AboutPage />}
              {section === 'design' && <DesignPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'business' && <BusinessPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'productivity' && <ProductivityPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'marketing' && <MarketingPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'freelancing' && <FreelancingPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'communities' && <CommunitiesPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'podcasts' && <PodcastsPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'newsletters' && <NewslettersPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'books' && <BooksPage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'open-source' && <OpenSourcePage searchQuery={effectiveQuery} onDetails={handleDetails} />}
              {section === 'settings' && <SettingsPage />}
            </Suspense>
          </div>
          <Footer />
        </main>
      </div>

      <BottomNav activeSection={section} onNavigate={handleNavigate} />
      <BackToTop />

      <ToastContainer />
      <DetailsModal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} resource={selectedResource} />
      <FavoritesModal isOpen={favoritesModalOpen} onClose={() => setFavoritesModalOpen(false)} onNavigate={handleNavigate} />
    </div>
  );
}
