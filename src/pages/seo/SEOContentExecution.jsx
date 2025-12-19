import React, { useState } from 'react';
import {
    PenTool, Play, Pause, CheckCircle, Clock, AlertCircle,
    RefreshCw, Sparkles, Eye, Bot, FileText, Link2, Code, Globe,
    ArrowRight, Server, Zap, Upload, ExternalLink
} from 'lucide-react';
import ChatCanvas from '../usecases/ChatCanvas';

// === SEO Execution Agents ===
const seoExecutionAgents = [
    {
        id: 'content-writer',
        name: 'Content Writing Agent',
        icon: FileText,
        task: 'Generate SEO content',
        output: 'Blog draft',
        publishesTo: 'CMS',
        status: 'Active',
        tasksCompleted: 12,
        tasksInProgress: 2,
        lastActivity: '5 min ago'
    },
    {
        id: 'technical-seo',
        name: 'Technical SEO Agent',
        icon: Code,
        task: 'Fix technical issues',
        output: 'Schema, meta tags',
        publishesTo: 'CMS',
        status: 'Active',
        tasksCompleted: 45,
        tasksInProgress: 3,
        lastActivity: '2 min ago'
    },
    {
        id: 'internal-linking',
        name: 'Internal Linking Agent',
        icon: Link2,
        task: 'Optimize link structure',
        output: 'Link map',
        publishesTo: 'CMS',
        status: 'Idle',
        tasksCompleted: 8,
        tasksInProgress: 0,
        lastActivity: '1 hour ago'
    },
    {
        id: 'schema-markup',
        name: 'Schema Markup Agent',
        icon: Code,
        task: 'Add structured data',
        output: 'JSON-LD',
        publishesTo: 'Page HTML',
        status: 'Active',
        tasksCompleted: 32,
        tasksInProgress: 1,
        lastActivity: '10 min ago'
    },
    {
        id: 'cms-publisher',
        name: 'CMS Publishing Agent',
        icon: Upload,
        task: 'Push to production',
        output: 'Live page',
        publishesTo: 'Website',
        status: 'Standby',
        tasksCompleted: 18,
        tasksInProgress: 5,
        lastActivity: '15 min ago'
    }
];

// === SEO Platforms ===
const seoPlatforms = [
    { name: 'CMS API', status: 'Connected', icon: Server, requests: '1,245', lastSync: '2 min ago' },
    { name: 'Google Indexing API', status: 'Connected', icon: Globe, requests: '890', lastSync: '5 min ago' },
    { name: 'Bing Webmaster API', status: 'Connected', icon: Globe, requests: '234', lastSync: '10 min ago' },
    { name: 'Schema Validators', status: 'Active', icon: CheckCircle, requests: '456', lastSync: '15 min ago' },
];

// === Execution Queue ===
const executionQueue = [
    {
        id: 1,
        title: 'Self-Employed Personal Loan Guide',
        type: 'New Content',
        status: 'In Progress',
        progress: 65,
        currentAgent: 'Content Writing Agent',
        nextAgent: 'Technical SEO Agent',
        started: '2 hours ago',
        eta: '1 hour',
        wordCount: '2,100 / 3,000'
    },
    {
        id: 2,
        title: 'Credit Card Benefits Page Expansion',
        type: 'Content Update',
        status: 'In Progress',
        progress: 85,
        currentAgent: 'Schema Markup Agent',
        nextAgent: 'CMS Publisher',
        started: '4 hours ago',
        eta: '30 min',
        wordCount: '2,450 / 2,500'
    },
    {
        id: 3,
        title: 'Meta Descriptions Update (12 pages)',
        type: 'Technical SEO',
        status: 'Queued',
        progress: 0,
        currentAgent: '-',
        nextAgent: 'Technical SEO Agent',
        started: '-',
        eta: '2 hours',
        wordCount: '-'
    },
    {
        id: 4,
        title: 'Home Loan EMI Calculator Schema',
        type: 'Schema Markup',
        status: 'Completed',
        progress: 100,
        currentAgent: 'CMS Publisher',
        nextAgent: '-',
        started: 'Yesterday',
        eta: '-',
        wordCount: '-'
    },
    {
        id: 5,
        title: 'Internal Links Optimization',
        type: 'Link Building',
        status: 'In Progress',
        progress: 40,
        currentAgent: 'Internal Linking Agent',
        nextAgent: 'CMS Publisher',
        started: '1 hour ago',
        eta: '2 hours',
        wordCount: '-'
    },
];

// === Recent Publications ===
const recentPublications = [
    { page: '/personal-loan/eligibility', status: 'Indexed', publishedAt: '10 min ago', indexedAt: '8 min ago' },
    { page: '/home-loan/emi-calculator', status: 'Indexed', publishedAt: '1 hour ago', indexedAt: '45 min ago' },
    { page: '/credit-card/rewards', status: 'Pending Index', publishedAt: '2 hours ago', indexedAt: '-' },
    { page: '/business-loan/documents', status: 'Indexed', publishedAt: 'Yesterday', indexedAt: 'Yesterday' },
];

