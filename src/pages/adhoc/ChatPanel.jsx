import React from 'react';
import { Bot, Send } from 'lucide-react';

const ChatPanel = ({
    messages,
    inputValue,
    onInputChange,
    onSend,
    suggestions,
    onSuggestionClick
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <Bot className="text-blue-600" size={20} />
                    <h2 className="font-semibold text-gray-900">AI Assistant</h2>
                </div>
                <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => { }}
                >
                    Clear Chat
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.type === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                                <Bot size={16} className="text-blue-600" />
                            </div>
                        )}
                        <div
                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.type === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-md'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Suggestion Chips */}
                {suggestions && suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {suggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSuggestionClick(suggestion)}
                                className="px-3 py-1.5 text-sm border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your instruction..."
                        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                    />
                    <button
                        onClick={onSend}
                        disabled={!inputValue.trim()}
                        className={`p-2 rounded-lg transition-colors ${inputValue.trim()
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
