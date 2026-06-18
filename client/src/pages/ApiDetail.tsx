import { useEffect, useState } from "react";
import SalesContactModal from "@/components/SalesContactModal";
import { useRoute, Link } from "wouter";
import { API_MAP } from "@/data/apiData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CheckCircle2, AlertCircle, ArrowLeft, ExternalLink,
  Key, Copy, ChevronRight, Database, Code2, Tag, Clock,
  Shield, Zap, BookOpen, Activity
} from "lucide-react";
import { toast } from "sonner";

// ─── Design: 白色主背景，蓝色 (#2E55A4) 强调色，参数表格简洁专业
// ─── Layout: 左侧 sticky 导航 + 右侧内容区，顶部 Hero Banner

type TabKey = "overview" | "params" | "fields" | "code" | "errors";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "overview", label: "概述", icon: BookOpen },
  { key: "params", label: "请求参数", icon: Database },
  { key: "fields", label: "数据字段", icon: Tag },
  { key: "code", label: "代码示例", icon: Code2 },
  { key: "errors", label: "错误码", icon: Shield },
];

const BRAND = "#2E55A4";
const BRAND_LIGHT = "#EEF2FB";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success("已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors"
      style={{ background: copied ? "#D1FAE5" : "rgba(255,255,255,0.1)", color: copied ? "#065F46" : "rgba(255,255,255,0.7)" }}
    >
      <Copy className="w-3.5 h-3.5" />
      {copied ? "已复制" : "复制"}
    </button>
  );
}

