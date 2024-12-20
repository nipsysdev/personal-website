import type { ViewRoute } from "../constants/routes.ts";

export interface I18nContent {
  core: I18nCore;
}

export interface I18nCore {
  siteTitle: string;
  sourceCode: string;
  views: Record<ViewRoute, string>;
}
