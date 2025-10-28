import { Component } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NotificationService } from "src/app/shared/services/notification.service";
import { SettingService } from "src/app/modules/settings/service/setting.service";
import { CreateSubProjectComponent } from "../create-sub-project/create-sub-project.component";

@Component({
  selector: 'app-list-sub-project',
  templateUrl: './list-sub-project.component.html',
  styleUrl: './list-sub-project.component.scss'
})
export class ListSubProjectComponent {
title: string;
  subProjects: any[]=[];
  tableColumns: any;
  data: any[] = [];

  constructor(
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService
  ) {
    const packag = JSON.parse(localStorage.getItem('packag'));
    const project = JSON.parse(localStorage.getItem('project'));
    console.log("project", project);
    
    this.title = `SUB-PROJECTS FOR ${packag.name} PACKAGE`;
  }

  ngOnInit(): void {
   // this.fetchAllSubProjects();
    this.tableColumns = {
      no: "S/No",
      name: "Sub-Project Name",
      funder: "Project Funder",
      duration: "Duration(Months)",
      actions: "Actions",
    };
     
    this.data = [
  {
    no: "1",
    name: "Sub-Project Name",
    funder: "Project Funder",
    duration: "Duration(Months)", 
  }
    ]
  }

  public fetchAllSubProjects() {
    this.setSvc.getAllSubProjects().subscribe((response) => {
      console.log("projects", response);
      if (response.code === 6000) {
        this.subProjects = response.data;
        // this.subProjects.map((value: any) => {
        //   value.funder = value.projectSponsor?.name;
        //  console.log("Map Value",value );
        // });

      }
    });
  }

  add() {
    const data = {
      title: "Add New Sub-Project",
      action: "create",
      label: "Save",
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "60%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateSubProjectComponentDialog";
    const dialogRef = this.dialog.open(CreateSubProjectComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.notificationService.determineResponse(response);
    });
  }

  edit(item: any) {
    const data = {
      title: "Edit Sub-Project",
      action: "update",
      item: item,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "60%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateSubProjectComponentDialog";
    const dialogRef = this.dialog.open(CreateSubProjectComponent, dialogConfig);
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
