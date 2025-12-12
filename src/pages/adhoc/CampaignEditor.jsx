import React, { useState } from 'react';
import {
    Zap,
    MessageSquare,
    Image,
    X,
    Eye,
    Save,
    Smartphone,
    Edit3,
    Clock,
    Users,
    ChevronRight,
    Plus
} from 'lucide-react';

const CampaignEditor = ({
    campaign,
    onUpdate,
    onSimulate,
    onSaveDraft,
    onClose
}) => {
    const [activeTab, setActiveTab] = useState('preview');

    // Channel-specific configurations
    const getChannelConfig = () => {
        switch (campaign.channel) {
            case 'WhatsApp':
                return {
                    color: 'green',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    accentColor: 'bg-green-600',
                    icon: '💬',
                    limits: { header: 60, body: 1024, button: 25 },
                    features: ['Header Image/Video', 'Body Text', 'Footer', 'Quick Reply Buttons', 'CTA Buttons'],
                    tips: 'Ensure template is pre-approved. Use {{1}}, {{2}} for variables.'
                };
            case 'SMS':
                return {
                    color: 'blue',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    accentColor: 'bg-blue-600',
                    icon: '📱',
                    limits: { body: 160 },
                    features: ['Plain Text Only', 'Short URLs', 'Opt-out Link'],
                    tips: 'Keep under 160 chars to avoid multipart. Include opt-out.'
                };
            case 'RCS':
                return {
                    color: 'purple',
                    bgColor: 'bg-purple-50',
                    borderColor: 'border-purple-200',
                    accentColor: 'bg-purple-600',
                    icon: '✨',
                    limits: { header: 200, body: 2000, button: 25 },
                    features: ['Rich Cards', 'Carousels', 'Images/Videos', 'Action Buttons', 'Suggested Replies'],
                    tips: 'Use rich media for better engagement. Fallback to SMS automatically.'
                };
            default:
                return {
                    color: 'gray',
                    bgColor: 'bg-gray-50',
                    borderColor: 'border-gray-200',
                    accentColor: 'bg-gray-600',
                    icon: '📨',
                    limits: { body: 1000 },
                    features: ['Text Message'],
                    tips: ''
                };
        }
    };

    const config = getChannelConfig();
    const charCount = campaign.messagePreview?.length || 0;
    const maxChars = config.limits.body;

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                    <h2 className="font-bold text-gray-900 text-lg">{campaign.name}</h2>
                    <span className="px-2.5 py-1 text-xs bg-amber-100 text-amber-700 rounded-full font-semibold">Draft</span>
                    <span className={`px-2.5 py-1 text-xs ${config.bgColor} text-${config.color}-700 rounded-full font-semibold flex items-center space-x-1`}>
                        <span>{config.icon}</span>
                        <span>{campaign.channel}</span>
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Close Editor"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6 bg-gray-50">
                {['preview', 'edit', 'settings'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'preview' && (
                    <div className="p-6 space-y-6">
                        {/* Target Audience */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Users className="text-purple-500" size={16} />
                                <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">Target Audience</span>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Segment: "{campaign.segment}"</h4>
                                        <p className="text-sm text-gray-500 mt-1">{campaign.segmentDescription}</p>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit3 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Message Preview - Channel Specific */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Smartphone className={`text-${config.color}-500`} size={16} />
                                    <span className={`text-xs font-bold text-${config.color}-600 uppercase tracking-wide`}>
                                        {campaign.channel} Message Preview
                                    </span>
                                </div>
                                <span className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-400'}`}>
                                    {charCount}/{maxChars} chars
                                </span>
                            </div>

                            {/* Phone Mockup */}
                            <div className="flex justify-center">
                                <div className="w-72 bg-gray-900 rounded-[2rem] p-2 shadow-2xl">
                                    <div className="bg-white rounded-[1.5rem] overflow-hidden">
                                        {/* Phone Header */}
                                        <div className={`${config.accentColor} px-4 py-3 flex items-center space-x-3`}>
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm">{config.icon}</span>
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-semibold">Bajaj Finance</p>
                                                <p className="text-white/70 text-xs">Online</p>
                                            </div>
                                        </div>

                                        {/* Message Content */}
                                        <div className="p-4 bg-gray-100 min-h-[280px]">
                                            <div className={`${config.bgColor} ${config.borderColor} border rounded-xl p-3 max-w-[90%] shadow-sm`}>
                                                {/* Header Image (WhatsApp/RCS) */}
                                                {(campaign.channel === 'WhatsApp' || campaign.channel === 'RCS') && (
                                                    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3 relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                                                        <div className="text-center z-10">
                                                            <Image className="mx-auto text-gray-400 mb-1" size={24} />
                                                            <p className="text-xs text-gray-500">Campaign Image</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Message Body */}
                                                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                                                    {campaign.messagePreview || `Hey {{name}}! ${campaign.description}`}
                                                </p>

                                                {/* Button (WhatsApp/RCS only) */}
                                                {(campaign.channel === 'WhatsApp' || campaign.channel === 'RCS') && (
                                                    <button className={`mt-3 w-full py-2.5 ${config.accentColor} text-white text-sm rounded-lg font-medium hover:opacity-90 transition-opacity`}>
                                                        {campaign.ctaButton || 'Shop Now'}
                                                    </button>
                                                )}

                                                {/* Timestamp */}
                                                <p className="text-[10px] text-gray-400 text-right mt-2">Just now ✓✓</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Channel Tips */}
                            <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-3 flex items-start space-x-2`}>
                                <span className="text-lg">{config.icon}</span>
                                <div>
                                    <p className="text-xs font-semibold text-gray-700">{campaign.channel} Tips:</p>
                                    <p className="text-xs text-gray-600">{config.tips}</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Predicted Performance */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Zap className="text-orange-500" size={16} />
                                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">AI Predicted Performance</span>
                                </div>
                                <span className="text-xs text-gray-400">Based on similar campaigns</span>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Estimated Reach */}
                                    <div className="bg-white rounded-lg p-3 shadow-sm">
                                        <p className="text-xs text-gray-500 mb-1">Estimated Reach</p>
                                        <p className="text-xl font-bold text-gray-900">15,000</p>
                                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                        <p className="text-xs text-green-600 mt-1">85% deliverability</p>
                                    </div>

                                    {/* Open Rate */}
                                    <div className="bg-white rounded-lg p-3 shadow-sm">
                                        <p className="text-xs text-gray-500 mb-1">Expected Open Rate</p>
                                        <p className="text-xl font-bold text-gray-900">68%</p>
                                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }}></div>
                                        </div>
                                        <p className="text-xs text-blue-600 mt-1">+12% vs industry avg</p>
                                    </div>

                                    {/* Click Rate */}
                                    <div className="bg-white rounded-lg p-3 shadow-sm">
                                        <p className="text-xs text-gray-500 mb-1">Predicted CTR</p>
                                        <p className="text-xl font-bold text-gray-900">4.2%</p>
                                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '42%' }}></div>
                                        </div>
                                        <p className="text-xs text-purple-600 mt-1">~630 clicks expected</p>
                                    </div>

                                    {/* Conversions */}
                                    <div className="bg-white rounded-lg p-3 shadow-sm">
                                        <p className="text-xs text-gray-500 mb-1">Projected Conversions</p>
                                        <p className="text-xl font-bold text-gray-900">~315</p>
                                        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '50%' }}></div>
                                        </div>
                                        <p className="text-xs text-orange-600 mt-1">2.1% conv rate</p>
                                    </div>
                                </div>

                                {/* AI Confidence */}
                                <div className="mt-4 pt-3 border-t border-orange-200 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs font-medium text-gray-700">AI Confidence: 87%</span>
                                    </div>
                                    <span className="text-xs text-gray-500">Based on 1,240 similar campaigns</span>
                                </div>
                            </div>
                        </div>

                        {/* Timing */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Clock className="text-blue-500" size={16} />
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Delivery Schedule</span>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-900 font-medium">Immediate Delivery</p>
                                        <p className="text-xs text-gray-500 mt-1">Send as soon as campaign is launched</p>
                                    </div>
                                    <button className="text-blue-600 text-sm font-medium hover:underline flex items-center space-x-1">
                                        <span>Schedule</span>
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'edit' && (
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-2">Campaign Name</label>
                            <input
                                type="text"
                                value={campaign.name}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => onUpdate({ ...campaign, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-2">Message Content</label>
                            <textarea
                                value={campaign.messagePreview}
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                onChange={(e) => onUpdate({ ...campaign, messagePreview: e.target.value })}
                                placeholder="Enter your message..."
                            />
                            <p className={`text-xs mt-1 ${charCount > maxChars ? 'text-red-500' : 'text-gray-400'}`}>
                                {charCount}/{maxChars} characters
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-2">CTA Button Text</label>
                            <input
                                type="text"
                                value={campaign.ctaButton}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => onUpdate({ ...campaign, ctaButton: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-2">Target Segment</label>
                            <input
                                type="text"
                                value={campaign.segment}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => onUpdate({ ...campaign, segment: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="p-6 space-y-4">
                        <div className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4`}>
                            <h4 className="font-semibold text-gray-900 mb-2">{campaign.channel} Features</h4>
                            <div className="flex flex-wrap gap-2">
                                {config.features.map((feature, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Character Limits</h4>
                            <div className="space-y-2 text-sm">
                                {Object.entries(config.limits).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                        <span className="text-gray-600 capitalize">{key}:</span>
                                        <span className="font-medium text-gray-900">{value} characters</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <span className="text-sm text-gray-500">Last saved: Just now</span>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onSimulate}
                        className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 shadow-sm"
                    >
                        <Eye size={16} />
                        <span>Preview Results</span>
                    </button>
                    <button
                        onClick={onSaveDraft}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-sm"
                    >
                        <Save size={16} />
                        <span>Save Draft</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignEditor;
