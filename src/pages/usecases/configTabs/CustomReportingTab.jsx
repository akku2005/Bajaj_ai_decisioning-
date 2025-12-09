import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Target, DollarSign, Calendar, Download, Filter, RefreshCw, ArrowUp, ArrowDown, Zap, MessageSquare, Mail, Send } from 'lucide-react';

const CustomReportingTab = ({ useCase }) => {
  const [timeRange, setTimeRange] = useState('last30days');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const isActive = useCase?.status === 'Active';

  // If use case is not active, show message
  if (!isActive) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <BarChart3 className="text-blue-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Custom Reporting Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Reporting and analytics are only available for active use cases.
            Complete the configuration and activate your use case to start collecting performance data and insights.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-green-900 mb-3">What you'll see when active:</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>Overall performance metrics (campaigns, reach, conversions, revenue)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>Channel-wise performance breakdown (WhatsApp, SMS, RCS)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>Segment performance and conversion funnels</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>Decision dimension optimization insights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>Guardrails impact analysis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>AI recommendations performance tracking</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>Top performing offers and campaigns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Overall Performance Metrics
  const overallMetrics = {
    totalCampaigns: 42,
    totalReach: 487500,
    totalConversions: 15840,
    conversionRate: 3.25,
    totalRevenue: 847500000,
    roi: 4.2,
    avgEngagement: 18.5,
    activeGuardrails: 8
  };

  // Channel Performance
  const channelPerformance = [
    {
      channel: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-green-500',
      sent: 185000,
      delivered: 182350,
      read: 135200,
      clicked: 28540,
      conversions: 6420,
      ctr: 15.4,
      conversionRate: 3.47,
      revenue: 342000000,
      cost: 83250,
      roas: 4110
    },
    {
      channel: 'SMS',
      icon: Mail,
      color: 'bg-blue-500',
      sent: 220000,
      delivered: 218900,
      read: 153230,
      clicked: 22190,
      conversions: 5998,
      ctr: 10.1,
      conversionRate: 2.73,
      revenue: 289500000,
      cost: 33000,
      roas: 8773
    },
    {
      channel: 'RCS',
      icon: Send,
      color: 'bg-purple-500',
      sent: 82500,
      delivered: 81675,
      read: 62878,
      clicked: 14020,
      conversions: 3422,
      ctr: 17.0,
      conversionRate: 4.15,
      revenue: 216000000,
      cost: 24750,
      roas: 8727
    }
  ];

  // Segment Performance
  const segmentPerformance = [
    { segment: 'High CIBIL (750+)', size: 125000, conversions: 5420, rate: 4.34, revenue: 312000000, avgTicket: 57564 },
    { segment: 'Salary Account 2+ years', size: 152000, conversions: 4870, rate: 3.20, revenue: 285000000, avgTicket: 58520 },
    { segment: 'Visited Loan Page', size: 83000, conversions: 2654, rate: 3.20, revenue: 128500000, avgTicket: 48423 },
    { segment: 'Mid-risk Churners', size: 98000, conversions: 1876, rate: 1.91, revenue: 82000000, avgTicket: 43704 },
    { segment: 'Previous Openers', size: 67000, conversions: 1020, rate: 1.52, revenue: 40000000, avgTicket: 39216 }
  ];

  // Decision Dimension Performance
  const dimensionPerformance = [
    { dimension: 'Frequency', optimal: '2-3 per week', performance: '+18% lift', status: 'Optimized' },
    { dimension: 'Days of Week', optimal: 'Mon-Wed', performance: '+22% engagement', status: 'Optimized' },
    { dimension: 'Channel', optimal: 'WhatsApp primary', performance: '+15% CTR', status: 'Optimized' },
    { dimension: 'Offer', optimal: 'Discount > Voucher', performance: '+12% conversion', status: 'Testing' },
    { dimension: 'Time', optimal: '10 AM - 2 PM', performance: '+25% open rate', status: 'Optimized' },
    { dimension: 'Creative', optimal: 'Carousel format', performance: '+19% engagement', status: 'Testing' }
  ];

  // Conversion Funnel
  const conversionFunnel = [
    { stage: 'Campaign Sent', count: 487500, percentage: 100, color: 'bg-blue-600' },
    { stage: 'Delivered', count: 482925, percentage: 99.1, color: 'bg-blue-500' },
    { stage: 'Opened/Read', count: 351308, percentage: 72.7, color: 'bg-green-600' },
    { stage: 'Clicked', count: 64750, percentage: 13.5, color: 'bg-yellow-600' },
    { stage: 'Applied', count: 24360, percentage: 5.1, color: 'bg-orange-600' },
    { stage: 'Converted', count: 15840, percentage: 3.25, color: 'bg-purple-600' }
  ];

  // Guardrails Impact
  const guardrailsImpact = [
    { name: 'No incentives in November', prevented: 8400, savedCost: 378000, impact: 'Prevented over-saturation' },
    { name: 'Weekend block', prevented: 12300, savedCost: 0, impact: 'Improved customer satisfaction +8%' },
    { name: 'Frequency cap (3/week)', prevented: 45200, savedCost: 0, impact: 'Reduced unsubscribe by 34%' },
    { name: 'Night-time block (9PM+)', prevented: 28900, savedCost: 0, impact: 'Compliance + brand perception' }
  ];

  // AI Recommendations Performance
  const aiRecommendationsPerf = {
    totalSuggestions: 38,
    accepted: 31,
    acceptanceRate: 81.6,
    avgConfidence: 89.4,
    liftVsManual: 14.8,
    timeSaved: 47,
    revenueImpact: 126000000
  };

  // Top Performing Offers
  const topOffers = [
    { offer: '10% Cashback', campaigns: 12, conversions: 4820, revenue: 245000000, ctr: 16.2 },
    { offer: 'Zero Processing Fee', campaigns: 8, conversions: 3940, revenue: 198000000, ctr: 14.8 },
    { offer: 'Amazon Voucher ₹500', campaigns: 6, conversions: 2875, revenue: 142500000, ctr: 13.1 },
    { offer: 'Interest Rate -0.5%', campaigns: 5, conversions: 2340, revenue: 125000000, ctr: 11.9 },
    { offer: 'Extended EMI Tenure', campaigns: 4, conversions: 1865, revenue: 87000000, ctr: 10.4 }
  ];

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const formatNumber = (value) => {
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Custom Reporting Dashboard</h2>
            <p className="text-sm text-gray-600">Comprehensive analytics for your use case performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
              <Download size={16} />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="thisYear">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Channel</label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Channels</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS</option>
              <option value="rcs">RCS</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target size={20} className="text-blue-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={14} />
              <span className="text-xs font-semibold">+12.4%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
          <p className="text-2xl font-bold text-gray-900">{overallMetrics.totalCampaigns}</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users size={20} className="text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={14} />
              <span className="text-xs font-semibold">+8.7%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Reach</p>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(overallMetrics.totalReach)}</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={14} />
              <span className="text-xs font-semibold">+15.2%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Conversions</p>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(overallMetrics.totalConversions)}</p>
          <p className="text-xs text-gray-500 mt-1">{overallMetrics.conversionRate}% rate</p>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign size={20} className="text-orange-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUp size={14} />
              <span className="text-xs font-semibold">+22.1%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Revenue Generated</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(overallMetrics.totalRevenue)}</p>
          <p className="text-xs text-gray-500 mt-1">ROI: {overallMetrics.roi}x</p>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <MessageSquare size={20} className="text-blue-600" />
          <span>Channel Performance Breakdown</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Channel</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sent</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Delivered</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Read</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Clicked</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">CTR</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Conversions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Conv. Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {channelPerformance.map((channel) => {
                const ChannelIcon = channel.icon;
                return (
                  <tr key={channel.channel} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 ${channel.color.replace('500', '100')} rounded`}>
                          <ChannelIcon size={16} className={channel.color.replace('bg-', 'text-')} />
                        </div>
                        <span className="font-semibold text-gray-900">{channel.channel}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-800">{formatNumber(channel.sent)}</td>
                    <td className="px-4 py-4 text-sm text-gray-800">{formatNumber(channel.delivered)}</td>
                    <td className="px-4 py-4 text-sm text-gray-800">{formatNumber(channel.read)}</td>
                    <td className="px-4 py-4 text-sm text-gray-800">{formatNumber(channel.clicked)}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {channel.ctr}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">{formatNumber(channel.conversions)}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {channel.conversionRate}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">{formatCurrency(channel.revenue)}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {channel.roas}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Segment Performance */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Segment Performance</h3>
          <div className="space-y-3">
            {segmentPerformance.map((segment, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{segment.segment}</h4>
                  <span className="text-xs text-gray-500">{formatNumber(segment.size)} customers</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Conversions</p>
                    <p className="text-sm font-bold text-gray-900">{formatNumber(segment.conversions)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rate</p>
                    <p className="text-sm font-bold text-green-600">{segment.rate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-sm font-bold text-blue-600">{formatCurrency(segment.revenue)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            {conversionFunnel.map((stage, idx) => {
              // Calculate funnel width - each stage gets progressively narrower
              const funnelWidth = stage.percentage;

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-900">{stage.stage}</span>
                    <span className="text-gray-600 font-medium">{formatNumber(stage.count)} ({stage.percentage}%)</span>
                  </div>
                  <div className="w-full flex justify-center">
                    <div
                      className={`h-8 ${stage.color} rounded-sm transition-all duration-500`}
                      style={{ width: `${funnelWidth}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t-2 border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-700">Overall Conversion Rate</span>
              <span className="text-3xl font-bold text-purple-600">{overallMetrics.conversionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Dimension Performance */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <BarChart3 size={20} className="text-purple-600" />
          <span>Decision Dimension Performance</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {dimensionPerformance.map((dim, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{dim.dimension}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${dim.status === 'Optimized' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {dim.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Optimal:</span> {dim.optimal}
              </p>
              <p className="text-sm font-bold text-purple-600">{dim.performance}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guardrails Impact */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Guardrails Impact Analysis</h3>
        <div className="space-y-3">
          {guardrailsImpact.map((guardrail, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{guardrail.name}</h4>
                <p className="text-sm text-gray-600">{guardrail.impact}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Prevented</p>
                <p className="text-lg font-bold text-orange-600">{formatNumber(guardrail.prevented)}</p>
                {guardrail.savedCost > 0 && (
                  <p className="text-xs text-green-600">Saved {formatCurrency(guardrail.savedCost)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout - AI & Offers */}
      <div className="grid grid-cols-2 gap-6">
        {/* AI Recommendations Performance */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow border border-purple-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="text-purple-600" size={24} />
            <h3 className="text-lg font-bold text-gray-900">AI Recommendations Impact</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Total Suggestions</p>
              <p className="text-2xl font-bold text-gray-900">{aiRecommendationsPerf.totalSuggestions}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Acceptance Rate</p>
              <p className="text-2xl font-bold text-green-600">{aiRecommendationsPerf.acceptanceRate}%</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Avg Confidence</p>
              <p className="text-2xl font-bold text-purple-600">{aiRecommendationsPerf.avgConfidence}%</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Lift vs Manual</p>
              <p className="text-2xl font-bold text-blue-600">+{aiRecommendationsPerf.liftVsManual}%</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Time Saved</p>
              <p className="text-2xl font-bold text-orange-600">{aiRecommendationsPerf.timeSaved}hrs</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Revenue Impact</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(aiRecommendationsPerf.revenueImpact)}</p>
            </div>
          </div>
        </div>

        {/* Top Performing Offers */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Offers</h3>
          <div className="space-y-3">
            {topOffers.map((offer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{offer.offer}</h4>
                    <p className="text-xs text-gray-500">{offer.campaigns} campaigns</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{formatNumber(offer.conversions)}</p>
                  <p className="text-xs text-green-600">CTR: {offer.ctr}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomReportingTab;
