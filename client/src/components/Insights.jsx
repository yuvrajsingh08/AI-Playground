import { Lightbulb} from "lucide-react";

export default function  Insights({ insights }) {
  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-slate-700" />
        <h2 className="text-lg font-semibold text-slate-900">Key Insights</h2>
      </div>
      <ul className="space-y-3">
        {insights.map((i, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 mt-2"></span>
            <span className="text-slate-700 leading-relaxed">{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}