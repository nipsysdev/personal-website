import { useStore } from "@nanostores/react";
import { CurrentLang, IsTerminal, QueryState } from "../../stores/coreStore.ts";
import React, { type JSX, useEffect, useRef, useState } from "react";
import { type AppRoute, ViewRoute } from "../../types/routing.ts";
import { LastRouteReq } from "../../stores/shellStore.ts";
import { RouteUtils } from "../../utils/routeUtils.ts";
import { type KeyListen } from "../../types/keyboard.ts";
import useKeyHandler from "../../hooks/useKeyHandler.ts";
import useIsPrerender from "../../hooks/useIsPrerender.ts";

interface Props {
  route: ViewRoute;
  children: JSX.Element | JSX.Element[] | string;
  param?: string | number;
  listen?: KeyListen;
  goldenLink?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
  resetQueryParams?: boolean;
  onMouseEnter?: () => void;
}

export default function AppLink(props: Props) {
  const $isPrerender = useIsPrerender();
  const $lang = useStore(CurrentLang);
  const $isTerminal = useStore(IsTerminal);
  const $queryState = useStore(QueryState);

  const canListen = useRef(true);

  const computeUrl = () => {
    if ($isTerminal) {
      return "";
    }
    let url = RouteUtils.getPathForLang(props.route, $lang);
    url = props.param !== undefined ? `${url}${props.param}/` : url;

    if (!$isPrerender && !props.resetQueryParams) {
      url = RouteUtils.getRouteWithParams($queryState, url);
    }
    return url;
  };

  const [url, setUrl] = useState(computeUrl());

  useEffect(() => {
    canListen.current = !props.listen?.deactivated;
  }, [props.listen?.deactivated]);

  useEffect(() => {
    setUrl(computeUrl());
  }, [$queryState, $isPrerender]);

  const goldenClassNames = props.goldenLink
    ? `golden-link text-base`
    : undefined;
  const classNames = [props.className, goldenClassNames, "cursor-pointer"]
    .filter(Boolean)
    .join(" ");
  const content = props.goldenLink ? `[${props.children}]` : props.children;

  const appRoute: AppRoute = {
    viewRoute: props.route,
    param: props.param,
    timeStamp: Date.now(),
  };
  const goToRoute = () => LastRouteReq.set(appRoute);

  if (props.listen) {
    useKeyHandler((event) => {
      if (event.key === props.listen?.key) {
        if ($isTerminal) {
          goToRoute();
        } else {
          window.location.href = url;
        }
      }
    }, props.listen.deactivated);
  }

  return $isTerminal ? (
    <div
      ref={props.ref}
      className={classNames}
      onClick={goToRoute}
      onKeyDown={goToRoute}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
      role="button"
      tabIndex={-1}
    >
      {content}
    </div>
  ) : (
    <a
      className={classNames}
      href={url}
      style={props.style}
      onMouseEnter={props.onMouseEnter}
    >
      {content}
    </a>
  );
}
