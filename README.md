💰 EmpowerSave — AI-Powered Financial Companion

Empower Your Financial Future — A smart, personalized financial platform built specifically for women and students.

<img width="1919" height="1134" alt="Screenshot 2026-05-23 144433" src="https://github.com/user-attachments/assets/898b411f-56ba-43d8-a8ad-80e227f5d081" />

📌 Table of Contents

About the Project
Live Demo
Features
Pages Overview
Tech Stack
Project Structure
How It Works
License
Contact


📖 About the Project
EmpowerSave is a frontend web application that acts as an AI-powered financial companion designed for women and students — two groups that often face unique financial challenges. The platform combines an intelligent chatbot advisor, a personal finance dashboard, a life event simulator, and detailed financial reports — all in one clean, responsive interface.
The project addresses:

The gender pay gap and women's longer retirement horizon
Student loan and scholarship planning for college students
Beginner-friendly investing guidance with small amounts
"What-if" financial scenario planning for major life decisions


🌐 Live Demo : 


✨ Features
🤖 AI Financial Advisor

Conversational chatbot with an Agentic AI + RAG knowledge engine
Intent detection across 7 financial categories: budgeting, savings, investing, scholarships, student finance, women's finance, and expense reduction
Personalized responses using user's actual income/savings data from localStorage
Predefined quick-question cards to help users get started instantly
Markdown-style formatting (bold, bullets) rendered in chat bubbles

📊 Smart Dashboard

Real-time income, expense, and savings stat cards
Financial goal progress bars with percentage tracking (Emergency Fund, Education, Travel, Investment Portfolio)
Recent transactions table with color-coded category badges
AI-Powered Insights panel with smart tips and goal alerts

🔮 Life Simulator

Input sliders and fields for current income, expenses, savings, and goals
Run Simulation to project financial outcomes over custom time periods
Quick Scenarios (Reduce expenses by 20%, Get a 15% raise, Aggressive savings, Focus on investments)
Sample scenario cards: Higher Education, Career Change, Major Purchase, Life Events, Investment Strategies, Debt Payoff

📈 Financial Reports

Monthly summary with income, expenses, and savings breakdown
Spending breakdown with visual progress bars per category (Housing, Food, Transport, Education, Other)
AI Recommendations panel with actionable savings and investment insights
Previous reports archive (October–December 2025)
Trend Analysis — 6-month performance overview
Download PDF button

📬 Contact Page

Contact form (Name, Email, Subject, Message)
Office hours card and contact information panel
FAQ section

🎨 Design System

Fully responsive — works on desktop, tablet, and mobile
Custom CSS design system with CSS variables for colors, spacing, typography, shadows, and border radii
Inter (body) + Poppins (headings) font pairing
Smooth card hover animations and scroll-triggered progress bar animations
Toast notification system with slide-in/out animations


🗂 Pages Overview
PageFileDescriptionHomeindex.htmlLanding page with hero, features, and CTADashboarddashboard.htmlFinancial overview — stats, goals, transactions, insightsAI Advisorai-advisor.htmlChatbot interface with popular question cardsLife Simulatorlife-simulator.html"What-if" scenario planner with projectionsReportsreports.htmlMonthly financial reports and trend analysisContactcontact.htmlContact form, office hours, FAQ

🛠 Tech Stack
TechnologyPurposeHTML5Page structure and semantic markupCSS3Custom design system with CSS variables, Flexbox, and GridVanilla JavaScriptUI interactions, AI engine, localStorage data layerGoogle FontsInter + Poppins font pairinglocalStorage APIPersists user financial data between sessionsIntersectionObserver APIScroll-triggered progress bar animationsIntl.NumberFormat APICurrency formatting

No frameworks. No build tools. No dependencies. Pure HTML/CSS/JS.


📁 Project Structure
EmpowerSave/
└── kk/
    ├── index.html           # Home / landing page
    ├── dashboard.html       # Financial dashboard
    ├── ai-advisor.html      # AI chatbot advisor page
    ├── life-simulator.html  # Financial scenario simulator
    ├── reports.html         # Monthly financial reports
    ├── contact.html         # Contact form and info
    ├── styles.css           # Global design system (CSS variables, components)
    ├── app.js               # Core app logic (nav, animations, localStorage, notifications)
    └── ai-engine.js         # AI knowledge base, intent detection, response generation
Key JavaScript Modules
app.js handles:

Mobile navbar toggle
Smooth scrolling
Progress bar animations (IntersectionObserver)
StorageHelper — localStorage wrapper with save/load/remove
initializeUserData() — seeds default financial profile on first load
animateNumber() — smooth count-up animations
Toast notification system

ai-engine.js handles:

KnowledgeBase — structured financial knowledge across 6 domains (budgeting, savings, investing, scholarships, women's finance, student finance)
AgenticAI class — intent analysis, response generation, and personalization using live user data
Chat interface wiring — message rendering, typing delay simulation, suggested follow-up questions
askQuestion() — triggered by Popular Question cards on the AI Advisor page


🧠 How It Works
AI Engine (RAG Simulation)
The AgenticAI class in ai-engine.js simulates an Agentic AI + Retrieval-Augmented Generation (RAG) pipeline entirely in the browser:

User sends a message → generateResponse(userMessage) is called
Intent is detected → analyzeIntent() scans for financial keywords across 8 intents
Knowledge is retrieved → matching entries from the structured KnowledgeBase object are pulled
Response is generated → formatted with relevant tips, strategies, and resources
Personalization applied → if user data exists in localStorage, savings rate, monthly potential, and goals are added to the response
Suggestions returned → 3 follow-up question suggestions are provided per intent

Data Persistence
User financial data (income, expenses, savings, goals, transactions) is stored in localStorage under the key empowersave_user. Default values are seeded on first load via initializeUserData().

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

📬 Contact
EmpowerSave Team

📧 Email: support@empowersave.com
📞 Phone: +1 (555) 123-4567
🏢 Address: 123 Financial Street, Empowerment City, EC 12345

Office Hours:

Monday–Friday: 9:00 AM – 6:00 PM
Saturday: 10:00 AM – 4:00 PM
Sunday: Closed


<div align="center">
Built with 💙 for financial empowerment
© 2026 EmpowerSave. All rights reserved.
</div>
