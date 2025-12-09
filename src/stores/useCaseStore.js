import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultSegments = [
  { label: '25% CREDIT', value: 25, color: 'bg-blue-700' },
  { label: '10% CURRENT CREDIT: CB/CCI, PL/OLA', value: 10, color: 'bg-green-500' },
  { label: '10% CONTROL CHECK', value: 10, color: 'bg-yellow-400' },
  { label: '10% PREVENT CHURN', value: 10, color: 'bg-orange-500' },
  { label: '10%', value: 10, color: 'bg-red-500' },
];

const defaultGroups = [
  {
    name: 'AI suggestion',
    color: 'bg-blue-600',
    condition: 'days_since_signup >= 64 AND\nis_excluded_l6 = FALSE AND\nis_unsubscribed_l6 = FALSE',
    note: 'Exclude at least 1 ML/AI Group',
    prediction: 'Please select the prediction method',
  },
  {
    name: 'Control Group',
    color: 'bg-yellow-500',
    condition:
      "WHERE customer_id ends WITH ('0', 'a', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'b', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk', 'bl', 'bm', 'bn', 'bo', 'bp', 'c')",
    prediction: 'Do not send recommendations',
  },
  {
    name: 'Holdout Group',
    color: 'bg-red-500',
    condition:
      "WHERE customer_id ends WITH ('b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk', 'bl', 'bm', 'bn', 'bo', 'bp', 'c')",
    prediction: 'Do not send recommendations',
  },
];

