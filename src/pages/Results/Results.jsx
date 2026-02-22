import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ResultsSummary from "../../components/quiz/ResultsSummary.jsx";
import Button from "../../components/ui/Button.jsx";
import { useQuiz } from "../../hooks/useQuiz.js";

function performanceLabel(percent) {
  if (percent >= 90) return "Excellent";
  if (percent >= 70) return "Good";
  if (percent >= 50) return "Fair";
  return "Needs Practice";
}

export default function Results() {
  const navigate = useNavigate();
  const { state, actions } = useQuiz();

  const total = state.questions.length;
  const score = state.score;
  const percent = useMemo(() => (total ? Math.round((score / total) * 100) : 0), [score, total]);
  const label = performanceLabel(percent);

  function playAgain() {
    actions.reset();
    navigate("/", { replace: true });
  }

  function reviewAnswers() {
    navigate("/review");
  }

  return (
    <section className="mx-auto max-w-xl">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <ResultsSummary score={score} total={total} percent={percent} label={label} />

        <div className="mt-6 grid gap-3">
          <Button onClick={reviewAnswers}>Review Answers</Button>
          <Button variant="secondary" onClick={playAgain}>
            Play Again
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          You can review each question and see the correct answer.
        </p>
      </div>
    </section>
  );
}
