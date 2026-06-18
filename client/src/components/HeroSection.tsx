import { useState, useEffect } from "react";
import { ArrowRight, Database, Code2, Search } from "lucide-react";

const floatingStats = [
  { value: "3.8亿+", label: "工商企业", x: "left-4 top-20", delay: "0s" },
  { value: "4800万+", label: "专利记录", x: "right-6 top-32", delay: "0.3s" },
  { value: "50+", label: "合作高校", x: "left-8 bottom-24", delay: "0.6s" },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32"
      style={{
        background: "linear-gradient(135deg, #0A1628 0%, #0F2B5E 40%, #1E3F8A 70%, #2E55A4 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glowing orbs */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #D4A574 0%, transparent 70%)" }}
        />
        {/* Floating dots */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${10 + (i * 7.5) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              opacity: 0.2 + (i % 4) * 0.1,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/80">中国最专业的学术数据平台</span>
          </div>

          {/* Main headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            数据的顶端也是
            <br />
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(90deg, #D4A574, #E8C9A0, #F5E6D0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              学术的顶端
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            CnOpenData 汇聚经济、金融、法律、地理等多学科数据资源，
            为国内外顶尖高校学者提供高质量、结构化的中国数据服务。
          </p>

          {/* Search bar */}
          <div
            className={`relative max-w-xl mx-auto mb-10 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div
              className="flex items-center rounded-2xl overflow-hidden border"
              style={{
                background: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Search className="w-5 h-5 ml-4 text-white/50 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="搜索数据库、API、论文..."
                className="flex-1 bg-transparent px-3 py-3.5 text-white placeholder-white/40 outline-none text-sm"
              />
              <a
                href={searchValue ? `/databases?q=${encodeURIComponent(searchValue)}` : "/databases"}
                className="m-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #D4A574 0%, #E8C9A0 100%)" }}
              >
                搜索
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="/databases"
              className="interactive-button flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-base shadow-xl"
              style={{ background: "linear-gradient(135deg, #D4A574 0%, #E8C9A0 100%)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <Database className="w-5 h-5" />
              探索另类大数据
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/api-store"
              className="interactive-button flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                backdropFilter: "blur(8px)",
              }}
            >
              <Code2 className="w-5 h-5" />
              探索 API
            </a>
          </div>
        </div>

        {/* Bottom stats row */}
        <div
          className={`mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto transition-all duration-700 delay-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            {
              value: "500",
              plus: true,
              label: "专题数据库",
              desc: "覆盖经济、金融、法律等多学科",
            },
            {
              value: "3.8",
              plus: true,
              unit: "亿+",
              label: "工商注册企业",
              desc: "全量工商数据，百余字段",
            },
            {
              value: "1.5",
              plus: true,
              unit: "亿+",
              label: "全球专利数据",
              desc: "含引用被引用关系",
            },
            {
              value: "3.7",
              plus: true,
              unit: "亿+",
              label: "招聘广告数据",
              desc: "线上招聘全量数据",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <div className="text-4xl font-bold text-white">{item.value}</div>
                {item.plus && (
                  <div className="text-2xl font-bold" style={{ color: "#D4A574" }}>
                    {item.unit || "+"}
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold text-white mb-1.5">{item.label}</div>
              <div className="text-xs text-white/60">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
