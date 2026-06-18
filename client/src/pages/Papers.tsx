import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { papers, categoryTabs, sourceTabs, levelColors, dataTypeColors, sourceColors } from "@/data/papersData";

export default function Papers() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSource, setActiveSource] = useState("all");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = papers.filter((p) => {
    const categoryMatch = activeCategory === "all" || p.category === activeCategory;
    const sourceMatch = activeSource === "all" || p.source === activeSource;
    return categoryMatch && sourceMatch;
  });

  const categoryCounts: Record<string, number> = {};
  categoryTabs.forEach((tab) => {
    const sourceFiltered = activeSource === "all" ? papers : papers.filter((p) => p.source === activeSource);
    categoryCounts[tab.id] = tab.id === "all" ? sourceFiltered.length : sourceFiltered.filter((p) => p.category === tab.id).length;
  });

  const cnopendataCount = papers.filter((p) => p.source === "cnopendata").length;
  const relatedCount = papers.filter((p) => p.source === "related").length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container">
            <div className="mb-8">
              <a href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block">
                ← 返回首页
              </a>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">学术研究成果</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              以下论文涵盖使用 CnOpenData 数据发表的学术成果，以及使用了 CnOpenData 平台所拥有数据的相关研究论文。
              研究领域覆盖创业与市场进入、企业创新、数字经济、环境治理、劳动力市场、公司治理、土地经济等方向。
            </p>
          </div>
        </section>

        {/* Stats Row */}
        <section className="py-10 border-b border-gray-100">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { num: `${papers.length}`, label: "收录论文总数" },
                { num: `${cnopendataCount}`, label: "CnOpenData数据发表" },
                { num: `${relatedCount}`, label: "相关研究论文" },
                { num: `${categoryTabs.length - 1}`, label: "研究方向覆盖" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center shadow-sm">
                  <div className="text-2xl font-bold mb-1" style={{ color: "#2E55A4" }}>{s.num}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter and Papers */}
        <section className="py-10" ref={ref}>
          <div className="container">
            {/* Source Filter */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500 font-medium mr-1">来源筛选：</span>
              {sourceTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSource(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    activeSource === tab.id
                      ? "text-white border-transparent shadow-sm"
                      : "text-gray-600 border-gray-200 bg-white hover:border-blue-200 hover:text-blue-700"
                  }`}
                  style={activeSource === tab.id ? { background: "linear-gradient(135deg, #2550A0, #2E55A4)" } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    activeCategory === tab.id
                      ? "text-white border-transparent shadow-sm"
                      : "text-gray-600 border-gray-200 bg-white hover:border-blue-200 hover:text-blue-700"
                  }`}
                  style={activeCategory === tab.id ? { background: "linear-gradient(135deg, #1E3F8A, #2E55A4)" } : {}}
                >
                  {tab.label}
                  {categoryCounts[tab.id] > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {categoryCounts[tab.id]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Papers Grid */}
            <div className={`grid gap-4 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {filtered.map((paper) => {
                const levelColor = levelColors[paper.level] || { bg: "#F3F4F6", text: "#6B7280" };
                const dataTypeColor = dataTypeColors[paper.dataType] || { bg: "#F3F4F6", text: "#6B7280" };
                const sourceColor = sourceColors[paper.source] || { bg: "#F3F4F6", text: "#6B7280", label: "" };
                return (
                  <div
                    key={paper.id}
                    className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {/* 来源标签 */}
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-medium border"
                            style={{ background: sourceColor.bg, color: sourceColor.text, borderColor: sourceColor.text + "30" }}
                          >
                            {sourceColor.label}
                          </span>
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ background: levelColor.bg, color: levelColor.text }}
                          >
                            {paper.level}
                          </span>
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ background: dataTypeColor.bg, color: dataTypeColor.text }}
                          >
                            {paper.dataType}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {paper.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {paper.authors} · {paper.journal} {paper.issue && `${paper.issue}`} · {paper.year}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {paper.tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">暂无符合筛选条件的论文</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
