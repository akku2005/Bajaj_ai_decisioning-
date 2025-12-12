import React, { useState } from 'react';
import {
    Sparkles,
    Send,
    Save,
    FileDown,
    Rocket,
    MessageSquare,
    Bot,
    Zap,
    Target,
    TrendingUp,
    Users,
    ChevronRight
} from 'lucide-react';

const suggestedAgents = [
    {
        id: 1,
        title: 'Cross-Sell Agent',
        description: 'Identifies cross-sell opportunities based on user behavior',
        icon: Target,
        gradient: 'from-purple-500 to-indigo-600',
    },
    {
        id: 2,
        title: 'Retention Agent',
        description: 'Predicts churn risk and suggests retention campaigns',
        icon: Users,
        gradient: 'from-orange-500 to-red-500',
    },
    {
        id: 3,
        title: 'Upsell Agent',
        description: 'Recommends upgrade paths for existing customers',
        icon: TrendingUp,
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        id: 4,
        title: 'Re-engagement Agent',
        description: 'Targets dormant users with personalized offers',
        icon: Zap,
        gradient: 'from-blue-500 to-cyan-500',
    },
];

const channelOptions = [
    { id: 'whatsapp', label: 'WhatsApp', icon: '📱' },
    { id: 'sms', label: 'SMS', icon: '💬' },
    { id: 'rcs', label: 'RCS', icon: '✨' },
];

const suggestedCampaigns = [
    {
        id: 1,
        name: 'Personal Loan Upgrade Offer',
        channel: 'whatsapp',
        segment: 'High CIBIL Score Users',
        status: 'AI Suggested',
        confidence: 92,
    },
    {
        id: 2,
        name: 'Gold Loan Reminder',
        channel: 'sms',
        segment: 'Previous Gold Loan Customers',
        status: 'AI Suggested',
        confidence: 87,
    },
    {
        id: 3,
        name: 'Insurance Cross-sell',
        channel: 'rcs',
        segment: 'Active Loan Holders',
        status: 'AI Suggested',
        confidence: 85,
    },
    {
        id: 4,
        name: 'EMI Card Activation',
        channel: 'whatsapp',
        segment: 'Inactive Card Holders',
        status: 'AI Suggested',
        confidence: 78,
    },
];

