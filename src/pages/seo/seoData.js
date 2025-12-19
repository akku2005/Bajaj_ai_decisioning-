export const pagesData = [
    {
        id: 1,
        url: '/pl-loan',
        product: 'Personal Loan',
        lastCrawled: '2 hours ago',
        pageAuthority: 42,
        rank: 4,
        rankChange: -3,
        prevRank: 7,
        trafficChange: -22,
        timeOnPage: '32s',
        scrollDepth: -44,
        leadsChange: -41,
        aipChange: -11,
        cwv: 'Attention Needed',
        cwvStatus: 'High',
        priority: 'high',
        isHighPriority: true,
        businessRole: 'High AIP Driver',
        simpleSummary: "This page is losing traffic because search engines think it's about 'Eligibility Rules', but users are actually searching for 'Rate Comparisons'.",
        searchSignals: [
            {
                type: 'Content',
                title: 'Confused Topic',
                description: 'Search engines are unsure if this page is for "Info" or "Comparison".',
                impact: 'High',
                details: 'Competing with /pl-eligibility'
            },
            {
                type: 'SERP Feature',
                title: 'Lost "Answer Box"',
                description: 'A competitor (BankBazaar) took our top spot for the quick answer.',
                impact: 'High',
                details: 'Competitor: BankBazaar'
            }
        ],
        coreWebVitals: {
            lcp: { value: '4.2s', change: '↑0.16', status: 'Fail', priority: 'High', score: 25, label: 'Loading Speed', description: 'How fast the main content appears.' },
            cls: { value: '0.18', threshold: '0.10', status: 'Borderline', priority: 'Low', score: 65, label: 'Visual Stability', description: 'Do items jump around while loading?' },
            inp: { value: '200ms', status: 'Pass', priority: null, score: 95, label: 'Responsiveness', description: 'How fast the page reacts to clicks.' }
        },
        agentDiagnosis: {
            primaryIssue: 'Revenue Impact Alert',
            analysis: 'This page generates significant revenue, but it has dropped to Rank #4. This is costing approximately ~120 leads per week.',
            metrics: [
                'Rank dropped from 3 → 7',
                'Scroll depth dropped 22%'
            ],
            contentIssue: "Content doesn't match what users want",
            contentIssueDetails: "Users want to see Interest Rates immediately, but we are showing them Eligibility Rules first.",
            secondaryIssues: [
                'Calculator is hidden below the fold'
            ]
        },
        recommendedActions: {
            onPage: [
                {
                    action: 'Rewrite Headline to focus on "Rates"',
                    why: "Users are asking 'What is the Interest Rate?' but our page title says 'Am I Eligible?'. This confuses them.",
                    how: "Change H1 from 'Check Eligibility' to 'Personal Loan Interest Rates & Eligibility'.",
                    hems: 'High',
                    priority: 'High',
                    outcome: 'Matches what users are searching for'
                },
                {
                    action: 'Move Calculator to the top',
                    why: "Users love the calculator, but they have to scroll down 3 screens to find it. Many leave before finding it.",
                    how: "Move the EMI Calculator component to the 'Hero Section' (top of page).",
                    hems: null,
                    priority: null,
                    outcome: 'Keeps users on the page longer'
                },
                {
                    action: 'Add a "Compare Rates" table',
                    why: "Competitors show a simple table comparing banks. We only show paragraphs of text.",
                    how: "Insert a visual comparison table showing 'Bajaj vs Others' in the first section.",
                    hems: null,
                    priority: null,
                    outcome: 'Directly answers user questions'
                }
            ],
            offPage: [
                {
                    action: 'Get 3 links from finance sites',
                    why: "We lost some 'authority' score recently. We need trusted sites to link back to us to prove we are credible.",
                    how: "Outreach to 'MoneyControl' and 'Economic Times' for guest posts.",
                    hems: 'High',
                    priority: 'High',
                    outcome: 'Builds trust with search engines'
                }
            ]
        }
    },
    {
        id: 2,
        url: '/hl-emi',
        product: 'Home Loan EMI',
        lastCrawled: '5 hours ago',
        pageAuthority: 38,
        rank: 2,
        rankChange: 0,
        trafficChange: -9,
        timeOnPage: 'Stable',
        scrollDepth: -15,
        leadsChange: -92,
        aipChange: -32,
        cwv: 'Poor Stability',
        cwvStatus: null,
        priority: 'medium',
        isHighPriority: false,
        businessRole: 'Medium AIP Driver',
        simpleSummary: "The page jumps around too much on mobile phones, causing users to click the wrong buttons and leave.",
        searchSignals: [
            { type: 'Technical', title: 'Jumpy Layout', description: 'Elements move unexpectedly while loading.', impact: 'High' }
        ],
        coreWebVitals: {
            lcp: { value: '2.1s', status: 'Pass', priority: null, score: 90, label: 'Loading Speed', description: 'How fast the main content appears.' },
            cls: { value: '0.22', threshold: '0.10', status: 'Fail', priority: 'High', score: 45, label: 'Visual Stability', description: 'Do items jump around while loading?' },
            inp: { value: '150ms', status: 'Pass', priority: null, score: 98, label: 'Responsiveness', description: 'How fast the page reacts to clicks.' }
        },
        agentDiagnosis: {
            primaryIssue: 'User Frustration Detected',
            analysis: 'The calculator loads late and pushes content down. Users are trying to click "Calculate" but hitting ads instead.',
            metrics: ['Leads dropped significantly'],
            contentIssue: 'Poor Mobile Experience',
            contentIssueDetails: 'The layout shift is severe on 4G connections.',
            secondaryIssues: []
        },
        recommendedActions: {
            onPage: [
                {
                    action: 'Fix image dimensions',
                    why: "Images are loading without a reserved space, causing the text to 'jump' down when the image appears.",
                    how: "Add 'width' and 'height' attributes to the Hero Image code.",
                    hems: 'High',
                    priority: 'High',
                    outcome: 'Stops the layout shift completely'
                },
                {
                    action: 'Load calculator faster',
                    why: "The calculator appears 2 seconds after the rest of the page, making the page feel broken.",
                    how: "Change loading strategy from 'Lazy Load' to 'Eager Load' for the Calculator Component.",
                    hems: null,
                    priority: null,
                    outcome: 'Makes the page feel instant'
                }
            ],
            offPage: []
        }
    },
    {
        id: 3,
        url: '/cc-best',
        product: 'Best Credit Cards',
        rank: 6,
        rankChange: -2,
        trafficChange: -31,
        timeOnPage: '18s',
        scrollDepth: -18,
        leadsChange: -20,
        aipChange: -16,
        cwv: 'Good',
        cwvStatus: null,
        priority: 'high',
        isHighPriority: false,
        businessRole: 'High Traffic Driver',
        simpleSummary: "Competitors have much more detailed comparisons (3,500 words) while our page is too brief (890 words).",
        searchSignals: [
            { type: 'Content', title: 'Content Too Thin', description: 'Not enough detail compared to competitors.', impact: 'High' }
        ],
        coreWebVitals: {
            lcp: { value: '2.4s', status: 'Pass', priority: null, score: 85, label: 'Loading Speed', description: 'How fast the main content appears.' },
            cls: { value: '0.05', status: 'Pass', priority: null, score: 95, label: 'Visual Stability', description: 'Do items jump around while loading?' },
            inp: { value: '100ms', status: 'Pass', priority: null, score: 100, label: 'Responsiveness', description: 'How fast the page reacts to clicks.' }
        },
        agentDiagnosis: {
            primaryIssue: 'Missing Information',
            analysis: 'Users are looking for detailed "Annual Fee" vs "Reward Points" tables, which we are missing.',
            metrics: ['Competitors avg: 3,500 words', 'Your page: 890 words'],
            contentIssue: 'Incomplete Content',
            contentIssueDetails: 'Missing side-by-side comparison tables.',
            secondaryIssues: []
        },
        recommendedActions: {
            onPage: [
                {
                    action: 'Expand content depth',
                    why: "Users want to know strictly about fees and rewards, but we only talk about 'Benefits' generally.",
                    how: "Add 2 new sections: 'Fee Structure Breakdown' and 'Rewards Point Calculator'.",
                    hems: 'High',
                    priority: 'High',
                    outcome: 'Matches competitor depth'
                },
                {
                    action: 'Add FAQ section',
                    why: "Users are typing questions into Google that our page doesn't answer.",
                    how: "Add a 'Frequently Asked Questions' section with top 5 questions from Google.",
                    hems: 'Medium',
                    priority: 'Medium',
                    outcome: 'Answers common user questions'
                }
            ],
            offPage: []
        }
    },
    {
        id: 4,
        url: '/insurance',
        product: 'Car Insurance',
        rank: 3,
        rankChange: -1,
        trafficChange: -5,
        timeOnPage: '16s',
        scrollDepth: -18,
        leadsChange: -22,
        aipChange: -16,
        cwv: 'Good',
        cwvStatus: null,
        priority: 'medium',
        isHighPriority: false,
        businessRole: 'Medium AIP Driver',
        simpleSummary: "The information on this page looks outdated (2023 rates), so users are leaving to find current rates.",
        searchSignals: [
            { type: 'Content', title: 'Outdated Info', description: 'Page shows old year (2023) information.', impact: 'Low' }
        ],
        coreWebVitals: {
            lcp: { value: '2.8s', status: 'Pass', priority: null, score: 75, label: 'Loading Speed', description: 'How fast the main content appears.' },
            cls: { value: '0.08', status: 'Pass', priority: null, score: 88, label: 'Visual Stability', description: 'Do items jump around while loading?' },
            inp: { value: '120ms', status: 'Pass', priority: null, score: 96, label: 'Responsiveness', description: 'How fast the page reacts to clicks.' }
        },
        agentDiagnosis: {
            primaryIssue: 'Trust Issue',
            analysis: 'Users see "2023" and immediately assume the rates are wrong.',
            metrics: ['Slight engagement drop'],
            contentIssue: 'Outdated Content',
            contentIssueDetails: '2023 rates are still displayed.',
            secondaryIssues: []
        },
        recommendedActions: {
            onPage: [
                {
                    action: 'Update to 2024 Rates',
                    why: "Headers saying '2023' make the page look abandoned.",
                    how: "Find/Replace '2023' with '2024' and update the rate table from the CMS.",
                    hems: 'Medium',
                    priority: 'Medium',
                    outcome: 'Restores user trust immediately'
                }
            ],
            offPage: []
        }
    },
    {
        id: 5,
        url: '/pl-emi',
        product: 'Personal Loan EMI',
        rank: 5,
        rankChange: 0,
        trafficChange: -7,
        timeOnPage: '92s',
        scrollDepth: -12,
        leadsChange: -12,
        aipChange: null,
        cwv: 'Excellent',
        cwvStatus: 'High',
        priority: 'low',
        isHighPriority: false,
        businessRole: 'Tool Page',
        simpleSummary: "This page works great, but it's a dead end. Users use the calculator and then leave instead of applying.",
        searchSignals: [
            { type: 'Engagement', title: 'High Engagement', description: 'Users love the calculator.', impact: 'Positive' }
        ],
        coreWebVitals: {
            lcp: { value: '1.8s', status: 'Pass', priority: null, score: 92, label: 'Loading Speed', description: 'How fast the main content appears.' },
            cls: { value: '0.02', status: 'Pass', priority: null, score: 98, label: 'Visual Stability', description: 'Do items jump around while loading?' },
            inp: { value: '80ms', status: 'Pass', priority: null, score: 100, label: 'Responsiveness', description: 'How fast the page reacts to clicks.' }
        },
        agentDiagnosis: {
            primaryIssue: 'Missed Opportunity',
            analysis: 'Users are happy with the tool but don\'t know where to go next.',
            metrics: ['High time on page', 'Strong engagement'],
            contentIssue: null,
            contentIssueDetails: null,
            secondaryIssues: []
        },
        recommendedActions: {
            onPage: [
                {
                    action: 'Add Call-to-Action buttons',
                    why: "After calculating their payments, users hit a dead end.",
                    how: "Add 'Apply for this Loan' button directly under the calculated result.",
                    hems: 'Low',
                    priority: 'Low',
                    outcome: 'Converts users into applicants'
                }
            ],
            offPage: []
        }
    },
    {
        id: 6,
        url: '/pt-loan',
        product: 'Personal Loan',
        rank: 4,
        rankChange: 2,
        trafficChange: 22,
        timeOnPage: '45s',
        scrollDepth: -41,
        leadsChange: -11,
        aipChange: null,
        cwv: 'Good',
        cwvStatus: 'Medium',
        priority: 'low',
        isHighPriority: false,
        businessRole: 'Recovery Page',
        simpleSummary: "This page is recovering well! Traffic is up 22%. No major actions needed right now.",
        searchSignals: [
            { type: 'Trend', title: 'Improving', description: 'Metrics are getting better every week.', impact: 'Positive' }
        ],
        coreWebVitals: {
            lcp: { value: '2.2s', status: 'Pass', priority: null, score: 88, label: 'Loading Speed', description: 'How fast the main content appears.' },
            cls: { value: '0.04', status: 'Pass', priority: null, score: 96, label: 'Visual Stability', description: 'Do items jump around while loading?' },
            inp: { value: '90ms', status: 'Pass', priority: null, score: 99, label: 'Responsiveness', description: 'How fast the page reacts to clicks.' }
        },
        agentDiagnosis: {
            primaryIssue: 'On Track',
            analysis: 'Previous fixes are working. Let\'s keep monitoring it.',
            metrics: ['Traffic up 22%'],
            contentIssue: null,
            contentIssueDetails: null,
            secondaryIssues: []
        },
        recommendedActions: {
            onPage: [],
            offPage: []
        }
    }
];

export const businessImpact = {
    pagesAnalyzed: '17,042',
    revenueAtRisk: '₹56.3 Cr',
    leadsAtRisk: '24,860',
    linksImpacted: '1,284',
    top10Rankings: '312'
};
