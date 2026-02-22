import QuizSetupForm from "../../components/quiz/QuizSetupForm.jsx";

export default function Home() {
  return (
    <section className="mx-auto max-w-xl">
      <h1 className="mb-2 text-center text-3xl font-bold">Create your quiz</h1>
      <p className="mb-6 text-center text-slate-500">
        Choose settings and start your quiz in seconds.
      </p>
      <QuizSetupForm />
    </section>
  );
}
