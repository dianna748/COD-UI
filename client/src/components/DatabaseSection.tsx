import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ChevronRight,
  Building2,
  TrendingUp,
  Microscope,
  MessageSquare,
  MapPin,
  BarChart3,
  Users,
  Scale,
  Database,
} from "lucide-react";

// 分类定义 — 与参考网站保持一致
const CATEGORIES = [
  {
    slug: "enterprise",
    label: "企业数据",
    icon: Building2,
    count: 6,
    items: [
      { id: "enterprise-registration", name: "中国工商注册企业全信息", desc: "总数据量超3.5亿，百余个字段信息", badge: "旗舰" },
      { id: "enterprise-registration", name: "企业层面大型数据", desc: "工商注册、税调、工业企业等核心经济领域" },
      { id: "enterprise-registration", name: "中国工业企业数据", desc: "基本信息扩展、专利、海关、股东信息" },
      { id: "tax-survey", name: "中国税收调查企业数据", desc: "企业基本信息扩展、专利、海关数据" },
      { id: "enterprise-registration", name: "科技与创新数据", desc: "高新技术企业、小巨人和单项冠军企业" },
      { id: "enterprise-registration", name: "平台经济数据", desc: "电商、外卖、内外贸交易、农业批发", partners: [{ name: "人民数据", logo: "/manus-storage/people-data-logo_7789074c.png" }] },
    ],
    viewAllLabel: "查看企业数据全部数据库",
  },
  {
    slug: "financial",
    label: "金融市场",
    icon: TrendingUp,
    count: 9,
    items: [
      { id: "financial-market", name: "A股上市公司基本信息", desc: "沪深北三大交易所全部上市公司" },
      { id: "financial-market", name: "A股日行情数据", desc: "日度收盘价、成交量、换手率等" },
      { id: "financial-market", name: "债券市场数据", desc: "国债、企业债、城投债全市场数据" },
      { id: "financial-market", name: "基金持仓数据", desc: "公募基金季报持仓明细" },
      { id: "financial-market", name: "分析师预测数据", desc: "卖方分析师盈利预测与评级" },
      { id: "financial-market", name: "机构持股数据", desc: "机构投资者持股比例与变动" },
    ],
    viewAllLabel: "查看金融市场全部数据库",
  },
  {
    slug: "patent",
    label: "专利与创新",
    icon: Microscope,
    count: 4,
    items: [
      { id: "patent-innovation", name: "中国全部专利申请与授权数据", desc: "1985年至今全部专利记录，含四大类别" },
      { id: "patent-innovation", name: "专利引用关系数据", desc: "专利前向引用与后向引用关系" },
      { id: "patent-innovation", name: "高新技术企业数据", desc: "国家认定高新技术企业名单" },
      { id: "patent-innovation", name: "PCT国际专利数据", desc: "中国企业PCT国际专利申请" },
    ],
    viewAllLabel: "查看专利创新全部数据库",
  },
  {
    slug: "text",
    label: "文本与舆情",
    icon: MessageSquare,
    count: 4,
    items: [
      { id: "academic-literature", name: "雪球股票论坛数据", desc: "雪球平台股票讨论帖文本数据" },
      { id: "academic-literature", name: "股吧舆情数据", desc: "东方财富股吧全量帖子数据" },
      { id: "academic-literature", name: "新闻媒体文本数据", desc: "主流财经媒体新闻全文数据" },
      { id: "academic-literature", name: "企业年报文本数据", desc: "A股上市公司年报MD&A文本" },
    ],
    viewAllLabel: "查看文本舆情全部数据库",
  },
  {
    slug: "geographic",
    label: "地理与空间",
    icon: MapPin,
    count: 6,
    items: [
      { id: "geographic-data", name: "中国地理与区域经济数据", desc: "省市县三级行政区划经济数据" },
      { id: "geographic-data", name: "夜间灯光卫星数据", desc: "DMSP/OLS与NPP/VIIRS夜间灯光" },
      { id: "geographic-data", name: "城市POI数据", desc: "全国主要城市兴趣点数据" },
      { id: "geographic-data", name: "土地出让数据", desc: "全国城市土地出让交易记录" },
      { id: "geographic-data", name: "空气质量数据", desc: "全国城市AQI及PM2.5历史数据" },
      { id: "geographic-data", name: "人口普查数据", desc: "历次人口普查分区域统计数据" },
    ],
    viewAllLabel: "查看地理空间全部数据库",
  },
  {
    slug: "macro",
    label: "宏观与政府",
    icon: BarChart3,
    count: 6,
    items: [
      { id: "financial-market", name: "中国宏观经济指标", desc: "GDP、CPI、PPI等核心宏观数据" },
      { id: "financial-market", name: "地方政府财政数据", desc: "省市县三级政府财政收支" },
      { id: "financial-market", name: "政府补贴数据", desc: "上市公司政府补贴明细" },
      { id: "financial-market", name: "环境规制数据", desc: "环保处罚、排污许可证数据" },
      { id: "financial-market", name: "政策文本数据", desc: "中央及地方政府政策文件" },
      { id: "financial-market", name: "统计年鉴数据", desc: "历年中国统计年鉴结构化数据" },
    ],
    viewAllLabel: "查看宏观政府全部数据库",
  },
  {
    slug: "labor",
    label: "劳动与调查",
    icon: Users,
    count: 4,
    items: [
      { id: "enterprise-registration", name: "招聘广告数据", desc: "线上招聘平台全量招聘广告" },
      { id: "enterprise-registration", name: "工资收入数据", desc: "城镇职工工资与收入调查" },
      { id: "enterprise-registration", name: "家庭调查数据", desc: "CFPS、CHFS等家庭追踪调查" },
      { id: "enterprise-registration", name: "就业流动数据", desc: "劳动力流动与迁移数据" },
    ],
    viewAllLabel: "查看劳动调查全部数据库",
  },
  {
    slug: "legal",
    label: "法律与司法",
    icon: Scale,
    count: 4,
    items: [
      { id: "enterprise-registration", name: "裁判文书数据", desc: "中国裁判文书网全量判决书" },
      { id: "enterprise-registration", name: "企业违规处罚数据", desc: "证监会、银保监会处罚记录" },
      { id: "enterprise-registration", name: "知识产权诉讼数据", desc: "专利、商标侵权诉讼案件" },
      { id: "enterprise-registration", name: "破产重整数据", desc: "企业破产申请与重整记录" },
    ],
    viewAllLabel: "查看法律司法全部数据库",
  },
];

