import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDashboardStore from "@/store/dashboardStore";
import React from "react";

import enIcon from "@/assets/icons/en.svg";
import viIcon from "@/assets/icons/vi.svg";

export const ChangeLanguage: React.FC = () => {
  const language = useDashboardStore((state) => state.settings.language);
  const updateSettings = useDashboardStore((state) => state.updateSettings);

  const handleLanguageChange = (lang: "vi" | "en") => {
    updateSettings({ language: lang });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none select-none"
          style={{ outline: "none", border: "none", boxShadow: "none" }}
        >
          <img
            src={language === "vi" ? viIcon : enIcon}
            alt={language === "vi" ? "Tiếng Việt" : "English"}
            className="w-5 h-3.5 rounded-sm object-cover shadow-sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("vi")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent rounded-md transition-colors"
        >
          <img
            src={viIcon}
            alt="Tiếng Việt"
            className="w-5 h-3.5 rounded-sm object-cover shadow-sm"
          />
          <span className="text-sm font-medium">Tiếng Việt</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-accent rounded-md transition-colors"
        >
          <img
            src={enIcon}
            alt="English"
            className="w-5 h-3.5 rounded-sm object-cover shadow-sm"
          />
          <span className="text-sm font-medium">English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeLanguage;
