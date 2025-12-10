import React, { useState } from 'react';
import { CalendarDays, RefreshCw, Download, Send, Activity, Target, Zap, BarChart3, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import ChatCanvas from './usecases/ChatCanvas';

const stats = [
  { label: 'Total Sent', value: '645,000', change: '+12.5% vs last month', positive: true, icon: Send },
  { label: 'Avg. CTR', value: '24.8%', change: '+2.1% vs last month', positive: true, icon: Activity },
  { label: 'Conversion Rate', value: '2.4%', change: '-0.5% vs last month', positive: false, icon: Target },
  { label: 'AIP Accuracy', value: '89.5%', change: '+1.2% vs last month', positive: true, icon: Zap },
];

const executiveSummary = [
  {
    useCase: 'Acquisition',
    campaign: 'PL - High Intent',
    sent: '150,000',
    delivered: '148,500',
    read: '118,000',
    clicked: '45,000',
    ctr: '30.3%',
    conv: '2.5%',
    aip: '92%',
    install: '12.5%',
  },
  {
    useCase: 'Cross-Sell',
    campaign: 'Gold Card Upgrade',
    sent: '80,000',
    delivered: '79,200',
    read: '65,000',
    clicked: '22,000',
    ctr: '27.8%',
    conv: '3.1%',
    aip: '88%',
    install: '8.2%',
  },
  {
    useCase: 'Retention',
    campaign: 'App Engagement',
    sent: '200,000',
    delivered: '198,000',
    read: '145,000',
    clicked: '58,000',
    ctr: '29.2%',
    conv: '1.8%',
    aip: '85%',
    install: '15.1%',
  },
  {
    useCase: 'Activation',
    campaign: 'Dormant User Wakeup',
    sent: '120,000',
    delivered: '115,000',
    read: '45,000',
    clicked: '12,000',
    ctr: '10.4%',
    conv: '0.9%',
    aip: '76%',
    install: '4.5%',
  },
];

const channelPerformance = [
  {
    channel: 'WhatsApp',
    sent: '320K',
    delivered: '310K',
    ctr: '30.3%',
    conv: '3.1%',
    aip: '92%',
    cpa: 'INR 1,285',
    trend: [73, 72, 75, 78, 74, 79],
    h1: 74.6,
    h2: 78.5,
  },
  {
    channel: 'SMS',
    sent: '210K',
    delivered: '204K',
    ctr: '27.8%',
    conv: '2.4%',
    aip: '88%',
    cpa: 'INR 1,310',
    trend: [25, 24, 26, 29, 27, 30],
    h1: 24.9,
    h2: 26.3,
  },
  {
    channel: 'RCS',
    sent: '115K',
    delivered: '112K',
    ctr: '19.2%',
    conv: '1.6%',
    aip: '85%',
    cpa: 'INR 1,295',
    trend: [9.7, 8.4, 6.5, 5.2, 4.5, 5.4],
    h1: 9.7,
    h2: 5.4,
  },
];

const trendBar = (values) => {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-10">
      {values.map((v, idx) => (
        <div
          key={idx}
          className="w-2 rounded-t-sm bg-blue-500"
          style={{ height: `${(v / max) * 100}%` }}
          title={`${v}%`}
        />
      ))}
    </div>
  );
};

const monthlyMonths = [
  "Oct '25",
  "Sep '25",
  "Aug '25",
  "Jul '25",
  "Jun '25",
  "May '25",
  "Apr '25",
  "Mar '25",
  "Feb '25",
  "Jan '25",
  "Dec '24",
  "Nov '24",
  "Oct '24",
];

