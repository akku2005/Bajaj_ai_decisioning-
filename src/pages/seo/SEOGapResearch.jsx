import React, { useState } from 'react';
import {
    SearchCheck, Target, AlertTriangle, TrendingUp, Globe, FileText,
    ArrowUpRight, ArrowDownRight, ExternalLink, Sparkles, Filter, RefreshCw,
    Bot, Zap, Search, Code, Eye, BarChart3, CheckCircle, Clock, Play
} from 'lucide-react';
import ChatCanvas from '../usecases/ChatCanvas';

// === SEO Research Agents ===
const seoAgents = [
    {
        id: 'crawler',
        name: 'Competitor Crawler',
        icon: Globe,
        status: 'Active',
        description: 'Fetches competitor pages and extracts content',
        input: 'URLs',
        output: 'Raw HTML/Content',
        lastRun: '5 min ago',
        itemsProcessed: 156
    },
    {
        id: 'extractor',
        name: 'Content Extractor',
        icon: FileText,
        status: 'Active',
        description: 'Structures content into topics, keywords, FAQs',
        input: 'Raw HTML',
        output: 'Topics, Keywords, FAQs',
        lastRun: '5 min ago',
        itemsProcessed: 142
    },
    {
        id: 'keyword',
        name: 'Keyword Research',
        icon: Search,
        status: 'Active',
        description: 'Finds keyword opportunities and gaps',
        input: 'Your keywords',
        output: 'Gap keywords',
        lastRun: '10 min ago',
        itemsProcessed: 1245
    },
    {
        id: 'auditor',
        name: 'Technical Auditor',
        icon: Code,
        status: 'Idle',
        description: 'Checks technical SEO issues on pages',
        input: 'Page URL',
        output: 'Issues list',
        lastRun: '1 hour ago',
        itemsProcessed: 156
    },
    {
        id: 'geo',
        name: 'GEO Analyzer',
        icon: Eye,
        status: 'Active',
        description: 'Analyzes AI chatbot visibility (GEO)',
        input: 'Content',
        output: 'GEO Score',
        lastRun: '15 min ago',
        itemsProcessed: 89
    },
    {
        id: 'scorer',
        name: 'Opportunity Scorer',
        icon: BarChart3,
        status: 'Active',
        description: 'Prioritizes gaps by ROI potential',
        input: 'All gaps',
        output: 'Ranked priorities',
        lastRun: '5 min ago',
        itemsProcessed: 156
    },
];

// === Competitor Crawl Results ===
const competitorData = [
    { competitor: 'HDFC Bank', pagesAnalyzed: 45, topics: 128, keywords: 890, lastCrawl: '2 hours ago' },
    { competitor: 'ICICI Bank', pagesAnalyzed: 38, topics: 95, keywords: 720, lastCrawl: '3 hours ago' },
    { competitor: 'SBI', pagesAnalyzed: 52, topics: 156, keywords: 1120, lastCrawl: '1 hour ago' },
    { competitor: 'Axis Bank', pagesAnalyzed: 32, topics: 78, keywords: 540, lastCrawl: '4 hours ago' },
];

// === Keyword Gaps (from Keyword Research Agent) ===
const keywordGaps = [
    { keyword: 'personal loan for self employed', volume: '18,100', difficulty: 45, competitor: 'HDFC Bank', compRank: 1, ourRank: '-', geoScore: 82, priority: 'Critical', opportunity: '₹8.5L' },
    { keyword: 'instant business loan online', volume: '14,800', difficulty: 52, competitor: 'ICICI Bank', compRank: 2, ourRank: 15, geoScore: 75, priority: 'High', opportunity: '₹5.2L' },
    { keyword: 'home loan tax benefits calculator', volume: '12,400', difficulty: 38, competitor: 'SBI', compRank: 1, ourRank: '-', geoScore: 88, priority: 'High', opportunity: '₹4.8L' },
    { keyword: 'credit card reward points value', volume: '9,200', difficulty: 42, competitor: 'Axis Bank', compRank: 1, ourRank: 18, geoScore: 65, priority: 'Medium', opportunity: '₹3.2L' },
    { keyword: 'two wheeler loan emi calculator', volume: '7,600', difficulty: 35, competitor: 'Hero FinCorp', compRank: 2, ourRank: '-', geoScore: 70, priority: 'Medium', opportunity: '₹2.8L' },
];

