import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Reporting from '../pages/Reporting';
import UseCasesMainPage from '../pages/usecases/UseCasesMainPage';
import UseCaseDetailPage from '../pages/usecases/UseCaseDetailPage';
import UseCaseConfigurePage from '../pages/usecases/UseCaseConfigurePage';
import DailyBudget from '../pages/DailyBudget';
import NewUseCaseSetup from '../pages/usecases/NewUseCaseSetup';

import CampaignsPage from '../pages/CampaignsPage';
import CampaignEditor from '../pages/CampaignEditor';
import CampaignStatsPage from '../pages/CampaignStatsPage';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(1);

  const setMenuByPath = (pathname) => {
    if (pathname.startsWith('/use-cases')) return 1;
    if (pathname.startsWith('/campaigns')) return 2;
    if (pathname.startsWith('/daily-budget') || pathname.startsWith('/users')) return 3;
    if (pathname.startsWith('/ad-hoc')) return 4;
    if (pathname.startsWith('/reporting')) return 5;
    return 1;
  };

  useEffect(() => {
    setActiveMenu(setMenuByPath(location.pathname));
  }, [location.pathname]);

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
      case 4:
        navigate('/ad-hoc');
        break;
      case 5:
        navigate('/reporting');
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
            <Route path="/ad-hoc" element={<Reports />} />
            <Route path="/reports" element={<Navigate to="/ad-hoc" replace />} />
            <Route path="/users" element={<Navigate to="/daily-budget" replace />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/use-cases" replace />} />
          </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
