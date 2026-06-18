// ─── API 数据定义 ─────────────────────────────────────────────────────────────
// 包含 6 个 API 的完整数据结构，用于详情页展示

export interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiField {
  name: string;
  type: string;
  description: string;
}

export interface ApiErrorCode {
  code: string;
  message: string;
  meaning: string;
}

export interface ApiData {
  id: string;
  slug: string;         // URL slug
  icon: string;
  name: string;
  shortDesc: string;
  category: string;
  tags: string[];
  status: string;
  statusType: "active" | "beta" | "deprecated";
  dataSource: string;
  timeRange: string;
  overview: string;     // 详细概述（支持换行）
  dataStructure?: string; // 数据内容与结构说明
  coreFeatures: { title: string; desc: string; type: "pro" | "con" }[];
  useCases: string[];
  requestParams: ApiParam[];
  pagination?: { defaultSize: number; maxPages: number; maxRecords: number };
  fields: ApiField[];
  errorCodes: ApiErrorCode[];
  pricingFree: { label: string; features: string[] } | null;
  pricingPaid: { label: string; features: string[] };
  notes: string[];
  updateHistory: { version: string; date: string; note: string }[];
  externalUrl: string;
  codeSamples: {
    python: string;
    r: string;
    stata: string;
  };
}

