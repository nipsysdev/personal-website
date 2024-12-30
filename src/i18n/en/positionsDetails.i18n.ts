import type { I18nPositions } from "../i18nTypes.ts";

export default {
  1: {
    description:
      "My first professional experience in web development. I " +
      "was introduced to Yanport's real estate data analysis tools. During these two months, my " +
      "contributions were rather modest and mostly consisted of writing additional unit tests " +
      "and correcting/preventing breakdowns that could occur when aggregating or processing new " +
      "data. The data came from French real estate portals such as LeBonCoin and SeLoger. The " +
      "process was split between two microservices. The objective of the first service was to " +
      "browse these portals at regular intervals to retrieve the HTML code of the ads, as well " +
      "as the code of the ads themselves. The aim of the second service was to extract the " +
      "various metadata from the HTML code, map them to the Yanport data format and then match " +
      "each piece of information to a property, whether already in the database or yet to be " +
      "created.",
    beAccomplishments: [
      "Investigate and fix web crawling issues",
      "Improve html metadata extractor by supporting old and new data structures",
    ],
    feAccomplishments: [],
  },
  2: {
    description: "",
    beAccomplishments: [],
    feAccomplishments: [],
  },
  3: {
    description: "",
    beAccomplishments: [],
    feAccomplishments: [],
  },
  4: {
    description: "",
    beAccomplishments: [],
    feAccomplishments: [],
  },
  5: {
    description: "",
    beAccomplishments: [],
    feAccomplishments: [],
  },
  6: {
    description: "",
    beAccomplishments: [],
    feAccomplishments: [],
  },
} satisfies I18nPositions;
