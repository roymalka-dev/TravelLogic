import { IRule } from "@/types/rule.types";
import saveAs from "file-saver";
import { createRow } from "./excel.utils";
import ExcelJS from "exceljs";

export const generateTestPlanXLSX = async (
  rules: IRule[],
  allPolygons: string[],
  allTags: string[] = []
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Test Plan");

  // Add header row
  worksheet.columns = [
    { header: "Index", key: "index", width: 10 },
    { header: "Flow", key: "flow", width: 30 },
    { header: "Purpose", key: "purpose", width: 30 },
    { header: "Expected Behaviour", key: "expectedBehaviour", width: 50 },
    { header: "VOC", key: "voc", width: 15 },
    { header: "iOS", key: "ios", width: 15 },
    { header: "Android", key: "android", width: 15 },
  ];

  // Freeze the first row
  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  // Set first row title and add color
  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  let index = 0;

  rules.forEach((rule) => {
    // Add title row and merge cells
    createRow(worksheet, { Flow: rule.polygon }, null, true);

    // PU Available Rows
    rule.allowedDropOffs.forEach((dropOff) => {
      createRow(
        worksheet,
        {
          Index: index++,
          Flow: `Set PU at ${rule.polygon}`,
          Purpose: "Polygon Blocker",
          ExpectedBehaviour: `DO is available at ${dropOff}`,
        },
        index
      );
    });

    // PU Not Available Rows
    allPolygons
      .filter((p) => !rule.allowedDropOffs.includes(p))
      .forEach((polygon) => {
        createRow(
          worksheet,
          {
            Index: index++,
            Flow: `Set PU at ${rule.polygon}`,
            Purpose: "Polygon Blocker",
            ExpectedBehaviour: `DO is NOT available at ${polygon}`,
          },
          index
        );
      });

    // Set DO and Book a Ride Rows
    rule.allowedDropOffs.forEach((dropOff, idx) => {
      if (idx > 0) {
        createRow(
          worksheet,
          {
            Index: index++,
            Flow: `Set PU at ${rule.polygon}`,
            Purpose: "Polygon Blocker",
            ExpectedBehaviour: "PU set successfully",
          },
          index
        );
      }

      createRow(
        worksheet,
        {
          Index: index++,
          Flow: `Set DO at ${dropOff}`,
          Purpose: "Polygon Blocker",
          ExpectedBehaviour: "DO set successfully",
        },
        index
      );

      createRow(
        worksheet,
        {
          Index: index++,
          Flow: "Book a ride",
          Purpose: "Rules Logic",
          ExpectedBehaviour: "Ride booked successfully",
        },
        index
      );

      if (allTags.length > 1) {
        createRow(
          worksheet,
          {
            Index: index++,
            Flow: "Check if ride is assigned properly",
            Purpose: "Rules Logic",
            ExpectedBehaviour: `Ride is assigned to ${rule.tags.join(", ")}`,
          },
          index
        );
      }

      // Reassign Shift Tags Rows
      if (allTags.length > 1) {
        allTags
          .filter((tag) => !rule.tags.includes(tag))
          .forEach((tag) => {
            createRow(
              worksheet,
              {
                Index: index++,
                Flow: `Try reassign to ${tag}`,
                Purpose: "Rules Logic",
                ExpectedBehaviour: "Can't assign ride",
              },
              index
            );
          });
      }

      createRow(
        worksheet,
        {
          Index: index++,
          Flow: "Complete a ride",
          ExpectedBehaviour: "Ride completed successfully",
        },
        index
      );
    });
  });

  // Apply borders to all cells within the used range
  const range = worksheet.getSheetValues().length - 1; // Get the number of rows used
  for (let row = 1; row <= range; row++) {
    for (let col = 1; col <= worksheet.columnCount; col++) {
      worksheet.getCell(row, col).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  }

  // Create a Blob from the workbook and trigger a download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "Test_Plan.xlsx");
};
