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
  selector: "app-dynamic-password",
  templateUrl: "./dynamic-password.component.html",
  styleUrls: ["./dynamic-password.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    DynamicErrorComponent,
  ],
})
export class DynamicPasswordComponent {
  @Input() field: any;
  formName: FormGroup;

  constructor(private formgroupDirective: FormGroupDirective) {
    this.formName = this.formgroupDirective.control;
  }
}
