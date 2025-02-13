import { useStore } from "@nanostores/react";
import { CurrentLang, IsTerminal } from "../../stores/coreStore.ts";
import React, { type JSX, useEffect, useRef } from "react";
import { type AppRoute, ViewRoute } from "../../types/routing.ts";
import { LastRouteReq } from "../../stores/shellStore.ts";
import { RouteUtils } from "../../utils/routeUtils.ts";
import { type KeyListen } from "../../types/keyboard.ts";
import useKeyHandler from "../../hooks/useKeyHandler.ts";

interface Props {
  route: ViewRoute;
  children: JSX.Element | JSX.Element[] | string;
  param?: string | number;
  listen?: KeyListen;
  goldenLink?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
}

export default function AppLink(props: Props) {
  const $lang = useStore(CurrentLang);
  const $isTerminal = useStore(IsTerminal);
  const canListen = useRef(true);

  useEffect(() => {
    canListen.current = !props.listen?.deactivated;
  }, [props.listen?.deactivated]);

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

  let url = RouteUtils.getPathForLang(props.route, $lang);
  url = props.param !== undefined ? `${url}${props.param}/` : url;

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
