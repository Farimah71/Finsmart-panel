import { API_URL } from "../../config";

export const SettingsApi = {
  // ========== PowerBi ==========
  getEmbedReport: `${API_URL}/PowerBI/EmbedReport`,

  // ========== AccountType ==========
  getAccountTypes: `${API_URL}/AccountType/Get`,
  getAccountType: `${API_URL}/AccountType/Get/`,
  createAccountType: `${API_URL}/AccountType/Post`,
  editAccountType: `${API_URL}/AccountType/Put/`,
  deleteAccountType: `${API_URL}/AccountType/Delete/`,

  // ========== City ==========
  getCities: `${API_URL}/City/Get`,
  getCity: `${API_URL}/City/Get/`,
  createCity: `${API_URL}/City/Post`,
  editCity: `${API_URL}/City/Put/`,
  deleteCity: `${API_URL}/City/Delete/`,

  // ========== Currency ==========
  getCurrencies: `${API_URL}/Currency/Get`,
  getCurrency: `${API_URL}/Currency/Get/`,
  createCurrency: `${API_URL}/Currency/Post`,
  editCurrency: `${API_URL}/Currency/Put/`,
  deleteCurrency: `${API_URL}/Currency/Delete/`,
  getCurrencySuggestion: `${API_URL}/Currency/Suggestion`,

  // ========== Country ==========
  getCountries: `${API_URL}/Country/Get`,
  getCountry: `${API_URL}/Country/Get/`,
  createCountry: `${API_URL}/Country/Post`,
  editCountry: `${API_URL}/Country/Put/`,
  deleteCountry: `${API_URL}/Country/Delete/`,
  getCountrySuggestion: `${API_URL}/Country/Suggestion`,

  // ========== Company ==========
  getCompanies: `${API_URL}/Company/Get`,
  getCompany: `${API_URL}/Company/Get/`,
  createCompany: `${API_URL}/Company/Post`,
  editCompany: `${API_URL}/Company/Put/`,
  deleteCompany: `${API_URL}/Company/Delete/`,
  getCompanySuggestion: `${API_URL}/Company/Suggestion`,
  updateERP: `${API_URL}/Company/UpdateERP`,

  // ========== Login History ==========
  changeCompany: `${API_URL}/LoginHistory/ChangeCompany`,

  // ========== Company Activity Category ==========
  getCompanyActivityCategories: `${API_URL}/CompanyActivityCategory/Get`,
  getCompanyActivityCategory: `${API_URL}/CompanyActivityCategory/Get/`,
  createCompanyActivityCategory: `${API_URL}/CompanyActivityCategory/Post`,
  editCompanyActivityCategory: `${API_URL}/CompanyActivityCategory/Put/`,
  deleteCompanyActivityCategory: `${API_URL}/CompanyActivityCategory/Delete/`,

  // ========== Company Packet ==========
  getCompanyPackets: `${API_URL}/CompanyPacket/Get`,
  getCompanyPacket: `${API_URL}/CompanyPacket/Get/`,
  createCompanyPacket: `${API_URL}/CompanyPacket/Post`,
  editCompanyPacket: `${API_URL}/CompanyPacket/Put/`,
  deleteCompanyPacket: `${API_URL}/CompanyPacket/Delete/`,

  // ========== Finsmart Coding ==========
  getFinsmartCodings: `${API_URL}/FinsmartCoding/Get`,
  getFinsmartCoding: `${API_URL}/FinsmartCoding/Get/`,
  createFinsmartCoding: `${API_URL}/FinsmartCoding/Post`,
  editFinsmartCoding: `${API_URL}/FinsmartCoding/Put/`,
  deleteFinsmartCoding: `${API_URL}/FinsmartCoding/Delete/`,

  // ========== Finsmart Coding Header ==========
  getFinsmartCodingHeaders: `${API_URL}/FinsmartCodingHeader/Get`,
  getFinsmartCodingHeader: `${API_URL}/FinsmartCodingHeader/Get/`,
  createFinsmartCodingHeader: `${API_URL}/FinsmartCodingHeader/Post`,
  editFinsmartCodingHeader: `${API_URL}/FinsmartCodingHeader/Put/`,
  deleteFinsmartCodingHeader: `${API_URL}/FinsmartCodingHeader/Delete/`,
  copyFinsmartCodingHeader: `${API_URL}/FinsmartCodingHeader/Copy/`,

  // ========== Code Mapper ==========
  getCodeMappers: `${API_URL}/CodeMapper/Get`,
  getCodeMapper: `${API_URL}/CodeMapper/Get/`,
  createCodeMapper: `${API_URL}/CodeMapper/Post`,
  editCodeMapper: `${API_URL}/CodeMapper/Put/`,
  deleteCodeMapper: `${API_URL}/CodeMapper/Delete/`,

  // ========== Coding Flag ==========
  getCodingFlags: `${API_URL}/CodingFlag/Get`,
  getCodingFlag: `${API_URL}/CodingFlag/Get/`,
  createCodingFlag: `${API_URL}/CodingFlag/Post`,
  editCodingFlag: `${API_URL}/CodingFlag/Put/`,
  deleteCodingFlag: `${API_URL}/CodingFlag/Delete/`,

  // ========== Company File ==========
  getCompanyFiles: `${API_URL}/CompanyFile/Get`,
  getCompanyFile: `${API_URL}/CompanyFile/Get/`,
  createCompanyFile: `${API_URL}/CompanyFile/Post`,
  editCompanyFile: `${API_URL}/CompanyFile/Put/`,
  convertCompanyFile: `${API_URL}/CompanyFile/StartConvert/`,
  mapCompanyFile: `${API_URL}/CompanyFile/StartMapping/`,
  acceptCompanyFile: `${API_URL}/CompanyFile/AcceptFile/`,

  // ========== Excel Temp Data ==========
  getExcelTempDatas: `${API_URL}/ExcelTempData/Get`,
  getExcelTempData: `${API_URL}/ExcelTempData/Get/`,
  createExcelTempData: `${API_URL}/ExcelTempData/Post`,
  editExcelTempData: `${API_URL}/ExcelTempData/Put/`,
  deleteExcelTempData: `${API_URL}/ExcelTempData/Delete/`,

  // ========== Temp Transaction ==========
  getTempTransactions: `${API_URL}/TempTransaction/Get`,
  getTempTransaction: `${API_URL}/TempTransaction/Get/`,
  createTempTransaction: `${API_URL}/TempTransaction/Post`,
  editTempTransaction: `${API_URL}/TempTransaction/Put/`,
  deleteTempTransaction: `${API_URL}/TempTransaction/Delete/`,

  // ========== Company Transaction ==========
  getCompanyTransactions: `${API_URL}/CompanyTransaction/Get`,
  getCompanyTransaction: `${API_URL}/CompanyTransaction/Get/`,
  createCompanyTransaction: `${API_URL}/CompanyTransaction/Post`,
  editCompanyTransaction: `${API_URL}/CompanyTransaction/Put/`,
  deleteCompanyTransaction: `${API_URL}/CompanyTransaction/Delete/`,

  // ========== Sector ==========
  getSectors: `${API_URL}/Sector/Get`,
  getSector: `${API_URL}/Sector/Get/`,
  createSector: `${API_URL}/Sector/Post`,
  editSector: `${API_URL}/Sector/Put/`,
  deleteSector: `${API_URL}/Sector/Delete/`,

  // ========== Income Budget Type ==========
  getIncomeBudgetTypes: `${API_URL}/IncomeBudgetType/Get`,
  getIncomeBudgetType: `${API_URL}/IncomeBudgetType/Get/`,
  createIncomeBudgetType: `${API_URL}/IncomeBudgetType/Post`,
  editIncomeBudgetType: `${API_URL}/IncomeBudgetType/Put/`,
  deleteIncomeBudgetType: `${API_URL}/IncomeBudgetType/Delete/`,

  // ========== Company Contact ==========
  getCompanyContacts: `${API_URL}/CompanyContact/Get`,
  getCompanyContact: `${API_URL}/CompanyContact/Get/`,
  createCompanyContact: `${API_URL}/CompanyContact/Post`,
  editCompanyContact: `${API_URL}/CompanyContact/Put/`,
  deleteCompanyContact: `${API_URL}/CompanyContact/Delete/`,

  // ========== Company Invest ==========
  getCompanyInvests: `${API_URL}/CompanyInvest/Get`,
  getCompanyInvest: `${API_URL}/CompanyInvest/Get/`,
  createCompanyInvest: `${API_URL}/CompanyInvest/Post`,
  editCompanyInvest: `${API_URL}/CompanyInvest/Put/`,
  deleteCompanyInvest: `${API_URL}/CompanyInvest/Delete/`,

  // ========== Company Budget File ==========
  getCompanyBudgetFiles: `${API_URL}/CompanyBudgetFile/Get`,
  getCompanyBudgetFile: `${API_URL}/CompanyBudgetFile/Get/`,
  createCompanyBudgetFile: `${API_URL}/CompanyBudgetFile/Post`,
  editCompanyBudgetFile: `${API_URL}/CompanyBudgetFile/Put/`,
  deleteCompanyBudgetFile: `${API_URL}/CompanyBudgetFile/Delete/`,
  convertCompanyBudgetFile: `${API_URL}/CompanyBudgetFile/StartConvert/`,

  // ========== Company Budget Header ==========
  getCompanyBudgetHeaders: `${API_URL}/CompanyBudgetHeader/Get`,
  getCompanyBudgetHeader: `${API_URL}/CompanyBudgetHeader/Get/`,
  createCompanyBudgetHeader: `${API_URL}/CompanyBudgetHeader/Post`,
  editCompanyBudgetHeader: `${API_URL}/CompanyBudgetHeader/Put/`,
  deleteCompanyBudgetHeader: `${API_URL}/CompanyBudgetHeader/Delete/`,

  // ========== Company Budget ==========
  getCompanyBudgets: `${API_URL}/CompanyBudget/Get`,
  getCompanyBudget: `${API_URL}/CompanyBudget/Get/`,
  createCompanyBudget: `${API_URL}/CompanyBudget/Post`,
  editCompanyBudget: `${API_URL}/CompanyBudget/Put/`,
  deleteCompanyBudget: `${API_URL}/CompanyBudget/Delete/`,

  // ========== Definition Type ==========
  getDefinitionTypes: `${API_URL}/DefinationType/Get`,
  getDefinitionType: `${API_URL}/DefinationType/Get/`,
  createDefinitionType: `${API_URL}/DefinationType/Post`,
  editDefinitionType: `${API_URL}/DefinationType/Put/`,
  deleteDefinitionType: `${API_URL}/DefinationType/Delete/`,

  // ========== Definition ==========
  getDefinitions: `${API_URL}/Defination/Get`,
  getDefinition: `${API_URL}/Defination/Get/`,
  createDefinition: `${API_URL}/Defination/Post`,
  editDefinition: `${API_URL}/Defination/Put/`,
  deleteDefinition: `${API_URL}/Defination/Delete/`,

  // ========== Customer ==========
  getCustomers: `${API_URL}/Customer/Get`,
  getCustomer: `${API_URL}/Customer/Get/`,
  createCustomer: `${API_URL}/Customer/Post`,
  editCustomer: `${API_URL}/Customer/Put/`,
  deleteCustomer: `${API_URL}/Customer/Delete/`,

  // ========== Stock ==========
  getStocks: `${API_URL}/Stock/Get`,
  getStock: `${API_URL}/Stock/Get/`,
  createStock: `${API_URL}/Stock/Post`,
  editStock: `${API_URL}/Stock/Put/`,
  deleteStock: `${API_URL}/Stock/Delete/`,

  // ========== Personnel ==========
  getPersonnels: `${API_URL}/Personel/Get`,
  getPersonnel: `${API_URL}/Personel/Get/`,
  createPersonnel: `${API_URL}/Personel/Post`,
  editPersonnel: `${API_URL}/Personel/Put/`,
  deletePersonnel: `${API_URL}/Personel/Delete/`,

  // ========== Company Budget Detail ==========
  getCompanyBudgetDetails: `${API_URL}/CompanyBudgetDetail/Get`,
  getCompanyBudgetDetail: `${API_URL}/CompanyBudgetDetail/Get/`,
  createCompanyBudgetDetail: `${API_URL}/CompanyBudgetDetail/Post`,
  editCompanyBudgetDetail: `${API_URL}/CompanyBudgetDetail/Put/`,
  deleteCompanyBudgetDetail: `${API_URL}/CompanyBudgetDetail/Delete/`,

  // ========== Language ==========
  getLanguages: `${API_URL}/Language/Get`,
  getLanguage: `${API_URL}/Language/Get/`,
  createLanguage: `${API_URL}/Language/Post`,
  editLanguage: `${API_URL}/Language/Put/`,
  deleteLanguage: `${API_URL}/Language/Delete/`,
  getLanguageSuggestion: `${API_URL}/Language/Suggestion`,

  // ========== Province ==========
  getProvinces: `${API_URL}/Province/Get`,
  getProvince: `${API_URL}/Province/Get/`,
  createProvince: `${API_URL}/Province/Post`,
  editProvince: `${API_URL}/Province/Put/`,
  deleteProvince: `${API_URL}/Province/Delete/`,
  getProvinceSuggestion: `${API_URL}/Province/Suggestion`,

  // ========== Packet ==========
  getPackets: `${API_URL}/Packet/Get`,
  getPacket: `${API_URL}/Packet/Get/`,
  createPacket: `${API_URL}/Packet/Post`,
  editPacket: `${API_URL}/Packet/Put/`,
  deletePacket: `${API_URL}/Packet/Delete/`,

  // ========== Permission Type ==========
  getPermissionTypes: `${API_URL}/PermissionType/Get`,
  getPermissionType: `${API_URL}/PermissionType/Get/`,
  createPermissionType: `${API_URL}/PermissionType/Post`,
  editPermissionType: `${API_URL}/PermissionType/Put/`,
  deletePermissionType: `${API_URL}/PermissionType/Delete/`,

  // ========== Role ==========
  getRoles: `${API_URL}/Role/Get`,
  getRole: `${API_URL}/Role/Get/`,
  createRole: `${API_URL}/Role/Post`,
  editRole: `${API_URL}/Role/Put/`,
  deleteRole: `${API_URL}/Role/Delete/`,

  // ========== Role Permission ==========
  getRolePermissions: `${API_URL}/RolePermission/Get`,
  getRolePermission: `${API_URL}/RolePermission/Get/`,
  createRolePermission: `${API_URL}/RolePermission/Post`,
  editRolePermission: `${API_URL}/RolePermission/Put/`,
  deleteRolePermission: `${API_URL}/RolePermission/Delete/`,
};
