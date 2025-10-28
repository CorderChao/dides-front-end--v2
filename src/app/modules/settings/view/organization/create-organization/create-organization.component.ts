import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicForm } from 'src/app/shared/components/dynamic-form/dynamic-form.model';
import { SettingService } from '../../../service/setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrl: './create-organization.component.scss'
})
export class CreateOrganizationComponent {
 formFields: DynamicForm;
  organizationForm: FormGroup;
  title: any;
  action: any;
  label:any;
  public orgData: any;
  public organizationLists: any[] = [];
  file: any;
  filePath: string;
  fileSize: string;
  fname: any;
  public imageSource: string;
  base64String: string;

  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    public dialogRef: MatDialogRef<CreateOrganizationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      this.orgData = data.item;
    }
  }

  ngOnInit(): void {
this.fetchAllOrganizationTypes();
    this.organizationForm = this.initForm();
  }

  public fetchAllOrganizationTypes() {
    this.setSvc.getCofigTypes("ORGANIZATION_TYPE").subscribe((response) => {
      console.log("Organization Types", response);
      if (response.code === 6000) {
        this.organizationLists = response.data;
      }
    });
  }
  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
        code: ["", Validators.required],
        name: ["", Validators.required],
        phoneNumber: ["", Validators.required],
        address: ["", Validators.required],
        domainName: ["", Validators.required],
        organizationTypeId: ["", Validators.required],
        tin: ["", Validators.required],
        spCode: ["", Validators.required],
        logo: ["", Validators.required],
      });
    } else {
      // const modifiedPhoneNumber = this.removeFirstSymbol(
      //   this.orgData.phoneNumber
      // );
      return this.fb.group({
        code: [this.orgData.code, Validators.required],
        name: [this.orgData.name, Validators.required],
        phoneNumber: [this.orgData.phoneNumber, Validators.required],
        address: [this.orgData.address, Validators.required],
        domainName: [this.orgData.domainName, Validators.required],
        organizationTypeId: [this.orgData.organizationTypeId, Validators.required],
        tin: [this.orgData.tin, Validators.required],
        spCode: [this.orgData.spCode, Validators.required],
        logo: ["", Validators.required],
      });
    }
  }
  
  formatTin(event: any) {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{3})(?=\d)/g, "$1-");
    event.target.value = formattedValue;
    this.organizationForm.get("tin").setValue(formattedValue);
  }

  formatPhoneNumber(event: any) {
    const value = event.target.value.replace(/\D/g, "");
    event.target.value = value;
    this.organizationForm.get("phoneNumber").setValue(value);
  }



  public save(data: any) {
      console.log("DATAAA", data);
    if (this.action === "create") {

       this.create(data);
    } else {
       this.update(data);
    }
  }

  addFile(event) {
    this.file = <File>event.target.files[0];
    this.fname = event.target.files[0].name;
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validImageTypes.includes(this.file.type)) {
      return Swal.fire("Please Attach Image file format", "", "error");
    }
    this.fileSize = "File name " + this.fname + ", Size : " +parseFloat((this.file.size / 1000000).toFixed(5)) +"MB";

    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.base64String = e.target.result.split(",")[1];
        this.imageSource = `data:${this.file.type};base64,${this.base64String}`;
      };
    }
    return "";
  }

  public create(data: any) {
console.log("Organization Save data", data);
    data.logo = this.base64String;
    data.logoFileName = this.fname;
    let payload = {
              code: data.code,
              name: data.name,
              address: data.address,
              phoneNumber: data.phoneNumber,
              tin: data.tin,
              spCode: "",
              domainName: data.domainName,
              logo: this.base64String !== null?this.base64String:"",
              logoFileName: this.fname !== null?this.fname:"",
              organizationTypeId: data.organizationTypeId
              }
    this.setSvc.saveOrganization(payload).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else if (response.code !== 6000) {
            this.dialogRef.close(response);
        }
      },
    });
  }

  public update(data: any) {
    data.logo = this.base64String;
    data.logoFileName = this.fname;
    this.setSvc
      .updateOrganization(this.orgData.uuid, data.value)
      .subscribe({
        next: (response) => {
          if (response.code === 6000) {
            this.dialogRef.close(response);
          } else if (response.code !== 6000) {
           this.dialogRef.close(response);
          }
        },
      });
  }
}
