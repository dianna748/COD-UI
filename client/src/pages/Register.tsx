import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowRight, Check, LogIn } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { getRegisterUrl } from "@/const";
import { toast } from "sonner";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOAuthRegister = () => {
    window.location.href = getRegisterUrl();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("请先同意服务条款与隐私政策");
      return;
    }
    setLoading(true);
    toast.info("目前仅支持 Manus 账户注册，正在跳转到注册页面…");
    // 任何注册提交都走真实的 Manus OAuth 流程，不做本地伪注册
    handleOAuthRegister();
  };

  const passwordStrength = formData.password.length > 0
    ? formData.password.length < 6
      ? "弱"
      : formData.password.length < 10
      ? "中"
      : "强"
    : "";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">创建账户</h1>
            <p className="text-gray-600">加入全球学术研究者社区，探索中国开放数据</p>
          </div>

          {isAuthenticated ? (
            <div className="interactive-card bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">已登录</h2>
              <p className="text-gray-600 mb-6">您已拥有账户，欢迎 {user?.name || "用户"}！</p>
              <Link href="/">
                <a
                  className="interactive-button inline-block px-6 py-2.5 rounded-lg font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #1E3F8A 0%, #2E55A4 100%)" }}
                >
                  返回首页
                </a>
              </Link>
            </div>
          ) : (
            <>
              {/* Form Card */}
              <div className="interactive-card bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                {/* OAuth 快速注册 */}
                <button
                  onClick={handleOAuthRegister}
                  className="interactive-button w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 mb-6"
                  style={{ background: "linear-gradient(135deg, #1E3F8A 0%, #2E55A4 100%)" }}
                >
                  <LogIn className="w-4 h-4" />
                  使用 Manus 账户快速注册
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">或填写注册信息</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      姓名
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="张三"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      邮箱地址
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Organization Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      机构 / 学校
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="北京大学"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      密码
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordStrength && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              passwordStrength === "弱"
                                ? "w-1/3 bg-red-500"
                                : passwordStrength === "中"
                                ? "w-2/3 bg-yellow-500"
                                : "w-full bg-green-500"
                            }`}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {passwordStrength}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      确认密码
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                        <Check className="w-3 h-3" />
                        密码匹配
                      </div>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      required
                    />
                    <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
                      我同意{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        服务条款
                      </a>
                      和{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        隐私政策
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !agreed}
                    className="interactive-button w-full py-2.5 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                    style={{
                      background: loading || !agreed
                        ? "#999"
                        : "linear-gradient(135deg, #1E3F8A 0%, #2E55A4 100%)",
                    }}
                  >
                    {loading ? "跳转中..." : (
                      <>
                        创建账户
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  已有账户？{" "}
                  <Link href="/login">
                    <a className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      立即登录
                    </a>
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
