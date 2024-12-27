import type { I18nContent } from "./interfaces.ts";
import EnCore from "./en/core.ts";
import EnShell from "./en/shell.ts";
import EnIntroOutput from "./en/introOutput.ts";
import EnCmdDesc from "./en/cmdDesc.ts";
import FrCore from "./fr/core.ts";
import FrShell from "./fr/shell.ts";
import FrIntroOutput from "./fr/introOutput.ts";
import FrCmdDesc from "./fr/cmdDesc.ts";

export enum Lang {
  En = "en",
  Fr = "fr",
}

export const LangLabels: Record<Lang, string> = {
  [Lang.En]: "English",
  [Lang.Fr]: "Français",
};

export const I18nMap: Record<Lang, I18nContent> = {
  [Lang.En]: {
    core: EnCore,
    shell: EnShell,
    introOutput: EnIntroOutput,
    cmdDesc: EnCmdDesc,
  },
  [Lang.Fr]: {
    core: FrCore,
    shell: FrShell,
    introOutput: FrIntroOutput,
    cmdDesc: FrCmdDesc,
  },
};
