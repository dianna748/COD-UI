import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Code2, Zap, Shield, Globe, Database, TrendingUp, Home, ChevronRight, Copy, Check, ExternalLink, Key } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalesContactModal from "@/components/SalesContactModal";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = [
  { id: "all", label: "全部 API", count: 6 },
  { id: "data", label: "数据服务", count: 6 },
  { id: "realtime", label: "实时行情", count: 2 },
  { id: "stock", label: "股票数据", count: 2 },
  { id: "realestate", label: "房产数据", count: 2 },
];

const apis = [
  {
    id: "xueqiu",
    category: ["data", "realtime"],
    featured: true,
    icon: "📈",
    name: "雪球实时数据 API",
    desc: "提供雪球平台上市公司讨论帖、交易动态、新闻公告的实时查询接口，支持按股票代码精准检索。",
    tags: ["RESTful", "JSON", "实时"],
    pricing: "free",
    pricingLabel: "免费",
    updated: "2026-03",
    endpoint: "GET /v1/xueqiu/posts",
    fields: ["股票代码", "发帖时间", "帖子内容", "互动数据", "情绪标签"],
    scenarios: ["投资者情绪分析", "事件驱动研究", "舆情监控"],
    url: "https://www.cnopendata.com/api-port/xueqiu_posts/create_time_start=1763654400000&create_time_end=1763740800000",
  },
  {
    id: "guba",
    category: ["data", "realtime"],
    featured: true,
    icon: "💬",
    name: "股吧实时数据 API",
    desc: "覆盖东方财富股吧全量讨论数据，支持实时行情关联与历史数据回溯，适合量化情绪因子研究。",
    tags: ["RESTful", "JSON", "实时"],
    pricing: "free",
    pricingLabel: "免费",
    updated: "2026-03",
    endpoint: "GET /v1/guba/posts",
    fields: ["股票代码", "发帖时间", "标题内容", "阅读量", "评论数"],
    scenarios: ["量化情绪因子", "散户行为研究", "信息传播分析"],
    url: "https://www.cnopendata.com/api-port/guba_posts/post_time_start=1740732671000&post_time_end=1761641832000",
  },
  {
    id: "ashare-basic",
    category: ["data", "stock"],
    featured: true,
    icon: "🏛️",
    name: "A股上市公司基本信息 API",
    desc: "覆盖沪深北三地交易所全量股票基础信息，含股票代码、名称、行业、地域、实控人等，支持多条件筛选。",
    tags: ["RESTful", "JSON", "查询"],
    pricing: "free",
    pricingLabel: "免费",
    updated: "2026-03",
    endpoint: "GET /v1/ashare/basic",
    fields: ["股票代码", "公司名称", "上市日期", "行业分类", "注册地", "实控人"],
    scenarios: ["股票池构建", "行业分布分析", "公司治理研究"],
    url: "https://www.cnopendata.com/api-port/ashare-basic-api/exchange_code=BSE",
  },
  {
    id: "ashare-detail",
    category: ["data", "stock"],
    featured: true,
    icon: "📊",
    name: "A股上市公司详细信息 API",
    desc: "提供 A 股上市公司深度数据查询，含财务指标、股权结构、高管信息等多维度数据，满足投研分析需求。",
    tags: ["RESTful", "JSON", "查询"],
    pricing: "contact",
    pricingLabel: "联系报价",
    updated: "2026-03",
    endpoint: "GET /v1/ashare/detail",
    fields: ["财务指标", "股权结构", "高管信息", "分红记录", "公告数据"],
    scenarios: ["基本面因子挖掘", "股权结构分析", "IPO研究"],
    url: "https://www.cnopendata.com/api-port/ssgsxxxx-posts/exchange_code=BSE&stock_code=920198.BJ",
  },
  {
    id: "house-turnover",
    category: ["data", "realestate"],
    featured: false,
    icon: "🏠",
    name: "中国二手房成交数据 API",
    desc: "覆盖全国主要城市二手房成交记录，含成交价格、面积、楼层、装修等字段，支持城市与时间维度筛选。",
    tags: ["RESTful", "JSON", "查询"],
    pricing: "contact",
    pricingLabel: "联系报价",
    updated: "2026-02",
    endpoint: "GET /v1/realestate/turnover",
    fields: ["城市", "成交价格", "建筑面积", "楼层", "装修情况", "成交日期"],
    scenarios: ["房价趋势研究", "城市化分析", "住房政策评估"],
    url: "https://www.cnopendata.com/api-port/resold_apartment_turnover_china/exchange_code=BSE&stock_code=920198.BJ",
  },
  {
    id: "house-listing",
    category: ["data", "realestate"],
    featured: false,
    icon: "🔑",
    name: "中国二手房挂牌数据 API",
    desc: "提供全国主要城市二手房在售挂牌数据，含挂牌价格、挂牌时长、房源特征等，适合供需关系研究。",
    tags: ["RESTful", "JSON", "查询"],
    pricing: "contact",
    pricingLabel: "联系报价",
    updated: "2026-02",
    endpoint: "GET /v1/realestate/listing",
    fields: ["城市", "挂牌价格", "挂牌时长", "房源特征", "小区信息"],
    scenarios: ["供需关系研究", "房价预测模型", "区域价格对比"],
    url: "https://www.cnopendata.com/api-port/resold_apartment_sell_china/exchange_code=BSE&stock_code=920198.BJ",
  },
];