// ─── 1. 雪球实时数据 API ──────────────────────────────────────────────────────
const xueqiuApi: ApiData = {
  id: "xueqiu",
  slug: "xueqiu-posts",
  icon: "📈",
  name: "雪球实时数据 API",
  shortDesc: "提供高效的数据查询接口，支持多种查询条件和排序方式",
  category: "数据服务",
  tags: ["RESTful", "JSON", "实时", "查询"],
  status: "当前主力版本，持续更新维护",
  statusType: "active",
  dataSource: "针对性地从各个上市公司的雪球专属页面下方获取",
  timeRange: "从 2025 年开始采集，可回溯获取一定历史数据",
  overview: "雪球网上市公司文本系列数据（新版，持续维护）。新版数据根据内容类型拆分为三个独立、结构化的数据库：投资者发帖讨论、交易动态、新闻与公告。每条数据都包含对应的上市公司股票代码，方便进行公司级别的精准研究。",
  dataStructure: "新版数据根据内容类型拆分为三个独立、结构化的数据库：\n1. 投资者发帖讨论\n2. 交易动态\n3. 新闻与公告\n\n每条数据都包含对应的上市公司股票代码。",
  coreFeatures: [
    { title: "可关联公司", desc: "可识别上市公司代码，方便进行公司级别的精准研究", type: "pro" },
    { title: "结构化清晰", desc: "按内容类型分库，字段丰富，并包含大量社交互动指标", type: "pro" },
    { title: "历史数据有限", desc: "由于采集于 2025 年启动，2025 年前的数据（特别是投资者讨论）存在量级限制，从 2025 年起的数据完整性有保障", type: "con" },
  ],
  useCases: [
    "研究上市公司特定事件（如财报、重大重组）的市场反应",
    "分析投资者情绪与股价波动之间的关系",
    "公司治理、信息披露等相关研究",
  ],
  requestParams: [
    { name: "create_time_start", type: "Long", required: true, description: "帖子发布开始时间（时间戳，毫秒）" },
    { name: "create_time_end", type: "Long", required: true, description: "帖子发布结束时间（时间戳，毫秒）" },
    { name: "stock_code", type: "String", required: false, description: "股票代码，如 600519" },
    { name: "type", type: "String", required: false, description: "股票类型筛选" },
  ],
  pagination: { defaultSize: 20, maxPages: 1000, maxRecords: 1000 },
  fields: [
    { name: "id", type: "Int", description: "主键 ID" },
    { name: "stock_code", type: "String", description: "股票代码" },
    { name: "stock_name", type: "String", description: "股票名称" },
    { name: "user_id", type: "Long", description: "用户 ID" },
    { name: "user_name", type: "String", description: "用户昵称" },
    { name: "content", type: "String", description: "讨论内容" },
    { name: "source", type: "String", description: "来源平台或渠道" },
    { name: "like_count", type: "Int", description: "点赞数" },
    { name: "retweet_count", type: "Int", description: "转发数" },
    { name: "view_count", type: "Int", description: "浏览量" },
    { name: "reply_count", type: "Int", description: "回复数" },
    { name: "create_time", type: "Long", description: "创建时间（时间戳）" },
    { name: "retweet_from", type: "Int", description: "转发来源 ID" },
    { name: "stock_count", type: "Int", description: "关联股票数量" },
    { name: "discuss_type", type: "String", description: "数据类型" },
  ],
  errorCodes: [
    { code: "0", message: "success", meaning: "成功" },
    { code: "40001", message: "Missing valid token in request", meaning: "请求中缺少 Token" },
    { code: "40002", message: "Invalid token", meaning: "Token 无效" },
    { code: "50001", message: "Too Many Requests", meaning: "超出 API 调用频率限制" },
    { code: "50002", message: "Unknown error", meaning: "未知错误" },
  ],
  pricingFree: { label: "公开数据 · 免费使用", features: ["基础功能", "有限配额"] },
  pricingPaid: { label: "特色数据 · 联系报价", features: ["所有功能", "优先支持", "无限配额", "专属服务"] },
  notes: [
    "时间参数 create_time_start 和 create_time_end 为毫秒级时间戳，为必填参数",
    "2025 年以前的历史数据存在量级限制，建议结合其他数据源使用",
    "2025 年以后持续进行实时获取与更新",
  ],
  updateHistory: [{ version: "v2.0.0", date: "2025/1/1", note: "新版发布，按内容类型拆分为三个独立数据库" }],
  externalUrl: "https://www.cnopendata.com/api-port/xueqiu_posts/create_time_start=1763654400000&create_time_end=1763740800000",
  codeSamples: {
    python: `import requests

url = "https://api.cnopendata.com/v1/xueqiu/posts"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "create_time_start": 1735660800000,  # 2025-01-01
    "create_time_end":   1738339200000,  # 2025-02-01
    "stock_code": "600519",              # 可选：贵州茅台
    "page": 1,
    "page_size": 20
}

resp = requests.get(url, headers=headers, params=params)
data = resp.json()
print(f"共获取 {data['total']} 条记录")
for post in data["records"]:
    print(post["stock_code"], post["content"][:50])`,
    r: `library(httr)
library(jsonlite)

url <- "https://api.cnopendata.com/v1/xueqiu/posts"
headers <- c(Authorization = "Bearer YOUR_API_KEY")
params <- list(
  create_time_start = 1735660800000,
  create_time_end   = 1738339200000,
  stock_code = "600519",
  page = 1, page_size = 20
)

resp <- GET(url, add_headers(.headers=headers), query=params)
data <- fromJSON(content(resp, "text", encoding="UTF-8"))
cat("共获取", data$total, "条记录\n")
head(data$records[, c("stock_code","content","like_count")])`,
    stata: `* CnOpenData - 雪球数据 Stata 示例
python:
import requests, json

url = "https://api.cnopendata.com/v1/xueqiu/posts"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "create_time_start": 1735660800000,
    "create_time_end": 1738339200000,
    "stock_code": "600519"
}
resp = requests.get(url, headers=headers, params=params)
with open("xueqiu_data.json", "w") as f:
    json.dump(resp.json()["records"], f, ensure_ascii=False)
end

import delimited "xueqiu_data.json", clear
describe`,
  },
};

