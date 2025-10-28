import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGrievanceReportComponent } from './views/grievance/list-grievance-report/list-grievance-report.component';
import { ProjectProgressReportingComponent } from './views/project-progress-reporting/project-progress-reporting.component';
import { ChallengeListComponent } from './views/challenge/challenge-list/challenge-list.component';
import { DeliverableListComponent } from './views/deliverable/deliverable-list/deliverable-list.component';
import { EquipmentMobilizationListComponent } from './views/equipment-mobilization/equipment-mobilization-list/equipment-mobilization-list.component';
import { MeetingListComponent } from './views/meeting/meeting-list/meeting-list.component';
import { PhysicalProgressListComponent } from './views/physical-progress/physical-progress-list/physical-progress-list.component';
import { QualityAssuranceListComponent } from './views/quality-assurance/quality-assurance-list/quality-assurance-list.component';
import { RiskListComponent } from './views/risk/risk-list/risk-list.component';
import { SafetyIssueListComponent } from './views/safety-issue/safety-issue-list/safety-issue-list.component';
import { StaffMobilizationListComponent } from './views/staff-mobilization/staff-mobilization-list/staff-mobilization-list.component';
import { WorkProgressListComponent } from './views/work-progress/work-progress-list/work-progress-list.component';

const routes: Routes = [
  {
    path: "",
   component: ProjectProgressReportingComponent  
   },
  {
    path: ":id/grievances",
   component: ListGrievanceReportComponent  
   },
   {
    path: ":id/challenge",
   component: ChallengeListComponent  
   },
   {
    path: ":id/deliverable",
   component: DeliverableListComponent  
   },
   {
    path: ":id/equipment-mobilization",
   component: EquipmentMobilizationListComponent  
   },
   {
    path: ":id/material-mobilization",
   component: EquipmentMobilizationListComponent  
   },
   {
    path: ":id/meeting",
   component: MeetingListComponent  
   },
   {
    path: ":id/physical-progress",
   component: PhysicalProgressListComponent  
   },
   {
    path: ":id/risk",
   component: RiskListComponent  
   },
   {
    path: ":id/safety-issue",
   component: SafetyIssueListComponent  
   },
   {
    path: ":id/staff-mobilization",
   component: StaffMobilizationListComponent  
   },
   {
    path: ":id/work-progress",
   component: WorkProgressListComponent  
   },
   {
    path: ":id/quality-assurance",
   component: QualityAssuranceListComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProgessReportsRoutingModule { }
