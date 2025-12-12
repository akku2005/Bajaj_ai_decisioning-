import React from 'react';
import { Sparkles, Plus } from 'lucide-react';

const GeneratedOptions = ({
    campaigns,
    selectedId,
    onSelect,
    onGenerateMore,
    inputContext
}) => {
    return (
        <div className="flex flex-col h-full bg-gray-50 border-l border-gray-200">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                    <Sparkles className="text-purple-500" size={18} />
                    <h2 className="font-semibold text-gray-900">Generated Options</h2>
                </div>
                {inputContext && (
                    <p className="text-xs text-gray-500 mt-1">Based on "{inputContext}" input</p>
                )}
            </div>

            {/* Campaign List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {campaigns.length === 0 ? (
                    <div className="text-center py-8">
                        <Sparkles className="mx-auto text-gray-300 mb-2" size={32} />
                        <p className="text-sm text-gray-500">No campaigns generated yet</p>
                        <p className="text-xs text-gray-400 mt-1">Ask AI to create campaigns</p>
                    </div>
                ) : (
                    campaigns.map((campaign) => {
                        const isSelected = selectedId === campaign.id;
                        return (
                            <button
                                key={campaign.id}
                                onClick={() => onSelect(campaign)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
                                    ? 'border-blue-500 bg-white shadow-md'
                                    : 'border-transparent bg-white hover:border-gray-200 hover:shadow-sm'
                                    }`}
                            >
                                {/* Channel Badge */}
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${campaign.channel === 'WhatsApp'
                                        ? 'bg-green-100 text-green-700'
                                        : campaign.channel === 'SMS'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-purple-100 text-purple-700'
                                        }`}>
                                        {campaign.channel}
                                    </span>
                                    {isSelected && (
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    )}
                                </div>

                                {/* Title & Description */}
                                <h4 className="font-semibold text-gray-900 text-sm">{campaign.name}</h4>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{campaign.description}</p>

                                {/* Tags */}
                                {campaign.tags && campaign.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {campaign.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </button>
                        );
                    })
                )}
            </div>

            {/* Generate More Button */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <button
                    onClick={onGenerateMore}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <Plus size={16} />
                    <span>Generate More</span>
                </button>
            </div>
        </div>
    );
};

export default GeneratedOptions;