const defaultUseCases = [
  {
    id: 'pl-aip-uplift',
    name: 'PL - AIP Uplift',
    description: 'Goal: 15% AIP',
    goal: '15% AIP',
    status: 'Active',
    pauseStatus: 'Pause',
    lead: 1204,
    aip: '89%',
    coa: '₹15.72',
    targetAchieved: 75,
    metrics: {
      lead: 1204,
      aip: '89%',
      coa: '₹15.72',
      targetAchieved: 75,
    },
    quarterlyGoal: '15%',
    budget: 'XMN INR',
    target: '15%',
    achieved: { value: '7.2%', helper: '(48% of target)' },
    expected: { value: '8.3%', helper: '(55% of target)' },
    currentPerformance: {
      actual: '7.2%',
      expectedProgress: '8.3%',
      conversionForecast: '7.8%',
      cap: '15%',
    },
    // Status Details
    budgetLeft: '₹8.5 Lakhs',
    timeLeft: '23 Days',
    campaignsSent: 12,
    campaignsScheduled: 4,
    timeline: { start: 'Oct 1', current: 'Today (Day 68/91)', end: 'Dec 31', progress: 75 },
    todayGroup: { improveAppBy: 5, percentage: 5 },
    budgetAdjustment: { increaseSpendBy: 10000 },
    adjustments: { improveAip: 5, increaseSpend: '10000' },
    overrides: {
      overrideDuration: 'today',
      channelBoost: 'sms',
      focus: 'monitored',
    },
    // Audience Data
    audienceCount: '832,679',
    segments: defaultSegments,
    groups: defaultGroups,
  },
  {
    id: 'cc-lead-growth',
    name: 'CC - Lead Growth',
    description: 'Campaign for credit cards',
    goal: 'Lead Growth',
    status: 'Active',
    pauseStatus: 'Pause',
    lead: 852,
    aip: '12.5%',
    coa: '₹21.40',
    targetAchieved: 92,
    metrics: {
      lead: 852,
      aip: '12.5%',
      coa: '₹21.40',
      targetAchieved: 92,
    },
    quarterlyGoal: '12%',
    budget: '₹1.2M',
    target: '12%',
    achieved: { value: '10.5%', helper: '(88% of target)' },
    expected: { value: '11%', helper: '(92% of target)' },
    currentPerformance: {
      actual: '10.5%',
      expectedProgress: '11%',
      conversionForecast: '10.8%',
      cap: '12%',
    },
    // Status Details
    budgetLeft: '₹4.2 Lakhs',
    timeLeft: '58 Days',
    campaignsSent: 8,
    campaignsScheduled: 6,
    timeline: { start: 'Jan 1', current: 'Today (Day 32/90)', end: 'Mar 31', progress: 60 },
    todayGroup: { improveAppBy: 3, percentage: 3 },
    budgetAdjustment: { increaseSpendBy: 75000 },
    adjustments: { improveAip: 3, increaseSpend: '75000' },
    overrides: {
      overrideDuration: 'today',
      channelBoost: 'sms',
      focus: 'monitored',
    },
    // Audience Data
    audienceCount: '1,245,300',
    segments: [
      { label: 'High Intent', value: 40, color: 'bg-purple-600' },
      { label: 'Medium Intent', value: 30, color: 'bg-blue-500' },
      { label: 'Low Intent', value: 30, color: 'bg-gray-400' },
    ],
    groups: [
      {
        name: 'Prime Segment',
        color: 'bg-purple-600',
        condition: 'credit_score > 750 AND existing_card_holder = FALSE',
        note: null,
        prediction: 'Propensity model',
      },
      {
        name: 'Standard Control',
        color: 'bg-gray-500',
        condition: 'RANDOM_SAMPLE(10%)',
        prediction: 'Do not send recommendations',
      }
    ],
  },
  {
    id: 'insurance-approval-uplift',
    name: 'Insurance - Approval Uplift',
    description: 'Optimize insurance approvals',
    goal: 'Approval Uplift',
    status: 'Paused',
    pauseStatus: 'Configure',
    lead: 450,
    aip: '67%',
    coa: '₹34.20',
    targetAchieved: 45,
    metrics: {
      lead: 450,
      aip: '67%',
      coa: '₹34.20',
      targetAchieved: 45,
    },
    quarterlyGoal: '10%',
    budget: '₹850K',
    target: '10%',
    achieved: { value: '4.5%', helper: '(45% of target)' },
    expected: { value: '6.2%', helper: '(62% of target)' },
    currentPerformance: {
      actual: '4.5%',
      expectedProgress: '6.2%',
      conversionForecast: '5.2%',
      cap: '10%',
    },
    // Status Details
    budgetLeft: '₹6.8 Lakhs',
    timeLeft: '72 Days',
    campaignsSent: 3,
    campaignsScheduled: 5,
    timeline: { start: 'Feb 1', current: 'Today (Day 18/90)', end: 'Apr 30', progress: 20 },
    todayGroup: { improveAppBy: 6, percentage: 6 },
    budgetAdjustment: { increaseSpendBy: 50000 },
    adjustments: { improveAip: 6, increaseSpend: '50000' },
    overrides: {
      overrideDuration: 'today',
      channelBoost: 'sms',
      focus: 'monitored',
    },
    // Audience Data
    audienceCount: '56,780',
    segments: [
      { label: 'Policy Renewal', value: 60, color: 'bg-indigo-600' },
      { label: 'New Lead', value: 40, color: 'bg-teal-500' },
    ],
    groups: [
      {
        name: 'Renewal Focus',
        color: 'bg-indigo-600',
        condition: 'policy_expiry_date < 30_DAYS',
        note: 'Priority Group',
        prediction: 'Uplift model',
      },
      {
        name: 'Control',
        color: 'bg-gray-400',
        condition: 'RANDOM_SAMPLE(5%)',
        prediction: 'Do not send recommendations',
      }
    ],
  },
];

const defaultDecisionDimensions = [
  {
    id: 1,
    name: 'Frequency',
    description: 'How many times to communicate over 7 days',
    sendTo: 'Days of Week, Channel, Offer, Time, Creative, Device',
    locked: true,
    type: 'frequency',
  },
  {
    id: 2,
    name: 'Days of Week',
    description: 'Which day(s) to communicate',
    sendTo: 'Channel, Offer, Time, Creative, Device',
    locked: true,
    type: 'daysofweek',
  },
  {
    id: 3,
    name: 'Channel',
    description: 'Communication channel',
    sendTo: 'Offer, Time, Creative, Device',
    locked: false,
    type: 'channel',
  },
  {
    id: 4,
    name: 'Offer',
    description: 'Incentive or promotion',
    sendTo: 'Time, Creative, Device',
    locked: false,
    type: 'offer',
  },
  {
    id: 5,
    name: 'Time',
    description: 'When to send the communication',
    sendTo: 'Creative, Device',
    locked: false,
    type: 'time',
  },
  {
    id: 6,
    name: 'Creative',
    description: 'Content of the communication',
    sendTo: 'Device',
    locked: false,
    type: 'creative',
  },
];

