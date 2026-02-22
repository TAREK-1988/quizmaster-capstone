export default function Loader({ title = "Loading..." }) {
  return (
    <section className="mx-auto max-w-xl">
      <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">Please wait a moment.</p>
      </div>
    </section>
  );
}
