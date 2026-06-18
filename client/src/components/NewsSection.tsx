import { ArrowRight, Pin, BookOpen, Database } from "lucide-react";

const dataNews = [
  {
    tag: "置顶",
    tagColor: "bg-blue-100 text-blue-700",
    title: "CnOpenData连续五年被Princeton Library收录！",
    date: "2025-03-07",
    icon: Pin,
  },
  {
    tag: "置顶",
    tagColor: "bg-blue-100 text-blue-700",
    title: "CnOpenData学者长期科研服务陪伴计划持续推进中！",
    date: "2024-04-25",
    icon: Pin,
  },
  {
    tag: "新库上线",
    tagColor: "bg-emerald-100 text-emerald-700",
    title: "CnOpenData中国分地市交通用地面积统计数据",
    date: "2026-03-13",
    icon: Database,
  },
  {
    tag: "数据升级",
    tagColor: "bg-violet-100 text-violet-700",
    title: "CnOpenData 1985-2024年中国量子信息专利及引用被引用数据",
    date: "2026-03-13",
    icon: Database,
  },
];

const journalNews = [
  {
    tag: "置顶",
    tagColor: "bg-blue-100 text-blue-700",
    title: "《Management Science》！CnOpenData数据助力新成果！",
    desc: "上海科技大学周彤合作论文在《Management Science》发表",
    date: "2024-10-19",
  },
  {
    tag: "置顶",
    tagColor: "bg-blue-100 text-blue-700",
    title: "2026《American Economic Journal: Microeconomics》！CnOpenData法拍房数据助力顶刊发文",
    desc: "CnOpenData法拍房数据助力顶刊发文",
    date: "2026-01-30",
  },
];

export default function NewsSection() {
  return (
    <section className="py-20" style={{ background: "oklch(0.98 0.01 250)" }}>
      <div className="container">
        <div className="mb-10">
          <p className="section-label mb-3">LATEST UPDATES</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">最新动态</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Data News */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Database className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-semibold text-gray-800">数据最新动态</h3>
            </div>
            <div className="space-y-3">
              {dataNews.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href="https://www.cnopendata.com"
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.tagColor}`}>
                          {item.tag}
                        </span>
                        <span className="text-xs text-gray-400 font-mono-data">{item.date}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Journal News */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-4 h-4 text-violet-600" />
              <h3 className="text-base font-semibold text-gray-800">期刊最新动态</h3>
            </div>
            <div className="space-y-3">
              {journalNews.map((item, i) => (
                <a
                  key={i}
                  href="https://www.cnopendata.com"
                  className="block p-4 rounded-xl bg-white border border-gray-100 hover:border-violet-200 hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-gray-400 font-mono-data">{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-violet-700 transition-colors mb-1 line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-1">{item.desc}</p>
                </a>
              ))}

              {/* Featured paper highlight */}
              <div className="p-4 rounded-xl border border-violet-100 bg-violet-50">
                <p className="text-xs font-semibold text-violet-700 uppercase tracking-wider mb-2">已发表顶刊论文</p>
                <div className="flex flex-wrap gap-2">
                  {["经济研究", "管理世界", "世界经济", "Management Science", "AEJ: Micro"].map((j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-white border border-violet-200 text-violet-700 font-medium">
                      {j}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-violet-600/70 mt-2">17+ 篇已发表论文，持续增加中</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
