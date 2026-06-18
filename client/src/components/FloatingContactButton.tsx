import { useState } from "react";
import { MessageCircle, X, Mail, Phone, ChevronLeft } from "lucide-react";
import { SALES_TEAM } from "@/lib/salesTeam";


const BRAND_GRADIENT = "linear-gradient(135deg, #2550A0, #2E55A4)";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const current = SALES_TEAM.find((p) => p.id === selectedId);

  const closeAll = () => {
    setIsOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {/* 详情面板：单个销售经理的二维码 + 联系方式 */}
        {isOpen && current && (
          <div
            className="absolute bottom-20 right-0 w-80 rounded-2xl shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              border: "1px solid rgba(46, 85, 164, 0.12)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> 返回
              </button>
              <div className="text-right">
                <p className="text-base font-bold text-gray-900 leading-tight">{current.name}</p>
                <p className="text-xs text-gray-500">{current.title}</p>
              </div>
              <button
                onClick={closeAll}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 二维码 */}
            <div className="bg-white rounded-xl p-3 mb-3 flex flex-col items-center border border-gray-100">
              <img
                src={current.qrCode}
                alt={`${current.name}的微信二维码`}
                className="w-44 h-44 rounded-lg object-contain"
              />
              <p className="text-xs text-gray-500 mt-2">微信扫码添加 · {current.wechat}</p>
            </div>

            {/* 邮箱与电话明文展示 + 操作 */}
            <a
              href={`mailto:${current.email}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors mb-2"
            >
              <Mail size={18} className="text-[#2E55A4] flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400 leading-none mb-0.5">发送邮件</p>
                <p className="text-sm font-medium text-gray-900 truncate">{current.email}</p>
              </div>
            </a>
            <a
              href={`tel:${current.phone}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-green-50 transition-colors"
            >
              <Phone size={18} className="text-[#059669] flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400 leading-none mb-0.5">拨打电话</p>
                <p className="text-sm font-medium text-gray-900">{current.phone}</p>
              </div>
            </a>
          </div>
        )}

        {/* 列表面板：五位销售经理五行排列 */}
        {isOpen && !current && (
          <div
            className="absolute bottom-20 right-0 w-80 rounded-2xl shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
              border: "1px solid rgba(46, 85, 164, 0.12)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">联系销售顾问</h3>
              <button
                onClick={closeAll}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 五行排列，统一样式 */}
            <div className="flex flex-col gap-2">
              {SALES_TEAM.map((person) => (
                <button
                  key={person.id}
                  onClick={() => setSelectedId(person.id)}
                  className="group flex items-center gap-3 w-full p-2.5 rounded-xl border border-gray-200 hover:border-[#2E55A4] hover:bg-blue-50 transition-all duration-200 text-left"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: BRAND_GRADIENT }}
                  >
                    {person.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{person.name}</p>
                    <p className="text-xs text-gray-500 truncate">{person.title} · {person.wechat}</p>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180 group-hover:text-[#2E55A4] transition-colors" />
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              点击查看微信二维码与联系方式
            </p>
          </div>
        )}

        {/* 主按钮 */}
        <button
          onClick={() => {
            if (isOpen) {
              closeAll();
            } else {
              setIsOpen(true);
            }
          }}
          aria-label="联系销售"
          className="relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center text-white group"
          style={{ background: BRAND_GRADIENT }}
        >
          <div className="relative z-10 transition-all duration-300">
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </div>
          {!isOpen && (
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ background: BRAND_GRADIENT, opacity: 0.3 }}
            />
          )}
        </button>
      </div>

      {/* 遮罩 */}
      {isOpen && (
        <div className="fixed inset-0 z-30" onClick={closeAll} />
      )}
    </>
  );
}
