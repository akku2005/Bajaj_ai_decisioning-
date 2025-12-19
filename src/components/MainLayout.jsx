import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import AdHocPage from '../pages/adhoc';
import Settings from '../pages/Settings';
import Reporting from '../pages/Reporting';
import UseCasesMainPage from '../pages/usecases/UseCasesMainPage';
import UseCaseDetailPage from '../pages/usecases/UseCaseDetailPage';
import UseCaseConfigurePage from '../pages/usecases/UseCaseConfigurePage';
import DailyBudget from '../pages/DailyBudget';
import NewUseCaseSetup from '../pages/usecases/NewUseCaseSetup';
import SegmentAgentPage from '../pages/SegmentAgentPage';

import CampaignsPage from '../pages/CampaignsPage';
import CampaignEditor from '../pages/CampaignEditor';
import CampaignStatsPage from '../pages/CampaignStatsPage';

// SEO Pages
import SEOContentAnalysis from '../pages/seo/SEOContentAnalysis';
import SEOGapResearch from '../pages/seo/SEOGapResearch';
import SEORecommendations from '../pages/seo/SEORecommendations';
import SEOPageDetail from '../pages/seo/SEOPageDetail';
import SEOContentExecution from '../pages/seo/SEOContentExecution';
import SEOPerformance from '../pages/seo/SEOPerformance';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(1);

  const setMenuByPath = (pathname) => {
    if (pathname.startsWith('/segments')) return 6;
    if (pathname.startsWith('/use-cases')) return 1;
    if (pathname.startsWith('/campaigns')) return 2;
    if (pathname.startsWith('/daily-budget') || pathname.startsWith('/users')) return 3;
    if (pathname.startsWith('/ad-hoc')) return 4;
    if (pathname.startsWith('/reporting')) return 5;
    // SEO routes
    if (pathname.startsWith('/seo/content-analysis')) return 10;
    if (pathname.startsWith('/seo/gap-research')) return 11;
    if (pathname.startsWith('/seo/recommendations')) return 12;
    if (pathname.startsWith('/seo/content-execution')) return 13;
    if (pathname.startsWith('/seo/performance')) return 14;
    return 1;
  };

  useEffect(() => {
    // Compute active menu but avoid setting state unless it changes to prevent cascading renders
    let newActive;
    try {
      const params = new URLSearchParams(location.search);
      const panel = params.get('panel');
      if (location.pathname.startsWith('/segments')) newActive = 6;
      else if (location.pathname.startsWith('/use-cases') && panel === 'segments') newActive = 6;
      else newActive = setMenuByPath(location.pathname);
    } catch {
      newActive = setMenuByPath(location.pathname);
    }

    if (newActive !== activeMenu) {
      // Defer setState to the next tick to avoid cascading renders inside the effect
      Promise.resolve().then(() => setActiveMenu(newActive));
    }
  }, [location.pathname, location.search, activeMenu]);

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    switch (menuId) {
      case 1:
        navigate('/use-cases');
        break;
      case 2:
        navigate('/campaigns');
        break;
      case 3:
        navigate('/daily-budget');
        break;
      case 6:
        navigate('/segments');
        break;
      case 4:
        navigate('/ad-hoc');
        break;
      case 5:
        navigate('/reporting');
        break;
      // SEO Content Agent
      case 10:
        navigate('/seo/content-analysis');
        break;
      case 11:
        navigate('/seo/gap-research');
        break;
      case 12:
        navigate('/seo/recommendations');
        break;
      case 13:
        navigate('/seo/content-execution');
        break;
      case 14:
        navigate('/seo/performance');
        break;
      default:
        navigate('/use-cases');
        break;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onMenuClick={handleMenuClick} activeMenu={activeMenu} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="w-full max-w-screen-2xl mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/use-cases" replace />} />
              <Route path="/use-cases" element={<UseCasesMainPage />} />
              <Route path="/use-cases/new" element={<NewUseCaseSetup />} />
              <Route path="/use-cases/:id" element={<UseCaseDetailPage />} />
              <Route path="/use-cases/:id/configure" element={<UseCaseConfigurePage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/campaigns/:id/edit" element={<CampaignEditor />} />
              <Route path="/daily-budget" element={<DailyBudget />} />
              <Route path="/campaigns/stats" element={<CampaignStatsPage />} />
              <Route path="/segments" element={<SegmentAgentPage />} />
              <Route path="/ad-hoc" element={<AdHocPage />} />
              <Route path="/reports" element={<Navigate to="/ad-hoc" replace />} />
              <Route path="/users" element={<Navigate to="/daily-budget" replace />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/settings" element={<Settings />} />
              {/* SEO Routes */}
              <Route path="/seo/content-analysis" element={<SEOContentAnalysis />} />
              <Route path="/seo/gap-research" element={<SEOGapResearch />} />
              <Route path="/seo/recommendations" element={<SEORecommendations />} />
              <Route path="/seo/recommendations/:id" element={<SEOPageDetail />} />
              <Route path="/seo/content-execution" element={<SEOContentExecution />} />
              <Route path="/seo/performance" element={<SEOPerformance />} />
              <Route path="*" element={<Navigate to="/use-cases" replace />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
