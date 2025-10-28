import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateFunderComponent } from '../create-funder/create-funder.component';

@Component({
  selector: 'app-list-funder',
  templateUrl: './list-funder.component.html',
  styleUrl: './list-funder.component.scss'
})
export class ListFunderComponent {

  title: string;
  funderList: any[];
  tableColumns: any;

  constructor(
    private dialog: MatDialog,
    private setSvc: SettingService,
    private notificationService: NotificationService,
  ) {
    this.title = "FUNDER/SPONSOR";
}

  ngOnInit(): void {
    this.fetchAllFunders();
    this.tableColumns = {
      no: "S/No",
      name: "Funder Name",
      acronym: "Funder Acronym",
      action: "Actions"
    }
    
  }

  public fetchAllFunders() {
    this.setSvc.getAllFunders().subscribe((response) => {
      console.log("Funder", response);
      if (response.code === 6000) {
        this.funderList = response.data;
      }
    });
  }

  add() {
    const data = {
      title: "Add New Funder",
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
    dialogConfig.id = "CreateFunderComponentDialog";
    const dialogRef = this.dialog.open(CreateFunderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response) => {
    this.notificationService.determineResponse(response);
    });
  }

  edit(item:any) {
    const data = {
      title: "Edit Funder",
      action: "update",
      funder: item,
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.position = {
      top: "80px",
    };
    dialogConfig.width = "30%";
    dialogConfig.data = data;
    dialogConfig.id = "CreateFunderComponentDialog";
    const dialogRef = this.dialog.open(CreateFunderComponent, dialogConfig);
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
