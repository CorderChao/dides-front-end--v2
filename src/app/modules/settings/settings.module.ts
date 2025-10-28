import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './view/settings/settings.component';
import { DesignationSettingComponent } from './view/designation-setting/designation-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateDesignationComponent } from './view/designation-setting/create-designation/create-designation.component';
import { ListOrganizationComponent } from './view/organization/list-organization/list-organization.component';
import { CreateOrganizationComponent } from './view/organization/create-organization/create-organization.component';
import { ListOfConfigurationTypesComponent } from './view/configuration-types/list-of-configuration-types/list-of-configuration-types.component';
import { CreateConfigurationTypeComponent } from './view/configuration-types/create-configuration-type/create-configuration-type.component';
import { ListFunderComponent } from './view/funder/list-funder/list-funder.component';
import { CreateFunderComponent } from './view/funder/create-funder/create-funder.component';
import { ListConsultantComponent } from './view/consultant/list-consultant/list-consultant.component';
import { CreateConsultantComponent } from './view/consultant/create-consultant/create-consultant.component';
import { ListContractComponent } from './view/contract/list-contract/list-contract.component';
import { CreateContractComponent } from './view/contract/create-contract/create-contract.component';
import { ListContractorComponent } from './view/contractor/list-contractor/list-contractor.component';
import { CreateContractorComponent } from './view/contractor/create-contractor/create-contractor.component';
import { ListContractTypeComponent } from './view/contractType/list-contract-type/list-contract-type.component';
import { CreateContractTypeComponent } from './view/contractType/create-contract-type/create-contract-type.component';

@NgModule({
  declarations: [
    CreateDesignationComponent,
    DesignationSettingComponent,
    SettingsComponent,
    ListOrganizationComponent,
    CreateOrganizationComponent,
    ListOfConfigurationTypesComponent,
    CreateConfigurationTypeComponent,
    ListFunderComponent,
    CreateFunderComponent,
    ListConsultantComponent,
    CreateConsultantComponent,
    ListContractComponent,
    CreateContractComponent,
    ListContractorComponent,
    CreateContractorComponent,
    ListContractTypeComponent,
    CreateContractTypeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
  ]
})
export class SettingsModule { }
