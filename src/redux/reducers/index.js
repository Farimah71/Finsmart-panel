import { combineReducers } from "redux";

import authSlice from "./auth/index";
import loadingSlice from "./ui/loading/index";
import themeSlice from "./theme/index";
import userCompanySlice from "./user-company/index";
import countrySlice from "./settings/country/index";
import citySlice from "./settings/city/index";
import currencySlice from "./settings/currency/index";
import languageSlice from "./settings/language/index";
import companyActivityCategorySlice from "./settings/company-activity-category/index";
import companySlice from "./settings/company/index";
import packetSlice from "./settings/packet/index";
import companyPacketSlice from "./settings/company-packet/index";
import FinsmartCodingSlice from "./settings/Finsmart-coding/index";
import FinsmartCodingHeaderSlice from "./settings/Finsmart-coding-header/index";
import companyFinsmartCodingHeaderSlice from "./settings/company-Finsmart-coding-header/index";
import codeMapperSlice from "./settings/code-mapper/index";
import userTypeSlice from "./user-type/index";
import reloadPageSlice from "./ui/reload-page/index";
import codingFlagSlice from "./settings/coding-flag/index";
import companyFileSlice from "./settings/company-file/index";
import tempTransactionSlice from "./settings/temp-transaction/index";
import companyTransactionSlice from "./settings/company-transaction/index";
import ExcelTempDataSlice from "./settings/ExcelTempData/index";
import embedReportSlice from "./settings/embed-report/index";
import sectorSlice from "./settings/sector/index";
import incomeBudgetTypeSlice from "./settings/income-budget-type/index";
import companyContactSlice from "./settings/company-contact";
import companyInvestSlice from "./settings/company-invest";
import companyBudgetFileSlice from "./settings/company-budget-file";
import companyBudgetSlice from "./settings/company-budget";
import companyBudgetHeaderSlice from "./settings/company-budget-header";
import definitionTypeSlice from "./settings/definition-type";
import definitionSlice from "./settings/definition";
import stockSlice from "./settings/stock";
import personnelSlice from "./settings/personnel";
import customerSlice from "./settings/customer";
import companyBudgetDetailSlice from "./settings/company-budget-detail";

export const reducers = combineReducers({
  authSlice,
  loadingSlice,
  themeSlice,
  userCompanySlice,
  countrySlice,
  citySlice,
  languageSlice,
  currencySlice,
  companyActivityCategorySlice,
  companySlice,
  packetSlice,
  companyPacketSlice,
  FinsmartCodingSlice,
  FinsmartCodingHeaderSlice,
  companyFinsmartCodingHeaderSlice,
  codeMapperSlice,
  userTypeSlice,
  reloadPageSlice,
  codingFlagSlice,
  companyFileSlice,
  tempTransactionSlice,
  companyTransactionSlice,
  ExcelTempDataSlice,
  embedReportSlice,
  sectorSlice,
  incomeBudgetTypeSlice,
  companyContactSlice,
  companyInvestSlice,
  companyBudgetFileSlice,
  companyBudgetSlice,
  companyBudgetHeaderSlice,
  definitionSlice,
  definitionTypeSlice,
  personnelSlice,
  customerSlice,
  stockSlice,
  companyBudgetDetailSlice,
});
