import React, { useState } from 'react';
import { Tag, Info, TrendingUp, Square, Plus, X } from 'lucide-react';

const FeaturesTab = ({ features = {}, onFeaturesChange = () => {} }) => {

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const handleAddFeature = () => {
    if (!newFeature.trim() || !activeCategory) return;

    onFeaturesChange({
      ...features,
      [activeCategory]: [...(features[activeCategory] || []), newFeature.trim()]
    });

    setNewFeature('');
    setShowAddModal(false);
    setActiveCategory('');
  };

  const handleRemoveFeature = (category, feature) => {
    onFeaturesChange({
      ...features,
      [category]: (features[category] || []).filter(f => f !== feature)
    });
  };

  const openAddModal = (category) => {
    setActiveCategory(category);
    setShowAddModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Features Configuration</h2>
        <p className="text-sm text-gray-600">Define offers, attributes, and signals for targeting</p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Offers Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Tag className="text-blue-600" size={20} />
            <h3 className="text-base font-semibold text-gray-900">Offers</h3>
          </div>

          {/* Group Offers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Group Offers</p>
              <button
                onClick={() => openAddModal('groupOffers')}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Add group offer"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(features.groupOffers || []).map((feature) => (
                <div
                  key={feature}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center space-x-1.5 group hover:bg-blue-100 transition-colors"
                >
                  <span>{feature}</span>
                  <button
                    onClick={() => handleRemoveFeature('groupOffers', feature)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} className="text-blue-600 hover:text-blue-800" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Offers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Personalized Offers</p>
              <button
                onClick={() => openAddModal('personalizedOffers')}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Add personalized offer"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(features.personalizedOffers || []).map((feature) => (
                <div
                  key={feature}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center space-x-1.5 group hover:bg-blue-100 transition-colors"
                >
                  <span>{feature}</span>
                  <button
                    onClick={() => handleRemoveFeature('personalizedOffers', feature)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} className="text-blue-600 hover:text-blue-800" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Attributes Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="text-purple-600" size={20} />
              <h3 className="text-base font-semibold text-gray-900">Profile Attributes</h3>
            </div>
            <button
              onClick={() => openAddModal('profileAttributes')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Add profile attribute"
            >
              <Plus size={14} className="text-gray-600" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(features.profileAttributes || []).map((feature) => (
              <div
                key={feature}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center space-x-1.5 group hover:bg-gray-200 transition-colors"
              >
                <span>{feature}</span>
                <button
                  onClick={() => handleRemoveFeature('profileAttributes', feature)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} className="text-gray-600 hover:text-gray-800" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Behaviour Signals Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-600" size={20} />
              <h3 className="text-base font-semibold text-gray-900">Behaviour Signals</h3>
            </div>
            <button
              onClick={() => openAddModal('behaviourSignals')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Add behaviour signal"
            >
              <Plus size={14} className="text-gray-600" />
            </button>
          </div>
          <div className="space-y-2">
            {(features.behaviourSignals || []).map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded group transition-colors"
              >
                <span className="text-sm text-gray-800 font-mono">• {feature}</span>
                <button
                  onClick={() => handleRemoveFeature('behaviourSignals', feature)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} className="text-gray-400 hover:text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Signals Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Square className="text-orange-600" size={20} />
              <h3 className="text-base font-semibold text-gray-900">Engagement Signals</h3>
            </div>
            <button
              onClick={() => openAddModal('engagementSignals')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Add engagement signal"
            >
              <Plus size={14} className="text-gray-600" />
            </button>
          </div>
          <div className="space-y-2">
            {(features.engagementSignals || []).map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded group transition-colors"
              >
                <span className="text-sm text-gray-800 font-mono">• {feature}</span>
                <button
                  onClick={() => handleRemoveFeature('engagementSignals', feature)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} className="text-gray-400 hover:text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Feature Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Add {activeCategory === 'groupOffers' ? 'Group Offer' :
                activeCategory === 'personalizedOffers' ? 'Personalized Offer' :
                  activeCategory === 'profileAttributes' ? 'Profile Attribute' :
                    activeCategory === 'behaviourSignals' ? 'Behaviour Signal' :
                      'Engagement Signal'}
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Feature Name
              </label>
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., custom_offer_name"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddFeature();
                  }
                }}
              />
              <p className="mt-2 text-xs text-gray-500">Use lowercase with underscores (e.g., my_feature_name)</p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setActiveCategory('');
                  setNewFeature('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFeature}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesTab;
