import { Company } from "../../types/work.ts";
import type { I18nCompanies } from "../i18nTypes.ts";

export default {
  [Company.Yanport]:
    "Yanport supports residential real estate professionals on a daily basis with its " +
    "valuation, decision support and real estate analysis solutions.",
  [Company.Onepoint]: "",
  [Company.RenaultDigital]:
    "Renault Digital digitizes Renault's core business for its employees, partners and " +
    "customers worldwide.",
  [Company.Talan]: "",
  [Company.Bell]:
    "Bell is Canada's largest communications company. Providing an advanced suite of wireless, " +
    "Internet, television, media and broadband business communications services.",
  [Company.Chainify]:
    "Chainify is a technology company that aims to bridge the gap between traditional gaming " +
    "and blockchain technology.",
} satisfies I18nCompanies;
