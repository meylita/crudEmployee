import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { employeeList } from 'src/assets/dummy-employee';
import { EmployeeServiceService } from '../service/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employeeList: any = []

  public total: number;

  public currentPage: any = 1 /* Current page Active */
  public data: any = { totalItems: 0, itemsPerPage: 0 }
  public totalItems: any;
  public itemsPerPage: any = 10

  public page: any;
  public searchEmployee: any;

  constructor(
    private employeeService: EmployeeServiceService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployees()
  }


  getEmployees() {
    let param = {
      search: this.searchEmployee
    }
    this.employeeService.getEmployees(param)
      .subscribe(data => {
        console.log(data, 'data employees');
        this.totalItems = data.length;
        this.employeeList = data
      });
  }

  editEmployee(id: number) {
    this.router.navigate(['employee-update', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(x=> {
      this.toastr.success('Delete Success', 'Success');

      this.getEmployees()
    });
  }


  pageChanged() {
    // this.page = this.currentPage - 1
    this.employeeList = this.employeeList.slice((this.currentPage - 1) * this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage);
  }

  search(event: any) {
    this.searchEmployee = event
    this.page = 1

    this.getEmployees()
  }

}
