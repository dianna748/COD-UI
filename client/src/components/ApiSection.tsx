import { useState, useRef, useEffect } from "react";
import { Code2, ArrowRight, Zap, Shield, Globe, ExternalLink, Key } from "lucide-react";

// Design: 深蓝背景区块，左侧介绍+CTA，右侧展示 API 卡片列表预览 + 代码示例
// 作为主页 API 商店入口，点击进入 /api-store 独立页面

const previewApis = [
  { 
    icon: "📈", 
    name: "雪球实时数据 API", 
    tags: ["实时", "RESTful"], 
    pricing: "联系报价", 
    color: "#FFFFFF", 
    textColor: "#1E3F8A", 
    slug: "xueqiu-posts",
    bgGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "#10B981"
  },
  { 
    icon: "💬", 
    name: "股吧实时数据 API", 
    tags: ["实时", "RESTful"], 
    pricing: "联系报价", 
    color: "#FFFFFF", 
    textColor: "#1E3F8A", 
    slug: "guba-posts",
    bgGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "#10B981"
  },
  { 
    icon: "🏛️", 
    name: "A股上市公司基本信息 API", 
    tags: ["查询", "JSON"], 
    pricing: "联系报价", 
    color: "#FFFFFF", 
    textColor: "#1E3F8A", 
    slug: "ashare-basic",
    bgGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "#3B82F6"
  },
  { 
    icon: "🏠", 
    name: "中国二手房成交数据 API", 
    tags: ["查询", "JSON"], 
    pricing: "联系报价", 
    color: "#FFFFFF", 
    textColor: "#1E3F8A", 
    slug: "house-turnover",
    bgGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    accentColor: "#FBBF24"
  },
];

const codeSnippet = `import requests

url = "https://api.cnopendata.com/v1/xueqiu/posts"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"stock_code": "600519", "start_date": "2024-01-01"}

resp = requests.get(url, headers=headers, params=params)
data = resp.json()
# 返回 {"total": 1248, "records": [...]}`;

const highlights = [
  { icon: Zap, label: "毫秒级响应", desc: "高并发支持" },
  { icon: Shield, label: "安全认证", desc: "API Key 鉴权" },
  { icon: Globe, label: "多语言 SDK", desc: "Python / R / Stata" },
  { icon: Code2, label: "完善文档", desc: "示例代码齐全" },
];

export default function ApiSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="api-store"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1E3F8A 0%, #2E55A4 25%, #3B5FB8 50%, #2E55A4 75%, #1E3F8A 100%)" }}
      ref={ref}
    >
      {/* Animated gradient blobs - Gold accent */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-25 blur-3xl animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(212, 165, 116, 0.5) 0%, transparent 70%)" }}
      />
      {/* Animated gradient blobs - Blue accent */}
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)", animationDelay: "1s" }}
      />
      {/* Additional accent blob - Cyan */}
      <div
        className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)", animationDelay: "2s" }}
      />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "drift 20s linear infinite"
        }}
      />

      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-1/4 w-1.5 h-40 bg-gradient-to-b from-yellow-400/50 via-yellow-400/20 to-transparent opacity-60 blur-sm" />
      <div className="absolute top-1/4 right-1/3 w-1.5 h-32 bg-gradient-to-b from-cyan-400/40 to-transparent opacity-50 blur-sm" />
      <div className="absolute bottom-0 right-1/4 w-1.5 h-48 bg-gradient-to-t from-blue-400/40 via-blue-400/10 to-transparent opacity-50 blur-sm" />

      {/* Floating particles effect */}
      <style>{`
        @keyframes drift {
          0% { transform: translateX(0px); }
          100% { transform: translateX(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: intro + highlights + CTA */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D4A574" }}>
              API STORE
            </p>
            <h2 className="font-bold text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.2 }}>
              开发者友好的<br />数据接口
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.72)", maxWidth: "420px" }}>
              CnOpenData 提供标准 RESTful API，支持 Python、R、Stata 多语言 SDK。
              无论批量下载还是实时查询，均可轻松集成到您的研究与分析工作流中。
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300" style={{ background: "rgba(212,165,116,0.15)" }}>
                      <Icon className="w-4 h-4 transition-transform duration-300" style={{ color: "#D4A574" }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{h.label}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.cnopendata.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-gray-900 transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #D4A574, #E8C9A0)" }}
              >
                <Key className="w-4 h-4" />
                获取免费 API Key
              </a>
              <a
                href="/api-store"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-white/25 transition-all duration-200 hover:bg-white/10 hover:border-white/40"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                <Code2 className="w-4 h-4" />
                浏览 API 商店
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: API preview cards + code snippet */}
          <div className={`transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* API Cards preview */}
            <div className="space-y-3 mb-5">
              {previewApis.map((api, i) => (
                <a
                  key={api.name}
                  href={`/api-store/${api.slug}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer no-underline group backdrop-blur-sm relative overflow-hidden"
                  style={{
                    background: api.bgGradient,
                    borderColor: api.borderColor,
                    boxShadow: hoveredIndex === i 
                      ? `0 20px 40px ${api.accentColor}30, 0 8px 16px ${api.accentColor}20, inset 0 1px 0 ${api.accentColor}40`
                      : `0 4px 12px ${api.accentColor}10, inset 0 1px 0 ${api.accentColor}20`,
                  }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-3xl transition-all duration-500 group-hover:scale-150 group-hover:rotate-12 drop-shadow-lg group-hover:drop-shadow-2xl">{api.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold transition-all duration-300 group-hover:tracking-wide" style={{ color: "#1E3F8A" }}>{api.name}</p>
                      <div className="flex gap-1.5 mt-1">
                        {api.tags.map((t) => (
                          <span 
                            key={t} 
                            className="text-xs px-2.5 py-1 rounded-full font-bold transition-all duration-300 group-hover:scale-110 backdrop-blur-md group-hover:shadow-md"
                            style={{ 
                              background: `${api.accentColor}40`,
                              color: api.accentColor,
                              border: `1.5px solid ${api.accentColor}60`,
                              boxShadow: hoveredIndex === i ? `0 4px 12px ${api.accentColor}25` : `0 2px 4px ${api.accentColor}10`
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span 
                    className="text-xs font-extrabold px-3 py-1.5 rounded-full transition-all duration-300 group-hover:scale-125 whitespace-nowrap ml-2 shadow-lg group-hover:shadow-2xl"
                    style={{ 
                      background: api.color, 
                      color: api.textColor,
                      boxShadow: hoveredIndex === i 
                        ? `0 8px 20px ${api.color}70, 0 4px 12px ${api.color}40`
                        : `0 2px 8px ${api.color}30, inset 0 1px 0 rgba(255,255,255,0.2)`
                    }}
                  >
                    {api.pricing}
                  </span>
                </a>
              ))}
              <a
                href="/api-store"
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-medium border border-dashed transition-all duration-300 hover:border-white/60 hover:bg-white/5 group"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.6)" }}
              >
                查看全部 6 个 API <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Code snippet */}
            <div className="rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-lg">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10" style={{ background: "rgba(0,0,0,0.25)" }}>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70 transition-all hover:bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70 transition-all hover:bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70 transition-all hover:bg-green-500" />
                </div>
                <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>PYTHON</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>示例代码</span>
              </div>
              <div className="p-4" style={{ background: "rgba(0,0,0,0.3)" }}>
                <pre className="text-xs font-mono leading-relaxed overflow-x-auto" style={{ color: "#93C5FD" }}>
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
