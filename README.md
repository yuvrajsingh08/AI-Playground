# AI Knowledge Extractor & Character Chat Platform

A full-stack AI application for extracting structured knowledge from PDFs and chatting with anime-style characters that have persistent personalities and memory. Built with production-grade patterns—clear separation of concerns, robust LLM output handling, and a user-friendly conversational experience.

- Author: Yuvraj Singh (yuvrajsingh08)
- Repo: yuvrajsingh08/AI-Playground
- Tech: React, Node.js, Groq LLM, Supabase

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [AI Knowledge Extractor](#ai-knowledge-extractor)
  - [Character-Based AI Chat](#character-based-ai-chat)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started (Local Development)](#getting-started-local-development)
- [API Endpoints](#api-endpoints)
- [Example Requests](#example-requests)
- [Design & Implementation Notes](#design--implementation-notes)
- [Known Limitations](#known-limitations)
- [Roadmap / Future Improvements](#roadmap--future-improvements)
- [Resume Blurb](#resume-blurb)
- [License & Disclaimer](#license--disclaimer)
- [Contact](#contact)

---

## Project Overview

This project serves two main use-cases:

1. Upload PDF documents and extract structured knowledge (summary, topics, insights, FAQs, and recommendations) using LLMs and PDF parsing.
2. Chat with anime characters backed by multi-turn memory and enforced personalities for a character-driven conversational experience.

The system is designed for real-world behavior: it accounts for LLM JSON formatting errors, enforces system prompts and character rules, and supports async pipelines from upload → extract → analyze.

---

## Features

### AI Knowledge Extractor
- Upload PDFs and extract raw text via `pdf-parse`.
- Analyze extracted text with a Groq LLM pipeline to produce:
  - Summary
  - Key insights
  - Topics / tags
  - FAQs (Q&A pairs)
  - Recommendations
- Robust output sanitization and JSON recovery when LLM returns malformed JSON.
- End-to-end pipeline: Upload → Extract → Analyze → Save.

### Character-Based AI Chat
- Converse with predefined anime characters (name, anime, personality, speaking style, rules).
- System-prompt-enforced personalities; characters never break character.
- Multi-turn conversational memory (session-based).
- Turn-based flow ensuring contextful replies, not one-shot responses.
- Character experience tuned for expressive, consistent interactions.

---

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, React Router
- Backend: Node.js, Express.js
- LLM: Groq LLM API
- PDF parsing: pdf-parse
- File upload: Multer
- Storage & DB: Supabase (Storage + Postgres)
- Hosting: (user choice — e.g., Vercel, Render, Fly.io, or self-host)

---

## Project Structure

root/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
│
├── server/              # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── .env
│
└── README.md

---

## Environment Variables

Create `.env` files for both client and server. Example values below:

Client (`client/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

Backend (`server/.env`):
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

Important: Keep Supabase service role and Groq API keys secret. Do NOT commit these to source control.

---

## Getting Started (Local Development)

1. Clone the repository:
```bash
git clone https://github.com/yuvrajsingh08/AI-Playground.git
cd AI-Playground
```

2. Start the backend:
```bash
cd server
npm install
node app.js
# or with nodemon
# npx nodemon app.js
```
The backend defaults to: http://localhost:5000

3. Start the frontend:
```bash
cd client
npm install
npm run dev
```
The frontend defaults to: http://localhost:5173

---

## API Endpoints

Knowledge Extractor
- POST /api/upload — Upload PDF file (multipart/form-data)
- POST /api/extract — Extract text from uploaded PDF
- POST /api/analyze — Run AI analysis on extracted text
- POST /api/document/save — Persist analyzed results to Supabase

Character Chat
- POST /api/chat — Send a user message to a specific character session

See server controllers for request/response shapes and validation.

---

## Example Requests

Example Character Chat payload:
```json
{
  "sessionId": "gojo-session-1",
  "character": {
    "name": "Gojo Satoru",
    "anime": "Jujutsu Kaisen",
    "personality": "Confident, playful, sarcastic",
    "speech_style": "Casual, teasing",
    "rules": "Never break character"
  },
  "message": "Train me to be stronger"
}
```

Example Analyze payload (simplified):
```json
{
  "documentId": "uploaded-file-id",
  "text": "Extracted raw text from the PDF...",
  "options": {
    "includeFAQs": true,
    "includeRecommendations": true
  }
}
```

---

## Design & Implementation Notes

- System prompt engineering is used to enforce character personality and behavior. The backend constructs strict LLM system instructions to avoid "breaking character".
- Conversation memory is session-based and stored in-memory by default for simplicity and speed. Memory is replayed to the LLM on each turn.
- LLM outputs are expected to be JSON; the backend contains sanitizers and recovery strategies for malformed JSON (string cleaning, bracket balancing, heuristic parsing).
- File uploads use Multer and Supabase Storage for persistence; Supabase Postgres stores metadata and analysis results.

---

## Known Limitations

- Character definitions are currently frontend-defined (not yet stored in DB).
- Conversation memory is in-memory and not persistent across server restarts.
- No authentication or user profiles yet.
- No streaming LLM responses (responses are returned once completed).
- Moderation / safety layers are minimal — add content filters for public use.

---

## Roadmap / Future Improvements

- Add Supabase Auth for user profiles and saved sessions.
- Persist chat history and character definitions in the database.
- Streaming AI responses for real-time character chat.
- Chat memory summarization (reduce context size with periodic summarization).
- UI: character creation panel, PDF preview, and analysis visualizations.
- Production deployment scripts (Docker, CI/CD), rate-limiting, and billing integration for paid models.

---

## Resume Blurb

Built a full-stack AI platform for document knowledge extraction and character-based conversational AI, featuring persistent personality enforcement, multi-turn memory, and robust LLM output handling using React, Node.js, Groq LLM, and Supabase.

---

## License & Disclaimer

This project is provided for educational and portfolio purposes. Anime characters used in the project are fan-made AI experiences and are not affiliated with any official studio. Use responsibly and respect copyright.

(Choose an appropriate open-source license for your work, e.g., MIT)

---

## Contact

Author: Yuvraj Singh  
GitHub: https://github.com/yuvrajsingh08

If you want help turning this into a deployed product (auth, persistence, streaming, or a production-ready infra), open an issue or start a discussion in the repo.
