/**
 * GrowSaathi Frontend-Only Standalone Demo API Module (Vercel Deployment)
 * 100% Browser-Side Execution - Zero Backend / Zero Localhost Dependencies.
 *
 * Persists demo merchants, sessions, business data, and campaigns in localStorage.
 */

const DEMO_MERCHANTS_KEY = 'growsaathi_demo_merchants';
const DEMO_SESSION_KEY = 'growsaathi_demo_session';
const DEMO_BUSINESS_DATA_KEY = 'growsaathi_demo_business_data';

// Initial Seed Merchant
const SEED_MERCHANT = {
    merchantId: "DEMO-M-SHARMA",
    businessName: "Sharma Cafe & Bakery",
    ownerName: "Ramesh Sharma",
    name: "Sharma Cafe & Bakery",
    email: "sharma.cafe@example.com",
    phone: "+91 98765 43210",
    password: "Password123",
    createdAt: new Date().toISOString()
};

/**
 * Ensures seed merchants exist in localStorage
 */
function initializeDemoMerchants() {
    let merchants = getStoredMerchants();
    if (!merchants || merchants.length === 0) {
        merchants = [SEED_MERCHANT];
        localStorage.setItem(DEMO_MERCHANTS_KEY, JSON.stringify(merchants));
    } else {
        const hasSharma = merchants.some(m => m.email.toLowerCase() === SEED_MERCHANT.email.toLowerCase());
        if (!hasSharma) {
            merchants.unshift(SEED_MERCHANT);
            localStorage.setItem(DEMO_MERCHANTS_KEY, JSON.stringify(merchants));
        }
    }
}

