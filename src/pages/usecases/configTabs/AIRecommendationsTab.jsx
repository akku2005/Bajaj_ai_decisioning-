import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, MessageSquare, Mail, Send, Check, X, ChevronDown, ChevronUp, Sparkles, ThumbsUp, ThumbsDown, Info, AlertCircle } from 'lucide-react';

const AIRecommendationsTab = ({ useCase }) => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [expandedCards, setExpandedCards] = useState({});
  const [chatMessages, setChatMessages] = useState({});
  const [chatInputs, setChatInputs] = useState({});

  const isActive = useCase?.status === 'Active';

  // If use case is not active, show message
  if (!isActive) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="p-4 bg-purple-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Sparkles className="text-purple-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">AI Campaign Recommendations</h2>
          <p className="text-gray-600 mb-6">
            AI-powered campaign suggestions are only available for active use cases.
            Complete the configuration and activate your use case to start receiving personalized campaign recommendations.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-3">What you'll get when active:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Day-wise AI campaign suggestions for today and tomorrow</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Multi-channel recommendations (WhatsApp, SMS, RCS)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>AI reasoning and segment insights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Interactive chatbox to modify campaigns</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✅</span>
                <span>Confidence scores and expected lift metrics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const [recommendations, setRecommendations] = useState({
    today: [
      {
        id: 1,
        channel: 'WhatsApp',
        channelIcon: MessageSquare,
        campaign: 'Personal Loan Pre-Approval Alert',
        targetAudience: 'High CIBIL score customers (750+)',
        audienceSize: 12500,
        timing: '10:00 AM - 12:00 PM',
        offer: '10% Cashback on first loan',
        expectedLift: '+15% CTR',
        confidence: 92,
        status: 'pending',
        aiReasoning: 'High CIBIL score (750+) customers show 42% higher approval rate for premium credit cards. Historical data shows WhatsApp gets 18% CTR for this segment. SMS follow-up with instant approval messaging increases engagement by 22%.',
        whySegment: 'This segment represents high-value customers with excellent credit history. They qualify for premium cards with high credit limits and generate higher interchange revenue. Low default risk makes them ideal for acquisition.',
        improvements: 'Consider highlighting exclusive benefits like lounge access and cashback in first message. A/B test instant approval vs. premium benefits messaging - instant approval typically performs 12% better for high CIBIL segments.',
        optimalSchedule: 'Mon-Wed, 10 AM - 2 PM IST'
      },
      {
        id: 2,
        channel: 'SMS',
        channelIcon: Mail,
        campaign: 'Zero Processing Fee Reminder',
        targetAudience: 'Visited loan page but not applied',
        audienceSize: 8300,
        timing: '12:00 PM - 2:00 PM',
        offer: 'Zero processing fee for loans > ₹5L',
        expectedLift: '+12% conversions',
        confidence: 88,
        status: 'pending',
        aiReasoning: 'Customers who visited the loan page but didn\'t apply show 34% conversion when reminded about fee waivers. Lunch hour timing (12-2 PM) has 28% higher open rates. Creating urgency with limited-time offer increases action by 19%.',
        whySegment: 'High intent customers who dropped off at the application stage. Fee concerns are the #1 barrier to conversion. This segment has active loan interest and can be converted with the right incentive.',
        improvements: 'Add countdown timer showing offer expiry. Include direct link with pre-filled application. Consider personalizing with their browsed loan amount to increase relevance.',
        optimalSchedule: 'Mon-Fri, 12 PM - 2 PM IST'
      },
      {
        id: 3,
        channel: 'RCS',
        channelIcon: Send,
        campaign: 'Festive Season Special Offer',
        targetAudience: 'Salary account holders with tenure > 2 years',
        audienceSize: 15200,
        timing: '7:00 PM - 9:00 PM',
        offer: 'Amazon Voucher ₹500 on activation',
        expectedLift: '+18% engagement',
        confidence: 95,
        status: 'pending',
        aiReasoning: 'Long-tenure salary account holders (2+ years) have 3.2x higher activation rates. Evening timing (7-9 PM) captures peak engagement window. Voucher incentives drive 26% higher click-through vs. cashback for this demographic.',
        whySegment: 'Stable customers with proven income and low churn risk. Long tenure indicates satisfaction and trust. They are likely to activate multiple products and have high lifetime value.',
        improvements: 'Use rich RCS carousel to showcase loan calculator, instant approval badge, and voucher details. Add interactive quick-reply buttons for loan amount selection.',
        optimalSchedule: 'Mon-Thu, 7 PM - 9 PM IST'
      }
    ],
    tomorrow: [
      {
        id: 4,
        channel: 'WhatsApp',
        channelIcon: MessageSquare,
        campaign: 'Weekend Loan Application Drive',
        targetAudience: 'Mid-risk churners with engagement history',
        audienceSize: 9800,
        timing: '9:00 AM - 11:00 AM',
        offer: 'Reduced interest rate 0.5% off',
        expectedLift: '+14% applications',
        confidence: 90,
        status: 'pending',
        aiReasoning: 'Mid-risk churn segment responds well to retention offers. Weekend morning timing (9-11 AM) sees 31% higher engagement as customers have more time. Interest rate discount drives 22% more applications than other incentives.',
        whySegment: 'At-risk customers showing churn signals but with previous positive engagement. Early intervention with attractive offers can prevent churn and reactivate dormant accounts.',
        improvements: 'Emphasize savings calculator showing total interest saved. Include testimonial or trust signal. Consider adding personal relationship manager contact for high-value customers.',
        optimalSchedule: 'Sat-Sun, 9 AM - 11 AM IST'
      },
      {
        id: 5,
        channel: 'SMS',
        channelIcon: Mail,
        campaign: 'Last Day - Processing Fee Waiver',
        targetAudience: 'Customers who opened previous campaign',
        audienceSize: 6700,
        timing: '5:00 PM - 7:00 PM',
        offer: 'Last day for zero processing fee',
        expectedLift: '+20% urgency conversions',
        confidence: 87,
        status: 'pending',
        aiReasoning: 'Previous openers show 45% conversion on urgency-driven follow-ups. "Last day" messaging creates FOMO and drives immediate action. Evening timing captures decision-making window before weekend.',
        whySegment: 'Warm leads who showed interest by opening the first message. Follow-up with urgency converts fence-sitters. High conversion probability with low acquisition cost.',
        improvements: 'Bold "LAST DAY" in caps. Add exact expiry time (e.g., "Expires 11:59 PM today"). Include one-click apply link with prefilled details to reduce friction.',
        optimalSchedule: 'Fri, 5 PM - 7 PM IST'
      }
    ]
  });

  const toggleExpand = (id) => {
    setExpandedCards({
      ...expandedCards,
      [id]: !expandedCards[id]
    });
  };

  const handleChatSubmit = (recId, e) => {
    e.preventDefault();
    const message = chatInputs[recId]?.trim();
    if (!message) return;

    // Add user message
    const newMessages = chatMessages[recId] || [];
    const updatedMessages = [
      ...newMessages,
      { id: Date.now(), type: 'user', text: message }
    ];

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, recId);
      setChatMessages({
        ...chatMessages,
        [recId]: [
          ...updatedMessages,
          { id: Date.now() + 1, type: 'ai', text: aiResponse }
        ]
      });
    }, 1000);

    setChatMessages({
      ...chatMessages,
      [recId]: updatedMessages
    });

    setChatInputs({
      ...chatInputs,
      [recId]: ''
    });
  };

  const generateAIResponse = (message, recId) => {
    const lowerMessage = message.toLowerCase();
    const currentRecs = recommendations[selectedDay];
    const rec = currentRecs.find(r => r.id === recId);

    if (lowerMessage.includes('time') || lowerMessage.includes('when') || lowerMessage.includes('schedule')) {
      return `Based on your segment's behavior, I recommend ${rec.timing}. This timing has shown ${Math.floor(Math.random() * 15 + 20)}% higher engagement. Would you like me to adjust it?`;
    }

    if (lowerMessage.includes('audience') || lowerMessage.includes('segment') || lowerMessage.includes('who')) {
      return `The current target is "${rec.targetAudience}" (~${rec.audienceSize.toLocaleString()} customers). I can help you refine this segment. Would you like to add filters like income range, location, or product holdings?`;
    }

    if (lowerMessage.includes('offer') || lowerMessage.includes('incentive') || lowerMessage.includes('discount')) {
      return `Current offer: "${rec.offer}". Based on similar campaigns, you could also try: (1) Extended EMI tenure, (2) First month free, or (3) Cashback instead of voucher. Which interests you?`;
    }

    if (lowerMessage.includes('channel') || lowerMessage.includes('sms') || lowerMessage.includes('whatsapp')) {
      return `${rec.channel} typically gets ${Math.floor(Math.random() * 10 + 15)}% CTR for this segment. Want me to suggest a multi-channel approach or switch to a different primary channel?`;
    }

    if (lowerMessage.includes('change') || lowerMessage.includes('modify') || lowerMessage.includes('update')) {
      return `I can help you modify: (1) Target audience, (2) Timing/schedule, (3) Offer details, (4) Channel strategy, or (5) Messaging content. What would you like to change?`;
    }

    return `I understand you're asking about the campaign. I can help you optimize: timing, audience targeting, offer structure, or messaging. What specific aspect would you like to improve?`;
  };

  const handleAccept = (day, id) => {
    setRecommendations({
      ...recommendations,
      [day]: recommendations[day].map(rec =>
        rec.id === id ? { ...rec, status: 'accepted' } : rec
      )
    });
  };

  const handleReject = (day, id) => {
    setRecommendations({
      ...recommendations,
      [day]: recommendations[day].map(rec =>
        rec.id === id ? { ...rec, status: 'rejected' } : rec
      )
    });
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'WhatsApp': return 'bg-green-100 text-green-700 border-green-200';
      case 'SMS': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'RCS': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const dayTabs = [
    { id: 'today', label: 'Today', count: recommendations.today.length },
    { id: 'tomorrow', label: 'Tomorrow', count: recommendations.tomorrow.length }
  ];

  const currentRecommendations = recommendations[selectedDay] || [];
  const acceptedCount = currentRecommendations.filter(r => r.status === 'accepted').length;
  const totalAudience = currentRecommendations.reduce((sum, rec) => sum + rec.audienceSize, 0);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Campaign Recommendations</h2>
              <p className="text-sm text-gray-600">AI-suggested campaigns optimized for maximum engagement</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Audience Reach</p>
            <p className="text-2xl font-bold text-purple-600">{totalAudience.toLocaleString()}</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{acceptedCount} Accepted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">{currentRecommendations.filter(r => r.status === 'pending').length} Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{currentRecommendations.filter(r => r.status === 'rejected').length} Rejected</span>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {dayTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedDay(tab.id)}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${selectedDay === tab.id
              ? 'text-purple-700 bg-white border-b-2 border-purple-600'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Calendar size={16} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${selectedDay === tab.id ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-600'
                }`}>
                {tab.count}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Recommendations List */}
      <div className="p-6 space-y-6">
        {currentRecommendations.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No recommendations for this period</p>
          </div>
        ) : (
          currentRecommendations.map((rec) => {
            const ChannelIcon = rec.channelIcon;
            const isExpanded = expandedCards[rec.id];
            const messages = chatMessages[rec.id] || [];

            return (
              <div
                key={rec.id}
                className={`rounded-lg border-2 transition-all ${rec.status === 'accepted' ? 'border-green-200 bg-green-50' :
                  rec.status === 'rejected' ? 'border-red-200 bg-red-50' :
                    'border-gray-200 bg-white hover:border-purple-200 hover:shadow-md'
                  }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Channel Badge */}
                      <div className={`px-3 py-2 rounded-lg border flex items-center space-x-2 ${getChannelColor(rec.channel)}`}>
                        <ChannelIcon size={18} />
                        <span className="font-semibold text-sm">{rec.channel}</span>
                      </div>

                      {/* Campaign Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{rec.campaign}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Users size={14} />
                            <span>{rec.targetAudience}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Audience Size</p>
                            <p className="text-sm font-semibold text-gray-900">{rec.audienceSize.toLocaleString()} customers</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Timing</p>
                            <p className="text-sm font-semibold text-gray-900">{rec.timing}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Offer</p>
                            <p className="text-sm font-semibold text-blue-600">{rec.offer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Expected Lift</p>
                            <div className="flex items-center space-x-2">
                              <TrendingUp size={14} className="text-green-600" />
                              <p className="text-sm font-semibold text-green-600">{rec.expectedLift}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div className="text-right ml-4">
                      <p className="text-xs text-gray-500 mb-1">AI Confidence</p>
                      <p className={`text-2xl font-bold ${getConfidenceColor(rec.confidence)}`}>
                        {rec.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* AI Reasoning Section */}
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <button
                      onClick={() => toggleExpand(rec.id)}
                      className="w-full flex items-center justify-between text-left hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <Sparkles size={16} className="text-orange-500" />
                        <span className="text-sm font-semibold text-gray-900">AI Reasoning</span>
                      </div>
                      {isExpanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 pl-6 border-l-4 border-orange-200">
                        {/* Main Reasoning */}
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                          <p className="text-sm text-gray-800 leading-relaxed">{rec.aiReasoning}</p>
                        </div>

                        {/* Why This Segment */}
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Info size={14} className="text-blue-600" />
                            <h4 className="text-sm font-semibold text-gray-900">Why This Segment?</h4>
                          </div>
                          <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded">{rec.whySegment}</p>
                        </div>

                        {/* Suggested Improvements */}
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle size={14} className="text-orange-600" />
                            <h4 className="text-sm font-semibold text-gray-900">Suggested Improvements</h4>
                          </div>
                          <p className="text-sm text-gray-700 bg-orange-50 p-3 rounded">{rec.improvements}</p>
                        </div>

                        {/* Optimal Schedule */}
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar size={14} className="text-green-600" />
                            <h4 className="text-sm font-semibold text-gray-900">Optimal Schedule</h4>
                          </div>
                          <p className="text-sm text-gray-700 bg-green-50 p-3 rounded font-mono">{rec.optimalSchedule}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Section */}
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                        <MessageSquare size={16} className="text-purple-600" />
                        <span>Chat with AI to modify this campaign</span>
                      </h4>

                      {/* Messages */}
                      {messages.length > 0 && (
                        <div className="mb-3 space-y-2 max-h-48 overflow-y-auto">
                          {messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.type === 'user'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-white text-gray-800 border border-gray-200'
                                  }`}
                              >
                                <p className="text-xs">{msg.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Input */}
                      <form onSubmit={(e) => handleChatSubmit(rec.id, e)} className="flex space-x-2">
                        <input
                          type="text"
                          value={chatInputs[rec.id] || ''}
                          onChange={(e) => setChatInputs({ ...chatInputs, [rec.id]: e.target.value })}
                          placeholder="Ask to modify timing, audience, offer, etc..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition-colors"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                    <div className="flex items-center space-x-2">
                      {rec.status === 'accepted' && (
                        <span className="flex items-center space-x-1 text-sm font-semibold text-green-600">
                          <Check size={16} />
                          <span>Campaign Accepted</span>
                        </span>
                      )}
                      {rec.status === 'rejected' && (
                        <span className="flex items-center space-x-1 text-sm font-semibold text-red-600">
                          <X size={16} />
                          <span>Campaign Rejected</span>
                        </span>
                      )}
                      {rec.status === 'pending' && (
                        <span className="text-sm text-gray-500">Review and take action</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Thumbs Up/Down */}
                      <button
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        title="Good suggestion"
                      >
                        <ThumbsUp size={16} className="text-gray-600" />
                      </button>
                      <button
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        title="Poor suggestion"
                      >
                        <ThumbsDown size={16} className="text-gray-600" />
                      </button>

                      {rec.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleReject(selectedDay, rec.id)}
                            className="ml-2 px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors flex items-center space-x-1"
                          >
                            <X size={16} />
                            <span>Reject</span>
                          </button>
                          <button
                            onClick={() => handleAccept(selectedDay, rec.id)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Select Recommendation
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AIRecommendationsTab;
