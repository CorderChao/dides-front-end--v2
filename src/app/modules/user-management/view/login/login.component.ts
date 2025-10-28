import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { SharedModule } from "src/app/shared/shared.module";


@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = "";
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  tokenExpiryTime: string;

  constructor(
    private toastSVC: ToastService,
    private authenticationSrvc: AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    localStorage.clear();
  }

  initForm = () => {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  };

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {  
    let userName = this.loginForm.value.username;
    let password = this.loginForm.value.password;

  //   this.authenticationSrvc.login(userName, password).subscribe({
  //     next: (user: any) => { 
  //       this.tokenExpiryTime = JSON.stringify(user.expires_in);
  //       localStorage.setItem('currentClient',JSON.stringify(user.access_token));
  //       localStorage.setItem('refreshToken',JSON.stringify(user.refresh_token));
  //       localStorage.setItem('EXPIRE', JSON.stringify(user.refresh_token));
  //       localStorage.setItem('expireTime', JSON.stringify(user.expires_in));
  //       if (user) {
  //         this.getUserInfo();
  //       }
       
  //     },
  //     error: (error) => {
  //       console.error(error);
  //       this.toastSVC.warning(
  //         "Info!",
  //         "Failed to login to ReRIMIS",
  //         5000
  //       );
  //     },
  //  });
  this.router.navigate(["/dashboard"]);
}

 getUserInfo(){
  this.authenticationSrvc.userInfo().subscribe(response => {
    if (response.code === 6000) {     
      localStorage.setItem('organizationUUID', response.data.organization);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      if (response.data.organization === "") {
        this.router.navigate(["/dashboard"]);
      }else{
        this.getOrganizationInfo(response.data.organization)
      }
      
    }else{
      this.toastSVC.warning(
        "Info!",
        `${response.description}`,
        5000
      );
    }
  });
 }


 getOrganizationInfo(id: any){
  this.authenticationSrvc.orgInfo(id).subscribe(response => {
    if (response.code === 6000) {
      console.log("org", response);
      localStorage.setItem("logo", response.data.logo);
      localStorage.setItem("orgName", response.data.name);
      this.router.navigate(["/dashboards"]);
    }else{
      this.toastSVC.warning(
        "Info!",
        `${response.description}`,
        5000
      );
    }
  });
 }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
