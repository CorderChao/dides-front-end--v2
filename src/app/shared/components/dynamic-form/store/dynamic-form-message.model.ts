type DataModel = {
  label: string;
  value: any;
};

export interface DynamicFormMessage {
  fieldName: string;
  data: DataModel[];
}
export interface DynamicFormOnChangeMessage {
  fieldName: string;
  changedValue: any;
}
