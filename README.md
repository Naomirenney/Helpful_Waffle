# 🧁 WorkBuddy — AI Workplace Productivity Assistant

> An AI-powered productivity web app that helps professionals automate daily work tasks using the Gemini API.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Gemini API](https://img.shields.io/badge/Gemini_API-2.0_Flash-4285F4?logo=google)

## 🎯 Problem Statement

Professionals across industries spend significant time on repetitive tasks such as drafting emails, summarizing information, planning schedules, and conducting research. **WorkBuddy** solves this by providing an AI-driven assistant that simplifies and automates these processes, saving hours of daily work.

## ✨ Features

### 1. 📧 Smart Email Generator
- Generate context-based professional emails
- Support for tone variations (Formal, Informal, Persuasive, Friendly, Urgent)
- Audience adaptation (Client, Manager, Team Member, Vendor, HR)

### 2. 📝 Meeting Notes Summarizer
- Convert lengthy notes into concise summaries
- Extract key discussion points, decisions, and action items
- Highlight deadlines and responsibilities

### 3. ✅ AI Task Planner
- Generate structured daily or weekly plans
- Prioritize tasks using the Eisenhower Matrix (urgency/importance)
- Suggest time optimization strategies

### 4. 🔍 AI Research Assistant
- Summarize complex topics with structured analysis
- Multiple research types (Overview, Industry, Technical, Competitive, Trends)
- Provide key insights and actionable recommendations

### 5. 💬 AI Chatbot Interface
- Interactive conversational interface
- Context-aware multi-turn conversations
- General workplace assistance

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | Full-stack React framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Gemini 2.0 Flash** | AI content generation |
| **Lucide React** | Beautiful icon library |
| **Vercel** | Deployment platform |

## 🎨 Design Philosophy

- **Cute Retro Simple Theme** with pastel color palette
- Pastel orange, pink, teal, and brown accents
- Thin colored borders on all interactive elements
- Card-based layout with sidebar navigation
- Fully responsive (mobile + desktop)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Helpful_Waffle.git
cd Helpful_Waffle

# Install dependencies
npm install

# Add your Gemini API key
# Edit .env.local and add your key:
# GEMINI_API_KEY=your_api_key_here

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add environment variable: `GEMINI_API_KEY` = your API key
4. Deploy!

## 📋 Prompt Engineering Strategy

Each feature uses carefully crafted system prompts that:

- **Define the AI's role** clearly (email writer, meeting analyst, task planner, etc.)
- **Structure expected output** with specific sections and formatting
- **Set quality standards** for professional, concise, actionable content
- **Include context parameters** (tone, audience, research type) for tailored responses

### Sample Prompts

**Email Generator:**
> "Generate a professional email with the following details: Subject: [topic], Tone: [formal/informal], Audience: [client/manager]. Include subject line, greeting, body, and sign-off."

**Meeting Summarizer:**
> "Summarize meeting notes into: Key Discussion Points, Decisions Made, Action Items, Deadlines, Follow-up Items."

**Task Planner:**
> "Create a [daily/weekly] plan using the Eisenhower Matrix. Assign priority levels, suggest time blocks, and estimate duration."

## ⚠️ Responsible AI

- All AI outputs include a disclaimer: *"AI-generated content may require human review"*
- Users are encouraged to verify critical information
- The AI acknowledges its limitations when unsure
- No personal data is stored — all processing is session-based

## 🗂️ Project Structure

```
src/
├── app/
│   ├── api/gemini/      # Gemini API route handler
│   ├── chat/            # AI Chatbot page
│   ├── email/           # Email Generator page
│   ├── meeting/         # Meeting Notes page
│   ├── research/        # Research Assistant page
│   ├── tasks/           # Task Planner page
│   ├── globals.css      # Global styles & theme
│   ├── layout.tsx       # Root layout with sidebar
│   └── page.tsx         # Dashboard homepage
├── components/
│   ├── AIDisclaimer.tsx  # Reusable AI disclaimer
│   ├── LoadingDots.tsx   # Loading animation
│   └── Sidebar.tsx       # Navigation sidebar
└── lib/
    └── api.ts           # API client helper
```

## 📜 Tools Used

- **Google Gemini 2.0 Flash** — AI model for content generation
- **Next.js** — React framework with API routes
- **Tailwind CSS** — Rapid UI development
- **Vercel** — Serverless deployment
- **Lucide Icons** — Clean, consistent iconography

## 🏗️ Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| API rate limiting | Implemented loading states and error handling |
| Maintaining conversation context | Kept last 6 messages for chat context |
| Responsive design across devices | Used Tailwind CSS responsive utilities |
| Professional AI outputs | Carefully structured system prompts per feature |

---

**Built with ❤️ for the AI Skill Accelerator Programme by CAPACITI**
