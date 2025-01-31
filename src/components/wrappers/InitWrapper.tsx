import { type JSX, useEffect } from "react";
import { AstroEnv, CurrentLang } from "../../stores/coreStore.ts";
import { Lang } from "../../constants/lang.ts";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/fr";
import useIsPrerender from "../../hooks/useIsPrerender.ts";

interface Props {
  env: Record<string, unknown>;
  lang: string | undefined;
  children: JSX.Element | null;
}

export default function InitWrapper(props: Props) {
  const isPrerender = useIsPrerender();

  useEffect(() => {
    AstroEnv.set(props.env);
    const currentLang = (props.lang as Lang | undefined) ?? Lang.En;
    CurrentLang.set(currentLang);
    dayjs.locale(currentLang);
  }, [props.env, props.lang]);

  return (
    <div
      className={`${isPrerender ? "opacity-0" : "opacity-100"} size-full bg-darkerslategray relative z-10`}
    >
      {props.children}
    </div>
  );
}
