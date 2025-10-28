import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateContractComponent } from '../create-contract/create-contract.component';

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrl: './list-contract.component.scss'
})
export class ListContractComponent {
 title: string;
  contracts: any[];
  tableColumns: any;

  constructor(
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService,
  ) {
    this.title = "CONTRACT LIST";
}

  ngOnInit(): void {
    this.fetchAllContracts();
    this.tableColumns = {
      no: "S/No",
      regNumber: "RegistrationNo",
      name: "Contract Name",
      address: "Address",
      email: "Email",
      action: "Actions"
    }
    
  }

  public fetchAllContracts() {
    this.setSvc.getAllContracts().subscribe((response) => {
      console.log("Contracts", response);
      if (response.code === 6000) {
        this.contracts = response.data;
      }
    });
  }

  add() {
    const data = {
      title: "Add New Contract",
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
    dialogConfig.id = "CreateContractComponentDialog";
    const dialogRef = this.dialog.open(CreateContractComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
    this.notificationService.determineResponse(response);
    });
  }

  edit(item:any) {
    const data = {
      title: "Update Contract",
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
    dialogConfig.id = "CreateContractComponentDialog";
    const dialogRef = this.dialog.open(CreateContractComponent, dialogConfig);
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
