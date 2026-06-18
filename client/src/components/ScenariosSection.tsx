import { useEffect, useRef, useState } from "react";
import { GraduationCap, TrendingUp, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

const scenarios = [
  {
    id: "academic",
    slug: "academic",
    number: "01",
    icon: GraduationCap,
    title: "学术研究",
    subtitle: "Academic Research",
    desc: "为高校教授、博士研究生提供高质量实证研究数据，已助力《经济研究》《管理世界》《世界经济》及 Management Science 等顶刊发表论文。",
    highlights: [
      "顶刊验证数据，学术可信度高",
      "支持 Python / R / Stata 多种接口",
      "专为学术场景优化的数据格式",
      "连续五年被普林斯顿大学图书馆收录",
    ],
    tags: ["Management Science", "经济研究", "管理世界", "世界经济"],
    gradient: "from-blue-700 to-blue-900",
    accent: "#1E3F8A",
    lightBg: "#E8F2FF",
    lightText: "#1A3A7A",
    linkTo: "/papers",
  },
  {
    id: "investment",
    slug: "investment",
    number: "02",
    icon: TrendingUp,
    title: "投资决策",
    subtitle: "Investment Intelligence",
    desc: "基于工商注册、专利申请、招聘扩张等另类数据，构建多因子选股模型与行业轮动策略，覆盖 A 股、港股、美股全市场。",
    highlights: [
      "专利数据识别企业技术护城河与创新动能",
      "工商数据追踪股权穿透与关联交易风险",
      "招聘数据量化企业扩张节奏与人力资本强度",
      "贸易数据捕捉产业链供需变化与周期信号",
    ],
    tags: ["多因子模型", "另类数据", "行业轮动", "风险定价"],
    gradient: "from-indigo-700 to-indigo-900",
    accent: "#2E55A4",
    lightBg: "#E8F0FF",
    lightText: "#2550A0",
  },
  {
    id: "business",
    slug: "business",
    number: "03",
    icon: BarChart3,
    title: "商业分析",
    subtitle: "Business Analytics",
    desc: "基于全国 2.4 亿工商主体、千万级招投标记录及专利数据，支持竞争格局分析、产业链图谱构建与区域市场进入策略制定。",
    highlights: [
      "工商数据定位行业 CR4/HHI 集中度与市场结构演变",
      "招投标数据识别政府采购趋势与供应商竞争态势",
      "专利数据衡量技术壁垒高度与研发投入产出比",
      "招聘数据量化人才密度与组织扩张速率",
    ],
    tags: ["竞争格局", "产业链图谱", "区域市场", "战略尽调"],
    gradient: "from-violet-700 to-violet-900",
    accent: "#2E55A4",
    lightBg: "#E8F2FF",
    lightText: "#1E3F8A",
  },
];

export default function ScenariosSection() {
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
    <section id="scenarios" className="py-20" style={{ background: "oklch(0.985 0.008 250)" }} ref={ref}>
      <div className="container">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="section-label mb-3">USE CASES</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">应用场景</h2>
              <p className="text-gray-500 mt-2 max-w-xl text-sm">
                从学术研究到商业决策，CnOpenData 数据驱动多元场景下的洞察与创新。
              </p>
            </div>
          </div>
        </div>

        {/* Scenario Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {scenarios.map((scenario, i) => {
            const Icon = scenario.icon;
            return (
              <div
                key={scenario.id}
                className={`interactive-card group relative bg-white rounded-2xl border border-gray-100 overflow-hidden ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${scenario.gradient}`} />

                <div className="p-6">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: scenario.lightBg }}
                      >
                        <Icon className="w-5 h-5" style={{ color: scenario.accent }} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{scenario.title}</h3>
                      <p
                        className="text-xs font-semibold tracking-widest uppercase mt-0.5"
                        style={{ color: scenario.accent }}
                      >
                        {scenario.subtitle}
                      </p>
                    </div>
                    <span
                      className="font-mono text-5xl font-bold select-none leading-none"
                      style={{ color: `${scenario.accent}15` }}
                    >
                      {scenario.number}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{scenario.desc}</p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-5">
                    {scenario.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: scenario.accent }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {scenario.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs px-2.5 py-1 rounded-full font-medium border"
                        style={{
                          background: scenario.lightBg,
                          color: scenario.lightText,
                          borderColor: `${scenario.accent}20`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={(scenario as any).linkTo || `/use-cases/${scenario.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: scenario.accent }}
                  >
                    {(scenario as any).linkTo ? "查看相关论文" : "了解更多"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-12 p-8 rounded-2xl text-center border border-blue-100 transition-all duration-600 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ background: "oklch(0.96 0.03 250)" }}
        >
          <p className="text-gray-600 mb-2 font-medium">有特定的数据需求？</p>
          <p className="text-sm text-gray-500 mb-5">我们提供定制化数据采集、清洗、分析等全流程服务</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0F2B5E, #1E3F8A)" }}
          >
            联系销售获取定制方案
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
