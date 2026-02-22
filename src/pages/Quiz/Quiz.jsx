import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../../components/quiz/QuestionCard.jsx";
import QuestionActions from "../../components/quiz/QuestionActions.jsx";
import Timer from "../../components/ui/Timer.jsx";
import ProgressBar from "../../components/ui/ProgressBar.jsx";
import Loader from "../../components/ui/Loader.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { useQuiz } from "../../hooks/useQuiz.js";
import { useTimer } from "../../hooks/useTimer.js";

export default function Quiz() {
  const navigate = useNavigate();
  const { state, actions } = useQuiz();
  const { status, error, questions, currentIndex, answers, timer } = state;

  const current = useMemo(() => questions[currentIndex], [questions, currentIndex]);
  const selected = answers[currentIndex];

  useTimer({
    isRunning: timer.isRunning,
    remainingSeconds: timer.remainingSeconds,
    onTick: actions.tick,
    onExpire: () => {
      actions.stopTimer();
      actions.submit();
      navigate("/results", { replace: true });
    },
  });

  useEffect(() => {
    if (status === "idle") navigate("/", { replace: true });
  }, [status, navigate]);

  if (status === "loading") return <Loader title="Loading quiz..." />;
  if (status === "error")
    return (
      <ErrorState
        title="Something went wrong"
        message={error || "Failed to load quiz questions."}
        actionLabel="Back to Setup"
        onAction={() => {
          actions.reset();
          navigate("/", { replace: true });
        }}
      />
    );

  if (status === "empty")
    return (
      <EmptyState
        title="No questions available"
        message="Try changing the category, difficulty, or number of questions."
        actionLabel="Back to Setup"
        onAction={() => {
          actions.reset();
          navigate("/", { replace: true });
        }}
      />
    );

  if (!current) return null;

  const total = questions.length;
  const progress = total ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const canGoNext = Boolean(selected);

  function handleNext() {
    if (!canGoNext) return;
    if (currentIndex === total - 1) {
      actions.stopTimer();
      actions.submit();
      navigate("/results");
      return;
    }
    actions.next();
  }

  function handleBack() {
    actions.back();
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-slate-600">
            Question <span className="font-semibold">{currentIndex + 1}</span> of{" "}
            <span className="font-semibold">{total}</span>
          </div>
          <Timer seconds={timer.remainingSeconds} />
        </div>
        <div className="mt-3">
          <ProgressBar value={progress} />
        </div>
      </div>

      <QuestionCard
        category={current.category}
        difficulty={current.difficulty}
        question={current.question}
        options={current.options}
        selected={selected}
        onSelect={(answer) => actions.selectAnswer(currentIndex, answer)}
      />

      <div className="mt-4">
        <QuestionActions
          canBack={currentIndex > 0}
          canNext={canGoNext}
          isLast={currentIndex === total - 1}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </section>
  );
}
