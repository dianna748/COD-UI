import { useEffect } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { papers, levelColors, dataTypeColors } from "@/data/papersData";

export default function PaperDetail() {
  const [match, params] = useRoute("/papers/:id");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params?.id]);

  if (!match) return <NotFound />;

  const paper = papers.find((p) => p.id === params?.id);

  if (!paper) return <NotFound />;

  const levelColor = levelColors[paper.level] || { bg: "#F3F4F6", text: "#6B7280" };
  const dataTypeColor = dataTypeColors[paper.dataType] || { bg: "#F3F4F6", text: "#6B7280" };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-gray-100">
          <div className="container py-4">
            <a href="/papers" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <ArrowLeft className="w-4 h-4" />
              返回论文列表
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white border-b border-gray-100">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: levelColor.bg, color: levelColor.text }}
              >
                {paper.level}
              </span>
              <span
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: dataTypeColor.bg, color: dataTypeColor.text }}
              >
                {paper.dataType}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {paper.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600">
              <div>
                <p className="font-semibold text-gray-900">{paper.authors}</p>
                <p className="text-sm mt-1">{paper.journal} {paper.issue && `${paper.issue}`} · {paper.year}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container max-w-3xl">
            {/* Paper Info Card */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">论文信息</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">发表年份</p>
                  <p className="font-semibold text-gray-900">{paper.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">期刊/会议</p>
                  <p className="font-semibold text-gray-900">{paper.journal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">期号</p>
                  <p className="font-semibold text-gray-900">{paper.issue || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">数据类型</p>
                  <p className="font-semibold text-gray-900">{paper.dataType}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">关键词</h3>
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">论文概述</h3>
              <p className="text-gray-700 leading-relaxed">
                本论文使用 CnOpenData 提供的{paper.dataType}进行实证研究，发表于{paper.journal}
                {paper.issue && `${paper.issue}`}。研究成果得到了学术界的广泛认可，充分验证了 CnOpenData 数据的学术价值和可靠性。
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/papers"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                返回列表
              </a>
              <a
                href="/#contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #0F2B5E, #1E3F8A)" }}
              >
                联系我们获取数据
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Related Papers */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">相关论文</h3>
              <div className="grid gap-4">
                {papers
                  .filter((p) => p.id !== paper.id && p.category === paper.category)
                  .slice(0, 3)
                  .map((relatedPaper) => (
                    <a
                      key={relatedPaper.id}
                      href={`/papers/${relatedPaper.id}`}
                      className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {relatedPaper.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">
                        {relatedPaper.authors} · {relatedPaper.year}
                      </p>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
