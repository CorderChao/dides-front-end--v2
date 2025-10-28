import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-change-default-password',
  templateUrl: './change-default-password.component.html',
  styleUrls: ['./change-default-password.component.scss']
})
export class ChangeDefaultPasswordComponent implements OnInit {

  public title: string;
  public label: string;
  public user: any;
  public resetform: FormGroup;
  from: any;
  criteria = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumeric: false,
    hasSpecialChar: false
  };

  constructor(
    private dialogRef: MatDialogRef<ChangeDefaultPasswordComponent>,
    private toastSvc: ToastService,
    private userSvc: AuthenticationService,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.title = data.title;
      this.label = data.label;
      this.from = data.from;      
      this.user = JSON.parse(localStorage.getItem('userInfo'));
  }

  ngOnInit() {
    this.resetform = this.initResetForm();
  }

  initResetForm(): FormGroup {
    return this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',  [Validators.required, this.passwordValidator.bind(this)]],
      repeatPassword: ['', Validators.required],
    },);
  }

  passwordValidator(control: FormControl) {
    const password = control.value;
    if (!password) return null;

    this.criteria.hasUpperCase = /[A-Z]/.test(password);
    this.criteria.hasLowerCase = /[a-z]/.test(password);
    this.criteria.hasNumeric = /[0-9]/.test(password);
    this.criteria.hasSpecialChar = /[\W_]/.test(password);

    const valid = this.criteria.hasUpperCase && this.criteria.hasLowerCase && this.criteria.hasNumeric && this.criteria.hasSpecialChar;
    if (!valid) {
      return { invalidPassword: true };
    }
    return null;
  }

  public resetPassword(payload: any) {
    if (payload.newPassword !== 'ReRMIS@123456*') {
      if (payload.newPassword === payload.repeatPassword) {
        const payloadData = {
          oldPassword: payload.oldPassword,
          newPassword: payload.newPassword
        }
        this.userSvc.changePassword(this.user.uuid, payloadData).subscribe((response) => {
            console.log("DATa on Change Password", response)
          this.dialogRef.close(response);
        });
      } else {
        this.toastSvc.error('Error', 'New Password does not match Repeat Password, try again', 6000);
      }
    } else {
      this.toastSvc.error('Error', 'You can not use default password as your password', 6000);
    }
  }

  public closeWindow(){
    this.toastSvc.warning('Warning','You can not close this window, it will close automatically after changing your default password', 6000);
  }

}
