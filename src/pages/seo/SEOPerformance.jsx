import React, { useState } from 'react';
import {
    TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Target,
    RefreshCw, Download, AlertTriangle, BarChart3, Sparkles, Eye,
    Activity, Search, MousePointer, Layers, Users, Database, Brain, Zap
} from 'lucide-react';
import ChatCanvas from '../usecases/ChatCanvas';

// === SEO Measurement Metrics (from documentation) ===
const measurementMetrics = [
    {
        metric: 'Ranking Change',
        source: 'Google Search Console',
        sourceIcon: Search,
        feedbackAction: 'Increase/decrease priority',
        yourEquivalent: 'Sends',
        value: '+12 keywords improved',
        trend: 'up'
    },
    {
        metric: 'Organic Traffic',
        source: 'GA4',
        sourceIcon: Activity,
        feedbackAction: 'Validate content impact',
        yourEquivalent: 'Clicks',
        value: '1.24M sessions',
        trend: 'up'
    },
    {
        metric: 'CTR',
        source: 'Google Search Console',
        sourceIcon: MousePointer,
        feedbackAction: 'Optimize meta descriptions',
        yourEquivalent: 'Leads',
        value: '4.8%',
        trend: 'up'
    },
    {
        metric: 'Impressions',
        source: 'Google Search Console',
        sourceIcon: Eye,
        feedbackAction: 'Validate keyword targeting',
        yourEquivalent: 'AIPs',
        value: '25.8M',
        trend: 'up'
    },
    {
        metric: 'Gap Coverage',
        source: 'Internal',
        sourceIcon: Target,
        feedbackAction: 'Track fix rate',
        yourEquivalent: 'Approvals',
        value: '67% closed',
        trend: 'up'
    },
    {
        metric: 'Competitor Movement',
        source: 'Ahrefs',
        sourceIcon: Users,
        feedbackAction: 'Alert on new threats',
        yourEquivalent: '-',
        value: '3 alerts',
        trend: 'neutral'
    }
];

// === SEO Outcomes (parallel to Campaign Outcomes) ===
const seoOutcomes = [
    { seoOutcome: 'Rankings', yourOutcome: 'Sends', value: '+18.5%', description: 'Keywords in top 10' },
    { seoOutcome: 'Organic Clicks', yourOutcome: 'Clicks', value: '245K', description: 'Monthly organic clicks' },
    { seoOutcome: 'Organic Conversions', yourOutcome: 'Leads', value: '12,450', description: 'Monthly conversions' },
    { seoOutcome: 'Gap Closure Rate', yourOutcome: 'AIPs', value: '78%', description: 'Gaps fixed this month' },
    { seoOutcome: 'Content Published', yourOutcome: 'Approvals', value: '24', description: 'Pages published' },
];

// === Performance Metrics ===
const metrics = [
    { label: 'Organic Traffic', value: '1.24M', change: '+18.5%', trend: 'up', subtext: 'vs last month' },
    { label: 'Avg. Position', value: '7.2', change: '-1.8 pos', trend: 'up', subtext: 'improved' },
    { label: 'Click-Through Rate', value: '4.8%', change: '+0.6%', trend: 'up', subtext: 'vs last month' },
    { label: 'Impressions', value: '25.8M', change: '+22.3%', trend: 'up', subtext: 'vs last month' },
];

// === Ranking Changes ===
const rankingChanges = [
    { keyword: 'personal loan emi calculator', prevRank: 5, newRank: 2, change: 3, traffic: '32,450', gscSource: true },
    { keyword: 'home loan interest rates 2024', prevRank: 6, newRank: 4, change: 2, traffic: '18,920', gscSource: true },
    { keyword: 'credit card benefits bajaj', prevRank: 8, newRank: 5, change: 3, traffic: '12,340', gscSource: true },
    { keyword: 'business loan eligibility', prevRank: 12, newRank: 8, change: 4, traffic: '8,450', gscSource: true },
    { keyword: 'two wheeler loan documentation', prevRank: 15, newRank: 18, change: -3, traffic: '4,230', gscSource: true },
];

// === Gap Coverage Progress ===
const gapCoverage = [
    { category: 'Critical Gaps', total: 12, fixed: 10, inProgress: 2, pending: 0, rate: 83 },
    { category: 'High Priority Gaps', total: 24, fixed: 18, inProgress: 4, pending: 2, rate: 75 },
    { category: 'Medium Priority Gaps', total: 45, fixed: 28, inProgress: 10, pending: 7, rate: 62 },
    { category: 'Technical Issues', total: 51, fixed: 45, inProgress: 4, pending: 2, rate: 88 },
];

