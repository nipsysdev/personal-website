import { type KeyboardEvent } from "react";

export function IsNewKeyEvent(
  oldEvent?: KeyboardEvent | null,
  newEvent?: KeyboardEvent | null,
): boolean {
  return (
    !!newEvent &&
    (!oldEvent ||
      oldEvent.key !== newEvent.key ||
      oldEvent.timeStamp !== newEvent.timeStamp)
  );
}
