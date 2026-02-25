import Layout from "./app/Layout/layout.jsx";
import AppRoutes from "./app/routes/AppRoutes.jsx";
import { QuizProvider } from "./app/providers/QuizProvider.jsx";

export default function App() {
  return (
    <QuizProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </QuizProvider>
  );
}
