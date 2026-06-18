import { useState, useRef, useEffect } from "react";
import { papers, categoryTabs, levelColors, dataTypeColors, sourceColors } from "@/data/papersData";

export default function PapersSection() {
  const [activeFilter, setActiveFilter] = useState("all");
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

  // Only show CnOpenData papers on homepage section
  const cnopendataPapers = papers.filter((p) => p.source === "cnopendata");
  const filtered = activeFilter === "all" ? cnopendataPapers : cnopendataPapers.filter((p) => p.category === activeFilter);

  // Only show categories that have CnOpenData papers
  const relevantTabs = categoryTabs.filter((tab) => 
    tab.id === "all" || cnopendataPapers.some((p) => p.category === tab.id)
  );

  const counts: Record<string, number> = {};
  relevantTabs.forEach((tab) => {
    counts[tab.id] = tab.id === "all" ? cnopendataPapers.length : cnopendataPapers.filter((p) => p.category === tab.id).length;
  });

  return (
    <section id="papers" className="py-20" style={{ background: "#F8FAFC" }} ref={ref}>
      <div className="container">
        {/* Header */}
        <div className={`mb-10 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="section-label mb-3">PUBLISHED RESEARCH</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">已发表研究成果</h2>
          <p className="text-gray-500 mt-2 max-w-2xl text-sm">
            以下为部分使用 CnOpenData 数据发表的学术论文，涵盖《经济研究》《管理世界》《世界经济》《审计研究》
            等国内顶刊及 Management Science 等国际期刊，充分验证数据的学术价值。
          </p>
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 transition-all duration-600 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {[
            { num: `${papers.length}+`, label: "收录论文" },
            { num: `${cnopendataPapers.length}`, label: "CnOpenData数据发表" },
            { num: `${categoryTabs.length - 1}`, label: "研究方向覆盖" },
            { num: "5类", label: "数据类型覆盖" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
              <div className="text-2xl font-bold mb-1" style={{ color: "#2E55A4" }}>{s.num}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-600 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {relevantTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                activeFilter === tab.id
                  ? "text-white border-transparent shadow-sm"
                  : "text-gray-600 border-gray-200 bg-white hover:border-blue-200 hover:text-blue-700"
              }`}
              style={activeFilter === tab.id ? { background: "linear-gradient(135deg, #2550A0, #2E55A4)" } : {}}
            >
              {tab.label}
              {counts[tab.id] > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {counts[tab.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Papers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((paper, i) => {
            const lc = levelColors[paper.level] || { bg: "#F3F4F6", text: "#374151" };
            const dc = dataTypeColors[paper.dataType] || { bg: "#F3F4F6", text: "#374151" };
            const sc = sourceColors[paper.source];
            return (
              <div
                key={paper.id}
                className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                style={{
                  animation: "fadeInUp 0.3s ease forwards",
                  animationDelay: `${i * 40}ms`,
                  opacity: 0,
                }}
              >
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-full font-medium border" style={{ background: sc.bg, color: sc.text, borderColor: sc.text + "30" }}>
                    {sc.label}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: lc.bg, color: lc.text }}>
                    {paper.level}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: dc.bg, color: dc.text }}>
                    {paper.dataType}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-3">
                  {paper.title}
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  {paper.authors}
                </p>
                <p className="text-xs text-gray-500">
                  {paper.journal} {paper.issue && `${paper.issue}`} · {paper.year}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          以上为部分已发表论文，更多研究成果持续更新中。CnOpenData 数据已助力国内外数十所高校学者发表学术论文。
        </p>

        {/* View All Link */}
        <div className="text-center mt-8">
          <a
            href="/papers"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #2550A0, #2E55A4)" }}
          >
            查看全部论文
          </a>
        </div>
      </div>
    </section>
  );
}
