import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from 'src/app/modules/settings/service/setting.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-accounts',
  templateUrl: './create-user-accounts.component.html',
  styleUrl: './create-user-accounts.component.scss'
})
export class CreateUserAccountsComponent implements OnInit {
  title: any;

  public userform: FormGroup;
  public roleForm: FormGroup;

  public isUpdate: boolean;
  public isLinear: boolean = true;
  public showRegCon: boolean = false;
  public regions: any[] = [];
  public councils: any[] = [];
  public userTypes: any[] = [];

  public sex: any[] = [
    { name: 'Male', value: true },
    { name: 'Female', value: false }
  ]

  code2: any;
  level: any;
  showCon: boolean = false;
  designationCode: any;

  @ViewChild('stepper', { static: true })
  stepper: MatStepper;
  assignedRoles: any[] = [];
  assignedRolesIds: any[] = [];
  allRoles: any[] = [];
  availableRoles: any[] = [];
  saveUser: any;
  institutionLists: any[] = [];
  addedRoleIds: any[] = [];
  removedRolesIds: any[] = [];
  form: any;
  adminlevel: any[] = [];
  agentLists: any[] = [];
  idTypesUUID: any;
  userInfo: any;
  organzationUuid: any;
  userEmail: any;
  role: any;
  action: any;
  user: any;
  consultantid: number;
  orgId: any;


  constructor(
    private toastSVC: ToastService,
    private userSrv: AuthenticationService,
    private settingService: SettingService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.action = localStorage.getItem('action');
      this.form = localStorage.getItem('form')
      this.isLinear = true; 
      if (this.action === 'update') { 
        this.isUpdate = true;
        this.assignedRoles = this.user.roles;
        this.fetchCouncilsByRegionUuid(this.user.region?.uuid);
      }
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.organzationUuid = this.userInfo.organization;
      this.role =  localStorage.getItem('role');
    }


    ngOnInit() {
     this.title = "CREATE USER ACCOUNT"
     
     this.userform = this.initUserform();
     this.getAllAdminlevel();
     this.getAllDesignations();
     this.getAllInstitutions();
     this.getAllConsultancy();
     this.getAllRolesPermission();
     this.fetchAllIdTypes();
    //  if (this.role === 'ROLE_SUPER_ADMIN') {
    //    this.userform.controls['organizationId'].setValidators([Validators.required]);
    //    this.userform.controls['organizationId'].updateValueAndValidity();
    //  }
    }

    organizationChange(item: any){
      this.organzationUuid = item.uuid;
    }
  
    agetChange(item: any){
      this.organzationUuid = item.id;
    }
  
    
    
  
  
    formatNida(event: any) {
      const value = event.target.value.replace(/\D/g, ''); 
      let formattedValue = '';
      if (value.length > 0) {
        formattedValue  = value.substring(0, 8);
      }
      if (value.length > 8) {
        formattedValue += '-' + value.substring(8, 13);
      }
      if (value.length > 13) {
        formattedValue += '-' + value.substring(13, 18);
      }
      if (value.length > 18) {
        formattedValue += '-' + value.substring(18, 20);
      }
       this.userform.get('identificationCardNumber').setValue(formattedValue); 
    }
  
    public fetchAllIdTypes() {
      this.userSrv.getAllIdTypes().subscribe((response) => {
        if (response.code === 6000) {
          response.data.forEach(element => {
            if(element.name === 'NIDA'){
              this.idTypesUUID = element.setupUUID;
            }
          });
        }
      });
    }
  
    public getAllAdminlevel() {
      this.userSrv.getAllAdminlevel().subscribe((response) => {
        if (response.code === 6000) {
          this.adminlevel = response.data;
        }
      });
    }
  
    getAllRolesPermission() {
      this.userSrv.fetchAllRolesPermissions().subscribe((response) => {
        console.log("getAllRolesPermission", response);
        
        if (response.code === 6000) {
          this.allRoles = response.data;
          this.availableRoles = response.data;
          if (this.action === 'update') {
            this.availableRoles.forEach(role => {
              this.assignedRoles.forEach(assignedRole => {
                if (role.uuid === assignedRole.uuid) {
                  let index = this.availableRoles.indexOf(role);
                  this.availableRoles.splice(index, 1);
                  this.availableRoles = [...this.availableRoles];
                }
              });
            });
          }
        } else if (response.code === 6004) {
          this.toastSVC.warning("Info!", "No records found", 5000);
        } else if (response.code !== 6000 && response.code !== 6004) {
          this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
  
        }
      });
    }

