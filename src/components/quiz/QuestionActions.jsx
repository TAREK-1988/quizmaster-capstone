export default function QuestionActions({ canBack, canNext, isLast, onBack, onNext }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={!canBack}
        className="h-10 rounded-lg border bg-white px-4 font-semibold text-slate-800 disabled:opacity-50"
      >
        Back
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className="h-10 rounded-lg bg-blue-600 px-5 font-semibold text-white disabled:opacity-50"
      >
        {isLast ? "Submit" : "Next"}
      </button>
    </div>
  );
}
