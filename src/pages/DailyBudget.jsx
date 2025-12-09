import React, { useMemo, useState } from 'react';
import { IndianRupee, Save, Edit3, Check, X, Zap, CalendarRange, BarChart3, MessageSquare, Gauge, Target, BarChart2, Clock3 } from 'lucide-react';
import { useUseCaseStore } from '../stores/useCaseStore';

const formatCurrency = (value) => {
  if (value === undefined || value === null) return '₹0';
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toLocaleString()}`;
};

const DailyBudget = () => {
  const dailyBudgets = useUseCaseStore((state) => state.dailyBudgets);
  const updateDailyBudget = useUseCaseStore((state) => state.updateDailyBudget);
  const setDailyBudgets = useUseCaseStore((state) => state.setDailyBudgets);
  const [activeTab, setActiveTab] = useState('allocation');

  const [drafts, setDrafts] = useState(() =>
    Object.fromEntries(
      dailyBudgets.map((item) => [
        item.channel,
        {
          allocated: item.allocated,
          monthlyBudget: item.monthlyBudget,
          quarterlyBudget: item.quarterlyBudget,
        },
      ])
    )
  );
  const [editing, setEditing] = useState(() =>
    Object.fromEntries(dailyBudgets.map((item) => [item.channel, false]))
  );
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', text: "Hi! I can help you rebalance budgets. Ask me to shift allocation between channels or optimize for CPA." },
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatSuggestions = [
    'Shift 10% from SMS to WhatsApp to lower CPA',
    'Boost RCS by 5% for richer media campaigns',
    'Cut WhatsApp by 5% and add to SMS for reach',
    'What if monthly SMS budget is ₹350K?',
    'Target 75% overall utilization with lower CPA',
  ];

  const totals = useMemo(() => {
    const daily = dailyBudgets.reduce((sum, item) => sum + (Number(item.allocated) || 0), 0);
    const monthly = dailyBudgets.reduce((sum, item) => sum + (Number(item.monthlyBudget) || 0), 0);
    const quarterly = dailyBudgets.reduce((sum, item) => sum + (Number(item.quarterlyBudget) || 0), 0);
    const spent = dailyBudgets.reduce((sum, item) => sum + (Number(item.spentMTD) || 0), 0);
    return { daily, monthly, quarterly, spent };
  }, [dailyBudgets]);
  const utilization = totals.quarterly ? Math.round((totals.spent / totals.quarterly) * 100) : 0;

  const handleEdit = (channel) => {
    setEditing((prev) => ({ ...prev, [channel]: true }));
  };

  const handleCancel = (channel) => {
    setEditing((prev) => ({ ...prev, [channel]: false }));
    setDrafts((prev) => ({
      ...prev,
      [channel]: {
        allocated: dailyBudgets.find((i) => i.channel === channel)?.allocated || 0,
        monthlyBudget: dailyBudgets.find((i) => i.channel === channel)?.monthlyBudget || 0,
        quarterlyBudget: dailyBudgets.find((i) => i.channel === channel)?.quarterlyBudget || 0,
      },
    }));
  };

  const handleSave = (channel) => {
    const draft = drafts[channel] || {};
    updateDailyBudget(channel, {
      allocated: Number(draft.allocated) || 0,
      monthlyBudget: Number(draft.monthlyBudget) || 0,
      quarterlyBudget: Number(draft.quarterlyBudget) || 0,
    });
    setEditing((prev) => ({ ...prev, [channel]: false }));
  };

  const handleReset = () => {
    setDrafts(
      Object.fromEntries(
        dailyBudgets.map((item) => [
          item.channel,
          {
            allocated: item.allocated,
            monthlyBudget: item.monthlyBudget,
            quarterlyBudget: item.quarterlyBudget,
          },
        ])
      )
    );
    setEditing(Object.fromEntries(dailyBudgets.map((item) => [item.channel, false])));
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: chatInput.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    // simple stubbed AI response
    setTimeout(() => {
      const aiText =
        'Suggestion: shift 10% from SMS to WhatsApp to reduce CPA and add 5% to RCS for richer media. Want me to apply?';
      setChatMessages((prev) => [...prev, { id: Date.now() + 1, type: 'ai', text: aiText }]);
    }, 600);
  };

  const infoCards = [
    { label: 'Daily Budget', value: formatCurrency(totals.daily), helper: 'Per day allocation', icon: <CalendarRange className="text-blue-600" size={18} /> },
    { label: 'Monthly Budget', value: formatCurrency(totals.monthly), helper: 'Auto-adjusts from daily', icon: <IndianRupee className="text-blue-600" size={18} /> },
    { label: 'Quarterly Budget', value: formatCurrency(totals.quarterly), helper: '3-month allocation', icon: <BarChart3 className="text-green-600" size={18} /> },
    { label: 'Budget Utilization', value: `${utilization}%`, helper: 'MTD spend vs quarterly budget', icon: <Gauge className="text-orange-600" size={18} /> },
  ];

  const performanceGoals = [
    { title: 'Lower CPA', target: '₹285', status: 'On Track', detail: 'Reallocate 8% from SMS to RCS for richer media efficiency.', owner: 'Growth Ops' },
    { title: 'Increase CTR', target: '28%', status: 'At Risk', detail: 'Lift SMS CTR by 2pp via timing + creative refresh tests.', owner: 'Lifecycle' },
    { title: 'Utilization', target: '75% MTD', status: 'Ahead', detail: 'Keep spend pacing to hit monthly cap without overshoot.', owner: 'Finance' },
  ];

  const budgetHistory = [
    { date: '08 Dec 2025', action: 'Adjusted WhatsApp daily budget to ₹1,20,000', by: 'Priya', impact: '+₹20K / day' },
    { date: '05 Dec 2025', action: 'Shifted 5% from SMS to RCS for rich media', by: 'Automated rule', impact: 'CPA -3%' },
    { date: '01 Dec 2025', action: 'Monthly roll-over applied', by: 'System', impact: 'Quarterly budget synced' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Budget &amp; Goals Management</h1>
        <p className="text-gray-600 mt-1">Set daily, monthly, and quarterly budgets. Define goals and track progress.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {infoCards.map((card) => (
          <div key={card.label} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.helper}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              className={`text-sm pb-2 ${activeTab === 'allocation' ? 'font-semibold text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('allocation')}
            >
              Budget Allocation
            </button>
            <button
              className={`text-sm pb-2 ${activeTab === 'goals' ? 'font-semibold text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('goals')}
            >
              Performance Goals
            </button>
            <button
              className={`text-sm pb-2 ${activeTab === 'history' ? 'font-semibold text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('history')}
            >
              Budget History
            </button>
          </div>
          <button
            onClick={() => setDailyBudgets([...dailyBudgets])}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>

        {activeTab === 'allocation' && (
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Budget Allocations</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">
                <div className="col-span-2">Team/Channel</div>
                <div className="col-span-2">Daily Budget</div>
                <div className="col-span-2">Monthly Budget</div>
                <div className="col-span-2">Quarterly Budget</div>
                <div className="col-span-2">Spent (MTD)</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              {dailyBudgets.map((item) => {
                const isEditing = editing[item.channel];
                const draft = drafts[item.channel] || {};
                return (
                  <div key={item.channel} className="grid grid-cols-12 gap-4 px-3 py-3 border-b border-gray-100 items-center">
                    <div className="col-span-2 flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${item.color.replace('text', 'bg').split(' ')[0]} text-gray-800`}>
                        {item.channel}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="relative">
                        <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          value={draft.allocated ?? item.allocated}
                          onChange={(e) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [item.channel]: { ...prev[item.channel], allocated: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                          className={`w-full pl-8 pr-3 py-2 rounded-md border text-sm ${
                            isEditing ? 'border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="relative">
                        <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          value={draft.monthlyBudget ?? item.monthlyBudget}
                          onChange={(e) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [item.channel]: { ...prev[item.channel], monthlyBudget: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                          className={`w-full pl-8 pr-3 py-2 rounded-md border text-sm ${
                            isEditing ? 'border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="relative">
                        <IndianRupee size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          value={draft.quarterlyBudget ?? item.quarterlyBudget}
                          onChange={(e) =>
                            setDrafts((prev) => ({
                              ...prev,
                              [item.channel]: { ...prev[item.channel], quarterlyBudget: e.target.value },
                            }))
                          }
                          disabled={!isEditing}
                          className={`w-full pl-8 pr-3 py-2 rounded-md border text-sm ${
                            isEditing ? 'border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(item.spentMTD)}</p>
                      <div className="text-xs text-gray-600">Status: {item.statusPct}%</div>
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(item.channel)}
                            className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            aria-label="Save row"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => handleCancel(item.channel)}
                            className="p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                            aria-label="Cancel row"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(item.channel)}
                          className="p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                          aria-label="Edit row"
                        >
                          <Edit3 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border border-blue-100 bg-blue-50 text-blue-800 text-sm px-4 py-3 rounded-md flex items-start space-x-2">
            <span className="mt-0.5">
              <Zap size={14} />
            </span>
            <span>Auto-calculation: updates to monthly budgets will auto-adjust daily (~30x) and quarterly (~3x) allocations unless manually overridden.</span>
          </div>
        </div>
        )}

        {activeTab === 'goals' && (
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Target size={18} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Goals</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {performanceGoals.map((goal) => (
                <div key={goal.title} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">{goal.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{goal.target}</p>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold mt-2 ${
                      goal.status === 'At Risk' ? 'bg-red-50 text-red-700' : goal.status === 'Ahead' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {goal.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">{goal.detail}</p>
                  <p className="text-xs text-gray-500 mt-3">Owner: {goal.owner}</p>
                </div>
              ))}
            </div>
            <div className="border border-blue-100 bg-blue-50 text-blue-800 text-sm px-4 py-3 rounded-md flex items-start space-x-2">
              <span className="mt-0.5">
                <Zap size={14} />
              </span>
              <span>Tip: Link goals to allocation rules. Example: drop SMS budget if CTR &lt; 20% for 3 days; boost RCS if CPA &lt; ₹300.</span>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Clock3 size={18} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Budget History</h3>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Change</th>
                    <th className="px-4 py-3 text-left">By</th>
                    <th className="px-4 py-3 text-left">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {budgetHistory.map((item) => (
                    <tr key={item.date} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-900 font-medium">{item.date}</td>
                      <td className="px-4 py-3 text-gray-800">{item.action}</td>
                      <td className="px-4 py-3 text-gray-700">{item.by}</td>
                      <td className="px-4 py-3 text-gray-800">{item.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div className="flex items-center space-x-2 text-gray-700 text-sm">
                <BarChart2 size={16} />
                <p>Coming soon: trend lines for utilization, CPA, and pacing by channel.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <MessageSquare size={18} className="text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-900">Budget Copilot</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {chatSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => setChatInput(s)}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="h-64 overflow-y-auto space-y-2 border border-gray-100 rounded-md p-3 bg-gray-50">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex space-x-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask to rebalance budgets (e.g., shift 10% from SMS to WhatsApp)..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-md hover:bg-purple-700 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DailyBudget;
