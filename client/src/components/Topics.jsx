import {Tag} from "lucide-react";
export default function Topics({ topics }) {
  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-slate-700" />
        <h2 className="text-lg font-semibold text-slate-900">Topics</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((t, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}