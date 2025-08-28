export default function RatingStars({ value = 0 }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex gap-1 text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true">{i < v ? "★" : "☆"}</span>
      ))}
      <span className="ml-2 text-sm text-slate-500">{value?.toFixed?.(1) ?? "0.0"}</span>
    </div>
  );
}