export default function DatabaseSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setAnimKey(k => k + 1);
  };

  const current = CATEGORIES[activeCategory];

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container">
        {/* Section header */}
        <div className={`mb-10 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="section-label mb-3">DATA CATALOG</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">500+ 专题数据库</h2>
              <p className="text-gray-500 mt-2 max-w-xl text-sm">
                覆盖经济、金融、法律、地理等多学科，持续更新扩充，为您的研究提供坚实的数据基础。
              </p>
            </div>
            <Link href="/databases">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors group whitespace-nowrap cursor-pointer">
                查看全部数据
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>

        {/* Main layout: sidebar + cards */}
        <div className={`flex flex-col lg:flex-row gap-6 transition-all duration-600 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Left sidebar — category list */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isActive = idx === activeCategory;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(idx)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 lg:w-full text-left ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white/90" : "text-gray-400"}`} />
                    <span className="flex-1">{cat.label}</span>
                    <span className={`text-xs font-mono ${isActive ? "text-white/70" : "text-gray-300"}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — database cards */}
          <div className="flex-1 min-w-0">
            <div key={animKey} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {current.items.map((item, i) => (
                <Link key={`${item.id}-${i}`} href={`/database/${item.id}`}>
                  <div
                    className="interactive-card card-hover-glow group flex flex-col p-4 rounded-xl border border-blue-100 bg-white cursor-pointer stagger-item"
                    style={{
                      animation: `fadeInUp 0.3s ease ${i * 40}ms both`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Database className="w-3.5 h-3.5 text-blue-700" />
                      </div>
                      {item.badge && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 bg-blue-100 text-blue-700">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1.5 group-hover:text-blue-700 transition-colors line-clamp-2 flex-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{item.desc}</p>

                    {/* 合作数据提供方 logo */}
                    {item.partners && item.partners.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 mb-1.5">
                          <span className="inline-block w-1 h-1 rounded-full bg-blue-400" />
                          <span className="text-[10px] font-medium tracking-wide text-gray-400 uppercase">数据合作方</span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          {item.partners.map((p) => (
                            <div
                              key={p.name}
                              className="inline-flex items-center rounded-lg bg-gray-50/80 px-2.5 py-1.5 ring-1 ring-gray-100 group-hover:bg-white group-hover:ring-blue-100 group-hover:shadow-sm transition-all duration-300"
                            >
                              <img
                                src={p.logo}
                                alt={p.name}
                                title={p.name}
                                className="h-7 w-auto object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1 mt-3 text-xs font-medium text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      查看详情
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View all link for current category */}
            <div className="mt-4">
              <Link href={`/databases/${current.slug}`}>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all cursor-pointer">
                  {current.viewAllLabel}
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
