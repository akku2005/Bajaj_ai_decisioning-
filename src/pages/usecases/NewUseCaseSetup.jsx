import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Save, Zap, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUseCaseStore } from '../../stores/useCaseStore';

const NewUseCaseSetup = () => {
    const navigate = useNavigate();
    const useCases = useUseCaseStore((state) => state.useCases);
    const setUseCases = useUseCaseStore((state) => state.setUseCases);
    const [aiMessages, setAiMessages] = useState([
        { id: 1, type: 'ai', text: 'Tell me the audience, goal, and budget. I will propose a use case setup.' },
    ]);
    const [aiInput, setAiInput] = useState('');
    const aiSuggestions = [
        'Suggest targets and budget for credit card cross-sell',
        'Recommend channels for high CIBIL loan seekers',
        'How should I pace budget over 3 months?',
        'Give template and segment for WhatsApp campaign',
        'What guardrails should I set for approvals and CPA?',
        'Draft segments for reactivation vs acquisition cohorts',
        'Best delivery window for this audience and channel mix?',
        'Propose KPIs and success metrics for this use case',
    ];

    const [formData, setFormData] = useState({
        product: 'Personal Loan',
        objective: 'Lead Growth',
        name: '', // Auto-generated
        budget: '',
        weeklyBudget: '',
        firstWeekBudget: '',
        target: '',
        startDate: new Date().toISOString().split('T')[0],
        duration: '3',
        durationUnit: 'Months',
    });

    // Auto-generate name based on Product and Objective
    useEffect(() => {
        const productCode =
            formData.product === 'Personal Loan' ? 'PL' :
                formData.product === 'Credit Card' ? 'CC' :
                    formData.product === 'Insurance' ? 'INS' :
                        formData.product === 'Home Loan' ? 'HL' : 'GEN';

        setFormData(prev => ({
            ...prev,
            name: `${productCode} - ${formData.objective}`
        }));
    }, [formData.product, formData.objective]);

    const handleInputChange = (field, value) => {
        if (field === 'durationUnit') {
            const currentUnit = formData.durationUnit;
            const currentDuration = parseFloat(formData.duration) || 0;
            let newDuration = currentDuration;

            if (currentUnit === 'Months' && value === 'Weeks') {
                newDuration = currentDuration * 4;
            } else if (currentUnit === 'Weeks' && value === 'Months') {
                newDuration = Math.ceil(currentDuration / 4);
            }

            setFormData({ ...formData, duration: newDuration.toString(), durationUnit: value });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const handleSaveUseCase = () => {
        if (!formData.name) {
            alert('Please fill in required fields');
            return;
        }

        const useCaseId = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const totalDays =
            formData.durationUnit === 'Months' ? parseInt(formData.duration) * 30 :
                formData.durationUnit === 'Weeks' ? parseInt(formData.duration) * 7 :
                    parseInt(formData.duration);

        const newUseCaseObj = {
            id: useCaseId,
            name: formData.name,
            description: `Campaign for ${formData.product}`,
            goal: `${formData.target}% ${formData.objective}`,
            status: 'Paused',
            pauseStatus: 'Configure',

            // Core Metrics
            lead: 0,
            aip: '0%',
            coa: '₹0.00',
            targetAchieved: 0,

            // Detailed Metrics Object
            metrics: {
                lead: 0,
                aip: '0%',
                coa: '₹0.00',
                targetAchieved: 0,
            },

            // KPI & Budget
            quarterlyGoal: formData.target ? `${formData.target}%` : '0%',
            budget: formData.budget ? `₹${formData.budget}` : '₹0',
            budgetDetails: {
                total: formData.budget,
                weekly: formData.weeklyBudget,
                firstWeek: formData.firstWeekBudget || '0'
            },
            target: formData.target ? `${formData.target}%` : '0%',

            // Performance Data (Initialized to 0)
            achieved: { value: '0%', helper: '(0% of target)' },
            expected: { value: '0%', helper: '(0% of target)' },
            currentPerformance: {
                actual: '0%',
                expectedProgress: '0%',
                conversionForecast: '0%',
                cap: formData.target ? `${formData.target}%` : '0%',
            },

            // Timeline
            timeline: {
                start: 'Today',
                current: `Today (Day 1/${totalDays})`,
                end: 'Future',
                progress: 0
            },

            // Empty states for other features
            todayGroup: { improveAppBy: 0, percentage: 0 },
            budgetAdjustment: { increaseSpendBy: 0 },
            adjustments: { improveAip: 0, increaseSpend: '0' },
            overrides: {
                overrideDuration: 'today',
                channelBoost: 'sms',
                focus: 'monitored',
            },
        };

        setUseCases([...useCases, newUseCaseObj]);
        navigate('/use-cases');
    };

    const handleAiChat = (text) => {
        if (!text.trim()) return;
        const userMsg = { id: Date.now(), type: 'user', text: text.trim() };
        setAiMessages((prev) => [...prev, userMsg]);
        setAiInput('');
        setTimeout(() => {
            const reply = `Try ${formData.objective} on ${formData.product} with budget ${formData.budget || '₹50K'}, duration ${formData.duration} ${formData.durationUnit.toLowerCase()}, pacing weekly: ${formData.weeklyBudget || '₹12K'}, channels: WhatsApp + SMS, segment: high-intent recent visitors.`;
            setAiMessages((prev) => [...prev, { id: Date.now() + 1, type: 'ai', text: reply }]);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-screen-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/use-cases')}
                        className="flex items-center text-gray-500 hover:text-gray-700 mb-4 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Use Cases
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">New Use Case Setup</h1>
                            <p className="text-gray-600 mt-2">Configure parameters for your new marketing campaign</p>
                        </div>
                        <div className="hidden sm:block text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
                            Draft ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-8 space-y-10">

                        {/* Section 1: Core Identity */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center">
                                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                                Core Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Product Line</label>
                                    <select
                                        value={formData.product}
                                        onChange={(e) => handleInputChange('product', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
                                    >
                                        <option value="Personal Loan">Personal Loan (PL)</option>
                                        <option value="Credit Card">Credit Card (CC)</option>
                                        <option value="Insurance">Insurance</option>
                                        <option value="Home Loan">Home Loan (HL)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Campaign Objective</label>
                                    <select
                                        value={formData.objective}
                                        onChange={(e) => handleInputChange('objective', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
                                    >
                                        <option value="Lead Growth">Lead Growth</option>
                                        <option value="AIP Uplift">AIP Uplift</option>
                                        <option value="Approval Uplift">Approval Uplift</option>
                                        <option value="Customer Retention">Customer Retention</option>
                                        <option value="Cross-Sell">Cross-Sell</option>
                                        <option value="Upsell">Upsell</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Generated Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        readOnly
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">This will be the display name on your dashboard.</p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Metrics & Goals */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center">
                                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                                Metrics & Goals
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Target Value (%)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={formData.target}
                                            onChange={(e) => handleInputChange('target', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg pl-3 pr-8 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            placeholder="15"
                                        />
                                        <span className="absolute right-3 top-2.5 text-gray-400 text-sm">%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Total Budget</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₹</span>
                                        <input
                                            type="text"
                                            value={formData.budget}
                                            onChange={(e) => handleInputChange('budget', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg pl-6 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            placeholder="e.g. 50000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Weekly Budget</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₹</span>
                                        <input
                                            type="text"
                                            value={formData.weeklyBudget}
                                            onChange={(e) => handleInputChange('weeklyBudget', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg pl-6 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            placeholder="e.g. 10000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                                        First Week Budget <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₹</span>
                                        <input
                                            type="text"
                                            value={formData.firstWeekBudget}
                                            onChange={(e) => handleInputChange('firstWeekBudget', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg pl-6 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            placeholder="e.g. 5000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Timeline */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center">
                                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                                Timeline
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Duration</label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="number"
                                            value={formData.duration}
                                            onChange={(e) => handleInputChange('duration', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            placeholder="3"
                                        />
                                        <select
                                            value={formData.durationUnit}
                                            onChange={(e) => handleInputChange('durationUnit', e.target.value)}
                                            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none"
                                        >
                                            <option value="Weeks">Weeks</option>
                                            <option value="Months">Months</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-200 px-8 py-5 bg-gray-50 flex justify-end space-x-3">
                        <button
                            onClick={() => navigate('/use-cases')}
                            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-white hover:shadow-sm font-medium transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveUseCase}
                            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow font-semibold flex items-center space-x-2 transition-all"
                        >
                            <Save size={18} />
                            <span>Create Use Case</span>
                        </button>
                    </div>
                </div>

                {/* AI Copilot for use case setup */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
                    <div className="flex items-center space-x-2 mb-2">
                        <Zap size={18} className="text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-900">AI Setup Copilot</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleAiChat(s)}
                                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <div className="h-52 overflow-y-auto border border-gray-100 rounded-md p-3 bg-gray-50 space-y-2">
                        {aiMessages.map((msg) => (
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
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            placeholder="Ask AI to suggest budget, duration, or audience..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => handleAiChat(aiInput)}
                            className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-md hover:bg-purple-700 transition-colors inline-flex items-center"
                        >
                            <Send size={16} className="mr-1" />
                            Ask
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewUseCaseSetup;
