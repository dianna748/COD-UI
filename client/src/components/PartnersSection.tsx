import { useEffect, useRef, useState } from "react";
import { Award, Globe, Database, ChevronRight } from "lucide-react";

const chinaUniversities = [
  "北京大学", "清华大学", "中国人民大学", "复旦大学", "上海财经大学",
  "浙江大学", "上海交通大学", "同济大学", "香港中文大学", "香港大学",
  "武汉大学", "中央财经大学", "厦门大学", "中南财经政法大学", "西南财经大学",
  "对外经贸大学", "中山大学", "天津大学", "东南大学", "南开大学",
  "哈尔滨工业大学", "东北财经大学", "首都经济贸易大学", "广东财经大学",
  "湖南大学", "重庆大学", "四川大学", "中国科学院大学", "南京财经大学",
];

const globalUniversities = [
  "Princeton University", "Harvard University", "Stanford University",
  "MIT", "Columbia University", "University of Chicago",
  "London School of Economics", "National University of Singapore",
  "University of Hong Kong", "HKUST",
];

const dataSources = [
  { name: "人民数据", type: "综合数据", icon: "🏛️", logo: "/manus-storage/people-data-logo_d1fa09fa.png" },
  { name: "中国人民银行", type: "金融", icon: "🏦" },
  { name: "证监会", type: "监管", icon: "⚖️" },
  { name: "国家知识产权局", type: "专利", icon: "📜" },
  { name: "工商总局", type: "工商", icon: "📋" },
  { name: "上海证券交易所", type: "金融", icon: "📈" },
  { name: "深圳证券交易所", type: "金融", icon: "📊" },
  { name: "国家统计局", type: "统计", icon: "📉" },
  { name: "财政部", type: "财政", icon: "💰" },
  { name: "Neudata", type: "国际合作", icon: "🌐" },
  { name: "Datayes", type: "金融数据", icon: "📡" },
];

