export interface DynamicFormDataFormat {
  id?: any;
  type:
    | "text"
    | "number"
    | "select"
    | "select-multiple"
    | "radio"
    | "date"
    | "checkbox"
    | "textarea"
    | "editor"
    | "password"
    | "file"
    | "mobile-number";
  value: any;
  label: string;
  link?: string;
  cssClass?: string;
  groupTitle?: string;
  placeHolder?: string;
  validators?: {
    validator: any;
    message: string;
    name: string;
  }[];
  options?: { label: string; value: any; disabled?: boolean }[];
  observeOptions?: boolean;
  observeOnChanges?: boolean;
  validFileExtensions?: string[];
}
export interface DynamicForm {
  [key: string]: DynamicFormDataFormat;
}
