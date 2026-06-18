import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Users, MessageCircle } from "lucide-react";

const navItems = [
  {
    label: "数据目录",
    href: "/databases",
    children: [
      { label: "全部数据库", href: "/databases" },
      { label: "专利数据", href: "/database/patent-innovation" },
      { label: "上市公司数据", href: "/database/listed-company" },
      { label: "工商企业数据", href: "/database/enterprise-registration" },
      { label: "金融市场数据", href: "/database/financial-market" },
      { label: "地理区域数据", href: "/database/geographic-data" },
      { label: "房地产数据", href: "/database/real-estate" },
    ],
  },
  { label: "API 商店", href: "/api-store" },
  { label: "学术论文", href: "/papers" },
  { label: "关于我们", href: "/#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white backdrop-blur-md border-b border-gray-100 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #0F2B5E, #1E3F8A)" }}
            >
              Cn
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-gray-900">
                CnOpenData
              </span>
              <span className="text-xs text-blue-600">中国开放数据</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-md text-lg font-medium transition-all duration-200 text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="p-2 rounded-md transition-colors text-gray-500 hover:text-blue-700 hover:bg-blue-50">
              <Search className="w-4 h-4" />
            </button>

            {/* 联系我们 + 加入我们 下拉 */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("contact-group")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="interactive-link flex items-center gap-1 px-4 py-2 text-lg font-medium rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
              >
                联系我们
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === "contact-group" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeDropdown === "contact-group" && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  <a
                    href="/#contact"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    联系我们
                  </a>
                  <div className="mx-3 my-1 border-t border-gray-100" />
                  <a
                    href="/#cooperation-flow"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    加入我们
                  </a>
                </div>
              )}
            </div>

            <a
              href="/login"
              className="interactive-link px-4 py-2 text-lg font-medium rounded-md text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              登录
            </a>
            <a
              href="/register"
              className="interactive-button px-4 py-2 text-lg font-semibold rounded-md text-white"
              style={{ background: "linear-gradient(135deg, #D4A574 0%, #E8C9A0 100%)" }}
            >
              免费注册
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-md transition-colors text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href="/#contact"
                className="interactive-link flex items-center justify-center gap-2 py-2.5 text-lg font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                联系我们
              </a>
              <a
                href="/#cooperation-flow"
                className="interactive-link flex items-center justify-center gap-2 py-2.5 text-lg font-medium text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50"
                onClick={() => setMobileOpen(false)}
              >
                <Users className="w-4 h-4" />
                加入我们
              </a>
              <a
                href="/login"
                className="interactive-link text-center py-2.5 text-lg font-medium text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50"
                onClick={() => setMobileOpen(false)}
              >
                登录
              </a>
              <a
                href="/register"
                className="interactive-button text-center py-2.5 text-lg font-semibold text-white rounded-lg"
                style={{ background: "linear-gradient(135deg, #D4A574 0%, #E8C9A0 100%)" }}
                onClick={() => setMobileOpen(false)}
              >
                免费注册
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