const defaultActionBankData = {
  frequencies: [
    { id: 'FR001', name: '1x per week', description: 'One communication per week', count: 1, period: '7 days' },
    { id: 'FR002', name: '2x per week', description: 'Two communications per week', count: 2, period: '7 days' },
    { id: 'FR003', name: '3x per week', description: 'Three communications per week', count: 3, period: '7 days' },
    { id: 'FR004', name: 'Daily', description: 'One communication per day', count: 7, period: '7 days' },
  ],
  daysofweek: [
    { id: 'DW001', name: 'Monday', description: 'Send on Mondays', dayCode: 'MON', optimal: 'Week Start' },
    { id: 'DW002', name: 'Tuesday', description: 'Send on Tuesdays', dayCode: 'TUE', optimal: 'Mid-week' },
    { id: 'DW003', name: 'Wednesday', description: 'Send on Wednesdays', dayCode: 'WED', optimal: 'Mid-week' },
    { id: 'DW004', name: 'Thursday', description: 'Send on Thursdays', dayCode: 'THU', optimal: 'Mid-week' },
    { id: 'DW005', name: 'Friday', description: 'Send on Fridays', dayCode: 'FRI', optimal: 'Week End' },
    { id: 'DW006', name: 'Saturday', description: 'Send on Saturdays', dayCode: 'SAT', optimal: 'Weekend' },
    { id: 'DW007', name: 'Sunday', description: 'Send on Sundays', dayCode: 'SUN', optimal: 'Weekend' },
  ],
  channels: [
    { id: 'CH001', name: 'WhatsApp', type: 'WhatsApp', cost: '₹10.45', status: 'Active' },
    { id: 'CH002', name: 'SMS', type: 'SMS', cost: '₹10.15', status: 'Active' },
    { id: 'CH003', name: 'RCS', type: 'RCS', cost: '₹10.30', status: 'Active' },
  ],
  offers: [
    { id: 'OF001', name: '10% Cashback', description: 'Cashback on transaction', value: '10%', valid: '2025-12-31' },
    { id: 'OF002', name: 'Zero Fee', description: 'No processing fee > ₹15L', value: '₹12000', valid: '2025-06-30' },
    { id: 'OF003', name: 'Amazon Voucher', description: '₹1500 on activation', value: '₹1500', valid: '2025-12-31' },
  ],
  times: [
    { id: 'TM001', slot: 'Morning Commute', description: '08:00 AM - 10:00 AM', optimal: 'News, Updates' },
    { id: 'TM002', slot: 'Lunch Break', description: '12:00 PM - 02:00 PM', optimal: 'Shopping' },
    { id: 'TM003', slot: 'Evening Relax', description: '07:00 PM - 09:00 PM', optimal: 'Entertainment' },
    { id: 'TM004', slot: 'Weekend Morning', description: 'Sat-Sun 09:00-11:00', optimal: 'Planning' },
  ],
  creatives: [
    { id: 'CR001', name: 'Card Promo #1', type: 'Text', preview: '[View]' },
    { id: 'CR002', name: 'Card Promo #2', type: 'Image', preview: '[View]' },
    { id: 'CR003', name: 'Holiday Special', type: 'Carousel', preview: '[View]' },
  ],
};

const defaultGuardrails = [
  {
    id: 1,
    name: 'Do not send incentives in November',
    dimension: 'Offer',
    appliedGroups: 'Bajaj. Control',
    description: "Don't send incentives in November, as there will have been an influx of new joiners during the peak month of October",
    matchingConditions: "where current_month = 11 AND (offer._action_dollars_off > 0 OR offer._action_percentage_off > 0)",
    excludeWhen: 'Match',
  },
  {
    id: 2,
    name: 'Do not send incentives the weak before ...',
    dimension: 'Offer',
    appliedGroups: 'Bajaj. Control',
    description: "Don't send incentives during the peak weak of the year",
    matchingConditions: "where days_until_halloween < 7 AND (offer._action_dollars_off > 0 OR offer._action_percentage_off > 0)",
    excludeWhen: 'Match',
  },
  {
    id: 3,
    name: 'Do not send incentives to customers who ...',
    dimension: 'Offer',
    appliedGroups: 'Bajaj. Control',
    description: 'No incentives to customers who have redeemed an offer in the last 180 days',
    matchingConditions: "where (offer._action_percentage_off > 0 OR offer._action_dollars_off > 0)",
    excludeWhen: 'Match',
  },
];

