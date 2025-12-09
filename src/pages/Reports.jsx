import React, { useMemo, useState } from 'react';
import { Sparkles, Wand2, MessageSquare, Search, ArrowRight, Users, Target } from 'lucide-react';

const suggestedSegments = [
  {
    title: 'High-Value Prospects',
    tags: ['High Intent'],
    category: 'High Intent',
    description: 'CIBIL > 750, visited PL page, no active loan',
    size: '~35K users',
    sizeNum: 35000,
    bestChannel: 'WhatsApp',
    peak: '10-11 AM',
    cpa: '₹270',
    query: 'Show me users with CIBIL > 750 who visited the Personal Loan page in the last 7 days but have no active loan.',
  },
  {
    title: 'Dormant Users',
    tags: ['Re-engagement'],
    category: 'Re-engagement',
    description: 'No activity in last 30 days, high engagement before',
    size: '~24K users',
    sizeNum: 24000,
    bestChannel: 'SMS',
    peak: '12-2 PM',
    cpa: '₹320',
    query: 'Find dormant users with no activity in 30+ days but high engagement previously.',
  },
  {
    title: 'Insurance Ready',
    tags: ['Cross-sell'],
    category: 'Cross-sell',
    description: 'Has loans & insurance, metro city',
    size: '~18K users',
    sizeNum: 18000,
    bestChannel: 'RCS',
    peak: '6-8 PM',
    cpa: '₹295',
    query: 'Users with an active loan and insurance who live in metro cities.',
  },
  {
    title: 'Cart Abandoners',
    tags: ['High Intent'],
    category: 'High Intent',
    description: 'Visited cart, dropped at payment',
    size: '~12K users',
    sizeNum: 12000,
    bestChannel: 'WhatsApp',
    peak: '9-11 AM',
    cpa: '₹260',
    query: 'People who added a loan to cart but dropped at payment in the last 3 days.',
  },
  {
    title: 'Gold Loan Seekers',
    tags: ['High Intent'],
    category: 'Emerging',
    description: 'Searched gold loan, visited page 3+ times',
    size: '~28K users',
    sizeNum: 28000,
    bestChannel: 'WhatsApp',
    peak: '5-7 PM',
    cpa: '₹250',
    query: 'Users searching gold loan who visited the product page 3+ times this week.',
  },
];

const insightSuggestions = [
  'Best channel for this segment?',
  'Show me conversion rate by device',
  'Which cohort has highest engagement?',
  'Segments to test next month',
  'Suggest campaign optimizations',
];

