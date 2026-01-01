import { useState } from "react";
import UploadBox from "../components/UploadBox";
import Summary from "../components/Summary";
import Insights from "../components/Insights";
import Topics from "../components/Topics";
import FAQs from "../components/FAQs";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            AI Knowledge Extractor
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Upload a PDF and let AI extract insights, summaries, and key information
          </p>
        </div>

        <div className="space-y-6">
          <UploadBox setResult={setResult} />

          {result && (
            <div className="space-y-6 animate-fade-in">
              <Summary summary={result.summary} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Insights insights={result.insights} />
                <Topics topics={result.topics} />
              </div>
              <FAQs faqs={result.faqs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}