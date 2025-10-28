import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '../../../service/setting.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrl: './create-contract.component.scss'
})
export class CreateContractComponent {
 contractForm: FormGroup;
  title: any;
  action: any;
  label: any;
  contract: any;
  contactPeople: any[] = [];
contractTypes: any[] = [];
  consortiums: any[] = [
    { name: "Yes", value: true },
    { name: "No", value: false },
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
    public dialogRef: MatDialogRef<CreateContractComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      this.contract = data.item;
    }
  }

  ngOnInit(): void {
this.fetchAllFunders();
this.fetchAllPackages();
this.fetchAllConsultants();
this.fetchAllContracts();
this.fetchAllContractors();
this.fetchAllContractTypes();
    this.contractForm = this.initForm();
  }

  public fetchAllFunders() {
    this.setSvc.getAllFunders().subscribe((response) => {
      console.log("Funder", response);
      if (response.code === 6000) {
        this.funders = response.data;
      }
    });
  }
  public fetchAllContractTypes() {
    this.setSvc.getAllContractTypes().subscribe((response) => {
      console.log("ContractTypes", response);
      if (response.code === 6000) {
        this.contractTypes = response.data;
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
  public fetchAllContractors() {
    this.setSvc.getAllContractors().subscribe((response) => {
      console.log("Contracts", response);
      if (response.code === 6000) {
        this.contractors = response.data;
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
          contractNumber: ["", Validators.required],
          revisedContractSum: ["", Validators.required],
          commencementDate:  ["", Validators.required],
          originalCompletionDate:["", Validators.required],
          endOfDefectLiabilityPeriod: ["", Validators.required],
          funderId: ["", Validators.required],
          consultantId: ["", Validators.required],
          contractorId:["", Validators.required],
          contractTypeId: ["", Validators.required],
          contractPeriod: ["", Validators.required],
          projectPackageId: ["", Validators.required],
      });
    } else {
      return this.fb.group({
          name: [this.contract.name, Validators.required],
          contractNumber: [this.contract.contractNumber, Validators.required],
          revisedContractSum: [this.contract.revisedContractSum, Validators.required],
          commencementDate:  [this.contract.commencementDate,Validators.required],
          originalCompletionDate:[this.contract.originalCompletionDate, Validators.required],
          endOfDefectLiabilityPeriod: [this.contract.endOfDefectLiabilityPeriod, Validators.required],
          funderId: [this.contract.funderId, Validators.required],
          consultantId: [this.contract.consultantId, Validators.required],
          contractorId:[this.contract.contractorId, Validators.required],
          contractTypeId: [this.contract.contractTypeId, Validators.required],
          contractPeriod: [this.contract.contractPeriod, Validators.required],
          projectPackageId: [this.contract.projectPackageId, Validators.required],
      });
    }
  }



  public save(item: any) {
    console.log("DATAAA", item);
    let payload = {
          name: item.name,
          contractNumber: item.contractNumber,
          revisedContractSum: item.revisedContractSum,
          commencementDate:  moment(item.commencementDate).format("DD-MM-YYYY"),
          originalCompletionDate: moment(item.originalCompletionDate).format("DD-MM-YYYY"),
          endOfDefectLiabilityPeriod: moment(item.endOfDefectLiabilityPeriod).format("DD-MM-YYYY"),
          funderId: item.funderId,
          consultantId: item.consultantId,
          contractorId:item.contractorId,
          contractTypeId: item.contractTypeId,
          contractPeriod: item.contractPeriod,
          projectPackageId: item.projectPackageId,
}
    console.log(" DATA TO SAVE", payload);
    if (this.action === "create") {
      this.create(payload);
    } else {
      this.update(payload);
    }
  }

  public create(data: any) {
    this.setSvc.saveContract(data).subscribe({
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
    // this.setSvc.updateConsultant(this.consultant.id, data).subscribe({
    //   next: (response) => {
    //     if (response.code === 6000) {
    //       this.dialogRef.close(response);
    //     } else {
    //       this.dialogRef.close(response);
    //     }
    //   },
    // });
  }
}
