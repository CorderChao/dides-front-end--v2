import { Component, Inject, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotificationService } from "src/app/shared/services/notification.service";
import { SettingService } from "../../../service/setting.service";


@Component({
  selector: "app-create-configuration-type",
  templateUrl: "./create-configuration-type.component.html",
  styleUrl: "./create-configuration-type.component.scss",
})
export class CreateConfigurationTypeComponent {
  selectedMembers: any = [];

  public title: string;
  public label: string;
  public action: string;
  public configType: any;
  public configForm: FormGroup;
  public settingType: any;
  public item: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateConfigurationTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private settingService: SettingService,
    private notificationService: NotificationService,
  ) {
    this.title = data.title;
    this.label = data.label;
    this.action = data.action;
    this.item = data.item;    
    if (this.action === "update") {
      this.title = data.title;
      this.label = data.label;
      this.action = data.action;
      this.configType = data.dataConfig;
    }
  }

  ngOnInit() {
    this.configForm = this.initForm();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.formBuilder.group({
        code: ["", Validators.required],
        name: ["", Validators.required],
        settingType: [this.item.value, Validators.required],
      });
    } else {
      return this.formBuilder.group({
        id: [this.configType.setupUUID, Validators.required],
        code: [this.configType.code, Validators.required],
        name: [this.configType.name, Validators.required],
        settingType: [this.item.value, Validators.required],
      });
    }
  }

  public save(data: any) {
    if (this.action === "create") {
      console.log("DDAAATAAA", data);
      this.create(data);
    } else {
      this.update(data);
    }
  }

  public create(data: any) {
    this.settingService.saveCofigType(data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else if (response.code !== 6000) {
            this.dialogRef.close(response);
        }
      },
    });
  }

  public update(data: any) {
    this.settingService
      .updateCofigType(this.configType.setupUUID, data.value)
      .subscribe({
        next: (response) => {
          if (response.code === 6000) {
            this.dialogRef.close(response);
          } else if (response.code !== 6000) {
               this.dialogRef.close(response);
          }
        },
      });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
