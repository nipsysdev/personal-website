import type { ViewRoute } from "../types/viewRoute.ts";

export interface I18nContent {
  core: I18nCore;
  shell: I18Shell;
}

export interface I18nCore {
  siteTitle: string;
  sourceCode: string;
  views: Record<ViewRoute, string>;
}

export interface I18Shell {
  cmdLinePrefix: string;
  unknownCmdErr: string;
}
