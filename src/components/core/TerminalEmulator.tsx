import { useStore } from "@nanostores/react";
import {
  ShellFullscreenCmd,
  ShellHasIntroduced,
  ShellHistory,
  ShellInput,
  ShellSimCmd,
  ShellSubmission,
} from "../../stores/shellStore.ts";
import { CurrentLang, I18n } from "../../stores/coreStore.ts";
import { Lang } from "../../i18n/i18nMap.ts";
import { createRef, type KeyboardEvent, useEffect, useState } from "react";
import TerminalPrompt from "./TerminalPrompt.tsx";
import { Command } from "../../types/shell.ts";
import { ParseEntry } from "../../shell/processingEntry.ts";
import UnknownCmdOutput from "../cmd-outputs/UnknownCmdOutput.tsx";

export default function TerminalEmulator({ lang }: { lang: Lang }) {
  CurrentLang.set(lang);
  const $I18n = useStore(I18n);
  const $input = useStore(ShellInput);
  const $submission = useStore(ShellSubmission);
  const $simCmd = useStore(ShellSimCmd);
  const $history = useStore(ShellHistory);
  const $fullscreenCmd = useStore(ShellFullscreenCmd);
  const $hasIntroduced = useStore(ShellHasIntroduced);
  const mainPrompt = createRef<TerminalPrompt>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastKeyDown, setLastKeyDown] = useState<KeyboardEvent>();

  useEffect(() => {
    mainPrompt.current?.focus();

    if (!$hasIntroduced) {
      ShellHasIntroduced.set(true);
      mainPrompt.current?.simulate(Command.Intro);
    }
  }, []);

  useEffect(() => {
    if (!$submission) return;
    ShellSubmission.set("");

    if ($submission === "clear") {
      // TODO: Keep history, only clear terminal
      ShellHistory.set([]);
      return;
    }

    const cmdEntry = ParseEntry($submission);
    ShellHistory.set([...$history, cmdEntry]);

    if (cmdEntry.fullscreen) {
      ShellFullscreenCmd.set(cmdEntry.cmdName);
    }

    setTimeout(() => {
      mainPrompt.current?.scrollIntoView();
    }, 100);
  }, [$submission]);

  useEffect(() => {
    if (!$simCmd) return;
    mainPrompt.current?.simulate($simCmd);
    ShellSimCmd.set("");
  }, [$simCmd]);

  useEffect(() => {
    if (!$input) return;
    mainPrompt.current?.setInput($input);
    ShellInput.set("");
  }, [$input]);

  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    setLastKeyDown(e);

    switch (e.key) {
      case "Escape":
        ShellFullscreenCmd.set(undefined);
        return;
    }
  };

  const standardView = (
    <div
      role="button"
      tabIndex={0}
      className="size-full flex flex-col cursor-default"
      onKeyDown={keyDownHandler}
      onClick={() => mainPrompt.current?.focus()}
    >
      {$history
        .filter((e) => !e.fullscreen)
        .map((entry) => (
          <div key={entry.timestamp}>
            <TerminalPrompt i18nContent={$I18n} entry={entry} />
            {entry.output ? (
              <entry.output entry={entry} i18nContent={$I18n} />
            ) : (
              <UnknownCmdOutput cmdName={entry.cmdName} />
            )}
          </div>
        ))}
      <TerminalPrompt ref={mainPrompt} i18nContent={$I18n} history={$history} />
    </div>
  );

  const fullscreenView = <div className="size-full flex flex-col gap-3"></div>;

  return (
    <div className="size-full overflow-y-scroll select-none text-sm sm:text-base">
      {$fullscreenCmd ? fullscreenView : standardView}
    </div>
  );
}
