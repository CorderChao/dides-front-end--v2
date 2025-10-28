import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateConsultantComponent } from '../create-consultant/create-consultant.component';

@Component({
  selector: 'app-list-consultant',
  templateUrl: './list-consultant.component.html',
  styleUrl: './list-consultant.component.scss'
})
export class ListConsultantComponent {

  title: string;
  consultantList: any[];
  tableColumns: any;

  constructor(
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService,
  ) {
    this.title = "CONSULTANT LIST";
}

  ngOnInit(): void {
    this.fetchAllConsultants();
    this.tableColumns = {
      no: "S/No",
      regNumber: "RegistrationNo",
      name: "Consultant Name",
      address: "Address",
      email: "Email",
      action: "Actions"
    }
    
  }

  public fetchAllConsultants() {
    this.setSvc.getAllConsultants().subscribe((response) => {
      console.log("Consultant", response);
      if (response.code === 6000) {
        this.consultantList = response.data;
      }
    });
  }

  add() {
    const data = {
      title: "Add New Consultant",
      action: "create",
      label: "Save"
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "65%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateConsultantComponentDialog";
    const dialogRef = this.dialog.open(CreateConsultantComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
    this.notificationService.determineResponse(response);
    });
  }

  edit(item:any) {
    const data = {
      title: "Edit Consultant",
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
    dialogConfig.id = "CreateConsultantComponentDialog";
    const dialogRef = this.dialog.open(CreateConsultantComponent, dialogConfig);
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