// === Stats ===
const stats = [
    { label: 'In Queue', value: '5', icon: Clock, color: 'bg-orange-50 text-orange-600' },
    { label: 'In Progress', value: '3', icon: Play, color: 'bg-blue-50 text-blue-600' },
    { label: 'Published Today', value: '8', icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Agents Active', value: '4/5', icon: Bot, color: 'bg-purple-50 text-purple-600' },
];

const SEOContentExecution = () => {
    const [activeTab, setActiveTab] = useState('queue');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [initialMessage, setInitialMessage] = useState('');

    const tabs = [
        { id: 'queue', label: 'Execution Queue', icon: Clock },
        { id: 'agents', label: 'SEO Agents', icon: Bot },
        { id: 'platforms', label: 'Platforms', icon: Server },
        { id: 'published', label: 'Recent Publications', icon: Globe },
    ];

    const suggestions = [
        'Show content queue status',
        'What is blocking the queue?',
        'Prioritize urgent items',
        'Check indexing status',
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
                    <h1 className="text-3xl font-bold text-gray-900">Content Execution</h1>
                    <p className="text-gray-600 mt-1">Execution Layer — SEO Agents publishing to platforms</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                        <RefreshCw size={16} /> Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                        <Play size={16} /> Run Queue
                    </button>
                </div>
            </div>

            {/* Agent to Platform Flow */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Zap className="text-blue-600" size={18} />
                    <span className="font-semibold text-gray-900">Execution Flow</span>
                    <span className="text-xs text-gray-500">(Same pattern as Campaign Bundle Agent)</span>
                </div>
                <div className="flex items-center justify-between overflow-x-auto pb-2">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 min-w-max">
                        <FileText size={14} className="text-blue-600" />
                        <span className="text-xs font-medium">Content Writer</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 min-w-max">
                        <Code size={14} className="text-purple-600" />
                        <span className="text-xs font-medium">Technical SEO</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 min-w-max">
                        <Link2 size={14} className="text-orange-600" />
                        <span className="text-xs font-medium">Internal Linking</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 min-w-max">
                        <Code size={14} className="text-green-600" />
                        <span className="text-xs font-medium">Schema Markup</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-green-300 min-w-max">
                        <Upload size={14} className="text-green-600" />
                        <span className="text-xs font-medium">CMS Publisher</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                    <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-lg border border-green-300 min-w-max">
                        <Globe size={14} className="text-green-700" />
                        <span className="text-xs font-medium text-green-700">LIVE</span>
                    </div>
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
                    {/* Execution Queue Tab */}
                    {activeTab === 'queue' && (
                        <div className="divide-y divide-gray-100">
                            {executionQueue.map((item) => (
                                <div key={item.id} className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>{item.status}</span>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.type}</span>
                                            </div>
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                <span>Current: <strong className="text-gray-700">{item.currentAgent}</strong></span>
                                                {item.nextAgent !== '-' && (
                                                    <>
                                                        <ArrowRight size={12} />
                                                        <span>Next: <strong className="text-gray-700">{item.nextAgent}</strong></span>
                                                    </>
                                                )}
                                                {item.wordCount !== '-' && (
                                                    <span>Words: <strong className="text-gray-700">{item.wordCount}</strong></span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {item.status === 'In Progress' && (
                                                <button className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"><Pause size={16} /></button>
                                            )}
                                            {item.status === 'Queued' && (
                                                <button className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Play size={16} /></button>
                                            )}
                                            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded"><Eye size={16} /></button>
                                        </div>
                                    </div>
                                    {item.status !== 'Queued' && (
                                        <>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${item.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                                                <span>{item.progress}% complete</span>
                                                {item.eta !== '-' && <span>ETA: {item.eta}</span>}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SEO Agents Tab */}
                    {activeTab === 'agents' && (
                        <div className="p-4">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {seoExecutionAgents.map((agent) => {
                                    const Icon = agent.icon;
                                    return (
                                        <div key={agent.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${agent.status === 'Active' ? 'bg-green-100 text-green-600' :
                                                            agent.status === 'Standby' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        <Icon size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">{agent.name}</p>
                                                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${agent.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                                agent.status === 'Standby' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                                            }`}>{agent.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Task</span>
                                                    <span className="font-medium text-gray-900">{agent.task}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Output</span>
                                                    <span className="font-medium text-gray-900">{agent.output}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Publishes to</span>
                                                    <span className="font-medium text-green-600">{agent.publishesTo}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                                                <span>{agent.tasksCompleted} done / {agent.tasksInProgress} active</span>
                                                <span>{agent.lastActivity}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Platforms Tab */}
                    {activeTab === 'platforms' && (
                        <div className="p-4">
                            <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-800">
                                    <strong>SEO Platforms</strong> are equivalent to your Marketing Platforms (MoEngage, Netcore, Gupshup)
                                </p>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {seoPlatforms.map((platform) => {
                                    const Icon = platform.icon;
                                    return (
                                        <div key={platform.name} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                                    <Icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{platform.name}</p>
                                                    <span className="text-xs text-green-600">{platform.status}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Requests today</span>
                                                    <span className="font-medium text-gray-900">{platform.requests}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Last sync</span>
                                                    <span className="font-medium text-gray-900">{platform.lastSync}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Recent Publications Tab */}
                    {activeTab === 'published' && (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Page</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                        <th className="px-4 py-3 text-left">Published</th>
                                        <th className="px-4 py-3 text-left">Indexed</th>
                                        <th className="px-4 py-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentPublications.map((pub) => (
                                        <tr key={pub.page} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-gray-900">{pub.page}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${pub.status === 'Indexed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>{pub.status}</span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{pub.publishedAt}</td>
                                            <td className="px-4 py-3 text-gray-600">{pub.indexedAt}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button className="text-gray-400 hover:text-gray-600"><ExternalLink size={14} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default SEOContentExecution;
