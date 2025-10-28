import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectComponent } from './views/project/list-project/list-project.component';
import { ListPackageComponent } from './views/package/list-package/list-package.component';
import { ListSubProjectComponent } from './views/sub-project/list-sub-project/list-sub-project.component';

const routes: Routes = [
  {
    path: "",
    component: ListProjectComponent,
  },
  {
    path: ":id/packages",
    component: ListPackageComponent,
  },
  {
    path: ":id/sub-projects",
    component: ListSubProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
