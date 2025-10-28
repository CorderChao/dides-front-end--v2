import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateRoleComponent } from '../create-role/create-role.component';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-roles-permission',
  templateUrl: './roles-permission.component.html',
  styleUrl: './roles-permission.component.scss'
})
export class RolesPermissionComponent {
  rolesPermissions: any;
  title: string;

  constructor(
    private toastSVC: ToastService,
    private modal: MatDialog,
    private userSrv: AuthenticationService
  ) {}



  tableColumns: any = {
    no: "SN",
    description: "Role Name",
    status: "Status",
    action: "Actions"
  }




  ngOnInit(): void {
    this.title = "USER ROLR AND PERMISSIONS"
    this.getAllRolesPermission();
  }

  getAllRolesPermission() {
    this.userSrv.fetchAllRolesPermissions().subscribe((response) => {
        if (response.code === 6000) { 
         this.rolesPermissions = response.data;
        } else if (response.code === 6004) {
      
          this.toastSVC.warning("Info!", "No records found", 5000);
        } else if (response.code !== 6000 && response.code !== 6004) {

          this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
         
        }
    });
  }



  openDialog(){
    const data = {
      title: 'Create New User Role',
      label: 'SAVE',
      action: 'create',
    };
    const config = new MatDialogConfig();
    config.data = data;
    config.disableClose = true;
    config.autoFocus = false;
    config.width = '65%';
    config.position = {
      top: '75px',
    };
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';

    const dialog = this.modal.open(CreateRoleComponent, config);
    dialog.afterClosed().subscribe((response) => {
      if(response.code === 6000){
        this.toastSVC.success('Information', 'User Role Created Successfully', 5000);
        this.getAllRolesPermission();
      }
    });
  }
  
  public edit(item?: any, editRoleForm?: boolean) {
      item.editRoleForm = editRoleForm;
      const data = {
      title: `Update Role - ${item.name}`,
      action: 'update',
      label: 'Update',
      item: item,
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.disableClose = true;
    config.autoFocus = false;
    config.width = '65%';
    config.position = {
      top: '75px',
    };
    config.panelClass = 'mat-dialog-box';
    config.backdropClass = 'mat-dialog-overlay';

    const dialog = this.modal.open(CreateRoleComponent, config);
    dialog.afterClosed().subscribe((response) => {
      if(response.code === 6000){
        this.toastSVC.success('Information', 'User Role Updated Successfully', 5000);
        this.getAllRolesPermission();
      }else{
        this.toastSVC.warning('Information', `${response.description}`, 6000)}
    });
  }


  deleteData(data: any) {
    data.active = false;
    Swal.fire({
      title: `You are About to De-Activate ${data.name}?`,
      text: "",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#1976D2",
      cancelButtonColor: "#d33000",
      cancelButtonText: "Cancel!",
      confirmButtonText: "Yes, De-Activate",
    }).then((result) => {
      if (result.value) {
        this.userSrv.editRolePermission(data.uuid, data).subscribe({
          next: (response: any) => {
            console.log("res", response);
            
            if (response.code == 6000) {
              this.getAllRolesPermission();
              this.toastSVC.success(
                "Success!",
                "Record De-Activated successfully",
                5000
              );
            } else if (response.code !== 6000) {
              this.toastSVC.warning("Error!", "Unable to De-Activate Record", 5000);
            }
          }
        });
      }
    });
  }

  activateData(data: any) {
    data.active = true;
    Swal.fire({
      title: `You are About to Activate ${data.name}?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1976D2",
      cancelButtonColor: "#d33000",
      cancelButtonText: "Cancel!",
      confirmButtonText: "Yes, Activate",
    }).then((result) => {
      if (result.value) {
        this.userSrv.editRolePermission(data.uuid, data).subscribe({
          next: (response: any) => {
            console.log("res", response);
            
            if (response.code == 6000) {
              this.getAllRolesPermission();
              this.toastSVC.success(
                "Success!",
                "Record Activated successfully",
                5000
              );
            } else if (response.code !== 6000) {
              this.toastSVC.warning("Error!", "Unable to Activate Record", 5000);
            }
          }
        });
      }
    });
  }


}
