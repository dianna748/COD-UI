import { useState } from "react";
import { X } from "lucide-react";

// 公众号与社群弹窗
function CommunityModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-base font-bold text-gray-900 mb-1 text-center">公众号与社群</h3>
        <p className="text-xs text-gray-500 text-center mb-6">扫码关注公众号或加入交流群</p>

        <div className="flex gap-6 justify-center">
          {/* 公众号 */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="/manus-storage/qr_official_account_019345ff.jpg"
              alt="公众号二维码"
              className="w-28 h-28 rounded-xl object-cover border border-gray-100"
            />
            <span className="text-xs font-medium text-gray-700">微信公众号</span>
            <span className="text-[11px] text-gray-400">CnOpenData</span>
          </div>
          {/* 交流群 */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="/manus-storage/qr_community_group_906d17bf.png"
              alt="交流群二维码"
              className="w-28 h-28 rounded-xl object-cover border border-gray-100"
            />
            <span className="text-xs font-medium text-gray-700">数据交流群</span>
            <span className="text-[11px] text-gray-400">扫码加入</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const footerLinks = [
  {
    title: "数据产品",
    links: [
      { label: "全部数据列表", href: "/databases" },
      { label: "专利数据", href: "/database/patent-innovation" },
      { label: "招聘数据", href: "/databases" },
      { label: "工商数据", href: "/database/enterprise-registration" },
      { label: "API 商店", href: "/api-store" },
    ],
  },
  {
    title: "研究支持",
    links: [
      { label: "已发表论文", href: "/papers" },
      { label: "应用场景", href: "/#scenarios" },
      { label: "数据定制服务", href: "/#contact" },
    ],
  },
  {
    title: "关于我们",
    links: [
      { label: "公司介绍", href: "/#about" },
      { label: "合作伙伴", href: "/#partners" },
      { label: "联系我们", href: "/#contact" },
      { label: "加入我们", href: "/#cooperation-flow" },
    ],
  },
];

export default function Footer() {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <>
      <footer style={{ background: "linear-gradient(135deg, #0F2B5E, #1A3A7A)" }}>
        <div className="container py-14">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #2E55A4, #4A7FFF)" }}
                >
                  Cn
                </div>
                <div>
                  <div className="font-bold text-white text-base">CnOpenData</div>
                  <div className="text-sm text-blue-400">中国开放数据</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                专注于中国另类大数据的采集与结构化，为学术研究与商业决策提供高价值数据资产。
              </p>
              <div className="flex gap-2">
                {["微博", "知乎", "微信"].map((s) => (
                  <a
                    key={s}
                    href="https://www.cnopendata.com"
                    className="px-2.5 py-1 rounded text-xs border transition-all duration-150 hover:bg-white/10"
                    style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4
                  className="text-sm font-bold uppercase tracking-wider mb-4"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 用户服务 */}
            <div>
              <h4
                className="text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                用户服务
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="/help"
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    帮助中心
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setShowCommunity(true)}
                    className="text-sm transition-colors hover:text-white text-left"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    公众号与社群
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex flex-wrap items-center gap-3 text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              <a href="https://www.cnopendata.com" className="hover:text-white/60 transition-colors">
                豫公网安备 41030402000080号
              </a>
              <span>·</span>
              <a href="https://www.cnopendata.com" className="hover:text-white/60 transition-colors">
                豫ICP备 20000518号-1
              </a>
            </div>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              © 2015–2025 CnOpenData. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showCommunity && <CommunityModal onClose={() => setShowCommunity(false)} />}
    </>
  );
}
