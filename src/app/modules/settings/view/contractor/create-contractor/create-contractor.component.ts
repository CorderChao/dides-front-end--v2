import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-create-contractor',
  templateUrl: './create-contractor.component.html',
  styleUrl: './create-contractor.component.scss'
})
export class CreateContractorComponent {
contractorForm: FormGroup;
  title: any;
  action: any;
  label: any;
  contractor: any;
  contactPeople: any[] = [];
  contractorStaff: any[] = [];
  consortiums: any[] = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];
categories: any[] = [
    { name: "KeyStaff", value: "KeyStaff" },
    { name: "Non-KeyStaff", value: "Non-KeyStaff" },
  ];
  contracts: any;
  consultants: any;
  funders: any;
 contractors: any;
packages: any;
  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateContractorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      this.contractor = data.item;
    }
  }

  ngOnInit(): void {
    this.contractorForm = this.initForm();
  }

  public fetchAllFunders() {
    this.setSvc.getAllFunders().subscribe((response) => {
      console.log("Funder", response);
      if (response.code === 6000) {
        this.funders = response.data;
      }
    });
  }

  public fetchAllContracts() {
    this.setSvc.getAllContracts().subscribe((response) => {
      console.log("Contracts", response);
      if (response.code === 6000) {
        this.contracts = response.data;
      }
    });
  }
  public fetchAllPackages() {
    this.setSvc.getAllPackages().subscribe((response) => {
      console.log("Packages", response);
      if (response.code === 6000) {
        this.packages = response.data;
      }
    });
  }
  public fetchAllConsultants() {
    this.setSvc.getAllConsultants().subscribe((response) => {
      console.log("Consultant", response);
      if (response.code === 6000) {
        this.consultants = response.data;
      }
    });
  }
  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
          name: ["", Validators.required],
          address:["", Validators.required],
          email: ["", Validators.email],
          regNumber: ["", Validators.required],
          consortium: ["", Validators.required],
          contactPeople: ["", Validators.required],
          contractorStaff: ["", Validators.required],

          pname: ["", Validators.required],
          pposition: ["", Validators.required],
          pphoneNumber: ["", Validators.required],
          pemail: ["", Validators.email],

          sposition:  ["", Validators.required],
          sname:  ["", Validators.required],
          scategory:  ["", Validators.required],
          sphone:  ["", Validators.required],
          semail:  ["", Validators.email],
      });
    } else {
      return this.fb.group({
        name: ["", Validators.required],
          address:["", Validators.required],
          email: ["", Validators.required],
          regNumber: ["", Validators.required],
          consortium: ["", Validators.required],
          contactPeople: ["", Validators.required],
          contractorStaff: ["", Validators.required],

          pname: ["", Validators.required],
          pposition: ["", Validators.required],
          pphoneNumber: ["", Validators.required],
          pemail: ["", Validators.required],

          sposition:  ["", Validators.required],
          sname:  ["", Validators.required],
          scategory:  ["", Validators.required],
          sphone:  ["", Validators.required],
          semail:  ["", Validators.required],
      });
    }
  }


  formatpPhoneNumber(event: any) {
    const value = event.target.value.replace(/\D/g, "");
    event.target.value = value;
    this.contractorForm.get("pphoneNumber").setValue(value);
  }
  formatsPhoneNumber(event: any) {
    const value = event.target.value.replace(/\D/g, "");
    event.target.value = value;
    this.contractorForm.get("sphone").setValue(value);
  }
  addPeople() {
    
    this.contactPeople.push({
      name: this.contractorForm.value.pname,
      position: this.contractorForm.value.pposition,
      phoneNumber: this.contractorForm.value.pphoneNumber,
      email: this.contractorForm.value.pemail,
    });
    console.log("contactPeople", this.contactPeople);

    this.contractorForm.get("pname").reset();
    this.contractorForm.get("pposition").reset();
    this.contractorForm.get("pphoneNumber").reset();
    this.contractorForm.get("pemail").reset();
  }
  addStaff() {
    this.contractorStaff.push({
      name: this.contractorForm.value.sname,
      position: this.contractorForm.value.sposition,
      phoneNumber: this.contractorForm.value.sphone,
      category: this.contractorForm.value.scategory,
      email: this.contractorForm.value.semail,
    });
    console.log("contactPeople", this.contactPeople);

    this.contractorForm.get("sname").reset();
    this.contractorForm.get("sposition").reset();
    this.contractorForm.get("sphone").reset();
    this.contractorForm.get("scategory").reset();
    this.contractorForm.get("semail").reset();
  }
  remove(item: any) {
    const index = this.contactPeople.indexOf(item);
    this.contactPeople.splice(index, 1);
  }


  public save(item: any) {
    console.log("DATAAA", item);
    let payload ={
          name: item.name,
          website: "",
          contactPeople: this.contactPeople,
          contractorStaff: this.contractorStaff,
          address:item.address,
          email: item.email,
          regNumber: item.regNumber,
          consortium: item.consortium
}
    console.log(" DATA TO SAVE", payload);
    if (this.action === "create") {
      this.create(payload);
    } else {
      this.update(payload);
    }
  }

  public create(data: any) {
    this.setSvc.saveContractor(data).subscribe({
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
    this.setSvc.updateConsultant(this.contractor.id, data).subscribe({
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
