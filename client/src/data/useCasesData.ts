import { GraduationCap, TrendingUp, BarChart3 } from "lucide-react";

export interface QuantArticle {
  title: string;
  description: string;
  url: string;
  date: string;
  author: string;
  tags: string[];
  icon?: string; // lucide icon name: "lightbulb" | "users" | "bar-chart" | "building" | "search" | "globe"
}

export interface UseCase {
  id: string;
  slug: string;
  number: string;
  icon: any;
  title: string;
  subtitle: string;
  desc: string;
  fullDescription: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  accent: string;
  lightBg: string;
  lightText: string;
  benefits: string[];
  dataTypes: string[];
  caseStudies: {
    title: string;
    description: string;
    result: string;
  }[];
  quantArticles?: QuantArticle[];
  quantSectionTitle?: string;
  quantSectionSubtitle?: string;
}

export const useCases: UseCase[] = [
  {
    id: "1",
    slug: "academic",
    number: "01",
    icon: GraduationCap,
    title: "学术研究",
    subtitle: "Academic Research",
    desc: "为高校教授、博士研究生提供高质量实证研究数据，已助力《经济研究》《管理世界》《世界经济》及 Management Science 等顶刊发表论文。",
    fullDescription: "CnOpenData 为学术研究者提供了全面的数据支持。我们的数据已被国内外顶尖高校和研究机构广泛使用，支持了大量高质量学术论文的发表。我们致力于为学术研究提供最可靠、最全面的数据资源。",
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
    benefits: [
      "获取国内外顶刊发表的数据来源",
      "使用已验证的高质量学术数据",
      "获得专业的数据支持和技术服务",
      "加入全球学术研究社区",
    ],
    dataTypes: ["专利数据", "招聘数据", "工商数据", "文本数据"],
    caseStudies: [
      {
        title: "经济研究论文",
        description: "使用 CnOpenData 的招聘数据研究人才需求与经济发展的关系",
        result: "论文发表于《经济研究》顶刊，获得学术界广泛认可",
      },
      {
        title: "管理世界研究",
        description: "基于工商数据进行家族企业创新研究",
        result: "研究成果入选《管理世界》，为企业管理提供新视角",
      },
    ],
  },
  {
    id: "2",
    slug: "investment",
    number: "02",
    icon: TrendingUp,
    title: "投资决策",
    subtitle: "Investment Intelligence",
    desc: "基于工商注册、专利申请、招聘扩张等另类数据，构建多因子选股模型与行业轮动策略，覆盖 A 股、港股、美股全市场。",
    fullDescription: "CnOpenData 为投资机构提供结构化另类数据支持。通过工商注册数据追踪企业股权变更与关联交易，专利数据识别技术护城河深度，招聘数据量化企业扩张节奏，贸易数据捕捉产业链供需变化。这些数据可用于构建多因子选股模型、行业轮动策略及事件驱动型投资策略。",
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
    benefits: [
      "专利数据覆盖全国 4000万+ 件发明/实用新型专利，可构建企业技术竞争力因子",
      "工商数据含股权变更、实控人穿透，支持关联交易风险识别",
      "招聘数据覆盖千万级岗位，可量化企业扩张意图与人力资本强度",
      "贸易数据覆盖 HS 8 位码商品类别，可捕捉产业链上下游供需变化",
    ],
    dataTypes: ["专利数据", "工商数据", "招聘数据", "贸易数据", "A股上市公司数据", "美股上市公司数据", "港股上市公司数据"],
    caseStudies: [],
    quantSectionTitle: "量化策略：因子构建",
    quantSectionSubtitle: "基于 CnOpenData 数据的量化因子构建研究与实践",
    quantArticles: [
      {
        title: "专利数量因子为什么不稳定？从转让行为说起",
        description: "专利权转移数据里藏着一个被系统性低估的量化信号。从专利转让行为构建转出强度因子、转入强度因子和转移方向因子。",
        url: "https://mp.weixin.qq.com/s/SeBRKBNwtJq7ggcUCT4yMg",
        date: "2026-06-02",
        author: "VeriAlpha",
        tags: ["专利转让", "因子构建", "量化信号"],
        icon: "lightbulb",
      },
      {
        title: "招聘信号能预测股价吗？从劳动力需求侧构建另类因子",
        description: "企业财报每季度出一次，而招聘动态每天都在更新。从招聘数据构建招聘强度因子、技术岗位占比因子和薪资水平因子。",
        url: "https://mp.weixin.qq.com/s/ZmEebyGYBsLCIat3Q9-Cig",
        date: "2026-06-03",
        author: "VeriAlpha",
        tags: ["招聘数据", "另类因子", "劳动力需求"],
        icon: "users",
      },
      {
        title: "媒体情绪因子为什么总在关键时刻失效？",
        description: "媒体情绪因子在市场极端波动期间IC急剧下滑的原因分析，以及多渠道覆盖和渠道间情绪分歧作为信号的构建方法。",
        url: "https://mp.weixin.qq.com/s/u7hPfO-fBjneo72AANJ6OQ",
        date: "2026-06-04",
        author: "VeriAlpha",
        tags: ["媒体情绪", "NLP", "财经新闻"],
        icon: "bar-chart",
      },
    ],
  },
  {
    id: "3",
    slug: "business",
    number: "03",
    icon: BarChart3,
    title: "商业分析",
    subtitle: "Business Analytics",
    desc: "基于全国 2.4 亿工商主体、千万级招投标记录及专利数据，支持竞争格局分析、产业链图谱构建与区域市场进入策略制定。",
    fullDescription: "CnOpenData 为咨询机构、企业战略部门提供多维度结构化数据支持。通过工商数据计算行业集中度指标（CR4/HHI），招投标数据识别政府采购趋势与供应商竞争态势，专利数据衡量技术壁垒高度，招聘数据量化组织扩张速率。支持竞争格局分析、产业链图谱构建、区域市场进入策略制定及并购尽调。",
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
    benefits: [
      "工商数据覆盖全国 2.4 亿市场主体，可计算任意行业/区域的市场集中度",
      "招投标数据含千万级政府采购与企业招标记录，可识别供应商格局",
      "专利数据含 IPC 分类号、引用关系，可绘制技术竞争图谱",
      "招聘数据含岗位、薪资、学历要求，可量化人才竞争强度",
    ],
    dataTypes: ["工商数据", "招投标数据", "专利数据", "招聘数据"],
    caseStudies: [],
    quantSectionTitle: "行业研究报告",
    quantSectionSubtitle: "基于 CnOpenData 数据的产业链分析与竞争格局研究",
    quantArticles: [
      {
        title: "如何用工商数据构建行业竞争格局全景图",
        description: "基于 2.4 亿工商主体数据，通过 CR4/HHI 指数计算、市场份额分布、新进入者分析等方法，构建任意行业的竞争格局全景图。",
        url: "/databases",
        date: "2026-05-20",
        author: "CnOpenData",
        tags: ["市场集中度", "CR4/HHI", "竞争格局"],
        icon: "building",
      },
      {
        title: "招投标数据揭示政府采购趋势与供应商竞争态势",
        description: "从千万级招投标记录中提取中标率、采购金额分布、供应商集中度等指标，构建产业链上下游供应关系图谱。",
        url: "/databases",
        date: "2026-05-25",
        author: "CnOpenData",
        tags: ["招投标", "供应商图谱", "政府采购"],
        icon: "search",
      },
      {
        title: "专利数据量化技术壁垒与研发投入产出比",
        description: "利用 IPC 分类号、引用关系、专利族分析等方法，衡量目标行业的技术壁垒高度与研发效率，为技术布局提供决策依据。",
        url: "/databases",
        date: "2026-06-01",
        author: "CnOpenData",
        tags: ["专利分析", "技术壁垒", "研发效率"],
        icon: "globe",
      },
    ],
  },
];

export const useCaseMap: Record<string, UseCase> = useCases.reduce((acc, uc) => {
  acc[uc.slug] = uc;
  return acc;
}, {} as Record<string, UseCase>);
