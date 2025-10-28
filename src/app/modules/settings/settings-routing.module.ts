import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./view/settings/settings.component";
import { DesignationSettingComponent } from "./view/designation-setting/designation-setting.component";
import { ListOrganizationComponent } from "./view/organization/list-organization/list-organization.component";
import { ListOfConfigurationTypesComponent } from "./view/configuration-types/list-of-configuration-types/list-of-configuration-types.component";
import { ListFunderComponent } from "./view/funder/list-funder/list-funder.component";
import { ListConsultantComponent } from "./view/consultant/list-consultant/list-consultant.component";
import { ListContractComponent } from "./view/contract/list-contract/list-contract.component";
import { ListContractorComponent } from "./view/contractor/list-contractor/list-contractor.component";
import { ListContractTypeComponent } from "./view/contractType/list-contract-type/list-contract-type.component";

const routes: Routes = [
  {
    path: "",
    data: {
      parentNode: "System Settings",
      childNode: "System Settings",
      title: "System Settings",
      active: true,
    },
    component: SettingsComponent,
  },
  {
    path: "funder",
    component: ListFunderComponent,
    data: {
      parentNode: "System Settings",
      childNode: "Funder",
      title: "System Settings",
      active: true,
    },
  },
  {
    path: "consultant",
    component: ListConsultantComponent,
    data: {
      parentNode: "System Settings",
      childNode: "Consultant",
      title: "System Settings",
      active: true,
    },
  },
  {
    path: "contract",
    component: ListContractComponent,
    data: {
      parentNode: "System Settings",
      childNode: "Contracts",
      title: "System Settings",
      active: true,
    },
  },
  {
    path: "contractor",
    component: ListContractorComponent,
    data: {
      parentNode: "System Settings",
      childNode: "Contractor",
      title: "System Settings",
      active: true,
    },
  },
  {
    path: "contractType",
    component: ListContractTypeComponent,
    data: {
      parentNode: "System Settings",
      childNode: "ContractType",
      title: "System Settings",
      active: true,
    },
  },
  {
    path: "organization",
    component: ListOrganizationComponent,
    data: {
      parentNode: "System Settings",
      childNode: "Organizations",
      title: "System Settings",
      active: true,
    },
  },
  {
    path: "configuration",
    component: ListOfConfigurationTypesComponent,
    data: {
      parentNode: "System Settings",
      childNode: "Common Configuration",
      title: "System Settings",
      active: true,
    },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
