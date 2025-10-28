import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-accounts',
  templateUrl: './users-accounts.component.html',
  styleUrl: './users-accounts.component.scss'
})
export class UsersAccountsComponent  {
  userInfo: any;
  organzationUuid: any;
  userEmail: any;
  role: any;
  allUser: any;
  title: string;


  constructor(
    private router: Router,
    private toastSVC: ToastService,
    private modal: MatDialog,
    private userSrv: AuthenticationService
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.organzationUuid = this.userInfo.organization;
    this.role =  localStorage.getItem('role');
  }

  users: any[] = [];
  agentsUsers: any[] = [];
  collectors: any[] = [];
  applicants: any[] = [];
  isOpen: boolean = false;

  
  tableColumns = {
    no: "SN",
    name: "Name",
    email: "Email",
    enabled: "Status",
    phoneNumber: "Phone Number",
    organizationDisplay: "Organization",
    action: "Actions"
  }

  tableColumns2 = {
    no: "SN",
    name: "Name",
    email: "Email",
    enabled: "Status",
    phoneNumber: "Phone Number",
    consultancy: "Consaltancy",
    action: "Actions"
  }

  
 

  ngOnInit(): void {
   this.title = "USER ACCOUNTS"
 //   if (this.role === 'ROLE_SUPER_ADMIN') {
      this.getAllUser();
  //  }else{
    //  this.getAllOrganizationUser();
  //  } 
  }


  getAllUser() {
    this.userSrv.fetchAllUsers().subscribe((response) => {
        if (response.code === 6000) {
          console.log("users", response.data);
          
          this.users = response.data.filter(u => u.consultant === null && u.organization !== null);
          this.users.map((value)=> {
            value.organizationDisplay = value.organization?.name,
            value.name = `${value.firstName} ${value.middleName} ${value.lastName}`
          })

         this.agentsUsers = response.data.filter(u => (u.consultant !== null));
         this.agentsUsers.map((value)=> {
          value.consultancy = value.consultant.name,
          value.name = `${value.firstName} ${value.middleName} ${value.lastName}`
        }
      )
          
        } else if (response.code === 6004) {
          this.toastSVC.warning("Info!", "No records found", 5000);
        } else if (response.code !== 6000 && response.code !== 6004) {
          this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
        }
    });
  }

  getAllOrganizationUser() {
    this.userSrv.fetchAllUsers().subscribe((response) => {
        if (response.code === 6000) {
          this.allUser = response.data;
          this.allUser =  this.allUser.filter(user => user.organization?.uuid === this.organzationUuid);
          this.users =  this.allUser.filter(u => u.isAgent === false  && (u.checkNumber !== null || u.checkNumber !== "")
          && (u.identificationCardNumber === null || u.identificationCardNumber === ""));

         this.agentsUsers = response.data.filter(u => (u.identificationCardNumber !== null  && u.userType.name !== 'COLLECTOR'
         && (u.checkNumber === null || u.checkNumber === "") && u.applicantType === null ));

         this.collectors = response.data.filter(u => (u.identificationCardNumber !== null  && u.userType.name === 'COLLECTOR'
         && (u.checkNumber === null || u.checkNumber === "")
         ));

          this.applicants = response.data.filter(u => (u.identificationCardNumber !== null  && u.userType.name !== 'COLLECTOR'
          && (u.checkNumber === null || u.checkNumber === "") && u.applicantType !== null ));
          console.log("agentsUsers", this.agentsUsers);
          
        } else if (response.code === 6004) {
          this.toastSVC.warning("Info!", "No records found", 5000);
        } else if (response.code !== 6000 && response.code !== 6004) {
          this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
        }
    });
  }

  openDialog(){
   localStorage.removeItem('form')
   localStorage.removeItem('action')
   localStorage.setItem('action', 'create')
   localStorage.setItem('form', 'govUser')
   this.router.navigate(["/users/create"]);
  }

  openDialog2(){
    localStorage.removeItem('form')
    localStorage.removeItem('action')
    localStorage.setItem('action', 'create')
    localStorage.setItem('form', 'agentUser')
    this.router.navigate(["/users/create"]);
   }



edit(value: any){

}

reset_password(value: any){
 this.userSrv.resetPassword(value.uuid).subscribe(
  (response) => {
    console.log("response", response);

      if(response.code === 6000){
        this.toastSVC.success('Information', 'Password reset successfully',5000);
      }
  }
 );
}

}