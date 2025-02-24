import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { CurrentLang, QueryState } from "../stores/coreStore.ts";
import { RouteUtils } from "../utils/routeUtils.ts";
import type { ViewRoute } from "../types/routing.ts";

export default function useQueryHandler(route: ViewRoute) {
  const $queryState = useStore(QueryState);
  const $lang = useStore(CurrentLang);

  const [initDone, setInitDone] = useState(false);

  useEffect(() => {
    QueryState.set(RouteUtils.getQueryParams());
  }, []);

  useEffect(() => {
    if (!initDone) {
      setInitDone(true);
      return;
    }

    RouteUtils.setQueryParams(
      $queryState,
      RouteUtils.getPathForLang(route, $lang),
    );
  }, [$queryState]);

  return {
    state: $queryState,
    setParam: (key: string, value: string | null) => {
      const updatedState = { ...$queryState, [key]: value ?? "" };
      if (value === null) {
        delete updatedState[key];
      }
      QueryState.set(updatedState);
    },
  };
}
