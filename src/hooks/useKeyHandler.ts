import { type KeyboardEvent, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { LastKeyDown, OldKeyDown } from "../stores/coreStore.ts";
import { IsNewKeyEvent } from "../utils/compareUtils.ts";

export default function useKeyHandler(
  handler: (event: KeyboardEvent) => void,
  deactivated?: boolean,
) {
  const $lastKeyDown = useStore(LastKeyDown);
  const $oldKeyDown = useStore(OldKeyDown);

  useEffect(() => {
    if (
      !deactivated &&
      $lastKeyDown &&
      IsNewKeyEvent($oldKeyDown, $lastKeyDown)
    ) {
      const keyDownEvent = $lastKeyDown;
      OldKeyDown.set(keyDownEvent);
      handler(keyDownEvent);
    }
  }, [$lastKeyDown]);
}
