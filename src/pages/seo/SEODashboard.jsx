import React, { useState } from 'react';
import {
    FileSearch, SearchCheck, Lightbulb, PenTool, TrendingUp, LayoutDashboard,
    Plus, RefreshCw, Download, ExternalLink, CheckCircle, Clock, AlertCircle,
    ArrowUpRight, ArrowDownRight, Sparkles, ThumbsUp, ThumbsDown, Play, Pause, Eye
} from 'lucide-react';
import ChatCanvas from './usecases/ChatCanvas';

// ============ MOCK DATA ============
const seoProjects = [
    {
        id: 'seo-pl-content',
        name: 'Personal Loan Content Hub',
        status: 'Active',
        targetKeywords: 45,
        rankedTop10: 12,
        organicTraffic: '125K',
        contentPieces: 28,
        gaps: 8
    },
    {
        id: 'seo-cc-content',
        name: 'Credit Card SEO Initiative',
        status: 'Active',
        targetKeywords: 32,
        rankedTop10: 8,
        organicTraffic: '89K',
        contentPieces: 18,
        gaps: 5
    }
];

const seoKeywords = [
    { keyword: 'personal loan emi calculator', volume: '18,100', position: 2, change: '+3', page: '/personal-loan/emi-calculator', traffic: '12,450' },
    { keyword: 'home loan interest rates 2024', volume: '14,800', position: 4, change: '+2', page: '/home-loan/rates', traffic: '8,920' },
    { keyword: 'bajaj credit card benefits', volume: '9,200', position: 5, change: '+1', page: '/credit-card/benefits', traffic: '5,340' },
    { keyword: 'business loan eligibility', volume: '8,100', position: 8, change: '-2', page: '/business-loan/eligibility', traffic: '3,210' },
    { keyword: 'two wheeler loan documents', volume: '6,400', position: 12, change: '+5', page: '/two-wheeler/documents', traffic: '1,890' },
];

const seoGaps = [
    { keyword: 'personal loan for self employed', volume: '18,100', difficulty: 45, competitor: 'HDFC Bank', compRank: 1, ourRank: '-', priority: 'Critical' },
    { keyword: 'instant business loan online', volume: '14,800', difficulty: 52, competitor: 'ICICI Bank', compRank: 2, ourRank: 15, priority: 'High' },
    { keyword: 'home loan tax benefits calculator', volume: '12,400', difficulty: 38, competitor: 'SBI', compRank: 1, ourRank: '-', priority: 'High' },
    { keyword: 'credit card reward points value', volume: '9,200', difficulty: 42, competitor: 'Axis Bank', compRank: 1, ourRank: 18, priority: 'Medium' },
];

const seoRecommendations = [
    {
        id: 1,
        title: 'Create Self-Employed Personal Loan Guide',
        type: 'New Content',
        priority: 'Critical',
        potentialTraffic: '45,000/mo',
        roi: '₹8.5L',
        status: 'pending',
        description: 'Target "personal loan for self employed" keyword cluster. HDFC ranks #1, we have no content.',
    },
    {
        id: 2,
        title: 'Add Tax Benefits Calculator Tool',
        type: 'New Tool',
        priority: 'High',
        potentialTraffic: '32,000/mo',
        roi: '₹5.2L',
        status: 'pending',
        description: 'Interactive calculator for Section 80C/24(b) deductions. SBI has high-engagement tool.',
    },
    {
        id: 3,
        title: 'Expand Credit Card Benefits Page',
        type: 'Content Update',
        priority: 'High',
        potentialTraffic: '28,000/mo',
        roi: '₹3.8L',
        status: 'approved',
        description: 'Current page is 800 words, competitors avg 2,500. Add comparison tables and FAQs.',
    },
];

const seoExecutionQueue = [
    { id: 1, title: 'Credit Card Benefits Expansion', type: 'Content Update', status: 'In Progress', progress: 65, assignee: 'Content Team' },
    { id: 2, title: 'Self-Employed Loan Guide', type: 'New Content', status: 'Queued', progress: 0, assignee: 'Pending' },
    { id: 3, title: 'Meta Descriptions Update (45 pages)', type: 'Technical SEO', status: 'Completed', progress: 100, assignee: 'Auto' },
];

const seoPerformance = {
    organicTraffic: { value: '1.24M', change: '+18.5%', trend: 'up' },
    avgPosition: { value: '7.2', change: '-1.8 pos', trend: 'up' },
    ctr: { value: '4.8%', change: '+0.6%', trend: 'up' },
    impressions: { value: '25.8M', change: '+22.3%', trend: 'up' },
};