export default function PartnersSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredUniversity, setHoveredUniversity] = useState<string | null>(null);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);
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
    <section id="partners" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/15 to-transparent rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className={`mb-12 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5" style={{ color: "#2E55A4" }} />
            <p className="section-label mb-0">TRUSTED BY RESEARCHERS</p>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">合作高校与机构</h2>
          <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
            CnOpenData 已与国内外 50+ 所顶尖高校建立合作关系，
            为众多学者的实证研究提供数据支撑。我们致力于成为全球学术界的数据基础设施。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Domestic Universities */}
          <div
            className={`group relative rounded-2xl border border-gray-200 p-8 shadow-sm transition-all duration-700 hover:shadow-xl hover:border-blue-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.2) 100%)",
              backdropFilter: "blur(10px)"
            }}
          >
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(46, 85, 164, 0.05) 0%, rgba(96, 165, 250, 0.02) 100%)"
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-white text-lg">
                  🇨🇳
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">国内合作高校</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Leading Universities in China</p>
                </div>
                <span className="ml-auto text-xs font-bold text-white bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-1.5 rounded-full shadow-md">
                  30+
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-4">
                {chinaUniversities.map((uni, idx) => (
                  <div
                    key={uni}
                    className="relative group/tag"
                    onMouseEnter={() => setHoveredUniversity(uni)}
                    onMouseLeave={() => setHoveredUniversity(null)}
                  >
                    <span
                      className="px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 inline-block cursor-pointer"
                      style={{
                        background: hoveredUniversity === uni 
                          ? "linear-gradient(135deg, #2E55A4 0%, #3B82F6 100%)"
                          : "linear-gradient(135deg, #F8FCFF 0%, #EFF6FF 100%)",
                        color: hoveredUniversity === uni ? "white" : "#3B82F6",
                        border: hoveredUniversity === uni 
                          ? "1px solid rgba(46, 85, 164, 0.3)"
                          : "1px solid rgba(46, 85, 164, 0.15)",
                        transform: hoveredUniversity === uni ? "translateY(-2px)" : "translateY(0)",
                        boxShadow: hoveredUniversity === uni 
                          ? "0 8px 16px rgba(46, 85, 164, 0.2)"
                          : "0 2px 4px rgba(46, 85, 164, 0.05)"
                      }}
                    >
                      {uni}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" />
                  向下滑动查看更多合作机构
                </p>
              </div>
            </div>
          </div>

          {/* International Universities */}
          <div
            className={`group relative rounded-2xl border border-gray-200 p-8 shadow-sm transition-all duration-700 delay-100 hover:shadow-xl hover:border-purple-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,240,255,0.2) 100%)",
              backdropFilter: "blur(10px)"
            }}
          >
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(168, 85, 247, 0.02) 100%)"
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-300 to-purple-500 flex items-center justify-center text-white text-lg">
                  🌍
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">国际合作机构</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Global Research Partners</p>
                </div>
                <span className="ml-auto text-xs font-bold text-white bg-gradient-to-r from-purple-400 to-purple-500 px-3 py-1.5 rounded-full shadow-md">
                  20+
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-5">
                {globalUniversities.map((uni) => (
                  <div
                    key={uni}
                    className="relative group/tag"
                    onMouseEnter={() => setHoveredUniversity(uni)}
                    onMouseLeave={() => setHoveredUniversity(null)}
                  >
                    <span
                      className="px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 inline-block cursor-pointer"
                      style={{
                        background: hoveredUniversity === uni 
                          ? "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)"
                          : "linear-gradient(135deg, #FBF7FF 0%, #F5EDFF 100%)",
                        color: hoveredUniversity === uni ? "white" : "#A855F7",
                        border: hoveredUniversity === uni 
                          ? "1px solid rgba(139, 92, 246, 0.3)"
                          : "1px solid rgba(139, 92, 246, 0.15)",
                        transform: hoveredUniversity === uni ? "translateY(-2px)" : "translateY(0)",
                        boxShadow: hoveredUniversity === uni 
                          ? "0 8px 16px rgba(139, 92, 246, 0.2)"
                          : "0 2px 4px rgba(139, 92, 246, 0.05)"
                      }}
                    >
                      {uni}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/50 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <p className="text-sm font-bold text-amber-900">普林斯顿大学图书馆认证</p>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                      连续五年被收录为"来自中国的数据"系列，是国际学界认可的中国数据权威来源。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div
          className={`group relative rounded-2xl border border-gray-200 p-8 shadow-sm transition-all duration-700 delay-200 hover:shadow-xl hover:border-emerald-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,250,0.2) 100%)",
            backdropFilter: "blur(10px)"
          }}
        >
          {/* Gradient border effect on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%)"
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-300 to-emerald-500 flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">权威数据来源</h3>
                <p className="text-xs text-gray-500 mt-0.5">Official Data Partners</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {dataSources.map((src) => (
                <div
                  key={src.name}
                  className="relative group/source"
                  onMouseEnter={() => setHoveredSource(src.name)}
                  onMouseLeave={() => setHoveredSource(null)}
                >
                  <div
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 cursor-pointer text-center"
                    style={{
                      background: hoveredSource === src.name
                        ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                        : "linear-gradient(135deg, #F7FEFC 0%, #F0FDF4 100%)",
                      borderColor: hoveredSource === src.name
                        ? "rgba(16, 185, 129, 0.3)"
                        : "rgba(16, 185, 129, 0.1)",
                      transform: hoveredSource === src.name ? "translateY(-4px) scale(1.05)" : "translateY(0) scale(1)",
                      boxShadow: hoveredSource === src.name
                        ? "0 12px 24px rgba(16, 185, 129, 0.25)"
                        : "0 2px 8px rgba(16, 185, 129, 0.08)"
                    }}
                  >
                    {(src as any).logo ? (
                      <img
                        src={(src as any).logo}
                        alt={src.name}
                        className="transition-transform duration-300"
                        style={{
                          width: 56,
                          height: 32,
                          objectFit: "contain",
                          transform: hoveredSource === src.name ? "scale(1.15)" : "scale(1)",
                          filter: hoveredSource === src.name ? "brightness(0) invert(1)" : "none"
                        }}
                      />
                    ) : (
                      <span className="text-2xl transition-transform duration-300" style={{
                        transform: hoveredSource === src.name ? "scale(1.3)" : "scale(1)"
                      }}>
                        {src.icon}
                      </span>
                    )}
                    <div>
                      <p className="text-xs font-bold transition-colors duration-300" style={{
                       color: hoveredSource === src.name ? "white" : "#10B981",
                      }}>
                        {src.name}
                      </p>
                      <p className="text-xs transition-colors duration-300 mt-1" style={{
                        color: hoveredSource === src.name ? "rgba(255,255,255,0.85)" : "#059669"
                      }}>
                        {src.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                ✨ 所有数据来源均为官方权威机构，确保数据质量和合规性
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