// ─── 2. 股吧实时数据 API ──────────────────────────────────────────────────────
const gubaApi: ApiData = {
  id: "guba",
  slug: "guba-posts",
  icon: "💬",
  name: "股吧实时数据 API",
  shortDesc: "提供高效的股吧数据查询接口，支持实时行情和历史数据查询",
  category: "数据服务",
  tags: ["RESTful", "JSON", "实时", "查询"],
  status: "持续更新维护",
  statusType: "active",
  dataSource: "东方财富股吧平台，覆盖全量上市公司讨论帖",
  timeRange: "2015 年至今，持续实时更新",
  overview: "覆盖东方财富股吧全量讨论数据，支持实时行情关联与历史数据回溯。数据包含帖子标题、正文内容、阅读量、评论数、发帖时间等核心字段，适合量化情绪因子研究与散户行为分析。",
  coreFeatures: [
    { title: "全量覆盖", desc: "覆盖沪深北三地交易所全部上市公司的股吧讨论数据", type: "pro" },
    { title: "历史数据丰富", desc: "数据回溯至 2015 年，时间跨度长，适合长期研究", type: "pro" },
    { title: "情绪指标完整", desc: "包含阅读量、评论数、点赞数等多维度互动指标", type: "pro" },
  ],
  useCases: [
    "量化情绪因子构建与回测",
    "散户行为与股价关系研究",
    "信息传播速度与市场反应分析",
    "舆情监控与风险预警",
  ],
  requestParams: [
    { name: "post_time_start", type: "Long", required: true, description: "发帖开始时间（时间戳，毫秒）" },
    { name: "post_time_end", type: "Long", required: true, description: "发帖结束时间（时间戳，毫秒）" },
    { name: "stock_code", type: "String", required: false, description: "股票代码，如 000001" },
    { name: "page", type: "Int", required: false, description: "页码，默认 1" },
    { name: "page_size", type: "Int", required: false, description: "每页条数，默认 20，最大 1000" },
  ],
  pagination: { defaultSize: 20, maxPages: 1000, maxRecords: 1000 },
  fields: [
    { name: "id", type: "Int", description: "主键 ID" },
    { name: "stock_code", type: "String", description: "股票代码" },
    { name: "stock_name", type: "String", description: "股票名称" },
    { name: "title", type: "String", description: "帖子标题" },
    { name: "content", type: "String", description: "帖子正文内容" },
    { name: "author", type: "String", description: "发帖用户名" },
    { name: "read_count", type: "Int", description: "阅读量" },
    { name: "comment_count", type: "Int", description: "评论数" },
    { name: "like_count", type: "Int", description: "点赞数" },
    { name: "post_time", type: "Long", description: "发帖时间（时间戳）" },
    { name: "last_reply_time", type: "Long", description: "最后回复时间（时间戳）" },
    { name: "is_elite", type: "Boolean", description: "是否精华帖" },
  ],
  errorCodes: [
    { code: "0", message: "success", meaning: "成功" },
    { code: "40001", message: "Missing valid token in request", meaning: "请求中缺少 Token" },
    { code: "40002", message: "Invalid token", meaning: "Token 无效" },
    { code: "50001", message: "Too Many Requests", meaning: "超出 API 调用频率限制" },
    { code: "50002", message: "Unknown error", meaning: "未知错误" },
  ],
  pricingFree: { label: "公开数据 · 免费使用", features: ["基础功能", "有限配额"] },
  pricingPaid: { label: "特色数据 · 联系报价", features: ["所有功能", "优先支持", "无限配额", "专属服务"] },
  notes: [
    "时间参数为毫秒级时间戳，单次查询时间跨度建议不超过 7 天",
    "精华帖（is_elite=true）通常具有更高的市场影响力",
  ],
  updateHistory: [{ version: "v1.0.0", date: "2026/1/1", note: "初始版本发布" }],
  externalUrl: "https://www.cnopendata.com/api-port/guba_posts/post_time_start=1740732671000&post_time_end=1761641832000",
  codeSamples: {
    python: `import requests

url = "https://api.cnopendata.com/v1/guba/posts"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "post_time_start": 1735660800000,
    "post_time_end":   1738339200000,
    "stock_code": "000001",
    "page": 1,
    "page_size": 50
}

resp = requests.get(url, headers=headers, params=params)
data = resp.json()
print(f"共获取 {data['total']} 条帖子")`,
    r: `library(httr); library(jsonlite)

url <- "https://api.cnopendata.com/v1/guba/posts"
params <- list(
  post_time_start = 1735660800000,
  post_time_end   = 1738339200000,
  stock_code = "000001"
)
resp <- GET(url, add_headers(Authorization="Bearer YOUR_API_KEY"), query=params)
data <- fromJSON(content(resp, "text", encoding="UTF-8"))
cat("共获取", data$total, "条帖子\n")`,
    stata: `python:
import requests, json
url = "https://api.cnopendata.com/v1/guba/posts"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"post_time_start": 1735660800000, "post_time_end": 1738339200000}
resp = requests.get(url, headers=headers, params=params)
with open("guba_data.json", "w") as f:
    json.dump(resp.json()["records"], f, ensure_ascii=False)
end
import delimited "guba_data.json", clear`,
  },
};

