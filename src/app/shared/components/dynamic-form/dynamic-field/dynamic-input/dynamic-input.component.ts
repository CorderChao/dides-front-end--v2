import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { DynamicErrorComponent } from "../../dynamic-error/dynamic-error.component";

@Component({
  selector: "app-dynamic-input",
  templateUrl: "./dynamic-input.component.html",
  styleUrls: ["./dynamic-input.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    DynamicErrorComponent,
  ],
})
export class DynamicInputComponent {
  @Input() field: any;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formName = this.formgroupDirective.control;
  }
}
