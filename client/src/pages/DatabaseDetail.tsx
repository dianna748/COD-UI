// 设计风格：蓝白配色 #2E55A4，专业科技感，学术友好
// 结构：纵向下滑展示所有内容，固定导航按钮实现点击滚动定位

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams, Link, useLocation } from "wouter";
import { DATABASE_MAP, getDatabasesByCategory, ALL_DATABASES } from "@/data/databaseData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalesContactModal from "@/components/SalesContactModal";
import DatabaseSidebar from "@/components/DatabaseSidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Database,
  FileText,
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  Tag,
  Clock,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function DatabaseDetailPage() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const db = DATABASE_MAP[params.id || ""];
  const [expandedTable, setExpandedTable] = useState<number>(0);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string>(params.id || "");
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Section refs for scroll-to
  const overviewRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const papersRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveItemId(params.id || "");
  }, [params.id]);

  // 监听滚动，更新当前活跃的 section
  useEffect(() => {
    const handleScroll = () => {
      const offset = 140; // sticky nav height offset
      const sections = [
        { id: "overview", ref: overviewRef },
        { id: "fields", ref: fieldsRef },
        { id: "papers", ref: papersRef },
        { id: "pricing", ref: pricingRef },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= offset + 10) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 点击导航按钮滚动到对应区域
  const scrollToSection = useCallback((sectionId: string) => {
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      overview: overviewRef,
      fields: fieldsRef,
      papers: papersRef,
      pricing: pricingRef,
    };
    const ref = refMap[sectionId];
    if (ref?.current) {
      const offset = 130; // sticky nav height
      const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // 构建侧边栏数据：按分类分组显示所有数据库
  const sidebarCategories = useMemo(() => {
    if (!db) return [];
    
    // 按分类分组所有数据库
    const categories: Record<string, { id: string; name: string; items: { id: string; name: string }[] }> = {};
    
    ALL_DATABASES.forEach((database) => {
      if (!categories[database.categorySlug]) {
        categories[database.categorySlug] = {
          id: database.categorySlug,
          name: database.category,
          items: [],
        };
      }
      categories[database.categorySlug].items.push({
        id: database.id,
        name: database.name,
      });
    });
    
    // 转换为数组并按分类名称排序
    return Object.values(categories).sort((a, b) => a.name.localeCompare(b.name));
  }, [db]);

  // 处理侧边栏项目点击
  const handleSidebarItemClick = (itemId: string) => {
    setActiveItemId(itemId);
    setLocation(`/database/${itemId}`);
  };

  if (!db) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-200 mb-4">404</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">数据库未找到</h2>
            <p className="text-gray-500 mb-6">该数据库不存在或已下线</p>
            <Link href="/databases">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#2E55A4] text-white rounded-lg hover:bg-[#1e3f8a] transition-colors cursor-pointer">
                <ArrowLeft size={16} />
                返回数据目录
              </span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "数据概览", icon: <Database size={15} /> },
    { id: "fields", label: "字段展示", icon: <FileText size={15} /> },
    { id: "papers", label: "引用论文", icon: <BookOpen size={15} /> },
    { id: "pricing", label: "购买方式", icon: <Tag size={15} /> },
  ];

  // 格式化 Y 轴数字
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
    if (value >= 10000) return `${(value / 10000).toFixed(0)}万`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return String(value);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col">
      <Navbar />

      {/* 主容器：侧边栏 + 内容 */}
      <div className="flex flex-1">
        {/* 左侧侧边栏 */}
        <div className="hidden lg:block w-64 bg-[#f8f9fc] border-r border-gray-200 px-4 py-6">
          {db && sidebarCategories.length > 0 && (
            <DatabaseSidebar
              categories={sidebarCategories}
              onItemClick={handleSidebarItemClick}
              activeItemId={activeItemId}
            />
          )}
        </div>

        {/* 右侧内容 */}
        <div className="flex-1">
      {/* 面包屑 + 页面标题 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/">
              <span className="hover:text-[#2E55A4] cursor-pointer transition-colors">首页</span>
            </Link>
            <ChevronRight size={14} />
            <Link href="/databases">
              <span className="hover:text-[#2E55A4] cursor-pointer transition-colors">数据目录</span>
            </Link>
            <ChevronRight size={14} />
            <span className="text-gray-400">{db.category}</span>
            <ChevronRight size={14} />
            <span className="text-[#2E55A4] font-medium">{db.shortName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-[#2E55A4]/10 text-[#2E55A4] text-xs font-medium rounded-full">
                  {db.category}
                </span>
                <span className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                  <CheckCircle2 size={11} />
                  持续更新中
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{db.name}</h1>
              <p className="text-gray-600 text-base leading-relaxed max-w-2xl">{db.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {db.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 右侧快速信息卡 */}
            <div className="lg:w-72 bg-[#f0f4fb] rounded-xl p-5 border border-[#2E55A4]/10 flex-shrink-0">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-[#2E55A4] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">时间区间</div>
                    <div className="text-sm font-medium text-gray-800">{db.timeRange}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw size={16} className="text-[#2E55A4] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">更新频率</div>
                    <div className="text-sm font-medium text-gray-800">{db.updateFrequency}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Database size={16} className="text-[#2E55A4] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">数据规模</div>
                    <div className="text-sm font-medium text-gray-800">
                      <span className="text-xl font-bold text-[#2E55A4]">{db.dataScale}</span>
                      <span className="ml-1 text-gray-600">{db.dataScaleNote}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ExternalLink size={16} className="text-[#2E55A4] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">数据来源</div>
                    <div className="text-sm font-medium text-gray-800">{db.dataSource}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#2E55A4]/10 space-y-2">
                <a
                  href="https://www.cnopendata.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2E55A4] text-white text-sm font-medium rounded-lg hover:bg-[#1e3f8a] transition-colors"
                >
                  <Download size={15} />
                  申请数据试用
                </a>
                <a
                  href="mailto:service@cnopendata.com"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#2E55A4] text-sm font-medium rounded-lg border border-[#2E55A4]/30 hover:bg-[#f0f4fb] transition-colors"
                >
                  联系销售顾问
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 固定导航按钮栏 - 点击滚动定位 */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === item.id
                    ? "border-[#2E55A4] text-[#2E55A4]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 销售联系弹窗 */}
      <SalesContactModal isOpen={showSalesModal} onClose={() => setShowSalesModal(false)} />

      {/* 内容区域 - 所有模块纵向排列 */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">

        {/* ===== 数据概览 Section ===== */}
        <div ref={overviewRef} id="section-overview">
          <div className="space-y-8">
            {/* 数据介绍 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2E55A4] rounded-full inline-block"></span>
                数据介绍
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {db.longDescription}
              </div>
            </div>

            {/* 数据规模图表 */}
            {db.chartData && db.chartData.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#2E55A4] rounded-full inline-block"></span>
                  数据规模
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  {db.name}历年数据量统计（数据整理：CnOpenData）
                </p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={db.chartData}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tickFormatter={formatYAxis}
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString(), "数据量"]}
                        contentStyle={{
                          background: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "13px",
                        }}
                      />
                      <Bar dataKey="value" fill="#2E55A4" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* 应用场景 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2E55A4] rounded-full inline-block"></span>
                典型应用场景
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {db.useCases.map((useCase, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-[#f8f9fc] rounded-lg"
                  >
                    <span className="w-6 h-6 bg-[#2E55A4]/10 text-[#2E55A4] text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 数据表列表 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2E55A4] rounded-full inline-block"></span>
                包含数据表
              </h2>
              <div className="space-y-3">
                {db.tables.map((table, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-[#f8f9fc] rounded-lg border border-gray-100 hover:border-[#2E55A4]/30 transition-colors cursor-pointer"
                    onClick={() => {
                      setExpandedTable(i);
                      scrollToSection("fields");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#2E55A4]/10 rounded-lg flex items-center justify-center">
                        <Database size={15} className="text-[#2E55A4]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{table.name}</div>
                        {table.rowCount && (
                          <div className="text-xs text-gray-500 mt-0.5">{table.rowCount}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#2E55A4]">
                      <span>{table.fields.length} 个字段</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== 字段展示 Section ===== */}
        <div ref={fieldsRef} id="section-fields">
          <div className="space-y-6">
            {/* 数据表切换 */}
            {db.tables.length > 1 && (
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {db.tables.map((table, i) => (
                    <button
                      key={i}
                      onClick={() => setExpandedTable(i)}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                        expandedTable === i
                          ? "bg-[#2E55A4] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {table.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 字段表格 */}
            {db.tables[expandedTable] && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      {db.tables[expandedTable].name}
                    </h2>
                    {db.tables[expandedTable].rowCount && (
                      <p className="text-sm text-gray-500 mt-0.5">
                        数据量：{db.tables[expandedTable].rowCount}
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-[#2E55A4]/10 text-[#2E55A4] text-sm font-medium rounded-full">
                    {db.tables[expandedTable].fields.length} 个字段
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#f8f9fc]">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                          字段名称
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                          数据类型
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          字段说明
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {db.tables[expandedTable].fields.map((field, i) => (
                        <tr key={i} className="hover:bg-[#f8f9fc] transition-colors">
                          <td className="px-6 py-3.5">
                            <code className="text-sm font-mono font-semibold text-[#2E55A4] bg-[#2E55A4]/5 px-2 py-0.5 rounded">
                              {field.name}
                            </code>
                          </td>
                          <td className="px-6 py-3.5">
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {field.type}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-sm text-gray-600">
                            {field.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 样本数据提示 */}
            <div className="bg-[#f0f4fb] rounded-xl p-5 border border-[#2E55A4]/10">
              <div className="flex items-start gap-3">
                <Lock size={18} className="text-[#2E55A4] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-gray-800 mb-1">查看样本数据</div>
                  <p className="text-sm text-gray-600 mb-3">
                    注册账号后可免费查看前 100 条样本数据，确认数据质量后再决定购买。
                  </p>
                  <a
                    href="https://www.cnopendata.com/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#2E55A4] text-white text-sm font-medium rounded-lg hover:bg-[#1e3f8a] transition-colors"
                  >
                    免费注册查看样本
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== 引用论文 Section ===== */}
        <div ref={papersRef} id="section-papers">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#2E55A4] rounded-full inline-block"></span>
                已发表研究成果
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                以下论文使用了 CnOpenData 提供的{db.shortName}，发表于国内外顶级学术期刊。
              </p>
              <div className="space-y-4">
                {db.citedPapers.map((paper, i) => (
                  <div
                    key={i}
                    className="p-5 bg-[#f8f9fc] rounded-xl border border-gray-100 hover:border-[#2E55A4]/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#2E55A4] text-white text-sm font-bold rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-relaxed">
                          {paper.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen size={12} />
                            {paper.authors}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {paper.year}年
                          </span>
                          <span className="px-2 py-0.5 bg-[#2E55A4]/10 text-[#2E55A4] rounded-full font-medium">
                            {paper.journal}
                          </span>
                        </div>
                        {paper.doi && (
                          <a
                            href={`https://doi.org/${paper.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs text-[#2E55A4] hover:underline"
                          >
                            <ExternalLink size={11} />
                            DOI: {paper.doi}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* ===== 购买方式 Section ===== */}
        <div ref={pricingRef} id="section-pricing">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 商业分析版 - 左侧 */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-base font-bold text-gray-900 mb-2">商业分析版</div>
                <div className="text-lg font-medium text-gray-500 mb-4">面议</div>
                <div className="text-sm text-gray-600 mb-5">适合金融机构、咨询公司</div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    "完整历史数据访问",
                    "商业使用授权",
                    "API 接口访问",
                    "数据格式：全格式支持",
                    "专属客户经理",
                    "定制化数据服务",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowSalesModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f0f4fb] text-[#2E55A4] text-sm font-medium rounded-lg hover:bg-[#2E55A4] hover:text-white transition-colors"
                >
                  联系销售顾问
                </button>
              </div>

              {/* 学术研究版 - 中间（突出显示） */}
              <div className="bg-gradient-to-br from-[#2E55A4] to-[#1e3f8a] rounded-xl p-6 shadow-2xl relative overflow-hidden border border-[#2E55A4]/50">
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                    推荐
                  </span>
                </div>
                <div className="text-base font-bold text-white mb-2">学术研究版</div>
                <div className="text-lg font-medium text-blue-200 mb-4">面议</div>
                <div className="text-sm text-blue-100 mb-5">适合高校、科研机构</div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    "完整历史数据访问",
                    "学术引用授权",
                    "数据格式：CSV/Stata/Excel",
                    "技术支持（邮件）",
                    "可申请学术折扣",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-blue-100">
                      <CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowSalesModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#2E55A4] text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                >
                  联系获取报价
                </button>
              </div>

              {/* 企业定制版 - 右侧 */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-base font-bold text-gray-900 mb-2">企业定制版</div>
                <div className="text-lg font-medium text-gray-500 mb-4">定制</div>
                <div className="text-sm text-gray-600 mb-5">适合大型企业、政府机构</div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    "全量数据本地部署",
                    "多用户并发访问",
                    "数据私有化存储",
                    "专属技术支持团队",
                    "SLA 服务保障",
                    "定制数据采集与清洗",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowSalesModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f0f4fb] text-[#2E55A4] text-sm font-medium rounded-lg hover:bg-[#2E55A4] hover:text-white transition-colors"
                >
                  联系获取方案
                </button>
              </div>
            </div>

            {/* 试用说明 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4">获取数据流程</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { step: "01", title: "注册账号", desc: "免费注册 CnOpenData 账号" },
                  { step: "02", title: "查看样本", desc: "免费查看前 100 条样本数据" },
                  { step: "03", title: "联系销售", desc: "确认需求，获取报价方案" },
                  { step: "04", title: "获取数据", desc: "签订协议，下载完整数据集" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <div className="w-10 h-10 bg-[#2E55A4] text-white text-sm font-bold rounded-full flex items-center justify-center mx-auto mb-2">
                      {s.step}
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 销售联系弹窗 */}
      <SalesContactModal isOpen={showSalesModal} onClose={() => setShowSalesModal(false)} />
        </div>
      </div>

      {/* Footer 全幅显示 */}
      <Footer />
    </div>
  );
}
