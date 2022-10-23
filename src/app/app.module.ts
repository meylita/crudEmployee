import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
    EmployeeListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbDatepickerModule,
    NgbModule,
    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    ),
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      timeOut: 500,
      positionClass: 'toast-center-center',
      preventDuplicates: true,}),
      
  ],
  
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
