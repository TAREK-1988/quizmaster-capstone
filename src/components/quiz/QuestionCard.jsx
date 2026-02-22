import AnswerOption from "./AnswerOption.jsx";

function badge(text) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      {text}
    </span>
  );
}

export default function QuestionCard({ category, difficulty, question, options, selected, onSelect }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {badge(category)}
        {badge(difficulty.charAt(0).toUpperCase() + difficulty.slice(1))}
      </div>

      <h2 className="mt-4 text-xl font-bold">{question}</h2>

      <div className="mt-4 grid gap-2">
        {options.map((opt) => (
          <AnswerOption
            key={opt}
            text={opt}
            selected={selected === opt}
            onClick={() => onSelect(opt)}
          />
        ))}
      </div>
    </div>
  );
}
