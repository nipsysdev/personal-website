import type { ViewRoute } from "../types/viewRoute.ts";
import type { Command } from "../types/shell.ts";
import {
  Company,
  type CompanySector,
  CompanySize,
  PositionRole,
  PositionType,
} from "../types/work.ts";

export type I18nDict = Record<string, string>;
export type I18nCmdDesc = Record<Command, I18nCmd>;
export type I18nEnum<T> = Record<T & string, string>;
export type I18nPositions = Record<number, I18nPosition>;
export type I18nCompanies = Record<Company, string>;

export interface I18nContent {
  enums: I18nEnums;
  cmdDesc: I18nCmdDesc;
  core: I18nDict;
  shell: I18nDict;
  introOutput: I18nDict;
  setLangOutput: I18nDict;
  experience: I18nDict;
  positionsDetails: I18nPositions;
  companiesDetails: I18nCompanies;
}

export interface I18nCmd {
  description: string;
  argsDesc?: Record<string, string>;
}

export interface I18nEnums {
  viewRoute: I18nEnum<ViewRoute>;
  companySector: I18nEnum<CompanySector>;
  companySize: I18nEnum<CompanySize>;
  positionRole: I18nEnum<PositionRole>;
  positionType: I18nEnum<PositionType>;
}

export interface I18nPosition {
  description: string;
  beAccomplishments: string[];
  feAccomplishments: string[];
}
