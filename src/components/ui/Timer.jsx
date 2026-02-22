import { formatTime } from "../../utils/formatTime.js";

export default function Timer({ seconds }) {
  return (
    <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800">
      {formatTime(seconds)}
    </div>
  );
}
