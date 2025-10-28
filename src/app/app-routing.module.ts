import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './modules/user-management/guards/auth.guard'

// Auth
import { LayoutComponent } from "./shared/layouts/layout.component";
import { LoginComponent } from "./modules/user-management/view/login/login.component";
import { MapComponent } from "./shared/components/map/map.component";



const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    children: [
      { path: "login", component: LoginComponent },
    ],
  },
  {
    path: "map",
    component: LayoutComponent,
    children: [
      { path: "", component: MapComponent},
    ],
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "projects",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/projects/projects.module").then((m) => m.ProjectsModule),
  },
  {
    path: "reports",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/reports/reports.module").then((m) => m.ReportsModule),
  },
  {
    path: "settings",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/settings/settings.module").then(
        (m) => m.SettingsModule,
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./pages/account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "users",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/user-management/user-management.module").then(
        (m) => m.UserManagementModule,
      ),
  },
  {
    path: ":id/project-progress-reporting",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/project-progess-reports/project-progess-reports.module").then(
        (m) => m.ProjectProgessReportsModule,
      ),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
