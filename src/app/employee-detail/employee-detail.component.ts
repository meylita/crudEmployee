import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../service/employee-service.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  public id: number;
  public dataEmployee: any;

  constructor(
    public activeRouter: ActivatedRoute,
    public router:Router,
    private employeeService: EmployeeServiceService
  ) { }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params.productId;
    
    this.employeeService.getEmployeebyId(this.id)
    .subscribe(data => {
      this.dataEmployee = data
    });
  }

  back() {
    this.router.navigate(['employee-list']);
  }

}
