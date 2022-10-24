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
  public paginateData: any
  public total: number;

  public currentPage: any = 1 /* Current page Active */
  public totalItems: any;
  public itemsPerPage: any = 10
  public dataPaginationperPage: any;
  public searchEmployee: any = ''
  public employeeSelected: any;

  constructor(
    private employeeService: EmployeeServiceService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployees()
  }


  getEmployees() {
    let param = {
      username: this.searchEmployee
    }
    this.employeeService.getEmployees(param)
      .subscribe((data: any) => {
        this.totalItems = data.length;
        this.employeeList = data
        localStorage.setItem('employeeList', JSON.stringify(data))
        this.pageChanged()
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
    this.employeeList = JSON.parse(localStorage.getItem('employeeList') || '{}').map((data:any, i:any) => ({id: i+1, ...data})).slice((this.currentPage - 1) * this.itemsPerPage, (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage);
    this.dataPaginationperPage = this.employeeList.length
  }

  search(event: any) {
    this.searchEmployee = event
    this.currentPage = 1
    this.getEmployees()
  }

  selectedEmployee(id: number) {
    this.employeeSelected = id
    this.router.navigate(['employee-detail', id]);
  }

}