// === Competitor Alerts ===
const competitorAlerts = [
    { competitor: 'HDFC Bank', alert: 'New content published', topic: 'Personal Loan for Doctors', impact: 'High', time: '2 hours ago', source: 'Ahrefs' },
    { competitor: 'ICICI Bank', alert: 'Ranking improved', topic: 'Home Loan EMI Calculator - Now #1', impact: 'Critical', time: '5 hours ago', source: 'Ahrefs' },
    { competitor: 'SBI', alert: 'Page updated', topic: 'Tax Benefits on Home Loan', impact: 'Medium', time: '1 day ago', source: 'Ahrefs' },
];

// === Model Improvements ===
const modelImprovements = [
    { improvement: 'Better Predictions', description: 'Calculator pages now weighted 3.2x higher for engagement', status: 'Applied' },
    { improvement: 'Refined Priorities', description: 'Self-employed content gaps moved to Critical', status: 'Applied' },
    { improvement: 'Updated Strategies', description: 'GEO optimization added to content workflow', status: 'Pending' },
];

const SEOPerformance = () => {
    const [timeRange, setTimeRange] = useState('30d');
    const [activeTab, setActiveTab] = useState('overview');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [initialMessage, setInitialMessage] = useState('');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'feedback', label: 'Feedback Loop', icon: RefreshCw },
        { id: 'rankings', label: 'Rankings', icon: TrendingUp },
        { id: 'gaps', label: 'Gap Coverage', icon: Target },
        { id: 'competitors', label: 'Competitors', icon: Users },
    ];

    const suggestions = [
        'Summarize this month\'s SEO performance',
        'Which keywords improved most?',
        'Show competitor movements',
        'What model improvements were made?',
    ];

    const pageStyle = {
        width: '100%',
        maxWidth: '100%',
        ...(isChatOpen ? { paddingRight: '440px' } : {}),
    };

    return (
        <div className="space-y-6 relative transition-all" style={pageStyle}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">SEO Performance</h1>
                    <p className="text-gray-600 mt-1">Measurement Layer — Feedback loop and model learning</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                        {['7d', '30d', '90d', '1y'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${timeRange === range ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                        <RefreshCw size={16} /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Unified Feedback Loop Diagram */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <RefreshCw className="text-blue-600" size={18} />
                    <span className="font-semibold text-gray-900">Unified Feedback & Learning</span>
                    <span className="text-xs text-gray-500">(Same pattern as "Learn Every Event")</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex-1 bg-white rounded-lg p-3 border border-gray-200 mr-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">SEO Outcomes</p>
                        <div className="flex flex-wrap gap-2">
                            {['Rankings', 'Organic Clicks', 'Conversions', 'Gap Rate', 'Published'].map((item) => (
                                <span key={item} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <ArrowDownRight size={20} className="text-gray-400" />
                        <ArrowUpRight size={20} className="text-gray-400" />
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3 border border-yellow-300 mx-2">
                        <div className="flex items-center gap-2">
                            <Database size={16} className="text-yellow-700" />
                            <span className="text-sm font-semibold text-yellow-800">GOLD LAYER</span>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">Updates</p>
                    </div>
                    <div className="flex flex-col items-center mx-4">
                        <ArrowDownRight size={20} className="text-gray-400" />
                        <ArrowUpRight size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-3 border border-gray-200 ml-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Model Improvements</p>
                        <div className="flex flex-wrap gap-2">
                            {['Better Predictions', 'Refined Priorities', 'Updated Strategies'].map((item) => (
                                <span key={item} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-4">
                {metrics.map((metric) => (
                    <div key={metric.label} className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-500">{metric.label}</p>
                        <div className="flex items-end justify-between mt-1">
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            <span className={`flex items-center text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {metric.change}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{metric.subtext}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex border-b border-gray-200 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'text-green-700 border-green-700 bg-green-50'
                                        : 'text-gray-600 border-transparent hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div>
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">SEO Measurement Metrics</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {measurementMetrics.map((m) => {
                                    const SourceIcon = m.sourceIcon;
                                    return (
                                        <div key={m.metric} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <SourceIcon size={16} />
                                                    </div>
                                                    <span className="font-semibold text-gray-900 text-sm">{m.metric}</span>
                                                </div>
                                                <span className={`text-sm font-medium ${m.trend === 'up' ? 'text-green-600' : m.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                                                    {m.value}
                                                </span>
                                            </div>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Source</span>
                                                    <span className="font-medium text-gray-700">{m.source}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Feedback Action</span>
                                                    <span className="font-medium text-blue-600">{m.feedbackAction}</span>
                                                </div>
                                                {m.yourEquivalent !== '-' && (
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Your Equivalent</span>
                                                        <span className="font-medium text-gray-700">{m.yourEquivalent}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Feedback Loop Tab */}
                    {activeTab === 'feedback' && (
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Outcomes Comparison */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Outcomes Comparison</h3>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">SEO Outcome</th>
                                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Your Equivalent</th>
                                                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Value</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {seoOutcomes.map((o) => (
                                                    <tr key={o.seoOutcome}>
                                                        <td className="px-4 py-2">
                                                            <p className="font-medium text-gray-900">{o.seoOutcome}</p>
                                                            <p className="text-xs text-gray-500">{o.description}</p>
                                                        </td>
                                                        <td className="px-4 py-2 text-gray-600">{o.yourOutcome}</td>
                                                        <td className="px-4 py-2 text-right font-semibold text-green-600">{o.value}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Model Improvements */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Model Improvements</h3>
                                    <div className="space-y-3">
                                        {modelImprovements.map((m) => (
                                            <div key={m.improvement} className="border border-gray-200 rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <Brain size={14} className="text-purple-600" />
                                                        <span className="font-medium text-gray-900 text-sm">{m.improvement}</span>
                                                    </div>
                                                    <span className={`text-xs px-2 py-0.5 rounded ${m.status === 'Applied' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>{m.status}</span>
                                                </div>
                                                <p className="text-xs text-gray-600">{m.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Rankings Tab */}
                    {activeTab === 'rankings' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Keyword</th>
                                        <th className="px-4 py-3 text-center">Previous</th>
                                        <th className="px-4 py-3 text-center">Current</th>
                                        <th className="px-4 py-3 text-center">Change</th>
                                        <th className="px-4 py-3 text-right">Traffic</th>
                                        <th className="px-4 py-3 text-center">Source</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {rankingChanges.map((item) => (
                                        <tr key={item.keyword} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{item.keyword}</td>
                                            <td className="px-4 py-3 text-center text-gray-500">#{item.prevRank}</td>
                                            <td className="px-4 py-3 text-center font-semibold">#{item.newRank}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`flex items-center justify-center gap-1 font-medium ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {item.change > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                    {item.change > 0 ? '+' : ''}{item.change}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-600">{item.traffic}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">GSC</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Gap Coverage Tab */}
                    {activeTab === 'gaps' && (
                        <div className="p-4">
                            <div className="space-y-4">
                                {gapCoverage.map((cat) => (
                                    <div key={cat.category} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-gray-900">{cat.category}</span>
                                            <span className="text-sm font-semibold text-green-600">{cat.rate}% closed</span>
                                        </div>
                                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex mb-2">
                                            <div className="bg-green-500 h-full" style={{ width: `${(cat.fixed / cat.total) * 100}%` }} />
                                            <div className="bg-blue-400 h-full" style={{ width: `${(cat.inProgress / cat.total) * 100}%` }} />
                                        </div>
                                        <div className="flex items-center gap-6 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full" /> Fixed: {cat.fixed}</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full" /> In Progress: {cat.inProgress}</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-gray-200 rounded-full" /> Pending: {cat.pending}</span>
                                            <span>Total: {cat.total}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Competitors Tab */}
                    {activeTab === 'competitors' && (
                        <div className="p-4">
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                                <AlertTriangle size={16} className="text-orange-600 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-orange-800">Competitor Movement Alerts</p>
                                    <p className="text-xs text-orange-700">Data source: Ahrefs API - Triggers feedback action: "Alert on new threats"</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {competitorAlerts.map((alert, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold text-gray-900">{alert.competitor}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded ${alert.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                                                            alert.impact === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>{alert.impact}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{alert.alert}</p>
                                                <p className="text-xs text-gray-500 mt-1">{alert.topic}</p>
                                            </div>
                                            <div className="text-right text-xs text-gray-500">
                                                <p>{alert.time}</p>
                                                <span className="text-blue-600">{alert.source}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* SEO Copilot */}
            {!isChatOpen && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-green-600" size={18} />
                            <span className="text-sm font-semibold text-gray-900">SEO Copilot</span>
                            <span className="text-xs text-green-600">Online</span>
                        </div>
                        <button onClick={() => setIsChatOpen(true)} className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                            Open Chat
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((s) => (
                            <button key={s} onClick={() => { setInitialMessage(s); setIsChatOpen(true); }}
                                className="px-3 py-1 border border-gray-200 rounded-full text-xs text-gray-700 hover:border-green-300 hover:text-green-700">
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <ChatCanvas isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} initialMessage={initialMessage} useCaseName="SEO Copilot" inlineMode={false} />
        </div>
    );
};

export default SEOPerformance;
