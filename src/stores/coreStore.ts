import { atom, computed } from "nanostores";
import { I18nMap, Lang } from "../i18n/i18nMap.ts";

export const CurrentLang = atom(Lang.En);
export const I18n = computed(CurrentLang, (lang) => I18nMap[lang]);
