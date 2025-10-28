import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { DynamicErrorComponent } from "./dynamic-error/dynamic-error.component";
import { DynamicFieldComponent } from "./dynamic-field/dynamic-field.component";
import { DynamicFormDataFormat } from "./dynamic-form.model";
import { MatDialogContent, MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "../../shared.module";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    DynamicFieldComponent,
    DynamicErrorComponent,
    MatDialogModule,
  ],
  standalone: true,
})
export class DynamicFormComponent implements OnInit {
  @Input() model!: {};
  @Input() btnText!: string;
  @Input() btnIcon!: string;
  @Output() getFormValues = new EventEmitter<any>();

  public dynamicFormGroup!: FormGroup;
  public fields = [];

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    const formGroupFields = this.getFormControlsFields();
    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }

  // Method to get the dynamic form
  getDynamicForm(): FormGroup {
    return this.dynamicFormGroup;
  }

  private getFormControlsFields() {
    const formGroupFields = {};
    for (const field of Object.keys(this.model)) {
      const fieldProps: DynamicFormDataFormat = this.model[field];
      const validators = this.addValidator(fieldProps.validators);
      const errorMessages = this.getMessageErrors(fieldProps.validators);

      formGroupFields[field] = new FormControl(fieldProps.value, validators);
      this.fields.push({
        ...fieldProps,
        fieldName: field,
        messages: errorMessages,
      });
    }

    return formGroupFields;
  }

  private getMessageErrors(validators: any): {} {
    if (!validators) {
      return null;
    }

    let obj = {};
    validators.forEach((element: any) => {
      obj[element?.name] = element?.message;
    });
    return obj;
  }

  private addValidator(rules: any) {
    if (!rules) {
      return [];
    }

    const validators = rules.map((rule: any) => rule.validator);
    return validators;
  }

  submitForm(value: any) {
    this.getFormValues.emit(value);
    this.getDynamicForm().reset();
  }
}