export default function ApiDetail() {
  const [, params] = useRoute("/api-store/:slug");
  const slug = params?.slug ?? "";
  const api = API_MAP[slug];
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [codeLang, setCodeLang] = useState<"python" | "r" | "stata">("python");
  const [showSalesModal, setShowSalesModal] = useState(false);

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!api) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-xl font-semibold text-gray-700">未找到该 API</p>
          <Link href="/api-store" className="flex items-center gap-2 text-sm font-medium" style={{ color: BRAND }}>
            <ArrowLeft className="w-4 h-4" /> 返回 API 商店
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className="pt-16" style={{ background: `linear-gradient(135deg, #1E3F8A 0%, ${BRAND} 100%)` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/api-store" className="hover:text-white transition-colors">API 商店</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "rgba(255,255,255,0.9)" }}>{api.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{api.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                      {api.category}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${api.statusType === "active" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                      <Activity className="w-2.5 h-2.5" />
                      {api.statusType === "active" ? "运行中" : "Beta"}
                    </span>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white">{api.name}</h1>
                </div>
              </div>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "560px" }}>
                {api.shortDesc}
              </p>
              <div className="flex flex-wrap gap-2">
                {api.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full border" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Pricing cards */}
            <div className="flex gap-3 shrink-0">
              {api.pricingFree && (
                <div className="bg-white rounded-xl p-4 min-w-[140px]">
                  <p className="text-xs font-bold text-gray-500 mb-1">公开数据</p>
                  <p className="text-lg font-bold mb-2" style={{ color: BRAND }}>免费使用</p>
                  {api.pricingFree.features.map((f) => (
                    <p key={f} className="text-xs text-gray-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />{f}
                    </p>
                  ))}
                </div>
              )}
              <div className="rounded-xl p-4 min-w-[140px]" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <p className="text-xs font-bold mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>特色数据</p>
                <p className="text-lg font-bold text-white mb-2">联系报价</p>
                {api.pricingPaid.features.map((f) => (
                  <p key={f} className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                    <CheckCircle2 className="w-3 h-3 text-yellow-400 shrink-0" />{f}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* CTA bar */}
          <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            <a
              href="https://www.cnopendata.com/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-gray-900 hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #D4A574, #E8C9A0)" }}
            >
              <Key className="w-4 h-4" />
              获取免费 API Key
            </a>
            <a
              href={api.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)" }}
            >
              查看官方文档 <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/api-store"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <ArrowLeft className="w-4 h-4" /> 返回列表
            </Link>
          </div>
        </div>

        {/* Tab nav */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2"
                style={{
                  color: activeTab === key ? "white" : "rgba(255,255,255,0.55)",
                  borderBottomColor: activeTab === key ? "white" : "transparent",
                  background: "transparent",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left: Tab Content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* 概述 */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-base font-bold text-gray-900 mb-3">接口概述</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{api.overview}</p>
                  {api.dataStructure && (
                    <div className="mt-4 p-4 rounded-lg" style={{ background: BRAND_LIGHT }}>
                      <p className="text-xs font-bold mb-2" style={{ color: BRAND }}>数据内容与结构</p>
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{api.dataStructure}</pre>
                    </div>
                  )}
                </div>

                {/* Meta info */}
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-base font-bold text-gray-900 mb-4">基本信息</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: Activity, label: "维护状态", value: api.status },
                      { icon: Database, label: "数据来源", value: api.dataSource },
                      { icon: Clock, label: "覆盖时间", value: api.timeRange },
                      { icon: Zap, label: "接口类型", value: api.tags.join(" · ") },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: BRAND_LIGHT }}>
                          <Icon className="w-4 h-4" style={{ color: BRAND }} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                          <p className="text-sm text-gray-800 font-medium">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core features */}
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-base font-bold text-gray-900 mb-4">核心特点</h2>
                  <div className="space-y-3">
                    {api.coreFeatures.map((f) => (
                      <div key={f.title} className="flex items-start gap-3">
                        {f.type === "pro"
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          : <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{f.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Use cases */}
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <h2 className="text-base font-bold text-gray-900 mb-4">适用场景</h2>
                  <div className="space-y-2">
                    {api.useCases.map((uc, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-xs font-bold w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: BRAND_LIGHT, color: BRAND }}>
                          {i + 1}
                        </span>
                        <p className="text-sm text-gray-700">{uc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {api.notes.length > 0 && (
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <h2 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> 注意事项
                    </h2>
                    <ul className="space-y-2">
                      {api.notes.map((n, i) => (
                        <li key={i} className="text-xs text-amber-700 flex items-start gap-2">
                          <span className="shrink-0 mt-0.5">•</span>{n}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* 请求参数 */}
            {activeTab === "params" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-base font-bold text-gray-900">请求参数</h2>
                    <span className="text-xs text-gray-400">共 {api.requestParams.length} 个参数</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "#F8FAFF" }}>
                          <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">参数名称</th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">类型</th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">必填</th>
                          <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {api.requestParams.map((p) => (
                          <tr key={p.name} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-3.5">
                              <code className="text-xs font-mono font-bold px-2 py-1 rounded" style={{ background: BRAND_LIGHT, color: BRAND }}>
                                {p.name}
                              </code>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-xs font-mono text-gray-500">{p.type}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              {p.required
                                ? <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600">必填</span>
                                : <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">可选</span>}
                            </td>
                            <td className="px-4 py-3.5 text-xs text-gray-600">{p.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                {api.pagination && (
                  <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h2 className="text-base font-bold text-gray-900 mb-4">分页配置</h2>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "默认页大小", value: api.pagination.defaultSize, note: "每页默认返回条数" },
                        { label: "最大页数", value: api.pagination.maxPages, note: "允许请求的最大页码数" },
                        { label: "最大条数", value: api.pagination.maxRecords, note: "单次请求最多返回条数" },
                      ].map((item) => (
                        <div key={item.label} className="text-center p-4 rounded-xl" style={{ background: BRAND_LIGHT }}>
                          <p className="text-2xl font-bold mb-1" style={{ color: BRAND }}>{item.value}</p>
                          <p className="text-xs font-semibold text-gray-700 mb-1">{item.label}</p>
                          <p className="text-xs text-gray-400">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 数据字段 */}
            {activeTab === "fields" && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900">数据字段</h2>
                  <span className="text-xs text-gray-400">共 {api.fields.length} 个字段</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "#F8FAFF" }}>
                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">字段名称</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">类型</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">说明</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {api.fields.map((f) => (
                        <tr key={f.name} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3.5">
                            <code className="text-xs font-mono font-bold px-2 py-1 rounded" style={{ background: "#F0FDF4", color: "#065F46" }}>
                              {f.name}
                            </code>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs font-mono text-gray-500">{f.type}</span>
                          </td>
                          <td className="px-4 py-3.5 text-xs text-gray-600">{f.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 代码示例 */}
            {activeTab === "code" && (
              <div className="space-y-4">
                {/* Lang selector */}
                <div className="bg-white rounded-xl p-1.5 border border-gray-100 inline-flex gap-1">
                  {(["python", "r", "stata"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLang(lang)}
                      className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
                      style={
                        codeLang === lang
                          ? { background: BRAND, color: "white" }
                          : { color: "#6B7280", background: "transparent" }
                      }
                    >
                      {lang === "python" ? "Python" : lang === "r" ? "R" : "Stata"}
                    </button>
                  ))}
                </div>

                {/* Code block */}
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "#1E293B" }}>
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs font-mono text-gray-400 uppercase">{codeLang}</span>
                    <CopyButton text={api.codeSamples[codeLang]} />
                  </div>
                  <div className="p-5 overflow-x-auto" style={{ background: "#0F172A" }}>
                    <pre className="text-xs font-mono leading-relaxed text-blue-200 whitespace-pre">
                      <code>{api.codeSamples[codeLang]}</code>
                    </pre>
                  </div>
                </div>

                {/* Get API Key CTA */}
                <div className="rounded-xl p-5 flex items-center gap-4" style={{ background: BRAND_LIGHT, border: `1px solid ${BRAND}22` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: BRAND }}>
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">立即获取 API Key，开始使用</p>
                    <p className="text-xs text-gray-500 mt-0.5">注册即可获得免费配额，无需信用卡</p>
                  </div>
                  <a
                    href="https://www.cnopendata.com/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4 py-2 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
                    style={{ background: BRAND }}
                  >
                    免费注册
                  </a>
                </div>
              </div>
            )}

            {/* 错误码 */}
            {activeTab === "errors" && (
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-base font-bold text-gray-900">错误码说明</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "linear-gradient(135deg, #D4A574, #E8C9A0)" }}>
                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">错误码</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Message</th>
                        <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">含义</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {api.errorCodes.map((e) => (
                        <tr key={e.code} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3.5">
                            <code className={`text-xs font-mono font-bold px-2 py-1 rounded ${e.code === "0" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                              {e.code}
                            </code>
                          </td>
                          <td className="px-4 py-3.5">
                            <code className="text-xs font-mono text-gray-500">{e.message}</code>
                          </td>
                          <td className="px-4 py-3.5 text-xs text-gray-600">{e.meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="space-y-4">
            {/* Quick actions */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">快速操作</h3>
              <div className="space-y-2">
                <a
                  href="https://www.cnopendata.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #D4A574, #E8C9A0)" }}
                >
                  <Key className="w-4 h-4" />
                  获取免费 API Key
                </a>
                <a
                  href={api.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  查看官方文档
                </a>
                <button
                  onClick={() => setShowSalesModal(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:opacity-90"
                  style={{ borderColor: BRAND, color: BRAND }}
                >
                  联系报价
                </button>
              </div>
            </div>

            {/* Update history */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">更新历史</h3>
              <div className="space-y-3">
                {api.updateHistory.map((h) => (
                  <div key={h.version} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: BRAND }} />
                      <div className="w-px flex-1 mt-1" style={{ background: "#E5E7EB" }} />
                    </div>
                    <div className="pb-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold" style={{ color: BRAND }}>{h.version}</span>
                        <span className="text-xs text-gray-400">{h.date}</span>
                      </div>
                      <p className="text-xs text-gray-600">{h.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other APIs */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 mb-3">其他 API</h3>
              <Link href="/api-store" className="flex items-center gap-2 text-xs font-medium hover:underline" style={{ color: BRAND }}>
                浏览全部 API <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <SalesContactModal isOpen={showSalesModal} onClose={() => setShowSalesModal(false)} />
    </div>
  );
}
