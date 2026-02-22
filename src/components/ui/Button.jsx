export default function Button({ children, onClick, type = "button", disabled = false, variant = "primary" }) {
  const base = "h-11 w-full rounded-lg px-4 font-semibold transition";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-600/60",
    secondary: "border bg-white text-slate-800 hover:bg-slate-50 disabled:opacity-60",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
}
