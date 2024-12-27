import type { ViewRoute } from "../types/viewRoute.ts";

export interface I18nContent {
  core: I18nCore;
  shell: I18nShell;
  introOutput: I18nIntroOutput;
}

export interface I18nCore {
  siteTitle: string;
  sourceCode: string;
  views: Record<ViewRoute, string>;
}

export interface I18nShell {
  cmdLinePrefix: string;
  unknownCmdErr: string;
}

export interface I18nIntroOutput {
  welcome: string;
  iam: string;
  workTitle: string;
  tabBrowsing: string;
  cmdBrowsing: string;
  clickable: string;
}
