interface StarRatingProps {
  score: number;
  max?: number;
}

export default function StarRating({ score, max = 5 }: StarRatingProps) {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;

  return (
    <div className="flex gap-1">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i} className="text-amber-400 text-lg">★</span>
      ))}
      {hasHalf && <span className="text-amber-400 text-lg">★</span>}
      {Array.from({ length: max - fullStars - (hasHalf ? 1 : 0) }).map((_, i) => (
        <span key={i} className="text-amber-400/30 text-lg">★</span>
      ))}
      <span className="ml-2 text-amber-200 text-sm">{score.toFixed(1)}</span>
    </div>
  );
}