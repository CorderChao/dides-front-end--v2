import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ListProjectComponent } from './views/project/list-project/list-project.component';
import { CreateProjectComponent } from './views/project/create-project/create-project.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListPackageComponent } from './views/package/list-package/list-package.component';
import { CreatePackageComponent } from './views/package/create-package/create-package.component';
import { ListSubProjectComponent } from './views/sub-project/list-sub-project/list-sub-project.component';
import { CreateSubProjectComponent } from './views/sub-project/create-sub-project/create-sub-project.component';


@NgModule({
  declarations: [
    ListProjectComponent,
    CreateProjectComponent,
    ListPackageComponent,
    CreatePackageComponent,
    ListSubProjectComponent,
    CreateSubProjectComponent,
],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
