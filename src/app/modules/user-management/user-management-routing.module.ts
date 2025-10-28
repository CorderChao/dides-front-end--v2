import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersAccountsComponent } from "./view/users-accounts/users-accounts.component";
import { RolesPermissionComponent } from "./view/roles-permission/roles-permission.component";
import { CreateUserAccountsComponent } from "./view/create-user-accounts/create-user-accounts.component";

const routes: Routes = 
[
  {  
    path: "users-accounts",
    component: UsersAccountsComponent,
    data: {
    parentNode: "Users Management",
    childNode: "User's Accounts",
    title: "Users Management",
    active: true,
  }
   },
   {  
    path: "create", 
    component: CreateUserAccountsComponent,
    data: {
    parentNode: "Users Management",
    childNode: "User's Accounts",
    title: "Users Management",
    active: true,
  }

   },
  {  path: "roles-permissions", component: RolesPermissionComponent,
  data: {
    parentNode: "Roles & Permissions",
    childNode: "Users Management",
    title: "Roles & Permissions",
    active: true,
  },
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
