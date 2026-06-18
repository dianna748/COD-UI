// Pure helpers for the StatsSection count-up animation.
// Extracted so the easing / quantization logic can be unit-tested in isolation.

/** ease-out cubic: fast start, smooth deceleration, lands exactly on 1 at t=1. */
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Compute the displayed value at a given animation progress.
 * - `progress` is clamped to [0, 1].
 * - Decimal targets are quantized to 1 decimal place; integer targets to whole numbers.
 * - At progress >= 1 the exact target value is returned (no stray intermediate).
 */
export const computeCountValue = (
  target: number,
  progress: number,
  isDecimal: boolean
): number => {
  const p = Math.min(Math.max(progress, 0), 1);
  if (p >= 1) return target;
  const raw = target * easeOutCubic(p);
  return isDecimal ? Math.round(raw * 10) / 10 : Math.round(raw);
};

/** Format the numeric value the same way the component renders it. */
export const formatCountValue = (value: number, isDecimal: boolean): string =>
  isDecimal ? value.toFixed(1) : Math.round(value).toString();
