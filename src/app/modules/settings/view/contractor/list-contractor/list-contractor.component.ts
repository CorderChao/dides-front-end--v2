import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateContractorComponent } from '../create-contractor/create-contractor.component';

@Component({
  selector: 'app-list-contractor',
  templateUrl: './list-contractor.component.html',
  styleUrl: './list-contractor.component.scss'
})
export class ListContractorComponent {
title: string;
  contractors: any[];
  tableColumns: any;

  constructor(
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService,
  ) {
    this.title = "CONTRACTORS LIST";
}

  ngOnInit(): void {
    this.fetchAllContractors();
    this.tableColumns = {
      no: "S/No",
      name: "Contractor Name",
      address: "Address",
      email: "Email",
      action: "Actions"
    }
    
  }

  public fetchAllContractors() {
    this.setSvc.getAllContractors().subscribe((response) => {
      console.log("Contractors", response);
      if (response.code === 6000) {
        this.contractors = response.data;
      }
    });
  }

  add() {
    const data = {
      title: "Add New Contractor",
      action: "create",
      label: "Save"
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "60%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateContractorComponentDialog";
    const dialogRef = this.dialog.open(CreateContractorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
    this.notificationService.determineResponse(response);
    });
  }

  edit(item:any) {
    const data = {
      title: "Update Contractor",
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
    dialogConfig.id = "CreateContractorComponentDialog";
    const dialogRef = this.dialog.open(CreateContractorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
   this.notificationService.determineResponse(response);
    });
 
  }

  remove(item: any) {

    const designationStatus = item.status == "Active" ? "Deactivate" : "Activate";
    const message = `Are you sure you want to ${designationStatus} </br>${item.name} Project?`;
    this.notificationService.confirmation(message).then((data) => {
      if (data.value) {

      }
    });
  }

}