// === Content Gaps (from Content Extractor) ===
const contentGaps = [
    { topic: 'Self-Employed Loan Guide', type: 'Missing Content', competitors: 4, avgWords: 3200, faqs: 15, estTraffic: '45K/mo' },
    { topic: 'Home Loan Tax Benefits Section', type: 'Missing Section', competitors: 3, avgWords: 1800, faqs: 8, estTraffic: '32K/mo' },
    { topic: 'Credit Card Comparison Tool', type: 'Missing Tool', competitors: 5, avgWords: '-', faqs: 12, estTraffic: '28K/mo' },
    { topic: 'Business Loan Eligibility Calculator', type: 'Missing Tool', competitors: 3, avgWords: '-', faqs: 6, estTraffic: '22K/mo' },
];

// === Technical Issues (from Technical Auditor) ===
const technicalIssues = [
    { issue: 'Missing meta descriptions', count: 12, severity: 'High', impact: 'CTR affected', pages: ['/personal-loan', '/home-loan', '/credit-card'] },
    { issue: 'Slow page speed (>3s)', count: 8, severity: 'High', impact: 'Rankings affected', pages: ['/emi-calculator', '/apply-now'] },
    { issue: 'Missing H1 tags', count: 5, severity: 'Medium', impact: 'SEO structure', pages: ['/about', '/contact'] },
    { issue: 'Broken internal links', count: 3, severity: 'Low', impact: 'User experience', pages: ['/blog/old-post'] },
    { issue: 'Missing alt text', count: 23, severity: 'Low', impact: 'Accessibility', pages: ['Multiple pages'] },
];

// === GEO Analysis Results ===
const geoAnalysis = [
    { page: '/personal-loan', geoScore: 85, aiMentions: 12, citationPotential: 'High', recommendation: 'Add FAQ schema' },
    { page: '/home-loan/emi-calculator', geoScore: 92, aiMentions: 28, citationPotential: 'Very High', recommendation: 'Optimized' },
    { page: '/credit-card/benefits', geoScore: 58, aiMentions: 3, citationPotential: 'Low', recommendation: 'Add structured data' },
    { page: '/business-loan', geoScore: 72, aiMentions: 8, citationPotential: 'Medium', recommendation: 'Expand content' },
];

