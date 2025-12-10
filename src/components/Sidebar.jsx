import React, { useState } from 'react';
import { Menu, X, Zap, Send, IndianRupee, Users, BarChart3 } from 'lucide-react';
import bajajLogo from '../assets/bajaj-finserv.png';
import attributesLogo from '../assets/attributics_logo.jpeg';

const Sidebar = ({ onMenuClick, activeMenu }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({ ai: true, campaign: true });

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
    { id: 4, label: 'Segment Agent', icon: Users },
    { id: 5, label: 'Reporting Agent', icon: BarChart3 }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${isOpen ? 'w-64' : 'w-20'
          } bg-white transition-all duration-300 ease-in-out h-screen flex flex-col shadow-lg overflow-hidden`}
      >
        {/* Header with Blue Background */}
        <div className={`bg-blue-600 flex p-4 text-white ${isOpen ? 'items-center justify-between' : 'items-center justify-center'}`}>
          {isOpen && (
            <img
              src={bajajLogo}
              alt="Bajaj Logo"
              className="h-8 object-contain"
            />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className={`flex-1 py-8 space-y-6 overflow-y-auto overflow-x-hidden ${isOpen ? 'px-4' : 'px-2'}`}>
          {/* AI DECISIONING Section */}
          <div>
            {isOpen && (
              <button
                onClick={() => toggleSection('ai')}
                className="w-full text-left text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 hover:text-gray-700 transition-colors"
              >
                AI DECISIONING Agent
              </button>
            )}
            {expandedSections.ai && (
              <div className="space-y-2">
                {aiItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onMenuClick(item.id)}
                      className={`w-full flex items-center ${isOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-all group relative ${isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                      {!isOpen && (
                        <div className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none text-xs">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CAMPAIGN MANAGEMENT Section */}
          <div>
            {isOpen && (
              <button
                onClick={() => toggleSection('campaign')}
                className="w-full text-left text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 hover:text-gray-700 transition-colors"
              >
                CAMPAIGN MANAGEMENT
              </button>
            )}
            {expandedSections.campaign && (
              <div className="space-y-2">
                {campaignItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onMenuClick(item.id)}
                      className={`w-full flex items-center ${isOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-all group relative ${isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                      {!isOpen && (
                        <div className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none text-xs">
                          {item.label}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Footer - Attributes Image */}
        <div className="p-4 border-gray-200 space-y-4 mt-auto">


          {/* Powered By Text */}
          {isOpen && (
            <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-200">
              POWERED BY
            </div>
          )}
          {/* Attributes Image */}
          {isOpen && (
            <div className="flex justify-center py-2">
              <img
                src={attributesLogo}
                alt="Attributes"
                className="h-6 object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