// ─── 3. A股上市公司基本信息 API ───────────────────────────────────────────────
const ashareBasicApi: ApiData = {
  id: "ashare-basic",
  slug: "ashare-basic",
  icon: "🏛️",
  name: "A股上市公司基本信息 API",
  shortDesc: "提供 A 股上市公司基本信息查询接口",
  category: "数据服务",
  tags: ["RESTful", "JSON", "查询"],
  status: "覆盖 A 股全市场，持续维护更新",
  statusType: "active",
  dataSource: "数据源自交易所公开披露",
  timeRange: "上市日期回溯至 1990 年 12 月至今，包含所有已退市公司记录",
  overview: "该接口提供 A 股上市公司的基础信息数据，包括股票代码、名称、上市日期、退市日期、行业、地域、实控人等详细信息。数据覆盖主板、创业板、科创板及 CDR 等市场，支持多条件筛选和分页查询。",
  coreFeatures: [
    { title: "全量股票基础信息", desc: "一次性获取沪深北三地交易所全部股票的基础数据，包括主板、创业板、科创板、北交所等市场类型", type: "pro" },
    { title: "多维度筛选", desc: "支持按上市状态（上市/退市/暂停）、交易所、市场类型等条件灵活筛选股票池", type: "pro" },
    { title: "关键属性覆盖", desc: "除代码、名称外，提供行业分类、注册地、上市/退市日期、实控人名称及性质等深度信息", type: "pro" },
    { title: "数据标准化", desc: "所有字段经过清洗和统一编码，便于机器读取和跨库关联", type: "pro" },
  ],
  useCases: [
    "量化选股策略的股票池构建",
    "行业分布与地域经济分析",
    "上市公司全生命周期研究（IPO、ST、退市）",
    "公司治理与股权结构分析",
    "基本面因子挖掘与回测",
  ],
  requestParams: [
    { name: "exchange_code", type: "String", required: false, description: "交易所代码：SSE（上交所）/ SZSE（深交所）/ BSE（北交所）" },
    { name: "list_status", type: "String", required: false, description: "上市状态：L（上市）/ D（退市）/ P（暂停）" },
    { name: "market_type", type: "String", required: false, description: "市场类型：主板 / 创业板 / 科创板 / 北交所" },
    { name: "page", type: "Int", required: false, description: "页码，默认 1" },
    { name: "page_size", type: "Int", required: false, description: "每页条数，默认 20，最大 1000" },
  ],
  pagination: { defaultSize: 20, maxPages: 1000, maxRecords: 1000 },
  fields: [
    { name: "stock_code", type: "String", description: "股票代码" },
    { name: "stock_name", type: "String", description: "股票名称" },
    { name: "exchange_code", type: "String", description: "交易所代码" },
    { name: "market_type", type: "String", description: "市场类型" },
    { name: "list_status", type: "String", description: "上市状态（L/D/P）" },
    { name: "list_date", type: "String", description: "上市日期（YYYY-MM-DD）" },
    { name: "delisting_date", type: "String", description: "退市日期（仅退市时有值）" },
    { name: "industry", type: "String", description: "行业分类" },
    { name: "province", type: "String", description: "注册省份" },
    { name: "city", type: "String", description: "注册城市" },
    { name: "controller_name", type: "String", description: "实控人名称" },
    { name: "controller_type", type: "String", description: "实控人性质" },
  ],
  errorCodes: [
    { code: "0", message: "success", meaning: "成功" },
    { code: "40001", message: "Missing valid token in request", meaning: "请求中缺少 Token" },
    { code: "40002", message: "Invalid token", meaning: "Token 无效" },
    { code: "50001", message: "Too Many Requests", meaning: "超出 API 调用频率限制" },
    { code: "50002", message: "Unknown error", meaning: "未知错误" },
  ],
  pricingFree: { label: "公开数据 · 免费使用", features: ["基础功能", "有限配额"] },
  pricingPaid: { label: "特色数据 · 联系报价", features: ["所有功能", "优先支持", "无限配额", "专属服务"] },
  notes: [
    "数据每天更新一次，更新时间为交易日收盘后",
    "实控人信息（controller_name）可能因公司定期报告披露而更新，非实时变动",
    "退市日期字段 delisting_date 仅在 list_status 为 D 时才有值，否则为空字符串",
  ],
  updateHistory: [{ version: "v1.0.0", date: "2026/3/6", note: "初始版本发布" }],
  externalUrl: "https://www.cnopendata.com/api-port/ashare-basic-api/exchange_code=BSE",
  codeSamples: {
    python: `import requests

url = "https://api.cnopendata.com/v1/ashare/basic"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "exchange_code": "SSE",   # 上交所
    "list_status": "L",       # 在市
    "market_type": "主板",
    "page": 1,
    "page_size": 100
}

resp = requests.get(url, headers=headers, params=params)
data = resp.json()
print(f"共 {data['total']} 家上市公司")
import pandas as pd
df = pd.DataFrame(data["records"])
print(df[["stock_code","stock_name","industry","province"]].head())`,
    r: `library(httr); library(jsonlite); library(dplyr)

url <- "https://api.cnopendata.com/v1/ashare/basic"
params <- list(exchange_code="SSE", list_status="L", page_size=100)
resp <- GET(url, add_headers(Authorization="Bearer YOUR_API_KEY"), query=params)
data <- fromJSON(content(resp, "text", encoding="UTF-8"))
df <- data$records
cat("共", data$total, "家上市公司\n")
df %>% select(stock_code, stock_name, industry, province) %>% head()`,
    stata: `python:
import requests, json
url = "https://api.cnopendata.com/v1/ashare/basic"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"exchange_code": "SSE", "list_status": "L", "page_size": 1000}
resp = requests.get(url, headers=headers, params=params)
with open("ashare_basic.json", "w") as f:
    json.dump(resp.json()["records"], f, ensure_ascii=False)
end
import delimited "ashare_basic.json", clear
describe`,
  },
};

