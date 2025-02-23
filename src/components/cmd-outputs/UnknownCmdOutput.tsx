import { useStore } from "@nanostores/react";
import { I18n } from "../../stores/coreStore.ts";

export default function UnknownCmdOutput({ cmdName }: { cmdName: string }) {
  const $I18n = useStore(I18n);
  return (
    <span className="text-firebrick">
      {$I18n.shell.unknownCmdErr}: {cmdName}
    </span>
  );
}