// ============ COMPONENT ============
const SEODashboard = () => {
    const tabs = [
        { id: 0, label: 'Overview', icon: LayoutDashboard },
        { id: 1, label: 'Content Analysis', icon: FileSearch },
        { id: 2, label: 'Gap Research', icon: SearchCheck },
        { id: 3, label: 'Recommendations', icon: Lightbulb },
        { id: 4, label: 'Execution', icon: PenTool },
        { id: 5, label: 'Performance', icon: TrendingUp },
    ];

    const [activeTab, setActiveTab] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [initialMessage, setInitialMessage] = useState('');
    const [recStatus, setRecStatus] = useState({});

    const seoSuggestions = [
        'What keywords should we target next?',
        'Summarize our top content gaps',
        'Which pages need optimization?',
        'Show competitor ranking movements',
    ];

    const handleRecAction = (id, action) => {
        setRecStatus(prev => ({ ...prev, [id]: action }));
    };

    // ============ TAB CONTENT ============
    const renderTabContent = () => {
        switch (activeTab) {
            case 0: // Overview
                return (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {Object.entries(seoPerformance).map(([key, data]) => (
                                <div key={key} className="bg-white border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <div className="flex items-end justify-between mt-1">
                                        <p className="text-2xl font-bold text-gray-900">{data.value}</p>
                                        <span className={`flex items-center text-sm font-medium ${data.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {data.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                            {data.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Projects */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-900">Active SEO Projects</p>
                                <button className="text-sm text-green-600 font-medium flex items-center gap-1">
                                    <Plus size={14} /> New Project
                                </button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {seoProjects.map(proj => (
                                    <div key={proj.id} className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                                        <div>
                                            <p className="font-medium text-gray-900">{proj.name}</p>
                                            <p className="text-sm text-gray-500">{proj.contentPieces} pages • {proj.targetKeywords} keywords</p>
                                        </div>
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="text-center">
                                                <p className="font-semibold text-green-600">{proj.rankedTop10}</p>
                                                <p className="text-xs text-gray-500">Top 10</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-blue-600">{proj.organicTraffic}</p>
                                                <p className="text-xs text-gray-500">Traffic</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-semibold text-orange-600">{proj.gaps}</p>
                                                <p className="text-xs text-gray-500">Gaps</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <Sparkles className="text-green-600" size={20} />
                                <div className="flex-1">
                                    <p className="font-medium text-green-900">SEO Assistant Ready</p>
                                    <p className="text-sm text-green-700">Ask for insights, recommendations, or competitor analysis.</p>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(true)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                                >
                                    Open Chat
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 1: // Content Analysis
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Tracked keywords and their performance</p>
                            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                                <RefreshCw size={14} /> Sync Data
                            </button>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Keyword</th>
                                        <th className="px-4 py-3 text-right">Volume</th>
                                        <th className="px-4 py-3 text-center">Position</th>
                                        <th className="px-4 py-3 text-center">Change</th>
                                        <th className="px-4 py-3 text-right">Traffic</th>
                                        <th className="px-4 py-3 text-left">Page</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {seoKeywords.map((kw, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{kw.keyword}</td>
                                            <td className="px-4 py-3 text-right text-gray-600">{kw.volume}</td>
                                            <td className="px-4 py-3 text-center font-semibold text-gray-900">#{kw.position}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`font-medium ${kw.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                                    {kw.change}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-600">{kw.traffic}</td>
                                            <td className="px-4 py-3 text-gray-500 flex items-center gap-1">
                                                {kw.page} <ExternalLink size={12} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 2: // Gap Research
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Keyword opportunities competitors rank for but we don't</p>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                <Sparkles size={14} /> Run Analysis
                            </button>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Keyword Gap</th>
                                        <th className="px-4 py-3 text-right">Volume</th>
                                        <th className="px-4 py-3 text-center">Difficulty</th>
                                        <th className="px-4 py-3 text-left">Top Competitor</th>
                                        <th className="px-4 py-3 text-center">Their Rank</th>
                                        <th className="px-4 py-3 text-center">Our Rank</th>
                                        <th className="px-4 py-3 text-center">Priority</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {seoGaps.map((gap, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{gap.keyword}</td>
                                            <td className="px-4 py-3 text-right text-gray-600">{gap.volume}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`font-semibold ${gap.difficulty <= 40 ? 'text-green-600' : gap.difficulty <= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {gap.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{gap.competitor}</td>
                                            <td className="px-4 py-3 text-center font-semibold">#{gap.compRank}</td>
                                            <td className="px-4 py-3 text-center text-gray-500">{gap.ourRank}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${gap.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                        gap.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {gap.priority}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 3: // Recommendations
                return (
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                            <Lightbulb className="text-blue-600" size={20} />
                            <div>
                                <p className="font-medium text-blue-900">Human Approval Required</p>
                                <p className="text-sm text-blue-700">Review AI recommendations before they go to execution.</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {seoRecommendations.map(rec => {
                                const status = recStatus[rec.id] || rec.status;
                                return (
                                    <div key={rec.id} className={`bg-white border rounded-lg p-4 ${status === 'approved' ? 'border-green-300 bg-green-50' :
                                            status === 'rejected' ? 'border-red-300 bg-red-50 opacity-60' : 'border-gray-200'
                                        }`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${rec.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                            rec.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                                                        }`}>{rec.priority}</span>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{rec.type}</span>
                                                </div>
                                                <p className="font-semibold text-gray-900">{rec.title}</p>
                                                <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                                                <div className="flex items-center gap-4 mt-2 text-sm">
                                                    <span className="text-green-600">Traffic: <strong>{rec.potentialTraffic}</strong></span>
                                                    <span className="text-blue-600">ROI: <strong>{rec.roi}</strong></span>
                                                </div>
                                            </div>
                                            {status === 'pending' ? (
                                                <div className="flex items-center gap-2 ml-4">
                                                    <button onClick={() => handleRecAction(rec.id, 'approved')} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                                                        <ThumbsUp size={14} /> Approve
                                                    </button>
                                                    <button onClick={() => handleRecAction(rec.id, 'rejected')} className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 text-gray-600 rounded text-sm hover:bg-gray-50">
                                                        <ThumbsDown size={14} /> Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`px-3 py-1.5 rounded text-sm font-medium ${status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {status === 'approved' ? <><CheckCircle size={14} className="inline mr-1" />Approved</> : 'Rejected'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );

            case 4: // Execution
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Content creation and publishing queue</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">3 items in queue</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {seoExecutionQueue.map(item => (
                                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded ${item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>{item.status}</span>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.type}</span>
                                            </div>
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                            <p className="text-sm text-gray-500">Assigned: {item.assignee}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.status === 'In Progress' && (
                                                <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"><Pause size={16} /></button>
                                            )}
                                            {item.status === 'Queued' && (
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded"><Play size={16} /></button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded"><Eye size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${item.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${item.progress}%` }} />
                                    </div>
                                    <p className="text-right text-xs text-gray-500 mt-1">{item.progress}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 5: // Performance
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-4">
                            {Object.entries(seoPerformance).map(([key, data]) => (
                                <div key={key} className="bg-white border border-gray-200 rounded-lg p-4">
                                    <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <div className="flex items-end justify-between mt-1">
                                        <p className="text-2xl font-bold text-gray-900">{data.value}</p>
                                        <span className={`flex items-center text-sm font-medium ${data.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {data.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                            {data.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-900">Top Performing Keywords</p>
                                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                                    <Download size={14} /> Export
                                </button>
                            </div>
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Keyword</th>
                                        <th className="px-4 py-3 text-center">Position</th>
                                        <th className="px-4 py-3 text-center">Change</th>
                                        <th className="px-4 py-3 text-right">Traffic</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {seoKeywords.slice(0, 5).map((kw, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{kw.keyword}</td>
                                            <td className="px-4 py-3 text-center font-semibold">#{kw.position}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`flex items-center justify-center gap-1 font-medium ${kw.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                                    {kw.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                    {kw.change}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-600">{kw.traffic}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

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
                    <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
                    <p className="text-gray-600 mt-1">Content optimization and organic traffic growth</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                        <RefreshCw size={16} /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                        <Download size={16} /> Export Report
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
                <div className="flex min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.id
                                        ? 'text-green-700 border-green-700 bg-green-50'
                                        : 'text-gray-700 border-transparent hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            {renderTabContent()}

            {/* SEO Assistant Card (when chat closed) */}
            {!isChatOpen && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">SEO Assistant</p>
                            <p className="text-xs text-green-600">Online & Ready</p>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="px-3 py-1 rounded-md bg-green-600 text-white text-xs font-semibold hover:bg-green-700"
                        >
                            Open Chat
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {seoSuggestions.map((chip) => (
                            <button
                                key={chip}
                                onClick={() => {
                                    setInitialMessage(chip);
                                    setIsChatOpen(true);
                                }}
                                className="px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-700 hover:border-green-300 hover:text-green-700"
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Chat Canvas */}
            <ChatCanvas
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                initialMessage={initialMessage}
                useCaseName="SEO Assistant"
                inlineMode={false}
            />
        </div>
    );
};

export default SEODashboard;