// ─── 4. A股上市公司详细信息 API ───────────────────────────────────────────────
const ashareDetailApi: ApiData = {
  id: "ashare-detail",
  slug: "ashare-detail",
  icon: "📊",
  name: "A股上市公司详细信息 API",
  shortDesc: "提供 A 股上市公司详细信息数据查询接口",
  category: "数据服务",
  tags: ["RESTful", "JSON", "查询"],
  status: "覆盖 A 股全市场，持续维护更新",
  statusType: "active",
  dataSource: "交易所公开披露、上市公司年报、定期报告",
  timeRange: "覆盖 A 股全部历史上市公司，持续更新",
  overview: "提供 A 股上市公司深度数据查询，含财务指标、股权结构、高管信息等多维度数据，满足投研分析需求。支持按股票代码、交易所、行业等多条件精准筛选，数据经过标准化处理，便于量化研究使用。",
  coreFeatures: [
    { title: "深度财务数据", desc: "包含营收、净利润、ROE、市盈率等核心财务指标", type: "pro" },
    { title: "股权结构完整", desc: "大股东持股比例、股权集中度、质押情况等详细信息", type: "pro" },
    { title: "高管信息覆盖", desc: "董事会成员、高管薪酬、任职变动等治理数据", type: "pro" },
    { title: "定制化服务", desc: "可根据研究需求定制特定字段或数据范围", type: "pro" },
  ],
  useCases: [
    "基本面因子挖掘与量化回测",
    "股权结构与公司治理研究",
    "IPO 及退市全生命周期研究",
    "行业对比与竞争格局分析",
    "ESG 评级与可持续发展研究",
  ],
  requestParams: [
    { name: "exchange_code", type: "String", required: false, description: "交易所代码：SSE / SZSE / BSE" },
    { name: "stock_code", type: "String", required: false, description: "股票代码，如 920198.BJ" },
    { name: "page", type: "Int", required: false, description: "页码，默认 1" },
    { name: "page_size", type: "Int", required: false, description: "每页条数，默认 20，最大 1000" },
  ],
  pagination: { defaultSize: 20, maxPages: 1000, maxRecords: 1000 },
  fields: [
    { name: "stock_code", type: "String", description: "股票代码" },
    { name: "stock_name", type: "String", description: "股票名称" },
    { name: "total_revenue", type: "Float", description: "营业总收入（万元）" },
    { name: "net_profit", type: "Float", description: "净利润（万元）" },
    { name: "roe", type: "Float", description: "净资产收益率（%）" },
    { name: "pe_ratio", type: "Float", description: "市盈率" },
    { name: "pb_ratio", type: "Float", description: "市净率" },
    { name: "major_shareholder", type: "String", description: "第一大股东名称" },
    { name: "major_shareholder_ratio", type: "Float", description: "第一大股东持股比例（%）" },
    { name: "pledge_ratio", type: "Float", description: "股权质押比例（%）" },
    { name: "ceo_name", type: "String", description: "董事长/CEO 姓名" },
    { name: "employee_count", type: "Int", description: "员工总数" },
    { name: "report_date", type: "String", description: "报告期（YYYY-MM-DD）" },
  ],
  errorCodes: [
    { code: "0", message: "success", meaning: "成功" },
    { code: "40001", message: "Missing valid token in request", meaning: "请求中缺少 Token" },
    { code: "40002", message: "Invalid token", meaning: "Token 无效" },
    { code: "50001", message: "Too Many Requests", meaning: "超出 API 调用频率限制" },
    { code: "50002", message: "Unknown error", meaning: "未知错误" },
  ],
  pricingFree: null,
  pricingPaid: { label: "特色数据 · 请联系我们获取报价", features: ["所有功能", "优先支持", "无限配额", "专属服务", "定制字段"] },
  notes: [
    "财务数据基于最新披露的年报或季报，更新频率与上市公司披露周期一致",
    "部分字段（如高管薪酬）仅在年报披露后更新",
  ],
  updateHistory: [{ version: "v1.0.0", date: "2026/3/6", note: "初始版本发布" }],
  externalUrl: "https://www.cnopendata.com/api-port/ssgsxxxx-posts/exchange_code=BSE&stock_code=920198.BJ",
  codeSamples: {
    python: `import requests

url = "https://api.cnopendata.com/v1/ashare/detail"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "exchange_code": "BSE",
    "stock_code": "920198.BJ",
    "page": 1,
    "page_size": 50
}

resp = requests.get(url, headers=headers, params=params)
data = resp.json()
import pandas as pd
df = pd.DataFrame(data["records"])
print(df[["stock_code","stock_name","roe","pe_ratio"]].head())`,
    r: `library(httr); library(jsonlite)

url <- "https://api.cnopendata.com/v1/ashare/detail"
params <- list(exchange_code="BSE", stock_code="920198.BJ")
resp <- GET(url, add_headers(Authorization="Bearer YOUR_API_KEY"), query=params)
data <- fromJSON(content(resp, "text", encoding="UTF-8"))
print(data$records[, c("stock_code","roe","pe_ratio")])`,
    stata: `python:
import requests, json
url = "https://api.cnopendata.com/v1/ashare/detail"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"exchange_code": "BSE", "stock_code": "920198.BJ"}
resp = requests.get(url, headers=headers, params=params)
with open("ashare_detail.json", "w") as f:
    json.dump(resp.json()["records"], f, ensure_ascii=False)
end
import delimited "ashare_detail.json", clear`,
  },
};

