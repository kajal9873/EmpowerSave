// ============================================
// EmpowerSave - AI Engine (Agentic AI + RAG)
// ============================================

// AI Knowledge Base (RAG Simulation)
const KnowledgeBase = {
    budgeting: {
        '50-30-20': 'The 50-30-20 rule is a popular budgeting method: 50% for needs (housing, utilities, groceries), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment.',
        'envelope': 'The envelope method involves allocating cash to different spending categories (envelopes). Once an envelope is empty, you stop spending in that category.',
        'zero-based': 'Zero-based budgeting means giving every dollar a job. Your income minus expenses should equal zero at the end of the month.',
        'tips': [
            'Track every expense for at least a month to understand spending patterns',
            'Automate savings by setting up automatic transfers on payday',
            'Use the 24-hour rule for non-essential purchases over $50',
            'Review and adjust your budget monthly'
        ]
    },

    savings: {
        'emergency-fund': 'An emergency fund should cover 3-6 months of essential expenses. For students, start with $500-1000 and build from there. Keep it in a high-yield savings account.',
        'high-yield': 'High-yield savings accounts (HYSA) offer 4-5% APY compared to traditional banks\' 0.01%. Online banks like Ally, Marcus, and Discover offer the best rates.',
        'automation': 'Automate savings by setting up recurring transfers. "Pay yourself first" by moving money to savings before spending on anything else.',
        'strategies': [
            'Round-up savings: Round purchases to nearest dollar and save the difference',
            'No-spend challenges: Commit to not spending on non-essentials for a week or month',
            'Cash-back rewards: Use credit card rewards to boost savings',
            'Side hustle income: Direct all extra income to savings goals'
        ]
    },

    investing: {
        'beginner': 'Start with low-cost index funds that track the S&P 500. Apps like Robinhood, Fidelity, or Vanguard allow starting with as little as $1.',
        'compound-interest': 'Compound interest is earning returns on your returns. Starting early is crucial - $100/month from age 25 becomes $264k by 65 at 7% return.',
        'diversification': 'Don\'t put all eggs in one basket. Spread investments across stocks, bonds, and different sectors to reduce risk.',
        'student-options': [
            'Roth IRA: Contribute after-tax money, withdraw tax-free in retirement',
            'Index funds: Low-fee funds tracking market indices like S&P 500',
            'Fractional shares: Buy portions of expensive stocks for as little as $1',
            'Robo-advisors: Automated portfolio management (Betterment, Wealthfront)'
        ]
    },

    scholarships: {
        'where-to-find': 'Check Fastweb.com, Scholarships.com, College Board, and your school\'s financial aid office. Many go unclaimed due to lack of applications.',
        'application-tips': [
            'Start early - many deadlines are 6-12 months before school starts',
            'Apply to many - even small $500 scholarships add up',
            'Personalize essays - don\'t use generic templates',
            'Request strong recommendation letters from teachers who know you well',
            'Look for niche scholarships matching your background, interests, or major'
        ],
        'types': [
            'Merit-based: Academic achievement, test scores, GPA',
            'Need-based: Financial situation and family income',
            'Athletic: Sports talent and achievements',
            'Creative: Art, music, writing portfolios',
            'Demographic: Gender, ethnicity, first-generation students',
            'Field-specific: Major or career path (STEM, teaching, healthcare)'
        ]
    },

    women_finance: {
        'unique-challenges': 'Women face unique financial challenges: wage gap (earning 82¢ per dollar men earn), career breaks for caregiving, longer life expectancy requiring more retirement savings.',
        'empowerment-strategies': [
            'Negotiate salary aggressively - women who negotiate earn $1M+ more over career',
            'Invest in retirement despite career gaps - even small amounts compound significantly',
            'Build emergency funds to handle unexpected caregiving responsibilities',
            'Consider entrepreneurship - women-owned businesses are growing 2x faster than average',
            'Network with women\'s professional organizations for mentorship and opportunities'
        ],
        'resources': [
            'Women\'s Business Centers (SBA) - free business counseling',
            'Ellevest - investment platform designed for women',
            'LeanIn Circles - peer support groups for professional growth',
            'AAUW grants - funding for women pursuing education'
        ]
    },

    student_finance: {
        'student-loans': 'Federal loans are better than private - lower interest, flexible repayment, forgiveness options. Fill out FAFSA annually. Only borrow what you absolutely need.',
        'textbook-savings': [
            'Rent textbooks from Chegg, Amazon, or campus bookstore',
            'Buy used or older editions when content hasn\'t changed',
            'Check library reserves for course materials',
            'Form study groups to share resources',
            'Sell books back at semester end'
        ],
        'money-making': [
            'On-campus jobs: Library, dining hall, tutoring (often work-study eligible)',
            'Freelancing: Writing, graphic design, coding on Fiverr or Upwork',
            'Tutoring: Subject expertise for younger students ($20-50/hour)',
            'Research assistant: Paid positions in university departments',
            'Resident advisor: Free room and board plus stipend'
        ]
    }
};

