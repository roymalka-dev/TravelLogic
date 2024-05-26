import { RequestType, TabConfig } from "@/types/form.types";
import * as yup from "yup";

export const formTabs: TabConfig<RequestType>[] = [
  {
    tabName: "Polygons",
    fields: [
      {
        name: "polygons",
        label: "Enter Polygon",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string()),
        information: "Enter Polygon name",
      },
    ],
  },
  {
    tabName: "Tags",
    fields: [
      {
        name: "tags",
        label: "Enter Tag",
        type: "multi-input",
        initialValue: [""],
        validation: yup.array().of(yup.string()),
        information: "Enter Taf name",
      },
    ],
  },
  {
    tabName: "Logic",
    fields: [
      {
        name: "logic",
        label: "",
        type: "logic-creator",
        initialValue: [""],
        validation: yup.array().of(yup.string()),
      },
    ],
  },
];
