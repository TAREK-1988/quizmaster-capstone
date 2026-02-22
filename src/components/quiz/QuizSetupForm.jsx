import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";
import Loader from "../ui/Loader.jsx";
import ErrorState from "../ui/ErrorState.jsx";
import { fetchCategories } from "../../services/api/opentdb.service.js";
import { useQuiz } from "../../hooks/useQuiz.js";

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export default function QuizSetupForm() {
  const navigate = useNavigate();
  const { state, actions } = useQuiz();

  const [categoriesStatus, setCategoriesStatus] = useState("loading");
  const [categoriesError, setCategoriesError] = useState("");
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState(state.settings.category);
  const [difficulty, setDifficulty] = useState(state.settings.difficulty);
  const [amount, setAmount] = useState(state.settings.amount);

  const categoryOptions = useMemo(() => {
    const base = [{ value: "", label: "Any Category" }];
    const items = categories.map((c) => ({ value: String(c.id), label: c.name }));
    return [...base, ...items];
  }, [categories]);

  async function loadCategories() {
    setCategoriesStatus("loading");
    setCategoriesError("");
    try {
      const data = await fetchCategories();
      const list = data?.trivia_categories || [];
      setCategories(list);
      setCategoriesStatus("ready");
    } catch (e) {
      setCategoriesError(e?.message || "Failed to load categories.");
      setCategoriesStatus("error");
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const canStart = amount && difficulty;

  async function onSubmit(e) {
    e.preventDefault();
    if (!canStart) return;

    const settings = {
      category: category || "",
      difficulty,
      amount: Number(amount),
    };

    const res = await actions.startQuiz(settings);
    if (res.ok) navigate("/quiz");
  }

  if (categoriesStatus === "loading") {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="text-sm font-medium text-slate-700">Loading categories...</div>
        <div className="mt-3">
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 w-1/3 animate-pulse rounded-full bg-blue-600" />
          </div>
        </div>
        <div className="mt-4 text-xs text-slate-500">You can still start with Any Category.</div>
      </div>
    );
  }

  if (categoriesStatus === "error") {
    return (
      <ErrorState
        title="Failed to load categories"
        message={categoriesError}
        actionLabel="Retry"
        onAction={loadCategories}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Category</span>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={categoryOptions}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium">Difficulty</span>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={difficultyOptions}
          />
        </label>

        <div className="grid gap-2">
          <span className="text-sm font-medium">Number of questions</span>
          <div className="flex gap-2">
            {[5, 10, 15].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setAmount(n)}
                className={`h-10 rounded-lg border px-4 font-semibold ${
                  amount === n ? "bg-blue-600 text-white" : "bg-white text-slate-800"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={!canStart}>
          Start Quiz
        </Button>

        {state.status === "loading" ? <Loader title="Preparing quiz..." /> : null}

        <div className="pt-1 text-center text-xs text-slate-500">
          Questions powered by OpenTDB
        </div>
      </div>
    </form>
  );
}
