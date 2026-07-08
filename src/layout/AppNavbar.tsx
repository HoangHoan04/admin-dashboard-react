import AppBreadcrumb from "@/components/common/Breadcrumb";
import ChangeLanguage from "@/components/common/ChangeLanguage";
import FullScreen from "@/components/common/FullScreen";
import ToggeTheme from "@/components/common/ToggeTheme";
import useDashboardStore from "@/store/dashboardStore";
import {
  ChevronRight,
  Clock,
  Settings as CogIcon,
  Command,
  CornerDownLeft,
  FileText,
  LogOut,
  Menu,
  Search,
  Trash2,
  User as UserIcon,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllRoutes } from "@/common/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { menuItems } from "@/config/menu";
import { tokenCache } from "@/utils/token";
import { useTranslation } from "react-i18next";

export const AppNavbar: React.FC = () => {
  const navigate = useNavigate();
  const settings = useDashboardStore((state) => state.settings);
  const setConfigOpen = useDashboardStore((state) => state.setConfigOpen);
  const updateSettings = useDashboardStore((state) => state.updateSettings);
  const resetSettings = useDashboardStore((state) => state.resetSettings);
  const clearTabs = useDashboardStore((state) => state.clearTabs);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<
    { label: string; path: string }[]
  >(() => {
    const saved = localStorage.getItem("recent_searches_v2");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  const getFunctionalRoutes = () => {
    const list: { label: string; path: string; icon: any }[] = [];
    const traverse = (items: any[], parentIcon?: any) => {
      items.forEach((item) => {
        const currentIcon = item.icon || parentIcon;
        if (item.path) {
          list.push({
            label: t(item.translationKey) || item.label,
            path: item.path,
            icon: currentIcon,
          });
        }
        if (item.children && item.children.length > 0) {
          traverse(item.children, currentIcon);
        }
      });
    };
    traverse(menuItems);
    return list;
  };

  const functionalRoutes = getFunctionalRoutes();

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const results: { label: string; path: string; key: string; icon?: any }[] =
      [];

    getAllRoutes().forEach((route) => {
      const label = t(route.label) || route.label;
      const title = label.toLowerCase();
      if (title.includes(query) || route.path.toLowerCase().includes(query)) {
        results.push({
          label,
          path: route.path,
          key: route.label,
          icon: route.icon,
        });
      }
    });

    return results;
  };

  const searchResults = getSearchResults();

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery, isSearchOpen]);

  const handleSearchResultClick = (path: string, label: string) => {
    const item = { label, path };
    const updated = [
      item,
      ...recentSearches.filter((s) => s.path !== path),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches_v2", JSON.stringify(updated));

    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(path);
  };

  const removeRecentSearch = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s.path !== path);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches_v2", JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent_searches_v2");
    localStorage.removeItem("recent_searches");
  };

  const getNavigableItems = () => {
    if (searchQuery.trim()) {
      return searchResults;
    }
    return recentSearches;
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    const items = getNavigableItems();
    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const activeItem = items[activeIndex];
      if (activeItem) {
        handleSearchResultClick(activeItem.path, activeItem.label);
      }
    }
  };

  const handleLogout = () => {
    tokenCache.clear();
    clearTabs();
    resetSettings();
    window.location.reload();
  };

  const getEffectiveTheme = (): "light" | "dark" => {
    if (settings.theme === "dark") return "dark";
    if (settings.theme === "light") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
  const effectiveTheme = getEffectiveTheme();

  const navbarBg =
    effectiveTheme === "dark"
      ? (settings.navbarColorDark ?? "#1c1c1c")
      : (settings.navbarColorLight ?? "#ffffff");

  const isNavbarDarkBg =
    !navbarBg || navbarBg === "inherit" || navbarBg === "transparent"
      ? effectiveTheme === "dark"
      : (() => {
          const hex = navbarBg.replace("#", "");
          if (hex.length === 6) {
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
          }
          return effectiveTheme === "dark";
        })();

  const navbarStyle: React.CSSProperties = {
    background: navbarBg,
    color: isNavbarDarkBg ? "#ffffff" : "inherit",
  };

  return (
    <>
      <header
        style={navbarStyle}
        className="flex items-center justify-between px-6 h-16 border-b border-border shadow-xs shrink-0 select-none z-30 transition-all duration-300 w-full"
      >
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() =>
              updateSettings({ collapseSidebar: !settings.collapseSidebar })
            }
            title={t("navbar.toggleSidebar")}
            className="cursor-pointer"
          >
            <Menu className="size-4 text-primary" />
          </Button>
          <AppBreadcrumb />
        </div>

        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-muted/50 hover:bg-muted border border-input rounded-lg px-3 py-1.5 h-9 cursor-pointer w-40 sm:w-60 text-xs text-muted-foreground transition-all duration-200"
          >
            <Search className="size-4 shrink-0 text-primary" />
            <span className="truncate flex-1 text-left">
              {t("navbar.quickSearch")}
            </span>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
              Ctrl K
            </kbd>
          </div>

          <ChangeLanguage />
          <ToggeTheme />
          <FullScreen />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setConfigOpen(true)}
            title={t("navbar.openSettings")}
          >
            <CogIcon className="size-4 text-primary animate-spin-slow" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative size-9 rounded-full p-0 flex items-center justify-center border border-border overflow-hidden"
              >
                <Avatar className="size-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 no-override">
              <DropdownMenuLabel className="font-normal flex flex-col gap-1 py-1.5 px-2">
                <span className="text-xs font-semibold text-foreground">
                  Hoàng Văn Nam
                </span>
                <span className="text-[10px] text-muted-foreground">
                  nam@example.com
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <UserIcon className="mr-2 size-4" />
                <span>{t("navbar.profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setConfigOpen(true)}>
                <CogIcon className="mr-2 size-4" />
                <span>{t("navbar.settings")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:bg-destructive/10"
              >
                <LogOut className="mr-2 size-4" />
                <span>{t("navbar.logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent
          onKeyDown={handleModalKeyDown}
          showCloseButton={false}
          className="sm:max-w-xl p-0 overflow-hidden bg-background/95 backdrop-blur-md border border-border/80 shadow-2xl rounded-2xl transition-all duration-300 no-override"
        >
          <DialogHeader className="p-4 border-b border-border/80 flex flex-row items-center justify-between gap-3 bg-muted/20">
            <div className="flex items-center gap-3 flex-1">
              <Search className="size-4 text-primary shrink-0 transition-colors animate-pulse" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="border-0 focus-visible:ring-0 focus-visible:outline-none text-sm w-full bg-transparent placeholder:text-muted-foreground/50 text-foreground"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2 shrink-0 select-none">
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery("")}
                  className="size-6 p-0 rounded-full hover:bg-muted"
                  title={t("search.clear")}
                >
                  <X className="size-3.5 text-muted-foreground" />
                </Button>
              )}
              <span className="hidden sm:inline-flex text-[9px] px-1.5 py-0.5 rounded border border-border bg-muted/50 font-mono text-muted-foreground">
                ESC
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="size-6 p-0 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                title={t("common.close") || "Close"}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="p-3 max-h-95 overflow-y-auto space-y-4">
            {searchQuery && (
              <div className="space-y-1 animate-in fade-in duration-200">
                <span className="text-[10px] uppercase font-bold text-primary/70 tracking-widest block px-2.5 mb-2">
                  {t("search.results")}
                </span>
                {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => {
                    const isActive = idx === activeIndex;
                    const IconComp = result.icon;
                    return (
                      <button
                        key={result.path}
                        onClick={() =>
                          handleSearchResultClick(result.path, result.label)
                        }
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all duration-150 group border ${
                          isActive
                            ? "bg-primary/8 border-primary/20 text-primary shadow-xs"
                            : "bg-transparent border-transparent hover:bg-muted/40 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/15 group-hover:text-foreground"
                            }`}
                          >
                            {IconComp ? (
                              <IconComp className="size-4" />
                            ) : (
                              <FileText className="size-4" />
                            )}
                          </div>
                          <span className="font-semibold">{result.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${
                              isActive
                                ? "bg-primary/15 text-primary"
                                : "bg-muted/70 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                            }`}
                          >
                            {result.path}
                          </span>
                          {isActive ? (
                            <CornerDownLeft className="size-3 text-primary animate-in fade-in slide-in-from-right-1 duration-200" />
                          ) : (
                            <ChevronRight className="size-3 text-muted-foreground/45 group-hover:text-muted-foreground" />
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                    <div className="p-3 bg-muted rounded-full text-muted-foreground">
                      <Search className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-foreground">
                        {t("search.noResults")}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {t("search.tryAnother")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!searchQuery && functionalRoutes.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-primary/70 tracking-widest block px-2.5 mb-1">
                  {t("search.popularPages")}
                </span>
                <div className="grid grid-cols-2 gap-2 px-1">
                  {functionalRoutes.map((item) => {
                    const IconComp = item.icon || FileText;
                    return (
                      <button
                        key={item.path}
                        onClick={() =>
                          handleSearchResultClick(item.path, item.label)
                        }
                        className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border bg-background/50 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-200 text-left text-xs text-foreground group shadow-xs"
                      >
                        <div className="p-1.5 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200">
                          <IconComp className="size-3.5" />
                        </div>
                        <span className="font-medium truncate">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {!searchQuery && (
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center px-2.5">
                  <span className="text-[10px] uppercase font-bold text-primary/70 tracking-widest">
                    {t("search.recentSearches")}
                  </span>
                  {recentSearches.length > 0 && (
                    <button
                      onClick={clearRecentSearches}
                      className="text-[10px] text-destructive hover:underline font-semibold"
                    >
                      {t("search.clearAll")}
                    </button>
                  )}
                </div>
                {recentSearches.length > 0 ? (
                  <div className="space-y-1">
                    {recentSearches.map((search, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <div
                          key={search.path}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() =>
                            handleSearchResultClick(search.path, search.label)
                          }
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all duration-150 group border cursor-pointer ${
                            isActive
                              ? "bg-primary/8 border-primary/20 text-primary shadow-xs"
                              : "bg-transparent border-transparent hover:bg-muted/40 text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/15 group-hover:text-foreground"
                              }`}
                            >
                              <Clock className="size-3.5" />
                            </div>
                            <span className="font-medium">{search.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              {search.path}
                            </span>
                            <button
                              onClick={(e) =>
                                removeRecentSearch(e, search.path)
                              }
                              className="p-1 rounded-md text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                              title={t("search.remove")}
                            >
                              <Trash2 className="size-3" />
                            </button>
                            {isActive && (
                              <CornerDownLeft className="size-3 text-primary animate-in fade-in slide-in-from-right-1 duration-200" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground block py-3 text-center bg-muted/10 rounded-xl border border-dashed border-border/60">
                    {t("search.noRecent")}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-border bg-muted/30 flex items-center justify-between text-[10px] text-muted-foreground select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 border rounded bg-background shadow-xs font-mono text-[9px]">
                  ↑↓
                </kbd>
                <span>{t("search.navigate")}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 border rounded bg-background shadow-xs font-mono text-[9px]">
                  ↵ Enter
                </kbd>
                <span>{t("search.select")}</span>
              </span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <Command className="size-3" />
              <span>Search Portal</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppNavbar;