const Reports = () => {
  const [audienceQuery, setAudienceQuery] = useState('');
  const [insightQuery, setInsightQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Tell me your ideal audience. I will build the segment and estimate size.' },
  ]);
  const [audiencePreview, setAudiencePreview] = useState({
    size: '24K users',
    reach: '18K reachable',
    estCTR: '4.2% CTR',
    bestChannel: 'WhatsApp',
    peakTime: '10-11 AM',
    cpa: '₹285',
  });
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [segmentResult, setSegmentResult] = useState({
    sizeNum: 24000,
    breakdown: [
      { label: 'High Intent', value: '65%' },
      { label: 'WhatsApp Preferred', value: '80%' },
      { label: 'Android Users', value: '92%' },
      { label: 'Metro Cities', value: '58%' },
    ],
    recommendation: 'WhatsApp yields 2.3x higher engagement for this segment. Projected AIP: 42%.',
    sql: "SELECT user_id FROM users WHERE cibil_score > 720 AND salary > 60000 AND last_app_open <= 14;",
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const categories = ['All', 'High Intent', 'Re-engagement', 'Cross-sell', 'Emerging', 'Channel Optimization'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [audienceSize, setAudienceSize] = useState(24000);
  const [successMessage, setSuccessMessage] = useState('');

  const formatSize = (num) => {
    if (!num) return '—';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M users`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K users`;
    return `${num.toLocaleString()} users`;
  };

  const previewSummary = useMemo(
    () => ({
      ...audiencePreview,
      sizeFormatted: formatSize(segmentResult.sizeNum),
    }),
    [audiencePreview, segmentResult]
  );

  const handleSend = () => {
    if (!audienceQuery.trim()) return;
    setStatus('loading');
    setSuccessMessage('');
    setMessages((prev) => [...prev, { id: Date.now(), type: 'user', text: audienceQuery }]);
    setAudienceQuery('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'ai',
          text: 'Got it. Estimated 24K users. Suggested filters: CIBIL > 720, salary > ₹60K, last app open < 14d.',
        },
      ]);
      const sizeNum =
        selectedSuggestion?.sizeNum ||
        (10000 + Math.floor(Math.random() * 50000));
      const bestChannel = selectedSuggestion?.bestChannel || 'WhatsApp';
      const peak = selectedSuggestion?.peak || '10-11 AM';
      const cpa = selectedSuggestion?.cpa || '₹270';
      const breakdown = [
        { label: 'High Intent', value: '65%' },
        { label: 'WhatsApp Preferred', value: '80%' },
        { label: 'Android Users', value: '92%' },
        { label: 'Metro Cities', value: '58%' },
      ];
      setAudiencePreview({
        size: `${(sizeNum / 1000).toFixed(0)}K users`,
        reach: `${Math.round(sizeNum * 0.75 / 1000)}K reachable`,
        estCTR: '4.8% CTR',
        bestChannel,
        peakTime: peak,
        cpa,
      });
      setSegmentResult({
        sizeNum,
        breakdown,
        recommendation: `AI Recommendation: ${bestChannel} yields higher engagement; consider allocating +5% budget. Projected CPA around ${cpa}.`,
        sql: `-- Generated segment\nSELECT user_id\nFROM users\nWHERE cibil_score > 720\n  AND salary > 60000\n  AND last_app_open_days <= 14\n  AND channel_pref = '${bestChannel.toLowerCase()}'\nLIMIT ${sizeNum};`,
      });
      setAudienceSize(sizeNum);
      setStatus('success');
      setSuccessMessage(`Segment created successfully! Found ${sizeNum.toLocaleString()} matching users.`);
    }, 600);
  };

  const handleInsightSend = () => {
    if (!insightQuery.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), type: 'user', text: insightQuery }]);
    setInsightQuery('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: 'ai',
          text: 'Engagement peak: 10-11 AM on WhatsApp; CPA best on RCS at ₹285. Try increasing RCS budget by 5%.',
        },
      ]);
      setStatus('success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ad-Hoc Audience Creator</h1>
          <p className="text-gray-600 mt-1">Describe your target audience in plain English, and let AI build the segment.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Define Audience</p>
                <button className="inline-flex items-center space-x-2 px-3 py-1.5 text-xs bg-purple-50 text-purple-700 rounded-md border border-purple-100">
                <Sparkles size={14} />
                <span>AI Assist</span>
              </button>
            </div>
            <textarea
              value={audienceQuery}
              onChange={(e) => setAudienceQuery(e.target.value)}
              rows={3}
              placeholder="e.g., Show me users with CIBIL > 750 who visited the Gold Loan page in the last 2 days but haven't applied yet."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSend}
                disabled={status === 'loading' || !audienceQuery.trim()}
                className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                  status === 'loading' || !audienceQuery.trim()
                    ? 'bg-blue-300 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Wand2 size={16} />
                <span>{status === 'loading' ? 'AI is Analyzing...' : 'Generate Segment'}</span>
              </button>
            </div>
            {successMessage && status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-md p-3">
                {successMessage}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Suggested Segments</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>Filters:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-1 rounded-full border text-xs ${
                      selectedCategory === cat
                        ? 'border-blue-500 text-blue-700 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {suggestedSegments
                .filter((seg) => selectedCategory === 'All' || seg.category === selectedCategory)
                .map((seg) => (
                <div key={seg.title} className="border border-gray-200 rounded-lg p-3 flex items-start justify-between hover:border-blue-200 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{seg.title}</p>
                    <div className="flex gap-1">
                      {seg.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{seg.description}</p>
                  <p className="text-xs text-gray-500">{seg.size}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedSuggestion(seg);
                    setAudienceQuery(seg.query);
                    setStatus('idle');
                  }}
                  className="text-blue-600 text-xs font-semibold hover:text-blue-800 inline-flex items-center space-x-1"
                >
                  <span>Use this template</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
              {suggestedSegments.filter((seg) => selectedCategory === 'All' || seg.category === selectedCategory).length === 0 && (
                <p className="text-sm text-gray-500 px-3 py-2">No templates for this filter.</p>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <MessageSquare size={18} className="text-purple-600" />
              <p className="text-sm font-semibold text-gray-900">AI Conversation & Insights</p>
            </div>
            <div className="h-56 border border-gray-100 rounded-md p-3 bg-gray-50 overflow-y-auto space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                      msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {insightSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInsightQuery(s)}
                  className="px-3 py-1.5 text-xs rounded-full border border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleInsightSend(); }} className="flex gap-2">
              <input
                value={insightQuery}
                onChange={(e) => setInsightQuery(e.target.value)}
                placeholder="Ask me anything about segments, performance, or optimization..."
                className="flex-1 px-3 py-2 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Ask AI
              </button>
            </form>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm bg-gray-50 border border-gray-200 rounded-md p-3">
              <div>
                <p className="text-gray-500">Avg/Peak CTR</p>
                <p className="font-semibold">4.2%</p>
              </div>
              <div>
                <p className="text-gray-500">Best Channel</p>
                <p className="font-semibold">WhatsApp</p>
              </div>
              <div>
                <p className="text-gray-500">Peak Time</p>
                <p className="font-semibold">10-11 AM</p>
              </div>
              <div>
                <p className="text-gray-500">Cost per AIP</p>
                <p className="font-semibold">₹285</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
          <div className="flex items-center space-x-2">
            <Search size={16} className="text-blue-600" />
            <p className="text-sm font-semibold text-gray-900">Audience Preview</p>
          </div>
          <p className="text-sm text-gray-600">Enter a query to see audience estimates or pick a suggested segment.</p>
          <div className="space-y-3">
            <div className="rounded-md bg-blue-50 border border-blue-100 p-4 text-sm text-blue-900 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <div>
                    <p className="text-xs text-blue-800">Est. Size</p>
                    <p className="font-semibold text-blue-900">{previewSummary.sizeFormatted}</p>
                    <p className="text-xs text-blue-800">{segmentResult.sizeNum.toLocaleString()} users (exact)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-blue-800">Reach / CTR</p>
                  <p className="font-semibold text-blue-900">{audiencePreview.reach} · {audiencePreview.estCTR}</p>
                </div>
              </div>
              <div className="text-xs text-blue-800">
                Best channel: <span className="font-semibold">{audiencePreview.bestChannel}</span> · Peak time:{' '}
                <span className="font-semibold">{audiencePreview.peakTime}</span> · CPA:{' '}
                <span className="font-semibold">{audiencePreview.cpa}</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-blue-100 rounded-md p-3 text-sm text-blue-900 space-y-3">
            <p className="font-semibold text-gray-900">Segment Breakdown</p>
            <div className="space-y-2 text-sm text-gray-800">
              {segmentResult.breakdown.map((row) => {
                const pct = parseInt(row.value, 10) || 0;
                return (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs">
                      <span>{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-gray-700 mt-2">
              {segmentResult.recommendation}
            </div>
            <div className="mt-3 space-y-2">
              <p className="font-semibold text-gray-900">How this segment was generated</p>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                <li>Filters applied: CIBIL &gt; 720, salary &gt; INR 60K, last app open &lt; 14d</li>
                <li>Channel preference and behavior signals pulled from user profile</li>
                <li>AI estimated size and optimized channel based on historic performance</li>
              </ul>
              <div className="text-xs text-gray-700">
                <p className="font-semibold mb-1">SQL (demo)</p>
                <pre className="bg-gray-100 border border-gray-200 rounded-md p-2 overflow-x-auto text-[11px] leading-5 text-gray-800 whitespace-pre-wrap">
{segmentResult.sql}
                </pre>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-700 space-y-1">
            <p className="font-semibold text-gray-900">Tips</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Be specific: include CIBIL score, geography, behaviors.</li>
              <li>Use natural language: "users who..."</li>
              <li>Combine conditions: "visited X AND NOT Y"</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Reports;
