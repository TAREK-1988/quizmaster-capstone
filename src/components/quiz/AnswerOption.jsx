export default function AnswerOption({ text, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left font-semibold transition ${
        selected ? "border-blue-600 bg-blue-600 text-white" : "bg-white text-slate-900 hover:bg-slate-50"
      }`}
    >
      <span>{text}</span>
      <span
        className={`ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full border ${
          selected ? "border-white" : "border-slate-300"
        }`}
      >
        {selected ? "✓" : ""}
      </span>
    </button>
  );
}