const defaultFeatures = {
  groupOffers: [
    'promotional_personal_loan',
    'low_int_offer',
    'zero_processing_fee',
    'partner_cobranding_offer',
    'salary_based_offer',
    'festive_offer',
  ],
  personalizedOffers: [
    'prepapproved_limit_custom',
    'tenure_limit_custom',
    'special_interest_rate_custom',
    'salary_switch_benefit',
  ],
  profileAttributes: [
    'age',
    'gender',
    'city',
    'income',
    'salary_credit_date',
    'credit_score',
    'employment_type',
    'existing_loan_emi',
    'risk_flag',
  ],
  behaviourSignals: [
    'app_opens',
    'loan_page_visits',
    'offer_page_visits',
    'history_of_pl_activity',
    'repayment_behavior',
    'funnel_dropout_step',
  ],
  engagementSignals: [
    'whatsapp_open',
    'sms_click',
    'push_click',
    'call_center_interaction',
    're_engagement_score',
    'cold_user_score',
  ],
};

const defaultDailyBudgets = [
  {
    channel: 'WhatsApp',
    code: 'WA',
    color: 'bg-green-100 text-green-800',
    allocated: 120000,
    spent: 82000,
    monthlyBudget: 570000,
    quarterlyBudget: 1710000,
    spentMTD: 418000,
    statusPct: 73,
    cpa: 18.5,
    reach: 18000,
    change: '+8% vs yesterday',
  },
  {
    channel: 'SMS',
    code: 'SMS',
    color: 'bg-blue-100 text-blue-800',
    allocated: 90000,
    spent: 64000,
    monthlyBudget: 330000,
    quarterlyBudget: 990000,
    spentMTD: 235000,
    statusPct: 71,
    cpa: 11.2,
    reach: 24000,
    change: '+3% vs yesterday',
  },
  {
    channel: 'RCS',
    code: 'RCS',
    color: 'bg-purple-100 text-purple-800',
    allocated: 70000,
    spent: 41000,
    monthlyBudget: 420000,
    quarterlyBudget: 1260000,
    spentMTD: 275000,
    statusPct: 65,
    cpa: 22.3,
    reach: 9500,
    change: '-2% vs yesterday',
  },
];

const mergeDeep = (current, updates) => {
  if (!updates || typeof updates !== 'object') return updates;
  const next = { ...current };
  Object.keys(updates).forEach((key) => {
    const value = updates[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      next[key] = mergeDeep(current[key] || {}, value);
    } else {
      next[key] = value;
    }
  });
  return next;
};

const resolveUpdate = (updater, current) =>
  typeof updater === 'function' ? updater(current) : updater;

