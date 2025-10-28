import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-dynamic-error",
  templateUrl: "./dynamic-error.component.html",
  styleUrls: ["./dynamic-error.component.css"],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
})
export class DynamicErrorComponent implements OnInit {
  formName: FormGroup;
  @Input() field: any;
  fieldName: string;

  constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.formName = this.formgroupDirective.control;
    this.fieldName = this.field.fieldName;
  }
}
