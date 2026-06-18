import { useState, useEffect, useRef } from "react";
import { Mail, Phone, ArrowRight, X } from "lucide-react";
import { SALES_TEAM } from "@/lib/salesTeam";

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [activeForm, setActiveForm] = useState<"personal" | "academic" | "institution" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", affiliation: "", email: "", research: "", consultationType: "", groupSize: "", phone: "" });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", affiliation: "", email: "", research: "", consultationType: "", groupSize: "", phone: "" });
      setActiveForm(null);
    }, 2000);
  };

  const renderForm = () => {
    const formConfigs = {
      personal: {
        title: "个人申请定制方案",
        subtitle: "填写信息，我们将为您提供专属数据方案",
        fields: ["name", "affiliation", "email", "consultationType", "research"],
      },
      academic: {
        title: "申请课题组方案",
        subtitle: "为您的课题组提供专属数据定制服务",
        fields: ["name", "affiliation", "email", "research", "groupSize"],
      },
      institution: {
        title: "机构合作申请",
        subtitle: "为您的机构提供定制化合作方案",
        fields: ["name", "affiliation", "email", "phone"],
      },
    };

    const config = formConfigs[activeForm!];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{config.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{config.subtitle}</p>
            </div>
            <button
              onClick={() => setActiveForm(null)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">提交成功！</h3>
              <p className="text-sm text-gray-500">我们将在 1-2 个工作日内与您联系。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {config.fields.includes("name") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">姓名 *</label>
                  <input
                    type="text"
                    required
                    placeholder="请输入您的姓名"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              )}
              {config.fields.includes("affiliation") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">所在机构 *</label>
                  <input
                    type="text"
                    required
                    placeholder={activeForm === "institution" ? "如：北京大学图书馆" : "如：北京大学 / 会计学院"}
                    value={form.affiliation}
                    onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              )}
              {config.fields.includes("email") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">邮箱地址 *</label>
                  <input
                    type="email"
                    required
                    placeholder="请输入您的邮箱地址"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              )}
              {config.fields.includes("consultationType") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">咨询类型 *</label>
                  <select
                    required
                    value={form.consultationType}
                    onChange={(e) => setForm({ ...form, consultationType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  >
                    <option value="">请选择咨询类型</option>
                    <option value="数据定制">数据定制</option>
                    <option value="课题组合作">课题组合作</option>
                    <option value="机构采购">机构采购</option>
                    <option value="API接入">API接入</option>
                    <option value="其他咨询">其他咨询</option>
                  </select>
                </div>
              )}
              {config.fields.includes("research") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">研究方向</label>
                  <input
                    type="text"
                    placeholder="如：审计质量、公司治理、劳动经济等"
                    value={form.research}
                    onChange={(e) => setForm({ ...form, research: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              )}
              {config.fields.includes("groupSize") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">课题组人数 *</label>
                  <input
                    type="number"
                    required
                    placeholder="请输入课题组人数"
                    value={form.groupSize}
                    onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              )}
              {config.fields.includes("phone") && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">联系电话 *</label>
                  <input
                    type="tel"
                    required
                    placeholder="请输入您的联系电话"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-md"
                style={{ background: "linear-gradient(135deg, #2550A0, #2E55A4)" }}
              >
                提交申请 →
              </button>
              <p className="text-xs text-gray-400 text-center">
                提交后 1-2 个工作日内回复
              </p>
            </form>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
      <div className="container">
        <div className={`mb-10 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="section-label mb-3">CONTACT US</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">联系我们</h2>
          <p className="text-gray-500 mt-2 max-w-xl text-sm">
            无论是数据咨询、课题组合作还是机构采购，我们都期待与您交流。
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Left: Options + Sales Team */}
          <div className={`space-y-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            {/* Option Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: "🎓",
                  title: "申请课题组方案",
                  desc: "针对课题组、博士研究生的专属数据定制服务，提供数据提取、清洗、匹配等全流程支持。",
                  cta: "申请课题组方案",
                  action: () => setActiveForm("academic"),
                  btnStyle: { background: "linear-gradient(135deg, #0F2B5E, #1E3F8A)" },
                },
                {
                  icon: "🏛",
                  title: "机构合作",
                  desc: "为高校图书馆、研究院、金融机构提供数据授权与定制化合作方案，欢迎联系洽谈。",
                  cta: "联系机构合作",
                  action: () => setActiveForm("institution"),
                  btnStyle: { background: "linear-gradient(135deg, #065F46, #059669)" },
                },
                {
                  icon: "🚀",
                  title: "立即注册使用",
                  desc: "免费注册即可浏览数据目录，购买后立即获取数据，支持多种格式下载。",
                  cta: "免费注册",
                  href: "/register",
                  btnStyle: { background: "linear-gradient(135deg, #92400E, #D97706)" },
                },
              ].map((opt, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 bg-blue-50">
                    {opt.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{opt.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">{opt.desc}</p>
                    {opt.href ? (
                      <a
                        href={opt.href}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                        style={opt.btnStyle}
                      >
                        {opt.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={opt.action}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                        style={opt.btnStyle}
                      >
                        {opt.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`rounded-2xl border border-gray-100 p-7 shadow-sm transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ background: "#F8FAFC" }}
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">提交成功！</h3>
                <p className="text-sm text-gray-500">我们将在 1-2 个工作日内与您联系。</p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-bold text-gray-900 mb-1">个人申请定制方案</h3>
                <p className="text-xs text-gray-500 mb-5">填写信息，我们将为您提供专属数据方案</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">姓名 *</label>
                    <input
                      type="text"
                      required
                      placeholder="请输入您的姓名"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">所在机构 *</label>
                    <input
                      type="text"
                      required
                      placeholder="如：北京大学 / 会计学院 / 博士研究生"
                      value={form.affiliation}
                      onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">邮箱地址 *</label>
                    <input
                      type="email"
                      required
                      placeholder="请输入您的邮箱地址"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">咨询类型 *</label>
                    <select
                      required
                      value={form.consultationType}
                      onChange={(e) => setForm({ ...form, consultationType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">请选择咨询类型</option>
                      <option value="数据定制">数据定制</option>
                      <option value="课题组合作">课题组合作</option>
                      <option value="机构采购">机构采购</option>
                      <option value="API接入">API接入</option>
                      <option value="其他咨询">其他咨询</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">研究方向</label>
                    <input
                      type="text"
                      placeholder="如：审计质量、公司治理、劳动经济等"
                      value={form.research}
                      onChange={(e) => setForm({ ...form, research: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-md"
                    style={{ background: "linear-gradient(135deg, #2550A0, #2E55A4)" }}
                  >
                    提交申请 →
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    提交后 1-2 个工作日内回复
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Sales Team - 五列布局，每位销售一列：二维码 + 姓名 + 邮箱 + 电话 */}
        <div className={`mt-12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">销售团队 · 微信扫码咨询</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SALES_TEAM.map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className="w-full max-w-[140px] aspect-square rounded-xl bg-white border border-gray-100 p-2 flex items-center justify-center">
                  <img
                    src={person.qrCode}
                    alt={`${person.name}的微信二维码`}
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-base font-bold text-gray-900 mt-3">{person.name}</p>
                <p className="text-xs text-gray-400 mb-2">{person.title}</p>
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-blue-700 transition-colors w-full"
                  title={person.email}
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{person.email}</span>
                </a>
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
        </div>
      </div>

      {/* Modal Form */}
      {activeForm && renderForm()}
    </section>
  );
}
