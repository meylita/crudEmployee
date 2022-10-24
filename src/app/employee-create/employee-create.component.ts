import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../service/employee-service.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  public formEmployee: FormGroup
  public validation = false;

  public maxStartDate: NgbDateStruct;
  public groupOption = [
    { id: 1, name: 'Accounting' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Engineer' },
    { id: 4, name: 'Operation' },
    { id: 5, name: 'HR' },
    { id: 6, name: 'QA' },
    { id: 7, name: 'Developer' },
    { id: 8, name: 'Production' },
    { id: 9, name: 'Developer' },
    { id: 10, name: 'TS' },
  ]

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let now = new Date();
    this.maxStartDate = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    }

    this.formEmployee = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      basicSalary: ['', [Validators.required]],
      status: ['', [Validators.required]],
      group: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  get p() { return this.formEmployee.controls; }

  save() {
    this.validation = true;

    if (this.formEmployee.invalid) {
      return;
    }

    let param = this.formEmployee.value

    if (this.validation) {
      this.employeeService.addEmployee(param)
        .subscribe(x => {
          this.toastr.success('Create Success', 'Success');

          setTimeout(() => {
            this.router.navigate(['employee-list']);
          }, 1000);
        });
    }

  }

  back() {
    this.router.navigate(['employee-list']);
  }

}
