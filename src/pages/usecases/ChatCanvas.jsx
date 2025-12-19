import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles, CheckCircle2, Users, TrendingUp, DollarSign, Clock, Target } from 'lucide-react';
import { useUseCaseStore } from '../../stores/useCaseStore';

const ChatCanvas = ({ isOpen = false, onClose, initialMessage, useCaseName, useCase: useCaseProp, inlineMode = false }) => {
    const updateUseCase = useUseCaseStore((state) => state.updateUseCase);
    // Get fresh data from store using reactive selector
    const useCase = useUseCaseStore((state) =>
        state.useCases.find(uc => uc.id === useCaseProp?.id)
    ) || useCaseProp;

    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [pendingUpdate, setPendingUpdate] = useState(null);
    const [showOptions, setShowOptions] = useState(true);

    const messagesEndRef = useRef(null);

    // Generate contextual quick actions based on use case data
    const getQuickActions = () => {
        if (!useCase) return [];

        return [
            {
                icon: <Users size={14} />,
                label: 'Total Leads',
                field: 'lead',
                currentValue: useCase.lead?.toLocaleString() || 'N/A',
            },
            {
                icon: <TrendingUp size={14} />,
                label: 'Current AIP',
                field: 'aip',
                currentValue: useCase.aip || 'N/A',
            },
            {
                icon: <DollarSign size={14} />,
                label: 'Cost of AIP',
                field: 'coa',
                currentValue: useCase.coa || 'N/A',
            },
            {
                icon: <DollarSign size={14} />,
                label: 'Budget Left',
                field: 'budgetLeft',
                currentValue: useCase.budgetLeft || 'N/A',
            },
            {
                icon: <Clock size={14} />,
                label: 'Time Left',
                field: 'timeLeft',
                currentValue: useCase.timeLeft || 'N/A',
            },
            {
                icon: <Target size={14} />,
                label: 'Target',
                field: 'target',
                currentValue: useCase.target || 'N/A',
            }
        ];
    };

    // Initialize with welcome message
    useEffect(() => {
        if (useCase && isOpen) {
            setMessages([{
                id: 1,
                sender: 'ai',
                text: `Welcome to **${useCaseName}**! 👋\n\nSelect a metric below to update, or click "View Status" to see all current values.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }]);
            setShowOptions(true);
            setPendingUpdate(null);
        }
    }, [useCaseName, useCase?.id, isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    // Handle when user selects an action to update
    const handleSelectUpdate = (action) => {
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: `Update ${action.label}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMsg]);

        setPendingUpdate({
            field: action.field,
            label: action.label,
            currentValue: action.currentValue
        });
        setShowOptions(false);

        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `📝 **Update ${action.label}**\n\n**Current Value:** ${action.currentValue}\n\nEnter the new value below:`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 300);
    };

    // Handle viewing current status
    const handleViewStatus = () => {
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: 'View Status',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `📊 **Current Status**\n\n` +
                    `👥 **Total Leads:** ${useCase?.lead?.toLocaleString() || 'N/A'}\n` +
                    `📈 **Current AIP:** ${useCase?.aip || 'N/A'}\n` +
                    `💰 **Cost of AIP:** ${useCase?.coa || 'N/A'}\n` +
                    `💵 **Budget Left:** ${useCase?.budgetLeft || 'N/A'}\n` +
                    `⏰ **Time Left:** ${useCase?.timeLeft || 'N/A'}\n` +
                    `🎯 **Target:** ${useCase?.target || 'N/A'}\n` +
                    `✅ **Achieved:** ${useCase?.achieved?.value || 'N/A'}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 300);
    };

    // Process the value input and ask for confirmation
    const handleInputSubmit = () => {
        if (!inputValue.trim()) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMsg]);

        if (pendingUpdate) {
            // Format the value based on field
            let formattedValue = inputValue.trim();
            let displayValue = formattedValue;

            if (pendingUpdate.field === 'lead') {
                formattedValue = parseInt(inputValue.replace(/[,\s]/g, '')) || 0;
                displayValue = formattedValue.toLocaleString();
            } else if (pendingUpdate.field === 'aip') {
                // AIP is now a number, not percentage
                formattedValue = inputValue.replace(/[,\s]/g, '');
                displayValue = formattedValue;
            } else if (pendingUpdate.field === 'coa') {
                const num = parseFloat(inputValue.replace(/[₹,\s]/g, '')) || 0;
                formattedValue = `₹${num}`;
                displayValue = formattedValue;
            } else if (pendingUpdate.field === 'timeLeft') {
                const num = parseInt(inputValue.replace(/[^\d]/g, '')) || 0;
                formattedValue = `${num} Days`;
                displayValue = formattedValue;
            } else if (pendingUpdate.field === 'budgetLeft') {
                // Parse budget input
                const match = inputValue.match(/([\d.]+)\s*(lakhs?|lakh|l|crore|cr)?/i);
                if (match) {
                    const num = parseFloat(match[1]);
                    const unit = match[2]?.toLowerCase() || 'lakhs';
                    let suffix = 'Lakhs';
                    if (unit.startsWith('cr')) suffix = 'Crore';
                    formattedValue = `₹${num} ${suffix}`;
                    displayValue = formattedValue;
                }
            } else if (pendingUpdate.field === 'target') {
                if (!formattedValue.includes('%')) {
                    formattedValue = formattedValue + '%';
                }
                displayValue = formattedValue;
            }

            const confirmData = {
                field: pendingUpdate.field,
                value: formattedValue,
                label: pendingUpdate.label,
                displayValue
            };

            setInputValue('');

            setTimeout(() => {
                const confirmMsg = {
                    id: Date.now() + 1,
                    sender: 'ai',
                    text: `⚠️ **Confirm Update**\n\n**${pendingUpdate.label}**\n${pendingUpdate.currentValue} → **${displayValue}**`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    showConfirmation: true,
                    confirmData: confirmData
                };
                setMessages(prev => [...prev, confirmMsg]);
            }, 300);
        } else {
            setInputValue('');
            setTimeout(() => {
                const aiMsg = {
                    id: Date.now() + 1,
                    sender: 'ai',
                    text: `Select a metric below to update it.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages(prev => [...prev, aiMsg]);
            }, 300);
        }
    };

    // Handle confirmation of update
    const handleConfirm = (confirmData) => {
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: '✓ Confirm',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMsg]);

        // Apply the update to Zustand store
        const updateObj = { [confirmData.field]: confirmData.value };

        // Also update the nested metrics object for consistency
        if (useCase.metrics) {
            updateObj.metrics = {
                ...useCase.metrics,
                [confirmData.field]: confirmData.value
            };
        }

        console.log('Updating use case:', useCase.id, updateObj);
        updateUseCase(useCase.id, updateObj);

        setPendingUpdate(null);
        setShowOptions(true);

        setTimeout(() => {
            const successMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `✅ **Updated!** ${confirmData.label} is now **${confirmData.displayValue}**`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isSuccess: true,
            };
            setMessages(prev => [...prev, successMsg]);
        }, 300);
    };

    // Handle cancellation
    const handleCancel = () => {
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: '✗ Cancel',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMsg]);

        setPendingUpdate(null);
        setShowOptions(true);

        setTimeout(() => {
            const cancelMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `Cancelled. Select another metric to update.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, cancelMsg]);
        }, 300);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleInputSubmit();
    };

    const containerClasses = inlineMode
        ? 'h-full bg-white border border-gray-200 rounded-xl shadow-sm'
        : `fixed right-0 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;

    // Format message text with markdown-like styling
    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    };

    const quickActions = getQuickActions();

    return (
        <div
            className={containerClasses}
            style={
                inlineMode
                    ? { minHeight: '100%', width: '100%' }
                    : { width: 'min(420px, 100vw)', maxWidth: '90vw', top: 0, height: '100vh', boxShadow: '0 0 20px rgba(0,0,0,0.12)' }
            }
        >
            <div className={`flex flex-col h-full ${inlineMode ? '' : 'border-l border-gray-200'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Bot size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">AI Assistant</h3>
                            <p className="text-xs text-green-600 font-medium flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                {useCaseName}
                            </p>
                        </div>
                    </div>
                    {!inlineMode && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                        <div key={msg.id}>
                            <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : msg.isSuccess
                                            ? 'bg-green-50 text-gray-800 border border-green-200 rounded-bl-none'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                        }`}
                                >
                                    {msg.isSuccess && (
                                        <div className="flex items-center gap-1 text-green-600 mb-1">
                                            <CheckCircle2 size={14} />
                                        </div>
                                    )}
                                    <p
                                        className="text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                                    />
                                    <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                                        {msg.timestamp}
                                    </p>
                                </div>
                            </div>

                            {/* Show confirmation buttons */}
                            {msg.showConfirmation && (
                                <div className="flex gap-2 mt-2 ml-2">
                                    <button
                                        onClick={() => handleConfirm(msg.confirmData)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                    >
                                        ✓ Confirm
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                                    >
                                        ✗ Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Options Area - Above Input */}
                <div className="bg-white border-t border-gray-100 px-4 pt-3">
                    {showOptions && (
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-500 font-medium">Quick Actions</p>
                                <button
                                    onClick={handleViewStatus}
                                    className="text-xs text-blue-600 font-medium hover:text-blue-700"
                                >
                                    📊 View Status
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {quickActions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelectUpdate(action)}
                                        className="px-2 py-2 bg-gray-50 border border-gray-200 rounded-lg text-center hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="flex justify-center text-gray-600 mb-1">
                                            {action.icon}
                                        </div>
                                        <p className="text-[10px] text-gray-700 font-medium truncate">{action.label}</p>
                                        <p className="text-[9px] text-gray-400 truncate">{action.currentValue}</p>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Input Area */}
                <div className="px-4 pb-4 bg-white">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={pendingUpdate ? `Enter new ${pendingUpdate.label}...` : "Type a message..."}
                            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                        />
                        <button
                            onClick={handleInputSubmit}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-colors ${inputValue.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!inputValue.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 mt-2">
                        <Sparkles size={12} />
                        <span>Click a metric above to update it</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatCanvas;
