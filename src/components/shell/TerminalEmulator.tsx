import { useStore } from "@nanostores/react";
import {
  ShellFullscreenEntry,
  ShellHasIntroduced,
  ShellHasRefreshed,
  ShellHistory,
  ShellInput,
  ShellSimCmd,
  ShellSubmission,
} from "../../stores/shellStore.ts";
import { CurrentLang, I18n } from "../../stores/coreStore.ts";
import { createRef, type KeyboardEvent, useEffect, useState } from "react";
import TerminalPrompt from "./TerminalPrompt.tsx";
import { Command, type CommandEntry } from "../../types/shell.ts";
import { ParseEntry } from "../../utils/shellUtils.ts";
import UnknownCmdOutput from "../cmd-outputs/UnknownCmdOutput.tsx";
import { Lang } from "../../constants/lang.ts";

export default function TerminalEmulator({ lang }: { lang: Lang }) {
  CurrentLang.set(lang);
  const $i18n = useStore(I18n);
  const $input = useStore(ShellInput);
  const $submission = useStore(ShellSubmission);
  const $simCmd = useStore(ShellSimCmd);
  const $history = useStore(ShellHistory);
  const $fullscreenEntry = useStore(ShellFullscreenEntry);
  const $hasIntroduced = useStore(ShellHasIntroduced);
  const mainPrompt = createRef<TerminalPrompt>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    mainPrompt.current?.focus();

    if (!$hasIntroduced && mainPrompt.current) {
      ShellHasIntroduced.set(true);
      mainPrompt.current?.simulate(Command.Intro);
    }
  }, [mainPrompt]);

  useEffect(() => {
    if (!$submission) return;
    ShellSubmission.set("");
    ShellHasRefreshed.set(false);

    if ($submission === "clear") {
      // TODO: Keep history, only clear terminal
      ShellHistory.set([]);
      return;
    }

    const cmdEntry = ParseEntry($submission);
    ShellHistory.set([...$history, cmdEntry]);

    if (cmdEntry.fullscreen) {
      ShellFullscreenEntry.set(cmdEntry);
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

  const exitFullscreen = () => {
    ShellFullscreenEntry.set(undefined);
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Escape":
        ShellFullscreenEntry.set(undefined);
        exitFullscreen();
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
            <TerminalPrompt i18nContent={$i18n} entry={entry} />
            {entry.output ? (
              <entry.output entry={entry} i18nContent={$i18n} />
            ) : (
              <UnknownCmdOutput cmdName={entry.cmdName} />
            )}
          </div>
        ))}
      <TerminalPrompt ref={mainPrompt} i18nContent={$i18n} history={$history} />
    </div>
  );

  const fullscreenView = (entry: CommandEntry) =>
    entry.output ? (
      <div className="size-full flex flex-col gap-3">
        <div className="flex-auto overflow-hidden">
          <entry.output entry={entry} i18nContent={$i18n} />
        </div>

        <div className="flex text-steelblue">
          <div className="flex-auto flex items-center justify-end text-sm">
            {$i18n.shell.fullScreenMode}&nbsp;/&nbsp;
            <button
              className="font-bold text-darkgoldenrod cursor-pointer text-base"
              onClick={exitFullscreen}
            >
              [{$i18n.core.exit}]
            </button>
            &nbsp;{$i18n.core.or}&nbsp;&lt;{$i18n.core.escape}&gt;
          </div>
        </div>
      </div>
    ) : null;

  if (isLoading) return null;

  return (
    <div className="size-full overflow-y-scroll select-none text-sm sm:text-base">
      {$fullscreenEntry ? fullscreenView($fullscreenEntry) : standardView}
    </div>
  );
}