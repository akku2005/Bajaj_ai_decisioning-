import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useUseCaseStore } from '../../stores/useCaseStore';
import CustomerGroupsTab from './configTabs/CustomerGroupsTab';
import DecisionDimensionTab from './configTabs/DecisionDimensionTab';
import ActionBanksTab from './configTabs/ActionBanksTab';
import ConversionTab from './configTabs/ConversionTab';
import GuardrailsTab from './configTabs/GuardrailsTab';
import FeaturesTab from './configTabs/FeaturesTab';
import AIRecommendationsTab from './configTabs/AIRecommendationsTab';
import CustomReportingTab from './configTabs/CustomReportingTab';

const UseCaseConfigure = ({ useCase, onBack, onActivate = () => { } }) => {
  const tabs = [
    { id: 0, label: 'Customer groups' },
    { id: 1, label: 'Decision Dimension' },
    { id: 2, label: 'Action banks' },
    { id: 3, label: 'Conversion' },
    { id: 4, label: 'Guardrails' },
    { id: 5, label: 'Features to use' },
    { id: 6, label: 'AI Recommendations' },
    { id: 7, label: 'Custom Reporting' },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const segments = useUseCaseStore((state) => state.segments);
  const groups = useUseCaseStore((state) => state.groups);
  const decisionDimensions = useUseCaseStore((state) => state.decisionDimensions);
  const updateDecisionDimensions = useUseCaseStore((state) => state.updateDecisionDimensions);
  const actionBankData = useUseCaseStore((state) => state.actionBankData);
  const updateActionBankData = useUseCaseStore((state) => state.updateActionBankData);
  const guardrails = useUseCaseStore((state) => state.guardrails);
  const updateGuardrails = useUseCaseStore((state) => state.updateGuardrails);
  const features = useUseCaseStore((state) => state.features);
  const updateFeatures = useUseCaseStore((state) => state.updateFeatures);
  const [actionBankTab, setActionBankTab] = useState(0);
  const [draggingId, setDraggingId] = useState(null);
  const [showDimModal, setShowDimModal] = useState(false);
  const [newDim, setNewDim] = useState({ name: '', description: '', sendTo: '', locked: false, type: 'other' });
  const [showActionModal, setShowActionModal] = useState(false);
  const [newAction, setNewAction] = useState({ name: '', description: '', value: '', cost: '', type: 'SMS' });

  const actionTabMap = useMemo(
    () => ({
      frequency: { key: 'frequencies', label: 'Frequency' },
      daysofweek: { key: 'daysofweek', label: 'Days of Week' },
      channel: { key: 'channels', label: 'Channel' },
      offer: { key: 'offers', label: 'Offer' },
      time: { key: 'times', label: 'Time' },
      creative: { key: 'creatives', label: 'Creative' },
    }),
    []
  );

  const availableActionTabs = useMemo(() => {
    const seen = new Set();
    const ordered = [];
    (decisionDimensions || []).forEach((dim) => {
      const mapItem = actionTabMap[dim.type];
      if (mapItem && !seen.has(mapItem.key)) {
        seen.add(mapItem.key);
        ordered.push(mapItem);
      }
    });
    if (ordered.length === 0) {
      return Object.values(actionTabMap);
    }
    return ordered;
  }, [decisionDimensions, actionTabMap]);

  const currentActionKey = useMemo(() => {
    if (!availableActionTabs[actionBankTab]) return availableActionTabs[0]?.key || 'channels';
    return availableActionTabs[actionBankTab].key;
  }, [actionBankTab, availableActionTabs]);

  useEffect(() => {
    if (actionBankTab >= availableActionTabs.length && availableActionTabs.length > 0) {
      setActionBankTab(0);
    }
  }, [actionBankTab, availableActionTabs]);

  const renderTabContent = () => {
    if (activeTab === 0) {
      return <CustomerGroupsTab segments={segments} groups={groups} />;
    }
    if (activeTab === 1) {
      return (
        <DecisionDimensionTab
          dimensions={decisionDimensions}
          onToggleLock={(id) =>
            updateDecisionDimensions((prev) => prev.map((d) => (d.id === id ? { ...d, locked: !d.locked } : d)))
          }
          onDelete={(id) => updateDecisionDimensions((prev) => prev.filter((d) => d.id !== id))}
          onDragStart={(e, idx) => {
            if (!decisionDimensions?.[idx] || decisionDimensions[idx].locked) return;
            setDraggingId(decisionDimensions[idx].id);
            e.dataTransfer.effectAllowed = 'move';
          }}
          onDragEnter={(e, idx) => {
            e.preventDefault();
            updateDecisionDimensions((prev) => {
              const draggingIndex = prev.findIndex((d) => d.id === draggingId);
              if (draggingIndex === -1 || draggingIndex === idx || prev[idx]?.locked) return prev;
              const updated = [...prev];
              const [moved] = updated.splice(draggingIndex, 1);
              updated.splice(idx, 0, moved);
              return updated;
            });
          }}
          onDragEnd={() => setDraggingId(null)}
          draggingId={draggingId}
          onAddDimension={() => setShowDimModal(true)}
        />
      );
    }
    if (activeTab === 2) {
      const safeTab = actionBankTab >= availableActionTabs.length ? 0 : actionBankTab;
      if (safeTab !== actionBankTab) setActionBankTab(safeTab);
      return (
        <ActionBanksTab
          tabs={availableActionTabs}
          activeSubTab={safeTab}
          onSubTabChange={setActionBankTab}
          data={actionBankData}
          onAddAction={() => setShowActionModal(true)}
        />
      );
    }
    if (activeTab === 3) return <ConversionTab />;
    if (activeTab === 4) return <GuardrailsTab guardrails={guardrails} onGuardrailsChange={updateGuardrails} />;
    if (activeTab === 5) return <FeaturesTab features={features} onFeaturesChange={updateFeatures} />;
    if (activeTab === 6) return <AIRecommendationsTab useCase={useCase} />;
    if (activeTab === 7) return <CustomReportingTab useCase={useCase} />;
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-800" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Configure - {useCase?.name || 'Use Case'}
            </h1>
            <p className="text-gray-600 mt-1">Set audiences, groups, and prediction methods</p>
          </div>
        </div>


      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.id
                ? 'text-blue-700 border-blue-700 bg-blue-50'
                : 'text-gray-700 border-transparent hover:bg-gray-50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}

      <div className="flex justify-end space-x-3">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={() => onActivate?.(useCase?.id)}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-semibold"
        >
          Save & Activate
        </button>
      </div>

      {showDimModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 space-y-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Add Dimension</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Name</p>
                <input
                  value={newDim.name}
                  onChange={(e) => setNewDim((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., Device"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Description</p>
                <input
                  value={newDim.description}
                  onChange={(e) => setNewDim((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="What this dimension controls"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Send decisions to</p>
                <input
                  value={newDim.sendTo}
                  onChange={(e) => setNewDim((prev) => ({ ...prev, sendTo: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="e.g., Offer, Time, Creative"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Type (for Action Bank)</p>
                <select
                  value={newDim.type}
                  onChange={(e) => setNewDim((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="other">Other</option>
                  <option value="frequency">Frequency</option>
                  <option value="daysofweek">Days of Week</option>
                  <option value="channel">Channel</option>
                  <option value="offer">Offer</option>
                  <option value="time">Time</option>
                  <option value="creative">Creative</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDimModal(false);
                  setNewDim({ name: '', description: '', sendTo: '', locked: false, type: 'other' });
                }}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newDim.name) return;
                  updateDecisionDimensions((prev) => [
                    ...prev,
                    {
                      ...newDim,
                      id: Date.now(),
                      locked: false,
                    },
                  ]);
                  setShowDimModal(false);
                  setNewDim({ name: '', description: '', sendTo: '', locked: false, type: 'other' });
                }}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showActionModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 space-y-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Add {availableActionTabs[actionBankTab]?.label || 'Item'}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Name</p>
                <input
                  value={newAction.name}
                  onChange={(e) => setNewAction((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Name"
                />
              </div>
              {currentActionKey === 'channels' ? (
                <>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Channel Type</p>
                    <select
                      value={newAction.type}
                      onChange={(e) => setNewAction((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="SMS">SMS</option>
                      <option value="RCS">RCS</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Cost / Send</p>
                    <input
                      value={newAction.value}
                      onChange={(e) => setNewAction((prev) => ({ ...prev, value: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="e.g., ₹10.30"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Description / Type</p>
                    <input
                      value={newAction.description}
                      onChange={(e) => setNewAction((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Value / Cost</p>
                      <input
                        value={newAction.value}
                        onChange={(e) => setNewAction((prev) => ({ ...prev, value: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., ₹1500 or 10%"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Type</p>
                      <input
                        value={newAction.type}
                        onChange={(e) => setNewAction((prev) => ({ ...prev, type: e.target.value }))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="e.g., Offer, Slot, Image"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setNewAction({ name: '', description: '', value: '', cost: '', type: 'SMS' });
                }}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newAction.name) return;
                  updateActionBankData((prev) => {
                    const next = { ...prev };
                    const list = [...(next[currentActionKey] || [])];
                    const idPrefix =
                      currentActionKey === 'frequencies' ? 'FR' :
                        currentActionKey === 'daysofweek' ? 'DW' :
                          currentActionKey === 'channels' ? 'CH' :
                            currentActionKey === 'offers' ? 'OF' :
                              currentActionKey === 'times' ? 'TM' : 'CR';
                    const newId = `${idPrefix}${String(list.length + 1).padStart(3, '0')}`;
                    if (currentActionKey === 'frequencies') {
                      list.push({
                        id: newId,
                        name: newAction.name,
                        description: newAction.description || '',
                        count: parseInt(newAction.value) || 1,
                        period: newAction.type || '7 days'
                      });
                    } else if (currentActionKey === 'daysofweek') {
                      list.push({
                        id: newId,
                        name: newAction.name,
                        description: newAction.description || '',
                        dayCode: newAction.value || 'DAY',
                        optimal: newAction.type || '-'
                      });
                    } else if (currentActionKey === 'channels') {
                      list.push({ id: newId, name: newAction.name, type: newAction.type || 'Other', cost: newAction.value || '-', status: 'Active' });
                    } else if (currentActionKey === 'offers') {
                      list.push({ id: newId, name: newAction.name, description: newAction.description, value: newAction.value, valid: '—' });
                    } else if (currentActionKey === 'times') {
                      list.push({ id: newId, slot: newAction.name, description: newAction.description, optimal: newAction.type || '-' });
                    } else {
                      list.push({ id: newId, name: newAction.name, type: newAction.type || 'Text', preview: '[View]' });
                    }
                    next[currentActionKey] = list;
                    return next;
                  });
                  setShowActionModal(false);
                  setNewAction({ name: '', description: '', value: '', cost: '', type: 'SMS' });
                }}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UseCaseConfigure;
