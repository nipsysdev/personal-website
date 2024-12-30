import { Component } from "react";
import { Command, type CommandOutputProps } from "../../types/shell.ts";
import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard";
import CmdLink from "../shell/CmdLink.tsx";

export default class IntroOutput extends Component<CommandOutputProps> {
  readonly name = "Xavier Saliniere";

  readonly state = {
    figletText: "",
  };

  componentDidMount() {
    figlet.parseFont("Standard", standard);
    figlet.text(
      this.name,
      {
        font: "Standard",
      },
      (_, data) => this.setState({ figletText: data }),
    );
  }

  render() {
    return (
      <>
        <div className="hidden md:block font-mono text-xs leading-none whitespace-break-spaces">
          {this.state.figletText}
        </div>

        <p>{this.props.i18nContent.introOutput.welcome}</p>

        <p>
          {this.props.i18nContent.introOutput.iam}&nbsp;
          <span className="text-lightseagreen font-bold">{this.name}</span>
          {this.props.i18nContent.introOutput.workTitle}
        </p>

        <p className="leading-5 my-3">
          {this.props.i18nContent.introOutput.tabBrowsing}
          <br />
          {this.props.i18nContent.introOutput.cmdBrowsing}&nbsp;
          <CmdLink cmdName={Command.Help} />
          &nbsp;
          <span className="text-xs">
            {this.props.i18nContent.introOutput.clickable}
          </span>
          .
        </p>
      </>
    );
  }
}
