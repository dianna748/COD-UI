import { X, Phone, Mail } from "lucide-react";
import { SALES_TEAM } from "@/lib/salesTeam";

interface SalesContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SalesContactModal({ isOpen, onClose }: SalesContactModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1E3F8A] to-[#2E55A4] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-white">联系销售顾问</h2>
            <p className="text-white/60 text-xs mt-0.5">扫码或直接联系，我们将在 1 个工作日内回复</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {/* 五列销售卡片 */}
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SALES_TEAM.map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                {/* 二维码 */}
                <div className="w-full aspect-square rounded-xl bg-white border border-gray-100 p-2 flex items-center justify-center">
                  <img
                    src={person.qrCode}
                    alt={`${person.name}的微信二维码`}
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                {/* 姓名 + 职位 */}
                <p className="text-base font-bold text-gray-900 mt-3 leading-tight">{person.name}</p>
                <p className="text-xs text-gray-400 mb-2">{person.title}</p>
                {/* 邮箱 */}
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-blue-700 transition-colors w-full"
                  title={person.email}
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{person.email}</span>
                </a>
                {/* 电话 */}
                <a
                  href={`tel:${person.phone}`}
                  className="flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-blue-700 transition-colors mt-1.5"
                >
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{person.phone}</span>
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-5">
            微信扫码添加好友，或直接发送邮件 / 拨打电话联系
          </p>
        </div>
      </div>
    </div>
  );
}
