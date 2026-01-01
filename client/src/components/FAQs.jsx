import {HelpCircle} from "lucide-react";
export default function FAQs({ faqs }) {
  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-slate-700" />
        <h2 className="text-lg font-semibold text-slate-900">FAQs</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((f, idx) => (
          <details
            key={idx}
            className="group border border-slate-200 rounded-lg overflow-hidden"
          >
            <summary className="font-medium cursor-pointer px-4 py-3 hover:bg-slate-50 transition-colors text-slate-800 list-none flex items-center justify-between">
              <span>{f.question}</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="px-4 py-3 text-slate-600 bg-slate-50 border-t border-slate-200">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}