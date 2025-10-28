import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { NgxSliderModule } from "ngx-slider-v2";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { ColorPickerModule } from "ngx-color-picker";
import { UiSwitchModule } from "ngx-ui-switch";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import {
  NgbNavModule,
  NgbAccordionModule,
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbToastModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbTooltipModule,
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbCarousel,
  NgbSlide,
  NgbNav,
} from "@ng-bootstrap/ng-bootstrap";

// Swiper Slider
import { SlickCarouselModule } from "ngx-slick-carousel";

// Counter
import { CountUpModule } from "ngx-countup";

import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgApexchartsModule } from "ng-apexcharts";
import { LightboxModule } from "ngx-lightbox";
import { SimplebarAngularModule } from "simplebar-angular";
import { NgPipesModule } from "ngx-pipes";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { NgStepperModule } from "angular-ng-stepper";
import { MaterialModule } from "./material/material.module";
import { DialogPageHeaderComponent } from "./components/dialog-page-header/dialog-page-header.component";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { HeadingsComponent } from "./components/headings/headings.component";
import { ButtonComponent } from "./components/button/button.component";
import { DataTableComponent } from "./components/data-table/data-table.component";
import { ActionsButtonComponent } from "./components/actions-button/actions-button.component";
import { ActionsMenuComponent } from "./components/actions-menu/actions-menu.component";
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { DataTableWithSelectableColumnsComponent } from "./components/data-table-with-selectable-columns/data-table-with-selectable-columns.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NativeDateAdapter } from "@angular/material/core";
import { SearchPipe } from "./pipes/search.pipe";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ViewAttachmentsComponent } from "./components/view-attachments/view-attachments.component";
import { SafeResourcePipe } from "./pipes/safe-resource.pipe";
import { MapComponent } from './components/map/map.component';
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  declarations: [
    HeadingsComponent,
    ButtonComponent,
    DataTableComponent,
    ActionsButtonComponent,
    ActionsMenuComponent,
    DataTableWithSelectableColumnsComponent,
    ViewAttachmentsComponent,
    SafeResourcePipe,
    MapComponent
  ],
  imports: [
    SearchPipe,
    CommonModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,
    CountUpModule,
    FormsModule,
    NgbToastModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    NgApexchartsModule,
    LeafletModule,
    SimplebarAngularModule,
    LightboxModule,
    NgPipesModule,
    SafeHtmlPipe,
    NgbPaginationModule,
    ScrollToModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    UiSwitchModule,
    FlatpickrModule,
    ColorPickerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxSliderModule,
    CdkStepperModule,
    NgStepperModule,
    CKEditorModule,
    AutocompleteLibModule,
    DropzoneModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    MaterialModule,
    DialogPageHeaderComponent,
    DynamicFormComponent,
    RouterLink,
    NgbCarousel,
    NgbSlide,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatChipsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    NgbNavModule,
    NgbTooltipModule,
    NgSelectModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    MaterialModule,
    SafeHtmlPipe,
    DialogPageHeaderComponent,
    DynamicFormComponent,
    HeadingsComponent,
    ButtonComponent,
    DataTableComponent,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    ActionsButtonComponent,
    ActionsMenuComponent,
    RouterLink,
    NgbCarousel,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NgbSlide,
    MatDatepickerModule,
    SearchPipe,
    DataTableWithSelectableColumnsComponent,
    NgbNav,
    MatProgressBarModule
,  ],
  providers: [DatePipe, NativeDateAdapter,SafeResourcePipe],
})
export class SharedModule {}
