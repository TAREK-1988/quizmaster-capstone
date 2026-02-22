import { useNavigate } from "react-router-dom";
import ReviewItem from "../../components/quiz/ReviewItem.jsx";
import Button from "../../components/ui/Button.jsx";
import { useQuiz } from "../../hooks/useQuiz.js";

export default function Review() {
  const navigate = useNavigate();
  const { state, actions } = useQuiz();

  const { questions, answers } = state;

  function backToResults() {
    navigate("/results");
  }

  function playAgain() {
    actions.reset();
    navigate("/", { replace: true });
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Review Answers</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={backToResults}>
            Back
          </Button>
          <Button onClick={playAgain}>Play Again</Button>
        </div>
      </div>

      <div className="grid gap-3">
        {questions.map((q, idx) => (
          <ReviewItem
            key={q.id}
            index={idx + 1}
            question={q.question}
            selected={answers[idx]}
            correct={q.correctAnswer}
          />
        ))}
      </div>
    </section>
  );
}
