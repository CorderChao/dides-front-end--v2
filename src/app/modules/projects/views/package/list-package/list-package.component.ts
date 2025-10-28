import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreatePackageComponent } from '../create-package/create-package.component';
import { SettingService } from 'src/app/modules/settings/service/setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list-package',
  templateUrl: './list-package.component.html',
  styleUrl: './list-package.component.scss'
})
export class ListPackageComponent {

  title: string;
  packageList: any[];
  tableColumns: any;
  id: string;
  project: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
   private setSvc: SettingService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
    this.id  = this.route.snapshot.paramMap.get("id");
    const project = JSON.parse( localStorage.getItem('project'));
     this.title = `PACKAGES FOR  ${project?.name} PROJECT`
    this.packageList = project.projectPackages;
     this.packageList.map((value: any) => {
      if (value.consultantId) {
        value.consultant = value.consultantId?.name;
      }else{
        value.consultant = "No Consultant"
      } 
    });
  }

  ngOnInit(): void {
    this.tableColumns = {
      no: "SN",
      name: "Package Name",
      consultant:"Consultant",
      commencementDate: "Start Date",
      completionDate: "Completion Date",
      period: "Duration(Months)",
      description: "Package Description",
      action: "Actions"
    }

  }
  addSubProject(id){
    const packag = this.packageList.find(a => a.id === id);
     localStorage.setItem('packag', JSON.stringify(packag));
    
    this.router.navigate([`/projects/${id}/sub-projects`]);
  }
  add() {
    const data = {
      title: "Add New Package",
      action: "create",
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "60%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateDesignationComponentDialog";
    const dialogRef = this.dialog.open(CreatePackageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.notificationService.determineResponse(response);
    });
  }

  edit(item:any) {
    const data = {
      title: "Edit Package",
      action: "update",
      package: item,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "60%";
    dialogConfig.data = data;
     const dialogRef = this.dialog.open(CreatePackageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
      this.notificationService.determineResponse(response);
    });
  }

  remove(item: any) {

    const designationStatus = item.status == "Active" ? "Deactivate" : "Activate";
    const message = `Are you sure you want to ${designationStatus} </br>${item.name} Package?`;
    this.notificationService.confirmation(message).then((data) => {
      if (data.value) {

      }
    });
  }

}