// ─── 5. 中国二手房成交数据 API ────────────────────────────────────────────────
const houseTurnoverApi: ApiData = {
  id: "house-turnover",
  slug: "house-turnover",
  icon: "🏠",
  name: "中国二手房成交数据 API",
  shortDesc: "提供中国二手房成交数据查询接口",
  category: "数据服务",
  tags: ["RESTful", "JSON", "查询"],
  status: "持续维护更新",
  statusType: "active",
  dataSource: "全国主要城市房产交易平台及公开成交记录",
  timeRange: "覆盖近五年主要城市成交数据，持续更新",
  overview: "覆盖全国主要城市二手房成交记录，含成交价格、面积、楼层、装修等字段，支持城市与时间维度筛选。数据经过清洗标准化，适合房价趋势研究、城市化分析及住房政策评估等学术研究场景。",
  coreFeatures: [
    { title: "城市覆盖广", desc: "覆盖北京、上海、广州、深圳等全国 50+ 主要城市", type: "pro" },
    { title: "字段丰富", desc: "包含成交价格、单价、面积、楼层、朝向、装修、建筑年代等详细字段", type: "pro" },
    { title: "时间序列完整", desc: "支持按月、季度、年度聚合分析，适合趋势研究", type: "pro" },
  ],
  useCases: [
    "城市房价趋势研究与预测",
    "住房政策效果评估",
    "城市化进程与人口流动分析",
    "房地产市场周期研究",
  ],
  requestParams: [
    { name: "city", type: "String", required: false, description: "城市名称，如 北京、上海" },
    { name: "date_start", type: "String", required: false, description: "成交开始日期（YYYY-MM-DD）" },
    { name: "date_end", type: "String", required: false, description: "成交结束日期（YYYY-MM-DD）" },
    { name: "page", type: "Int", required: false, description: "页码，默认 1" },
    { name: "page_size", type: "Int", required: false, description: "每页条数，默认 20，最大 1000" },
  ],
  pagination: { defaultSize: 20, maxPages: 1000, maxRecords: 1000 },
  fields: [
    { name: "id", type: "Int", description: "主键 ID" },
    { name: "city", type: "String", description: "城市" },
    { name: "district", type: "String", description: "行政区" },
    { name: "community_name", type: "String", description: "小区名称" },
    { name: "total_price", type: "Float", description: "成交总价（万元）" },
    { name: "unit_price", type: "Float", description: "成交单价（元/㎡）" },
    { name: "area", type: "Float", description: "建筑面积（㎡）" },
    { name: "floor", type: "String", description: "楼层信息" },
    { name: "orientation", type: "String", description: "朝向" },
    { name: "decoration", type: "String", description: "装修情况" },
    { name: "build_year", type: "Int", description: "建筑年代" },
    { name: "deal_date", type: "String", description: "成交日期（YYYY-MM-DD）" },
  ],
  errorCodes: [
    { code: "0", message: "success", meaning: "成功" },
    { code: "40001", message: "Missing valid token in request", meaning: "请求中缺少 Token" },
    { code: "40002", message: "Invalid token", meaning: "Token 无效" },
    { code: "50001", message: "Too Many Requests", meaning: "超出 API 调用频率限制" },
    { code: "50002", message: "Unknown error", meaning: "未知错误" },
  ],
  pricingFree: null,
  pricingPaid: { label: "特色数据 · 请联系我们获取报价", features: ["所有功能", "优先支持", "无限配额", "专属服务"] },
  notes: [
    "数据覆盖城市以一、二线城市为主，三四线城市数据相对有限",
    "成交价格为实际成交价，非挂牌价",
  ],
  updateHistory: [{ version: "v1.0.0", date: "2026/2/1", note: "初始版本发布" }],
  externalUrl: "https://www.cnopendata.com/api-port/resold_apartment_turnover_china/exchange_code=BSE&stock_code=920198.BJ",
  codeSamples: {
    python: `import requests

url = "https://api.cnopendata.com/v1/realestate/turnover"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "city": "北京",
    "date_start": "2024-01-01",
    "date_end": "2024-12-31",
    "page_size": 100
}

resp = requests.get(url, headers=headers, params=params)
data = resp.json()
import pandas as pd
df = pd.DataFrame(data["records"])
print(df.groupby("district")["unit_price"].mean().sort_values(ascending=False))`,
    r: `library(httr); library(jsonlite); library(dplyr)

url <- "https://api.cnopendata.com/v1/realestate/turnover"
params <- list(city="北京", date_start="2024-01-01", date_end="2024-12-31")
resp <- GET(url, add_headers(Authorization="Bearer YOUR_API_KEY"), query=params)
data <- fromJSON(content(resp, "text", encoding="UTF-8"))
df <- data$records
df %>% group_by(district) %>% summarise(avg_price=mean(unit_price)) %>% arrange(desc(avg_price))`,
    stata: `python:
import requests, json
url = "https://api.cnopendata.com/v1/realestate/turnover"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"city": "北京", "date_start": "2024-01-01", "date_end": "2024-12-31"}
resp = requests.get(url, headers=headers, params=params)
with open("house_turnover.json", "w") as f:
    json.dump(resp.json()["records"], f, ensure_ascii=False)
end
import delimited "house_turnover.json", clear`,
  },
};

