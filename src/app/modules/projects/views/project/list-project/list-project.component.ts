import { Component } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NotificationService } from "src/app/shared/services/notification.service";
import { CreateProjectComponent } from "../create-project/create-project.component";
import { SettingService } from "src/app/modules/settings/service/setting.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-project",
  templateUrl: "./list-project.component.html",
  styleUrl: "./list-project.component.scss",
})
export class ListProjectComponent {
  title: string;
  projectList: any[]=[];
  tableColumns: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService
  ) {
    this.title = "PROJECTS LIST";
  }

  ngOnInit(): void {
    this.fetchAllProjects();
    this.tableColumns = {
      no: "S/No",
      name: "Project Name",
      funder: "Project Funder",
      duration: "Duration(Months)",
      actions: "Actions",
    };
  }

  public fetchAllProjects() {
    this.setSvc.getProjects().subscribe((response) => {
      console.log("projects", response);
      if (response.code === 6000) {
        this.projectList = response.data;
        this.projectList.map((value: any) => {
          value.funder = value.projectSponsor?.name;
         console.log("Map Value",value );
        });

      }
    });
  }

  add() {
    const data = {
      title: "Add New Project",
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
    dialogConfig.id = "CreateProjectComponentDialog";
    const dialogRef = this.dialog.open(CreateProjectComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.notificationService.determineResponse(response);
    });
  }

  addPackage(id){
    const project = this.projectList.find(a => a.id = id);
    localStorage.setItem('project', JSON.stringify(project));
    this.router.navigate([`/projects/${id}/packages`]);
  }

  startReport(id) {
    this.router.navigate([`/${id}/project-progress-reporting`]);
  }




  edit(item: any) {
    const data = {
      title: "Edit Project",
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
    dialogConfig.id = "CreateOrganizationComponentDialog";
    const dialogRef = this.dialog.open(CreateProjectComponent, dialogConfig);
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
