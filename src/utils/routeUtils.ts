import { ViewRoute } from "../types/viewRoute.ts";
import { Lang } from "../constants/lang.ts";

export const RouteUtils = {
  removeLang: (url: URL): string => {
    let { pathname } = url;
    Object.values(Lang).forEach((lang) => {
      if (pathname.startsWith(`/${lang}/`)) {
        pathname = url.pathname.slice(lang.length + 1, url.pathname.length);
      }
    });
    return pathname;
  },

  getCurrentForLang: (url: URL, lang: Lang): string => {
    const route = RouteUtils.removeLang(url);
    return lang === Lang.En ? route : `/${lang}${route}`;
  },

  isView: (url: URL, route: ViewRoute): boolean => {
    const path = RouteUtils.removeLang(url);
    return route === ViewRoute.Terminal
      ? path === route
      : path.startsWith(route);
  },
};
