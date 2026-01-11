
# ScholarAI - Student Life Companion

An AI-powered MVP designed to help college students manage their academic and emotional well-being using Google Gemini.

## Features
- **AI Study Coach**: Chat with a specialized AI for concept clarification and planning.
- **Smart Study Planner**: Generate personalized study schedules based on exam dates and workload.
- **Study Lab**: Summarize notes and generate practice quizzes instantly.
- **Wellness Check**: Mood-based stress management suggestions and uplifting advice.
- **Deadline Tracker**: Local task management with priority levels.

## Local Deployment

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A Google Gemini API Key. You can get one at [ai.google.dev](https://ai.google.dev/).

### Setup Instructions
1. **Clone the repository** (or download the source files).
2. **Set Environment Variables**:
   The app expects an API key. Since this is a client-side MVP for a hackathon:
   - For local development, ensure your environment provides `process.env.API_KEY`.
   - If using a static server, you might need to inject the key or use the `window.aistudio` helper if running within a compatible frame.
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm start
   ```

### Technical Stack
- **Frontend**: React, Tailwind CSS, Lucide React.
- **AI**: @google/genai (Gemini 3 Flash Preview).
- **Storage**: Browser LocalStorage for persistent task and plan data.

## Note
This is a hackathon MVP. Data is stored locally in your browser. No data is sent to a private backend, only the prompts sent to Google Gemini for processing.
