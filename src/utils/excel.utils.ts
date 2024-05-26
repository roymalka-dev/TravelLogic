import * as XLSX from "xlsx";
import { IRule } from "@/types/rule.types";

interface TestPlanRow {
  Flow: string;
  Purpose: string;
  ExpectedBehaviour: string;
  VOC: string;
  iOS: string;
  Android: string;
}

export const generateTestPlanXLSX = (
  rules: IRule[],
  allPolygons: string[],
  allTags: string[]
) => {
  const rows: TestPlanRow[] = [];

  //set first row title
  rules.forEach((rule, ruleIndex) => {
    if (ruleIndex > 0) {
      rows.push({
        Flow: "",
        Purpose: "",
        ExpectedBehaviour: "",
        VOC: "",
        iOS: "",
        Android: "",
      });
    }
    rows.push({
      Flow: `${rule.polygon}`,
      Purpose: "",
      ExpectedBehaviour: "",
      VOC: "",
      iOS: "",
      Android: "",
    });
    // PU Available Rows
    rule.allowedDropOffs.forEach((dropOff, dropOffIndex) => {
      rows.push({
        Flow: `Set PU at ${rule.polygon}`,
        Purpose: "Polygon Blocker",
        ExpectedBehaviour: `DO is available at ${dropOff}`,
        VOC: "",
        iOS: "",
        Android: "",
      });
    });

    // PU Not Available Rows
    allPolygons
      .filter((p) => !rule.allowedDropOffs.includes(p))
      .forEach((polygon, index) => {
        rows.push({
          Flow: `Set PU at ${rule.polygon}`,
          Purpose: "Polygon Blocker",
          ExpectedBehaviour: `DO is NOT available at ${polygon}`,
          VOC: "",
          iOS: "",
          Android: "",
        });
      });

    // Set DO and Book a Ride Rows
    rule.allowedDropOffs.forEach((dropOff, index) => {
      index > 0 &&
        rows.push({
          Flow: `Set PU at ${rule.polygon}`,
          Purpose: "Polygon Blocker",
          ExpectedBehaviour: "PU set successfully",
          VOC: "",
          iOS: "",
          Android: "",
        });
      rows.push({
        Flow: `Set DO at ${dropOff}`,
        Purpose: "Polygon Blocker",
        ExpectedBehaviour: "DO set successfully",
        VOC: "",
        iOS: "",
        Android: "",
      });
      rows.push({
        Flow: "Book a ride",
        Purpose: "Rules Logic",
        ExpectedBehaviour: "Ride booked successfully",
        VOC: "",
        iOS: "",
        Android: "",
      });
      rows.push({
        Flow: "Check if ride is assigned properly",
        Purpose: "Rules Logic",
        ExpectedBehaviour: `Ride is assigned to ${rule.tags.join(", ")}`,
        VOC: "",
        iOS: "",
        Android: "",
      });

      // Reassign Shift Tags Rows
      allTags
        .filter((tag) => !rule.tags.includes(tag))
        .forEach((tag) => {
          rows.push({
            Flow: `Try reassign to ${tag}`,
            Purpose: "Rules Logic",
            ExpectedBehaviour: "Can't assign ride",
            VOC: "",
            iOS: "",
            Android: "",
          });
        });

      // Complete a Ride Row
      rows.push({
        Flow: "Complete a ride",
        Purpose: "",
        ExpectedBehaviour: "Ride completed successfully",
        VOC: "",
        iOS: "",
        Android: "",
      });
    });

    // Insert an empty row between the rules
  });

  // Generate workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: ["Flow", "Purpose", "ExpectedBehaviour", "VOC", "iOS", "Android"],
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Test Plan");

  // Write to file
  XLSX.writeFile(workbook, "Test_Plan.xlsx");
};
