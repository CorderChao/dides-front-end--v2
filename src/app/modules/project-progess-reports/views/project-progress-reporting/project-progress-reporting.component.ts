import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from 'src/app/modules/settings/service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { InitializeReportComponent } from '../initialize-report/initialize-report.component';

@Component({
  selector: 'app-project-progress-reporting',
  templateUrl: './project-progress-reporting.component.html',
  styleUrl: './project-progress-reporting.component.scss'
})
export class ProjectProgressReportingComponent {

  projectId: string;
  project: any;
  title: string;
  tableColumns: any;
  reports: any;
 
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private settingService: SettingService,
    private notificationService: NotificationService,
  ) {
     this.projectId  = this.route.snapshot.paramMap.get("id");
     this.settingService.getProject(this.projectId ).subscribe((response) => {
     if (response.code === 6000) {this.project = response.data 
       this.title = `Progress Reports for ${this.project?.name}`
     }});
  }

  ngOnInit() {
    this.getReports();
    this.tableColumns = {
      reportNumber: "Report Number",
      title: "Report Name",
      startDate: "Start Date",
      endDate: "End Date",
      action: "Actions"
    }
  }

  getReports(){
    this.settingService.getAllReports(this.projectId).subscribe((response) => {
      if (response.code === 6000) {
        this.reports = response.data;
      }});
  }






addGrievance(data:any){
   localStorage.setItem('report', JSON.stringify(data));
   this.router.navigate([`${this.projectId}/project-progress-reporting/${data.id}/grievances`]);
}

work_progress(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/work-progress/${data.id}/grievances`]);
}

staff_mobilization(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/staff-mobilization/${data.id}/grievances`]);
}

safety_issue(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/safety-issue/${data.id}/grievances`]);
}

quality_assurance(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/quality-assurance/${data.id}/grievances`]);
}

physical_progress(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/physical-progress/${data.id}/grievances`]);
}

meeting(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/meeting/${data.id}/grievances`]);
}

material_mobilization(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/material-mobilization/${data.id}/grievances`]);
}

equipment(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/equipment/${data.id}/grievances`]);
}

challenge(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/equipment/${data.id}/grievances`]);
}




risk(data:any){
  localStorage.setItem('report', JSON.stringify(data));
  this.router.navigate([`${this.projectId}/risk/${data.id}/grievances`]);
}



 public  startReport() {
    const data = {
      title: "Initialize Report",
      id: this.projectId,
      label: "Save",
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "50%";
    dialogConfig.data = data;
    dialogConfig.id = "InitializeReportComponent";
    const dialogRef = this.dialog.open(InitializeReportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.notificationService.determineResponse(response);
      this.getReports();
    });
  }

}


