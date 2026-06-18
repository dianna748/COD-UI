import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronRight, Search, X } from "lucide-react";

interface DatabaseCategory {
  id: string;
  name: string;
  items: DatabaseItem[];
  isNew?: boolean;
}

interface DatabaseItem {
  id: string;
  name: string;
  isNew?: boolean;
}

interface DatabaseSidebarProps {
  categories: DatabaseCategory[];
  onItemClick?: (itemId: string) => void;
  activeItemId?: string;
}

export default function DatabaseSidebar({
  categories,
  onItemClick,
  activeItemId,
}: DatabaseSidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedCategories(new Set(filteredCategories.map((c) => c.id)));
    }
  }, [searchQuery, filteredCategories]);

  const totalCount = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  // 确保选中项所在分类处于展开状态
  useEffect(() => {
    if (!activeItemId) return;
    const owner = categories.find((cat) =>
      cat.items.some((it) => it.id === activeItemId)
    );
    if (owner && !expandedCategories.has(owner.id)) {
      setExpandedCategories((prev) => new Set(prev).add(owner.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItemId, categories]);

  // 进入页面 / 切换数据项时，自动将选中项滚动到可视区域
  useEffect(() => {
    if (!activeItemId) return;
    const id = window.setTimeout(() => {
      const el = activeItemRef.current;
      const container = listRef.current;
      if (!el || !container) return;
      const elTop = el.offsetTop;
      const elBottom = elTop + el.offsetHeight;
      const viewTop = container.scrollTop;
      const viewBottom = viewTop + container.clientHeight;
      if (elTop < viewTop || elBottom > viewBottom) {
        container.scrollTo({
          top: elTop - container.clientHeight / 2 + el.offsetHeight / 2,
          behavior: "smooth",
        });
      }
    }, 100);
    return () => window.clearTimeout(id);
  }, [activeItemId, expandedCategories]);

  return (
    <div
      className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-20 max-h-[calc(100vh-96px)]"
      style={{ boxShadow: "0 1px 8px 0 rgba(46,85,164,0.06)" }}
    >
      {/* 头部 */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            数据导航
          </span>
          <span className="text-[11px] text-gray-300">{totalCount} 个</span>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
          <input
            type="text"
            placeholder="搜索数据库…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-7 py-1.5 text-xs bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-[#2E55A4]/30 focus:ring-2 focus:ring-[#2E55A4]/10 transition-all placeholder-gray-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* 分隔线 */}
      <div className="h-px bg-gray-50 flex-shrink-0" />

      {/* 列表 */}
      <div ref={listRef} className="px-2 py-2 overflow-y-auto flex-1">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id} className="mb-0.5">
              {/* 分类标题 */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left group transition-colors hover:bg-gray-50"
              >
                <ChevronRight
                  size={12}
                  className={`text-gray-300 flex-shrink-0 transition-transform duration-200 ${
                    expandedCategories.has(category.id) ? "rotate-90" : ""
                  }`}
                />
                <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">
                  {category.name}
                </span>
                {category.isNew && (
                  <span className="ml-auto text-[10px] bg-amber-50 text-amber-500 px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0">
                    NEW
                  </span>
                )}
              </button>

              {/* 数据项 */}
              {expandedCategories.has(category.id) && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {category.items.map((item) => {
                    const isActive = activeItemId === item.id;
                    return (
                      <button
                        key={item.id}
                        ref={isActive ? activeItemRef : undefined}
                        onClick={() => onItemClick?.(item.id)}
                        className={`w-full flex items-start gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all duration-150 ${
                          isActive
                            ? "bg-[#2E55A4] text-white"
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full flex-shrink-0 mt-[7px] transition-colors ${
                            isActive ? "bg-white/70" : "bg-gray-300"
                          }`}
                        />
                        <span className="text-xs flex-1 leading-snug break-words">{item.name}</span>
                        {item.isNew && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-amber-50 text-amber-500"
                            }`}
                          >
                            NEW
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-xs text-gray-400 mb-2">未找到匹配的数据库</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#2E55A4] hover:text-[#1E3F8A] transition-colors"
            >
              清空搜索
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
