import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "./vi.json";

i18n.use(initReactI18next).init({
  lng: "vi",
  fallbackLng: "vi",
  resources: {
    vi: { translation: vi },
  },
  interpolation: {
    escapeValue: false,
  },
  keySeparator: ".",
  defaultNS: "translation",
});

const localesMap: Record<
  string,
  () => Promise<{ default: Record<string, any> }>
> = {
  en: () => import("./en.json"),
  vi: () => import("./vi.json"),
};

export async function loadLocale(locale: string) {
  if (i18n.hasResourceBundle(locale, "translation")) {
    await i18n.changeLanguage(locale);
    return;
  }

  const mod = await localesMap[locale]?.();
  if (mod) {
    i18n.addResourceBundle(locale, "translation", mod.default, true, true);
  }
  await i18n.changeLanguage(locale);
}

export default i18n;
