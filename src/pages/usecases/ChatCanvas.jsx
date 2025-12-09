import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';

const ChatCanvas = ({ isOpen = false, onClose, initialMessage, useCaseName, inlineMode = false }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: `Hello! I'm your AI assistant for **${useCaseName}**. How can I help you optimize this campaign today?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [inputValue, setInputValue] = useState('');

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (initialMessage && isOpen) {
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'user',
                text: initialMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'ai',
                    text: "I've analyzed the campaign data. Based on the current trends, targeting the 'High Intent' segment with a specialized offer could improve conversion rates by up to 15%. Would you like me to draft a proposal?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
            }, 1000);
        }
    }, [initialMessage, isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newUserMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newUserMsg]);
        setInputValue('');
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "That's a great question. Looking at the budget utilization, we have enough runway to experiment with a new channel. I recommend exploring WhatsApp for higher engagement.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, aiMsg]);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const containerClasses = inlineMode
        ? 'h-full bg-white border border-gray-200 rounded-xl shadow-sm'
        : `fixed right-0 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;

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
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Bot size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">AI Assistant</h3>
                            <p className="text-xs text-green-600 font-medium flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                                Online & Ready
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

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p
                                    className={`text-[10px] mt-2 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                                        }`}
                                >
                                    {msg.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about performance, budget, or strategy..."
                            className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                        />
                        <button
                            onClick={handleSend}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full flex items-center justify-center transition-colors ${inputValue.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!inputValue.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-gray-400">
                        <Sparkles size={12} />
                        <span>AI can make mistakes. Please verify important info.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatCanvas;
