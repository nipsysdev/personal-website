import { ViewRoute } from "../types/viewRoute.ts";
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
    return lang === Lang.En ? route : `/${lang}${route}`;
  },

  isView: (url: URL, route: ViewRoute): boolean => {
    const path = RouteUtils.removeLangFromPath(url.pathname);
    return route === ViewRoute.Terminal
      ? path === route
      : path.startsWith(route);
  },
};
