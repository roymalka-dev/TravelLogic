import { TestPlanRow } from "@/types/excel.types";
import ExcelJS from "exceljs";

export const createRow = (
  worksheet: ExcelJS.Worksheet,
  data: Partial<TestPlanRow>,
  index: number | null,
  mergeCells: boolean = false
) => {
  const row = worksheet.addRow({
    index: index || "",
    flow: data.Flow || "",
    purpose: data.Purpose || "",
    expectedBehaviour: data.ExpectedBehaviour || "",
    voc: "",
    ios: "",
    android: "",
  });

  row.eachCell((cell) => {
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  if (mergeCells) {
    worksheet.mergeCells(`B${row.number}:G${row.number}`);
    row.getCell(2).alignment = { horizontal: "center", vertical: "middle" };
    row.getCell(2).font = { bold: true };
    row.getCell(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
  }

  return row;
};
