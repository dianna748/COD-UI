import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Home, ChevronRight, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalesContactModal from "@/components/SalesContactModal";

const faqs = [
  {
    q: "如何获取平台数据？",
    a: `平台数据分为 Open 数据、试用数据和直售数据 三类。

• Open 数据：带有"Open"标识的数据，可直接免费下载；
• 试用数据：个人中心展示的 52 个数据集属于试用数据。高校开通试用后，经认证的校内师生可免费下载完整数据；
• 直售数据：其余数据需通过采购授权后获取完整数据。

如需了解具体数据获取方式，欢迎联系销售顾问咨询。`,
  },
  {
    q: "数据更新频率是多少？",
    a: `不同数据集的更新频率有所不同。

• 大部分数据按年度更新；
• 部分数据支持实时或高频更新；
• 部分数据可根据客户需求提供专项更新服务。

具体更新时间请参考对应数据集详情页说明。`,
  },
  {
    q: "如何申请试用？",
    a: `您可向所在高校图书馆提出试用申请，由图书馆老师与我们的销售团队进行对接。

试用开通后，校内师生完成用户认证，并在学校 IP 范围内访问平台，即可免费下载试用数据。

如需协助申请试用，欢迎联系我们。`,
  },
  {
    q: "如何购买数据？",
    a: `您可以通过网站联系方式、在线客服或销售邮箱与我们取得联系。

我们的销售顾问将根据您的研究需求推荐合适的数据产品，并提供报价、样例数据及采购支持服务。`,
  },
  {
    q: "是否支持定制服务？",
    a: `支持。

除标准数据库产品外，我们还提供数据定制、数据清洗、指标构建、专题数据库开发、数据整合及持续更新等服务，可根据您的研究需求提供个性化解决方案。`,
  },
  {
    q: "数据可以用于发表论文吗？",
    a: `可以。

我们的数据已被众多高校、科研机构及研究人员广泛应用于学术论文、课题研究、毕业论文及实证分析项目。部分数据集还提供配套文档和字段说明，帮助研究人员快速开展研究工作。`,
  },
  {
    q: "购买后如何交付数据？",
    a: `数据通常以 Excel、CSV、Stata、SPSS、SQL 等常见格式交付，具体交付形式可根据客户需求确定。

数据验收通过后，我们还可提供必要的数据使用指导与技术支持。`,
  },
];

function FaqItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[0];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        open ? "border-blue-200 shadow-sm" : "border-gray-100 hover:border-blue-100"
      }`}
      style={{ background: open ? "#F8FAFF" : "#FAFBFF" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
      >
        <span className="flex items-center gap-3">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: open ? "#2E55A4" : "#E5E7EB", color: open ? "#fff" : "#6B7280" }}
          >
            Q
          </span>
          <span className={`text-sm font-semibold ${open ? "text-blue-700" : "text-gray-800"}`}>
            {faq.q}
          </span>
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-blue-500 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-5">
          <div className="pl-9">
            <pre className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-sans">
              {faq.a}
            </pre>

          </div>
        </div>
      )}
    </div>
  );
}

export default function HelpCenter() {
  const [showSalesModal, setShowSalesModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Home className="w-4 h-4 text-gray-400" />
            <a href="/" className="text-gray-500 hover:text-blue-600 transition-colors">首页</a>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium">帮助中心</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div
        className="py-16 text-center"
        style={{ background: "linear-gradient(135deg, #0F2B5E 0%, #1E3F8A 60%, #2E55A4 100%)" }}
      >
        <div className="container">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">帮助中心</h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto">
            常见问题解答，帮助您快速了解平台数据获取、购买与使用方式
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="container py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span
              className="w-1 h-5 rounded-full inline-block"
              style={{ background: "#2E55A4" }}
            />
            常见问题
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
              />
            ))}
          </div>

          {/* Still need help */}
          <div
            className="mt-10 rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, #EEF2FB, #F0F6FF)" }}
          >
            <p className="text-gray-700 font-semibold mb-2">还有其他问题？</p>
            <p className="text-sm text-gray-500 mb-5">
              我们的销售顾问将为您提供专业解答与一对一服务
            </p>
            <button
              onClick={() => setShowSalesModal(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #2550A0, #2E55A4)" }}
            >
              联系销售顾问
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <SalesContactModal isOpen={showSalesModal} onClose={() => setShowSalesModal(false)} />
    </div>
  );
}