function getStoredMerchants() {
    try {
        const raw = localStorage.getItem(DEMO_MERCHANTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveMerchants(merchants) {
    localStorage.setItem(DEMO_MERCHANTS_KEY, JSON.stringify(merchants));
}

function getAllBusinessData() {
    try {
        const raw = localStorage.getItem(DEMO_BUSINESS_DATA_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function saveAllBusinessData(allData) {
    localStorage.setItem(DEMO_BUSINESS_DATA_KEY, JSON.stringify(allData));
}

/**
 * Returns or generates realistic merchant-specific business metrics and data
 */
function getMerchantBusinessData(merchantId, businessName, ownerName) {
    const allData = getAllBusinessData();
    if (allData[merchantId]) {
        return allData[merchantId];
    }

    const isSharma = merchantId === "DEMO-M-SHARMA" || (businessName && businessName.includes("Sharma"));

    const data = {
        merchantId: merchantId,
        businessName: businessName || (isSharma ? "Sharma Cafe & Bakery" : "Retail Merchant Store"),
        ownerName: ownerName || (isSharma ? "Ramesh Sharma" : "Store Owner"),
        businessHealth: {
            score: isSharma ? 88 : 85,
            status: "Healthy",
            summary: isSharma
                ? "Healthy revenue momentum (+14.8%). 24 at-risk customers detected requiring retention outreach."
                : `Solid business health score (85/100) for ${businessName}. Identified 18 at-risk customers and 5 low-velocity SKUs.`
        },
        sales: {
            totalSales: isSharma ? 154200.00 : 124500.00,
            totalOrders: isSharma ? 1120 : 842,
            averageOrderValue: isSharma ? 137.68 : 147.86,
            growthPercent: isSharma ? 14.8 : 12.4
        },
        customers: {
            totalCustomers: isSharma ? 450 : 326,
            atRiskCustomers: isSharma ? 24 : 18,
            inactiveCustomers: isSharma ? 38 : 27,
            loyalCustomers: isSharma ? 210 : 142,
            highValueCustomers: isSharma ? 78 : 54
        },
        dailySales: [
            { day: "Mon", total_amount: isSharma ? 18500 : 14200, order_count: isSharma ? 135 : 98 },
            { day: "Tue", total_amount: isSharma ? 16200 : 13100, order_count: isSharma ? 118 : 88 },
            { day: "Wed", total_amount: isSharma ? 19400 : 15800, order_count: isSharma ? 142 : 105 },
            { day: "Thu", total_amount: isSharma ? 21800 : 17400, order_count: isSharma ? 160 : 118 },
            { day: "Fri", total_amount: isSharma ? 26500 : 21500, order_count: isSharma ? 195 : 145 },
            { day: "Sat", total_amount: isSharma ? 29800 : 24300, order_count: isSharma ? 215 : 162 },
            { day: "Sun", total_amount: isSharma ? 22000 : 18200, order_count: isSharma ? 155 : 126 }
        ],
        products: isSharma ? [
            { productName: "Masala Chai Flask (1L)", price: 180.00, unitsSold: 320, status: "ACTIVE" },
            { productName: "Paneer Stuffed Croissant", price: 140.00, unitsSold: 245, status: "ACTIVE" },
            { productName: "Cold Brew Coffee", price: 160.00, unitsSold: 210, status: "ACTIVE" },
            { productName: "Sourdough Garlic Bread", price: 220.00, unitsSold: 180, status: "ACTIVE" },
            { productName: "Almond Biscotti Pack", price: 290.00, unitsSold: 4, status: "LOW_VELOCITY" },
            { productName: "Sugar-Free Matcha Latte", price: 240.00, unitsSold: 6, status: "LOW_VELOCITY" }
        ] : [
            { productName: "Basmati Rice Premium (5kg)", price: 450.00, unitsSold: 180, status: "ACTIVE" },
            { productName: "Cold Pressed Mustard Oil (1L)", price: 210.00, unitsSold: 145, status: "ACTIVE" },
            { productName: "Organic Toor Dal (1kg)", price: 165.00, unitsSold: 130, status: "ACTIVE" },
            { productName: "Desi Ghee Jar (500ml)", price: 380.00, unitsSold: 115, status: "ACTIVE" },
            { productName: "Multigrain Ragi Cookies", price: 195.00, unitsSold: 3, status: "LOW_VELOCITY" },
            { productName: "Herbal Green Tea Infusion", price: 260.00, unitsSold: 5, status: "LOW_VELOCITY" }
        ],
        diagnoses: [
            {
                title: "At-Risk Customer Churn Risk",
                severity: "HIGH",
                problem: `${isSharma ? 24 : 18} regular customers haven't purchased in the last 40+ days.`,
                evidence: [
                    "Last order interval exceeds 40 days",
                    "Previous average visit cycle was 8-12 days",
                    `Historical cohort revenue value: ₹${isSharma ? '32,000' : '24,000'}`
                ],
                why: "Customer purchase interval has elapsed with no follow-up outreach, increasing permanent churn probability.",
                impact: `Potential ₹${isSharma ? '32,000' : '24,000'} recurring quarterly revenue leakage if not re-engaged.`,
                recommendation: "Launch a 10% discount win-back campaign targeting the at-risk customer segment.",
                suggestedActionType: "CREATE_WIN_BACK_CAMPAIGN",
                suggestedActionParams: {
                    customerSegment: "AT_RISK",
                    discountPercent: 10,
                    durationDays: 7
                }
            },
            {
                title: "Catalogue Velocity Alert",
                severity: "MEDIUM",
                problem: "2 inventory catalogue SKUs are moving at low velocity (<6 units sold this month).",
                evidence: [
                    "Monthly units sold under 6 units",
                    "Carrying cost locking working capital"
                ],
                why: "Items carry premium price points and lack checkout promotional bundle placement.",
                impact: `₹${isSharma ? '18,000' : '12,000'} locked in slow-moving stock.`,
                recommendation: "Bundle slow-moving items with high-velocity bestsellers at a 12% combo discount.",
                suggestedActionType: null,
                suggestedActionParams: null
            }
        ],
        strategyLearnings: [
            {
                campaignName: "Weekend Breakfast Blitz",
                outcomeStatus: "COMPLETED",
                strategySummary: "Weekend morning promotions lifted average basket size by +18.2%.",
                adaptationInsight: "Schedule promotional discounts specifically during peak morning shopping windows."
            }
        ],
        campaigns: [
            {
                campaignId: "DEMO-001",
                campaignName: "Weekend Breakfast Blitz",
                targetSegment: "ALL",
                discountPercent: 15,
                durationDays: 3,
                status: "COMPLETED",
                reachCount: 380,
                conversionRate: 18.2,
                revenueGenerated: 24500.00,
                startDate: "2026-09-01"
            }
        ]
    };

    allData[merchantId] = data;
    saveAllBusinessData(allData);
    return data;
}

// Ensure seed data initialized
initializeDemoMerchants();

/**
 * AuthAPI: Complete Frontend-Only Standalone Authentication & Mock API Engine
 */
const AuthAPI = {
    isAuthenticated() {
        return !!this.getUser();
    },

    getUser() {
        try {
            const raw = localStorage.getItem(DEMO_SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    setUser(user) {
        if (user) {
            localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user));
        }
    },

    removeUser() {
        localStorage.removeItem(DEMO_SESSION_KEY);
    },

    getToken() {
        const user = this.getUser();
        return user ? "demo_jwt_token_" + user.merchantId : null;
    },

    async login(email, password) {
        // Simulated network delay
        await new Promise(r => setTimeout(r, 250));

        initializeDemoMerchants();
        const merchants = getStoredMerchants();
        const found = merchants.find(m => m.email.toLowerCase() === (email || '').trim().toLowerCase());

        if (!found || found.password !== password) {
            throw new Error("Invalid email or password");
        }

        const sessionUser = {
            merchantId: found.merchantId,
            businessName: found.businessName || found.name,
            ownerName: found.ownerName || found.name,
            name: found.businessName || found.name,
            email: found.email,
            phone: found.phone || '',
            isDemo: true
        };

        this.setUser(sessionUser);

        // Ensure business profile is ready
        getMerchantBusinessData(found.merchantId, sessionUser.businessName, sessionUser.ownerName);

        return sessionUser;
    },

    async register(businessName, ownerName, email, phone, password) {
        await new Promise(r => setTimeout(r, 300));

        initializeDemoMerchants();
        const merchants = getStoredMerchants();

        const cleanEmail = (email || '').trim().toLowerCase();
        const cleanBusiness = (businessName || '').trim();
        const cleanOwner = (ownerName || '').trim();
        const cleanPhone = (phone || '').trim();

        if (!cleanBusiness || !cleanOwner || !cleanEmail || !cleanPhone || !password) {
            throw new Error("All fields are required.");
        }

        const existing = merchants.find(m => m.email.toLowerCase() === cleanEmail);
        if (existing) {
            throw new Error("A merchant account with this email address already exists.");
        }

        const merchantId = "DEMO-M-" + Date.now().toString().slice(-5);
        const newMerchant = {
            merchantId: merchantId,
            businessName: cleanBusiness,
            ownerName: cleanOwner,
            name: cleanBusiness,
            email: cleanEmail,
            phone: cleanPhone,
            password: password,
            createdAt: new Date().toISOString()
        };

        merchants.push(newMerchant);
        saveMerchants(merchants);

        // Pre-seed merchant profile
        getMerchantBusinessData(merchantId, cleanBusiness, cleanOwner);

        return newMerchant;
    },

    logout() {
        this.removeUser();
        window.location.href = "login.html";
    },

    /**
     * Intercepts all /api/ requests and routes them to client-side demo state
     */
    async authFetch(url, options = {}) {
        await new Promise(r => setTimeout(r, 120));

        const user = this.getUser();
        if (!user && !url.includes('/api/auth/')) {
            window.location.href = "login.html";
            throw new Error("Session expired. Please log in.");
        }

        const merchantId = user ? user.merchantId : "DEMO-M-SHARMA";
        const mData = getMerchantBusinessData(merchantId, user ? user.businessName : null, user ? user.ownerName : null);
        const method = (options.method || 'GET').toUpperCase();

        // 1. AI STATUS
        if (url.includes('/api/ai/status')) {
            return new Response(JSON.stringify({
                status: "ONLINE",
                model: "llama3.2:3b (Demo Mode)",
                isOnline: true
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 2. DASHBOARD SUMMARY
        if (url.includes('/api/dashboard') || url.includes('/summary')) {
            return new Response(JSON.stringify({
                businessHealthSummary: mData.businessHealth.summary,
                sales: mData.sales,
                customers: mData.customers,
                dailySales: mData.dailySales
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 3. AI DIAGNOSIS
        if (url.includes('/api/ai/diagnosis')) {
            return new Response(JSON.stringify({
                businessHealthSummary: mData.businessHealth.summary,
                diagnoses: mData.diagnoses,
                strategyLearnings: mData.strategyLearnings
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 4. CUSTOMER SEGMENTS
        if (url.includes('/api/customers/at-risk')) {
            const list = Array.from({ length: mData.customers.atRiskCustomers || 18 }, (_, i) => ({
                customerId: `CUST-AR-${i + 1}`,
                name: `Customer ${i + 1}`,
                segment: "AT_RISK",
                daysInactive: 42 + i,
                totalSpent: 3200 + (i * 250)
            }));
            return new Response(JSON.stringify(list), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        if (url.includes('/api/customers/inactive')) {
            const list = Array.from({ length: mData.customers.inactiveCustomers || 27 }, (_, i) => ({
                customerId: `CUST-IN-${i + 1}`,
                name: `Inactive User ${i + 1}`,
                segment: "INACTIVE"
            }));
            return new Response(JSON.stringify(list), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        if (url.includes('/api/customers/loyal')) {
            const list = Array.from({ length: mData.customers.loyalCustomers || 142 }, (_, i) => ({
                customerId: `CUST-LY-${i + 1}`,
                name: `Loyal Patron ${i + 1}`,
                segment: "LOYAL"
            }));
            return new Response(JSON.stringify(list), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        if (url.includes('/api/customers/high-value')) {
            const list = Array.from({ length: mData.customers.highValueCustomers || 54 }, (_, i) => ({
                customerId: `CUST-HV-${i + 1}`,
                name: `VIP Customer ${i + 1}`,
                segment: "HIGH_VALUE"
            }));
            return new Response(JSON.stringify(list), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 5. PRODUCTS
        if (url.includes('/api/products/top-selling')) {
            const top = mData.products.filter(p => p.status === 'ACTIVE');
            return new Response(JSON.stringify(top), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        if (url.includes('/api/products/low-performing')) {
            const low = mData.products.filter(p => p.status === 'LOW_VELOCITY');
            return new Response(JSON.stringify(low), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        if (url.includes('/api/products')) {
            return new Response(JSON.stringify(mData.products), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 6. CAMPAIGNS
        if (url.includes('/api/campaigns') && method === 'GET') {
            return new Response(JSON.stringify(mData.campaigns), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 7. ACTION APPROVAL (POST)
        if (url.includes('/api/ai/actions/approve') && method === 'POST') {
            const body = typeof options.body === 'string' ? JSON.parse(options.body) : (options.body || {});
            const todayStr = new Date().toISOString().split('T')[0];

            // Duplicate Check: check if a DRAFT win-back campaign was created today
            const existingDraft = (mData.campaigns || []).find(c =>
                c.status === "DRAFT" &&
                (c.targetSegment === (body.parameters?.customerSegment || "AT_RISK") || c.targetSegment === "AT_RISK")
            );

            if (existingDraft) {
                return new Response(JSON.stringify({
                    success: false,
                    error: `Duplicate action execution prevented: A DRAFT win-back campaign already exists for merchant today (Campaign ID: ${existingDraft.campaignId}).`
                }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }

            // Create new DRAFT campaign
            const nextIndex = (mData.campaigns || []).length + 1;
            const newCampaignId = "DEMO-00" + nextIndex;
            const newCampaign = {
                campaignId: newCampaignId,
                campaignName: body.actionType === "CREATE_WIN_BACK_CAMPAIGN" ? "Win Back At-Risk Customers" : "Merchant Promotion",
                targetSegment: body.parameters?.customerSegment || "AT_RISK",
                discountPercent: parseInt(body.parameters?.discountPercent || 10, 10),
                durationDays: parseInt(body.parameters?.durationDays || 7, 10),
                status: "DRAFT",
                reachCount: mData.customers.atRiskCustomers || 18,
                conversionRate: 0.0,
                revenueGenerated: 0.00,
                startDate: todayStr
            };

            mData.campaigns.unshift(newCampaign);

            // Persist
            const allData = getAllBusinessData();
            allData[merchantId] = mData;
            saveAllBusinessData(allData);

            return new Response(JSON.stringify({
                success: true,
                message: "Action approved and executed successfully. Campaign created in DRAFT status for merchant review.",
                campaignId: newCampaignId,
                status: "DRAFT"
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // 8. AI COPILOT CHAT (POST)
        if (url.includes('/api/ai/chat') || url.includes('/api/chat')) {
            const body = typeof options.body === 'string' ? JSON.parse(options.body) : (options.body || {});
            const question = (body.question || '').toLowerCase();
            const answer = generateDemoAiResponse(question, mData);

            return new Response(JSON.stringify({
                success: true,
                answer: answer
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // Fallback default
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
};

/**
 * Intelligent Frontend AI Response Generator for Demo Mode
 * Formats responses strictly with FACTS / WHY / ACTION / IMPACT
 */
function generateDemoAiResponse(question, mData) {
    const q = question.toLowerCase();
    const bName = mData.businessName || "your business";
    const revStr = "₹" + parseFloat(mData.sales.totalSales).toLocaleString('en-IN');
    const ordersStr = mData.sales.totalOrders;
    const aovStr = "₹" + parseFloat(mData.sales.averageOrderValue).toFixed(2);
    const atRiskCount = mData.customers.atRiskCustomers || 18;

    if (q.includes("sales") || q.includes("declin") || q.includes("revenue") || q.includes("growth")) {
        return `FACTS: Total revenue for ${bName} stands at ${revStr} across ${ordersStr} orders (AOV: ${aovStr}, Growth: +${mData.sales.growthPercent}%). Peak volume occurs on weekends with slight mid-week softening.
WHY: Customer purchase intervals slowed among ${atRiskCount} repeat patrons who have not placed orders in 40+ days, leading to mild mid-week revenue leakage.
ACTION: Review and launch the recommended 10% Win-Back draft campaign in the Action modal to re-engage the ${atRiskCount} at-risk customers, and introduce a Tuesday-Wednesday bundle.
IMPACT: Projected recovery of ₹18,500 in repeat revenue over the next 14 days with an estimated 16.4% win-back conversion rate.`;
    }

    if (q.includes("customer") || q.includes("target") || q.includes("risk") || q.includes("churn") || q.includes("segment")) {
        return `FACTS: You currently have ${mData.customers.totalCustomers} total customers: ${mData.customers.loyalCustomers} Loyal, ${mData.customers.highValueCustomers} High-Value, ${mData.customers.inactiveCustomers} Inactive, and ${atRiskCount} At-Risk.
WHY: The ${atRiskCount} at-risk patrons have exceeded their expected 10-day reorder cycle. Historical store patterns show that churn risk exceeds 80% if uncontacted beyond 45 days.
ACTION: Approve the AI-generated Phase 8 Win-Back draft campaign offering a 10% discount valid for 7 days.
IMPACT: Protects customer lifetime value (LTV) and recovers an estimated ₹${atRiskCount * 1200} in recurring monthly purchases.`;
    }

    if (q.includes("product") || q.includes("underperform") || q.includes("catalogue") || q.includes("item") || q.includes("stock") || q.includes("inventory")) {
        return `FACTS: Your top products generate over 70% of total store revenue, whereas 2 catalogue items (Almond Biscotti and Matcha/Herbal items) have moved fewer than 6 units this month.
WHY: Slower SKUs are priced 25% above your average basket size (${aovStr}) and lack checkout visibility.
ACTION: Create a bundled promotional combo pairing your bestselling items with slow-moving SKUs at a 12% combo discount.
IMPACT: Unlocks approximately ₹14,000 in stagnant inventory capital while elevating Average Order Value by 8-10%.`;
    }

    if (q.includes("what should i do") || q.includes("next") || q.includes("recommend") || q.includes("strategy") || q.includes("action")) {
        return `FACTS: ${bName} has a strong Business Health Score of ${mData.businessHealth.score}/100 with steady baseline revenue of ${revStr}.
WHY: The highest ROI opportunity is retention of ${atRiskCount} at-risk patrons combined with cross-selling slower catalogue items to loyal buyers.
ACTION: Step 1: Open the Action Modal and approve the AI Win-Back Draft Campaign. Step 2: Implement bundled checkout promotions for slower SKUs.
IMPACT: Estimated +14.5% month-over-month revenue expansion without increasing customer acquisition costs.`;
    }

    // Default intelligent response
    return `FACTS: Business operations for ${bName} show solid foundations with ${revStr} revenue, ${ordersStr} orders, and an active customer base of ${mData.customers.totalCustomers}.
WHY: Repeat buyers demonstrate a 3.4x higher conversion rate than new visitors, making cohort retention your primary growth driver.
ACTION: Review the pending AI Diagnosis recommendations on your dashboard and approve the suggested retention campaign.
IMPACT: Sustained positive cash flow, increased customer retention, and healthy merchant profit margins.`;
}

// Expose globally
window.AuthAPI = AuthAPI;