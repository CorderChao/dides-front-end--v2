import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbDropdownModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { SimplebarAngularModule } from "simplebar-angular";
import { TranslateModule } from "@ngx-translate/core";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";

// Component pages
import { LayoutComponent } from "./layout.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { VerticalComponent } from "./vertical/vertical.component";
import { FooterComponent } from "./footer/footer.component";
import { BreadcrumbsComponent } from "../../shared/components/breadcrumbs/breadcrumbs.component";
import { LanguageService } from "../services/language.service";

@NgModule({
  declarations: [
    LayoutComponent,
    VerticalComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    TranslateModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [LanguageService],
})
export class LayoutsModule {}
