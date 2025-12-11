# Bajaj AI Decisioning System: Complete Technical Flow

This document provides a **detailed, step-by-step technical flow** of how the system operates from initialization to execution and feedback.

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     BAJAJ AI DECISIONING SYSTEM                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐       │
│  │  Use Case    │   │   Campaign   │   │  LLM + RAG   │       │
│  │ Configuration│──▶│   Generator  │◀──│    Chat      │       │
│  │   (Setup)    │   │   (Engine)   │   │ (Interaction)│       │
│  └──────────────┘   └──────────────┘   └──────────────┘       │
│         │                   │                   │               │
│         └───────────────────┼───────────────────┘               │
│                             ▼                                   │
│                    ┌──────────────┐                            │
│                    │  useCaseStore│                            │
│                    │  (Zustand)   │                            │
│                    └──────────────┘                            │
│                             │                                   │
│         ┌───────────────────┼───────────────────┐              │
│         ▼                   ▼                   ▼              │
│  ┌──────────┐      ┌──────────────┐     ┌──────────┐         │
│  │ Segments │      │   Actions    │     │Guardrails│         │
│  │ & Groups │      │  (Channels,  │     │ (Rules)  │         │
│  │          │      │ Offers, Time)│     │          │         │
│  └──────────┘      └──────────────┘     └──────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 PHASE 1: USE CASE SETUP (Knowledge Ingestion)

### When: Initial system setup by business users
### Where: `UseCaseConfigure.jsx`

**Step-by-Step Flow:**

```
1. User navigates to Use Cases → "Configure"
   └─ Loads: UseCaseConfigure.jsx

2. User defines CUSTOMER GROUPS (Tab 1)
   ├─ SEGMENTS (% split of audience)
   │  └─ Example: "25% CREDIT", "10% CONTROL CHECK"
   │
   └─ GROUPS (targeting conditions)
      ├─ "AI Suggestion": days_since_signup >= 64
      ├─ "Control Group": random sample with prediction = "Do not send"
      └─ "Holdout Group": testing baseline performance

3. User defines DECISION DIMENSIONS (Tab 2)
   ├─ Frequency (1x/week, 2x/week, daily)
   ├─ Days of Week (Mon-Sun)
   ├─ Channel (WhatsApp, SMS, RCS)
   ├─ Offer (Cashback, Zero Fee, Voucher)
   ├─ Time (Morning, Lunch, Evening)
   └─ Creative (Templates)

4. User populates ACTION BANKS (Tab 3)
   └─ For each dimension, specific options:
      ├─ Channel: "WhatsApp" → Cost: ₹10.45
      ├─ Offer: "10% Cashback" → Valid: 2025-12-31
      └─ Time: "Morning Commute" → 08:00-10:00 AM

5. User sets GUARDRAILS (Tab 4)
   └─ Example: "Do not send incentives in November"
      WHERE current_month = 11 AND offer > 0

6. User clicks "Save & Activate"
   └─ Data saved to: useCaseStore (Zustand)
      └─ Persisted to: localStorage
```

