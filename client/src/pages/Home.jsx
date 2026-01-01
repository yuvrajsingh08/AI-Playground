import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          AI Playground
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl">
          Powerful AI tools to extract knowledge and interact with your
          favourite characters.
        </p>
      </header>

      {/* Features */}
      <main className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-2">
        {/* Feature 1 */}

    <Link to="/ai-knowledge-extractor">
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-xl transition-all">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-xl font-bold">
              AI
            </div>
            <h2 className="text-2xl font-semibold">
              AI Knowledge Extractor
            </h2>
          </div>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Upload a PDF and let AI extract insights, summaries, key points,
            and important information in seconds.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>• Smart summaries & highlights</li>
            <li>• Question answering from PDF</li>
            <li>• Fast & accurate extraction</li>
          </ul>
        </div>
        </Link>

        {/* Feature 2 */}
        <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-xl transition-all">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-xl font-bold">
              💬
            </div>
            <h2 className="text-2xl font-semibold">
              Chat with Anime Characters
            </h2>
          </div>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Build conversations with your favourite anime characters,
            powered by AI personalities and realistic responses.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>• Choose anime characters</li>
            <li>• Personality-based replies</li>
            <li>• Immersive chat experience</li>
          </ul>

          <button className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-900 dark:border-white px-5 py-2.5 text-sm font-medium hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition">
            Start Chat
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-sm text-slate-500">
        Built with AI • Modern • Scalable
      </footer>
    </div>
  );
};

export default Home;
