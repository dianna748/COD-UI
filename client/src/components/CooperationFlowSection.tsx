import { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  MessageCircle,
  FileSignature,
  Rocket,
  Wallet,
  Search,
  Handshake,
  Database,
  Code2,
  Megaphone,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SalesContactModal from "./SalesContactModal";

type FlowType = "customization" | "cooperation" | "development";

type FlowStep = {
  title: string;
  brief: string;
  icon: LucideIcon;
};

type FlowConfig = {
  label: string;
  emoji: string;
  steps: FlowStep[];
};

// Streamlined copy: each step reduced to a title + a single-sentence highlight.
const flowData: Record<FlowType, FlowConfig> = {
  customization: {
    label: "数据定制",
    emoji: "📊",
    steps: [
      { title: "需求沟通", brief: "一对一明确数据用途、场景与预算", icon: MessageCircle },
      { title: "方案展示", brief: "提供同类产品与定制化方案", icon: Search },
      { title: "采集加工", brief: "爬虫/API/NLP 采集，多轮清洗校验", icon: Database },
      { title: "RA 深加工", brief: "统计分析、字段定制、数据融合", icon: Code2 },
      { title: "售后优化", brief: "即时响应，定期回访持续改进", icon: BarChart3 },
    ],
  },
  cooperation: {
    label: "代理合作",
    emoji: "🤝",
    steps: [
      { title: "意向对接", brief: "与官方客服沟通合作意向", icon: MessageCircle },
      { title: "签约培训", brief: "签署代理协议并完成产品培训", icon: FileSignature },
      { title: "推广执行", brief: "开发客户，销售团队协同支持", icon: Rocket },
      { title: "订单转化", brief: "商务经理对接达标客户签约", icon: Handshake },
      { title: "结算复盘", brief: "回款 7 日内结算，季度线上复盘", icon: Wallet },
    ],
  },
  development: {
    label: "数据开发",
    emoji: "💾",
    steps: [
      { title: "意向对接", brief: "提供学术背景与数据基本信息", icon: MessageCircle },
      { title: "技术洽谈", brief: "可行性评估并确认销售方案", icon: Search },
      { title: "协议签署", brief: "明确权属、分配与知识产权条款", icon: FileSignature },
      { title: "联合开发", brief: "联合工作组完成数据标准化", icon: Code2 },
      { title: "商业运营", brief: "全渠道推广，团队参与技术答疑", icon: Megaphone },
      { title: "结算优化", brief: "回款 7 日内结算，按反馈调整", icon: Wallet },
    ],
  },
};

const FLOW_TABS: { key: FlowType; label: string; emoji: string }[] = [
  { key: "customization", label: "数据定制", emoji: "📊" },
  { key: "cooperation", label: "代理合作", emoji: "🤝" },
  { key: "development", label: "数据开发", emoji: "💾" },
];

export default function CooperationFlowSection() {
  const [visible, setVisible] = useState(false);
  const [activeFlow, setActiveFlow] = useState<FlowType>("customization");
  const [contactOpen, setContactOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const steps = flowData[activeFlow].steps;

  return (
    <section
      id="cooperation-flow"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
      ref={ref}
    >
      <div className="container">
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-label mb-3">COOPERATION FLOW</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            数据合作流程
          </h2>
          <p className="text-gray-500 mt-2 max-w-2xl text-sm">
            数据定制、代理合作与数据开发，全流程专业服务，仅需几步即可启动合作。
          </p>
        </div>

        {/* Flow Type Tabs */}
        <div
          className={`flex gap-3 mb-12 flex-wrap transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {FLOW_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFlow(tab.key)}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 active:scale-[0.97] ${
                activeFlow === tab.key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal Flow Diagram */}
        {/* key forces remount on tab switch so the stagger animation replays */}
        <div key={activeFlow} className="relative">
          {/* Desktop / tablet: horizontal row */}
          <div className="hidden md:flex items-stretch">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;
              return (
                <div key={idx} className="flex items-stretch flex-1 min-w-0">
                  {/* Node card */}
                  <div
                    className={`group flex-1 min-w-0 transition-all ease-out ${
                      visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDuration: "600ms",
                      transitionDelay: visible ? `${idx * 90}ms` : "0ms",
                    }}
                  >
                    <div className="h-full bg-white rounded-2xl border border-gray-100 p-5 text-center hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-200 transition-all duration-300 flex flex-col items-center">
                      {/* Icon badge with step number */}
                      <div className="relative mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-300">
                          <Icon size={24} />
                        </div>
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-blue-900 text-xs font-bold flex items-center justify-center ring-2 ring-white">
                          {idx + 1}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {step.brief}
                      </p>
                    </div>
                  </div>

                  {/* Connector arrow */}
                  {!isLast && (
                    <div
                      className={`flex items-center justify-center px-1 lg:px-2 transition-all ease-out ${
                        visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                      }`}
                      style={{
                        transitionDuration: "400ms",
                        transitionDelay: visible ? `${idx * 90 + 45}ms` : "0ms",
                      }}
                    >
                      <ChevronRight
                        className="text-blue-300 shrink-0"
                        size={22}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden relative pl-4">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-blue-100" />
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className={`relative flex items-start gap-4 transition-all ease-out ${
                      visible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDuration: "500ms",
                      transitionDelay: visible ? `${idx * 80}ms` : "0ms",
                    }}
                  >
                    <div className="relative z-10 shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-md">
                        <Icon size={20} />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-blue-900 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {step.brief}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 rounded-2xl p-8 text-center transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            background: "linear-gradient(135deg, #1E3F8A 0%, #2E55A4 100%)",
            transitionDelay: visible ? "500ms" : "0ms",
          }}
        >
          <h3 className="text-xl font-bold text-white mb-2">准备开始合作？</h3>
          <p className="text-white/70 text-sm mb-6">
            联系我们的专业团队，为您提供定制化的合作方案。
          </p>
          <button
            onClick={() => setContactOpen(true)}
            className="px-6 py-3 bg-white font-bold rounded-lg hover:bg-white/90 active:scale-[0.97] transition-all flex items-center gap-2 mx-auto"
            style={{ color: "#1E3F8A" }}
          >
            立即联系 <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <SalesContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
