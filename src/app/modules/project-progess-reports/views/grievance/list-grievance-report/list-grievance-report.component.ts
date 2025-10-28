import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from 'src/app/modules/settings/service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateGrievanceReportComponent } from '../create-grievance-report/create-grievance-report.component';
import { ProjectService } from 'src/app/modules/projects/services/project.service';


@Component({
  selector: 'app-list-grievance-report',
  templateUrl: './list-grievance-report.component.html',
  styleUrl: './list-grievance-report.component.scss'
})
export class ListGrievanceReportComponent {
title: string;
  greports: any[]=[];
  tableColumns: any;
  id: any;
  report: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private setSvc: SettingService,
    private projectSvc: ProjectService,
    private notificationService: NotificationService
  ) {
    this.report = JSON.parse(localStorage.getItem('report'));
    console.log("report", this.report);
    
    this.title = `GRIEVANCE REPORTs FOR ${this.report.title}`;
     this.id  = this.route.snapshot.paramMap.get("id");
    this.projectSvc.getAllGrievanceByReportId(this.id ).subscribe((response) => {
    if (response.code === 6000) {this.greports = response.data
       //this.title = `Progress Report for ${this.greports?.name}`
    }});
  }

  ngOnInit(): void {
    this.tableColumns = {
      no: "S/No",
      report: "Report",
      description: "Description",
      category: "Category",
      status: "Status",
      actions: "Actions",
    };
  }

  public fetchAllGrievance() {
    this.projectSvc.getAllGrievanceByReportId(this.id).subscribe((response) => {
      console.log("projects", response);
      if (response.code === 6000) {
        this.greports = response.data;
      }
    });
  }

  add() {
    const data = {
      title: "Add New Grievance",
      action: "create",
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
    dialogConfig.id = "CreateGrievanceReportComponentDialog";
    const dialogRef = this.dialog.open(CreateGrievanceReportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.notificationService.determineResponse(response);
    });
  }


  edit(item: any) {
    const data = {
      title: "Edit Grievance Report",
      action: "update",
      item: item,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "50%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateGrievanceReportComponentDialog";
    const dialogRef = this.dialog.open(CreateGrievanceReportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.notificationService.determineResponse(response);
    });
  }

  remove(item: any) {
    const designationStatus =
      item.status == "Active" ? "Deactivate" : "Activate";
    const message = `Are you sure you want to ${designationStatus} </br>${item.name} Project?`;
    this.notificationService.confirmation(message).then((data) => {
      if (data.value) {
      }
    });
  }
}
