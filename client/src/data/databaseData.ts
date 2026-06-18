// CnOpenData 数据库详情数据定义
// 设计风格：蓝白配色 #2E55A4，专业科技感，学术友好

export interface DatabaseField {
  name: string;
  type: string;
  description: string;
}

export interface DatabaseTable {
  name: string;
  fields: DatabaseField[];
  rowCount?: string;
}

export interface CitedPaper {
  authors: string;
  year: number;
  title: string;
  journal: string;
  doi?: string;
}

export interface DatabaseDetail {
  id: string;
  name: string;
  shortName: string;
  category: string;
  categorySlug: string;
  description: string;
  longDescription: string;
  timeRange: string;
  updateFrequency: string;
  dataScale: string;
  dataScaleNote: string;
  tags: string[];
  useCases: string[];
  tables: DatabaseTable[];
  citedPapers: CitedPaper[];
  chartData?: { year: string; value: number }[];
  relatedDatabases?: string[];
  price?: string;
  dataSource: string;
}

// ==================== 专利数据 ====================
const patentDatabase: DatabaseDetail = {
  id: "patent-innovation",
  name: "中国全部专利申请与授权数据",
  shortName: "专利数据",
  category: "专利数据",
  categorySlug: "patent",
  description: "覆盖1985年至今全部中国专利申请与授权记录，含发明公布、发明授权、实用新型、外观设计四大类别，支持全流程事务信息追踪。",
  longDescription: `创新是经济增长和社会进步的驱动力，是世界上每个国家每个公司追求的战略方向，也是学术研究的热点话题。专利不仅是对创新成果的保护，也兼具对创新成果进行计量的功能，因此国内外顶级期刊文献和智库报告均将专利数量作为衡量国家和企业创新水平的重要指标之一。

CnOpenData平台的专利申请与授权数据库区别于其他数据库的另一重要内容是，我们的数据包含了针对每个专利的所有事务信息，包括专利在申请后何时被授权、是否在申请公布后被撤回、专利是否被质押、专利权人信息变更以及专利权终止等所有有关专利信息变更的内容。

根据《中华人民共和国专利法》第一章规定，专利分为**发明、实用新型和外观设计**三类，并在数据库中以分表列示，包含所有指标内容，支持全流程事务信息追踪（申请、授权、撤回、质押、变更等）。`,
  timeRange: "按申请公布日统计：1985年 — 2025年12月31日",
  updateFrequency: "年度更新",
  dataScale: "4,800万+",
  dataScaleNote: "条专利记录",
  tags: ["专利", "创新", "知识产权", "企业研发", "高校科研"],
  useCases: [
    "企业创新能力评估与比较研究",
    "区域创新生态系统分析",
    "技术扩散与知识溢出研究",
    "专利质量与企业价值关系研究",
    "绿色创新与环境政策研究",
  ],
  tables: [
    {
      name: "中国发明公布专利基本信息表",
      rowCount: "约2,500万条",
      fields: [
        { name: "专利名称", type: "VARCHAR", description: "发明专利的完整名称" },
        { name: "申请公布号", type: "VARCHAR", description: "国家知识产权局公布的申请号，如 CN111492057A" },
        { name: "申请公布日", type: "DATE", description: "专利申请公布的日期" },
        { name: "申请号", type: "VARCHAR", description: "专利申请的唯一编号" },
        { name: "申请日", type: "DATE", description: "提交专利申请的日期" },
        { name: "申请人", type: "VARCHAR", description: "专利申请人名称（个人或机构）" },
        { name: "发明人", type: "VARCHAR", description: "实际发明人姓名，多人以分号分隔" },
        { name: "地址", type: "VARCHAR", description: "申请人的详细地址信息" },
        { name: "IPC分类号", type: "VARCHAR", description: "国际专利分类号，如 C12N15/29(2006.01)I" },
        { name: "专利代理机构", type: "VARCHAR", description: "代理专利申请的机构名称" },
        { name: "代理人", type: "VARCHAR", description: "具体负责代理的人员姓名" },
        { name: "PCT进入国家阶段日", type: "DATE", description: "PCT国际申请进入中国国家阶段的日期" },
        { name: "PCT申请数据", type: "VARCHAR", description: "PCT国际申请的相关数据" },
        { name: "PCT公布数据", type: "VARCHAR", description: "PCT国际公布的相关数据" },
        { name: "优先权", type: "VARCHAR", description: "优先权申请信息" },
        { name: "生物保藏", type: "VARCHAR", description: "生物材料保藏信息" },
        { name: "分案原申请", type: "VARCHAR", description: "分案申请的原申请号" },
        { name: "本国优先权", type: "VARCHAR", description: "本国优先权申请信息" },
        { name: "简要说明", type: "TEXT", description: "专利的简要技术说明摘要" },
      ],
    },
    {
      name: "中国发明授权专利基本信息表",
      rowCount: "约1,200万条",
      fields: [
        { name: "专利名称", type: "VARCHAR", description: "发明专利的完整名称" },
        { name: "授权公告号", type: "VARCHAR", description: "国家知识产权局授权公告号" },
        { name: "授权公告日", type: "DATE", description: "专利授权公告的日期" },
        { name: "申请号", type: "VARCHAR", description: "专利申请的唯一编号" },
        { name: "申请日", type: "DATE", description: "提交专利申请的日期" },
        { name: "专利权人", type: "VARCHAR", description: "获得专利权的个人或机构名称" },
        { name: "发明人", type: "VARCHAR", description: "实际发明人姓名" },
        { name: "地址", type: "VARCHAR", description: "专利权人的详细地址" },
        { name: "IPC分类号", type: "VARCHAR", description: "国际专利分类号" },
        { name: "专利代理机构", type: "VARCHAR", description: "代理机构名称" },
        { name: "代理人", type: "VARCHAR", description: "代理人姓名" },
        { name: "国省代码", type: "VARCHAR", description: "申请人所在国家/省份代码" },
        { name: "摘要", type: "TEXT", description: "专利技术摘要" },
      ],
    },
    {
      name: "中国专利事务表",
      rowCount: "约8,000万条",
      fields: [
        { name: "申请号", type: "VARCHAR", description: "关联的专利申请号" },
        { name: "事务类型", type: "VARCHAR", description: "事务类型，如授权、撤回、质押、转让等" },
        { name: "事务日期", type: "DATE", description: "事务发生的日期" },
        { name: "事务详情", type: "TEXT", description: "事务的详细描述信息" },
        { name: "当事人", type: "VARCHAR", description: "事务相关当事人信息" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "何欢浪、任岩、章韬",
      year: 2022,
      title: "媒体宣传、知识产权保护与企业创新",
      journal: "《世界经济》第1期",
    },
    {
      authors: "周开国、卢允之、杨海生",
      year: 2017,
      title: "融资约束、创新能力与企业协同创新",
      journal: "《经济研究》第7期",
    },
    {
      authors: "余明桂、钟慧洁、范蕊",
      year: 2016,
      title: "业绩考核制度可以促进央企创新吗?",
      journal: "《经济研究》第12期",
    },
    {
      authors: "黎文靖、郑曼妮",
      year: 2016,
      title: "实质性创新还是策略性创新?——宏观产业政策对微观企业创新的影响",
      journal: "《经济研究》第4期",
    },
    {
      authors: "Josh L. and Amit S.",
      year: 2021,
      title: "The Use and Misuse of Patent Data: Issues for Finance and Beyond",
      journal: "The Review of Financial Studies",
    },
  ],
  chartData: [
    { year: "1990", value: 12000 },
    { year: "1995", value: 45000 },
    { year: "2000", value: 120000 },
    { year: "2005", value: 380000 },
    { year: "2010", value: 750000 },
    { year: "2015", value: 1200000 },
    { year: "2018", value: 1540000 },
    { year: "2020", value: 1680000 },
    { year: "2022", value: 1900000 },
    { year: "2024", value: 2100000 },
  ],
  dataSource: "国家知识产权局（CNIPA）",
};

// ==================== 上市公司数据 ====================
const listedCompanyDatabase: DatabaseDetail = {
  id: "listed-company",
  name: "A股上市公司基本信息数据",
  shortName: "上市公司数据",
  category: "上市公司数据",
  categorySlug: "listed-company",
  description: "覆盖A股全部上市公司的基本信息、财务数据、股权结构、高管信息等，数据来源权威，更新及时，是金融研究和投资分析的核心数据集。",
  longDescription: `A股上市公司数据库是CnOpenData最核心的数据产品之一，覆盖沪深北三大交易所全部上市公司，提供从公司基本信息到财务报告、股权结构、高管薪酬、机构持股等全维度数据。

数据严格按照证监会、交易所披露规范整理，支持面板数据分析，适用于公司金融、资产定价、公司治理等多个研究领域。所有数据均经过标准化处理，可直接用于实证研究，无需额外清洗。`,
  timeRange: "1990年 — 2025年（持续更新）",
  updateFrequency: "季度更新（财务数据），年度更新（基本信息）",
  dataScale: "5,000+",
  dataScaleNote: "家上市公司",
  tags: ["上市公司", "A股", "财务数据", "股权结构", "公司治理"],
  useCases: [
    "公司金融与资本结构研究",
    "企业绩效与高管激励研究",
    "机构投资者行为分析",
    "ESG评级与可持续发展研究",
    "并购重组事件研究",
  ],
  tables: [
    {
      name: "A股上市公司基本信息表",
      rowCount: "约5,300条",
      fields: [
        { name: "股票代码", type: "VARCHAR", description: "6位股票代码，如 000001" },
        { name: "股票简称", type: "VARCHAR", description: "股票在交易所的简称" },
        { name: "公司全称", type: "VARCHAR", description: "公司完整法定名称" },
        { name: "上市交易所", type: "VARCHAR", description: "上市交易所：上交所/深交所/北交所" },
        { name: "上市日期", type: "DATE", description: "首次公开发行上市日期" },
        { name: "退市日期", type: "DATE", description: "退市日期（如已退市）" },
        { name: "所属行业（证监会）", type: "VARCHAR", description: "证监会行业分类（2012版）" },
        { name: "所属行业（申万）", type: "VARCHAR", description: "申万行业分类" },
        { name: "注册地省份", type: "VARCHAR", description: "公司注册地所在省份" },
        { name: "实际控制人类型", type: "VARCHAR", description: "国有/民营/外资/其他" },
        { name: "是否ST", type: "BOOLEAN", description: "是否为ST/ST*股票" },
        { name: "总股本", type: "DECIMAL", description: "总股本数量（万股）" },
        { name: "流通股本", type: "DECIMAL", description: "流通股本数量（万股）" },
      ],
    },
    {
      name: "A股上市公司财务数据表（年报）",
      rowCount: "约8万条",
      fields: [
        { name: "股票代码", type: "VARCHAR", description: "关联股票代码" },
        { name: "报告期", type: "DATE", description: "财务报告所属年度" },
        { name: "营业收入", type: "DECIMAL", description: "当期营业收入（元）" },
        { name: "净利润", type: "DECIMAL", description: "归属母公司净利润（元）" },
        { name: "总资产", type: "DECIMAL", description: "期末总资产（元）" },
        { name: "净资产", type: "DECIMAL", description: "期末归属母公司净资产（元）" },
        { name: "资产负债率", type: "DECIMAL", description: "总负债/总资产" },
        { name: "ROE", type: "DECIMAL", description: "净资产收益率" },
        { name: "ROA", type: "DECIMAL", description: "总资产收益率" },
        { name: "研发投入", type: "DECIMAL", description: "当期研发费用（元）" },
        { name: "经营现金流", type: "DECIMAL", description: "经营活动产生的现金流量净额" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "陈信元、黄俊",
      year: 2011,
      title: "政府干预、多元化经营与公司业绩",
      journal: "《管理世界》第9期",
    },
    {
      authors: "谢德仁、廖珂",
      year: 2019,
      title: "控股股东股权质押与上市公司真实活动盈余管理",
      journal: "《会计研究》第8期",
    },
    {
      authors: "王小鲁、樊纲、胡李鹏",
      year: 2019,
      title: "中国分省份市场化指数报告",
      journal: "社会科学文献出版社",
    },
  ],
  chartData: [
    { year: "2000", value: 1088 },
    { year: "2005", value: 1381 },
    { year: "2010", value: 2063 },
    { year: "2015", value: 2827 },
    { year: "2018", value: 3567 },
    { year: "2020", value: 4154 },
    { year: "2022", value: 5079 },
    { year: "2024", value: 5354 },
  ],
  dataSource: "上海证券交易所、深圳证券交易所、北京证券交易所",
};

// ==================== 工商企业数据 ====================
const enterpriseDatabase: DatabaseDetail = {
  id: "enterprise-registration",
  name: "中国工商企业注册数据",
  shortName: "工商企业数据",
  category: "工商企业数据",
  categorySlug: "enterprise",
  description: "覆盖全国数千万家工商注册企业的基本信息、股东结构、经营范围、变更记录等，是企业研究、供应链分析和市场竞争研究的核心数据集。",
  longDescription: `中国工商企业注册数据库收录了国家市场监督管理总局登记注册的全部企业信息，包括有限责任公司、股份有限公司、合伙企业、个体工商户等各类市场主体。

数据覆盖企业全生命周期，从注册成立到注销退出，包含企业基本信息、股东及出资信息、主要人员信息、经营范围、变更记录、行政处罚等多维度数据，是研究中国企业生态、市场竞争格局和产业政策效果的基础数据集。`,
  timeRange: "1949年 — 2025年（持续更新）",
  updateFrequency: "季度更新",
  dataScale: "2.4亿+",
  dataScaleNote: "家市场主体",
  tags: ["工商注册", "企业信息", "股权结构", "市场主体", "产业分析"],
  useCases: [
    "企业生命周期与退出研究",
    "民营企业发展与政策效果评估",
    "供应链关系与产业集群分析",
    "市场竞争格局与行业集中度研究",
    "外资企业投资行为研究",
  ],
  tables: [
    {
      name: "工商企业基本信息表",
      rowCount: "约2.4亿条",
      fields: [
        { name: "统一社会信用代码", type: "VARCHAR", description: "18位统一社会信用代码，企业唯一标识" },
        { name: "企业名称", type: "VARCHAR", description: "企业法定名称" },
        { name: "注册地址", type: "VARCHAR", description: "企业注册地址" },
        { name: "成立日期", type: "DATE", description: "企业成立/注册日期" },
        { name: "注销日期", type: "DATE", description: "企业注销日期（如已注销）" },
        { name: "经营范围", type: "TEXT", description: "企业经营范围描述" },
        { name: "企业类型", type: "VARCHAR", description: "有限公司/股份公司/个体工商户等" },
        { name: "注册资本", type: "DECIMAL", description: "注册资本金（万元）" },
        { name: "所有制性质", type: "VARCHAR", description: "国有/民营/外资/混合等" },
        { name: "行业分类", type: "VARCHAR", description: "国民经济行业分类代码" },
        { name: "法定代表人", type: "VARCHAR", description: "法定代表人姓名" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "陈晓红、李新春",
      year: 2012,
      title: "民营企业治理结构与绩效关系研究",
      journal: "《管理世界》第7期",
    },
  ],
  chartData: [
    { year: "1990", value: 1000000 },
    { year: "2000", value: 3000000 },
    { year: "2010", value: 50000000 },
    { year: "2015", value: 100000000 },
    { year: "2018", value: 150000000 },
    { year: "2020", value: 180000000 },
    { year: "2022", value: 210000000 },
    { year: "2024", value: 240000000 },
  ],
  dataSource: "国家市场监督管理总局",
};

// ==================== 金融数据 ====================
const financialDatabase: DatabaseDetail = {
  id: "financial-market",
  name: "中国金融市场数据",
  shortName: "金融市场数据",
  category: "金融数据",
  categorySlug: "financial",
  description: "覆盖A股、债券、基金、期货等全市场金融数据，包括日行情、财务报告、分析师预测、机构持股等，是量化投资和金融研究的核心数据集。",
  longDescription: `中国金融市场数据库是面向量化投资、学术研究和金融分析的综合性数据产品，覆盖A股市场（沪深北三所）、债券市场、公募基金、商品期货等全市场数据。

数据来源包括交易所官方披露、证监会公告、基金业协会等权威渠道，经过严格的数据清洗和标准化处理，支持高频数据分析和长期面板研究。`,
  timeRange: "1990年 — 2025年（持续更新）",
  updateFrequency: "日度更新（行情数据）",
  dataScale: "30年+",
  dataScaleNote: "历史行情数据",
  tags: ["股票行情", "债券", "基金", "量化研究", "资产定价"],
  useCases: [
    "资产定价与因子模型研究",
    "市场微观结构与流动性研究",
    "分析师预测偏差与信息效率",
    "机构投资者行为与市场稳定性",
    "量化策略回测与绩效评估",
  ],
  tables: [
    {
      name: "A股日行情数据表",
      rowCount: "约1.2亿条",
      fields: [
        { name: "股票代码", type: "VARCHAR", description: "6位股票代码" },
        { name: "交易日期", type: "DATE", description: "交易日期" },
        { name: "开盘价", type: "DECIMAL", description: "当日开盘价（元）" },
        { name: "最高价", type: "DECIMAL", description: "当日最高价（元）" },
        { name: "最低价", type: "DECIMAL", description: "当日最低价（元）" },
        { name: "收盘价", type: "DECIMAL", description: "当日收盘价（元）" },
        { name: "成交量", type: "BIGINT", description: "当日成交股数（股）" },
        { name: "成交额", type: "DECIMAL", description: "当日成交金额（元）" },
        { name: "涨跌幅", type: "DECIMAL", description: "相对前一交易日的涨跌幅（%）" },
        { name: "换手率", type: "DECIMAL", description: "当日换手率（%）" },
        { name: "市盈率", type: "DECIMAL", description: "市盈率（TTM）" },
        { name: "市净率", type: "DECIMAL", description: "市净率" },
        { name: "总市值", type: "DECIMAL", description: "当日总市值（元）" },
        { name: "流通市值", type: "DECIMAL", description: "当日流通市值（元）" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "朱红军、钱友文",
      year: 2011,
      title: "中国证券分析师的信息优势研究",
      journal: "《经济研究》第6期",
    },
    {
      authors: "Carpenter J., Lu F. and Whitelaw R.",
      year: 2021,
      title: "The Real Value of China's Stock Market",
      journal: "Journal of Financial Economics",
    },
  ],
  chartData: [
    { year: "2000", value: 1088 },
    { year: "2005", value: 1381 },
    { year: "2010", value: 2063 },
    { year: "2015", value: 3500 },
    { year: "2018", value: 3567 },
    { year: "2020", value: 4154 },
    { year: "2022", value: 5079 },
    { year: "2024", value: 5354 },
  ],
  dataSource: "上海证券交易所、深圳证券交易所、北京证券交易所、中国证监会",
};

// ==================== 地理数据 ====================
const geoDatabase: DatabaseDetail = {
  id: "geographic-data",
  name: "中国地理与区域经济数据",
  shortName: "地理区域数据",
  category: "地理数据",
  categorySlug: "geographic",
  description: "覆盖全国省市县三级行政区划的经济、人口、土地、环境等多维度数据，支持区域经济学、城市经济学和空间计量研究。",
  longDescription: `中国地理与区域经济数据库整合了来自国家统计局、自然资源部、生态环境部等多个政府部门的地理和经济数据，构建了覆盖省、市、县三级行政区划的综合数据集。

数据包含经济发展指标（GDP、财政收入、固定资产投资）、人口数据（人口普查、流动人口）、土地利用数据、环境污染数据等，是区域经济学、城市经济学和空间计量研究的核心数据集。`,
  timeRange: "1978年 — 2024年",
  updateFrequency: "年度更新",
  dataScale: "2,800+",
  dataScaleNote: "个区县级单元",
  tags: ["区域经济", "城市化", "空间计量", "人口迁移", "环境经济"],
  useCases: [
    "区域经济差距与收敛研究",
    "城市化进程与土地利用研究",
    "环境规制与经济增长研究",
    "人口流动与劳动力市场研究",
    "基础设施投资与区域发展研究",
  ],
  tables: [
    {
      name: "省市县经济发展指标表",
      rowCount: "约50万条",
      fields: [
        { name: "地区代码", type: "VARCHAR", description: "6位行政区划代码" },
        { name: "年份", type: "INT", description: "数据所属年份" },
        { name: "GDP", type: "DECIMAL", description: "地区生产总值（亿元）" },
        { name: "人均GDP", type: "DECIMAL", description: "人均地区生产总值（元）" },
        { name: "财政收入", type: "DECIMAL", description: "地方财政收入（亿元）" },
        { name: "固定资产投资", type: "DECIMAL", description: "固定资产投资总额（亿元）" },
        { name: "社会消费品零售总额", type: "DECIMAL", description: "社会消费品零售总额（亿元）" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "蔡昉、都阳",
      year: 2000,
      title: "中国地区经济增长的收敛与发散",
      journal: "《经济研究》第12期",
    },
  ],
  chartData: [
    { year: "1990", value: 100 },
    { year: "2000", value: 500 },
    { year: "2010", value: 2000 },
    { year: "2015", value: 4000 },
    { year: "2018", value: 5500 },
    { year: "2020", value: 6000 },
    { year: "2022", value: 6500 },
    { year: "2024", value: 7000 },
  ],
  dataSource: "国家统计局、自然资源部、生态环境部",
};

// ==================== 学术文献数据 ====================
const academicDatabase: DatabaseDetail = {
  id: "academic-literature",
  name: "中国学术文献数据",
  shortName: "学术文献数据",
  category: "学术文献数据",
  categorySlug: "academic",
  description: "覆盖中国主要学术期刊的论文发表、引用关系、作者信息等数据，支持文献计量学、科研评价和知识图谱研究。",
  longDescription: `中国学术文献引用数据库收录了来自CNKI、万方、维普等主要数据库的学术论文元数据，包括论文基本信息、作者机构信息、参考文献和被引用关系，构建了完整的中国学术知识图谱。

数据覆盖经济学、管理学、社会学、法学等多个学科领域的核心期刊，支持文献计量学分析、学者影响力评估、研究热点追踪和跨学科知识流动研究。`,
  timeRange: "1980年 — 2025年",
  updateFrequency: "年度更新",
  dataScale: "3,000万+",
  dataScaleNote: "篇学术论文",
  tags: ["学术论文", "引用关系", "文献计量", "科研评价", "知识图谱"],
  useCases: [
    "学者学术影响力与h指数计算",
    "研究热点演化与知识扩散分析",
    "高校科研产出与学科评估",
    "跨学科知识流动与合作网络研究",
    "政策文件对学术研究的影响分析",
  ],
  tables: [
    {
      name: "学术论文基本信息表",
      rowCount: "约3,000万条",
      fields: [
        { name: "论文ID", type: "VARCHAR", description: "论文唯一标识符" },
        { name: "论文标题", type: "VARCHAR", description: "论文完整标题" },
        { name: "作者", type: "VARCHAR", description: "所有作者姓名，以分号分隔" },
        { name: "第一作者", type: "VARCHAR", description: "第一作者姓名" },
        { name: "通讯作者", type: "VARCHAR", description: "通讯作者姓名" },
        { name: "作者机构", type: "VARCHAR", description: "作者所属机构名称" },
        { name: "期刊名称", type: "VARCHAR", description: "发表期刊名称" },
        { name: "发表年份", type: "INT", description: "论文发表年份" },
        { name: "期号", type: "VARCHAR", description: "期刊期号" },
        { name: "页码", type: "VARCHAR", description: "论文页码范围" },
        { name: "关键词", type: "VARCHAR", description: "论文关键词，以分号分隔" },
        { name: "摘要", type: "TEXT", description: "论文摘要全文" },
        { name: "被引次数", type: "INT", description: "截至数据更新日期的被引次数" },
        { name: "下载次数", type: "INT", description: "截至数据更新日期的下载次数" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "李江、刘源浩、黄萃、苏竣",
      year: 2015,
      title: "用文献计量研究重塑政策文本数据分析",
      journal: "《中国社会科学》第10期",
    },
  ],
  chartData: [
    { year: "1990", value: 50000 },
    { year: "1995", value: 150000 },
    { year: "2000", value: 500000 },
    { year: "2005", value: 1200000 },
    { year: "2010", value: 2000000 },
    { year: "2015", value: 2500000 },
    { year: "2020", value: 2800000 },
    { year: "2024", value: 3000000 },
  ],
  dataSource: "中国知网（CNKI）、万方数据、维普资讯",
};

// ==================== 房地产数据 ====================
const realEstateDatabase: DatabaseDetail = {
  id: "real-estate",
  name: "中国房地产市场数据",
  shortName: "房地产数据",
  category: "房地产数据",
  categorySlug: "real-estate",
  description: "覆盖全国主要城市的新房、二手房成交数据，土地出让数据，房价指数等，是房地产市场研究和投资分析的核心数据集。",
  longDescription: `中国房地产市场数据库整合了来自各地住建委、自然资源部、国家统计局等部门的房地产市场数据，构建了覆盖全国300+城市的综合性房地产数据集。

数据包含新房网签备案数据、二手房挂牌与成交数据、土地出让数据、房价指数等，支持房地产市场研究、城市经济学分析和宏观政策效果评估。`,
  timeRange: "2000年 — 2025年",
  updateFrequency: "月度更新",
  dataScale: "300+",
  dataScaleNote: "个城市房产数据",
  tags: ["房价", "土地出让", "二手房", "新房", "城市经济"],
  useCases: [
    "房价决定因素与空间溢出效应研究",
    "土地财政与地方政府行为研究",
    "住房政策效果评估",
    "房地产市场与宏观经济联动研究",
    "城市间房价差异与人口流动研究",
  ],
  tables: [
    {
      name: "二手房成交数据表",
      rowCount: "约5,000万条",
      fields: [
        { name: "城市", type: "VARCHAR", description: "房产所在城市" },
        { name: "区县", type: "VARCHAR", description: "房产所在区县" },
        { name: "成交日期", type: "DATE", description: "成交日期" },
        { name: "小区名称", type: "VARCHAR", description: "小区名称" },
        { name: "建筑面积", type: "DECIMAL", description: "建筑面积（平方米）" },
        { name: "成交价格", type: "DECIMAL", description: "成交总价（万元）" },
        { name: "单价", type: "DECIMAL", description: "成交单价（元/平方米）" },
        { name: "楼层", type: "VARCHAR", description: "所在楼层/总楼层" },
        { name: "房型", type: "VARCHAR", description: "户型，如3室2厅" },
        { name: "建筑年代", type: "INT", description: "建筑竣工年份" },
        { name: "挂牌价格", type: "DECIMAL", description: "挂牌总价（万元）" },
        { name: "挂牌日期", type: "DATE", description: "挂牌上市日期" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "陈斌开、林毅夫",
      year: 2013,
      title: "发展战略、城镇化与中国城乡收入差距",
      journal: "《中国社会科学》第4期",
    },
    {
      authors: "况伟大",
      year: 2010,
      title: "预期、投机与中国城市房价波动",
      journal: "《经济研究》第9期",
    },
  ],
  chartData: [
    { year: "2005", value: 3500 },
    { year: "2008", value: 5200 },
    { year: "2010", value: 7500 },
    { year: "2013", value: 11000 },
    { year: "2016", value: 15000 },
    { year: "2018", value: 18000 },
    { year: "2020", value: 20000 },
    { year: "2023", value: 22000 },
  ],
  dataSource: "各地住建委、链家、安居客、贝壳研究院",
};

// ==================== 招投标数据 ====================
const biddingDatabase: DatabaseDetail = {
  id: "bidding-procurement",
  name: "中国招投标与政府采购数据",
  shortName: "招投标数据",
  category: "招投标数据",
  categorySlug: "bidding",
  description: "覆盖全国政府采购、工程招投标、招聘等海量招投标数据，包含中标单位、中标金额、采购项目等信息，是研究政府采购、产业政策和企业竞争的重要数据集。",
  longDescription: `中国招投标数据库整合了来自财政部、各地公共资源交易中心、招聘网站等多个渠道的招投标信息，构建了覆盖全国的招投标数据集。

数据包含政府采购公告、工程招投标信息、中标结果、中标单位基本信息等，支持政府采购政策效果研究、企业竞争力分析和产业政策评估。`,
  timeRange: "2010年 — 2025年",
  updateFrequency: "月度更新",
  dataScale: "1,000万+",
  dataScaleNote: "条招投标记录",
  tags: ["政府采购", "招投标", "中标", "采购项目", "产业政策"],
  useCases: [
    "政府采购政策效果评估",
    "企业竞争力与市场集中度研究",
    "产业政策与企业发展研究",
    "地方政府支持政策分析",
    "供应商选择行为研究",
  ],
  tables: [
    {
      name: "政府采购公告表",
      rowCount: "约1,000万条",
      fields: [
        { name: "采购公告号", type: "VARCHAR", description: "采购公告唯一编号" },
        { name: "采购人", type: "VARCHAR", description: "采购单位名称" },
        { name: "采购项目", type: "VARCHAR", description: "采购项目名称" },
        { name: "采购预算", type: "DECIMAL", description: "采购预算金额（万元）" },
        { name: "发布日期", type: "DATE", description: "采购公告发布日期" },
        { name: "中标单位", type: "VARCHAR", description: "中标供应商名称" },
        { name: "中标金额", type: "DECIMAL", description: "中标金额（万元）" },
        { name: "中标日期", type: "DATE", description: "中标日期" },
        { name: "采购地区", type: "VARCHAR", description: "采购地区" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "李成、张军",
      year: 2015,
      title: "政府采购与企业创新",
      journal: "《经济研究》第3期",
    },
  ],
  chartData: [
    { year: "2010", value: 100000 },
    { year: "2012", value: 300000 },
    { year: "2015", value: 800000 },
    { year: "2018", value: 1500000 },
    { year: "2020", value: 2000000 },
    { year: "2022", value: 2500000 },
    { year: "2024", value: 3000000 },
  ],
  dataSource: "财政部、各地公共资源交易中心",
};

// ==================== 税收数据 ====================
const taxDatabase: DatabaseDetail = {
  id: "tax-survey",
  name: "中国税收调查企业数据",
  shortName: "税收调查数据",
  category: "工商企业数据",
  categorySlug: "enterprise",
  description: "基于国家税务总局税收调查数据，覆盖全国数百万家企业的税收缴纳、财务状况等信息，是研究企业税负、逃税行为和税收政策效果的核心数据集。",
  longDescription: `中国税收调查企业数据库基于国家税务总局的税收调查数据整理而成，覆盖全国各类型企业的税收缴纳情况、财务状况和经营信息。

数据包含企业所得税、增值税、营业税等主要税种的缴纳信息，以及企业规模、行业分类、所有制类型等基本信息，是研究企业税负、税收遵从、逃税行为和税收政策效果的核心数据集。`,
  timeRange: "2000年 — 2020年",
  updateFrequency: "年度更新",
  dataScale: "500万+",
  dataScaleNote: "家企业税收记录",
  tags: ["税收", "企业税负", "增值税", "所得税", "税收政策"],
  useCases: [
    "企业税负与经营绩效研究",
    "税收优惠政策效果评估",
    "增值税改革对企业行为的影响",
    "税收征管与企业逃税研究",
    "税收与企业创新投入关系研究",
  ],
  tables: [
    {
      name: "税收调查企业基本信息表",
      rowCount: "约500万条",
      fields: [
        { name: "企业ID", type: "VARCHAR", description: "企业匿名化唯一标识符" },
        { name: "所属年份", type: "INT", description: "数据所属年份" },
        { name: "所属省份", type: "VARCHAR", description: "企业注册所在省份" },
        { name: "行业代码", type: "VARCHAR", description: "国民经济行业分类代码" },
        { name: "企业规模", type: "VARCHAR", description: "大型/中型/小型/微型企业" },
        { name: "所有制类型", type: "VARCHAR", description: "国有/集体/私营/外资等" },
        { name: "应纳税所得额", type: "DECIMAL", description: "企业所得税应纳税所得额（万元）" },
        { name: "实际缴纳所得税", type: "DECIMAL", description: "实际缴纳企业所得税（万元）" },
        { name: "增值税应税销售额", type: "DECIMAL", description: "增值税应税销售额（万元）" },
        { name: "实际缴纳增值税", type: "DECIMAL", description: "实际缴纳增值税（万元）" },
        { name: "营业收入", type: "DECIMAL", description: "企业营业收入（万元）" },
        { name: "从业人员数", type: "INT", description: "年末从业人员数量（人）" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "刘行、叶康涛",
      year: 2014,
      title: "企业的避税活动会影响投资效率吗",
      journal: "《会计研究》第6期",
    },
    {
      authors: "范子英、彭飞",
      year: 2017,
      title: "营改增的减税效应和分工效应：基于产业互联的视角",
      journal: "《经济研究》第2期",
    },
  ],
  chartData: [
    { year: "2000", value: 500000 },
    { year: "2005", value: 1500000 },
    { year: "2010", value: 3000000 },
    { year: "2015", value: 4500000 },
    { year: "2018", value: 5000000 },
    { year: "2020", value: 5200000 },
  ],
  dataSource: "国家税务总局",
};

// ==================== 海关进出口数据 ====================
const customsDatabase: DatabaseDetail = {
  id: "customs-trade",
  name: "中国海关进出口贸易数据",
  shortName: "海关贸易数据",
  category: "贸易数据",
  categorySlug: "trade",
  description: "覆盖全国企业的进出口贸易数据，包含商品品类、贸易伙伴、贸易额等信息，是研究国际贸易、产业竞争力和贸易政策的重要数据集。",
  longDescription: `中国海关进出口贸易数据库基于海关总署的官方统计数据，覆盖全国所有进出口企业的贸易信息。

数据包含进出口商品品类、贸易伙伴国家/地区、贸易方式、贸易额等详细信息，支持国际贸易研究、产业竞争力分析和贸易政策效果评估。`,
  timeRange: "1992年 — 2025年",
  updateFrequency: "月度更新",
  dataScale: "1,000万+",
  dataScaleNote: "条贸易记录",
  tags: ["进出口", "国际贸易", "商品贸易", "贸易伙伴", "贸易政策"],
  useCases: [
    "企业国际竞争力评估",
    "产业贸易竞争力分析",
    "贸易政策效果评估",
    "国际价值链研究",
    "贸易伙伴关系分析",
  ],
  tables: [
    {
      name: "进出口贸易基本信息表",
      rowCount: "约1,000万条",
      fields: [
        { name: "企业代码", type: "VARCHAR", description: "进出口企业代码" },
        { name: "企业名称", type: "VARCHAR", description: "进出口企业名称" },
        { name: "贸易年月", type: "DATE", description: "贸易发生年月" },
        { name: "商品代码", type: "VARCHAR", description: "HS商品编码" },
        { name: "商品名称", type: "VARCHAR", description: "商品名称" },
        { name: "贸易方式", type: "VARCHAR", description: "一般贸易/加工贸易等" },
        { name: "贸易伙伴", type: "VARCHAR", description: "贸易伙伴国家/地区" },
        { name: "进出口标志", type: "VARCHAR", description: "进口/出口" },
        { name: "贸易额", type: "DECIMAL", description: "贸易金额（美元）" },
        { name: "贸易量", type: "DECIMAL", description: "贸易数量（吨）" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "陆毅、徐康宁",
      year: 2008,
      title: "贸易自由化与企业生产率",
      journal: "《经济研究》第5期",
    },
  ],
  chartData: [
    { year: "1995", value: 100000 },
    { year: "2000", value: 500000 },
    { year: "2005", value: 1500000 },
    { year: "2010", value: 3000000 },
    { year: "2015", value: 5000000 },
    { year: "2018", value: 6000000 },
    { year: "2020", value: 6500000 },
    { year: "2024", value: 7000000 },
  ],
  dataSource: "海关总署",
};

// ==================== 环保数据 ====================
const environmentDatabase: DatabaseDetail = {
  id: "environmental-data",
  name: "中国环境污染与生态数据",
  shortName: "环保数据",
  category: "环保数据",
  categorySlug: "environment",
  description: "覆盖全国空气质量、水质、污染物排放等环保数据，支持环境经济学、环保政策评估和可持续发展研究。",
  longDescription: `中国环境污染与生态数据库整合了来自生态环境部、各地环保部门的环保监测数据，构建了覆盖全国的环保数据集。

数据包含空气质量指数（AQI）、PM2.5、水质监测、污染物排放等信息，支持环境经济学研究、环保政策效果评估和可持续发展研究。`,
  timeRange: "2013年 — 2025年",
  updateFrequency: "日度更新（空气质量），年度更新（污染排放）",
  dataScale: "300+",
  dataScaleNote: "个城市环保数据",
  tags: ["空气质量", "环保", "污染", "生态", "可持续发展"],
  useCases: [
    "环保政策效果评估",
    "污染与健康关系研究",
    "企业环保投入与绩效研究",
    "区域环境治理研究",
    "气候变化与经济增长研究",
  ],
  tables: [
    {
      name: "城市空气质量监测表",
      rowCount: "约500万条",
      fields: [
        { name: "城市", type: "VARCHAR", description: "监测城市名称" },
        { name: "监测日期", type: "DATE", description: "监测日期" },
        { name: "AQI", type: "INT", description: "空气质量指数" },
        { name: "PM2.5", type: "DECIMAL", description: "PM2.5浓度（μg/m³）" },
        { name: "PM10", type: "DECIMAL", description: "PM10浓度（μg/m³）" },
        { name: "SO2", type: "DECIMAL", description: "二氧化硫浓度（μg/m³）" },
        { name: "NO2", type: "DECIMAL", description: "二氧化氮浓度（μg/m³）" },
        { name: "O3", type: "DECIMAL", description: "臭氧浓度（μg/m³）" },
        { name: "CO", type: "DECIMAL", description: "一氧化碳浓度（mg/m³）" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "张军、高远、陈诗一",
      year: 2012,
      title: "污染、治理与经济增长",
      journal: "《经济研究》第8期",
    },
  ],
  chartData: [
    { year: "2013", value: 100 },
    { year: "2015", value: 150 },
    { year: "2017", value: 120 },
    { year: "2019", value: 100 },
    { year: "2021", value: 85 },
    { year: "2023", value: 75 },
    { year: "2024", value: 70 },
  ],
  dataSource: "生态环境部、各地环保部门",
};

// ==================== 劳动就业数据 ====================
const laborDatabase: DatabaseDetail = {
  id: "labor-employment",
  name: "中国劳动就业数据",
  shortName: "劳动就业数据",
  category: "劳动数据",
  categorySlug: "labor",
  description: "覆盖全国城镇职工、农民工、招聘等劳动就业数据，包含工资、就业、失业等信息，是研究劳动力市场和就业政策的重要数据集。",
  longDescription: `中国劳动就业数据库整合了来自人力资源和社会保障部、各地劳动部门、招聘网站等多个渠道的就业数据。

数据包含城镇职工社保、农民工就业、招聘信息、工资水平等信息，支持劳动力市场研究、就业政策效果评估和工资决定机制研究。`,
  timeRange: "2005年 — 2025年",
  updateFrequency: "年度更新",
  dataScale: "1亿+",
  dataScaleNote: "条就业记录",
  tags: ["就业", "工资", "劳动力", "社保", "人力资源"],
  useCases: [
    "劳动力市场分析",
    "工资决定机制研究",
    "就业政策效果评估",
    "人力资本投资研究",
    "收入分配与不平等研究",
  ],
  tables: [
    {
      name: "城镇职工基本信息表",
      rowCount: "约5,000万条",
      fields: [
        { name: "职工ID", type: "VARCHAR", description: "职工匿名化标识符" },
        { name: "年份", type: "INT", description: "数据所属年份" },
        { name: "地区", type: "VARCHAR", description: "职工所在地区" },
        { name: "行业", type: "VARCHAR", description: "职工所在行业" },
        { name: "性别", type: "VARCHAR", description: "职工性别" },
        { name: "年龄", type: "INT", description: "职工年龄" },
        { name: "教育程度", type: "VARCHAR", description: "教育程度" },
        { name: "月工资", type: "DECIMAL", description: "月平均工资（元）" },
        { name: "社保缴纳", type: "DECIMAL", description: "社保缴纳金额（元）" },
      ],
    },
  ],
  citedPapers: [
    {
      authors: "蔡昉、王美艳",
      year: 2009,
      title: "中国工资增长与收入分配",
      journal: "《经济研究》第2期",
    },
  ],
  chartData: [
    { year: "2005", value: 30000000 },
    { year: "2010", value: 40000000 },
    { year: "2015", value: 60000000 },
    { year: "2018", value: 75000000 },
    { year: "2020", value: 85000000 },
    { year: "2022", value: 95000000 },
    { year: "2024", value: 100000000 },
  ],
  dataSource: "人力资源和社会保障部、各地劳动部门",
};

// 所有数据库列表
export const ALL_DATABASES: DatabaseDetail[] = [
  patentDatabase,
  listedCompanyDatabase,
  enterpriseDatabase,
  financialDatabase,
  geoDatabase,
  academicDatabase,
  realEstateDatabase,
  biddingDatabase,
  taxDatabase,
  customsDatabase,
  environmentDatabase,
  laborDatabase,
];

// 按 ID 查找数据库
export const DATABASE_MAP: Record<string, DatabaseDetail> = ALL_DATABASES.reduce(
  (acc, db) => ({ ...acc, [db.id]: db }),
  {}
);

// 按分类获取数据库
export const getDatabasesByCategory = (categorySlug: string): DatabaseDetail[] =>
  ALL_DATABASES.filter((db) => db.categorySlug === categorySlug);
