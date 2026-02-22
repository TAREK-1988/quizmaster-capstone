import { createContext, useContext, useMemo, useReducer } from "react";
import { fetchQuestions } from "../../services/api/opentdb.service.js";
import { shuffleArray } from "../../utils/shuffle.js";
import { decodeHtml } from "../../utils/decodeHtml.js";
import { storage } from "../../utils/storage.js";

const QuizContext = createContext(null);

const initialState = {
  settings: {
    category: "",
    difficulty: "easy",
    amount: 10,
  },
  status: "idle",
  error: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  score: 0,
  startedAt: null,
  finishedAt: null,
  timer: {
    totalSeconds: 0,
    remainingSeconds: 0,
    isRunning: false,
  },
};

function normalizeQuestions(raw) {
  return raw.map((q, idx) => {
    const incorrect = (q.incorrect_answers || []).map(decodeHtml);
    const correct = decodeHtml(q.correct_answer || "");
    const options = shuffleArray([...incorrect, correct]);
    return {
      id: `${idx}-${q.category}-${q.difficulty}`,
      category: decodeHtml(q.category || ""),
      difficulty: q.difficulty || "easy",
      question: decodeHtml(q.question || ""),
      correctAnswer: correct,
      options,
    };
  });
}

function calcScore(questions, answers) {
  let s = 0;
  for (let i = 0; i < questions.length; i += 1) {
    if (answers[i] && answers[i] === questions[i].correctAnswer) s += 1;
  }
  return s;
}

function performanceLabel(percent) {
  if (percent >= 90) return "Excellent";
  if (percent >= 70) return "Good";
  if (percent >= 50) return "Fair";
  return "Needs Practice";
}

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.payload,
      };

    case "START_LOADING":
      return {
        ...state,
        status: "loading",
        error: null,
        questions: [],
        currentIndex: 0,
        answers: [],
        score: 0,
        startedAt: Date.now(),
        finishedAt: null,
        timer: {
          totalSeconds: action.payload.totalSeconds,
          remainingSeconds: action.payload.totalSeconds,
          isRunning: true,
        },
      };

    case "START_SUCCESS":
      return {
        ...state,
        status: "active",
        error: null,
        questions: action.payload.questions,
        answers: new Array(action.payload.questions.length).fill(null),
      };

    case "START_EMPTY":
      return {
        ...state,
        status: "empty",
        error: null,
        questions: [],
        answers: [],
        timer: {
          totalSeconds: 0,
          remainingSeconds: 0,
          isRunning: false,
        },
      };

    case "START_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
        questions: [],
        answers: [],
        timer: {
          totalSeconds: 0,
          remainingSeconds: 0,
          isRunning: false,
        },
      };

    case "SELECT_ANSWER": {
      const { index, answer } = action.payload;
      const nextAnswers = [...state.answers];
      nextAnswers[index] = answer;
      return { ...state, answers: nextAnswers };
    }

    case "NEXT":
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
      };

    case "BACK":
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };

    case "TICK":
      return {
        ...state,
        timer: {
          ...state.timer,
          remainingSeconds: Math.max(state.timer.remainingSeconds - 1, 0),
        },
      };

    case "STOP_TIMER":
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          remainingSeconds: Math.max(state.timer.remainingSeconds, 0),
        },
      };

    case "SUBMIT": {
      const score = calcScore(state.questions, state.answers);
      const percent = state.questions.length
        ? Math.round((score / state.questions.length) * 100)
        : 0;

      const attempt = {
        id: `${Date.now()}`,
        createdAt: Date.now(),
        category: state.settings.category,
        difficulty: state.settings.difficulty,
        amount: state.settings.amount,
        score,
        percent,
        label: performanceLabel(percent),
      };

      const attempts = storage.get("quizmaster_attempts", []);
      storage.set("quizmaster_attempts", [attempt, ...attempts].slice(0, 20));

      const bestKey = `quizmaster_best_${state.settings.category}_${state.settings.difficulty}_${state.settings.amount}`;
      const prevBest = storage.get(bestKey, null);
      if (!prevBest || attempt.percent > prevBest.percent) storage.set(bestKey, attempt);

      return {
        ...state,
        status: "finished",
        score,
        finishedAt: Date.now(),
        timer: {
          ...state.timer,
          isRunning: false,
        },
      };
    }

    case "RESET":
      return {
        ...initialState,
        settings: state.settings,
      };

    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const actions = useMemo(() => {
    async function startQuiz(settings) {
      dispatch({ type: "SET_SETTINGS", payload: settings });

      const totalSeconds = Math.max(Number(settings.amount) || 10, 1) * 15;
      dispatch({ type: "START_LOADING", payload: { totalSeconds } });

      try {
        const data = await fetchQuestions(settings);
        if (!data || data.response_code !== 0 || !Array.isArray(data.results)) {
          dispatch({ type: "START_EMPTY" });
          return { ok: false, reason: "empty" };
        }

        const normalized = normalizeQuestions(data.results);
        if (!normalized.length) {
          dispatch({ type: "START_EMPTY" });
          return { ok: false, reason: "empty" };
        }

        dispatch({ type: "START_SUCCESS", payload: { questions: normalized } });
        return { ok: true };
      } catch (e) {
        dispatch({ type: "START_ERROR", payload: e?.message || "Failed to start quiz" });
        return { ok: false, reason: "error" };
      }
    }

    function selectAnswer(index, answer) {
      dispatch({ type: "SELECT_ANSWER", payload: { index, answer } });
    }

    function next() {
      dispatch({ type: "NEXT" });
    }

    function back() {
      dispatch({ type: "BACK" });
    }

    function tick() {
      dispatch({ type: "TICK" });
    }

    function stopTimer() {
      dispatch({ type: "STOP_TIMER" });
    }

    function submit() {
      dispatch({ type: "SUBMIT" });
    }

    function reset() {
      dispatch({ type: "RESET" });
    }

    return {
      startQuiz,
      selectAnswer,
      next,
      back,
      tick,
      stopTimer,
      submit,
      reset,
    };
  }, []);

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizContext() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuizContext must be used within QuizProvider");
  return ctx;
}
