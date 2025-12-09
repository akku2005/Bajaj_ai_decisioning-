import React, { useState } from 'react';
import { ArrowLeft, Edit2, IndianRupee } from 'lucide-react';
import ChatCanvas from './ChatCanvas';
import { useUseCaseStore } from '../../stores/useCaseStore';

const StatCard = ({ label, value, helper }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
    <p className="text-3xl font-extrabold text-gray-900 leading-tight">{value}</p>
    {helper && <p className="text-sm text-gray-600 mt-1">{helper}</p>}
  </div>
);

const UseCaseDetail = ({ useCase, onBack, onEdit }) => {
  const updateDailyBudget = useUseCaseStore((state) => state.updateDailyBudget);
  const [budgetDraft, setBudgetDraft] = useState('');
  const [budgetStatus, setBudgetStatus] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [chatPrompt, setChatPrompt] = useState('');
  const [showAssistantCard, setShowAssistantCard] = useState(true);

  const handleBudgetSave = () => {
    if (!budgetDraft.trim()) return;
    updateDailyBudget(useCase.channel || 'WhatsApp', { allocated: Number(budgetDraft) || 0 });
    setBudgetStatus('Daily budget updated for this use case');
    setTimeout(() => setBudgetStatus(''), 2000);
  };

  const openChatWith = (message) => {
    setInitialMessage(message || '');
    setIsChatOpen(true);
    setShowAssistantCard(false);
  };

  const handlePromptSend = () => {
    if (!chatPrompt.trim()) return;
    openChatWith(chatPrompt.trim());
    setChatPrompt('');
  };

  const pageStyle = {
    width: '100%',
    maxWidth: '100%',
    ...(isChatOpen ? { paddingRight: '440px' } : {}),
  };

  return (
    <div className="space-y-8 relative transition-all w-full" style={pageStyle}>
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-800" />
        </button>
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{useCase.name}</h1>
            <p className="text-gray-600 mt-1">Goal: {useCase.goal || useCase.goalText}</p>
          </div>
          <button
            onClick={() => onEdit?.(useCase)}
            className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 text-sm font-medium"
          >
            <Edit2 size={16} />
            <span>Edit use case</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-sm font-semibold text-gray-700 mb-2">Quarterly Goal</p>
            <p className="text-4xl font-extrabold text-blue-700">{useCase.quarterlyGoal}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Budget</p>
            <p className="text-4xl font-extrabold text-gray-900">{useCase.budget}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-sm font-semibold text-gray-700 mb-1">Today's Budget (by channel)</p>
            <div className="flex items-center space-x-2 mt-2">
              <IndianRupee size={16} className="text-gray-500" />
              <input
                type="number"
                min="0"
                value={budgetDraft}
                onChange={(e) => setBudgetDraft(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter daily budget"
              />
              <button
                onClick={handleBudgetSave}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
            {budgetStatus && <p className="text-xs text-green-700 mt-2">{budgetStatus}</p>}
            <p className="text-xs text-gray-500 mt-2">Note: Updates sync with Daily Budget allocations.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <p className="text-sm font-semibold text-gray-700 mb-1">Use Case Summary</p>
            <p className="text-xs text-gray-600">Budget Left: {useCase.budgetLeft || '—'}</p>
            <p className="text-xs text-gray-600">Campaigns Sent: {useCase.campaignsSent || useCase.campaigns?.sent || '—'}</p>
            <p className="text-xs text-gray-600">Scheduled: {useCase.campaignsScheduled || useCase.campaigns?.scheduled || '—'}</p>
          </div>
        </div>

        {/* Detailed Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Budget Left</p>
            <p className="text-xl font-bold text-gray-900">{useCase.budgetLeft || '—'}</p>
            {useCase.budget && <p className="text-xs text-gray-400 mt-1">from {useCase.budget}</p>}
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Time Left</p>
            <p className="text-xl font-bold text-gray-900">{useCase.timeLeft || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Campaigns Sent</p>
            <p className="text-xl font-bold text-gray-900">{useCase.campaignsSent ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Scheduled</p>
            <p className="text-xl font-bold text-gray-900">{useCase.campaignsScheduled ?? '—'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Target" value={useCase.target || '—'} />
        <StatCard label="Achieved" value={useCase.achieved?.value || '—'} helper={useCase.achieved?.helper} />
        <StatCard label="Expected" value={useCase.expected?.value || '—'} helper={useCase.expected?.helper} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Timeline Progress</p>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-700"
            style={{ width: `${useCase.timeline?.progress || 0}%` }}
            aria-label="timeline progress"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <span>{useCase.timeline?.start}</span>
          <span className="font-semibold text-gray-900">{useCase.timeline?.current}</span>
          <span>{useCase.timeline?.end}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="w-full">
          <StatCard label="Total Leads" value={useCase.lead?.toLocaleString() || '0'} />
        </div>
        <div className="w-full">
          <StatCard label="Current AIP" value={useCase.aip || '—'} />
        </div>
        <div className="w-full">
          <StatCard label="Cost of Acquisition (COA)" value={useCase.coa || '—'} />
        </div>
        
      </div>

      {showAssistantCard && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">AI Assistant</p>
              <p className="text-xs text-green-600">Online & Ready</p>
            </div>
            <button
              onClick={() => {
                setInitialMessage('');
                setIsChatOpen(true);
                setShowAssistantCard(false);
              }}
              className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Open Chat
            </button>
          </div>
          <p className="text-sm text-gray-600">Ask about performance, budget, or strategy. Chat opens on the right.</p>
          <div className="flex flex-wrap gap-2">
            {[
              'ROI Analysis',
              'Budget Recommendations',
              'Segment Insights',
              'Optimize send time',
              'Channel mix advice',
              'Improve CTR',
              'Lower CPA',
              'Audience expansion',
              'Creative ideas',
              'Schedule recommendations',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => setChatPrompt(chip)}
                className="px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-700 hover:border-blue-300 hover:text-blue-700"
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="text"
              value={chatPrompt}
              onChange={(e) => setChatPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePromptSend()}
              placeholder="Ask the AI about performance, budget, or strategy..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePromptSend}
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <ChatCanvas
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setShowAssistantCard(true);
        }}
        initialMessage={initialMessage}
        useCaseName={useCase.name}
        inlineMode={false}
      />
    </div>
  );
};

export default UseCaseDetail;
