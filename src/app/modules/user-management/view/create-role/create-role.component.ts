import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  public title: string;
  public label: string;
  public action: string;
  public item: any;
  public roleId: string;


  roleform: FormGroup;
  permissionform: FormGroup;
  permissions: any[] = [];
  assignedPermissions: any[] = [];
  addedPermissionsIds: any[] = [];
  removedPermissionsIds: any[] = [];
  searchPermissions: any[] = [];
  public assigned: any[] = [];
  savebool: boolean;
  filterPermissions: any[] = [];
  selectedPermissionsIds: any[] = [];
  editRoleForm: boolean = false;
  showButton: boolean = false;
  activeButton: boolean = true;


  constructor(
    private toastSVC: ToastService,
    private userSrv: AuthenticationService,
    private dialogRef: MatDialogRef<CreateRoleComponent>,
    // private permissionsService: NgxPermissionsService,
    // private termisPersmissionsService: TermisPersmissionsService,
    private _dialogRef: MatDialogRef<CreateRoleComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.action = data.action;
    this.label = data.label;

    if (this.action === 'update') {
      this.item = data.item;
      this.editRoleForm = data.item.editRoleForm;
      this.assignedPermissions = this.item.privileges;
    }

  }
  ngOnInit() {
    this.roleform = this.initRoleForm();
    this.getAllPermission();
    if (this.addedPermissionsIds.length === 0 && this.removedPermissionsIds.length === 0) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
    // const perm = this.termisPersmissionsService.loadTermisPermissions();
    // this.permissionsService.loadPermissions(perm);
  }

  checkValidations() {
    console.log("addedPermissionsIds", this.addedPermissionsIds);
    console.log("removedPermissionsIds", this.removedPermissionsIds);
   if (this.addedPermissionsIds.length === 0 && this.removedPermissionsIds.length === 0) {
      this.activeButton = true;
    } else if(this.addedPermissionsIds.length !== 0 && this.removedPermissionsIds.length === 0){
      this.activeButton = false;
    }else if(this.addedPermissionsIds.length === 0 && this.removedPermissionsIds.length !== 0){
      this.activeButton = false;
    }else if(this.addedPermissionsIds.length !== 0 && this.removedPermissionsIds.length !== 0){
      this.activeButton = false;
    }
  }

  public initRoleForm(): FormGroup {
    if (this.action === 'create') {
      return this._formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      })
    } else {
      return this._formBuilder.group({
        id: [this.item.uuid, Validators.required],
        name: [this.item.name, Validators.required],
        description: [this.item.description, Validators.required]
      })
    }
  }


  getAllPermission() {
    this.userSrv.fetchAllPermissions().subscribe((response) => {
      if (response.code === 6000) {
        this.searchPermissions = response.data;
        this.permissions = response.data;
        if (this.action === 'update') {
          this.permissions.forEach(element => {
            this.assignedPermissions.forEach(permission => {
              if (element.uuid === permission.uuid) {
                let index = this.permissions.indexOf(element);
                this.permissions.splice(index, 1);
                this.permissions = [...this.permissions];
              }
            });
          });
        }
      } else if (response.code === 6004) {
        this.permissions = [];
        this.toastSVC.warning("Info!", "No records found", 5000);
      } else if (response.code !== 6000 && response.code !== 6004) {
        this.permissions = [];
        this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
        this.permissions = [];
      }
    });
  }

  public toggle3(item: any) {
    const index: number = this.permissions.indexOf(item);
    const index3: number = this.searchPermissions.indexOf(item);
    const index2: number = this.removedPermissionsIds.indexOf(item.uuid);
    if (index !== -1) {
      this.removedPermissionsIds.splice(index2, 1);
      this.permissions.splice(index, 1);
      this.searchPermissions.splice(index3, 1);
      this.assignedPermissions.push(item);
      this.addedPermissionsIds.push(item.uuid);
      this.filterPermissions.push(item);
      this.filterPermissions = [...this.filterPermissions]
      this.permissions = [...this.permissions];
      this.searchPermissions = [...this.searchPermissions];
      this.addedPermissionsIds = [...this.addedPermissionsIds];
      this.assignedPermissions = [...this.assignedPermissions];
      this.removedPermissionsIds = [...this.removedPermissionsIds];
    }
    this.checkValidations();
  }

  public toggle(item: any) {
    const index: number = this.assignedPermissions.indexOf(item);
    const index2: number = this.filterPermissions.indexOf(item);
    const index3: number = this.addedPermissionsIds.indexOf(item.uuid);
    if (index !== -1) {
      this.removedPermissionsIds.push(item.uuid);
      this.addedPermissionsIds.splice(index3, 1);
      this.assignedPermissions.splice(index, 1);
      this.filterPermissions.splice(index2, 1);
      this.permissions.push(item);
      this.permissions = [...this.permissions];
      this.assignedPermissions = [...this.assignedPermissions];
      this.filterPermissions = [...this.filterPermissions];
      this.removedPermissionsIds = [...this.removedPermissionsIds];
      this.addedPermissionsIds = [...this.addedPermissionsIds];
    }
    this.checkValidations();
  }




  /**
   * assign permissions on a role
   * @param payload 
   * @param stepper 
  */



  public applyFilter(event: Event) {
    const filterValue = ((event.target as HTMLInputElement).value).trim().toLowerCase();
    console.log("event2", filterValue);
    this.permissions = this.permissions.filter(a => JSON.stringify(a).toLowerCase().includes(filterValue));
    if (filterValue === '' || this.permissions.length === 0) {
      this.permissions = this.searchPermissions;
      this.permissions = [...this.permissions];
    }
  }

  public applyFilter2(event: Event) {
    const filterValue = ((event.target as HTMLInputElement).value).trim().toLowerCase();
    this.assignedPermissions = this.assignedPermissions.filter(a => JSON.stringify(a).toLowerCase().includes(filterValue));
    if (filterValue === '' || this.assignedPermissions.length === 0) {
      this.assignedPermissions = this.filterPermissions;
    }
  }









  update() {
    if (this.editRoleForm === true) {
      this.selectedPermissionsIds = [];
      this.assignedPermissions.forEach(role => {
        this.selectedPermissionsIds.push(role.uuid)
      });
      const payload: any = {
        "name": this.roleform.get('name').value,
        "description": this.roleform.get('description').value,
        "privilegeIds": this.selectedPermissionsIds
      }
      this.userSrv.editRolePermission(this.roleform.value.id, payload).subscribe((response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else if (response.code !== 6000) {
          this.toastSVC.warning('Information', `${response.description}`, 6000)
        }
      });
    }
      if (this.addedPermissionsIds.length > 0) {
        this.selectedPermissionsIds = [];
        this.addedPermissionsIds.forEach( added => {
           this.selectedPermissionsIds.push({"permissionId": added})
        });  
        const paylaod = {
          "roleId": this.roleform.value.id,
          "permissionList": this.selectedPermissionsIds
        }
        this.userSrv.addPermissionsRole(paylaod).subscribe((response) => {
          if (response.code === 6000) {
            this.dialogRef.close(response);
          } else if (response.code !== 6000) {
            this.toastSVC.warning('Information', `${response.description}`, 6000)
          }
        });
     }
      if (this.removedPermissionsIds.length > 0) {
        this.selectedPermissionsIds = [];
        this.removedPermissionsIds.forEach( remov => {
          this.selectedPermissionsIds.push({"permissionId": remov})
       });  
       const paylaod = {
         "roleId": this.roleform.value.id,
         "permissionList": this.selectedPermissionsIds
       }
        this.userSrv.deletePermissionsRole(paylaod).subscribe((response) => {
          console.log(response);
          
          if (response.code === 6000) {
            this.dialogRef.close(response);
          } else if (response.code !== 6000) {
            this.dialogRef.close(response);
          }
        });
      }
    }
  

  savenewRole() {
    this.selectedPermissionsIds = [];
    this.assignedPermissions.forEach(role => {
      this.selectedPermissionsIds.push(role.uuid)
    });
    const payload: any = {
      "name": this.roleform.get('name').value,
      "description": this.roleform.get('description').value,
      "privilegeIds": this.selectedPermissionsIds
    }
    this.userSrv.saveRole(payload).subscribe((response) => {
      if (response.code === 6000) {
        this.dialogRef.close(response);
      } else if (response.code !== 6000) {
        this.toastSVC.warning('Information', `${response.description}`, 6000)
      }
    });
  }


  /**
   * save role and then save permissions
   * @param stepper 
  */
  public save() {
    this.savebool = false;
    if (this.action === 'update') {
      this.update();
    } else if (this.action === 'create') {
      this.savenewRole();
    }
  }




}
