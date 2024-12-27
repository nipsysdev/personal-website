import {
  Component,
  createRef,
  type KeyboardEvent,
  type RefObject,
} from "react";
import type { CommandEntry } from "../../types/shell.ts";
import type { I18nContent } from "../../i18n/interfaces.ts";
import { ShellSubmission } from "../../stores/shellStore.ts";
import { GetEntryInput } from "../../shell/processingEntry.ts";

interface Props {
  i18nContent: I18nContent;
  entry?: CommandEntry;
  history?: CommandEntry[];
}

interface State {
  inputText: string;
  inputRef: RefObject<HTMLInputElement | null>;
  historyIdx: number;
}

export default class TerminalPrompt extends Component<Props, State> {
  state = {
    inputText: "",
    inputRef: createRef<HTMLInputElement>(),
    historyIdx: -1,
  };

  componentDidMount() {
    if (this.props.entry) {
      this.setInput(GetEntryInput(this.props.entry));
    }
  }

  focus() {
    this.state.inputRef.current?.focus();
  }

  simulate(input: string) {
    let i = 0;
    this.setInput("");

    const addChar = (cmd: string) => {
      if (!cmd || i >= cmd.length) {
        this.submit();
        return;
      }
      this.setInput(this.state.inputText + cmd.charAt(i));
      i++;

      setTimeout(() => {
        addChar(cmd);
      }, 50);
    };
    addChar(input);
    this.state.inputRef.current?.focus();
  }

  scrollIntoView() {
    this.state.inputRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  setInput(input: string): void {
    this.setState((previousState) => ({ ...previousState, inputText: input }));
  }

  private setHistoryIdx(idx: number): void {
    this.setState((previousState) => ({ ...previousState, historyIdx: idx }));
  }

  private resetEntry(): void {
    this.setState((previousState) => ({
      ...previousState,
      historyIdx: -1,
      inputText: "",
    }));
  }

  private submit(): void {
    ShellSubmission.set(this.state.inputText);
    this.setInput("");
  }

  private usePreviousEntry() {
    if (!this.props.history || this.state.historyIdx === 0) return;
    const idx =
      this.state.historyIdx === -1
        ? this.props.history.length - 1
        : this.state.historyIdx - 1;
    this.setInput(this.getPastInputStr(this.props.history[idx]));
    this.updateCursorPosition();
    this.setHistoryIdx(idx);
  }

  private useNextEntry() {
    if (!this.props.history || this.state.historyIdx === -1) return;
    let idx = this.state.historyIdx;

    if (idx === this.props.history.length - 1) {
      this.resetEntry();
      return;
    }

    idx++;
    this.setInput(this.getPastInputStr(this.props.history[idx]));
    this.updateCursorPosition();
    this.setHistoryIdx(idx);
  }

  private getPastInputStr(entry: CommandEntry): string {
    let pastInput = entry.cmdName as string;
    if (entry.option) {
      pastInput += ` ${entry.option}`;
    }
    if (entry.argName) {
      pastInput += ` --${entry.argName}=${entry.argValue}`;
    }
    return pastInput;
  }

  private updateCursorPosition(): void {
    setTimeout(() => {
      if (this.state.inputRef.current) {
        this.state.inputRef.current.setSelectionRange(
          this.state.inputText.length,
          this.state.inputText.length,
        );
      }
    }, 50);
  }

  private keyDownHandler(event: KeyboardEvent<HTMLInputElement>): void {
    switch (event.key) {
      case "Enter":
        this.submit();
        break;
      case "Escape":
        this.resetEntry();
        break;
      case "ArrowUp":
        this.usePreviousEntry();
        break;
      case "ArrowDown":
        this.useNextEntry();
    }
  }

  render = () => (
    <div className="flex w-full gap-x-2">
      <div className="font-bold">
        <span className="text-steelblue">
          {this.props.i18nContent.shell.cmdLinePrefix}
        </span>
        :<span className="text-steelblue">~</span>$
      </div>
      <input
        ref={this.state.inputRef}
        value={this.state.inputText}
        type="text"
        spellCheck="false"
        readOnly={!!this.props.entry}
        onChange={(e) => this.setInput(e.target.value)}
        onKeyDown={(e) => this.keyDownHandler(e)}
        onBeforeInput={() => this.setHistoryIdx(-1)}
      />

      <style lang="scss" scoped>
        {`
          input {
            all: unset;
            flex: 1 1 auto;
            width: inherit;
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  );
}
