import { type JSX, useEffect } from "react";
import { CurrentLang } from "../stores/coreStore.ts";
import type { Lang } from "../constants/lang.ts";

interface Props {
  lang: Lang;
  children: JSX.Element | null;
}

export default function I18nWrapper(props: Props) {
  useEffect(() => {
    CurrentLang.set(props.lang);
  }, [props.lang]);
  return props.children;
}
