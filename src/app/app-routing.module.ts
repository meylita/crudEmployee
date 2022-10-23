import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'employee-create',
    component: EmployeeCreateComponent
  },
  {
    path: 'employee-update/:productId',
    component: EmployeeEditComponent
  },
  {
    path: 'employee-detail/:productId',
    component: EmployeeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
