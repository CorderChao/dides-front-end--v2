import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SettingService } from '../../../service/setting.service';

@Component({
  selector: 'app-create-contract-type',
  templateUrl: './create-contract-type.component.html',
  styleUrl: './create-contract-type.component.scss'
})
export class CreateContractTypeComponent {
contractTypeForm: FormGroup;
  title: any;
  action: any;
  label: any;
 contractTypes: any[] = [];
  contractType: any;

  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateContractTypeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      this.contractType = data.item;
    }
  }

  ngOnInit(): void {
    this.contractTypeForm = this.initForm();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
          name: ["", Validators.required],
      });
    } else {
      return this.fb.group({
          name: [this.contractType.name, Validators.required],
      });
    }
  }



  public save(item: any) {
    console.log("DATAAA to save", item);
    if (this.action === "create") {
      this.create(item);
    } else {
      this.update(item);
    }
  }

  public create(data: any) {
    this.setSvc.saveContractTypes(data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          this.dialogRef.close(response);
        }
      },
    });
  }

  public update(data: any) {
    // this.setSvc.updateConsultant(this.consultant.id, data).subscribe({
    //   next: (response) => {
    //     if (response.code === 6000) {
    //       this.dialogRef.close(response);
    //     } else {
    //       this.dialogRef.close(response);
    //     }
    //   },
    // });
  }
}
