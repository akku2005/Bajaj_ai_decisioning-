import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUseCaseStore } from '../stores/useCaseStore';
import { Zap, Save, ArrowLeft, Send, Calendar, MessageSquare } from 'lucide-react';

const channelOptions = ['WhatsApp', 'SMS', 'RCS'];
const deliveryOptions = ['Immediate', 'Scheduled', 'Triggered'];

const CampaignEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaigns = useUseCaseStore((state) => state.campaigns);
  const updateCampaign = useUseCaseStore((state) => state.updateCampaign);

  const campaign = useMemo(() => campaigns.find((c) => c.id === id), [campaigns, id]);

  const [form, setForm] = useState(() => ({
    name: campaign?.name || '',
    type: campaign?.type || '',
    product: campaign?.product || '',
    channel: campaign?.channel || channelOptions[0],
    deliveryType: campaign?.deliveryType || deliveryOptions[0],
    segment: campaign?.aiSuggestion?.segment || campaign?.segment || '',
    content: campaign?.aiSuggestion?.content || campaign?.content || '',
    sendAt: campaign?.aiSuggestion?.recommendedTime || campaign?.scheduleInfo?.sendAt || '',
    templateName: campaign?.templateName || '',
    mediaUrl: campaign?.mediaUrl || '',
  }));

  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hi! I can help you refine this campaign. Ask about better timing, segment tweaks, or content suggestions.' },
  ]);
  const [input, setInput] = useState('');

  if (!campaign) {
    return (
      <div className="space-y-4">
        <button onClick={() => navigate('/campaigns')} className="text-blue-600 text-sm flex items-center space-x-2">
          <ArrowLeft size={16} /> <span>Back to campaigns</span>
        </button>
        <p className="text-gray-700">Campaign not found.</p>
      </div>
    );
  }

  const suggestionChips = [
    'Suggest best send time for this audience',
    'Optimize content for higher CTR',
    'Reduce CPA by reallocating channel budget',
    'Shorten message for mobile users',
    'Use richer media on RCS',
  ];

  const buildPayload = (statusOverride) => ({
    ...campaign,
    name: form.name,
    type: form.type,
    product: form.product,
    channel: form.channel,
    deliveryType: form.deliveryType,
    segment: form.segment,
    content: form.content,
    aiSuggestion: {
      ...campaign.aiSuggestion,
      segment: form.segment,
      content: form.content,
      recommendedTime: form.sendAt,
    },
    scheduleInfo: form.deliveryType === 'Scheduled'
      ? { ...(campaign.scheduleInfo || {}), sendAt: form.sendAt, template: form.content }
      : campaign.scheduleInfo,
    templateName: form.templateName,
    mediaUrl: form.mediaUrl,
    status: statusOverride ?? (campaign.status === 'Predicted' ? 'Draft' : campaign.status),
  });

  const handleSaveDraft = () => {
    updateCampaign(campaign.id, buildPayload('Draft'));
    navigate('/campaigns');
  };

  const handleLaunch = () => {
    const launchStatus = form.deliveryType === 'Scheduled' ? 'Scheduled' : 'Sent';
    updateCampaign(campaign.id, buildPayload(launchStatus));
    navigate('/campaigns');
  };

  const handleChat = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        text: `Try sending at ${form.sendAt || '6-8 PM IST'} on ${form.channel}. Consider segment "${form.segment || 'High-intent users'}" and highlight ${form.product || 'your offer'} for better CTR.`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => navigate('/campaigns')} className="text-blue-600 text-sm flex items-center space-x-2 mb-1">
            <ArrowLeft size={16} /> <span>Back to campaigns</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Edit Campaign</h1>
          <p className="text-sm text-gray-500">AI suggested campaigns can be edited here. Chat with AI or adjust manually.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveDraft}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 text-sm font-semibold rounded-md hover:bg-gray-50 transition-colors text-gray-800"
          >
            <Save size={16} />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleLaunch}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-md hover:bg-purple-700 transition-colors"
          >
            <Send size={16} />
            <span>Launch Campaign</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Campaign Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Product</label>
                <input
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                <input
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Channel</label>
                <select
                  value={form.channel}
                  onChange={(e) => setForm({ ...form, channel: e.target.value })}
                  disabled={campaign.isAiSuggested}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${campaign.isAiSuggested ? 'bg-gray-50 text-gray-500 border-gray-200' : 'border-gray-200'}`}
                >
                  {channelOptions.map((c) => <option key={c}>{c}</option>)}
                </select>
                {campaign.isAiSuggested && (
                  <p className="text-[11px] text-gray-500 mt-1">AI recommended channel is locked. Adjust timing, segment, or content instead.</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Delivery Type</label>
                <select
                  value={form.deliveryType}
                  onChange={(e) => setForm({ ...form, deliveryType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {deliveryOptions.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Send Time</label>
                <div className="flex items-center px-3 py-2 border border-gray-200 rounded-md">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    value={form.sendAt}
                    onChange={(e) => setForm({ ...form, sendAt: e.target.value })}
                    className="w-full outline-none"
                    placeholder="e.g., Today 6-8 PM IST"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Segment</label>
                <input
                  value={form.segment}
                  onChange={(e) => setForm({ ...form, segment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Message copy..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Template Name</label>
                <input
                  value={form.templateName}
                  onChange={(e) => setForm({ ...form, templateName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Loan_Upgrade_Template_01"
                />
                <p className="text-[11px] text-gray-500 mt-1">Use the approved template for WhatsApp/RCS (auto-maps variables).</p>
              </div>
              <div>
                {form.channel === 'RCS' ? (
                  <>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Media URL (optional)</label>
                    <input
                      value={form.mediaUrl}
                      onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://... (image/video for rich card)"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">Add media for richer RCS cards; keep under provider limits.</p>
                  </>
                ) : form.channel === 'SMS' ? (
                  <p className="text-[12px] text-gray-600 mt-6">SMS: keep under 160 chars and include opt-out where required.</p>
                ) : (
                  <p className="text-[12px] text-gray-600 mt-6">WhatsApp: ensure this template is approved and variables are mapped.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Zap size={18} className="text-purple-600" />
              <p className="text-sm font-semibold text-gray-900">AI Assistant</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestionChips.map((s) => (
                <button
                  key={s}
                  onClick={() => handleChat(s)}
                  className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="h-56 overflow-y-auto border border-gray-100 rounded-md p-3 bg-gray-50 space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                      msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the AI to refine timing, channel, or content..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleChat(input)}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Send size={16} className="mr-1" />
                Ask
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-2">
            <div className="flex items-center space-x-2">
              <MessageSquare size={16} className="text-blue-600" />
              <p className="text-sm font-semibold text-gray-900">Campaign summary</p>
            </div>
            <p className="text-sm text-gray-700"><strong>Status:</strong> {campaign.status}</p>
            <p className="text-sm text-gray-700"><strong>AI confidence:</strong> {campaign.aiConfidence}%</p>
            <p className="text-sm text-gray-700"><strong>Recommended send:</strong> {form.sendAt || '—'}</p>
            <p className="text-sm text-gray-700"><strong>Segment:</strong> {form.segment || '—'}</p>
            <p className="text-sm text-gray-700"><strong>Channel:</strong> {form.channel}</p>
            <p className="text-sm text-gray-700"><strong>Template:</strong> {form.templateName || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignEditor;
