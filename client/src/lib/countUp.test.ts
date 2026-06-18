import { describe, expect, it } from "vitest";
import { computeCountValue, easeOutCubic, formatCountValue } from "./countUp";

describe("easeOutCubic", () => {
  it("starts at 0 and ends at 1", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it("is monotonically increasing", () => {
    let prev = -1;
    for (let i = 0; i <= 10; i++) {
      const v = easeOutCubic(i / 10);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});

describe("computeCountValue", () => {
  it("returns the exact target at progress >= 1 (no stray intermediate)", () => {
    expect(computeCountValue(3.8, 1, true)).toBe(3.8);
    expect(computeCountValue(500, 1, false)).toBe(500);
    expect(computeCountValue(1.5, 1.5, true)).toBe(1.5); // clamped
  });

  it("returns 0 at progress 0", () => {
    expect(computeCountValue(3.8, 0, true)).toBe(0);
    expect(computeCountValue(500, 0, false)).toBe(0);
  });

  it("never exceeds the target during the animation", () => {
    for (const target of [500, 3.8, 1.5, 3.6, 50, 17]) {
      const isDecimal = target % 1 !== 0;
      for (let i = 0; i <= 100; i++) {
        const v = computeCountValue(target, i / 100, isDecimal);
        expect(v).toBeLessThanOrEqual(target + 1e-9);
        expect(v).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("quantizes decimals to one decimal place and integers to whole numbers", () => {
    const dec = computeCountValue(3.8, 0.42, true);
    // one decimal place only
    expect(Number.isInteger(dec * 10)).toBe(true);

    const int = computeCountValue(500, 0.42, false);
    expect(Number.isInteger(int)).toBe(true);
  });

  it("progresses monotonically toward the target", () => {
    let prev = -1;
    for (let i = 0; i <= 100; i++) {
      const v = computeCountValue(500, i / 100, false);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });
});

describe("formatCountValue", () => {
  it("formats decimals with one decimal place", () => {
    expect(formatCountValue(3.8, true)).toBe("3.8");
    expect(formatCountValue(3, true)).toBe("3.0");
  });

  it("formats integers without decimals", () => {
    expect(formatCountValue(500, false)).toBe("500");
    expect(formatCountValue(49.6, false)).toBe("50");
  });
});
