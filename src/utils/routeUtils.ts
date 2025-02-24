import { ViewRoute } from "../types/routing.ts";
import { Lang } from "../constants/lang.ts";

export const RouteUtils = {
  removeLangFromPath: (pathname: string): string => {
    let _pathname = `${pathname}`;
    Object.values(Lang).forEach((lang) => {
      if (_pathname.startsWith(`/${lang}/`)) {
        _pathname = pathname.slice(lang.length + 1, pathname.length);
      }
    });
    return _pathname;
  },

  getUrlForLang: (url: URL, lang: Lang): string => {
    return RouteUtils.getPathForLang(url.pathname, lang);
  },

  getPathForLang: (pathname: string, lang: Lang): string => {
    const route = RouteUtils.removeLangFromPath(pathname);
    const path = lang === Lang.En ? route : `/${lang}${route}`;
    return path.endsWith("/") ? path : `${path}/`;
  },

  isView: (url: URL, route: ViewRoute): boolean => {
    const path = RouteUtils.removeLangFromPath(url.pathname);
    return route === ViewRoute.Terminal
      ? path === route
      : path.startsWith(route);
  },

  getQueryParams: (): Record<string, string> => {
    return Object.fromEntries(
      new URLSearchParams(window.location.search).entries(),
    );
  },

  setQueryParams: (queryState: Record<string, string>, baseRoute: string) => {
    const params = new URLSearchParams(queryState);
    const queryStr = params.size ? `?${params.toString()}` : "";
    window.history.replaceState({}, "", `${baseRoute}${queryStr}`);
  },
};
