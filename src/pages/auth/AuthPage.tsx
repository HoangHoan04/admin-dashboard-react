import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useDashboardStore from "@/store/dashboardStore";
import useLoadingStore from "@/store/loadingStore";
import { useToast } from "@/store/toastStore";
import { tokenCache } from "@/utils/token";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import ChangeLanguage from "@/components/common/ChangeLanguage";
import FullScreen from "@/components/common/FullScreen";
import ToggeTheme from "@/components/common/ToggeTheme";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  const theme = useDashboardStore((state) => state.settings.theme);
  const primaryColor = useDashboardStore(
    (state) => state.settings.primaryColor,
  );
  const borderRadius = useDashboardStore(
    (state) => state.settings.borderRadius,
  );
  const fontFamily = useDashboardStore((state) => state.settings.fontFamily);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (systemDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  const dynamicStyles: React.CSSProperties = {
    "--primary": primaryColor,
    "--radius": `${borderRadius}px`,
    fontFamily: `'${fontFamily}', sans-serif`,
  } as React.CSSProperties;

  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/forgot-password") {
      setIsForgotPasswordMode(true);
      setForgotStep(1);
    } else if (location.pathname === "/reset-password") {
      setIsForgotPasswordMode(true);
      setForgotStep(2);
    } else {
      setIsForgotPasswordMode(false);
      setForgotStep(1);
    }
    setAuthError("");
  }, [location.pathname]);

  useEffect(() => {
    if (tokenCache.isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!username.trim() || !password.trim()) {
      setAuthError(t("Vui lòng điền đầy đủ thông tin đăng nhập."));
      return;
    }

    setAuthLoading(true);
    showLoading(t("auth.signingIn") || "Đang đăng nhập...");

    setTimeout(() => {
      hideLoading();
      setAuthLoading(false);
      if (username.trim() === "admin" && password === "123") {
        tokenCache.setAuthData("mock-access-token", "mock-refresh-token", {
          username: "admin",
          name: "Hoàng Văn Nam",
          email: "nam@example.com",
        });
        showToast({
          type: "success",
          message: t("Đăng nhập thành công!"),
        });
        navigate("/", { replace: true });
      } else {
        const errMsg = t("Tên đăng nhập hoặc mật khẩu không chính xác!");
        setAuthError(errMsg);
        showToast({ type: "error", message: errMsg });
      }
    }, 850);
  };

  const handleForgotPasswordStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!forgotEmail.trim()) {
      setAuthError(t("Vui lòng nhập địa chỉ email của bạn."));
      return;
    }

    setAuthLoading(true);
    showLoading(t("auth.sending") || "Đang gửi...");

    setTimeout(() => {
      hideLoading();
      setAuthLoading(false);
      showToast({
        type: "success",
        message: t("Yêu cầu gửi OTP thành công!"),
      });
      setForgotStep(2);
      navigate(
        `/reset-password?email=${encodeURIComponent(forgotEmail.trim())}`,
      );
    }, 850);
  };

  const handleForgotPasswordStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (otpValue.length !== 6) {
      setAuthError(t("Vui lòng điền đủ mã xác nhận 6 chữ số."));
      return;
    }

    setAuthLoading(true);
    showLoading(t("auth.processing") || "Đang xác thực OTP...");

    setTimeout(() => {
      hideLoading();
      setAuthLoading(false);
      showToast({
        type: "success",
        message: t("Xác thực OTP thành công! Vui lòng nhập mật khẩu mới."),
      });
      setForgotStep(3);
    }, 850);
  };

  const handleForgotPasswordStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setAuthError(t("Vui lòng điền đầy đủ thông tin mật khẩu."));
      return;
    }

    if (newPassword !== confirmPassword) {
      setAuthError(t("Mật khẩu xác nhận không trùng khớp!"));
      return;
    }

    setAuthLoading(true);
    showLoading(t("auth.processing") || "Đang cập nhật mật khẩu...");

    setTimeout(() => {
      hideLoading();
      setAuthLoading(false);
      showToast({
        type: "success",
        message: t("Đặt lại mật khẩu thành công!"),
      });
      setIsForgotPasswordMode(false);
      setForgotStep(1);
      setForgotEmail("");
      setOtpValue("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/login");
    }, 850);
  };

  const searchParams = new URLSearchParams(location.search);
  const emailParam =
    searchParams.get("email") || forgotEmail || "your-email@example.com";

  return (
    <div
      className="min-h-screen w-full overflow-hidden relative flex flex-col transition-colors duration-300 bg-linear-to-br from-background via-muted/20 to-background text-foreground"
      style={dynamicStyles}
    >
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          }}
        />
      </div>

      <style>{`
        .mini-solar-system { box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.05); }
        .mini-sun {
          position: absolute; width: 8px; height: 8px; border-radius: 50%; z-index: 5;
          background: radial-gradient(circle, #fff 0%, #ff9e00 60%, #ff3c00 100%);
          box-shadow: 0 0 10px #ff6a00, 0 0 4px #ff3c00;
        }
        .mini-orbit {
          position: absolute; top: 50%; left: 50%; border: 1px dashed rgba(165, 180, 252, 0.15);
          border-radius: 50%; transform: translate(-50%, -50%); animation: mini-spin linear infinite;
        }
        .orbit-1 { width: 22px; height: 22px; animation-duration: 3s; }
        .orbit-2 { width: 34px; height: 34px; animation-duration: 5s; }
        .orbit-3 { width: 46px; height: 46px; animation-duration: 8s; }
        .mini-planet { position: absolute; top: 0; left: 50%; border-radius: 50%; transform: translate(-50%, -50%); }
        .planet-mercury { width: 2.5px; height: 2.5px; background: radial-gradient(circle at 30% 30%, #ffd18c, #cc8b3d); }
        .planet-earth { width: 3.5px; height: 3.5px; background: radial-gradient(circle at 30% 30%, #63b3ff, #1d6fd1); box-shadow: 0 0 3px rgba(99, 102, 241, 0.4); }
        .planet-mars { width: 3px; height: 3px; background: radial-gradient(circle at 30% 30%, #ff8f8f, #d13b3b); }
        @keyframes mini-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <header className="relative z-10 flex items-center justify-between px-6 py-4 backdrop-blur-xs bg-background/5">
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <FullScreen />
          <ChangeLanguage />
          <ToggeTheme />
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center flex-1 px-4">
        <div className="w-full max-w-md animate-in fade-in duration-300">
          <Card className="rounded-2xl border border-border/60 bg-background/95 backdrop-blur-md shadow-2xl overflow-hidden hover:border-border/80 transition-all duration-300">
            <div className="relative px-8 pt-8 pb-6">
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent" />

              <div className="flex items-center gap-4 mb-4 justify-center">
                <div className="mini-solar-system relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted/20 border border-border/50">
                  <div className="mini-sun" />
                  <div className="mini-orbit orbit-1">
                    <div className="mini-planet planet-mercury" />
                  </div>
                  <div className="mini-orbit orbit-2">
                    <div className="mini-planet planet-earth" />
                  </div>
                  <div className="mini-orbit orbit-3">
                    <div className="mini-planet planet-mars" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Noah Cloud
                  </h1>
                  <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider font-semibold">
                    {t("auth.secureCloudStorage")}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-xs mx-auto">
                {isForgotPasswordMode
                  ? forgotStep === 2
                    ? t("auth.verificationCode")
                    : forgotStep === 3
                      ? t("Đổi mật khẩu") || "Đặt lại mật khẩu"
                      : t("auth.forgotDesc")
                  : t("auth.loginDesc")}
              </p>
            </div>

            <div className="px-8 pb-8">
              {isForgotPasswordMode && (
                <div className="flex items-center justify-between px-4 mb-6 select-none relative">
                  <div className="absolute top-3 left-8 right-8 h-0.5 bg-muted/60 -translate-y-1/2 z-0" />
                  <div
                    className="absolute top-3 left-8 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
                    style={{
                      width:
                        forgotStep === 1
                          ? "0%"
                          : forgotStep === 2
                            ? "50%"
                            : "100%",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        forgotStep >= 1
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      1
                    </div>
                    <span
                      className={`text-[9px] font-semibold ${forgotStep >= 1 ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                      Email
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        forgotStep >= 2
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      2
                    </div>
                    <span
                      className={`text-[9px] font-semibold ${forgotStep >= 2 ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                      Mã OTP
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                        forgotStep >= 3
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      3
                    </div>
                    <span
                      className={`text-[9px] font-semibold ${forgotStep >= 3 ? "text-primary font-bold" : "text-muted-foreground"}`}
                    >
                      Mật khẩu
                    </span>
                  </div>
                </div>
              )}

              {isForgotPasswordMode ? (
                forgotStep === 1 ? (
                  <form
                    onSubmit={handleForgotPasswordStep1}
                    className="space-y-4 animate-in fade-in duration-300"
                  >
                    {authError && (
                      <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2.5 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-xs text-destructive font-medium">
                          {authError}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1.5 group">
                      <label className="block text-xs font-semibold text-foreground">
                        {t("auth.emailAddress")}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-150" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="pl-9 h-10 text-xs rounded-xl"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={authLoading}
                      className="w-full h-11 text-xs font-semibold rounded-xl group mt-6 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {authLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t("auth.sending")}</span>
                        </>
                      ) : (
                        <>
                          <span>{t("auth.sendOtp")}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                        </>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-150 select-none block text-center"
                    >
                      {t("auth.backToLogin")}
                    </button>
                  </form>
                ) : forgotStep === 2 ? (
                  <form
                    onSubmit={handleForgotPasswordStep2}
                    className="space-y-4 animate-in fade-in duration-300"
                  >
                    {authError && (
                      <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2.5 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-xs text-destructive font-medium">
                          {authError}
                        </p>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                          OTP Sent to
                        </p>
                        <p className="text-xs font-bold text-foreground truncate">
                          {emailParam}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 flex flex-col items-center">
                      <label className="text-xs font-semibold text-foreground self-start">
                        {t("auth.verificationCode")}
                      </label>
                      <InputOTP
                        value={otpValue}
                        onChange={(val) => setOtpValue(val)}
                        maxLength={6}
                        disabled={authLoading}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={0}
                            className="rounded-xl border h-11 w-10 text-center"
                          />
                          <InputOTPSlot
                            index={1}
                            className="rounded-xl border h-11 w-10 text-center"
                          />
                          <InputOTPSlot
                            index={2}
                            className="rounded-xl border h-11 w-10 text-center"
                          />
                          <InputOTPSlot
                            index={3}
                            className="rounded-xl border h-11 w-10 text-center"
                          />
                          <InputOTPSlot
                            index={4}
                            className="rounded-xl border h-11 w-10 text-center"
                          />
                          <InputOTPSlot
                            index={5}
                            className="rounded-xl border h-11 w-10 text-center"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Button
                      type="submit"
                      disabled={authLoading}
                      className="w-full h-11 text-xs font-semibold rounded-xl group mt-6 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {authLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t("auth.processing")}</span>
                        </>
                      ) : (
                        <>
                          <span>{t("Xác nhận mã OTP") || "Xác nhận OTP"}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                        </>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setForgotStep(1);
                        navigate("/forgot-password");
                      }}
                      className="w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-150 select-none block text-center"
                    >
                      {t("auth.back")}
                    </button>
                  </form>
                ) : (
                  <form
                    onSubmit={handleForgotPasswordStep3}
                    className="space-y-4 animate-in fade-in duration-300"
                  >
                    {authError && (
                      <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2.5 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-xs text-destructive font-medium">
                          {authError}
                        </p>
                      </div>
                    )}

                    <div className="space-y-1.5 group">
                      <label className="block text-xs font-semibold text-foreground">
                        {t("auth.newPassword")}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-150" />
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-9 pr-9 h-10 text-xs rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="block text-xs font-semibold text-foreground">
                        {t("Nhắc lại mật khẩu mới") || "Nhắc lại mật khẩu mới"}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-150" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-9 pr-9 h-10 text-xs rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={authLoading}
                      className="w-full h-11 text-xs font-semibold rounded-xl group mt-6 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {authLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t("auth.processing")}</span>
                        </>
                      ) : (
                        <>
                          <span>
                            {t("Đặt lại mật khẩu") || "Đặt lại mật khẩu"}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                        </>
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setForgotStep(2)}
                      className="w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-150 select-none block text-center"
                    >
                      {t("auth.back")}
                    </button>
                  </form>
                )
              ) : (
                <form
                  onSubmit={handleLogin}
                  className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300"
                >
                  {authError && (
                    <div className="p-3.5 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2.5 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-xs text-destructive font-medium">
                        {authError}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1.5 group">
                    <label className="block text-xs font-semibold text-foreground">
                      {t("auth.emailAddress")}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-150" />
                      <Input
                        type="text"
                        placeholder="Username / Email..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-9 h-10 text-xs rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 group">
                    <label className="block text-xs font-semibold text-foreground">
                      {t("auth.password")}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-150" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9 pr-9 h-10 text-xs rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      {t("auth.forgotPassword")}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={authLoading}
                    className="w-full h-11 text-xs font-semibold rounded-xl group mt-4 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {authLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t("auth.signingIn")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("auth.signIn")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