const monthlyGroups = [
  {
    label: 'Mobile App Total',
    rows: [
      { name: 'I2L', values: [73, 72, 79, 82, 77, 69, 75, 77, 74, 83, 79, 78, 80], h1: 74.6, h2: 78.5 },
      { name: 'T2L', values: [27, 24, 24, 24, 27, 24, 25, 26, 26, 25, 28, 28, 28], h1: 24.9, h2: 26.3 },
      { name: 'L2FF', values: [74, 81, 81, 78, 69, 67, 71, 72, 71, 73, 73, 74, 73], h1: 74.2, h2: 72.7 },
      { name: 'FF2AIP', values: [3, 4, 3, 3, 7, 8, 9, 8, 7, 6, 6, 6, 6], h1: 4.5, h2: 7.0 },
      { name: 'L2AIP', values: [2, 3, 3, 2, 4, 6, 6, 6, 5, 4, 5, 5, 5], h1: 3.3, h2: 5.1 },
      { name: 'A2D', values: [4, 3, 3, 2, 1, 4, 4, 4, 5, 5, 5, 5, 5], h1: 2.5, h2: 4.6 },
    ],
  },
];

const badgeColor = (value, baseline) => {
  if (baseline === undefined) {
    if (value >= 70) return 'bg-green-50 text-green-700';
    if (value >= 40) return 'bg-gray-100 text-gray-800';
    return 'bg-red-50 text-red-600';
  }
  return value >= baseline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600';
};

