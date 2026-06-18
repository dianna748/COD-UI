import { useEffect, useRef, useState } from "react";
import { computeCountValue, formatCountValue } from "@/lib/countUp";

const stats = [
  { value: 500, suffix: "+", label: "专题数据库", sub: "覆盖经济、金融、法律等多学科" },
  { value: 3.8, suffix: "亿+", label: "工商注册企业", sub: "全量工商数据，百余字段" },
  { value: 1.5, suffix: "亿+", label: "全球专利数据", sub: "含引用被引用关系" },
  { value: 3.6, suffix: "亿+", label: "招聘广告数据", sub: "线上招聘全量数据" },
  { value: 50, suffix: "+", label: "合作高校", sub: "国内外顶尖高校科研团队" },
  { value: 17, suffix: "+", label: "已发表论文", sub: "国内外顶刊学术成果" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const isDecimal = value % 1 !== 0;
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    // Respect reduced-motion preference: jump straight to the final value.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(value);
      return;
    }

    const duration = 1200;
    let rafId = 0;
    let startTs = 0;

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      setCount(computeCountValue(value, progress, isDecimal));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(value); // guarantee exact final value, no stray intermediate
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, value, isDecimal]);

  const display = formatCountValue(count, isDecimal);

  return (
    <span ref={ref}>
      <span className="tabular-nums">{display}</span>
      <span style={{ color: "#2E55A4" }}>{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white border-b border-gray-100" ref={ref}>
      <div className="container">
        <div className={`text-center mb-10 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="section-label">DATA AT A GLANCE</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`interactive-card bg-white p-6 text-center hover:bg-blue-50 group ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 leading-none transition-colors">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-0.5">{s.label}</p>
              <p className="text-xs text-gray-400 leading-snug">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className={`mt-8 flex justify-center transition-all duration-600 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="interactive-card inline-flex items-center gap-3 px-5 py-3 rounded-full border border-blue-100 bg-blue-50">
            <span className="text-base group-hover:scale-110 transition-transform">🏛</span>
            <p className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              <strong className="text-blue-700">连续五年</strong>被
              <strong className="text-gray-900">普林斯顿大学图书馆</strong>
              收录为"来自中国的数据"系列
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
