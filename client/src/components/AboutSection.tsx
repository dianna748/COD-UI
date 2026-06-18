import { useEffect, useRef, useState } from "react";
import { Shield, BookOpen, Zap, Users } from "lucide-react";

// Design: 白色背景，左右两栏布局
// 左：品牌故事文字 + 发展历程时间线
// 右上：数据可视化插图，右下：四大价值卡片 + 我们的服务列表

const milestones = [
  { year: "2015", text: "CnOpenData 创立，开始为高校学者提供数据服务" },
  { year: "2019", text: "推出线上数据平台，数据库突破 100 个" },
  { year: "2021", text: "入选普林斯顿大学图书馆'来自中国的数据'系列" },
  { year: "2022", text: "与 Neudata 达成战略合作，进入国际另类数据市场" },
  { year: "2024", text: "数据库突破 500 个，服务高校超过 50 所" },
  { year: "2025", text: "连续五年被普林斯顿大学图书馆收录，持续扩展" },
];

const values = [
  {
    icon: Shield,
    title: "权威可靠",
    desc: "数据来源于国家知识产权局、工商总局、各大招聘平台等权威渠道，经严格清洗与验证。",
  },
  {
    icon: BookOpen,
    title: "学术友好",
    desc: "数据格式标准化，提供 Python / R / Stata 多种接口，支持批量下载，专为学术研究场景优化。",
  },
  {
    icon: Zap,
    title: "持续更新",
    desc: "核心数据持续更新，及时反映最新市场动态，确保研究数据的时效性与准确性。",
  },
  {
    icon: Users,
    title: "专业服务",
    desc: "专属客户经理，提供数据定制、技术支持、学术咨询等全方位服务，陪伴研究全程。",
  },
];

const services = [
  "线上平台数据及二次定制（数据提取、统计、文本分析）",
  "私有数据获取（已助力顶级期刊多篇论文发表）",
  "外部网站抓取定制服务",
  "热门技术服务（机器学习、LLM分析、地址定位等）",
];

function DataVizIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`h${i}`} x1="40" y1={30 + i * 44} x2="380" y2={30 + i * 44} stroke="#E2E8F0" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`v${i}`} x1={40 + i * 56} y1="10" x2={40 + i * 56} y2="210" stroke="#E2E8F0" strokeWidth="1" />
      ))}
      {[
        { x: 60, h: 80, color: "#2E55A4" },
        { x: 116, h: 120, color: "#2E55A4" },
        { x: 172, h: 60, color: "#93C5FD" },
        { x: 228, h: 150, color: "#2E55A4" },
        { x: 284, h: 100, color: "#93C5FD" },
        { x: 340, h: 130, color: "#2E55A4" },
      ].map((bar, i) => (
        <rect key={i} x={bar.x - 18} y={210 - bar.h} width="36" height={bar.h} rx="4" fill={bar.color} opacity="0.85" />
      ))}
      <polyline
        points="60,130 116,90 172,150 228,60 284,110 340,80"
        stroke="#D4A574"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
      {([[60,130],[116,90],[172,150],[228,60],[284,110],[340,80]] as [number,number][]).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#D4A574" stroke="white" strokeWidth="2" />
      ))}
      {["2019","2020","2021","2022","2023","2024"].map((yr, i) => (
        <text key={yr} x={60 + i * 56} y="228" textAnchor="middle" fontSize="10" fill="#94A3B8">{yr}</text>
      ))}
    </svg>
  );
}

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="container">
        {/* Section label */}
        <div className={`mb-10 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="section-label mb-3">BRAND VALUE</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">品牌价值</h2>
          <p className="text-gray-500 mt-2 text-sm">简约、清晰、有用——数据是散落的金子，我们愿做挖矿者。</p>
        </div>

        {/* Main two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left column: brand story + timeline */}
          <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">CnOpenData 的诞生</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                一次偶然的机会让我们和一些高校老师建立了联系，为他们提供数据搜集和整理服务。
                随着客户数量的增加，我们萌生了建立数据平台的想法。互联网产生了海量数据，
                然而由于数据量巨大、搜集难度极高、清理整合耗时等问题，学者在使用这些数据时面临诸多障碍，
                而这恰是我们这些 IT 人最为擅长的地方。
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">今天的 CnOpenData</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                CnOpenData 是覆盖经济、金融、会计、法律、地理、新闻、医疗等多学科的综合型数据平台，
                并持续提供个性化数据定制服务。我们不仅为国内多所高校和著名学者提供持续的
                数据服务，在海外也入选了普林斯顿图书馆"来自中国的数据"系列，并与 Neudata 达成
                战略合作伙伴关系。
              </p>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">发展历程</h3>
              <div className="relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />
                <div className="space-y-4">
                  {milestones.map((m, i) => (
                    <div
                      key={m.year}
                      className="flex gap-4 items-start"
                      style={{
                        animation: visible ? `fadeInUp 0.4s ease forwards` : "none",
                        animationDelay: `${200 + i * 80}ms`,
                        opacity: visible ? undefined : 0,
                      }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 border-white mt-0.5 shrink-0 z-10"
                        style={{ background: "#2E55A4", boxShadow: "0 0 0 2px #BFDBFE" }}
                      />
                      <div>
                        <span className="text-xs font-bold mr-2" style={{ color: "#2E55A4" }}>{m.year}</span>
                        <span className="text-sm text-gray-600">
                          {m.year === "2025" ? (
                            <>
                              连续五年被
                              <a
                                href="https://library.princeton.edu/collections/china-data-series"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                              >
                                普林斯顿大学图书馆
                              </a>
                              收录，持续扩展
                            </>
                          ) : (
                            m.text
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: value cards + services */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Four value cards */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow duration-200"
                    style={{ background: "#FAFBFF" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                      style={{ background: "#EFF6FF" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#2E55A4" }} />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{v.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Services list */}
            <div className="rounded-xl border border-gray-100 p-4" style={{ background: "#F8FAFC" }}>
              <h4 className="text-sm font-bold text-gray-900 mb-3">我们的服务</h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="mt-0.5 shrink-0" style={{ color: "#2E55A4" }}>✦</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
