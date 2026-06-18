import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const handleOAuthLogin = () => {
    window.location.href = getLoginUrl();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.info("目前仅支持 Manus 账户登录，正在跳转…");
    // 邮箱/密码登录走真实的 Manus OAuth 流程，不做本地伪登录
    handleOAuthLogin();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">登录账户</h1>
            <p className="text-gray-600">访问您的 CnOpenData 研究工作空间</p>
          </div>

          {isAuthenticated ? (
            <div className="interactive-card bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">已登录</h2>
              <p className="text-gray-600 mb-6">欢迎回来，{user?.name || "用户"}！</p>
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
              {/* OAuth 登录卡片 */}
              <div className="interactive-card bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                {/* Manus OAuth 登录 */}
                <button
                  onClick={handleOAuthLogin}
                  className="interactive-button w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 mb-6"
                  style={{ background: "linear-gradient(135deg, #1E3F8A 0%, #2E55A4 100%)" }}
                >
                  <LogIn className="w-4 h-4" />
                  使用 Manus 账户登录
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">或使用邮箱登录</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      邮箱地址
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-900">
                        密码
                      </label>
                      <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        忘记密码？
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      defaultChecked
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer">
                      记住我
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="interactive-button w-full py-2.5 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: loading
                        ? "#999"
                        : "linear-gradient(135deg, #1E3F8A 0%, #2E55A4 100%)",
                    }}
                  >
                    {loading ? "跳转中..." : (
                      <>
                        登录
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  还没有账户？{" "}
                  <Link href="/register">
                    <a className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      立即注册
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
