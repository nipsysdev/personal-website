import type { I18nPositions } from "../i18nTypes.ts";

export default {
  1: {
    description:
      "Ma première expérience professionnelle en développement " +
      "web. J'ai été initié aux outils d'analyse de données immobilières de Yanport. Pendant " +
      "ces deux mois, mes contributions ont été plutôt modestes et ont surtout consisté à écrire " +
      "des tests unitaires supplémentaires et à corriger/prévenir les pannes qui pouvaient " +
      "survenir lors de l'agrégation ou du traitement de nouvelles données. Les données " +
      "provenaient de portails immobiliers français tels que LeBonCoin ou SeLoger. Le processus " +
      "était partagé entre deux microservices. L'objectif du premier service consistait à " +
      "parcourir ces portails à intervalles réguliers afin de récupérer le code HTML des " +
      "annonces ainsi que le code des annonces elles-mêmes. Le second service visait à extraire " +
      "les différentes métadonnées du code HTML, puis à les mettre en correspondance avec le " +
      "format de données Yanport avant de faire correspondre chaque information avec une " +
      "propriété, qu'elle soit déjà dans la base de données ou qu'elle doive être créée. ",
    beAccomplishments: [
      "Examiner et résoudre les problèmes liés au web crawling",
      "Améliorer l'extracteur de métadonnées html en prenant en charge les anciennes et les " +
        "nouvelles structures de données",
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