const defaultCampaigns = [
  {
    id: 'AI-REC-001',
    name: 'Premium Credit Card - High CIBIL Acquisition',
    useCaseId: 'pl-aip-uplift',
    useCaseName: 'PL - AIP Uplift',
    product: 'Credit Card',
    type: 'Premium Card',
    channel: 'WhatsApp',
    deliveryType: 'Immediate',
    channelColor: 'bg-green-600',
    status: 'Predicted',
    created: '8 Dec 2025',
    createdOn: '2025-12-08',
    audience: 'High CIBIL (750+)',
    aiSuggestion: {
      recommendedTime: 'Today, 12:00 PM IST',
      segment: 'High CIBIL (750+), salary > ₹75K',
      content: 'Premium card upgrade + lounge access',
      template: 'Rich WhatsApp template - Premium Upgrade',
    },
    performance: {
      convRate: '18.5%',
      expectedRevenue: '₹3,82,050',
      cpa: '₹1,560'
    },
    budget: {
      spent: '₹0K',
      total: '₹156K'
    },
    aiConfidence: 94,
    isAiSuggested: true,
    isScheduled: false,
    isSent: false
  },
  {
    id: 'AI-REC-002',
    name: 'Gold Card Upgrade - Existing Silver Users',
    useCaseId: 'pl-aip-uplift',
    useCaseName: 'PL - AIP Uplift',
    product: 'Credit Card',
    type: 'Gold Card',
    channel: 'RCS',
    deliveryType: 'Immediate',
    channelColor: 'bg-purple-600',
    status: 'Predicted',
    created: '8 Dec 2025',
    createdOn: '2025-12-08',
    audience: 'Silver customers (LTV > ₹5L)',
    aiSuggestion: {
      recommendedTime: 'Today, 4:00 PM IST',
      segment: 'Silver users with >12 month tenure',
      content: 'Upgrade to Gold, higher limits, milestone offers',
      template: 'RCS carousel - Gold Upgrade',
    },
    performance: {
      convRate: '24.2%',
      expectedRevenue: '₹2,99,520',
      cpa: '₹1,920'
    },
    budget: {
      spent: '₹0K',
      total: '₹119K'
    },
    aiConfidence: 91,
    isAiSuggested: true,
    isScheduled: false,
    isSent: false
  },
  {
    id: 'AI-REC-003',
    name: 'Student Credit Card - College Segment',
    useCaseId: 'pl-aip-uplift',
    useCaseName: 'PL - AIP Uplift',
    product: 'Credit Card',
    type: 'Student Card',
    channel: 'SMS',
    deliveryType: 'Immediate',
    channelColor: 'bg-blue-600',
    status: 'Predicted',
    created: '8 Dec 2025',
    createdOn: '2025-12-08',
    audience: 'Students (age 18-25)',
    aiSuggestion: {
      recommendedTime: 'Today, 6:30 PM IST',
      segment: 'Students with ≥2 app opens this week',
      content: 'No fee student card + cashback on OTT',
      template: 'SMS short copy - Student Card',
    },
    performance: {
      convRate: '15.8%',
      expectedRevenue: '₹2,39,360',
      cpa: '₹1,280'
    },
    budget: {
      spent: '₹0K',
      total: '₹126K'
    },
    aiConfidence: 87,
    isAiSuggested: true,
    isScheduled: false,
    isSent: false
  },
  {
    id: 'CAM-004',
    name: 'Personal Loan - Diwali Special',
    useCaseId: 'cc-lead-growth',
    useCaseName: 'CC - Lead Growth',
    product: 'Personal Loan',
    type: 'Personal Loan',
    channel: 'WhatsApp',
    deliveryType: 'Immediate',
    channelColor: 'bg-green-600',
    status: 'Sent',
    created: '1 Dec 2025',
    createdOn: '2025-12-01',
    audience: 'High intent PL prospects',
    sentDetails: {
      sentAt: '2025-12-01 10:30 AM IST',
      recipients: 12500,
      opens: 7800,
      clicks: 4125,
    },
    performance: {
      convRate: '22.1%',
      expectedRevenue: '₹5,40,000',
      cpa: '₹1,100'
    },
    budget: {
      spent: '₹1.2L',
      total: '₹1.2L'
    },
    aiConfidence: 85,
    isAiSuggested: false,
    isScheduled: false,
    isSent: true
  },
  {
    id: 'CAM-005',
    name: 'Home Loan Balance Transfer',
    useCaseId: 'insurance-approval-uplift',
    useCaseName: 'INS - Approval Uplift',
    product: 'Home Loan',
    type: 'Home Loan',
    channel: 'RCS',
    deliveryType: 'Scheduled',
    channelColor: 'bg-purple-600',
    status: 'Scheduled',
    created: '5 Dec 2025',
    createdOn: '2025-12-05',
    audience: 'Renewal focus holdout',
    scheduleInfo: {
      sendAt: '2025-12-12 09:30 AM IST',
      recurrence: 'One-time',
      timezone: 'Asia/Kolkata',
      template: 'RCS rich media #3',
    },
    performance: {
      convRate: '12.5%',
      expectedRevenue: '₹8,90,000',
      cpa: '₹3,500'
    },
    budget: {
      spent: '₹0K',
      total: '₹3.5L'
    },
    aiConfidence: 88,
    isAiSuggested: false,
    isScheduled: true,
    isSent: false
  },
  {
    id: 'CAM-006',
    name: 'Auto Loan - Pre-approved',
    useCaseId: 'cc-lead-growth',
    useCaseName: 'CC - Lead Growth',
    product: 'Auto Loan',
    type: 'Auto Loan',
    channel: 'SMS',
    deliveryType: 'Triggered',
    channelColor: 'bg-blue-600',
    status: 'Sent',
    created: '20 Nov 2025',
    createdOn: '2025-11-20',
    audience: 'Auto loan pre-approved users',
    sentDetails: {
      sentAt: '2025-11-20 11:15 AM IST',
      recipients: 9800,
      opens: 6400,
      clicks: 2450,
    },
    performance: {
      convRate: '19.4%',
      expectedRevenue: '₹4,10,000',
      cpa: '₹2,100'
    },
    budget: {
      spent: '₹2.1L',
      total: '₹2.1L'
    },
    aiConfidence: 82,
    isAiSuggested: false,
    isScheduled: false,
    isSent: true
  },
  {
    id: 'CAM-007',
    name: 'FD Rates Hike Announcement',
    useCaseId: 'pl-aip-uplift',
    useCaseName: 'PL - AIP Uplift',
    product: 'Fixed Deposit',
    type: 'Fixed Deposit',
    channel: 'RCS',
    deliveryType: 'Immediate',
    channelColor: 'bg-purple-600',
    status: 'Sent',
    created: '15 Nov 2025',
    createdOn: '2025-11-15',
    audience: 'FD leads (tenure > 2y)',
    sentDetails: {
      sentAt: '2025-11-15 04:45 PM IST',
      recipients: 15200,
      opens: 9100,
      clicks: 1800,
    },
    performance: {
      convRate: '5.6%',
      expectedRevenue: '₹12,50,000',
      cpa: '₹800'
    },
    budget: {
      spent: '₹50K',
      total: '₹50K'
    },
    aiConfidence: 78,
    isAiSuggested: false,
    isScheduled: false,
    isSent: true
  }
];

