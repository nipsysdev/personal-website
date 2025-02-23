import { Component } from "react";
import { type CommandOutputProps } from "../../types/shell.ts";

export default function BlogEntries() {
  return <div># todo: must write about stuff</div>;
}

export class BlogOutput extends Component<CommandOutputProps> {
  render() {
    return <BlogEntries />;
  }
}
