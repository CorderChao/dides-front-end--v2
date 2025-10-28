import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { ReportsComponent } from "./reports.component";
import { ReportsRoutingModule } from "./reports-routing.module";

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, SharedModule, ReportsRoutingModule],
})
export class ReportsModule {}
