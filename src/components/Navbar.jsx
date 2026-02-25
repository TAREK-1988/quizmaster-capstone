export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-slate-900" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">QuizMaster</span>
            <span className="text-xs text-slate-500">ALX FE Capstone</span>
          </div>
        </div>
        <span className="text-xs text-slate-500">OpenTDB</span>
      </div>
    </header>
  );
}