**Code Reference:**
- File: [`UseCaseConfigure.jsx`](file:///d:/workspace/bajaj_dashboard/src/pages/usecases/UseCaseConfigure.jsx)

---

## ⚙️ PHASE 2: DAILY CAMPAIGN GENERATION (The "AI Engine")

### When: Every day at 6:00 AM (automated trigger)
### Where: Backend AI Service (simulated in frontend via `defaultCampaigns`)

**The "Thinking" Process:**

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: FETCH ACTIVE USE CASES                              │
├─────────────────────────────────────────────────────────────┤
│ Query: useCases where status === 'Active'                   │
│ Result: ["PL - AIP Uplift", "CC - Lead Growth"]            │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: LOAD USER DATA (from DB/Data Warehouse)            │
├─────────────────────────────────────────────────────────────┤
│ For each use case, query user attributes:                   │
│ ├─ CIBIL Score                                              │
│ ├─ Last Activity Date                                       │
│ ├─ Loan Page Visits                                         │
│ ├─ App Opens (last 7 days)                                  │
│ └─ Existing Products                                        │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: MICRO-SEGMENTATION                                  │
├─────────────────────────────────────────────────────────────┤
│ Match users to GROUPS:                                      │
│                                                              │
│ Group: "AI Suggestion"                                      │
│ ├─ Condition: days_since_signup >= 64                       │
│ ├─ Matched Users: 12,500                                    │
│ └─ Further split by:                                        │
│    ├─ CIBIL > 750 → 4,200 users → HIGH_CIBIL cluster       │
│    ├─ Visited Loan Page → 3,100 users → HIGH_INTENT        │
│    └─ Salary > 75K → 5,200 users → PREMIUM segment         │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: ACTION SELECTION (The "Matching" Logic)            │
├─────────────────────────────────────────────────────────────┤
│ For cluster "HIGH_CIBIL":                                   │
│                                                              │
│ Evaluate all combinations from ACTION BANK:                 │
│                                                              │
│ Option A: SMS + 10% Cashback + Morning                     │
│ ├─ Cost: ₹0.15 × 4,200 = ₹630                              │
│ ├─ Predicted Conversion: 2.1% = 88 conversions             │
│ └─ ROI Score: 3.2                                           │
│                                                              │
│ Option B: WhatsApp + Premium Card + Lunch                  │
│ ├─ Cost: ₹0.45 × 4,200 = ₹1,890                            │
│ ├─ Predicted Conversion: 18.5% = 777 conversions           │
│ └─ ROI Score: 28.4  ← WINNER                               │
│                                                              │
│ Option C: RCS + Amazon Voucher + Evening                   │
│ ├─ Cost: ₹0.30 × 4,200 = ₹1,260                            │
│ ├─ Predicted Conversion: 15.8% = 664 conversions           │
│ └─ ROI Score: 18.9                                          │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: CHECK GUARDRAILS                                    │
├─────────────────────────────────────────────────────────────┤
│ Run selected action through rules:                          │
│ ├─ IF current_month = 11 AND offer > 0 → REJECT            │
│ ├─ IF time > 8PM AND channel = SMS → REJECT                │
│ └─ IF no match → APPROVE                                    │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: CREATE RECOMMENDATION                               │
├─────────────────────────────────────────────────────────────┤
│ Generate campaign object:                                   │
│ {                                                            │
│   id: 'AI-REC-001',                                         │
│   channel: 'WhatsApp',                                      │
│   targetAudience: 'High CIBIL (750+)',                      │
│   timing: '10:00 AM - 12:00 PM',                            │
│   offer: '10% Cashback',                                    │
│   expectedLift: '+15% CTR',                                 │
│   confidence: 92,                                           │
│   status: 'Predicted',                                      │
│   isAiSuggested: true                                       │
│ }                                                            │
│                                                              │
│ Store → useCaseStore.campaigns                             │
└─────────────────────────────────────────────────────────────┘
```

**Code Reference:**
- State: [`useCaseStore.js`](file:///d:/workspace/bajaj_dashboard/src/stores/useCaseStore.js#L441-L679) (defaultCampaigns)
- Display: [`AIRecommendationsTab.jsx`](file:///d:/workspace/bajaj_dashboard/src/pages/usecases/configTabs/AIRecommendationsTab.jsx)

---

## 💬 PHASE 3: LLM + RAG INTERACTION (Chat-Based Refinement)

### When: User reviews AI suggestions
### Where: `AIRecommendationsTab.jsx` → Chat interface

**Deep Dive: How RAG Works**

```
USER SEES:
┌────────────────────────────────────────────────────────────┐
│ AI Recommendation Card                                      │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ Channel: WhatsApp                                          │
│ Campaign: Premium Credit Card - High CIBIL Acquisition    │
│ Target: High CIBIL score customers (750+)                 │
│ Audience Size: 12,500                                      │
│ Timing: 10:00 AM - 12:00 PM                               │
│ Offer: 10% Cashback on first loan                         │
│                                                             │
│ AI Confidence: 92%                                         │
│ Expected Lift: +15% CTR                                    │
│                                                             │
│ [Chat with AI to modify this campaign]                    │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Ask to modify timing, audience, offer, etc...       │   │
│ └─────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

**User Types:** "Why did you pick this segment?"

**RAG Process (3 Steps):**

### 🔍 R = RETRIEVAL

```
System retrieves context from useCaseStore:

1. Current Recommendation Context:
   {
     id: 'AI-REC-001',
     targetAudience: 'High CIBIL (750+)',
     offer: '10% Cashback',
     channel: 'WhatsApp'
   }

2. Historical Performance Data (from past campaigns):
   {
     'High CIBIL': {
       whatsapp_ctr: 18.5%,
       sms_ctr: 2.1%,
       avg_conversion: 92%
     },
     'Standard': {
       whatsapp_ctr: 3.2%,
       avg_conversion: 12%
     }
   }

3. Segment Attributes:
   {
     avg_cibil: 780,
     avg_income: '>₹15L',
     risk_profile: 'Low',
     default_rate: 0.4%
   }
```

### 🔗 A = AUGMENTATION

```
Build the LLM prompt:

SYSTEM PROMPT:
"You are an AI marketing expert for Bajaj Markets. Use the following 
data to answer user questions about campaign recommendations."

CONTEXT (Retrieved Data):
"The 'High CIBIL (750+)' segment has:
- WhatsApp CTR: 18.5% (vs 3.2% for standard users)  
- Average CIBIL: 780
- Income: >₹15L
- Default Rate: 0.4%
- Risk Profile: Low"

USER QUESTION:
"Why did you pick this segment?"

FINAL PROMPT TO LLM:
[SYSTEM] + [CONTEXT] + [USER QUESTION]
```

### 🤖 G = GENERATION

```
LLM processes and generates:

RESPONSE:
"I selected the High CIBIL (750+) segment because they show 
an 18.5% CTR on WhatsApp, which is 5.8x higher than standard 
users (3.2%). Additionally, their low default rate (0.4%) and 
high average income (>₹15L) make them ideal for the Premium 
Credit Card offer. This segment has historically shown 92% 
approval rates, ensuring a high conversion probability."
```

**Code Reference:**
- Chat Handler: [`AIRecommendationsTab.jsx:L154-L187`](file:///d:/workspace/bajaj_dashboard/src/pages/usecases/configTabs/AIRecommendationsTab.jsx#L154-L187) (`handleChatSubmit`)
- RAG Logic: [`AIRecommendationsTab.jsx:L189-L215`](file:///d:/workspace/bajaj_dashboard/src/pages/usecases/configTabs/AIRecommendationsTab.jsx#L189-L215) (`generateAIResponse`)

---

## 🚀 PHASE 4: CAMPAIGN EXECUTION

### When: User approves recommendation
### Where: `CampaignsPage.jsx`

**Execution Flow:**

```
1. User clicks "Select Recommendation"
   └─ handleAccept(day, id) triggered
      └─ Status changed: 'pending' → 'accepted'

2. Campaign moves to "Scheduled" or "Sent"
   ├─ Campaign Editor loads (CampaignEditor.jsx)
   └─ User confirms final details

3. Backend API Integration:
   ├─ POST /api/campaigns/send
   │  └─ Payload: {
   │      channel: 'WhatsApp',
   │      recipients: [user_ids],
   │      template: 'premium_card_upgrade',
   │      schedule: '2025-12-10 10:00:00'
   │     }
   │
   └─ Integration with:
      ├─ Twilio (SMS)
      ├─ Gupshup (WhatsApp)
      └─ RCS Provider

4. Campaign Status Updates:
   └─ status: 'accepted' → 'scheduled' → 'sent'
```

**Code Reference:**
- Campaigns List: [`CampaignsPage.jsx`](file:///d:/workspace/bajaj_dashboard/src/pages/CampaignsPage.jsx)
- Accept Handler: [`AIRecommendationsTab.jsx:L217-L224`](file:///d:/workspace/bajaj_dashboard/src/pages/usecases/configTabs/AIRecommendationsTab.jsx#L217-L224)

---

## 🔄 PHASE 5: FEEDBACK LOOP (Continuous Learning)

### When: Campaign completes execution
### Where: System logs and AI model retraining

**Feedback Process:**

```
1. EXPLICIT FEEDBACK (User actions):
   ├─ Thumbs Up/Down → Rating stored
   ├─ Accept → Positive signal
   └─ Reject → Negative signal

2. IMPLICIT FEEDBACK (Performance data):
   One day after send:
   ├─ Track Opens (WhatsApp read receipts)
   ├─ Track Clicks (link tracking)
   └─ Track Conversions (application submitted)

3. CALCULATE ACTUAL vs PREDICTED:
   Predicted CTR: 18.5%
   Actual CTR: 16.2%
   Accuracy: 87.6%

4. UPDATE MODEL WEIGHTS:
   IF actual < predicted:
   └─ Decrease confidence for "WhatsApp + High CIBIL"
      from 92% → 88%
   
   IF actual > predicted:
   └─ Increase confidence
      from 92% → 95%

5. NEXT DAY:
   System uses updated weights for tomorrow's 
   recommendation generation (back to PHASE 2)
```

**Code Reference:**
- Feedback UI: [`AIRecommendationsTab.jsx:L512-L523`](file:///d:/workspace/bajaj_dashboard/src/pages/usecases/configTabs/AIRecommendationsTab.jsx#L512-L523) (Thumbs Up/Down)
- Campaign Stats: [`CampaignStatsPage.jsx`](file:///d:/workspace/bajaj_dashboard/src/pages/CampaignStatsPage.jsx)

---

## 📊 COMPLETE SYSTEM FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DAY 0: INITIAL SETUP                          │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │  User Configures Use Case │
                    │  - Segments & Groups      │
                    │  - Action Banks           │
                    │  - Guardrails             │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │   Save to useCaseStore    │
                    │   status = 'Active'       │
                    └─────────────┬─────────────┘
                                  │
┌─────────────────────────────────────────────────────────────────────┐
│                    DAY 1-N: DAILY OPERATIONS                         │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                 ┌────────────────▼─────────────────┐
                 │                                  │
        ┌────────┴─────────────┐                   │
        │  6:00 AM: AI Engine  │◀──────────────────┼──────────┐
        │       Runs           │                   │          │
        └────────┬─────────────┘                   │          │
                 │                                  │          │
                 │   ┌─────────────▼────────────────┘          │
                 │   │  1. Fetch User Data                     │
                 │   │  2. Micro-Segment Users                 │
                 │   │  3. Evaluate Actions                    │
                 │   │  4. Apply Guardrails                    │
                 │   └─────────────┬───────────────────────────┘
                 │                 │
                 │   ┌─────────────▼───────────────┐
                 │   │  Generate Recommendations   │
                 │   │  Store in campaigns[]       │
                 │   └─────────────┬───────────────┘
                 │                 │
                 │   ┌─────────────▼───────────────┐
                 │   │ 9:00 AM: User Reviews in    │
                 │   │    AIRecommendationsTab     │
                 │   └─────────────┬───────────────┘
                 │                 │
                 │                 ├───────────────────┐
                 │                 │                   │
                 │        ┌────────▼────────┐   ┌─────▼──────┐
                 │        │ User Asks Chat  │   │  Direct    │
                 │        │ "Why segment?"  │   │  Accept    │
                 │        └────────┬────────┘   └─────┬──────┘
                 │                 │                   │
                 │        ┌────────▼────────┐          │
                 │        │  RAG Process:   │          │
                 │        │  1. Retrieve    │          │
                 │        │  2. Augment     │          │
                 │        │  3. Generate    │          │
                 │        └────────┬────────┘          │
                 │                 │                   │
                 │        ┌────────▼────────┐          │
                 │        │  AI Explains &  │          │
                 │        │  Modifies if    │          │
                 │        │  requested      │          │
                 │        └────────┬────────┘          │
                 │                 │                   │
                 │                 └────────┬──────────┘
                 │                          │
                 │             ┌────────────▼────────────┐
                 │             │   User Clicks "Accept"  │
                 │             │   status → 'accepted'   │
                 │             └────────────┬────────────┘
                 │                          │
                 │             ┌────────────▼────────────┐
                 │             │  10:00 AM: Send Messages│
                 │             │  via WhatsApp/SMS/RCS   │
                 │             └────────────┬────────────┘
                 │                          │
                 │             ┌────────────▼────────────┐
                 │             │  Track Performance:     │
                 │             │  - Opens, Clicks        │
                 │             │  - Conversions          │
                 │             └────────────┬────────────┘
                 │                          │
                 │             ┌────────────▼────────────┐
                 │             │  Update Model Weights   │
                 │             │  (Feedback Loop)        │
                 │             └────────────┬────────────┘
                 │                          │
                 └──────────────────────────┘
                 
                         DAY 2+: Repeat with
                        Improved Predictions
```

---

## 🎯 Key Takeaways

1. **Use Case Configuration** = Teaching the AI the rules
2. **Daily Engine Run** = AI "thinks" and matches users to optimal actions
3. **Chat (RAG)** = User refines AI decisions using natural language
4. **Execution** = Campaigns sent via messaging channels
5. **Feedback** = System learns and improves for tomorrow

---

## 📁 Code File Map

| Component | File Path |
|-----------|-----------|
| Use Case Config | `src/pages/usecases/UseCaseConfigure.jsx` |
| State Management | `src/stores/useCaseStore.js` |
| AI Recommendations | `src/pages/usecases/configTabs/AIRecommendationsTab.jsx` |
| Campaign List | `src/pages/CampaignsPage.jsx` |
| Campaign Editor | `src/pages/CampaignEditor.jsx` |
| Chat Canvas | `src/pages/usecases/ChatCanvas.jsx` |

