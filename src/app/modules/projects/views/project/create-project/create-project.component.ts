import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { NotificationService } from "src/app/shared/services/notification.service";
import { SettingService } from "src/app/modules/settings/service/setting.service";

@Component({
  selector: "app-create-project",
  templateUrl: "./create-project.component.html",
  styleUrl: "./create-project.component.scss",
})
export class CreateProjectComponent {
  projectForm: FormGroup;
  title: any;
  action: any;
  label: any;
  public project: any;
  public organizationLists: any[] = [];
  public councilSelected: any[] = [];
  councilCodes: any[] = [];
  councils: any;
  regions: any;
  sponsors: any;
  selected: any;

  constructor(
    public fb: FormBuilder,
    public setSvc: SettingService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.label = this.data?.label;
    if (this.action === "update") {
     console.log("Passed Project", data.item);
      this.project = data.item;
    }
  }

  ngOnInit(): void {
    this.fetchAllRegions();
    this.fetchAllSponsors();
    this.projectForm = this.initForm();
  }

  private initForm(): FormGroup {
    if (this.action === "create") {
      return this.fb.group({
        name: ["", Validators.required],
        region: ["", Validators.required],
        councilsCodes: ["", Validators.required],
        projectSponsorId: ["", Validators.required],
        duration: ["", Validators.required],
      });
    } else {
      return this.fb.group({
        name: [this.project?.name, Validators.required],
        region: [this.project?.council?.region?.code, Validators.required],
        councilsCodes: [this.project?.council?.code, Validators.required],
        projectSponsorId: [this.project?.projectSponsorId, Validators.required],
        duration: [this.project?.duration, Validators.required],
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

  public fetchAllSponsors() {
    this.setSvc.getAllFunders().subscribe((response) => {
      if (response.code === 6000) {
        this.sponsors = response.data;
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

  onCouncilChange(item: any) {
    for (let i = 0; i < this.councilSelected.length; i++) {
      if (item.name === this.councilSelected[i].name) {
        return Swal.fire("Sorry!", "Council already Selected", "error");
      }
    }
    this.councilSelected.push(item);
  }

  removeCouncil(item: any) {
    const index = this.councilSelected.indexOf(item);
    this.councilSelected.splice(index, 1);
  }

  public save(data: any) {


    for (let i = 0; i < this.councilSelected.length; i++) {
      this.councilCodes.push(this.councilSelected[i].code);
    }

    let payload = {
      name: data.name,
      councilsCodes: this.councilCodes,
      projectSponsorId: data.projectSponsorId,
      duration: data.duration,
    };

   console.log("Payload to save", payload);

    if (this.action === "create") {
      this.create(payload);
    } else {
      this.update(payload);
    }
  }

  public create(data: any) {
    this.setSvc.saveProject(data).subscribe({
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
    this.setSvc.updateProject(this.project.id, data).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          this.dialogRef.close(response);
        } else {
          // this.dialogRef.close(response);
        }
      },
    });
  }
}
