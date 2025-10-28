import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateOrganizationComponent } from '../create-organization/create-organization.component';
import { SettingService } from '../../../service/setting.service';

@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrl: './list-organization.component.scss'
})
export class ListOrganizationComponent {

  title: string;
  organizationList: any[];
  tableColumns: any;

  constructor(
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService,
  ) {
    this.title = "ORGANIZATION SETTINGS";
}

  ngOnInit(): void {
    this.fetchAllOrganizations();
    this.tableColumns = {
      no: "S/No",
      name: "Organization Name",
      address: "Address",
      phone: "Phone Number",
      tin: "Tin Number",
      action: "Actions"
    }
    
  }

  public fetchAllOrganizations() {
    this.setSvc.getAllOrganization().subscribe((response) => {
      console.log("Organizations", response);
      if (response.code === 6000) {
        this.organizationList = response.data;
      }
    });
  }

  add() {
    const data = {
      title: "Add New Organization",
      action: "create",
      label: "Save"
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
    const dialogRef = this.dialog.open(CreateOrganizationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
    this.notificationService.determineResponse(response);
    });
  }

  edit(item:any) {
    const data = {
      title: "Edit Organization",
      action: "edit",
      package: item,
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
    const dialogRef = this.dialog.open(CreateOrganizationComponent, dialogConfig);
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
