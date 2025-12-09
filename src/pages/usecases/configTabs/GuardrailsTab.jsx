import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const GuardrailsTab = ({ guardrails = [], onGuardrailsChange = () => {} }) => {

  const [showModal, setShowModal] = useState(false);
  const [newGuardrail, setNewGuardrail] = useState({
    name: '',
    dimension: 'Offer',
    appliedGroups: '',
    description: '',
    matchingConditions: '',
    excludeWhen: 'Match'
  });

  // Chatbox state
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hi! I'm your Guardrails Assistant. I can help you fill in this form. Try saying 'Create a weekend guardrail' or 'Limit SMS frequency'."
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isProcessing) return;

    const userMessage = chatInput.trim();

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      text: userMessage
    };

    setMessages([...messages, newUserMessage]);
    setChatInput('');
    setIsProcessing(true);

    // Simulate AI processing and response
    setTimeout(() => {
      const aiResponse = processUserRequest(userMessage);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        text: aiResponse
      }]);
      setIsProcessing(false);
    }, 1000);
  };

  const processUserRequest = (input) => {
    const lowerInput = input.toLowerCase();

    // Help fill form based on user request
    if (lowerInput.includes('weekend') || lowerInput.includes('saturday') || lowerInput.includes('sunday')) {
      setNewGuardrail({
        name: 'No communications on weekends',
        dimension: 'Time',
        appliedGroups: 'Bajaj. Control',
        description: 'Prevent all communications on Saturday and Sunday to respect customer time',
        matchingConditions: "where day_of_week IN (6, 7)",
        excludeWhen: 'Match'
      });
      return "✅ I've filled in the form for a weekend guardrail. Review and click 'Create Guardrail' when ready!";
    }

    if (lowerInput.includes('frequency') || (lowerInput.includes('limit') && lowerInput.includes('week'))) {
      setNewGuardrail({
        name: 'Frequency cap - Max 3 per week',
        dimension: 'Frequency',
        appliedGroups: 'Bajaj. Control',
        description: 'Limit communications to maximum 3 per customer per week to avoid fatigue',
        matchingConditions: "where weekly_contact_count >= 3",
        excludeWhen: 'Match'
      });
      return "✅ I've set up a frequency cap guardrail (3 per week). Feel free to adjust the fields!";
    }

    if (lowerInput.includes('night') || lowerInput.includes('evening') || lowerInput.includes('late')) {
      setNewGuardrail({
        name: 'No communications after 9 PM',
        dimension: 'Time',
        appliedGroups: 'Bajaj. Control',
        description: 'Prevent communications after 9 PM to respect customer rest time',
        matchingConditions: "where hour >= 21 OR hour < 8",
        excludeWhen: 'Match'
      });
      return "✅ I've created a guardrail to prevent late-night communications. Adjust as needed!";
    }

    if (lowerInput.includes('sms') && lowerInput.includes('limit')) {
      setNewGuardrail({
        name: 'Limit SMS frequency',
        dimension: 'Channel',
        appliedGroups: 'Bajaj. Control',
        description: 'Control SMS communications to avoid spam perception',
        matchingConditions: "where channel = 'SMS' AND daily_sms_count >= 2",
        excludeWhen: 'Match'
      });
      return "✅ SMS frequency guardrail is ready! Review and create when satisfied.";
    }

    if (lowerInput.includes('offer') || lowerInput.includes('discount') || lowerInput.includes('incentive')) {
      setNewGuardrail({
        name: 'Control offer frequency',
        dimension: 'Offer',
        appliedGroups: 'Bajaj. Control',
        description: 'Prevent sending too many offers to maintain value perception',
        matchingConditions: "where offer_count_30d >= 5",
        excludeWhen: 'Match'
      });
      return "✅ Offer frequency guardrail filled in. You can customize the thresholds!";
    }

    if (lowerInput.includes('churn') || lowerInput.includes('high risk')) {
      setNewGuardrail({
        name: 'Skip high churn risk customers',
        dimension: 'Other',
        appliedGroups: 'Bajaj. Control',
        description: 'Exclude customers with high churn risk from promotional campaigns',
        matchingConditions: "where churn_risk_score > 0.8",
        excludeWhen: 'Match'
      });
      return "✅ Churn risk guardrail created! Adjust the risk threshold as needed.";
    }

    // Help requests
    if (lowerInput.includes('help') || lowerInput.includes('what can you')) {
      return "I can help you create guardrails! Try:\n\n✅ 'Create weekend guardrail'\n✅ 'Limit SMS frequency'\n✅ 'No communications at night'\n✅ 'Control offer frequency'\n✅ 'Skip high churn customers'\n\nJust describe what you need!";
    }

    // Clear form
    if (lowerInput.includes('clear') || lowerInput.includes('reset')) {
      setNewGuardrail({
        name: '',
        dimension: 'Offer',
        appliedGroups: '',
        description: '',
        matchingConditions: '',
        excludeWhen: 'Match'
      });
      return "✅ Form cleared! Ready for a new guardrail.";
    }

    // Default response with suggestions
    return "I can help you create guardrails! Tell me what you need:\n\n💡 Examples:\n- 'Help me create a weekend guardrail'\n- 'Limit SMS to 2 per day'\n- 'No offers to churning customers'\n- 'Block late night communications'\n\nWhat would you like to set up?";
  };

  const handleCreateGuardrail = () => {
    if (!newGuardrail.name || !newGuardrail.description) {
      alert('Please fill in at least Name and Description');
      return;
    }

    onGuardrailsChange([
      ...guardrails,
      {
        ...newGuardrail,
        id: Date.now()
      }
    ]);

    // Reset form
    setNewGuardrail({
      name: '',
      dimension: 'Offer',
      appliedGroups: '',
      description: '',
      matchingConditions: '',
      excludeWhen: 'Match'
    });
    setShowModal(false);
  };

  const handleDeleteGuardrail = (id) => {
    onGuardrailsChange(guardrails.filter(g => g.id !== id));
  };

  const handleExcludeWhenChange = (id, value) => {
    onGuardrailsChange(guardrails.map(g =>
      g.id === id ? { ...g, excludeWhen: value } : g
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header with Create Button */}
      <div className="flex justify-end p-4 border-b border-gray-200">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Create guardrail
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Dimension
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Applied Groups
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Matching Conditions
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Exclude When
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">

              </th>
            </tr>
          </thead>
          <tbody>
            {guardrails.map((guardrail) => (
              <tr key={guardrail.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-4">
                  <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                    {guardrail.name}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-800">{guardrail.dimension}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-800">{guardrail.appliedGroups}</span>
                </td>
                <td className="px-4 py-4 max-w-xs">
                  <span className="text-sm text-gray-800">{guardrail.description}</span>
                </td>
                <td className="px-4 py-4">
                  <code className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded font-mono">
                    {guardrail.matchingConditions}
                  </code>
                </td>
                <td className="px-4 py-4">
                  <select
                    value={guardrail.excludeWhen}
                    onChange={(e) => handleExcludeWhenChange(guardrail.id, e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Match">Match</option>
                    <option value="No Match">No Match</option>
                    <option value="Always">Always</option>
                    <option value="Never">Never</option>
                  </select>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleDeleteGuardrail(guardrail.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete guardrail"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {guardrails.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No guardrails configured. Click "Create guardrail" to add one.
          </div>
        )}
      </div>

      {/* Create Guardrail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 space-y-4 border border-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900">Create Guardrail</h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={newGuardrail.name}
                  onChange={(e) => setNewGuardrail({ ...newGuardrail, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Do not send incentives in November"
                />
              </div>

              {/* Dimension */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dimension
                </label>
                <select
                  value={newGuardrail.dimension}
                  onChange={(e) => setNewGuardrail({ ...newGuardrail, dimension: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Offer">Offer</option>
                  <option value="Channel">Channel</option>
                  <option value="Time">Time</option>
                  <option value="Creative">Creative</option>
                  <option value="Frequency">Frequency</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Applied Groups */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Applied Groups
                </label>
                <input
                  type="text"
                  value={newGuardrail.appliedGroups}
                  onChange={(e) => setNewGuardrail({ ...newGuardrail, appliedGroups: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Bajaj. Control"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newGuardrail.description}
                  onChange={(e) => setNewGuardrail({ ...newGuardrail, description: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe what this guardrail does..."
                />
              </div>

              {/* Matching Conditions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matching Conditions
                </label>
                <textarea
                  value={newGuardrail.matchingConditions}
                  onChange={(e) => setNewGuardrail({ ...newGuardrail, matchingConditions: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="where condition = value AND ..."
                />
              </div>

              {/* Exclude When */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Exclude When
                </label>
                <select
                  value={newGuardrail.excludeWhen}
                  onChange={(e) => setNewGuardrail({ ...newGuardrail, excludeWhen: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Match">Match</option>
                  <option value="No Match">No Match</option>
                  <option value="Always">Always</option>
                  <option value="Never">Never</option>
                </select>
              </div>
            </div>

            {/* AI Chatbox inside Modal */}
            <div className="border-t border-gray-200 bg-gray-50 -mx-6 px-6 py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">💬 AI Assistant</h4>
                  <span className="text-xs text-gray-500">Get help creating this guardrail</span>
                </div>

                {/* Message Display Area */}
                <div className="bg-white rounded-lg border border-gray-200 p-3 h-48 overflow-y-auto space-y-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 ${message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        <p className="text-xs whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex space-x-1.5">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI to help... (e.g., 'Help me create a weekend guardrail')"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isProcessing}
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isProcessing}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewGuardrail({
                    name: '',
                    dimension: 'Offer',
                    appliedGroups: '',
                    description: '',
                    matchingConditions: '',
                    excludeWhen: 'Match'
                  });
                }}
                className="px-5 py-2.5 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGuardrail}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Guardrail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardrailsTab;
