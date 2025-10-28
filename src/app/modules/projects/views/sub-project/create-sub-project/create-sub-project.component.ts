import { Component, Inject, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { NotificationService } from "src/app/shared/services/notification.service";
import { SettingService } from "src/app/modules/settings/service/setting.service";
import { MatStepper } from "@angular/material/stepper";
import { ProjectService } from "../../../services/project.service";

@Component({
  selector: "app-create-sub-project",
  templateUrl: "./create-sub-project.component.html",
  styleUrl: "./create-sub-project.component.scss",
})
export class CreateSubProjectComponent {
  subProjectform: FormGroup;
  itemForm: FormGroup;
  title: any;
  action: any;
  label: any;
  public subProject: any;
  public subProjectItems: any[] = [];
  public projectSubComponentItems: any[] = [];
  public isLinear: boolean = true;
  councilCodes: any[] = [];
  categories: any;
  measurements: any;
  packages: any;
  councils: any;
  regions: any;
  sponsors: any;
  selected: any;
  @ViewChild("stepper", { static: true })
  stepper: MatStepper;
  dataOne: any;

  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateSubProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {


    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
      console.log("Passed Sub-Project", data.item);
      this.subProject = data.item;
    }
  }

  ngOnInit(): void {
this.fetchAllRegions();
    this.fetchAllWorkCategory();
    this.fetchAllMeasurementType();
    this.subProjectform = this.initForm();
    this.itemForm = this.initForm2();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
        region: ['', Validators.required],
        council: ['', Validators.required],
        name: ["", Validators.required],
        amount: ["", Validators.required],
        weight: ["", Validators.required],
        workCategoryTypeId: ["", Validators.required],
        lengthOrQuantity: ["", Validators.required],
        measurementUnitId: ["", Validators.required],
        projectPackageId: ["", Validators.required],
      });
    } else {
      return this.fb.group({
        region: ['', Validators.required],
        council: ['', Validators.required],
        name: ["", Validators.required],
        amount: ["", Validators.required],
        weight: ["", Validators.required],
        workCategoryTypeId: ["", Validators.required],
        lengthOrQuantity: ["", Validators.required],
        measurementUnitId: ["", Validators.required],
        projectPackageId: ["", Validators.required],
      });
    }
  }

  private initForm2(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
        name: ["", Validators.required],
        requiredQuantity: ["", Validators.required],
        quantityProgress: ["", Validators.required],
        measurementUnitId: ["", Validators.required],
      });
    }else{
      return this.fb.group({
        name: ["", Validators.required],
        requiredQuantity: ["", Validators.required],
        quantityProgress: ["", Validators.required],
        measurementUnitId: ["", Validators.required],
      });
}
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper, item:any) {
   this.dataOne = item;
    stepper.next();
  }

  public fetchAllWorkCategory() {
    this.setSvc.getCofigTypes("WORK_CATEGORY_TYPE").subscribe((response) => {
      if (response.code === 6000) {
        this.categories = response.data;
      }
    });
  }

  public fetchAllMeasurementType() {
    this.setSvc.getCofigTypes("MEASUREMENT_UNIT").subscribe((response) => {
      if (response.code === 6000) {
        this.measurements = response.data;
      }
    });
  }
  public fetchAllRegions() {
    this.setSvc.getAllRegions().subscribe((response) => {
      if (response.code === 6000) {
        this.regions = response.data;
      }
    });
  }

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
  onCouncilChange(code: any) {
  
    this.setSvc.getAllProjectByCouncilCode(code).subscribe({
      next: (response) => {
        if (response.code === 6000) {
            this.packages = response.data;
          console.log("Projects", this.packages);
        }
      },
    });
  }


addItem(item:any){
      this.subProjectItems.push(
      {   
        name: item.name,
        requiredQuantity: item.requiredQuantity,
        quantityProgress: item.quantityProgress,
        measurementUnitId: item.measurementUnitId,
      });
   console.log("subProjectItems Pusheeed!!", this.subProjectItems);
    }



  removeItem(item: any) {
    const index = this.subProjectItems.indexOf(item);
    this.subProjectItems.splice(index, 1);
  }

  public save() {
    for (let i = 0; i < this.subProjectItems.length; i++) {
      this.projectSubComponentItems.push({
        name: this.subProjectItems[i].name,
        requiredQuantity: this.subProjectItems[i].requiredQuantity,
        quantityProgress: this.subProjectItems[i].quantityProgress,
        measurementUnitId: this.subProjectItems[i].measurementUnitId.setupUUID,
});
    }

    let payload = {
      name: this.dataOne.name,
      amount: this.dataOne.amount,
      weight: this.dataOne.weight,
      workCategoryTypeId: this.dataOne.workCategoryTypeId,
      lengthOrQuantity: this.dataOne.lengthOrQuantity,
      measurementUnitId: this.dataOne.measurementUnitId,
      projectPackageId: this.dataOne.projectPackageId,
      projectSubComponentItems: this.projectSubComponentItems,
    };

    console.log("Payload to save", payload);

    if (this.action === "create") {
      this.create(payload);
    } else {
      this.update(payload);
    }
  }

  public create(data: any) {
    this.setSvc.saveSubProject(data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          // this.dialogRef.close(response);
        }
      },
    });
  }

  public update(data: any) {
    // this.setSvc.updateProject(this.project.id, data).subscribe({
    //   next: (response) => {
    //     if (response.code === 6000) {
    //       this.dialogRef.close(response);
    //     } else {
    //       // this.dialogRef.close(response);
    //     }
    //   },
    // });
  }
}
