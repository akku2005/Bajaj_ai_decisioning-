import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Target, DollarSign, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUseCaseStore } from '../stores/useCaseStore';

const CampaignStatsPage = () => {
    const navigate = useNavigate();
    const { campaigns } = useUseCaseStore();

    // Calculate aggregate stats
    const totalCampaigns = campaigns.length;
    const aiSuggestedCount = campaigns.filter(c => c.isAiSuggested).length;
    const sentCount = campaigns.filter(c => c.isSent).length;
    const scheduledCount = campaigns.filter(c => c.isScheduled).length;

    const avgConfidence = Math.round(
        campaigns.reduce((sum, c) => sum + c.aiConfidence, 0) / campaigns.length
    );

    const stats = [
        {
            label: 'Total Campaigns',
            value: totalCampaigns,
            change: '+12.5%',
            trend: 'up',
            icon: Target,
            color: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            label: 'AI Suggested',
            value: aiSuggestedCount,
            change: 'New Today',
            trend: 'neutral',
            icon: Zap,
            color: 'bg-purple-100',
            iconColor: 'text-purple-600'
        },
        {
            label: 'Campaigns Sent',
            value: sentCount,
            change: '+8.2%',
            trend: 'up',
            icon: TrendingUp,
            color: 'bg-green-100',
            iconColor: 'text-green-600'
        },
        {
            label: 'Scheduled',
            value: scheduledCount,
            change: '-2 from yesterday',
            trend: 'down',
            icon: Users,
            color: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
        {
            label: 'Avg AI Confidence',
            value: `${avgConfidence}%`,
            change: '+3.1%',
            trend: 'up',
            icon: DollarSign,
            color: 'bg-indigo-100',
            iconColor: 'text-indigo-600'
        }
    ];

    const channelBreakdown = [
        { channel: 'WhatsApp', count: campaigns.filter(c => c.channel === 'WhatsApp').length, color: 'bg-green-600' },
        { channel: 'SMS', count: campaigns.filter(c => c.channel === 'SMS').length, color: 'bg-blue-600' },
        { channel: 'RCS', count: campaigns.filter(c => c.channel === 'RCS').length, color: 'bg-purple-600' },
        { channel: 'Email', count: campaigns.filter(c => c.channel === 'Email').length, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/campaigns')}
                    className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-800" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Campaign Statistics</h1>
                    <p className="text-gray-600 mt-1">Comprehensive campaign performance metrics</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    <div className="flex items-center mt-2">
                                        {stat.trend === 'up' && <TrendingUp size={16} className="text-green-600 mr-1" />}
                                        {stat.trend === 'down' && <TrendingDown size={16} className="text-red-600 mr-1" />}
                                        <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' :
                                                stat.trend === 'down' ? 'text-red-600' :
                                                    'text-gray-600'
                                            }`}>
                                            {stat.change}
                                        </p>
                                    </div>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className={`${stat.iconColor} w-6 h-6`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Channel Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Distribution</h3>
                    <div className="space-y-4">
                        {channelBreakdown.map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 font-medium">{item.channel}</span>
                                    <span className="text-gray-900 font-bold">{item.count} campaigns</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`${item.color} h-2 rounded-full transition-all duration-500`}
                                        style={{ width: `${(item.count / totalCampaigns) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Status</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-900">AI Suggested</span>
                            </div>
                            <span className="text-lg font-bold text-purple-600">{aiSuggestedCount}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-900">Sent</span>
                            </div>
                            <span className="text-lg font-bold text-green-600">{sentCount}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-900">Scheduled</span>
                            </div>
                            <span className="text-lg font-bold text-gray-600">{scheduledCount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Campaigns Table */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Campaigns (By AI Confidence)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Channel</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Confidence</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Expected Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {campaigns
                                .sort((a, b) => b.aiConfidence - a.aiConfidence)
                                .slice(0, 5)
                                .map((campaign, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{campaign.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${campaign.channelColor}`}>
                                                {campaign.channel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.status === 'Predicted' ? 'bg-purple-100 text-purple-800' :
                                                    campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center space-x-1">
                                                <Zap size={14} className="text-purple-600 fill-current" />
                                                <span className="font-bold text-purple-900">{campaign.aiConfidence}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {campaign.performance.expectedRevenue}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CampaignStatsPage;
