import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../service/employee-service.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  public employee: any;
  public id: number;
  public editMode = true;
  
  public formEmployee: FormGroup
  public validation = false;
  public maxStartDate: NgbDateStruct;
  public groupOption = [
    { id: 'accounting', name: 'Accounting' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'engineer', name: 'Engineer' },
    { id: 'qperation', name: 'Operation' },
    { id: 'hr', name: 'HR' },
    { id: 'qa', name: 'QA' },
    { id: 'developer', name: 'Developer' },
    { id: 'production', name: 'Production' },
    { id: 'developer', name: 'Developer' },
    { id: 'ts', name: 'TS' },
  ]

  constructor(
    public activeRouter: ActivatedRoute,
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
      id: [''],
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

    this.id = this.activeRouter.snapshot.params.productId;

    this.employeeService.getEmployeebyId(this.id)
      .subscribe(data => {
        this.formEmployee.patchValue(data)
      });
  }

  get p() { return this.formEmployee.controls; }

  save() {
    this.validation = true;

    if (this.formEmployee.invalid) {
      return;
    }

    let param = this.formEmployee.value
    
    if (this.validation) {
      this.employeeService.updateEmployee(param)
        .subscribe(x => {
          this.toastr.success('Update Success', 'Success');
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

export interface employeeInterface {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}