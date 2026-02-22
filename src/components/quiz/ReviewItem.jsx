export default function ReviewItem({ index, question, selected, correct }) {
  const isCorrect = selected && selected === correct;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-slate-500">Question {index}</div>
      <div className="text-lg font-bold">{question}</div>

      <div className="mt-4 grid gap-2 text-sm">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-slate-600">Your Answer</span>
          <span className={`rounded-lg border px-3 py-2 ${isCorrect ? "border-emerald-600 bg-emerald-50" : "border-rose-600 bg-rose-50"}`}>
            {selected || "No answer"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-slate-600">Correct Answer</span>
          <span className="rounded-lg border border-emerald-600 bg-emerald-50 px-3 py-2">{correct}</span>
        </div>
      </div>
    </div>
  );
}
