import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          AI Playground
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-2xl">
          Powerful AI tools to extract knowledge and interact with your
          favourite characters.
        </p>
      </header>

      {/* Features */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-2">
        {/* Feature 1 */}
        <Link to="/ai-knowledge-extractor" className="block group">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center text-2xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110">
                AI
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">
                AI Knowledge Extractor
              </h2>
            </div>

            <p className="mt-6 text-slate-600 leading-relaxed">
              Upload a PDF and let AI extract insights, summaries, key points,
              and important information in seconds.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                Smart summaries & highlights
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                Question answering from PDF
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                Fast & accurate extraction
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-2 text-slate-900 font-medium group-hover:gap-3 transition-all duration-300">
              <span>Get Started</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>
        </Link>

        {/* Feature 2 */}
        <div className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 text-white flex items-center justify-center text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110">
              💬
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Chat with Anime Characters
            </h2>
          </div>

          <p className="mt-6 text-slate-600 leading-relaxed">
            Build conversations with your favourite anime characters,
            powered by AI personalities and realistic responses.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
              Choose anime characters
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
              Personality-based replies
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
              Immersive chat experience
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-2 text-slate-900 font-medium group-hover:gap-3 transition-all duration-300">
            <span>Coming Soon</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        <p>Built with AI • Modern • Scalable</p>
      </footer>
    </div>
  );
};

export default Home;