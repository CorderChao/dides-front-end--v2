import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateConfigurationTypeComponent } from "../create-configuration-type/create-configuration-type.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

import { debounceTime, distinctUntilChanged, tap } from "rxjs";
import { SettingService } from "../../../service/setting.service";
import { NotificationService } from "src/app/shared/services/notification.service";


@Component({
  selector: "app-list-of-configuration-types",
  templateUrl: "./list-of-configuration-types.component.html",
  styleUrl: "./list-of-configuration-types.component.scss",
})
export class ListOfConfigurationTypesComponent {
  confTypeForm: FormGroup;
  public listConfigTypes: any[] = [];
  public title: string;

  @Input() dataTypes: any[] = [
    { name: "Organization Type", value: "ORGANIZATION_TYPE" },
    { name: "Identity Type", value: "IDENTITY_TYPE" },
    // { name: "Asset Type", value: "ASSET_TYPE" },
     { name: "Work CategoryType", value: "WORK_CATEGORY_TYPE" },
     { name: "Measurement Unit", value: "MEASUREMENT_UNIT" },
    // { name: "Contract Type", value: "CONTRACT_TYPE" },
    //{ name: "Designation Type", value: "DESIGNATION_TYPE" },
    // { name: "Notification Media Type", value: "NOTIFICATION_MEDIA_TYPE" },
     { name: "Administration Level", value: "ADMINISTRATION_LEVEL" },
    // { name: "Measurement Type", value: "MEASUREMENT_TYPE" },
     { name: "Applicant Identity Type", value: "APPLICANT_IDENTITY_TYPE" },
    // { name: "Media Type", value: "MEDIA_T//YPE" },
    // { name: "Currency", value: "CURRENCY" },
    { name: "Applicant Identity Type", value: "APPLICANT_IDENTITY_TYPE" },
    // { name: "Media Type", value: "MEDIA_TYPE" },
     { name: "Currency", value: "CURRENCY" },
    // { name: "Council Type", value: "COUNCIL_TYPE" },
    // { name: "Payment Plan", value: "PAYMENT_PLAN" },
     { name: "User Level", value: "USER_LEVEL" },
     { name: "Role Type", value: "ROLE_TYPE" },
    // { name: "Process Status Type", value: "PROCESS_STATUS_TYPE" },
  ];
  filteredDataTypes: any[] = [];
  @Input() label: string = "Search Config Types";
  @Output() selectionChange = new EventEmitter<any>();
  searchControl = new FormControl("");
  isSearchNotEmpty = false;
 tableColumns:any;

  constructor(
    private dialog: MatDialog,
    private settingService: SettingService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
  this.title = "COMMON CONFIGURATION"
  }

  ngOnInit(): void {
    this.confTypeForm = this.formBuilder.group({
      setting_type: ["",],
    });
    this.getConfigType({ value: "ORGANIZATION_TYPE" });
    this.filteredDataTypes = this.dataTypes;
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((searchTerm) => {
          if (searchTerm) {
            this.filteredDataTypes = this.dataTypes.filter((dataType) =>
              dataType.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          } else {
            this.filteredDataTypes = this.dataTypes;
          }
        })
      )
      .subscribe(value => {
        this.isSearchNotEmpty = value.length > 0;
      });

    this.tableColumns = {
      no: "S/No",
      code: "Config Code",
      name: "Config Name",
      action: "Actions"
    }
  }

  onSearchInput(): void {
    this.isSearchNotEmpty = this.searchControl.value.length > 0;
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.isSearchNotEmpty = false;
  }


  //save modal
  create() {
     console.log("ConfigType Clicked", this.confTypeForm.get("setting_type").value);
     if(this.confTypeForm.get("setting_type").value === ''){
      Swal.fire("Sorry", "Please select Config type first", "error"); 
      }
    let item;
    this.dataTypes.forEach((data) => {
      if (data.value === this.confTypeForm.get("setting_type").value) {
        item = data;
      }
    });
console.log("Item", item);
    const data = {
      title: `Create ${item.name}`,
      label: "Save",
      action: "create",
      item: item,
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "35%";
    config.position = {
      top: "75px",
    };
    config.backdropClass = "backdropBackground";
    config.panelClass = "mat-dialog-box";
    config.backdropClass = "mat-dialog-overlay";
    const dialogRef = this.dialog.open(CreateConfigurationTypeComponent, config);
    dialogRef.afterClosed().subscribe((response) => {
    this.notificationService.determineResponse(response);
    });
  }

  // edit  modal
  edit(dataConfig: any) {
    let item;
    this.dataTypes.forEach((data) => {
      if (data.value === dataConfig.settingType) {
        item = data;
      }
    });
    const data = {
      title: `Edit  ${item.name}`,
      label: "Update",
      action: "update",
      item: item,
      dataConfig: dataConfig,
    };

    const config = new MatDialogConfig();
    config.data = data;
    config.disableClose = true;
    config.autoFocus = true;
    config.width = "35%";
    config.position = {
      top: "75px",
    };
    config.backdropClass = "backdropBackground";
    config.panelClass = "mat-dialog-box";
    config.backdropClass = "mat-dialog-overlay";
    const dialogRef = this.dialog.open(
      CreateConfigurationTypeComponent,
      config
    );
    dialogRef.afterClosed().subscribe((response) => {
      if (response.code === 6000) {
        this.confTypeForm.patchValue({
          setting_type: response.data.settingType,
        });
        // this.toastSvc.success("Information", "Updated successfully", 5000);
        this.getConfigType({ value: response.data.settingType });
      }
    });
  }

  getConfigType(configTypeName) {
    this.listConfigTypes = [];
    this.settingService.getCofigTypes(configTypeName.value).subscribe({
      next: (response) => {
        if (response.code === 6000) {
          console.log("Configuration types", response.data);
          this.listConfigTypes = response.data;
        } else if (response.code === 6004) {
          // this.toastSvc.warning("Information", "No records found", 500);
          this.listConfigTypes = [];
        } else if (response.code !== 6000 && response.code !== 6004) {
          // this.toastSvc.warning("Error", "Unable to fetch data", 5000);
          this.listConfigTypes = [];
        }
      },
    });
  }

  //delete confi record
  delete(data: any) {
    Swal.fire({
      title: `You are about to delete ${data.name}?`,
      text: "",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#1976D2",
      cancelButtonColor: "#d33000",
      cancelButtonText: "Cancel!",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.value) {
        this.settingService.deleteConfigType(data.setupUUID).subscribe({
          next: (response: any) => {
            if (response.code == 6000) {
              this.getConfigType({ value: response.data.settingType });
              // this.toastSvc.success(
              //   "Information",
              //   "Deleted successfully",
              //   5000
              // );
            } else if (response.code !== 6000) {
              // this.toastSvc.warning("Error", "Unable to delete record", 5000);
              this.listConfigTypes = [];
            }
          },
        });
      }
    });
  }
}
