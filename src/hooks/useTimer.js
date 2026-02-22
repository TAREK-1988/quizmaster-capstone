import { useEffect, useRef } from "react";

export function useTimer({ isRunning, remainingSeconds, onTick, onExpire }) {
  const expiredRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return;
    if (remainingSeconds <= 0) return;

    const id = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, remainingSeconds, onTick]);

  useEffect(() => {
    if (!isRunning) return;
    if (remainingSeconds > 0) return;
    if (expiredRef.current) return;
    expiredRef.current = true;
    onExpire();
  }, [isRunning, remainingSeconds, onExpire]);

  useEffect(() => {
    if (!isRunning) expiredRef.current = false;
  }, [isRunning]);
}
