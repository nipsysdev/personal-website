import type { I18nContent } from "./interfaces.ts";
import EnEnums from "./en/enums.i18n.ts";
import EnCore from "./en/core.ts";
import EnShell from "./en/shell.ts";
import EnIntroOutput from "./en/introOutput.ts";
import EnCmdDesc from "./en/cmdDesc.ts";
import EnSetLangOutput from "./en/setLangOutput.ts";
import EnExperience from "./en/experience.i18n.ts";
import FrEnums from "./fr/enums.i18n.ts";
import FrCore from "./fr/core.ts";
import FrShell from "./fr/shell.ts";
import FrIntroOutput from "./fr/introOutput.ts";
import FrCmdDesc from "./fr/cmdDesc.ts";
import FrSetLangOutput from "./fr/setLangOutput.ts";
import FrExperience from "./fr/experience.i18n.ts";
import { Lang } from "../constants/lang.ts";

export const I18nMap: Record<Lang, I18nContent> = {
  [Lang.En]: {
    enums: EnEnums,
    core: EnCore,
    shell: EnShell,
    cmdDesc: EnCmdDesc,
    introOutput: EnIntroOutput,
    setLangOutput: EnSetLangOutput,
    experience: EnExperience,
  },
  [Lang.Fr]: {
    enums: FrEnums,
    core: FrCore,
    shell: FrShell,
    cmdDesc: FrCmdDesc,
    introOutput: FrIntroOutput,
    setLangOutput: FrSetLangOutput,
    experience: FrExperience,
  },
};
