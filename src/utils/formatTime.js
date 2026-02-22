export function formatTime(totalSeconds) {
  const s = Math.max(Number(totalSeconds) || 0, 0);
  const m = Math.floor(s / 60);
  const r = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(r).padStart(2, "0");
  return `${mm}:${ss}`;
}