const Reporting = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [chatPrompt, setChatPrompt] = useState('');
  const [showAssistantCard, setShowAssistantCard] = useState(true);

  const reportingSuggestions = [
    'Give me a weekly summary for reporting',
    'Highlight anomalies in this month’s KPIs',
    'Channel performance recap for leadership',
    'Top movers vs last month across channels',
    'Forecast next quarter KPIs from current trend',
    'Export-ready talking points for this report',
  ];

  const pageStyle = {
    width: '100%',
    maxWidth: '100%',
    ...(isChatOpen ? { paddingRight: '440px' } : {}),
  };

  return (
    <div className="space-y-6 relative transition-all" style={pageStyle}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Reporting Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive analytics and performance tracking.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <CalendarDays size={16} className="mr-2" />
            Oct 2025
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const ChangeIcon = stat.positive ? TrendingUp : TrendingDown;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <span
                  className={`inline-flex items-center mt-2 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    stat.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}
                >
                  <ChangeIcon size={12} className="mr-1" />
                  {stat.change}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon size={18} className="text-blue-600" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <BarChart3 size={18} className="text-blue-600" />
            <p className="text-sm font-semibold text-gray-900">Executive Summary</p>
          </div>
          <button className="text-sm text-blue-600 font-semibold hover:text-blue-800">View Details</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Use Case</th>
                <th className="px-4 py-3 text-left">Campaign</th>
                <th className="px-4 py-3 text-right">Sent</th>
                <th className="px-4 py-3 text-right">Delivered</th>
                <th className="px-4 py-3 text-right">Read</th>
                <th className="px-4 py-3 text-right">Clicked</th>
                <th className="px-4 py-3 text-right">CTR</th>
                <th className="px-4 py-3 text-right">Conv.</th>
                <th className="px-4 py-3 text-right">AIP</th>
                <th className="px-4 py-3 text-right">Install %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {executiveSummary.map((row) => (
                <tr key={row.campaign} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-900 font-medium">{row.useCase}</td>
                  <td className="px-4 py-3 text-gray-800">{row.campaign}</td>
                  <td className="px-4 py-3 text-right text-gray-900">{row.sent}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{row.delivered}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{row.read}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{row.clicked}</td>
                  <td className="px-4 py-3 text-right text-blue-700 font-semibold">{row.ctr}</td>
                  <td className="px-4 py-3 text-right text-green-700 font-semibold">{row.conv}</td>
                  <td className="px-4 py-3 text-right text-purple-700 font-semibold">{row.aip}</td>
                  <td className="px-4 py-3 text-right text-gray-800">{row.install}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <p className="text-sm font-semibold text-gray-900">Channel Performance & Trends</p>
          </div>
          <p className="text-xs text-gray-500">Last 6 months | H1/H2 averages benchmarked</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Channel</th>
                <th className="px-4 py-3 text-right">Sent</th>
                <th className="px-4 py-3 text-right">Delivered</th>
                <th className="px-4 py-3 text-right">CTR</th>
                <th className="px-4 py-3 text-right">Conv.</th>
                <th className="px-4 py-3 text-right">AIP</th>
                <th className="px-4 py-3 text-right">CPA</th>
                <th className="px-4 py-3 text-center">Trend (6 mo)</th>
                <th className="px-4 py-3 text-right">H1 Avg</th>
                <th className="px-4 py-3 text-right">H2 Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {channelPerformance.map((row) => {
                const delta = row.h2 - row.h1;
                const deltaColor = delta > 0 ? 'text-green-700' : delta < 0 ? 'text-red-600' : 'text-gray-700';
                const DeltaIcon = delta >= 0 ? TrendingUp : TrendingDown;
                return (
                  <tr key={row.channel} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900 font-semibold">{row.channel}</td>
                    <td className="px-4 py-3 text-right">{row.sent}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{row.delivered}</td>
                    <td className="px-4 py-3 text-right text-blue-700 font-semibold">{row.ctr}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-semibold">{row.conv}</td>
                    <td className="px-4 py-3 text-right text-purple-700 font-semibold">{row.aip}</td>
                    <td className="px-4 py-3 text-right text-gray-800">{row.cpa}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-end justify-center gap-1 h-12">{trendBar(row.trend)}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold">
                        {row.h1.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          delta > 0 ? 'bg-green-50 text-green-700' : delta < 0 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <DeltaIcon size={12} className="mr-1" />
                        {row.h2.toFixed(1)}%
                      </span>
                      <p className={`text-[11px] mt-1 ${deltaColor}`}>{delta >= 0 ? '+' : ''}{delta.toFixed(1)} pts vs H1</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingUp size={18} className="text-blue-600" />
            <p className="text-sm font-semibold text-gray-900">Monthly Performance Trends</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <RefreshCw size={16} className="hover:text-gray-600 cursor-pointer" />
            <Download size={16} className="hover:text-gray-600 cursor-pointer" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-amber-50 text-gray-800 uppercase text-xs">
                <th className="px-4 py-3 text-left">Channels</th>
                {monthlyMonths.map((m) => (
                  <th key={m} className="px-3 py-3 text-center">{m}</th>
                ))}
                <th className="px-3 py-3 text-center">H1-2025 Avg</th>
                <th className="px-3 py-3 text-center">H2-2024 Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyGroups.map((group) => (
                <React.Fragment key={group.label}>
                  <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <td colSpan={monthlyMonths.length + 3} className="px-4 py-2 font-semibold">{group.label}</td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.name} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.name}</td>
                      {row.values.map((val, idx) => (
                        <td key={idx} className="px-3 py-3 text-center text-gray-800">{val}%</td>
                      ))}
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${badgeColor(row.h1)}`}>
                          {row.h1.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${badgeColor(row.h2, row.h1)}`}>
                          {row.h2.toFixed(1)}%
                        </span>
                        <p className={`text-[11px] mt-1 ${row.h2 - row.h1 >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                          {row.h2 - row.h1 >= 0 ? '+' : ''}
                          {(row.h2 - row.h1).toFixed(1)} pts vs H1
                        </p>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAssistantCard && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Reporting Assistant</p>
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
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Sparkles size={14} className="text-blue-500" />
            Ask for summaries, anomalies, or export-ready insights. This chat is focused on reporting only.
          </p>
          <div className="flex flex-wrap gap-2">
            {reportingSuggestions.map((chip) => (
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
              onKeyDown={(e) => e.key === 'Enter' && chatPrompt.trim() && (() => {
                setInitialMessage(chatPrompt.trim());
                setIsChatOpen(true);
                setShowAssistantCard(false);
                setChatPrompt('');
              })()}
              placeholder="Ask the reporting assistant..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                if (!chatPrompt.trim()) return;
                setInitialMessage(chatPrompt.trim());
                setIsChatOpen(true);
                setShowAssistantCard(false);
                setChatPrompt('');
              }}
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
        useCaseName="Reporting Agent"
        inlineMode={false}
      />
    </div>
  );
};

export default Reporting;
