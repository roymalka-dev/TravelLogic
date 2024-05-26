import * as yup from "yup";
import { IRule } from "./rule.types";

export type RequestType = {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | Date
    | IRule[]
    | undefined;
};

export type FieldConfig<T extends RequestType> = {
  name: Extract<keyof T, string>;
  label: string;
  initialValue: string | string[] | boolean | number | Date | undefined;
  type:
    | "text"
    | "email"
    | "date"
    | "checkbox"
    | "select"
    | "multi-select"
    | "textarea"
    | "file"
    | "radio"
    | "number"
    | "multi-input"
    | "conditional-select"
    | "logic-creator";
  validation: yup.AnySchema;
  options?: string[];
  information?: string;
  imageExample?: string;
  bucketName?: string;
};

export type TabConfig<T extends RequestType> = {
  tabName: string;
  fields: FieldConfig<T>[];
  bucketName?: string;
  submit?: (values: T) => void;
};
