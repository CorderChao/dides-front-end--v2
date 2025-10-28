import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateGrievanceReportComponent } from './views/grievance/create-grievance-report/create-grievance-report.component';
import { ListGrievanceReportComponent } from './views/grievance/list-grievance-report/list-grievance-report.component';
import { InitializeReportComponent } from './views/initialize-report/initialize-report.component';
import { ProjectProgressReportingComponent } from './views/project-progress-reporting/project-progress-reporting.component';
import { AddReportComponent } from './views/add-report/add-report.component';
import { ProjectProgessReportsRoutingModule } from './project-progess-routing.module';
import { WorkProgressCreateComponent } from './views/work-progress/work-progress-create/work-progress-create.component';
import { WorkProgressListComponent } from './views/work-progress/work-progress-list/work-progress-list.component';
import { StaffMobilizationListComponent } from './views/staff-mobilization/staff-mobilization-list/staff-mobilization-list.component';
import { StaffMobilizationCreateComponent } from './views/staff-mobilization/staff-mobilization-create/staff-mobilization-create.component';
import { RiskCreateComponent } from './views/risk/risk-create/risk-create.component';
import { RiskListComponent } from './views/risk/risk-list/risk-list.component';
import { QualityAssuranceListComponent } from './views/quality-assurance/quality-assurance-list/quality-assurance-list.component';
import { QualityAssuranceCreateComponent } from './views/quality-assurance/quality-assurance-create/quality-assurance-create.component';
import { PhysicalProgressCreateComponent } from './views/physical-progress/physical-progress-create/physical-progress-create.component';
import { PhysicalProgressListComponent } from './views/physical-progress/physical-progress-list/physical-progress-list.component';
import { MeetingListComponent } from './views/meeting/meeting-list/meeting-list.component';
import { MeetingCreateComponent } from './views/meeting/meeting-create/meeting-create.component';
import { MaterialMobilizationListComponent } from './views/material-mobilization/material-mobilization-list/material-mobilization-list.component';
import { MaterialMobilizationCreateComponent } from './views/material-mobilization/material-mobilization-create/material-mobilization-create.component';
import { EquipmentMobilizationListComponent } from './views/equipment-mobilization/equipment-mobilization-list/equipment-mobilization-list.component';
import { EquipmentMobilizationCreateComponent } from './views/equipment-mobilization/equipment-mobilization-create/equipment-mobilization-create.component';
import { DeliverableListComponent } from './views/deliverable/deliverable-list/deliverable-list.component';
import { DeliverableCreateComponent } from './views/deliverable/deliverable-create/deliverable-create.component';
import { ChallengeListComponent } from './views/challenge/challenge-list/challenge-list.component';
import { ChallengeCreateComponent } from './views/challenge/challenge-create/challenge-create.component';
import { SafetyIssueCreateComponent } from './views/safety-issue/safety-issue-create/safety-issue-create.component';
import { SafetyIssueListComponent } from './views/safety-issue/safety-issue-list/safety-issue-list.component';



@NgModule({
  declarations: [
    ListGrievanceReportComponent,
    CreateGrievanceReportComponent,
    InitializeReportComponent,
    ProjectProgressReportingComponent,
    AddReportComponent,
    WorkProgressCreateComponent,
    WorkProgressListComponent,
    StaffMobilizationListComponent,
    StaffMobilizationCreateComponent,
    RiskCreateComponent,
    RiskListComponent,
    QualityAssuranceListComponent,
    QualityAssuranceCreateComponent,
    PhysicalProgressCreateComponent,
    PhysicalProgressListComponent,
    MeetingListComponent,
    MeetingCreateComponent,
    MaterialMobilizationListComponent,
    MaterialMobilizationCreateComponent,
    EquipmentMobilizationListComponent,
    EquipmentMobilizationCreateComponent,
    DeliverableListComponent,
    DeliverableCreateComponent,
    ChallengeListComponent,
    ChallengeCreateComponent,
    SafetyIssueCreateComponent,
    SafetyIssueListComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectProgessReportsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectProgessReportsModule { }
