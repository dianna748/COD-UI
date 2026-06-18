// CnOpenData 数据目录页面
// 设计风格：蓝白配色 #2E55A4，专业科技感，学术友好
// 功能：分类筛选 + 搜索 + 数据库卡片列表 + 动态侧边栏导航

import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useParams } from "wouter";
import { ALL_DATABASES } from "@/data/databaseData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DatabaseSidebar from "@/components/DatabaseSidebar";
import {
  Search,
  Database,
  ChevronRight,
  RefreshCw,
  ArrowUpRight,
  Filter,
  Clock,
  Flame,
  X,
} from "lucide-react";

const CATEGORIES = [
  { slug: "all", label: "全部数据库", count: 0 },
  { slug: "patent", label: "专利数据", count: 0 },
  { slug: "listed-company", label: "上市公司数据", count: 0 },
  { slug: "enterprise", label: "工商企业数据", count: 0 },
  { slug: "financial", label: "金融数据", count: 0 },
  { slug: "geographic", label: "地理数据", count: 0 },
  { slug: "academic", label: "学术文献数据", count: 0 },
  { slug: "real-estate", label: "房地产数据", count: 0 },
];

const HOT_KEYWORDS = [
  "工商企业",
  "专利申请",
  "上市公司",
  "招投标",
  "房地产",
  "金融数据",
];

const SEARCH_SUGGESTIONS = [
  "中国企业数据",
  "专利信息",
  "金融市场",
  "地理信息",
  "学术文献",
];

interface RouteParams {
  category?: string;
}

