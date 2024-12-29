import { DevTool } from "../types/work.ts";

// Technology: 7
// Frameworks: 6
// Main Language: 5
// Main Libraries : 4
// Sub Language: 3
// Libraries: 2
// Tools: 1

export default {
  [DevTool.AzureFunctions]: 7,
  [DevTool.CSharp]: 5,
  [DevTool.Angular]: 6,
  [DevTool.AngularJS]: 6,
  [DevTool.AngularMaterial]: 2,
  [DevTool.Blockchain]: 7,
  [DevTool.Bootstrap]: 2,
  [DevTool.Cassandra]: 4,
  [DevTool.CSSGrid]: 1,
  [DevTool.DaisyUI]: 2,
  [DevTool.Datastore]: 4,
  [DevTool.Elasticsearch]: 4,
  [DevTool.Element]: 2,
  [DevTool.ElementPlus]: 2,
  [DevTool.CSSFlexbox]: 1,
  [DevTool.Java]: 5,
  [DevTool.Javascript]: 5,
  [DevTool.Jsoup]: 2,
  [DevTool.NextJS]: 6,
  [DevTool.PWA]: 4,
  [DevTool.RabbitMq]: 4,
  [DevTool.React]: 6,
  [DevTool.Redux]: 6,
  [DevTool.Responsive]: 1,
  [DevTool.SCSS]: 3,
  [DevTool.SSR]: 4,
  [DevTool.Serverless]: 1,
  [DevTool.Storybook]: 2,
  [DevTool.TailwindCSS]: 4,
  [DevTool.Typescript]: 5,
  [DevTool.Vue2]: 6,
  [DevTool.Vue3]: 6,
  [DevTool.Web3]: 6,
} satisfies Record<DevTool, number>;
