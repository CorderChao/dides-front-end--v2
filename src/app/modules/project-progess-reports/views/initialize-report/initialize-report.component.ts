import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ProjectService } from 'src/app/modules/projects/services/project.service';


@Component({
  selector: 'app-initialize-report',
  templateUrl: './initialize-report.component.html',
  styleUrl: './initialize-report.component.scss'
})
export class InitializeReportComponent {

  form: FormGroup;
  title: any;
  action: any;
  label: any;
  id: any
  constructor(
    private datePipe: DatePipe,
    public fb: FormBuilder,
    public projSvc: ProjectService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<InitializeReportComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    this.id = this.data.id;
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }






  private initForm(): FormGroup {

      return this.fb.group({
          id: [null, Validators.required],
          title:["", Validators.required],
          reportNumber: ["", Validators.required],
          startDate: ["", Validators.required],
          endDate: ["", Validators.required],
          summary: ["", Validators.required],
          projectId: [this.id, Validators.required],
      });
     
  }






  public save(item: any) {
    item.startDate = moment(item.startDate).format("YYYY-MM-DD"),
    item.endDate = moment(item.endDate).format("YYYY-MM-DD"),
  
    console.log("DATAAA", item);
    this.projSvc.saveProjectProgress(item).subscribe({
      next: (response) => {
        console.log("response", response);
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          // this.dialogRef.close(response);
        }
      },
    });
  }


 
}

