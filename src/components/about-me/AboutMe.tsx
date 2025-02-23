import { Component } from "react";
import { type CommandOutputProps } from "../../types/shell.ts";

export default function AboutMe() {
  return <div># todo: define whoami</div>;
}

export class WhoamiOutput extends Component<CommandOutputProps> {
  render() {
    return <AboutMe />;
  }
}