    getAllConsultancy(){     
      this.settingService.getAllConsultants().subscribe((response) => {
        console.log("response", response.data);   
       if (response.code === 6000) {
         this.agentLists = response.data;
       }
     });
    }
  
    getAllInstitutions() {
      this.settingService.getAllOrganization().subscribe({
        next: (response) => {
          console.log("response", response);     
          if (response.code === 6000) {
            response.data.forEach(element => {
              if(element.organizationTypeId.name === "AGENT" ||
              element.organizationTypeId.name === "SPECIAL GROUPS"){
                this.agentLists.push(element); 
                this.agentLists = [...this.agentLists]
              }else {
                this.institutionLists.push(element);
                this.institutionLists = [...this.institutionLists]
              }
            });
          } else if (response.code === 6004) {
            this.institutionLists = [];
            this.toastSVC.warning("Info!", "No records found", 5000);
          } else if (response.code !== 6000 && response.code !== 6004) {
            this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
            this.institutionLists = [];
          }
        },
        error: (error) => {
          console.error(error);
          this.toastSVC.warning(
            "Info!",
            "Service is Temporarily Unavailble",
            5000
          );
        },
      });
    }
  
    getAllDesignations() {
      this.settingService.getCofigTypes('DESIGNATION_TYPE').subscribe({
        next: (response) => {
          if (response.code === 6000) {
            this.userTypes = response.data;
          } else if (response.code === 6004) {
            this.userTypes = [];
            this.toastSVC.warning("Info!", "No records found", 5000);
          } else if (response.code !== 6000 && response.code !== 6004) {
            this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
            this.userTypes = [];
          }
        },
        error: (error) => {
          console.error(error);
          this.toastSVC.warning(
            "Info!",
            "Service is Temporarily Unavailble",
            5000
          );
        },
      });
    }
  
  
    public initUserform(): FormGroup {
      if(this.form === 'govUser'){
        if (this.action === 'create') {
          return this.formBuilder.group({
            userLevel: ['', Validators.required],
            designationCode: ['', Validators.required],
            checkNumber: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: ['J',],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
              Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            phoneNumber: ['', Validators.compose([Validators.required,
              Validators.pattern(/^(07|06)\d{8}$/)])],
            sex: [ '', Validators.required],
            regionCode: ['',],
            councilCode: ['',],
            organizationId: ['', Validators.required],
          });
        } else {
          return this.formBuilder.group({
            regionCode: [this.user?.region?.code,],
            councilCode: [this.user.council?.code,],
            userLevel: [this.user.administrativeLevel?.setupUUID, Validators.required],
            email: [this.user.email, Validators.compose([
              Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            sex: [this.user.sex, Validators.required],
            phoneNumber: [this.user.phoneNumber, Validators.compose([Validators.required,
              Validators.pattern(/^(07|06)\d{8}$/)])],
            firstName: [this.user.firstName, Validators.required],
            middleName: [this.user.middleName,],
            lastName: [this.user.lastName, Validators.required],
            checkNumber: [this.user.checkNumber, Validators.required],
            organizationId: [this.user.organization?.uuid, Validators.required],
            designationCode: [this.user.userType?.setupUUID, Validators.required],
            enabled: [this.user.enabled,],
            credentialsNonExpired: [this.user.credentialsNonExpired,],
            accountNonLocked: [this.user.accountNonLocked,],
            accountNonExpired: [this.user.accountNonExpired,],
          
          });
        }
      }else if(this.form === 'agentUser'){
        if (this.action === 'create') {
          return this.formBuilder.group({
            userLevel: ['', Validators.required],
            designationCode: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: ['',],
            lastName: ['', Validators.required],
            email: ['', Validators.compose([
              Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            phoneNumber: ['', Validators.compose([Validators.required,
            Validators.pattern('^[0][0-9]{9}$')])],
            sex: ['', Validators.required],
            regionCode: ['',],
            councilCode: ['',],
            organizationId: ['', Validators.required],
            identificationCardNumber: ["", Validators.required]
          });
        } else {
          return this.formBuilder.group({
            regionCode: [this.user?.region?.code,],
            councilCode: [this.user.council?.code,],
            userLevel: [this.level, Validators.required],
            email: [this.user.email, Validators.compose([
              Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            sex: [this.user.sex, Validators.required],
            phoneNumber: [this.user.phoneNumber, Validators.compose([Validators.required,
            Validators.pattern('^[0][0-9]{9}$')])],
            firstName: [this.user.firstName, Validators.required],
            middleName: [this.user.middleName,],
            lastName: [this.user.lastName, Validators.required],
            organizationId: [this.user.organization?.uuid, Validators.required],
            designationCode: [this.user.userType?.setupUUID, Validators.required],
            enabled: [this.user.enabled,],
            credentialsNonExpired: [this.user.credentialsNonExpired,],
            accountNonLocked: [this.user.accountNonLocked,],
            accountNonExpired: [this.user.accountNonExpired,],
            identificationCardTypeId: [this.user.identificationCardType.setupUUID, Validators.required],
            identificationCardNumber: [this.user.identificationCardNumber, Validators.required]
          });
        }
      }else{
        return null;
      }
    }
  
    validateNumberInput(event: KeyboardEvent): void {
      const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
      if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
        event.preventDefault();
      }
    }
  
    public fetchCouncilsByRegionUuid(uuid: string) {
      this.settingService.getAllCouncils(uuid).subscribe((response) => {
        console.log(response);
        if (response.code === 6000) {
          this.councils = response.data;
        }
      });
  
    }
  
    public save() {
      if (this.action == 'update') {
        this.edit();
      } else {
        this.create();
      }
    }
  
    create() {
      if(this.form === 'govUser'){
         this.consultantid = 0;
         this.orgId = this.organzationUuid
        this.userform.value.identificationCardTypeId =  "",
        this.userform.value.identificationCardNumber =  ""
      }
      if(this.form === 'agentUser'){
        this.orgId = "";
         this.consultantid = this.organzationUuid;
        this.userform.value.checkNumber =  "",
        this.userform.value.fileNumber =  ""
      }
      let payLoad =
      {
        "firstName": this.userform.value.firstName,
        "middleName": this.userform.value.middleName,
        "lastName": this.userform.value.lastName,
        "email": this.userform.value.email,
        "sex": this.userform.value.sex,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true,
        "enabled": true,
        "phoneNumber": this.userform.value.phoneNumber,
        "checkNumber": this.userform.value.checkNumber,
        "councilCode": this.userform.value.councilCode,
        "regionId": this.userform.value.regionCode,
        "fileNumber": this.userform.value.checkNumber,
        "userTypeId": this.userform.value.designationCode,
        "organizationId": this.orgId,
        "consultantId":  this.consultantid,
        "identificationCardTypeId": this.idTypesUUID,
        "identificationCardNumber": this.userform.value.identificationCardNumber,
        "administrationLevelId": this.userform.value.userLevel
      } 
      this.userSrv.saveUser(payLoad).subscribe((response) => {
        if (response.code === 6000) {
          this.saveUserRole(response.data.uuid)
        } else {
          this.toastSVC.info('Information', `${response.description}`, 6000);
        }
      });
    }
  
    saveUserRole(userId: any) {
      if (this.action === 'create') {
        this.assignedRoles.forEach(data => { this.assignedRolesIds.push({ "roleId": data.uuid }) });
        const payload =
        {
          "userId": userId,
          "roleList": this.assignedRolesIds
        }
        this.userSrv.saveUserRole(payload).subscribe((response) => {
          if (response.code === 6000) {
            this.router.navigate(["/users/users-accounts"]);
          } else if (response.code !== 6000) {
            this.toastSVC.info('Information', `${response.description}`, 6000);
          }
        });
      }
      if (this.action === 'update') {
        if (this.addedRoleIds.length > 0) {
          this.assignedRolesIds = [];
          this.addedRoleIds.forEach(data => { this.assignedRolesIds.push({ "roleId": data }) });
          const payload =
          {
            "userId": userId,
            "roleList": this.assignedRolesIds
          }
          this.userSrv.saveUserRole(payload).subscribe((response) => {
            if (response.code === 6000) {
              this.router.navigate(["/users/users-accounts"]);
            } else if (response.code !== 6000) {
              this.toastSVC.info('Information', `${response.description}`, 6000);
            }
          });
        } else if (this.removedRolesIds.length > 0) {
          for (let i = 0; i < this.removedRolesIds.length; i++) {
            this.userSrv.deleteUserRole(userId, this.removedRolesIds[i]).subscribe((response) => {
              if (response.code === 6000 && this.removedRolesIds.length - 1 === i) {
               // this.dialogRef.close(response);
              } else if (response.code !== 6000 && this.removedRolesIds.length - 1 === i) {
                this.toastSVC.info('Information', `${response.description}`, 6000);
              }
            });
          }
  
        } else {
            //  this.dialogRef.close();
        }
      }
  
    }
  
  
  
    edit() {
      if(this.form === 'govUser'){
        this.userform.value.identificationCardTypeId =  "",
        this.userform.value.identificationCardNumber =  ""
      }
      let payLoad =
      {
        "firstName": this.userform.value.firstName,
        "middleName": this.userform.value.middleName,
        "lastName": this.userform.value.lastName,
        "email": this.userform.value.email,
        "sex": this.userform.value.sex,
        "accountNonExpired": this.userform.value.accountNonExpired,
        "accountNonLocked": this.userform.value.accountNonLocked,
        "credentialsNonExpired": this.userform.value.credentialsNonExpired,
        "enabled": this.userform.value.enabled,
        "phoneNumber": this.userform.value.phoneNumber,
        "checkNumber": this.userform.value.checkNumber,
        "councilCode": this.userform.value.councilCode,
        "regionId": this.userform.value.regionCode,
        "fileNumber": this.userform.value.checkNumber,
        "userTypeId": this.userform.value.designationCode,
        "organizationId": this.organzationUuid,
        "consultantId": "",
        "identificationCardTypeId": this.userform.value.identificationCardTypeId,
        "identificationCardNumber":  this.userform.value.identificationCardNumber,
        "administrationLevelId": this.userform.value.userLevel
      }
      this.userSrv.editUser(this.user.uuid, payLoad).subscribe((response) => {
        if (response.code === 6000) {
          this.saveUserRole(this.user.uuid);
        } else if (response.code !== 6000) {
          this.toastSVC.info('Information', `${response.description}`, 6000);
        }
      });
    }
  
  
    getAllRegions() {
      this.settingService.getAllRegions().subscribe({
        next: (response) => {
          if (response.code === 6000) {
            this.regions = response.data;
          } else if (response.code === 6004) {
            this.regions = [];
            this.toastSVC.warning("Info!", "No records found", 5000);
          } else if (response.code !== 6000 && response.code !== 6004) {
            this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
            this.regions = [];
          }
        },
        error: (error) => {
          console.error(error);
          this.toastSVC.warning(
            "Info!",
            "Service is Temporarily Unavailble",
            5000
          );
        },
      });
    }
  
    onRegionChange(event: any) {
      const region = this.regions.filter(r => r.code === event.value);
      this.settingService.getAllCouncils(region[0].uuid).subscribe({
        next: (response) => {
          if (response.code === 6000) {
            this.councils = response.data;
          } else if (response.code === 6004) {
            this.councils = [];
            this.toastSVC.warning("Info!", "No records found", 5000);
          } else if (response.code !== 6000 && response.code !== 6004) {
            this.toastSVC.warning("Error!", "Unable to fetch data", 5000);
            this.councils = [];
          }
        },
        error: (error) => {
          console.error(error);
          this.toastSVC.warning(
            "Info!",
            "Service is Temporarily Unavailble",
            5000
          );
        },
      });
    }
  
  
  
    checkLevel(value: any) {
      if (value === "HQ") {
        this.showRegCon = false;
        this.showCon = false;
        this.userform.patchValue({ regionCode: "" })
        this.userform.patchValue({ councilCode: "" })
        this.userform.controls['regionCode'].clearValidators();
        this.userform.controls['regionCode'].updateValueAndValidity();
        this.userform.controls['councilCode'].clearValidators();
        this.userform.controls['councilCode'].updateValueAndValidity();
      } else if (value === "REGION") {
        this.showRegCon = true;
        this.showCon = false;
        this.userform.patchValue({ councilCode: "" })
        this.userform.controls['regionCode'].setValidators([Validators.required]);
        this.userform.controls['regionCode'].updateValueAndValidity();
        this.userform.controls['councilCode'].clearValidators();
        this.userform.controls['councilCode'].updateValueAndValidity();
      }
      else {
        this.showRegCon = true;
        this.showCon = true;
        this.userform.controls['councilCode'].setValidators([Validators.required]);
        this.userform.controls['councilCode'].updateValueAndValidity();
        this.userform.controls['regionCode'].setValidators([Validators.required]);
        this.userform.controls['regionCode'].updateValueAndValidity();
      }
    }
  
  

  
  
    toggleStatus(user: any) {
      if (user.enabled === true) {
        user.enabled = false;
        this.userform.patchValue({ enabled: false });
      } else if (user.enabled === false) {
        user.enabled = true;
        this.userform.patchValue({ enabled: true });
      }
    }
  
    toggleStatus2(user: any) {
      if (user.credentialsNonExpired === true) {
        user.credentialsNonExpired = false;
        this.userform.patchValue({ credentialsNonExpired: false });
      } else if (user.credentialsNonExpired === false) {
        user.credentialsNonExpired = true;
        this.userform.patchValue({ credentialsNonExpired: true });
      }
    }
  
    toggleStatus3(user: any) {
      if (user.accountNonLocked === true) {
        user.accountNonLocked = false;
        this.userform.patchValue({ accountNonLocked: false });
      } else if (user.accountNonLocked === false) {
        user.accountNonLocked = true;
        this.userform.patchValue({ accountNonLocked: true });
      }
    }
  
    toggleStatus4(user: any) {
      if (user.accountNonExpired === true) {
        user.accountNonExpired = false;
        this.userform.patchValue({ accountNonExpired: false });
      } else if (user.accountNonExpired === false) {
        user.accountNonExpired = true;
        this.userform.patchValue({ accountNonExpired: true });
      }
    }
  
  
    goBack(stepper: MatStepper) {
      stepper.previous();
    }
  
    goForward(stepper: MatStepper) {
      stepper.next();
    }
  
  
  
  
  
  
  
    public toggle2(item: any) {
  
      const index: number = this.allRoles.indexOf(item);
      if (index !== -1) {
        this.allRoles.splice(index, 1);
        this.assignedRoles.push(item);
        this.allRoles = [...this.allRoles];
        this.assignedRoles = [...this.assignedRoles];
      }
  
    }
  
    public toggle3(item: any) {
      console.log("item: ", item);
  
      const index: number = this.availableRoles.indexOf(item);
      const index2: number = this.removedRolesIds.indexOf(item.uuid);
      if (index !== -1) {
        this.availableRoles.splice(index, 1);
        this.removedRolesIds.splice(index2, 1);
        this.assignedRoles.push(item);
        this.addedRoleIds.push(item.uuid);
        this.availableRoles = [...this.availableRoles];
        this.assignedRoles = [...this.assignedRoles];
        this.addedRoleIds = [...this.addedRoleIds];
      }
  
    }
  
    public toggle(item: any) {
      if (this.action === 'create') {
        const index: number = this.assignedRoles.indexOf(item);
        if (index !== -1) {
          this.assignedRoles.splice(index, 1);
          this.allRoles.push(item);
          this.allRoles = [...this.allRoles];
          this.assignedRoles = [...this.assignedRoles];
        }
      } else if (this.action === 'update') {
        const index: number = this.assignedRoles.indexOf(item);
        const index2: number = this.addedRoleIds.indexOf(item.uuid);
        if (index !== -1) {
          this.assignedRoles.splice(index, 1);
          this.addedRoleIds.splice(index2, 1);
          this.availableRoles.push(item);
          this.removedRolesIds.push(item.uuid);
          this.availableRoles = [...this.availableRoles];
          this.assignedRoles = [...this.assignedRoles];
          this.removedRolesIds = [...this.removedRolesIds];
        }
      }
    }
  
  


}
