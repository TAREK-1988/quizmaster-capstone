import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home/Home.jsx";
import Quiz from "../../pages/Quiz/Quiz.jsx";
import Results from "../../pages/Results/Results.jsx";
import Review from "../../pages/Review/Review.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
      <Route path="/review" element={<Review />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
