import { CommonModule } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { DynamicErrorComponent } from "../../dynamic-error/dynamic-error.component";
import { SweetalertNotificationService } from "../../../../services/sweetalert-notification.service";

@Component({
  selector: "app-dynamic-file-upload",
  templateUrl: "./dynamic-file-upload.component.html",
  styleUrls: ["./dynamic-file-upload.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    DynamicErrorComponent,
  ],
})
export class DynamicFileUploadComponent implements OnInit {
  selectedFile: File;
  @Input() field: any;
  formName: FormGroup;
  validFileExtensions: string[];

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  constructor(
    private notify: SweetalertNotificationService,
    private formGroupDirective: FormGroupDirective,
  ) {
    this.formName = this.formGroupDirective.control;
  }

  ngOnInit(): void {
    this.validFileExtensions = Array.isArray(this.field?.validFileExtensions)
      ? this.field?.validFileExtensions
      : [];
    this.validFileExtensions = this.validFileExtensions.map((extension) =>
      extension.toLowerCase(),
    );
  }

  fileSelected(event) {
    this.selectedFile = event.target.files[0];

    const fileCheck = (
      this.selectedFile.name.split(".").pop() || ""
    ).toLowerCase();

    // Check if file extension is not as required return notification
    // and exit function.
    if (
      this.validFileExtensions.length > 0 &&
      !this.validFileExtensions.includes(fileCheck)
    ) {
      this.notify.warningMessage({
        message: `Allowed file extension(s) is ${this.validFileExtensions.toString()}`,
      });
      this.formName.get(this.field.fieldName).setValue("");
      this.fileInput.nativeElement.value = "";
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const base64String = reader.result.toString().split(",")[1];
      this.formName.get(this.field.fieldName).setValue(base64String);
    };
  }
}
