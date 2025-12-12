import React, { useState, useCallback, useRef, useEffect } from 'react';
import CampaignEditor from './CampaignEditor';
import GeneratedOptions from './GeneratedOptions';
import {
    Layers, Zap, Target, Users, TrendingUp,
    MessageSquare, Send, Sparkles, ArrowRight,
    Smartphone, Mail, Bell
} from 'lucide-react';

const AdHocPage = () => {
    // State
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputContext, setInputContext] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const [selectedQuickAction, setSelectedQuickAction] = useState(null);
    const [generatedCampaigns, setGeneratedCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    // Resizing
    const [chatWidth, setChatWidth] = useState(420);
    const [optionsWidth, setOptionsWidth] = useState(340);
    const [isResizingChat, setIsResizingChat] = useState(false);
    const [isResizingOptions, setIsResizingOptions] = useState(false);
    const containerRef = useRef(null);

    // Quick action cards for welcome screen
    const quickActions = [
        {
            id: 'multi-channel',
            icon: Layers,
            title: 'Multi-Channel Campaign',
            description: 'Reach users on WhatsApp, SMS & RCS',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
            prompt: 'Create a multi-channel campaign using WhatsApp, SMS, and RCS'
        },
        {
            id: 'quick-promo',
            icon: Zap,
            title: 'Quick Promotion',
            description: 'Flash sale, festive offer, or limited deal',
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-50',
            prompt: 'Create a quick flash sale promotion campaign'
        },
        {
            id: 'segment-target',
            icon: Users,
            title: 'Segment Targeting',
            description: 'VIP, dormant, or new user campaigns',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50',
            prompt: 'Create a campaign targeting VIP customers'
        },
        {
            id: 'product-promo',
            icon: Target,
            title: 'Product Campaign',
            description: 'Loans, cards, insurance & more',
            color: 'from-orange-500 to-amber-500',
            bgColor: 'bg-orange-50',
            prompt: 'Create a personal loan promotional campaign'
        }
    ];

    // Sub-options when a quick action is selected
    const subOptions = {
        'multi-channel': [
            {
                icon: null,
                customIcon: (
                    <div className="flex -space-x-1">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">W</div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">S</div>
                    </div>
                ),
                label: 'WhatsApp + SMS Fallback',
                description: 'Primary on WhatsApp, fallback to SMS',
                prompt: 'Create a campaign with WhatsApp as primary and SMS as fallback for unreachable users'
            },
            {
                icon: null,
                customIcon: (
                    <div className="flex -space-x-1">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">W</div>
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">R</div>
                    </div>
                ),
                label: 'WhatsApp + RCS Rich',
                description: 'Rich messaging on both channels',
                prompt: 'Create a campaign with WhatsApp and RCS for rich messaging experience'
            },
            {
                icon: null,
                customIcon: (
                    <div className="flex -space-x-1">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">W</div>
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">S</div>
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">R</div>
                    </div>
                ),
                label: 'All Channels',
                description: 'WhatsApp + SMS + RCS combined',
                prompt: 'Create a campaign across all channels - WhatsApp, SMS, and RCS'
            },
        ],
        'quick-promo': [
            { icon: '⚡', label: 'Flash Sale (Today)', prompt: 'Create an urgent flash sale campaign for today with countdown' },
            { icon: '🎉', label: 'Festive Offer', prompt: 'Create a festive season campaign with special offers' },
            { icon: '⏰', label: 'Limited Time Deal', prompt: 'Create a limited time offer campaign expiring in 24 hours' },
            { icon: '🆕', label: 'New Launch', prompt: 'Create a new product launch announcement campaign' },
        ],
        'segment-target': [
            { icon: '👑', label: 'VIP Customers', prompt: 'Create an exclusive campaign for VIP customers with premium offers' },
            { icon: '😴', label: 'Dormant Users', prompt: 'Create a re-engagement campaign for users inactive for 30+ days' },
            { icon: '🆕', label: 'New Signups', prompt: 'Create a welcome campaign for newly registered users' },
            { icon: '🔥', label: 'High Intent Users', prompt: 'Create a conversion campaign for users showing high purchase intent' },
            { icon: '🛒', label: 'Cart Abandoners', prompt: 'Create a cart recovery campaign for users who abandoned checkout' },
        ],
        'product-promo': [
            { icon: '💰', label: 'Personal Loan', prompt: 'Create 3 WhatsApp campaigns promoting personal loan with attractive rates' },
            { icon: '💳', label: 'Credit Card', prompt: 'Create 3 campaigns for credit card benefits and cashback offers' },
            { icon: '🛡️', label: 'Insurance', prompt: 'Create an insurance cross-sell campaign for existing customers' },
            { icon: '🏦', label: 'Fixed Deposit', prompt: 'Create a fixed deposit investment campaign with high interest rates' },
            { icon: '🏠', label: 'Home Loan', prompt: 'Create a home loan campaign with lowest EMI offers' },
        ]
    };

    // Mouse handlers for resizing
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isResizingChat && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                setChatWidth(Math.max(320, Math.min(600, e.clientX - containerRect.left)));
            }
            if (isResizingOptions && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                setOptionsWidth(Math.max(300, Math.min(500, containerRect.right - e.clientX)));
            }
        };

        const handleMouseUp = () => {
            setIsResizingChat(false);
            setIsResizingOptions(false);
        };

        if (isResizingChat || isResizingOptions) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizingChat, isResizingOptions]);

    // Generate campaigns based on prompt
    const generateCampaigns = useCallback((prompt) => {
        const lowerPrompt = prompt.toLowerCase();

        // Determine channel
        let channel = 'WhatsApp';
        if (lowerPrompt.includes('sms')) channel = 'SMS';
        else if (lowerPrompt.includes('rcs')) channel = 'RCS';

        // Determine topic
        let topic = 'Campaign';
        if (lowerPrompt.includes('flash') || lowerPrompt.includes('sale')) topic = 'Flash Sale';
        else if (lowerPrompt.includes('festive')) topic = 'Festive Offer';
        else if (lowerPrompt.includes('vip')) topic = 'VIP Exclusive';
        else if (lowerPrompt.includes('dormant') || lowerPrompt.includes('re-engagement')) topic = 'Re-engagement';
        else if (lowerPrompt.includes('personal loan')) topic = 'Personal Loan';
        else if (lowerPrompt.includes('credit card')) topic = 'Credit Card';
        else if (lowerPrompt.includes('insurance')) topic = 'Insurance';
        else if (lowerPrompt.includes('cart')) topic = 'Cart Recovery';
        else if (lowerPrompt.includes('welcome') || lowerPrompt.includes('new signup')) topic = 'Welcome';

        const templates = [
            { suffix: 'Announcement', desc: 'Direct promotional message with image and CTA button', segment: 'Target Segment', segmentDesc: 'Users matching criteria', cta: 'Shop Now', condition: 'Clicked Link?' },
            { suffix: 'Reminder', desc: 'Follow-up message with urgency', segment: 'Active Users', segmentDesc: 'Users active in last 7 days', cta: 'Act Now', condition: 'Opened Message?' },
            { suffix: 'Last Chance', desc: 'Final reminder before offer expires', segment: 'Interested Users', segmentDesc: 'Users who viewed but not converted', cta: 'Grab Now', condition: 'Converted?' },
        ];

        return templates.map((t, idx) => ({
            id: `camp-${Date.now()}-${idx}`,
            name: `${topic} ${t.suffix}`,
            channel,
            description: t.desc,
            tags: [topic, channel],
            segment: t.segment,
            segmentDescription: t.segmentDesc,
            ctaButton: t.cta,
            condition: t.condition,
            messagePreview: `Hey {{name}}! ${topic} is here - ${t.desc.toLowerCase()}`
        }));
    }, []);

    // Handle quick action click
    const handleQuickActionClick = (action) => {
        setSelectedQuickAction(selectedQuickAction === action.id ? null : action.id);
    };

    // Handle sub-option click
    const handleSubOptionClick = (option) => {
        setInputValue(option.prompt);
        setSelectedQuickAction(null);
    };

    // Handle send
    const handleSend = useCallback(() => {
        if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setShowWelcome(false);

        const currentInput = inputValue;
        setInputValue('');

        // Generate campaigns
        setTimeout(() => {
            const campaigns = generateCampaigns(currentInput);
            setGeneratedCampaigns(campaigns);
            setInputContext(currentInput);

            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'ai',
                text: `✨ I've created ${campaigns.length} campaign suggestions based on your request. Select any campaign from the right panel to view and edit it!`
            }]);
        }, 600);
    }, [inputValue, generateCampaigns]);

    // Campaign handlers
    const handleCampaignSelect = useCallback((campaign) => {
        setSelectedCampaign(campaign);
        setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'ai',
            text: `📋 Now editing "${campaign.name}". Feel free to ask me to make changes!`
        }]);
    }, []);

    const handleGenerateMore = useCallback(() => {
        const newCampaigns = generateCampaigns(inputContext || 'more campaigns');
        setGeneratedCampaigns(prev => [...prev, ...newCampaigns]);
        setMessages(prev => [...prev, { id: Date.now(), type: 'ai', text: '✨ Added more campaign options!' }]);
    }, [inputContext, generateCampaigns]);

    const handleSimulate = useCallback(() => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            type: 'ai',
            text: `📊 Preview for "${selectedCampaign?.name}":\n• Reach: 15K users\n• Open Rate: 68%\n• Click Rate: 4.2%`
        }]);
    }, [selectedCampaign]);

    const handleCloseEditor = useCallback(() => {
        setSelectedCampaign(null);
    }, []);

    const handleSaveDraft = useCallback(() => {
        setMessages(prev => [...prev, { id: Date.now(), type: 'ai', text: `✅ Saved "${selectedCampaign?.name}" as draft!` }]);
    }, [selectedCampaign]);

    const handleCampaignUpdate = useCallback((updated) => {
        setGeneratedCampaigns(prev => prev.map(c => c.id === updated.id ? updated : c));
        setSelectedCampaign(updated);
    }, []);

    const handleNewChat = () => {
        setMessages([]);
        setGeneratedCampaigns([]);
        setSelectedCampaign(null);
        setShowWelcome(true);
        setSelectedQuickAction(null);
        setInputValue('');
    };

    const hasContent = generatedCampaigns.length > 0;

    // Calculate chat panel width:
    // - Full width when no campaigns generated
    // - Fixed width when campaign is selected (to make room for editor)
    // - Flex-1 (remaining space) when campaigns exist but no campaign selected
    const getChatPanelStyle = () => {
        if (!hasContent) {
            return { width: '100%' };
        }
        if (selectedCampaign) {
            return { width: chatWidth };
        }
        return { flex: 1 }; // Take remaining space
    };

    return (
        <div ref={containerRef} className="fixed inset-0 left-[80px] lg:left-[256px] flex bg-gray-100">
            {/* Left Panel - Chat */}
            <div
                className="flex flex-col h-full bg-white relative shadow-lg"
                style={getChatPanelStyle()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                            <Sparkles className="text-white" size={22} />
                        </div>
                        <div>
                            <h2 className="font-bold text-white text-lg">Ad-Hoc Campaign Builder</h2>
                            <p className="text-white/70 text-xs">AI-powered campaign creation</p>
                        </div>
                    </div>
                    {!showWelcome && (
                        <button
                            onClick={handleNewChat}
                            className="text-sm text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all"
                        >
                            + New
                        </button>
                    )}
                </div>

                {/* Welcome Screen OR Chat */}
                {showWelcome ? (
                    <div className="flex-1 overflow-y-auto">
                        {/* Welcome Hero */}
                        <div className="px-8 py-10 text-center bg-gradient-to-b from-gray-50 to-white">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <MessageSquare className="text-white" size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">What campaign would you like to create?</h1>
                            <p className="text-gray-500 max-w-md mx-auto">Choose a quick action below or describe your campaign in the text box</p>
                        </div>

                        {/* Quick Action Cards */}
                        <div className="px-6 pb-6">
                            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {quickActions.map((action) => {
                                    const Icon = action.icon;
                                    const isSelected = selectedQuickAction === action.id;

                                    return (
                                        <div key={action.id} className="relative">
                                            <button
                                                onClick={() => handleQuickActionClick(action)}
                                                className={`w-full p-5 rounded-2xl border-2 transition-all text-left group ${isSelected
                                                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                                                    }`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-md`}>
                                                    <Icon className="text-white" size={24} />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                                                <p className="text-sm text-gray-500">{action.description}</p>
                                                <div className={`mt-3 flex items-center text-sm font-medium transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                                    <span>Choose option</span>
                                                    <ArrowRight size={16} className="ml-1" />
                                                </div>
                                            </button>

                                            {/* Sub-options Dropdown */}
                                            {isSelected && subOptions[action.id] && (
                                                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-gray-200 shadow-xl z-10 overflow-hidden">
                                                    {subOptions[action.id].map((opt, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleSubOptionClick(opt)}
                                                            className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                                                        >
                                                            {opt.customIcon ? (
                                                                <div className="flex-shrink-0">{opt.customIcon}</div>
                                                            ) : (
                                                                <span className="text-xl flex-shrink-0">{opt.icon}</span>
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                                                                {opt.description && (
                                                                    <p className="text-xs text-gray-500 truncate">{opt.description}</p>
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Channel Icons */}
                            <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Smartphone size={18} />
                                    <span className="text-sm">WhatsApp</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Mail size={18} />
                                    <span className="text-sm">SMS</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Bell size={18} />
                                    <span className="text-sm">RCS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.type === 'ai' && (
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                                        <Sparkles className="text-white" size={16} />
                                    </div>
                                )}
                                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${msg.type === 'user'
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Describe your campaign or select an option above..."
                            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className={`p-2.5 rounded-xl transition-all ${inputValue.trim()
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg'
                                : 'bg-gray-200 text-gray-400'
                                }`}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>

                {/* Resize Handle - only when editing campaign */}
                {selectedCampaign && (
                    <div
                        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize bg-gray-200 hover:bg-blue-500 transition-colors"
                        onMouseDown={() => setIsResizingChat(true)}
                    />
                )}
            </div>

            {/* Center Panel - Campaign Editor (only when campaign is selected) */}
            {selectedCampaign && (
                <div className="flex-1 h-full overflow-hidden bg-gray-50">
                    <CampaignEditor
                        campaign={selectedCampaign}
                        onUpdate={handleCampaignUpdate}
                        onSimulate={handleSimulate}
                        onSaveDraft={handleSaveDraft}
                        onClose={handleCloseEditor}
                    />
                </div>
            )}

            {/* Right Panel - Generated Options */}
            {hasContent && (
                <div
                    className="h-full relative bg-white shadow-lg"
                    style={{ width: optionsWidth }}
                >
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize bg-gray-200 hover:bg-blue-500 transition-colors"
                        onMouseDown={() => setIsResizingOptions(true)}
                    />
                    <GeneratedOptions
                        campaigns={generatedCampaigns}
                        selectedId={selectedCampaign?.id}
                        onSelect={handleCampaignSelect}
                        onGenerateMore={handleGenerateMore}
                        inputContext={inputContext}
                    />
                </div>
            )}
        </div>
    );
};

export default AdHocPage;
