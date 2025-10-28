import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/modules/projects/services/project.service';
import { SettingService } from 'src/app/modules/settings/service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';


@Component({
  selector: 'app-create-grievance-report',
  templateUrl: './create-grievance-report.component.html',
  styleUrl: './create-grievance-report.component.scss'
})
export class CreateGrievanceReportComponent {

 grievanceForm: FormGroup;
  title: any;
  action: any;
  label: any;
  public project: any;
  public organizationLists: any[] = [];
  public councilSelected: any[] = [];
  councilCodes: any[] = [];
  councils: any;
  regions: any;
  sponsors: any;
  selected: any;
  reports: any;
  projectList: any[]=[];
  id: any;
  subProjects: any;
  categories: any;
  status: any;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public setSvc: SettingService,
    private projectSvc: ProjectService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateGrievanceReportComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
    //  console.log("Passed Project", data.item);
    //   this.project = data.item;
    // }
     this.id  = this.route.snapshot.paramMap.get("id");
    this.setSvc.getProject(this.id ).subscribe((response) => {
    if (response.code === 6000) {this.project = response.data
       this.title = `Progress Report for ${this.project?.name}`
    }});
  }
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllStatus();
   // this.fetchAllSubProjects();
    this.grievanceForm = this.initForm();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
          subProjectId: ["", Validators.required],
          category: ["", Validators.required],
          description: ["", Validators.required],
          stepsTaken: ["", Validators.required],
          status: ["", Validators.required],
      });
    } else {
      return this.fb.group({
            category: ["", Validators.required],
          description: ["", Validators.required],
          stepsTaken: ["", Validators.required],
          status: ["", Validators.required],
          subProjectId: ["", Validators.required],
      });
    }
  }

  getAllCategories(){
    this.projectSvc.getAllGrievanceCategories().subscribe((response) => {
      console.log("res", response);
      
      if (response.code === 6000) {
        this.categories = response.data;
      }});
  }
  getAllStatus(){
    this.projectSvc.getAllGrievanceStatus().subscribe((response) => {
      if (response.code === 6000) {
        this.status = response.data;
      }});
  }
 public fetchAllSubProjects() {
    this.setSvc.getAllSubProjects().subscribe((response) => {
      console.log("Subprojects", response);
      if (response.code === 6000) {
        this.subProjects = response.data;
      }
    });
  }

  public save(item: any) {


    for (let i = 0; i < this.councilSelected.length; i++) {
      this.councilCodes.push(this.councilSelected[i].code);
    }

    let payload = {
          category: item.category,
          description: item.description,
          stepsTaken: item.stepsTaken,
          status: item.status,
          progressReportId: this.id,
          subProjectId: item.subProjectId,
    };

   console.log("Payload to save", payload);

    // if (this.action === "create") {
    //   this.create(payload);
    // } else {
    //   this.update(payload);
    // }
  }

  public create(data: any) {
    this.setSvc.saveProject(data).subscribe({
      next: (response) => {
         if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          // this.dialogRef.close(response);
        }
      },
    });
  }

  public update(data: any) {
    this.setSvc.updateProject(this.project.id, data).subscribe({
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
