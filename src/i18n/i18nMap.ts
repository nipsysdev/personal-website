import type { I18nContent } from "./i18nTypes.ts";
import EnEnums from "./en/enums.i18n.ts";
import EnCore from "./en/core.i18n.ts";
import EnShell from "./en/shell.i18n.ts";
import EnIntroOutput from "./en/introOutput.i18n.ts";
import EnCmdDesc from "./en/cmdDesc.i18n.ts";
import EnSetLangOutput from "./en/setLangOutput.i18n.ts";
import EnExperience from "./en/experience.i18n.ts";
import EnPositions from "./en/positionsDetails.i18n.ts";
import EnCompanies from "./en/companiesDetails.i18n.ts";
import FrEnums from "./fr/enums.i18n.ts";
import FrCore from "./fr/core.i18n.ts";
import FrShell from "./fr/shell.i18n.ts";
import FrIntroOutput from "./fr/introOutput.i18n.ts";
import FrCmdDesc from "./fr/cmdDesc.i18n.ts";
import FrSetLangOutput from "./fr/setLangOutput.i18n.ts";
import FrExperience from "./fr/experience.i18n.ts";
import FrPositions from "./fr/positionsDetails.i18n.ts";
import FrCompanies from "./fr/companiesDetails.i18n.ts";
import { Lang } from "../constants/lang.ts";

export const I18nMap: Record<Lang, I18nContent> = {
  [Lang.En]: {
    enums: EnEnums,
    cmdDesc: EnCmdDesc,
    core: EnCore,
    shell: EnShell,
    introOutput: EnIntroOutput,
    setLangOutput: EnSetLangOutput,
    experience: EnExperience,
    positionsDetails: EnPositions,
    companiesDetails: EnCompanies,
  },
  [Lang.Fr]: {
    enums: FrEnums,
    cmdDesc: FrCmdDesc,
    core: FrCore,
    shell: FrShell,
    introOutput: FrIntroOutput,
    setLangOutput: FrSetLangOutput,
    experience: FrExperience,
    positionsDetails: FrPositions,
    companiesDetails: FrCompanies,
  },
};
