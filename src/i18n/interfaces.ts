import type { ViewRoute } from "../types/viewRoute.ts";
import type { Command } from "../types/shell.ts";
import {
  type CompanySector,
  CompanySize,
  PositionRole,
  PositionType,
} from "../types/work.ts";

export type I18nDict = Record<string, string>;
export type I18nCmdDesc = Record<Command, I18nCmd>;
export type I18nEnum<T> = Record<T & string, string>;

export interface I18nContent {
  enums: I18nEnums;
  core: I18nCore;
  shell: I18nShell;
  cmdDesc: I18nCmdDesc;
  introOutput: I18nDict;
  setLangOutput: I18nDict;
  experience: I18nDict;
}

export interface I18nCore {
  siteTitle: string;
  sourceCode: string;
  exit: string;
  or: string;
  na: string;
  back: string;
  backspace: string;
  escape: string;
  views: Record<ViewRoute, string>;
}

export interface I18nShell {
  cmdLinePrefix: string;
  unknownCmdErr: string;
  fullScreenMode: string;
}

export interface I18nCmd {
  description: string;
  argsDesc?: Record<string, string>;
}

export interface I18nEnums {
  companySector: I18nEnum<CompanySector>;
  companySize: I18nEnum<CompanySize>;
  positionRole: I18nEnum<PositionRole>;
  positionType: I18nEnum<PositionType>;
}
