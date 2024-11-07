import * as XLSX from "xlsx";
import { writeFile } from "xlsx";

export const exportToCustomExcel = (data, fileName) => {
  const workshit = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  const range = XLSX.utils.decode_range(workshit["!ref"]);
  for (let row = range.s.r + 1; row <= range.e.r; row += 2) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = workshit[cellAddress];
      if (cell) {
        cell.s = {
          fill: {
            patternType: "solid",
            bgColor: { rgb: "DC143C" },
          },
        };
      }
    }
  }
  const sheetName = "Sheet1";
  workbook.SheetNames.push(sheetName);
  workbook.Sheets[sheetName] = workshit;
  //   XLSX.utils.book_append_sheet(workbook, workshit, "Sheet1");
  writeFile(workbook, fileName + ".xlsx");
};
