import React, { useState } from 'react';
import { ArrowLeft, Edit2, IndianRupee, Clock3 } from 'lucide-react';
import ChatCanvas from './ChatCanvas';
import { useUseCaseStore } from '../../stores/useCaseStore';

const parseBudgetLeft = (label = '') => {
  const match = `${label}`.trim().match(/^([^0-9-+]*)([0-9.,]+)\s*(.*)$/);
  return {
    prefix: match?.[1]?.trim() || '₹',
    value: match?.[2] ? parseFloat(match[2].replace(/,/g, '')) || 0 : 0,
    suffix: match?.[3]?.trim() || 'Lakhs',
  };
};

const formatBudgetLeft = ({ prefix, value, suffix }) => {
  const rounded = Number.isFinite(value) ? Number(value.toFixed(2)) : 0;
  const displayValue = Number.isInteger(rounded) ? rounded.toString() : rounded.toString();
  const suffixText = suffix ? ` ${suffix}` : '';
  return `${prefix}${displayValue}${suffixText}`.trim();
};

const parseTimeLeft = (label = '') => {
  const match = `${label}`.trim().match(/([0-9]+)\s*(.*)/);
  return {
    value: match?.[1] ? Number(match[1]) || 0 : 0,
    suffix: match?.[2]?.trim() || 'Days',
  };
};

const formatTimeLeft = ({ value, suffix }) => {
  const safeValue = Math.max(0, Math.round(Number(value) || 0));
  const suffixText = suffix || 'Days';
  return `${safeValue} ${suffixText}`.trim();
};

const StatCard = ({ label, value, helper }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
    <p className="text-3xl font-extrabold text-gray-900 leading-tight">{value}</p>
    {helper && <p className="text-sm text-gray-600 mt-1">{helper}</p>}
  </div>
);

const UseCaseDetail = ({ useCase, onBack, onEdit }) => {
  const updateUseCase = useUseCaseStore((state) => state.updateUseCase);
  const [budgetLeftDraft, setBudgetLeftDraft] = useState('');
  const [budgetLeftMode, setBudgetLeftMode] = useState('increase');
  const [budgetLeftStatus, setBudgetLeftStatus] = useState('');
  const [timeLeftDraft, setTimeLeftDraft] = useState('');
  const [timeLeftMode, setTimeLeftMode] = useState('increase');
  const [timeLeftStatus, setTimeLeftStatus] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [chatPrompt, setChatPrompt] = useState('');
  const [showAssistantCard, setShowAssistantCard] = useState(true);

  const aiSuggestions = [
    `Give me a quick status for ${useCase.name}`,
    `How should we use ${useCase.budgetLeft || 'the remaining budget'} over ${useCase.timeLeft || 'the remaining time'}?`,
    `Which channel should we prioritize for ${useCase.name}?`,
    `Ideas to hit ${useCase.goal || useCase.target} faster`,
    `Top segment to go after for ${useCase.name}`,
    `How to reduce CPA without missing the goal?`,
  ];

  const handleBudgetLeftSave = () => {
    const delta = Number(budgetLeftDraft);
    if (!Number.isFinite(delta) || delta === 0) return;
    const parsed = parseBudgetLeft(useCase.budgetLeft);
    const nextValue = budgetLeftMode === 'increase' ? parsed.value + delta : Math.max(0, parsed.value - delta);
    const formatted = formatBudgetLeft({ ...parsed, value: nextValue });
    updateUseCase(useCase.id, { budgetLeft: formatted });
    setBudgetLeftStatus(`Budget left ${budgetLeftMode === 'increase' ? 'added' : 'reduced'} to ${formatted}`);
    setBudgetLeftDraft('');
    setTimeout(() => setBudgetLeftStatus(''), 2000);
  };

  const handleTimeLeftSave = () => {
    const delta = Number(timeLeftDraft);
    if (!Number.isFinite(delta) || delta === 0) return;
    const parsed = parseTimeLeft(useCase.timeLeft);
    const nextValue = timeLeftMode === 'increase' ? parsed.value + delta : Math.max(0, parsed.value - delta);
    const formatted = formatTimeLeft({ value: nextValue, suffix: parsed.suffix });
    updateUseCase(useCase.id, { timeLeft: formatted });
    setTimeLeftStatus(`Time left ${timeLeftMode === 'increase' ? 'extended' : 'shortened'} to ${formatted}`);
    setTimeLeftDraft('');
    setTimeout(() => setTimeLeftStatus(''), 2000);
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
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Budget Left</p>
                <p className="text-2xl font-extrabold text-gray-900 leading-tight">{useCase.budgetLeft || 'N/A'}</p>
                <p className="text-xs text-gray-500">Adjust the remaining budget for this use case.</p>
              </div>
              <div className="inline-flex rounded-md border border-gray-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setBudgetLeftMode('increase')}
                  className={`px-3 py-1 text-xs font-semibold transition-colors ${budgetLeftMode === 'increase' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetLeftMode('decrease')}
                  className={`px-3 py-1 text-xs font-semibold transition-colors border-l border-gray-200 ${budgetLeftMode === 'decrease' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Reduce
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <IndianRupee size={16} className="text-gray-500" />
              <input
                type="number"
                min="0"
                value={budgetLeftDraft}
                onChange={(e) => setBudgetLeftDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBudgetLeftSave()}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount to adjust"
              />
              <button
                onClick={handleBudgetLeftSave}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
            {budgetLeftStatus && <p className="text-xs text-green-700 mt-1">{budgetLeftStatus}</p>}
            <p className="text-xs text-gray-500">Applies to the budget left value shown above.</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Time Left</p>
                <p className="text-2xl font-extrabold text-gray-900 leading-tight">{useCase.timeLeft || 'N/A'}</p>
                <p className="text-xs text-gray-500">Adjust remaining days for this use case.</p>
              </div>
              <div className="inline-flex rounded-md border border-gray-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setTimeLeftMode('increase')}
                  className={`px-3 py-1 text-xs font-semibold transition-colors ${timeLeftMode === 'increase' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Extend
                </button>
                <button
                  type="button"
                  onClick={() => setTimeLeftMode('decrease')}
                  className={`px-3 py-1 text-xs font-semibold transition-colors border-l border-gray-200 ${timeLeftMode === 'decrease' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Shorten
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock3 size={16} className="text-gray-500" />
              <input
                type="number"
                min="0"
                value={timeLeftDraft}
                onChange={(e) => setTimeLeftDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTimeLeftSave()}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter days to adjust"
              />
              <button
                onClick={handleTimeLeftSave}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
            {timeLeftStatus && <p className="text-xs text-green-700 mt-1">{timeLeftStatus}</p>}
            <p className="text-xs text-gray-500">Applies to the time left value shown above.</p>
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
          <StatCard label="Leads till Date" value={useCase.lead?.toLocaleString() || '0'} />
        </div>
        <div className="w-full">
          <StatCard label="AIPs till Date" value={useCase.aip || '—'} />
        </div>
        <div className="w-full">
          <StatCard label="Cost of AIP" value={useCase.coa || '—'} />
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
            {aiSuggestions.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setChatPrompt('');
                  setInitialMessage(chip);
                  setIsChatOpen(true);
                  setShowAssistantCard(false);
                }}
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
        useCase={useCase}
        inlineMode={false}
      />
    </div>
  );
};

export default UseCaseDetail;
