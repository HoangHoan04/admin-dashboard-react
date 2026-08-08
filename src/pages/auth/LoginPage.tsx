import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { login } from "@/utils/auth";
import { tokenCache } from "@/utils/token";
import {
  AlertCircle,
  Check,
  Clock,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  Mail,
  Phone,
  User,
} from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (tokenCache.isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError(t("auth.loginRequired"));
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.ok) {
      navigate("/", { replace: true });
    } else {
      setError(result.message || t("auth.invalidCredentials"));
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="m-0 mb-2 text-[28px] font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
          {t("auth.signInTitle")}
        </h1>
        <p className="m-0 text-[15px] text-slate-500 dark:text-slate-400">
          {t("auth.signInSubtitle")}
        </p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={onLogin}>
        {error ? (
          <div className="flex items-center gap-2.5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-500 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-300">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-semibold text-slate-800 dark:text-slate-200"
            htmlFor="username"
          >
            {t("auth.emailAddress")}
          </label>
          <input
            id="username"
            className="h-11 w-full rounded-lg border border-slate-200 bg-transparent px-3 font-inherit text-inherit outline-none transition-colors focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100"
            name="username"
            type="text"
            autoComplete="username"
            placeholder={t("auth.emailPlaceholder")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-semibold text-slate-800 dark:text-slate-200"
            htmlFor="password"
          >
            {t("auth.password")}
          </label>
          <div className="relative">
            <input
              id="password"
              className="h-11 w-full rounded-lg border border-slate-200 bg-transparent px-3 pr-10 font-inherit text-inherit outline-none transition-colors focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100"
              name="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              placeholder={t("auth.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 inline-flex -translate-y-1/2 cursor-pointer text-slate-500"
              onClick={() => setPasswordVisible((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 select-none text-slate-800 dark:text-slate-200"
            onClick={() => setRememberMe((v) => !v)}
          >
            <span
              className={`flex size-[18px] items-center justify-center rounded border-2 transition-colors ${
                rememberMe
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-slate-200 text-transparent dark:border-slate-700"
              }`}
            >
              <Check size={10} />
            </span>
            <span>{t("auth.rememberMe")}</span>
          </button>
          <Link
            to="/auth/forgot-password"
            className="font-medium text-blue-500 no-underline hover:underline"
          >
            {t("auth.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2.5 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-500 bg-blue-500 text-base font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] transition hover:-translate-y-px hover:bg-blue-500/85 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
          <span>{loading ? t("auth.signingIn") : t("auth.signIn")}</span>
        </button>

        <div className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          {t("auth.dontHaveAccount")}{" "}
          <button
            type="button"
            className="cursor-pointer border-none bg-transparent p-0 font-inherit font-semibold text-blue-500 hover:underline"
            onClick={() => setContactOpen(true)}
          >
            {t("auth.createAccount")}
          </button>
        </div>
      </form>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-lg font-bold">{t("auth.modalTitle")}</span>
                <span className="block text-sm font-normal text-muted-foreground">
                  {t("auth.modalSubtitle")}
                </span>
              </span>
            </DialogTitle>
          </DialogHeader>

          <p className="mb-5 text-sm leading-relaxed text-foreground">{t("auth.modalBody")}</p>

          <div className="mb-5 flex flex-col gap-3">
            {[
              {
                name: "Nguyễn Văn A",
                email: "a.nguyen@smarthr.vn",
                phone: "(028) 1234 5678",
              },
              {
                name: "Trần Thị B",
                email: "b.tran@smarthr.vn",
                phone: "(028) 1234 5678",
              },
            ].map((member) => (
              <div
                key={member.email}
                className="flex gap-4 rounded-xl border border-border p-4"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="m-0 mb-1 text-[15px] font-semibold">{member.name}</h4>
                  <span className="mb-1.5 inline-block rounded bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-500">
                    {t("auth.modalDeptVal")}
                  </span>
                  <div className="flex flex-col gap-1.5 text-[13.5px]">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-muted-foreground" />
                      <a
                        href={`mailto:${member.email}`}
                        className="font-medium text-blue-500 no-underline hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-2 flex items-center gap-2.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-[13.5px] text-blue-600/90">
            <Clock size={16} />
            <span>
              <strong>{t("auth.modalHours")}:</strong> {t("auth.modalHoursVal")}
            </span>
          </div>

          <DialogFooter>
            <button
              type="button"
              className="flex h-[38px] cursor-pointer items-center justify-center rounded-lg border border-blue-500 bg-blue-500 px-5 font-medium text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:bg-blue-500/85"
              onClick={() => setContactOpen(false)}
            >
              {t("auth.modalClose")}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
