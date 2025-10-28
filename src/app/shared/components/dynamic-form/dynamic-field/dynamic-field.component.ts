import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { DynamicCheckboxsComponent } from "./dynamic-checkboxs/dynamic-checkboxs.component";
import { DynamicDateComponent } from "./dynamic-date/dynamic-date.component";
import { DynamicFileUploadComponent } from "./dynamic-file-upload/dynamic-file-upload.component";
import { DynamicInputComponent } from "./dynamic-input/dynamic-input.component";
import { DynamicMobileNumberComponent } from "./dynamic-mobile-number/dynamic-mobile-number.component";
import { DynamicNumberComponent } from "./dynamic-number/dynamic-number.component";
import { DynamicPasswordComponent } from "./dynamic-password/dynamic-password.component";
import { DynamicRadioComponent } from "./dynamic-radio/dynamic-radio.component";
import { DynamicTextareaComponent } from "./dynamic-textarea/dynamic-textarea.component";
import { DynamicSelectComponent } from "./dynamic-select/dynamic-select.component";
import { DynamicSelectMultipleComponent } from "./dynamic-select-multiple/dynamic-select-multiple.component";

@Component({
  selector: "app-field-input",
  templateUrl: "./dynamic-field.component.html",
  styleUrls: ["./dynamic-field.component.css"],
  standalone: true,
})
export class DynamicFieldComponent implements AfterViewInit {
  supportedDynamicComponents = [
    {
      name: "text",
      component: DynamicInputComponent,
    },
    {
      name: "password",
      component: DynamicPasswordComponent,
    },
    {
      name: "number",
      component: DynamicNumberComponent,
    },
    {
      name: "radio",
      component: DynamicRadioComponent,
    },
    {
      name: "date",
      component: DynamicDateComponent,
    },
    {
      name: "checkbox",
      component: DynamicCheckboxsComponent,
    },
    {
      name: "textarea",
      component: DynamicTextareaComponent,
    },
    {
      name: "file",
      component: DynamicFileUploadComponent,
    },
    {
      name: "mobile-number",
      component: DynamicMobileNumberComponent,
    },
    {
      name: "select",
      component: DynamicSelectComponent,
    },
    {
      name: "select-multiple",
      component: DynamicSelectMultipleComponent,
    },
  ];
  @ViewChild("dynamicInputContainer", { read: ViewContainerRef })
  dynamicInputContainer!: ViewContainerRef;
  @Input() field: any;
  formName!: FormGroup;
  componentDynamic: any;

  constructor(
    private formgroupDirective: FormGroupDirective,
    private cd: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.registerDynamicField();
  }

  private registerDynamicField() {
    this.dynamicInputContainer.clear();
    const componentInstance = this.getComponentByType(this.field.type);
    const dynamicComponent =
      this.dynamicInputContainer.createComponent(componentInstance);
    dynamicComponent.setInput("field", this.field);
    this.cd.detectChanges();
  }

  getComponentByType(type: string): any {
    this.componentDynamic = this.supportedDynamicComponents.find(
      (c) => c.name === type,
    );
    return this.componentDynamic.component || DynamicInputComponent;
  }
}