// Conversation context for better responses
let conversationHistory = [];

// AI Response Generator (Agentic AI Simulation)
class AgenticAI {
    constructor() {
        this.context = {};
        this.userData = this.loadUserData();
    }

    loadUserData() {
        try {
            const data = localStorage.getItem('empowersave_user');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        conversationHistory.push({ role: 'user', content: userMessage });

        // Analyze intent
        const intent = this.analyzeIntent(message);

        // Generate contextual response
        let response = this.createResponse(intent, message);

        // Add personalization if user data available
        if (this.userData) {
            response = this.personalizeResponse(response, intent);
        }

        conversationHistory.push({ role: 'ai', content: response });

        return {
            text: response,
            suggestions: this.getSuggestions(intent)
        };
    }

    analyzeIntent(message) {
        // Budgeting intent
        if (message.includes('budget') || message.includes('split') || message.includes('income')) {
            return 'budgeting';
        }

        // Savings intent
        if (message.includes('save') || message.includes('saving') || message.includes('emergency fund')) {
            return 'savings';
        }

        // Investment intent
        if (message.includes('invest') || message.includes('stock') || message.includes('portfolio')) {
            return 'investing';
        }

        // Scholarship intent
        if (message.includes('scholarship') || message.includes('grant') || message.includes('financial aid')) {
            return 'scholarships';
        }

        // Student-specific
        if (message.includes('student') || message.includes('college') || message.includes('university')) {
            return 'student';
        }

        // Women-specific
        if (message.includes('women') || message.includes('entrepreneur') || message.includes('gender')) {
            return 'women';
        }

        // Expense reduction
        if (message.includes('reduce') || message.includes('cut') || message.includes('expense')) {
            return 'expenses';
        }

        return 'general';
    }

    createResponse(intent, message) {
        switch (intent) {
            case 'budgeting':
                if (message.includes('50') || message.includes('split') || message.includes('how')) {
                    return `Great question about budgeting! I recommend the **50-30-20 rule** for most people:\n\n${KnowledgeBase.budgeting['50-30-20']}\n\n**Practical tips:**\n${KnowledgeBase.budgeting.tips.slice(0, 3).map(tip => `• ${tip}`).join('\n')}\n\nWould you like help creating a personalized budget based on your income?`;
                }
                return `Let me help you with budgeting! Here are proven strategies:\n\n**50-30-20 Rule:** ${KnowledgeBase.budgeting['50-30-20']}\n\n**Zero-Based Budgeting:** ${KnowledgeBase.budgeting['zero-based']}\n\nWhich approach interests you most?`;

            case 'savings':
                if (message.includes('emergency')) {
                    return `**Emergency Fund Guidance:**\n\n${KnowledgeBase.savings['emergency-fund']}\n\n**Building Strategy:**\n1. Start with $500 as mini emergency fund\n2. Build to 1 month of expenses\n3. Gradually increase to 3-6 months\n4. Keep in high-yield savings account (4-5% APY)\n\nBased on your profile, I recommend starting with a $1,000 target. Would you like help creating a savings plan?`;
                }
                return `Here's how to supercharge your savings:\n\n**Automation:** ${KnowledgeBase.savings.automation}\n\n**Top Strategies:**\n${KnowledgeBase.savings.strategies.slice(0, 3).map(s => `• ${s}`).join('\n')}\n\n**High-Yield Accounts:** ${KnowledgeBase.savings['high-yield']}\n\nWhat's your current savings goal?`;

            case 'investing':
                return `**Investing for Beginners:**\n\n${KnowledgeBase.investing.beginner}\n\n**Why Compound Interest Matters:**\n${KnowledgeBase.investing['compound-interest']}\n\n**Best Options for Students/Young Investors:**\n${KnowledgeBase.investing['student-options'].slice(0, 4).map(opt => `• ${opt}`).join('\n')}\n\n**Key Principle:** ${KnowledgeBase.investing.diversification}\n\nReady to start with just $10-50/month? I can guide you!`;

            case 'scholarships':
                return `**Scholarship Opportunities:**\n\n**Where to Find Them:**\n${KnowledgeBase.scholarships['where-to-find']}\n\n**Types of Scholarships:**\n${KnowledgeBase.scholarships.types.slice(0, 4).map(type => `• ${type}`).join('\n')}\n\n**Application Tips:**\n${KnowledgeBase.scholarships['application-tips'].slice(0, 3).map(tip => `• ${tip}`).join('\n')}\n\nDon't leave money on the table - even small scholarships add up!`;

            case 'student':
                return `**Student Finance Tips:**\n\n**Student Loans:** ${KnowledgeBase.student_finance['student-loans']}\n\n**Money-Making Opportunities:**\n${KnowledgeBase.student_finance['money-making'].slice(0, 4).map(opp => `• ${opp}`).join('\n')}\n\n**Textbook Savings:**\n${KnowledgeBase.student_finance['textbook-savings'].slice(0, 3).map(tip => `• ${tip}`).join('\n')}\n\nWhat area would you like to explore more?`;

            case 'women':
                return `**Financial Empowerment for Women:**\n\n**Understanding the Challenges:**\n${KnowledgeBase.women_finance['unique-challenges']}\n\n**Empowerment Strategies:**\n${KnowledgeBase.women_finance['empowerment-strategies'].slice(0, 4).map(str => `• ${str}`).join('\n')}\n\n**Resources:**\n${KnowledgeBase.women_finance.resources.slice(0, 3).map(res => `• ${res}`).join('\n')}\n\nYou have the power to transform your financial future!`;

            case 'expenses':
                return `**Smart Ways to Reduce Expenses:**\n\n1. **Track Everything:** Use apps or spreadsheets to identify spending leaks\n2. **Meal Prep:** Save $200-300/month by cooking vs. dining out\n3. **Subscription Audit:** Cancel unused streaming/gym memberships\n4. **Generic Brands:** Save 20-30% on groceries with store brands\n5. **Student Discounts:** Many retailers offer 10-20% off with student ID\n6. **Housing Hacks:** Roommates, rent negotiation, or become an RA\n\n**The 30-Day Rule:** Wait 30 days before non-essential purchases over $100\n\nWant help analyzing your specific spending patterns?`;

            default:
                return `I'm here to help with your financial questions! I can assist with:\n\n• **Budgeting** - Creating and sticking to budgets\n• **Saving** - Building emergency funds and reaching goals\n• **Investing** - Starting small and growing wealth\n• **Scholarships** - Finding and applying for funding\n• **Student Finance** - Managing loans and expenses\n• **Women's Finance** - Unique strategies and resources\n\nWhat would you like to explore?`;
        }
    }

    personalizeResponse(response, intent) {
        if (!this.userData) return response;

        const savingsRate = ((this.userData.savings / this.userData.income) * 100).toFixed(1);

        // Add personalized insights
        let personalization = '\n\n---\n**📊 Based on Your Data:**\n';

        if (intent === 'budgeting' || intent === 'general') {
            personalization += `• Your current savings rate: ${savingsRate}%\n`;
            if (savingsRate < 20) {
                personalization += `• Opportunity: Increase to 20% to accelerate goals\n`;
            } else {
                personalization += `• Excellent! You're exceeding the recommended 20%\n`;
            }
        }

        if (intent === 'savings') {
            const monthlyPotential = this.userData.income - this.userData.expenses;
            personalization += `• Monthly savings potential: $${monthlyPotential}\n`;
            personalization += `• At current rate, you could save $${monthlyPotential * 12} annually\n`;
        }

        return response + personalization;
    }

    getSuggestions(intent) {
        const suggestions = {
            budgeting: [
                'How can I track my expenses effectively?',
                'What\'s the best budgeting app?',
                'Help me create a zero-based budget'
            ],
            savings: [
                'How much should I save each month?',
                'Best high-yield savings accounts?',
                'Automate my savings strategy'
            ],
            investing: [
                'Should I invest or pay off debt first?',
                'What are index funds?',
                'How to start investing with $100?'
            ],
            scholarships: [
                'How to write a winning scholarship essay?',
                'Lesser-known scholarship opportunities?',
                'When should I start applying?'
            ],
            student: [
                'Student loan repayment strategies?',
                'Best student credit cards?',
                'How to make money in college?'
            ],
            women: [
                'Salary negotiation tips for women?',
                'Women-focused investment platforms?',
                'Business grants for women?'
            ],
            general: [
                'Create a personalized financial plan',
                'What should I prioritize first?',
                'How to build wealth as a student?'
            ]
        };

        return suggestions[intent] || suggestions.general;
    }
}

// Initialize AI
const ai = new AgenticAI();

// Chat Interface (for ai-advisor.html)
if (document.getElementById('chatInput')) {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;

        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.textContent = isUser ? 'YOU' : 'AI';

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';

        // Convert markdown-style bold to HTML
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        bubble.innerHTML = formattedText;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(bubble);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Show typing indicator
        setTimeout(() => {
            const response = ai.generateResponse(message);
            addMessage(response.text, false);
        }, 500);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Function to ask predefined questions (used in ai-advisor.html)
function askQuestion(question) {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = question;
        chatInput.focus();

        // Trigger send after a brief delay
        setTimeout(() => {
            document.getElementById('sendBtn').click();
        }, 100);
    }
}

console.log('AI Engine initialized! 🤖');
