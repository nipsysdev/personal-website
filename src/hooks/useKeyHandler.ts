import { type KeyboardEvent, useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { LastKeyDown } from "../stores/coreStore.ts";
import { IsNewKeyEvent } from "../utils/keyboardUtils.ts";

export default function useKeyHandler(handler: (event: KeyboardEvent) => void) {
  const $lastKeyDown = useStore(LastKeyDown);
  const [previousEvent, setPreviousEvent] = useState<KeyboardEvent | null>(
    null,
  );

  useEffect(() => {
    if ($lastKeyDown && IsNewKeyEvent(previousEvent, $lastKeyDown)) {
      const keyDownEvent = $lastKeyDown;
      setPreviousEvent(keyDownEvent);
      handler(keyDownEvent);
    }
  }, [$lastKeyDown]);
}
