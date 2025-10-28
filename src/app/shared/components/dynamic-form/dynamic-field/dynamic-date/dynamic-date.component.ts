import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DynamicErrorComponent } from "../../dynamic-error/dynamic-error.component";

@Component({
  selector: "app-dynamic-date",
  templateUrl: "./dynamic-date.component.html",
  styleUrls: ["./dynamic-date.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicErrorComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class DynamicDateComponent {
  @Input() field: any;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formName = this.formgroupDirective.control;
  }
}
