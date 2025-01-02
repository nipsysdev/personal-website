import { type JSX, useEffect } from "react";
import { CurrentLang } from "../stores/coreStore.ts";
import { Lang } from "../constants/lang.ts";

interface Props {
  lang: string | undefined;
  children: JSX.Element | null;
}

export default function I18nWrapper(props: Props) {
  useEffect(() => {
    CurrentLang.set((props.lang as Lang | undefined) ?? Lang.En);
  }, [props.lang]);
  return props.children;
}
