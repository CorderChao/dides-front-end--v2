import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SettingService } from "src/app/modules/settings/service/setting.service";
import { DynamicForm } from "src/app/shared/components/dynamic-form/dynamic-form.model";
import { NotificationService } from "src/app/shared/services/notification.service";
import Swal from "sweetalert2";
import * as moment from "moment";


@Component({
  selector: "app-create-package",
  templateUrl: "./create-package.component.html",
  styleUrl: "./create-package.component.scss",
})
export class CreatePackageComponent {
  packageForm: FormGroup;
  title: any;
  action: any;
  label: any;
  public package: any;
public packageList:any[]=[];
  public projectPackages: any[] = [];
  public councilSelected: any[] = [];
  councilCodes: any[] = [];
public projects:any[] =[];
public consultants: any[] =[];
  councils: any;
  regions: any;
  sponsors: any;
  selected: any;
  contractors: any;

  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreatePackageComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      console.log("Passed Package", data.package);
      this.package = data?.package;
    }
  }

  ngOnInit(): void {
    this.fetchAllRegions();
    // this.fetchAllProjects();
    this.fetchAllConsultants();
    this.fetchAllContractors();
    this.packageForm = this.initForm();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
        projectId: ["", Validators.required],
        name: ["", Validators.required],
        description: ["", Validators.required],
        councilsCodes: ["", Validators.required],
        commencementDate: ["", Validators.required],
        period: ["", Validators.required],
        completionDate: ["", Validators.required],
        consultantId: ["",],
        contactorId: ["", Validators.required],
      });
    } else {
      return this.fb.group({
        projectId: [this.package?.projectId, Validators.required],
        name: [this.package?.name, Validators.required],
        description: [this.package?.description, Validators.required],
        councilsCodes: [this.package?.council?.code, Validators.required],
        commencementDate: [this.package?.commencementDate, Validators.required],
        period: [this.package?.period, Validators.required],
        completionDate: [this.package?.completionDate, Validators.required],
        consultantId: [this.package?.consultantId, Validators.required],
        contactorId: [this.package?.contactorName, Validators.required],
      });
    }
  }

  public fetchAllRegions() {
    this.setSvc.getAllRegions().subscribe((response) => {
      if (response.code === 6000) {
        this.regions = response.data;
      }
    });
  }
  public fetchAllContractors() {
    this.setSvc.getAllContractors().subscribe((response) => {
      console.log("Contractors", response);
      if (response.code === 6000) {
        this.contractors = response.data;
      }
    });
  }
  public fetchAllConsultants() {
    this.setSvc.getAllConsultants().subscribe((response) => {
      if (response.code === 6000) {
        this.consultants = response.data;
         console.log("Consultants", this.consultants);
      }
    });
  }
  // public fetchAllProjects() {
  //   this.setSvc.getAllProjects().subscribe((response) => {
  //     if (response.code === 6000) {
  //       this.projects = response.data;
  //     }
  //   });
  // }
  onRegionChange(region: any) {
    this.setSvc.getAllCouncils(region.uuid).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.councils = response.data;
          console.log("councilsss", this.councils);
        }
      },
    });
  }
  onCouncilChange(council: any) {
    this.setSvc.getAllProjectByCouncilCode(council.code).subscribe({
      next: (response) => {
        if (response.code === 6000) {
           this.projects = response.data;
          console.log("Projects", this.projects);
        }
      },
    });
  }
  addPackage() {

    for (let i = 0; i < this.packageList.length; i++) {
      if (this.packageForm.value.name === this.packageList[i].name) {
        return Swal.fire("Sorry!", "Package already Selected", "error");
      }
    }
    this.packageList.push({
      name:this.packageForm.value.name,
      description: this.packageForm.value.description,
      commencementDate: moment(this.packageForm.value.commencementDate).format("DD-MM-YYYY"),
      period: this.packageForm.value.period,
      completionDate: moment(this.packageForm.value.completionDate).format("DD-MM-YYYY"),
      consultantId: this.packageForm.value.consultantId,
      contactorId: this.packageForm.value.contactorId,
      });
   console.log("Package cacreated", this.packageList);

   this.packageForm.get("name").reset();
   this.packageForm.get("description").reset();
   this.packageForm.get("description").reset();
   this.packageForm.get("period").reset();
   this.packageForm.get("completionDate").reset();
   this.packageForm.get("consultantId").reset();
   this.packageForm.get("contactorId").reset();

  }

  removePackage(item: any) {
    const index = this.packageList.indexOf(item);
    this.packageList.splice(index, 1);
  }

  public save(data: any) {
    for (let i = 0; i < this.packageList.length; i++) {
      this.projectPackages.push({
      name:this.packageList[i].name,
      description: this.packageList[i].description,
      commencementDate: this.packageList[i].commencementDate,
      period: this.packageList[i].period,
      completionDate: this.packageList[i].completionDate,
      consultantId: this.packageList[i].consultantId.id,
      contactorId: this.packageList[i].contactorId,
      });
    }

    let payload = {
     councilsCode:data.councilsCodes,
     projectId: data.projectId,
     projectPackage: this.projectPackages
    };

    console.log("Payload to save", payload);

    if (this.action === "create") {
      this.create(payload);
    } else {
      this.update(payload);
    }
  }

  public create(data: any) {
    this.setSvc.savePackage(data).subscribe({
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
    this.setSvc.updatePackage(this.package.id, data).subscribe({
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


