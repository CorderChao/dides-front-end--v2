import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Feather Icon
import { allIcons } from "angular-feather/icons";
import { CountUpModule } from "ngx-countup";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { SimplebarAngularModule } from "simplebar-angular";
// Apex Chart Package
import { NgApexchartsModule } from "ng-apexcharts";
// Swiper Slider
import { SlickCarouselModule } from "ngx-slick-carousel";

// Flat Picker
import { FlatpickrModule } from "angularx-flatpickr";

//Module
import { DashboardsRoutingModule } from "./dashboards-routing.module";

// Component
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    NgbToastModule,
    CountUpModule,
    LeafletModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    SlickCarouselModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
})
export class DashboardsModule {}