const AdHocPage = () => {
    const [userInput, setUserInput] = useState('');
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [activeChannel, setActiveChannel] = useState('whatsapp');
    const [briefContent, setBriefContent] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, type: 'ai', text: 'Hi! I can help you create and refine campaigns. Select an AI agent or describe your target audience.' },
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);

    const handleAgentSelect = (agent) => {
        setSelectedAgent(agent);
        setBriefContent(`Campaign Brief for ${agent.title}\n\n• Objective: ${agent.description}\n• Target Segment: To be defined\n• Channel: ${activeChannel.toUpperCase()}\n• Expected Outcome: Increase conversion by 15%`);
        setChatMessages(prev => [...prev, {
            id: Date.now(),
            type: 'ai',
            text: `Great choice! The ${agent.title} is now active. I've pre-filled a campaign brief. You can modify it or ask me for suggestions.`
        }]);
    };

    const handleInputSubmit = () => {
        if (!userInput.trim()) return;
        setIsProcessing(true);
        setChatMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userInput }]);

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                text: `Analyzing your request through DAT Decisioning Engine... Found ${Math.floor(Math.random() * 30 + 10)}K matching users. Recommended channel: WhatsApp with 4.2% expected CTR.`
            }]);
            setBriefContent(`Campaign Brief Generated\n\n• Query: "${userInput}"\n• Estimated Audience: ${Math.floor(Math.random() * 30 + 10)}K users\n• Recommended Channel: WhatsApp\n• Best Send Time: 10-11 AM IST\n• Expected CTR: 4.2%`);
            setIsProcessing(false);
        }, 1000);

        setUserInput('');
    };

    const handleChatSend = () => {
        if (!chatInput.trim()) return;
        setChatMessages(prev => [...prev, { id: Date.now(), type: 'user', text: chatInput }]);
        setChatInput('');

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                text: 'Based on your requirements, I suggest targeting users who have shown interest in the past 7 days. This could improve conversion by 20%.'
            }]);
        }, 500);
    };

    const toggleCampaignSelection = (campaignId) => {
        setSelectedCampaigns(prev =>
            prev.includes(campaignId)
                ? prev.filter(id => id !== campaignId)
                : [...prev, campaignId]
        );
    };

    const filteredCampaigns = suggestedCampaigns.filter(c => c.channel === activeChannel);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Ad-Hoc Campaign Creator</h1>
                <p className="text-gray-600 mt-1">Create campaigns on-the-fly with AI-powered decisioning</p>
            </div>

            {/* AI Suggested Agents Section */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Bot className="text-blue-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-900">AI Suggested Agents</h2>
                    </div>
                    <span className="text-xs text-gray-500">Select an agent to start</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    {suggestedAgents.map((agent) => {
                        const Icon = agent.icon;
                        const isSelected = selectedAgent?.id === agent.id;
                        return (
                            <button
                                key={agent.id}
                                onClick={() => handleAgentSelect(agent)}
                                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${isSelected
                                        ? 'border-blue-500 shadow-lg shadow-blue-100'
                                        : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center mb-3`}>
                                    <Icon className="text-white" size={20} />
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm">{agent.title}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{agent.description}</p>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Input Field */}
                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <Sparkles className="text-purple-500" size={20} />
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
                        placeholder="Describe your target audience or campaign goal..."
                        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    />
                    <button
                        onClick={handleInputSubmit}
                        disabled={isProcessing || !userInput.trim()}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${isProcessing || !userInput.trim()
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        <span>{isProcessing ? 'Processing...' : 'Send to DAT Engine'}</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Main Content - Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Campaign Canvas */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Brief Editor */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Campaign Canvas</h3>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                    <Save size={14} className="inline mr-1" />
                                    Draft
                                </button>
                                <button className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                    <Rocket size={14} className="inline mr-1" />
                                    Save & Deploy
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={briefContent}
                            onChange={(e) => setBriefContent(e.target.value)}
                            rows={8}
                            placeholder="Your campaign brief will appear here. Select an agent or describe your audience to get started..."
                            className="w-full p-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50"
                        />
                    </div>

                    {/* Chat Section */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                        <div className="flex items-center space-x-2 mb-4">
                            <MessageSquare className="text-purple-600" size={18} />
                            <h3 className="font-semibold text-gray-900">AI Chat Assistant</h3>
                        </div>
                        <div className="h-40 overflow-y-auto border border-gray-100 rounded-lg p-3 bg-gray-50 space-y-2 mb-3">
                            {chatMessages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${msg.type === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-200 text-gray-800'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                                placeholder="Ask for suggestions or refinements..."
                                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleChatSend}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <Send size={14} className="mr-1" />
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Suggested Campaigns */}
                <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Suggested Campaigns</h3>
                            <span className="text-xs text-gray-500">{filteredCampaigns.length} campaigns</span>
                        </div>

                        {/* Channel Tabs */}
                        <div className="flex space-x-2 mb-4">
                            {channelOptions.map((channel) => (
                                <button
                                    key={channel.id}
                                    onClick={() => setActiveChannel(channel.id)}
                                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${activeChannel === channel.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <span className="mr-1">{channel.icon}</span>
                                    {channel.label}
                                </button>
                            ))}
                        </div>

                        {/* Campaign List */}
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                            {filteredCampaigns.length > 0 ? (
                                filteredCampaigns.map((campaign) => (
                                    <div
                                        key={campaign.id}
                                        className={`p-3 border rounded-lg transition-all cursor-pointer ${selectedCampaigns.includes(campaign.id)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        onClick={() => toggleCampaignSelection(campaign.id)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">{campaign.name}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">{campaign.segment}</p>
                                            </div>
                                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                                {campaign.confidence}% AI
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-blue-600">{campaign.status}</span>
                                            <button
                                                className="text-xs text-gray-500 hover:text-blue-600"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setBriefContent(`Editing: ${campaign.name}\n\nSegment: ${campaign.segment}\nChannel: ${campaign.channel.toUpperCase()}\nConfidence: ${campaign.confidence}%`);
                                                }}
                                            >
                                                Edit →
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    No campaigns for this channel
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                            <button
                                className="flex-1 px-3 py-2 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                                disabled={selectedCampaigns.length === 0}
                            >
                                <FileDown size={14} className="mr-1" />
                                Export
                            </button>
                            <button
                                className="flex-1 px-3 py-2 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                                disabled={selectedCampaigns.length === 0}
                            >
                                <Rocket size={14} className="mr-1" />
                                Launch
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white">
                        <h3 className="font-semibold mb-3">Quick Stats</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-blue-100">Active Campaigns</span>
                                <span className="font-semibold">12</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-blue-100">Avg. CTR</span>
                                <span className="font-semibold">4.8%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-blue-100">Today's Reach</span>
                                <span className="font-semibold">45K</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-blue-100">Conversion Rate</span>
                                <span className="font-semibold">2.3%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdHocPage;