export default function DatabasesPage() {
  const params = useParams<{ category?: string }>();
  const routeCategory = params.category;
  
  // 确定初始分类
  const isValidCategory = routeCategory ? CATEGORIES.some((cat) => cat.slug === routeCategory) : false;
  const initialCategory = isValidCategory ? (routeCategory as string) : "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItemId, setActiveItemId] = useState<string>("");
  const [isContextualMode, setIsContextualMode] = useState(initialCategory !== "all" && routeCategory !== undefined);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 当路由参数变化时更新分类
  useEffect(() => {
    if (routeCategory && isValidCategory) {
      setActiveCategory(routeCategory);
      setIsContextualMode(routeCategory !== "all");
    } else if (!routeCategory) {
      setActiveCategory("all");
      setIsContextualMode(false);
    }
  }, [routeCategory, isValidCategory]);

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 加载最近搜索记录
  useEffect(() => {
    const recent = localStorage.getItem("databaseRecentSearches");
    if (recent) {
      setRecentSearches(JSON.parse(recent).slice(0, 5));
    }
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("databaseRecentSearches", JSON.stringify(updated));
    }
  };

  const removeRecentSearch = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem("databaseRecentSearches", JSON.stringify(updated));
  };

  // 计算各分类数量
  const categoriesWithCount = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      ...cat,
      count:
        cat.slug === "all"
          ? ALL_DATABASES.length
          : ALL_DATABASES.filter((db) => db.categorySlug === cat.slug).length,
    }));
  }, []);

  // 过滤数据库
  const filteredDatabases = useMemo(() => {
    return ALL_DATABASES.filter((db) => {
      const matchCategory = activeCategory === "all" || db.categorySlug === activeCategory;
      const matchSearch =
        !searchQuery ||
        db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        db.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        db.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // 构建侧边栏数据 - 动态根据模式调整
  const sidebarCategories = useMemo(() => {
    if (isContextualMode && activeCategory !== "all") {
      // 局部模式：仅显示当前分类下的数据
      const currentCategory = CATEGORIES.find((cat) => cat.slug === activeCategory);
      if (!currentCategory) return [];

      return [
        {
          id: currentCategory.slug,
          name: currentCategory.label,
          items: ALL_DATABASES.filter((db) => db.categorySlug === activeCategory).map((db) => ({
            id: db.id,
            name: db.name,
          })),
        },
      ];
    }

    // 全局模式：显示所有分类
    return [
      {
        id: "patent" as const,
        name: "专利数据",
        items: ALL_DATABASES.filter((db) => db.categorySlug === "patent").map((db) => ({
          id: db.id,
          name: db.name,
        })),
      },
      {
        id: "listed-company" as const,
        name: "上市公司数据",
        items: ALL_DATABASES.filter((db) => db.categorySlug === "listed-company").map((db) => ({
          id: db.id,
          name: db.name,
        })),
      },
      {
        id: "enterprise" as const,
        name: "工商企业数据",
        items: ALL_DATABASES.filter((db) => db.categorySlug === "enterprise").map((db) => ({
          id: db.id,
          name: db.name,
        })),
      },
      {
        id: "financial" as const,
        name: "金融数据",
        items: ALL_DATABASES.filter((db) => db.categorySlug === "financial").map((db) => ({
          id: db.id,
          name: db.name,
        })),
      },
      {
        id: "geographic" as const,
        name: "地理数据",
        items: ALL_DATABASES.filter((db) => db.categorySlug === "geographic").map((db) => ({
          id: db.id,
          name: db.name,
        })),
      },
      {
        id: "academic" as const,
        name: "学术文献数据",
        items: ALL_DATABASES.filter((db) => db.categorySlug === "academic").map((db) => ({
          id: db.id,
          name: db.name,
        })),
      },
      {
        id: "real-estate" as const,
        name: "房地产数据",
        items: ALL_DATABASES.filter((db) => db.categorySlug === "real-estate").map((db) => ({
          id: db.id,
          name: db.name,
        })),
      },
    ];
  }, [isContextualMode, activeCategory]);

  const handleSidebarItemClick = (itemId: string) => {
    setActiveItemId(itemId);
    const element = document.getElementById(`db-${itemId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col">
      <Navbar />

      {/* 页面 Hero */}
      <div className="bg-[#2E55A4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
              <Link href="/">
                <span className="hover:text-white cursor-pointer transition-colors">首页</span>
              </Link>
              <ChevronRight size={14} />
              <span>数据目录</span>
              {isContextualMode && activeCategory !== "all" && (
                <>
                  <ChevronRight size={14} />
                  <span>{CATEGORIES.find((cat) => cat.slug === activeCategory)?.label}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              {isContextualMode && activeCategory !== "all"
                ? CATEGORIES.find((cat) => cat.slug === activeCategory)?.label
                : "数据目录"}
            </h1>
            <p className="text-blue-200 text-base leading-relaxed">
              {isContextualMode && activeCategory !== "all"
                ? `浏览${CATEGORIES.find((cat) => cat.slug === activeCategory)?.label}下的所有数据库`
                : "覆盖专利、上市公司、工商企业、金融市场、地理区域等多个领域，为学术研究和商业分析提供权威、可信的中国数据资源。"}
            </p>
          </div>

          {/* 搜索框 */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜索数据库名称、关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="w-full pl-11 pr-4 py-3 bg-white text-gray-900 rounded-xl border-0 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-gray-400"
              />

              {/* 搜索建议下拉菜单 */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg z-50 overflow-hidden">
                  {/* 最近搜索 */}
                  {recentSearches.length > 0 && (
                    <div className="border-b border-gray-100">
                      <div className="px-4 py-3 flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-500 uppercase">最近搜索</span>
                      </div>
                      <div className="px-2 pb-2 space-y-1">
                        {recentSearches.map((search, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                            onClick={() => {
                              setSearchQuery(search);
                              handleSearch(search);
                              searchInputRef.current?.focus();
                            }}
                          >
                            <span className="text-sm text-gray-700">{search}</span>
                            <X
                              size={14}
                              className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeRecentSearch(idx);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 热门关键词 */}
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-3 flex items-center gap-2">
                      <Flame size={14} className="text-orange-400" />
                      <span className="text-xs font-semibold text-gray-500 uppercase">热门关键词</span>
                    </div>
                    <div className="px-2 pb-2 space-y-1">
                      {HOT_KEYWORDS.map((keyword, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                          onClick={() => {
                            setSearchQuery(keyword);
                            handleSearch(keyword);
                          }}
                        >
                          {keyword}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 搜索建议 */}
                  <div>
                    <div className="px-4 py-3 flex items-center gap-2">
                      <Search size={14} className="text-gray-400" />
                      <span className="text-xs font-semibold text-gray-500 uppercase">搜索建议</span>
                    </div>
                    <div className="px-2 pb-2 space-y-1">
                      {SEARCH_SUGGESTIONS.map((suggestion, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            handleSearch(suggestion);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧侧边栏导航（桌面端） */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <DatabaseSidebar
              categories={sidebarCategories}
              onItemClick={handleSidebarItemClick}
              activeItemId={activeItemId}
            />
          </div>

          {/* 左侧分类导航（移动端） */}
          <div className="lg:hidden lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-20">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <Filter size={14} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">数据分类</span>
              </div>
              <div className="p-2">
                {categoriesWithCount.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setActiveCategory(cat.slug);
                      setIsContextualMode(cat.slug !== "all");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-[#2E55A4] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeCategory === cat.slug
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧数据库列表 */}
          <div className="flex-1">
            {/* 结果统计 */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                共找到{" "}
                <span className="font-semibold text-gray-800">{filteredDatabases.length}</span>{" "}
                个数据库
                {searchQuery && (
                  <span>
                    {" "}
                    · 搜索「
                    <span className="text-[#2E55A4]">{searchQuery}</span>」
                  </span>
                )}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  清除搜索
                </button>
              )}
            </div>

            {/* 数据库卡片网格 */}
            {filteredDatabases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDatabases.map((db) => (
                  <Link key={db.id} href={`/database/${db.id}`}>
                    <div
                      id={`db-${db.id}`}
                      className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer group p-5 ${
                        activeItemId === db.id
                          ? "border-[#2E55A4] bg-[#2E55A4]/5"
                          : "border-gray-100 hover:border-[#2E55A4]/30"
                      }`}
                    >
                      {/* 卡片头部 */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#2E55A4]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2E55A4] transition-colors">
                            <Database
                              size={18}
                              className="text-[#2E55A4] group-hover:text-white transition-colors"
                            />
                          </div>
                          <div>
                            <span className="text-xs text-[#2E55A4] font-medium">
                              {db.category}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="text-gray-300 group-hover:text-[#2E55A4] transition-colors"
                        />
                      </div>

                      {/* 数据库名称 */}
                      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#2E55A4] transition-colors">
                        {db.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {db.description}
                      </p>

                      {/* 数据规模 + 更新频率 */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Database size={12} className="text-[#2E55A4]" />
                          <span>
                            <span className="font-semibold text-gray-700">{db.dataScale}</span>{" "}
                            {db.dataScaleNote}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <RefreshCw size={12} className="text-[#2E55A4]" />
                          <span>{db.updateFrequency}</span>
                        </div>
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1.5">
                        {db.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {db.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                            +{db.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-700 mb-2">未找到相关数据库</h3>
                <p className="text-sm text-gray-500 mb-4">
                  尝试使用不同的关键词，或浏览全部数据库
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setIsContextualMode(false);
                  }}
                  className="px-4 py-2 bg-[#2E55A4] text-white text-sm rounded-lg hover:bg-[#1e3f8a] transition-colors"
                >
                  查看全部数据库
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
