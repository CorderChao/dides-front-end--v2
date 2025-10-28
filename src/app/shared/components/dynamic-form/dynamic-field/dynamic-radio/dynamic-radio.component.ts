import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { DynamicErrorComponent } from "../../dynamic-error/dynamic-error.component";

@Component({
  selector: "app-dynamic-radio",
  templateUrl: "./dynamic-radio.component.html",
  styleUrls: ["./dynamic-radio.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    DynamicErrorComponent,
  ],
})
export class DynamicRadioComponent {
  @Input() field: any;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formName = this.formgroupDirective.control;
  }
}
