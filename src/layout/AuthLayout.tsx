import ChangeLanguage from "@/components/common/ChangeLanguage";
import ToggeTheme from "@/components/common/ToggeTheme";
import useDashboardStore from "@/store/dashboardStore";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { t } = useTranslation();
  const theme = useDashboardStore((s) => s.settings.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.toggle("dark", systemDark);
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-stone-50 dark:bg-slate-950">
      {/* Left panel */}
      <div className="relative z-[1] hidden flex-[1.2] flex-col items-center justify-center overflow-hidden bg-linear-to-br from-blue-600 to-slate-950 p-10 lg:flex">
        <div className="pointer-events-none absolute -top-[10%] -left-[10%] size-[500px] animate-[auth-float-blob_20s_ease-in-out_infinite_alternate] rounded-full bg-blue-500 opacity-25 mix-blend-screen blur-[80px]" />
        <div className="pointer-events-none absolute -right-[10%] -bottom-[10%] size-[600px] animate-[auth-float-blob_20s_ease-in-out_infinite_alternate] rounded-full bg-blue-700 opacity-25 mix-blend-screen blur-[80px] [animation-delay:-5s]" />
        <div className="pointer-events-none absolute top-[30%] right-[10%] size-[300px] animate-[auth-float-blob_20s_ease-in-out_infinite_alternate] rounded-full bg-blue-300 opacity-25 mix-blend-screen blur-[80px] [animation-delay:-10s]" />
        <div className="pointer-events-none absolute bottom-[20%] left-[10%] size-[400px] animate-[auth-float-blob_20s_ease-in-out_infinite_alternate] rounded-full bg-blue-600 opacity-25 mix-blend-screen blur-[80px] [animation-delay:-15s]" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px] opacity-60" />

        <div className="relative z-[5] flex w-full max-w-[460px] flex-col items-center gap-8 rounded-[20px] border border-white/15 bg-white/[0.07] p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-[20px]">
          <h2 className="m-0 text-[26px] leading-snug font-bold tracking-tight text-white">
            {t("auth.welcomeTitle")}
          </h2>
          <div className="relative flex h-40 w-60 items-center justify-center">
            <div className="absolute z-[3] size-20 animate-[auth-float-shape_5s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle_at_30%_30%,#eff6ff_0%,#3b82f6_50%,#1e3a8a_100%)] drop-shadow-lg" />
            <div className="absolute top-[15%] left-[10%] z-[2] size-[90px] animate-[auth-float-shape_7s_ease-in-out_infinite] rounded-full border-[22px] border-blue-300 [animation-delay:-2s]" />
            <div className="absolute right-[15%] bottom-[10%] z-[4] h-10 w-[100px] -rotate-[25deg] animate-[auth-float-shape_9s_ease-in-out_infinite] rounded-[20px] border border-white/30 bg-linear-to-br from-white/40 to-white/10 [animation-delay:-4s] backdrop-blur-[5px]" />
          </div>
          <p className="m-0 text-[15px] leading-relaxed text-white/75">
            {t("auth.welcomeDesc")}
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-between bg-background px-6 py-10 shadow-[-10px_0_30px_rgba(0,0,0,0.01)] lg:justify-between dark:shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
        <div className="absolute top-6 right-6 flex items-center gap-3 lg:top-6 lg:right-6">
          <ToggeTheme />
          <ChangeLanguage />
        </div>

        <div className="mb-5 flex items-center gap-3 self-center lg:ml-[10%] lg:self-start">
          <div className="flex size-11 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/8 text-blue-500 dark:border-blue-500/25 dark:bg-blue-500/15">
            <Building2 size={22} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-stone-900 dark:text-slate-100">
            ADMIN-DASHBOARD
          </span>
        </div>

        <div className="my-auto w-full max-w-[420px] py-5">
          <Outlet />
        </div>

        <p className="m-0 text-center text-[13px] text-slate-500">
          &copy; 2026 ADMIN-DASHBOARD. All rights reserved.
        </p>
      </div>
    </div>
  );
}
