import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateDesignationComponent } from './create-designation/create-designation.component';

@Component({
  selector: 'app-designation-setting',
  templateUrl: './designation-setting.component.html',
  styleUrl: './designation-setting.component.scss'
})
export class DesignationSettingComponent implements OnInit {
  
  title: string;
  designationList: any[];
  tableColumns: any;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.title = "DESIGNATION SETTINGS";

    this.tableColumns = {
      no: "SN",
      name: "Designation Name",
      status: "Status",
      action: "Actions"
    }
    
  }

  addDesignation() {
    const data = {
      title: "Add Designation",
      action: "create",
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "50%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateDesignationComponentDialog";
    this.dialog.open(CreateDesignationComponent, dialogConfig);
  }

  editDesignation(designation) {
    const data = {
      title: "Edit Designation",
      action: "edit",
      designation,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "50%";
    dialogConfig.data = data;
    dialogConfig.id = "EditDesignationComponentDialog";
    this.dialog.open(CreateDesignationComponent, dialogConfig);
  }

  removeDesignation(designation: any) {

    const designationStatus = designation.status == "Active" ? "Deactivate" : "Activate";
    const message = `Are you sure you want to ${designationStatus} </br>${designation.name} Designation?`;
    this.notificationService.confirmation(message).then((data) => {
      if (data.value) {

      }
    });
  }

}
