import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/** Placeholder — UI quên mật khẩu sẽ bổ sung sau theo chuẩn Angular */
export default function ForgotPassword() {
  const { t } = useTranslation();

  return (
    <div>
      <Link
        to="/auth/login"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-500 hover:underline"
      >
        <ArrowLeft size={16} />
        {t("auth.backToLogin")}
      </Link>
      <h1 className="m-0 mb-2 text-[28px] font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
        {t("auth.forgotPasswordTitle")}
      </h1>
      <p className="m-0 text-[15px] text-slate-500 dark:text-slate-400">
        {t("auth.forgotDesc")}
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        Mock: liên hệ admin hoặc dùng tài khoản <code>admin / 123</code>.
      </p>
    </div>
  );
}
