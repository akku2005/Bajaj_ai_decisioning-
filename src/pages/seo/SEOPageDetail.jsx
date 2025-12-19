import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Target, Zap, Bot, Sparkles, CheckCircle, Link2,
    ExternalLink, TrendingUp, TrendingDown, Clock, MousePointerClick,
    Layout, ArrowUp, ArrowDown, Info, HelpCircle, Activity,
    AlertTriangle, Lightbulb, ChevronRight, BookOpen
} from 'lucide-react';
import { pagesData } from './seoData';

const SEOPageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const page = pagesData.find(p => p.id === parseInt(id));
    const [selectedAction, setSelectedAction] = useState(null);

    // Default to first action if available and none selected
    React.useEffect(() => {
        if (page && page.recommendedActions.onPage.length > 0 && !selectedAction) {
            setSelectedAction(page.recommendedActions.onPage[0]);
        }
    }, [page, selectedAction]);


    if (!page) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Info size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Page not found</h3>
                <button onClick={() => navigate('/seo/recommendations')} className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg">Back</button>
            </div>
        );
    }

    const formatChange = (val, suffix = '%') => {
        if (!val && val !== 0) return <span className="text-gray-300">-</span>;
        const isPos = val > 0;
        const isNeg = val < 0;
        return (
            <div className={`flex items-center gap-0.5 font-bold text-xs ${isPos ? 'text-green-600' : isNeg ? 'text-red-600' : 'text-gray-400'}`}>
                {isPos && <TrendingUp size={12} />}
                {isNeg && <TrendingDown size={12} />}
                <span>{Math.abs(val)}{suffix}</span>
            </div>
        );
    };

    const DetailCard = ({ title, icon: Icon, iconColor, children, className = '', action }) => (
        <div className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wide">
                    <Icon size={16} className={iconColor} />
                    {title}
                </h3>
                {action}
            </div>
            {children}
        </div>
    );

    const StatItem = ({ label, value, change, icon: Icon, helpText }) => (
        <div className="group relative flex flex-col p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-blue-100 transition-all">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-500">
                        <Icon size={14} />
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</span>
                </div>
                {helpText && <HelpCircle size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{value}</span>
                {change !== undefined && formatChange(change)}
            </div>
        </div>
    );

    const CWVRow = ({ metric }) => (
        <div className="space-y-2">
            <div className="flex items-start justify-between text-sm">
                <div className="flex flex-col">
                    <span className="font-bold text-gray-700">{metric.label}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{metric.description}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold ${metric.status === 'Fail' ? 'text-red-600' : 'text-green-600'}`}>
                        {metric.value}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${metric.status === 'Fail' ? 'bg-red-50 text-red-700' :
                        metric.status === 'Borderline' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-green-50 text-green-700'
                        }`}>
                        {metric.status}
                    </span>
                </div>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div
                    className={`h-full rounded-full ${metric.score >= 90 ? 'bg-green-500' : metric.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${metric.score}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div>
                <button onClick={() => navigate('/seo/recommendations')} className="mb-4 flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{page.url}</h1>
                            {page.isHighPriority && <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-red-600 text-white rounded shadow-sm animate-pulse">High Priority</span>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{page.product}</span>
                            <span className="flex items-center gap-1"><Activity size={14} />{page.businessRole}</span>
                            <span className="text-gray-400">•</span>
                            <span className="flex items-center gap-1 text-gray-400"><Clock size={14} /> Last crawled {page.lastCrawled || '2 hours ago'}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 flex items-center gap-2 shadow-sm transition-all"><ExternalLink size={14} /> View Live</button>
                        <button className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg flex items-center gap-2 transition-all">
                            <Sparkles size={16} />
                            Apply AI Fixes
                        </button>
                    </div>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={60} /></div>
                    <p className="text-blue-100 text-xs font-bold uppercase tracking-wide mb-1">Current Rank</p>
                    <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-black">#{page.rank}</span>
                        {page.rankChange !== 0 && <div className="flex items-center gap-1 text-sm font-bold bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">{page.rankChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{Math.abs(page.rankChange)}</div>}
                    </div>
                    <p className="text-blue-200 text-xs">Prev Rank: #{page.prevRank || '-'}</p>
                </div>
                <StatItem label="Traffic Trend" value={`${Math.abs(page.trafficChange)}%`} change={page.trafficChange} icon={Layout} helpText="Change in organic traffic" />
                <StatItem label="Time on Page" value={page.timeOnPage} change={null} icon={Clock} helpText="Average session duration" />
                <StatItem label="Scroll Depth" value={`${Math.abs(page.scrollDepth)}%`} change={page.scrollDepth} icon={MousePointerClick} helpText="Average scroll percentage" />
                <StatItem label="Leads Impact" value={`${Math.abs(page.leadsChange)}%`} change={page.leadsChange} icon={Target} helpText="Conversion rate change" />
            </div>

            {/* Split Layout: Diagnosis (Left) vs Deep Dive (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT: The "What's Happening" Narrative (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-purple-100 flex items-center gap-3">
                            <Bot size={20} className="text-purple-600" />
                            <div><h3 className="font-bold text-gray-900">Executive Summary</h3><p className="text-xs text-purple-600 font-medium">Simplified AI Analysis</p></div>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-4 items-start mb-6">
                                <Lightbulb size={24} className="text-yellow-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">What's happening?</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{page.simpleSummary}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Business Impact</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm pl-4 border-l-2 border-gray-200">{page.agentDiagnosis.analysis}</p>
                            </div>
                        </div>
                    </div>

                    <DetailCard title="Page Experience Scan" icon={Zap} iconColor="text-yellow-500">
                        <div className="space-y-6">
                            <CWVRow metric={page.coreWebVitals.lcp} />
                            <CWVRow metric={page.coreWebVitals.cls} />
                            <CWVRow metric={page.coreWebVitals.inp} />
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400"><p>Measures how annoying or slow the page feels.</p></div>
                    </DetailCard>
                </div>

                {/* RIGHT: The "Education & Action" Center (8 cols) */}
                <div className="lg:col-span-8 flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-5 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg uppercase tracking-wide"><Sparkles size={18} className="text-blue-600" /> Recommended Fixes</h3>
                            <p className="text-xs text-gray-500 mt-1">Select an action to understand the "Why" and "How".</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow flex items-center gap-2"> Execute All </button>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Action List */}
                        <div className="w-1/2 border-r border-gray-100 overflow-y-auto p-4 space-y-3 bg-gray-50/30">
                            {page.recommendedActions.onPage.map((action, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedAction(action)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all group relative ${selectedAction === action ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-white/80'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedAction === action ? 'border-blue-500' : 'border-gray-300'}`}>
                                            {selectedAction === action && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-bold leading-snug mb-1 ${selectedAction === action ? 'text-blue-900' : 'text-gray-700'}`}>{action.action}</p>
                                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                                <TrendingUp size={10} strokeWidth={2.5} /> {action.outcome}
                                            </p>
                                        </div>
                                        <ChevronRight size={16} className={`text-gray-300 transition-transform ${selectedAction === action ? 'text-blue-400 translate-x-1' : ''}`} />
                                    </div>
                                </div>
                            ))}
                            {page.recommendedActions.offPage.map((action, i) => (
                                <div
                                    key={i + 10}
                                    onClick={() => setSelectedAction(action)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all group relative ${selectedAction === action ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-white/80'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedAction === action ? 'border-blue-500' : 'border-gray-300'}`}>
                                            {selectedAction === action && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-bold leading-snug mb-1 ${selectedAction === action ? 'text-blue-900' : 'text-gray-700'}`}>{action.action}</p>
                                            <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                                                <Link2 size={10} strokeWidth={2.5} /> {action.outcome}
                                            </p>
                                        </div>
                                        <ChevronRight size={16} className={`text-gray-300 transition-transform ${selectedAction === action ? 'text-blue-400 translate-x-1' : ''}`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Details (Educational Panel) */}
                        <div className="w-1/2 p-6 bg-white flex flex-col overflow-y-auto">
                            {selectedAction ? (
                                <div className="space-y-8 animate-fadeIn">
                                    <div>
                                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded border border-blue-100 mb-3 inline-block">The Fix</span>
                                        <h2 className="text-xl font-extrabold text-gray-900 leading-tight mb-2">{selectedAction.action}</h2>
                                        <p className="text-sm text-gray-500 flex items-center gap-2">
                                            <Sparkles size={14} className="text-purple-500" />
                                            Suggested by AI Agent
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertTriangle size={16} className="text-red-600" />
                                                <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest">Why is this a problem?</h4>
                                            </div>
                                            <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                                "{selectedAction.why || 'This issue is confusing search engines and users, leading to a drop in rank.'}"
                                            </p>
                                        </div>

                                        <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CheckCircle size={16} className="text-green-600" />
                                                <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest">How we fix it</h4>
                                            </div>
                                            <p className="text-sm text-gray-800 leading-relaxed font-medium">
                                                {selectedAction.how || 'We will update the content structure to align with user intent.'}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2"><BookOpen size={14} /> Technical Details</h4>
                                            <div className="flex gap-2">
                                                {selectedAction.hems && <span className="text-xs font-bold px-2 py-1 rounded bg-purple-50 text-purple-700 border border-purple-100">HEMS: {selectedAction.hems}</span>}
                                                {selectedAction.priority && <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200">Priority: {selectedAction.priority}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full mt-auto py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black shadow-lg transition-all flex items-center justify-center gap-2">
                                        Apply This Specific Fix
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                                    <MousePointerClick size={48} className="mb-4 opacity-20" />
                                    <p className="text-sm">Select an action on the left to see details.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEOPageDetail;
