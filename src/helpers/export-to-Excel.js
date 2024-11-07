import * as XLSX from "xlsx";
import { writeFile } from "xlsx";

export const exportToExcel = (jsonData, fileName) => {
  const workshit = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, workshit, "Sheet1");
  writeFile(workbook, fileName + ".xlsx");
};
