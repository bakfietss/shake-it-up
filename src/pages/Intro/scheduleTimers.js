export function scheduleTimers(entries) {
  const ids = entries.map(({ delay, fn }) => setTimeout(fn, delay));
  return () => ids.forEach(clearTimeout);
}
