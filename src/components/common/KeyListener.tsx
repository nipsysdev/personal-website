import { LastKeyDown } from "../../stores/coreStore.ts";

export const KeyListener = () => (
  <button
    className="opacity-0 fixed -bottom-5"
    onKeyDown={LastKeyDown.set}
    onBlur={(e) => e.target.focus()}
    /*eslint-disable-next-line jsx-a11y/no-autofocus*/
    autoFocus
  />
);
