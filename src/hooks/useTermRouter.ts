import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { IsNewRouteEvent } from "../utils/compareUtils.ts";
import { type AppRoute, ViewRoute } from "../types/routing.ts";
import { LastRouteReq, OldRouteReq } from "../stores/shellStore.ts";

export default function useTermRouter(
  listenRoute: ViewRoute,
  handler: (appRoute: AppRoute) => void,
) {
  const $lastRouteReq = useStore(LastRouteReq);
  const $oldRouteReq = useStore(OldRouteReq);

  useEffect(() => {
    if (
      $lastRouteReq &&
      $lastRouteReq.viewRoute === listenRoute &&
      IsNewRouteEvent($oldRouteReq, $lastRouteReq)
    ) {
      const appRoute = $lastRouteReq;
      OldRouteReq.set(appRoute);
      handler(appRoute);
    }
  }, [$lastRouteReq]);
}
