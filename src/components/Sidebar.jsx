import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Send, IndianRupee, Users, BarChart3, Crosshair, FileSearch, SearchCheck, Lightbulb, PenTool, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';
import bajajLogo from '../assets/bajaj-finserv.png';
import attributesLogo from '../assets/attributics_logo.jpeg';

const Sidebar = ({ onMenuClick, activeMenu }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({ ai: true, campaign: true, seo: true });
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const aiItems = [
    { id: 1, label: 'Use Cases', icon: Zap, color: 'bg-blue-600' }
  ];

  const campaignItems = [
    { id: 2, label: 'Campaign Agent', icon: Send },
    { id: 3, label: 'Daily Budget', icon: IndianRupee },
    { id: 4, label: 'Ad-Hoc', icon: Crosshair },
    { id: 6, label: 'Segment Agent', icon: Users },
    { id: 5, label: 'Reporting Agent', icon: BarChart3 }
  ];

  const seoItems = [
    { id: 12, label: 'SEO Recommendations', icon: Lightbulb }
  ];

  // Render a section with items
  const renderSection = (title, items, sectionKey, accentColor = 'bg-blue-600') => {
    const isExpanded = expandedSections[sectionKey];
    const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

    return (
      <div className="mb-4">
        {/* Section Header */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className={`w-full flex items-center ${isOpen ? 'justify-between px-2' : 'justify-center'} py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors`}
        >
          {isOpen ? (
            <>
              <span className="truncate">{title}</span>
              <ChevronIcon size={14} className="flex-shrink-0 ml-1" />
            </>
          ) : (
            <div className="w-8 h-0.5 bg-gray-300 rounded" />
          )}
        </button>

        {/* Section Items */}
        {isExpanded && (
          <div className="space-y-1 mt-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onMenuClick(item.id);
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`w-full flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-2'} py-2.5 rounded-lg transition-all group relative ${isActive
                    ? `${accentColor} text-white shadow-md`
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {isOpen && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-full ml-2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none z-50 shadow-lg">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isOpen ? 'w-64' : 'w-16'} 
          ${isMobile ? 'fixed left-0 top-0 z-50' : 'relative'}
          ${isMobile && !isOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          bg-white transition-all duration-300 ease-in-out h-screen flex flex-col shadow-lg
        `}
      >
        {/* Header */}
        <div className={`bg-blue-600 flex p-3 text-white ${isOpen ? 'items-center justify-between' : 'items-center justify-center'}`}>
          {isOpen && (
            <img
              src={bajajLogo}
              alt="Bajaj Logo"
              className="h-7 object-contain"
            />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${isOpen ? 'px-3' : 'px-2'}`}>
          {renderSection('AI Decisioning Agent', aiItems, 'ai', 'bg-blue-600')}
          {renderSection('Campaign Management', campaignItems, 'campaign', 'bg-blue-600')}
          {renderSection('SEO Content Agent', seoItems, 'seo', 'bg-green-600')}
        </nav>

        {/* Footer */}
        <div className={`p-3 border-t border-gray-200 ${isOpen ? '' : 'hidden'}`}>
          <div className="text-center text-[10px] text-gray-400 uppercase tracking-wider mb-2">
            Powered by
          </div>
          <div className="flex justify-center">
            <img
              src={attributesLogo}
              alt="Attributics"
              className="h-5 object-contain opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button (when sidebar is hidden) */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
