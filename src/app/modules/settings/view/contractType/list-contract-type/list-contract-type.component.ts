import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateContractTypeComponent } from '../create-contract-type/create-contract-type.component';

@Component({
  selector: 'app-list-contract-type',
  templateUrl: './list-contract-type.component.html',
  styleUrl: './list-contract-type.component.scss'
})
export class ListContractTypeComponent {
title: string;
  contractTypes: any[];
  tableColumns: any;

  constructor(
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService,
  ) {
    this.title = "CONTRACT TYPE LIST";
}

  ngOnInit(): void {
    this.fetchAllContractTypes();
    this.tableColumns = {
      no: "S/No",
      name: "Contract Type Name",
      action: "Actions"
    }
    
  }

  public fetchAllContractTypes() {
    this.setSvc.getAllContractTypes().subscribe((response) => {
      console.log("ContractTypes", response);
      if (response.code === 6000) {
        this.contractTypes = response.data;
      }
    });
  }

  add() {
    const data = {
      title: "Add New ContractType",
      action: "create",
      label: "Save"
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "30%";
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(CreateContractTypeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
    this.notificationService.determineResponse(response);
    });
  }

  edit(item:any) {
    const data = {
      title: "Update ContractType",
      action: "update",
      item: item,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "30%";
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(CreateContractTypeComponent, dialogConfig);
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
