import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { RolesPermissionComponent } from './view/roles-permission/roles-permission.component';
import { UsersAccountsComponent } from './view/users-accounts/users-accounts.component';
import { CreateRoleComponent } from "./view/create-role/create-role.component";
import { CreateAgentStaffComponent } from './view/create-agent-staff/create-agent-staff.component';
import { ChangeDefaultPasswordComponent } from "./view/change-default-password/change-default-password.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CreateUserAccountsComponent } from './view/create-user-accounts/create-user-accounts.component';



@NgModule({
  declarations: [
    UsersAccountsComponent,
    ChangeDefaultPasswordComponent,
    CreateAgentStaffComponent,
     RolesPermissionComponent,
     CreateRoleComponent,
     CreateUserAccountsComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class UserManagementModule {}
