import { useEffect } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, CheckCircle2, ExternalLink, FileText, Calendar, User, Lightbulb, Users, BarChart2, Building2, Search, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { useCaseMap } from "@/data/useCasesData";

const iconMap: Record<string, any> = {
  lightbulb: Lightbulb,
  users: Users,
  "bar-chart": BarChart2,
  building: Building2,
  search: Search,
  globe: Globe,
};

export default function UseCaseDetail() {
  const [match, params] = useRoute("/use-cases/:slug");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.slug]);

  if (!match) return <NotFound />;

  const useCase = useCaseMap[params?.slug || ""];

  if (!useCase) return <NotFound />;

  const Icon = useCase.icon;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100">
          <div className="container py-4">
            <a href="/#scenarios" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <ArrowLeft className="w-4 h-4" />
              返回应用场景
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 border-b border-gray-100" style={{ background: `linear-gradient(135deg, ${useCase.accent}15, ${useCase.accent}08)` }}>
          <div className="container">
            <div className="flex items-start gap-6 mb-6">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: useCase.lightBg }}
              >
                <Icon className="w-8 h-8" style={{ color: useCase.accent }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: useCase.accent }}
                >
                  {useCase.subtitle}
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  {useCase.title}
                </h1>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              {useCase.fullDescription}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container max-w-4xl">
            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">核心优势</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {useCase.highlights.map((highlight, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: useCase.accent }} />
                    <div>
                      <p className="text-gray-900 font-medium">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-12 p-8 rounded-xl border border-gray-100" style={{ background: useCase.lightBg }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: useCase.lightText }}>
                为您带来的价值
              </h2>
              <ul className="space-y-3">
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: useCase.accent }} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Data Types */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">相关数据类型</h2>
              <div className="flex flex-wrap gap-3">
                {useCase.dataTypes.map((dataType, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-lg font-medium border"
                    style={{
                      background: useCase.lightBg,
                      color: useCase.lightText,
                      borderColor: `${useCase.accent}20`,
                    }}
                  >
                    {dataType}
                  </span>
                ))}
              </div>
            </div>

            {/* Quant Articles / Industry Reports Module */}
            {useCase.quantArticles && useCase.quantArticles.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{useCase.quantSectionTitle || "量化策略：因子构建"}</h2>
                <p className="text-gray-500 text-sm mb-6">{useCase.quantSectionSubtitle || "基于 CnOpenData 数据的量化因子构建研究与实践"}</p>
                <div className="space-y-4">
                  {useCase.quantArticles.map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: useCase.lightBg }}
                        >
                          {(() => {
                            const IconComp = article.icon ? iconMap[article.icon] : FileText;
                            return <IconComp className="w-5 h-5" style={{ color: useCase.accent }} />;
                          })()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                              {article.title}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {article.date}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {article.tags.map((tag, j) => (
                              <span
                                key={j}
                                className="px-2 py-0.5 rounded text-xs font-medium"
                                style={{ background: `${useCase.accent}10`, color: useCase.accent }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Case Studies - only show if not empty */}
            {useCase.caseStudies && useCase.caseStudies.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">典型分析场景</h2>
                <div className="space-y-6">
                  {useCase.caseStudies.map((caseStudy, i) => (
                    <div key={i} className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{caseStudy.title}</h3>
                      <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                      <div className="flex items-start gap-2 p-4 rounded-lg" style={{ background: useCase.lightBg }}>
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: useCase.accent }} />
                        <p className="text-sm font-medium text-gray-900">{caseStudy.result}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="mb-12">
              <h2 className="text-sm font-semibold text-gray-600 mb-4">相关领域</h2>
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <a
                href="/#contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: `linear-gradient(135deg, ${useCase.accent}, ${useCase.accent}dd)` }}
              >
                联系我们了解更多
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="/databases"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
              >
                浏览数据库
              </a>
            </div>
          </div>
        </section>

        {/* Related Use Cases */}
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="container">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">其他应用场景</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Link to other use cases */}
              <a href="/#scenarios" className="p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group">
                <p className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                  查看所有应用场景
                </p>
                <p className="text-sm text-gray-600">
                  了解 CnOpenData 在不同领域的应用和价值
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
