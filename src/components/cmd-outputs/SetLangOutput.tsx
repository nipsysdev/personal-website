import { Component } from "react";
import {
  Command,
  type CommandInfo,
  type CommandOutputProps,
} from "../../types/shell.ts";
import Commands from "../../constants/commands.ts";
import { ShellHasRefreshed } from "../../stores/shellStore.ts";
import { Lang } from "../../constants/lang.ts";

interface State {
  changedToLang: Lang | null;
  cmdInfo: CommandInfo | null;
}

export default class SetLangOutput extends Component<
  CommandOutputProps,
  State
> {
  readonly state: State = {
    changedToLang: null,
    cmdInfo: null,
  };

  componentDidMount() {
    const cmdInfo =
      Commands.find((cmd) => cmd.name === Command.SetLang) ?? null;
    const lang = this.props.entry.option?.toLocaleLowerCase() as Lang | null;
    this.setState(
      {
        changedToLang: lang,
        cmdInfo,
      },
      () => {
        if (cmdInfo && lang && !ShellHasRefreshed.get()) {
          ShellHasRefreshed.set(true);
          document
            .getElementById(`LangSwitcher-${this.state.changedToLang}`)
            ?.click();
        }
      },
    );
  }

  render() {
    if (this.state.changedToLang) {
      return (
        <span>
          {this.props.i18nContent.setLangOutput.changed}
          {this.props.i18nContent.setLangOutput[this.state.changedToLang]}
        </span>
      );
    }

    const options = this.state.cmdInfo?.options?.join(", ") ?? "";
    return (
      <span className="text-firebrick">
        {this.props.i18nContent.setLangOutput.unexpectedArg}&nbsp;{options}
      </span>
    );
  }
}
