export default function ResultsSummary({ score, total, percent, label }) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Your Results</h1>

      <div className="mt-6 flex items-center justify-center gap-5">
        <div className="text-4xl font-extrabold text-slate-900">
          {score} <span className="text-slate-400">/</span> {total}
        </div>
        <div className="text-4xl font-extrabold text-slate-900">{percent}%</div>
      </div>

      <div className="mt-4 inline-flex rounded-full bg-emerald-600 px-5 py-2 text-sm font-bold text-white">
        {label}
      </div>
    </div>
  );
}
