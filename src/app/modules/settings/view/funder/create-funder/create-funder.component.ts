import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-funder',
  templateUrl: './create-funder.component.html',
  styleUrl: './create-funder.component.scss'
})
export class CreateFunderComponent {
  funderForm: FormGroup;
  title: any;
  action: any;
  label: any;
  funder: any;

  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateFunderComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      this.funder = data.funder;
    }
  }

  ngOnInit(): void {
    this.funderForm = this.initForm();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
        name: ["", Validators.required],
        acronym: ["", Validators.required],
      });
    } else {
      return this.fb.group({
         name: [this.funder.name, Validators.required],
        acronym: [this.funder.acronym, Validators.required],
      });
    }
  }




  public save(data: any) {
    console.log("DATAAA", data);


    if (this.action === "create") {
      this.create(data);
    } else {
      this.update(data);
    }
  }

  public create(data: any) {
    this.setSvc.saveFunder(data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
           this.dialogRef.close(response);
        }
         //this.notificationService.determineResponse(response);
      },
    });
  }

  public update(data: any) {
    this.setSvc.updateFunder(this.funder.uuid, data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          // this.dialogRef.close(response);
        }
      },
    });
  }
}