const features = [
  { icon: Zap, title: "低延迟响应", desc: "毫秒级数据返回，支持高并发请求" },
  { icon: Shield, title: "稳定可靠", desc: "99.9% SLA 保障，企业级稳定性" },
  { icon: Code2, title: "多语言 SDK", desc: "Python / R / Stata 官方 SDK 支持" },
  { icon: Globe, title: "标准化格式", desc: "统一 JSON 输出，易于集成分析" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PricingBadge({ pricing, label }: { pricing: string; label: string }) {
  if (pricing === "free") {
    return (
      <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "#D1FAE5", color: "#065F46" }}>
        {label}
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: "#FEF3C7", color: "#92400E" }}>
      {label}
    </span>
  );
}

function ApiCard({ api, onSelect, selected, onContact }: { api: typeof apis[0]; onSelect: (id: string) => void; selected: boolean; onContact: () => void }) {
  const [, navigate] = useLocation();
  const slugMap: Record<string, string> = {
    "xueqiu": "xueqiu-posts",
    "guba": "guba-posts",
    "ashare-basic": "ashare-basic",
    "ashare-detail": "ashare-detail",
    "house-turnover": "house-turnover",
    "house-listing": "house-listing",
  };
  return (
    <div
      onClick={() => { onSelect(api.id); navigate(`/api-store/${slugMap[api.id]}`); }}
      className={`rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        selected ? "border-blue-400 shadow-md" : "border-gray-100 hover:border-blue-200"
      }`}
      style={{ background: selected ? "#F0F6FF" : "#FAFBFF" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{api.icon}</span>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm font-bold text-gray-900">{api.name}</h3>
              {api.featured && (
                <span className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: "#FEF3C7", color: "#92400E" }}>
                  特色
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {api.tags.map((t) => (
                <span key={t} className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <PricingBadge pricing={api.pricing} label={api.pricingLabel} />
      </div>

      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{api.desc}</p>

      <div className="flex items-center justify-between">
        <code className="text-xs font-mono px-2 py-1 rounded" style={{ background: "#EFF6FF", color: "#2E55A4" }}>
          {api.endpoint}
        </code>
        {api.pricing === "contact" ? (
          <button
            onClick={(e) => { e.stopPropagation(); onContact(); }}
            className="flex items-center gap-1 text-xs font-medium hover:underline"
            style={{ color: "#2E55A4" }}
          >
            联系报价
          </button>
        ) : (
          <a
            href={api.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs font-medium hover:underline"
            style={{ color: "#2E55A4" }}
          >
            查看文档 <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ApiStore() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedApi, setSelectedApi] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filteredApis = activeCategory === "all" 
    ? apis 
    : apis.filter(api => api.category.includes(activeCategory));

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Home className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">首页</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium">API 商店</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className={`mb-10 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">API 商店</h1>
          <p className="text-gray-500 text-base max-w-2xl">
            CnOpenData 提供标准 RESTful API，支持 Python、R、Stata 多语言 SDK。无需批量下载，即时查询，均可轻松集成到您的研究与分析工作流中。
          </p>
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl border border-blue-100 p-4 sticky top-20">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                API 分类
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                      activeCategory === cat.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeCategory === cat.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600 group-hover:bg-blue-200"
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* API Cards Grid */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="grid gap-4 mb-12">
              {filteredApis.map((api) => (
                <ApiCard 
                  key={api.id} 
                  api={api} 
                  onSelect={setSelectedApi}
                  selected={selectedApi === api.id}
                  onContact={() => setShowSalesModal(true)}
                />
              ))}
            </div>

            {/* Features Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">API 特性</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Icon className="w-6 h-6" style={{ color: "#2E55A4" }} />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-xs text-gray-500">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Need Custom API Section */}
            <div className="rounded-2xl border-2 border-dashed border-blue-200 p-8 bg-blue-50/50 text-center">
              <div className="mb-4">
                <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">需要定制 API？</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                如果您需要的数据不在现有 API 中，我们可以为您定制专属的数据接口。
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2550A0, #2E55A4)" }}
              >
                联系我们 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <SalesContactModal isOpen={showSalesModal} onClose={() => setShowSalesModal(false)} />
    </div>
  );
}
