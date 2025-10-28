import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SettingService } from "../../../service/setting.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: "app-create-consultant",
  templateUrl: "./create-consultant.component.html",
  styleUrl: "./create-consultant.component.scss",
})
export class CreateConsultantComponent {
  consultantForm: FormGroup;
  title: any;
  action: any;
  label: any;
  consultant: any;
  contactPeople: any[] = [];
  consortiums: any[] = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];
  base64Image: any;
  public imageSource: string;
  file: any;
  fileSize: string;
  fname: string;

  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateConsultantComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      this.consultant = data.item;
    }
  }

  ngOnInit(): void {
    this.consultantForm = this.initForm();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
        name: ["", Validators.required],
        website: ["", Validators.required],
        regNumber: ["", Validators.required],
        consortium: ["", Validators.required],
        email: ["", Validators.email],
        address: ["", Validators.required],

        pname: ["", Validators.required],
        pphoneNumber: ["", Validators.required],
        pemail: ["", Validators.email],
        pposition: ["", Validators.required],
      });
    } else {
      return this.fb.group({
        name: [this.consultant.name, Validators.required],
        acronym: [this.consultant.acronym, Validators.required],
      });
    }
  }

  formatPhoneNumber(event: any) {
    const value = event.target.value.replace(/\D/g, "");
    event.target.value = value;
    this.consultantForm.get("pphoneNumber").setValue(value);
  }


  addFile(event) {
    this.file = <File>event.target.files[0];
    this.fname = event.target.files[0].name;
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validImageTypes.includes(this.file.type)) {
      return Swal.fire("Please Attach Image!", "", "error");
    }
    this.fileSize ="File name " +this.fname + ", Size : " +parseFloat((this.file.size / 1000000).toFixed(5)) +"MB";

    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.base64Image = e.target.result.split(",")[1];
        //this.imageSource = `data:${this.file.type};base64,${this.base64String}`;
      };
    }
    return "";
  }



  add() {
    this.contactPeople.push({
      name: this.consultantForm.value.pname,
      position: this.consultantForm.value.pposition,
      phoneNumber: this.consultantForm.value.pphoneNumber,
      email: this.consultantForm.value.pemail,
    });
    console.log("contactPeople", this.contactPeople);

    this.consultantForm.get("pname").reset();
    this.consultantForm.get("pposition").reset();
    this.consultantForm.get("pphoneNumber").reset();
    this.consultantForm.get("pemail").reset();
  }
  remove(item: any) {
    const index = this.contactPeople.indexOf(item);
    this.contactPeople.splice(index, 1);
  }

  public save(data: any) {
    console.log("DATAAA", data);
    let payload = {
      name: data.name,
      website: data.website,
      contactPeople: this.contactPeople,
      base64Image: this.base64Image,
      address: data.address,
      email: data.email,
      regNumber: data.regNumber,
      consortium: data.consortium,
    };
    console.log(" DATA TO SAVE", payload);
    if (this.action === "create") {
      this.create(payload);
    } else {
      this.update(payload);
    }
  }

  public create(data: any) {
    this.setSvc.saveConsultant(data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          this.dialogRef.close(response);
        }
      },
    });
  }

  public update(data: any) {
    this.setSvc.updateConsultant(this.consultant.id, data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          this.dialogRef.close(response);
        }
      },
    });
  }
}