// === Stats ===
const stats = [
    { label: 'Keyword Gaps', value: '156', icon: Search, color: 'text-blue-600 bg-blue-50' },
    { label: 'Content Gaps', value: '24', icon: FileText, color: 'text-orange-600 bg-orange-50' },
    { label: 'Technical Issues', value: '51', icon: Code, color: 'text-red-600 bg-red-50' },
    { label: 'Opportunity Value', value: '₹24.5L', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
];

const SEOGapResearch = () => {
    const [activeTab, setActiveTab] = useState('agents');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [initialMessage, setInitialMessage] = useState('');

    const tabs = [
        { id: 'agents', label: 'Research Agents', icon: Bot },
        { id: 'keywords', label: 'Keyword Gaps', icon: Search },
        { id: 'content', label: 'Content Gaps', icon: FileText },
        { id: 'technical', label: 'Technical Issues', icon: Code },
        { id: 'geo', label: 'GEO Analysis', icon: Eye },
    ];

    const suggestions = [
        'What are our top priority gaps?',
        'Show competitor content analysis',
        'Which gaps have highest ROI?',
        'Run full gap analysis now',
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
                    <h1 className="text-3xl font-bold text-gray-900">Gap Research</h1>
                    <p className="text-gray-600 mt-1">Intelligence Layer — SEO Research Agents analyzing competitor gaps</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                        <Filter size={16} /> Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                        <Play size={16} /> Run All Agents
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                                <Icon size={20} />
                            </div>
                        </div>
                    );
                })}
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
                    {/* Research Agents Tab */}
                    {activeTab === 'agents' && (
                        <div className="p-4">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {seoAgents.map((agent) => {
                                    const Icon = agent.icon;
                                    return (
                                        <div key={agent.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${agent.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{agent.name}</p>
                                                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${agent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                            }`}>{agent.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="bg-gray-50 rounded p-2">
                                                    <p className="text-gray-500">Input</p>
                                                    <p className="font-medium text-gray-900">{agent.input}</p>
                                                </div>
                                                <div className="bg-gray-50 rounded p-2">
                                                    <p className="text-gray-500">Output</p>
                                                    <p className="font-medium text-gray-900">{agent.output}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                                                <span>Last run: {agent.lastRun}</span>
                                                <span>{agent.itemsProcessed} items</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Competitor Summary */}
                            <div className="mt-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Competitor Crawl Summary</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    {competitorData.map((comp) => (
                                        <div key={comp.competitor} className="bg-gray-50 rounded-lg p-3">
                                            <p className="font-medium text-gray-900 mb-2">{comp.competitor}</p>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex justify-between"><span className="text-gray-500">Pages</span><span className="font-medium">{comp.pagesAnalyzed}</span></div>
                                                <div className="flex justify-between"><span className="text-gray-500">Topics</span><span className="font-medium">{comp.topics}</span></div>
                                                <div className="flex justify-between"><span className="text-gray-500">Keywords</span><span className="font-medium">{comp.keywords}</span></div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">Crawled: {comp.lastCrawl}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Keyword Gaps Tab */}
                    {activeTab === 'keywords' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Keyword Gap</th>
                                        <th className="px-4 py-3 text-right">Volume</th>
                                        <th className="px-4 py-3 text-center">Difficulty</th>
                                        <th className="px-4 py-3 text-left">Top Competitor</th>
                                        <th className="px-4 py-3 text-center">Their Rank</th>
                                        <th className="px-4 py-3 text-center">Our Rank</th>
                                        <th className="px-4 py-3 text-center">GEO Score</th>
                                        <th className="px-4 py-3 text-center">Priority</th>
                                        <th className="px-4 py-3 text-right">Opportunity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {keywordGaps.map((gap) => (
                                        <tr key={gap.keyword} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{gap.keyword}</td>
                                            <td className="px-4 py-3 text-right text-gray-600">{gap.volume}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`font-semibold ${gap.difficulty <= 40 ? 'text-green-600' : gap.difficulty <= 55 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {gap.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{gap.competitor}</td>
                                            <td className="px-4 py-3 text-center font-semibold">#{gap.compRank}</td>
                                            <td className="px-4 py-3 text-center text-gray-500">{gap.ourRank}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`font-semibold ${gap.geoScore >= 80 ? 'text-green-600' : gap.geoScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {gap.geoScore}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${gap.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                        gap.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>{gap.priority}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-green-600">{gap.opportunity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Content Gaps Tab */}
                    {activeTab === 'content' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Missing Topic</th>
                                        <th className="px-4 py-3 text-left">Gap Type</th>
                                        <th className="px-4 py-3 text-center">Competitors Have It</th>
                                        <th className="px-4 py-3 text-center">Avg. Words</th>
                                        <th className="px-4 py-3 text-center">FAQs Found</th>
                                        <th className="px-4 py-3 text-right">Est. Traffic</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {contentGaps.map((gap) => (
                                        <tr key={gap.topic} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{gap.topic}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700">{gap.type}</span>
                                            </td>
                                            <td className="px-4 py-3 text-center text-gray-600">{gap.competitors} competitors</td>
                                            <td className="px-4 py-3 text-center text-gray-600">{gap.avgWords}</td>
                                            <td className="px-4 py-3 text-center text-gray-600">{gap.faqs}</td>
                                            <td className="px-4 py-3 text-right font-medium text-green-600">{gap.estTraffic}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Technical Issues Tab */}
                    {activeTab === 'technical' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Issue</th>
                                        <th className="px-4 py-3 text-center">Count</th>
                                        <th className="px-4 py-3 text-center">Severity</th>
                                        <th className="px-4 py-3 text-left">Impact</th>
                                        <th className="px-4 py-3 text-left">Affected Pages</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {technicalIssues.map((issue) => (
                                        <tr key={issue.issue} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{issue.issue}</td>
                                            <td className="px-4 py-3 text-center font-semibold text-gray-900">{issue.count}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${issue.severity === 'High' ? 'bg-red-100 text-red-700' :
                                                        issue.severity === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>{issue.severity}</span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{issue.impact}</td>
                                            <td className="px-4 py-3 text-xs text-gray-500">{issue.pages.join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* GEO Analysis Tab */}
                    {activeTab === 'geo' && (
                        <div className="p-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                                <Eye className="text-blue-600 mt-0.5" size={20} />
                                <div>
                                    <p className="font-semibold text-blue-900">GEO (Generative Engine Optimization)</p>
                                    <p className="text-sm text-blue-700">Measures how likely your content will be cited by AI chatbots like ChatGPT, Gemini, and Perplexity.</p>
                                </div>
                            </div>
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Page</th>
                                        <th className="px-4 py-3 text-center">GEO Score</th>
                                        <th className="px-4 py-3 text-center">AI Mentions</th>
                                        <th className="px-4 py-3 text-center">Citation Potential</th>
                                        <th className="px-4 py-3 text-left">Recommendation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {geoAnalysis.map((item) => (
                                        <tr key={item.page} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{item.page}</td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${item.geoScore >= 80 ? 'bg-green-500' : item.geoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                            style={{ width: `${item.geoScore}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-semibold">{item.geoScore}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center text-gray-600">{item.aiMentions}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${item.citationPotential === 'Very High' ? 'bg-green-100 text-green-700' :
                                                        item.citationPotential === 'High' ? 'bg-blue-100 text-blue-700' :
                                                            item.citationPotential === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>{item.citationPotential}</span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{item.recommendation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* SEO Assistant */}
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

export default SEOGapResearch;
