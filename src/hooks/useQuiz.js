import { useQuizContext } from "../app/providers/QuizProvider.jsx";

export function useQuiz() {
  return useQuizContext();
}
