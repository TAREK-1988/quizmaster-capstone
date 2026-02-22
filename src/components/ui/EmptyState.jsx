import Button from "./Button.jsx";

export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <section className="mx-auto max-w-xl">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-5">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      </div>
    </section>
  );
}