export const useUseCaseStore = create(
  persist(
    (set, get) => ({
      useCases: defaultUseCases,
      campaigns: defaultCampaigns,
      segments: defaultSegments,
      groups: defaultGroups,
      decisionDimensions: defaultDecisionDimensions,
  actionBankData: defaultActionBankData,
  guardrails: defaultGuardrails,
  features: defaultFeatures,
  dailyBudgets: defaultDailyBudgets,
  goalsSummary: { achieved: 3, total: 4 },
  setUseCases: (useCases) => set({ useCases }),
  setSegments: (segments) => set({ segments }),
  setGroups: (groups) => set({ groups }),
  setDecisionDimensions: (decisionDimensions) => set({ decisionDimensions }),
  setActionBankData: (actionBankData) => set({ actionBankData }),
  setGuardrails: (guardrails) => set({ guardrails }),
  setFeatures: (features) => set({ features }),
  setDailyBudgets: (dailyBudgets) => set({ dailyBudgets }),
  setGoalsSummary: (goalsSummary) => set({ goalsSummary }),
  updateUseCase: (id, updates) =>
    set((state) => ({
      useCases: state.useCases.map((uc) =>
        uc.id === id ? mergeDeep(uc, updates) : uc
      ),
    })),
  updateDecisionDimensions: (updater) =>
    set((state) => ({
      decisionDimensions: resolveUpdate(updater, state.decisionDimensions),
    })),
  updateActionBankData: (updater) =>
    set((state) => ({
      actionBankData: resolveUpdate(updater, state.actionBankData),
    })),
  updateGuardrails: (updater) =>
    set((state) => ({
      guardrails: resolveUpdate(updater, state.guardrails),
    })),
  updateFeatures: (updater) =>
    set((state) => ({
      features: resolveUpdate(updater, state.features),
    })),
  updateSegments: (updater) =>
    set((state) => ({
      segments: resolveUpdate(updater, state.segments),
    })),
  updateGroups: (updater) =>
    set((state) => ({
      groups: resolveUpdate(updater, state.groups),
    })),
  updateDailyBudget: (channel, updates) =>
    set((state) => ({
      dailyBudgets: state.dailyBudgets.map((item) =>
        item.channel === channel ? mergeDeep(item, updates) : item
      ),
    })),
  getUseCaseById: (id) => get().useCases.find((uc) => uc.id === id),
  // Campaign Actions
  addCampaign: (newCampaign) => set((state) => ({
    campaigns: [newCampaign, ...state.campaigns]
  })),
  updateCampaign: (id, updates) => set((state) => ({
    campaigns: state.campaigns.map((cam) => (cam.id === id ? { ...cam, ...updates } : cam))
  })),
    }),
    {
      name: 'use-case-store',
      partialize: (state) => ({
        useCases: state.useCases,
        campaigns: state.campaigns,
        segments: state.segments,
        groups: state.groups,
        decisionDimensions: state.decisionDimensions,
        actionBankData: state.actionBankData,
        guardrails: state.guardrails,
        features: state.features,
        dailyBudgets: state.dailyBudgets,
        goalsSummary: state.goalsSummary,
      }),
    }
  )
);