// ─── 6. 中国二手房挂牌数据 API ────────────────────────────────────────────────
const houseListingApi: ApiData = {
  id: "house-listing",
  slug: "house-listing",
  icon: "🔑",
  name: "中国二手房挂牌数据 API",
  shortDesc: "提供中国二手房挂牌数据查询接口",
  category: "数据服务",
  tags: ["RESTful", "JSON", "查询"],
  status: "持续维护更新",
  statusType: "active",
  dataSource: "全国主要城市房产中介平台在售挂牌数据",
  timeRange: "覆盖近三年主要城市挂牌数据，持续更新",
  overview: "提供全国主要城市二手房在售挂牌数据，含挂牌价格、挂牌时长、房源特征等，适合供需关系研究。与成交数据配合使用，可构建完整的二手房市场分析框架。",
  coreFeatures: [
    { title: "实时挂牌数据", desc: "反映当前市场供给侧状况，与成交数据形成完整市场画像", type: "pro" },
    { title: "挂牌时长追踪", desc: "记录房源从挂牌到成交/下架的完整周期，适合流动性研究", type: "pro" },
    { title: "价格调整记录", desc: "包含历史调价记录，反映卖方预期变化", type: "pro" },
  ],
  useCases: [
    "二手房市场供需关系研究",
    "房价预测模型构建",
    "区域价格对比与分化研究",
    "住房流动性与市场效率分析",
  ],
  requestParams: [
    { name: "city", type: "String", required: false, description: "城市名称，如 上海、深圳" },
    { name: "district", type: "String", required: false, description: "行政区名称" },
    { name: "list_date_start", type: "String", required: false, description: "挂牌开始日期（YYYY-MM-DD）" },
    { name: "list_date_end", type: "String", required: false, description: "挂牌结束日期（YYYY-MM-DD）" },
    { name: "page", type: "Int", required: false, description: "页码，默认 1" },
    { name: "page_size", type: "Int", required: false, description: "每页条数，默认 20，最大 1000" },
  ],
  pagination: { defaultSize: 20, maxPages: 1000, maxRecords: 1000 },
  fields: [
    { name: "id", type: "Int", description: "主键 ID" },
    { name: "city", type: "String", description: "城市" },
    { name: "district", type: "String", description: "行政区" },
    { name: "community_name", type: "String", description: "小区名称" },
    { name: "list_price", type: "Float", description: "挂牌总价（万元）" },
    { name: "list_unit_price", type: "Float", description: "挂牌单价（元/㎡）" },
    { name: "area", type: "Float", description: "建筑面积（㎡）" },
    { name: "list_date", type: "String", description: "挂牌日期（YYYY-MM-DD）" },
    { name: "list_days", type: "Int", description: "挂牌天数" },
    { name: "price_adjust_count", type: "Int", description: "调价次数" },
    { name: "floor", type: "String", description: "楼层信息" },
    { name: "decoration", type: "String", description: "装修情况" },
    { name: "status", type: "String", description: "挂牌状态（在售/已售/已下架）" },
  ],
  errorCodes: [
    { code: "0", message: "success", meaning: "成功" },
    { code: "40001", message: "Missing valid token in request", meaning: "请求中缺少 Token" },
    { code: "40002", message: "Invalid token", meaning: "Token 无效" },
    { code: "50001", message: "Too Many Requests", meaning: "超出 API 调用频率限制" },
    { code: "50002", message: "Unknown error", meaning: "未知错误" },
  ],
  pricingFree: null,
  pricingPaid: { label: "特色数据 · 请联系我们获取报价", features: ["所有功能", "优先支持", "无限配额", "专属服务"] },
  notes: [
    "挂牌数据每日更新，反映当日在售房源情况",
    "已售或已下架房源将保留历史记录，可用于市场回溯分析",
  ],
  updateHistory: [{ version: "v1.0.0", date: "2026/2/1", note: "初始版本发布" }],
  externalUrl: "https://www.cnopendata.com/api-port/resold_apartment_sell_china/exchange_code=BSE&stock_code=920198.BJ",
  codeSamples: {
    python: `import requests

url = "https://api.cnopendata.com/v1/realestate/listing"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {
    "city": "上海",
    "district": "浦东新区",
    "list_date_start": "2024-01-01",
    "page_size": 100
}

resp = requests.get(url, headers=headers, params=params)
data = resp.json()
import pandas as pd
df = pd.DataFrame(data["records"])
print(f"在售房源：{len(df)} 套，均价：{df['list_unit_price'].mean():.0f} 元/㎡")`,
    r: `library(httr); library(jsonlite)

url <- "https://api.cnopendata.com/v1/realestate/listing"
params <- list(city="上海", district="浦东新区", list_date_start="2024-01-01")
resp <- GET(url, add_headers(Authorization="Bearer YOUR_API_KEY"), query=params)
data <- fromJSON(content(resp, "text", encoding="UTF-8"))
cat("在售房源:", nrow(data$records), "套\n")`,
    stata: `python:
import requests, json
url = "https://api.cnopendata.com/v1/realestate/listing"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
params = {"city": "上海", "district": "浦东新区"}
resp = requests.get(url, headers=headers, params=params)
with open("house_listing.json", "w") as f:
    json.dump(resp.json()["records"], f, ensure_ascii=False)
end
import delimited "house_listing.json", clear`,
  },
};

// ─── 导出所有 API ─────────────────────────────────────────────────────────────
export const ALL_APIS: ApiData[] = [
  xueqiuApi,
  gubaApi,
  ashareBasicApi,
  ashareDetailApi,
  houseTurnoverApi,
  houseListingApi,
];

export const API_MAP: Record<string, ApiData> = Object.fromEntries(
  ALL_APIS.map((a) => [a.slug, a])
);
