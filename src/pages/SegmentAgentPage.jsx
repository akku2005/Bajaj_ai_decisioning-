import React, { useState } from 'react';
import { Search, Users, Plus, Sparkles, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';
import { useUseCaseStore } from '../stores/useCaseStore';

const SegmentAgentPage = () => {
    const [audienceQuery, setAudienceQuery] = useState('');
    const [generatedSegment, setGeneratedSegment] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [segmentCreated, setSegmentCreated] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | generating | generated | creating | created
    const [successMessage, setSuccessMessage] = useState('');

    // Subscribe to the persisted store so created segments get saved globally
    // Use separate selectors (not an object) to avoid unstable selector results and
    // the React "getSnapshot should be cached" infinite loop warning.
    const segments = useUseCaseStore((s) => s.segments);
    const setSegments = useUseCaseStore((s) => s.setSegments);

    // Create a lightweight explanation from the natural language query so we can show
    // "how the segment was generated" in the right panel. This is intentionally
    // simple (split by commas and common conjunctions) but useful as a visual cue.
    const summarizeQuery = (query) => {
        if (!query) return [];
        // Break into sentences/clauses using common separators
        const parts = query.split(/,| and | who | where | but | or /i)
            .map(p => p.trim())
            .filter(Boolean);
        // Make short, human friendly phrases
        return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
    };

    const suggestedSegments = [
        {
            id: 1,
            name: 'High Intent Prospects',
            tag: 'High Intent',
            query: 'Show me users with CIBIL score greater than 750 who visited the Personal Loan page in the last 7 days but have not applied for any loan yet',
            users: '67,890',
        },
        {
            id: 2,
            name: 'First-time Applicants',
            tag: 'New Users',
            query: 'Show me new customers who signed up in the last 30 days and completed their first application',
            users: '23,450',
        },
        {
            id: 3,
            name: 'Premium Churners',
            tag: 'At Risk',
            query: 'Show me high value customers with LTV above 50000 who have not been active in the last 45 days',
            users: '8,920',
        },
        {
            id: 4,
            name: 'Cart Abandoners',
            tag: 'High Intent',
            query: 'Show me users who started a loan application but abandoned it without completing in the last 14 days',
            users: '45,230',
        },
        {
            id: 5,
            name: 'Dormant Users',
            tag: 'Inactive',
            query: 'Show me users who were active 90 days ago but have not logged in or made any transaction since then',
            users: '112,340',
        },
    ];

    const handleAddToQuery = (segment) => {
        setAudienceQuery(segment.query);
        setGeneratedSegment(null);
    };

    const handleGenerateSegment = () => {
        if (!audienceQuery.trim()) return;
        setIsGenerating(true);
        setStatus('generating');
        setSuccessMessage('');

        setTimeout(() => {
            const audienceSize = Math.floor(Math.random() * 50000) + 20000;
            const sql = `-- Generated segment\nSELECT user_id\nFROM users\nWHERE ${audienceQuery.replace(/\band\b/gi, 'AND').replace(/\bor\b/gi, 'OR')}\nLIMIT ${audienceSize};`;

            setGeneratedSegment({
                audienceSize,
                query: audienceQuery,
                breakdown: [
                    { label: 'High Intent', value: 35 },
                    { label: 'Returning', value: 28 },
                    { label: 'New Users', value: 22 },
                    { label: 'Other', value: 15 },
                ],
                explanation: summarizeQuery(audienceQuery),
                sql,
            });
            // Reset created status when regenerating
            setSegmentCreated(false);
            setIsGenerating(false);
            setStatus('generated');
        }, 800);
    }; 

    const handleCreateSegment = () => {
        if (!generatedSegment) return;
        setStatus('creating');

        // Build a compact segment object for the store
        const newSegment = {
            label: generatedSegment.query.split(/[.\n]/)[0].slice(0, 60) || 'Custom Segment',
            value: generatedSegment.audienceSize,
            color: 'bg-blue-600',
            query: generatedSegment.query,
            createdOn: new Date().toISOString(),
        };

        // Prepend to list and persist
        setSegments([newSegment, ...(segments || [])]);

        setSegmentCreated(true);
        setStatus('created');
        setSuccessMessage(`Segment saved to library — ${generatedSegment.audienceSize.toLocaleString()} users.`);

        // Clear the message after a short timeout so the UI doesn't stay busy forever
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    const handleCopySQL = () => {
        if (!generatedSegment?.sql) return;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(generatedSegment.sql).then(() => {
                setSuccessMessage('SQL copied to clipboard');
                setTimeout(() => setSuccessMessage(''), 2200);
            }).catch(() => {
                setSuccessMessage('Could not copy SQL');
                setTimeout(() => setSuccessMessage(''), 2200);
            });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Segment Creator Agent</h1>
                <p className="text-gray-600 mt-1">Describe your target audience in plain English, and let AI build the segment</p>
            </div>

            <div className="flex gap-6">
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Query Input */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold text-blue-600 uppercase">Define Audience</p>
                        </div>
                        <div className="p-4">
                            <textarea
                                value={audienceQuery}
                                onChange={(e) => setAudienceQuery(e.target.value)}
                                placeholder="e.g., Show me users with CIBIL > 750 who visited the loan page in the last 7 days"
                                className="w-full h-24 px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleGenerateSegment}
                                disabled={!audienceQuery.trim() || isGenerating}
                                className={`w-full mt-3 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${audienceQuery.trim() && !isGenerating
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <Sparkles size={16} />
                                {isGenerating ? 'Generating...' : 'Generate Segment'}
                            </button>
                        </div>
                    </div>

                    {/* Success State: show a "ready" state after generation and a saved state after creation */}
                    {generatedSegment && (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                            {!segmentCreated ? (
                                <>
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <Sparkles size={18} />
                                        <span className="font-semibold">Segment Ready</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">{generatedSegment.query}</p>
                                    <div className="flex gap-3">
                                        <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                            Save Draft
                                        </button>
                                        <button
                                            onClick={handleCreateSegment}
                                            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                                        >
                                            <Zap size={14} />
                                            Save to Library
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-md p-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle size={18} />
                                        <span className="font-semibold">Segment Created Successfully!</span>
                                    </div>
                                    <p>{successMessage}</p>
                                </div>
                            )}
                        </div>
                    )} 

                    {/* Suggested Segments */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-purple-600" />
                                <span className="text-sm font-semibold text-gray-900">Suggested Segments</span>
                            </div>
                        </div>
                        <p className="px-4 py-2 text-xs text-gray-500">Click + to use a pre-built query</p>

                        <div className="divide-y divide-gray-200">
                            {suggestedSegments.map((segment) => (
                                <div key={segment.id} className="px-4 py-4 hover:bg-gray-50 transition-colors flex justify-between items-start">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-gray-900">{segment.name}</span>
                                            <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded">{segment.tag}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-2">{segment.query}</p>
                                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                            <Users size={12} />
                                            {segment.users} users
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToQuery(segment)}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-80">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm sticky top-6">
                        {!generatedSegment ? (
                            <div className="p-6 text-center">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Search className="text-blue-600" size={24} />
                                </div>
                                <p className="font-semibold text-gray-900 mb-1">Enter a query to see audience estimation</p>
                                <p className="text-sm text-gray-500">We evaluate the segment you have entered above</p>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 text-center border-b border-gray-200">
                                    <p className="text-sm text-gray-500 mb-1">Estimated Audience Size</p>
                                    <p className="text-4xl font-bold text-blue-600">{generatedSegment.audienceSize.toLocaleString()}</p>
                                    <p className="text-sm text-gray-400 mt-1">users ready</p>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Target size={14} className="text-gray-500" />
                                        <p className="text-sm font-semibold text-gray-700">Segment Breakdown</p>
                                    </div>
                                    <div className="space-y-3">
                                        {generatedSegment.breakdown.map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600">{item.label}</span>
                                                    <span className="font-medium text-gray-900">{item.value}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${item.value}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Generation details - show the query and a short explanation of how the segment was built */}
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">How this segment was generated</p>
                                        <div className="bg-gray-50 border border-gray-100 rounded p-3 text-sm text-gray-700 mb-3">
                                            <div className="wrap-break-word">{generatedSegment.query}</div>
                                        </div>

                                        {generatedSegment.explanation && generatedSegment.explanation.length > 0 && (
                                            <ul className="list-disc list-inside text-xs text-gray-600 mb-3">
                                                {generatedSegment.explanation.map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Generated SQL */}
                                        {generatedSegment.sql && (
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-500 mb-1 font-medium">Generated SQL</p>
                                                <pre className="bg-gray-50 border border-gray-100 rounded p-3 text-xs text-gray-700 mb-2 overflow-auto">{generatedSegment.sql}</pre>
                                                <div className="flex justify-end">
                                                    <button onClick={handleCopySQL} className="text-blue-600 text-xs font-semibold hover:text-blue-800">Copy SQL</button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Create Segment button on the right panel */}
                                        <div className="mt-3">
                                            {!segmentCreated ? (
                                                <button
                                                    onClick={handleCreateSegment}
                                                    className="w-full py-2.5 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Zap size={14} />
                                                    Create Segment
                                                </button>
                                            ) : (
                                                <button className="w-full py-2.5 bg-green-100 rounded-lg text-sm font-semibold text-green-800 flex items-center justify-center gap-2" disabled>
                                                    <CheckCircle size={14} />
                                                    Segment Created
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-gray-200 bg-blue-50">
                                    <div className="flex items-start gap-2">
                                        <TrendingUp size={14} className="text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-900">AI Recommendation</p>
                                            <p className="text-xs text-blue-700 mt-1">WhatsApp yields 3.4x higher engagement. Best time: 10 AM - 12 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SegmentAgentPage;
