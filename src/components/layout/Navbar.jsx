import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-blue-600">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-600" />
          QuizMaster
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Powered by OpenTDB</span>
          {!isHome && (
            <Link to="/" className="rounded-lg border px-3 py-1.5 text-sm text-slate-700">
              Setup
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
