import { Company } from "../../types/work.ts";
import type { I18nCompanies } from "../i18nTypes.ts";

export default {
  [Company.Yanport]:
    "Yanport accompagne au quotidien les professionnels de l'immobilier résidentiel grâce à ses " +
    "solutions d'évaluation, d'aide à la décision et d'analyse immobilière.",
  [Company.Onepoint]: "",
  [Company.RenaultDigital]:
    "Renault Digital numérise le cœur de métier de Renault pour ses employés, ses partenaires " +
    "et ses clients dans le monde entier.",
  [Company.Talan]: "",
  [Company.Bell]:
    "Bell est la plus grande entreprise de communications du Canada. Fournissant des " +
    "services avancés sans fil, Internet, télévision, médias et communications d'affaires " +
    "large bande.",
  [Company.Chainify]:
    "Chainify est une entreprise technologique qui vise à combler le fossé " +
    "entre les jeux traditionnels et la technologie blockchain.",
} satisfies I18nCompanies;
