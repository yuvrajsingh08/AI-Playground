import { FileText } from "lucide-react";

export default function Summary({ summary }) {
  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-slate-700" />
        <h2 className="text-lg font-semibold text-slate-900">Summary</h2>
      </div>
      <p className="text-slate-700 leading-relaxed">{summary}</p>
    </section>
  );
}
