import React, { useState } from 'react';
import {
    FileSearch, Database, RefreshCw, ExternalLink, CheckCircle,
    AlertCircle, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
    Globe, FileText, Link2, Sparkles
} from 'lucide-react';
import ChatCanvas from '../usecases/ChatCanvas';

// === Data Sources ===
const dataSources = [
    { name: 'Google Search Console', status: 'Connected', lastSync: '2 min ago', records: '45,230', icon: Globe },
    { name: 'Google Analytics 4', status: 'Connected', lastSync: '5 min ago', records: '1.2M', icon: TrendingUp },
    { name: 'Ahrefs API', status: 'Connected', lastSync: '1 hour ago', records: '8,450', icon: Link2 },
    { name: 'CMS (Bajaj Blog)', status: 'Connected', lastSync: '15 min ago', records: '156', icon: FileText },
];

// === Content Inventory ===
const contentInventory = [
    { page: '/personal-loan', title: 'Personal Loan - Apply Online', words: 2450, lastUpdated: '2 days ago', status: 'Optimized', traffic: '45,200' },
    { page: '/home-loan/emi-calculator', title: 'Home Loan EMI Calculator', words: 1820, lastUpdated: '1 week ago', status: 'Optimized', traffic: '38,400' },
    { page: '/credit-card/benefits', title: 'Credit Card Benefits', words: 890, lastUpdated: '3 weeks ago', status: 'Needs Update', traffic: '22,100' },
    { page: '/business-loan', title: 'Business Loan for SMEs', words: 1540, lastUpdated: '5 days ago', status: 'Optimized', traffic: '18,900' },
    { page: '/two-wheeler-loan', title: 'Two Wheeler Loan', words: 720, lastUpdated: '1 month ago', status: 'Needs Update', traffic: '12,300' },
];

// === Keyword Rankings ===
const keywordRankings = [
    { keyword: 'personal loan emi calculator', position: 2, change: '+3', volume: '18,100', traffic: '12,450', ctr: '8.2%' },
    { keyword: 'home loan interest rates 2024', position: 4, change: '+2', volume: '14,800', traffic: '8,920', ctr: '6.1%' },
    { keyword: 'bajaj credit card apply', position: 5, change: '+1', volume: '9,200', traffic: '5,340', ctr: '5.8%' },
    { keyword: 'business loan eligibility', position: 8, change: '-2', volume: '8,100', traffic: '3,210', ctr: '4.0%' },
    { keyword: 'two wheeler loan documents', position: 12, change: '+5', volume: '6,400', traffic: '1,890', ctr: '3.0%' },
];

// === Health Metrics ===
const healthMetrics = [
    { label: 'Organic Traffic', value: '1.24M', change: '+18.5%', trend: 'up' },
    { label: 'Indexed Pages', value: '156', change: '+12', trend: 'up' },
    { label: 'Avg. Position', value: '7.2', change: '-1.8', trend: 'up' },
    { label: 'Keywords Top 10', value: '45', change: '+8', trend: 'up' },
];

const SEOContentAnalysis = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [initialMessage, setInitialMessage] = useState('');

    const suggestions = [
        'Show content needing updates',
        'Which pages have declining traffic?',
        'Summarize keyword performance',
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
                    <h1 className="text-3xl font-bold text-gray-900">Content Analysis</h1>
                    <p className="text-gray-600 mt-1">Data Layer — SEO data sources synced to Gold Layer</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                        <RefreshCw size={16} /> Sync All
                    </button>
                </div>
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-4 gap-4">
                {healthMetrics.map((metric) => (
                    <div key={metric.label} className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-500">{metric.label}</p>
                        <div className="flex items-end justify-between mt-1">
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                            <span className={`flex items-center text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {metric.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Data Sources */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Database size={16} className="text-green-600" />
                        <span className="text-sm font-semibold text-gray-900">Data Sources</span>
                    </div>
                    <span className="text-xs text-gray-500">4 sources connected</span>
                </div>
                <div className="grid grid-cols-4 divide-x divide-gray-100">
                    {dataSources.map((source) => {
                        const Icon = source.icon;
                        return (
                            <div key={source.name} className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-900">{source.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
                                    <CheckCircle size={12} /> {source.status}
                                </div>
                                <p className="text-xs text-gray-500">Last sync: {source.lastSync}</p>
                                <p className="text-xs text-gray-500">{source.records} records</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content Inventory */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileSearch size={16} className="text-green-600" />
                        <span className="text-sm font-semibold text-gray-900">Content Inventory</span>
                    </div>
                    <span className="text-xs text-gray-500">{contentInventory.length} pages tracked</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">Page</th>
                                <th className="px-4 py-3 text-right">Words</th>
                                <th className="px-4 py-3 text-left">Last Updated</th>
                                <th className="px-4 py-3 text-center">Status</th>
                                <th className="px-4 py-3 text-right">Traffic</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {contentInventory.map((item) => (
                                <tr key={item.page} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-gray-900">{item.title}</p>
                                        <p className="text-xs text-gray-500">{item.page}</p>
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">{item.words}</td>
                                    <td className="px-4 py-3 text-gray-500">{item.lastUpdated}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${item.status === 'Optimized' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>{item.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-900 font-medium">{item.traffic}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button className="text-gray-400 hover:text-gray-600"><ExternalLink size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Keyword Rankings */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-green-600" />
                        <span className="text-sm font-semibold text-gray-900">Top Keyword Rankings</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">Keyword</th>
                                <th className="px-4 py-3 text-center">Position</th>
                                <th className="px-4 py-3 text-center">Change</th>
                                <th className="px-4 py-3 text-right">Volume</th>
                                <th className="px-4 py-3 text-right">Traffic</th>
                                <th className="px-4 py-3 text-right">CTR</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {keywordRankings.map((kw) => (
                                <tr key={kw.keyword} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{kw.keyword}</td>
                                    <td className="px-4 py-3 text-center font-semibold">#{kw.position}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`flex items-center justify-center gap-1 font-medium ${kw.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                            {kw.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                            {kw.change}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">{kw.volume}</td>
                                    <td className="px-4 py-3 text-right text-gray-900 font-medium">{kw.traffic}</td>
                                    <td className="px-4 py-3 text-right text-gray-600">{kw.ctr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* SEO Assistant */}
            {!isChatOpen && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Sparkles className="text-green-600" size={18} />
                            <span className="text-sm font-semibold text-gray-900">SEO Assistant</span>
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

            <ChatCanvas isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} initialMessage={initialMessage} useCaseName="SEO Assistant" inlineMode={false} />
        </div>
    );
};

export default SEOContentAnalysis;
