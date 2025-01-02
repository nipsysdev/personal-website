import { type JSX, useEffect } from "react";
import { CurrentLang } from "../stores/coreStore.ts";
import { Lang } from "../constants/lang.ts";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/fr";

interface Props {
  lang: string | undefined;
  children: JSX.Element | null;
}

export default function I18nWrapper(props: Props) {
  useEffect(() => {
    const currentLang = (props.lang as Lang | undefined) ?? Lang.En;
    CurrentLang.set(currentLang);
    dayjs.locale(currentLang);
  }, [props.lang]);
  return props.children;
}
