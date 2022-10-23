import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeServiceService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private employeesUrl = 'api/employees';  // URL to web api

  constructor(private http: HttpClient) { }

  getEmployees(params? : any){
    const url = `${this.employeesUrl}`; 
    let params_str = '';
    for (let key of Object.keys(params)) {
      params_str += `${key}=${params[key]}&`;
    }

    console.log(url, params_str, 'param');
    console.log(`${url}?${params_str}`, 'return');
    
     return this.http.get<any>(`${url}?${params_str}`);
  }

  /** GET employee by id. Will 404 if id not found */
  getEmployeebyId(id: number){
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<any>(url)
  }

  /** PUT: update the employee on the server */
  updateEmployee(param:any) {
    return this.http.put(this.employeesUrl, param, this.httpOptions)
  }

  /** POST: add a new employee to the server */
  addEmployee(param: any){
    return this.http.post<any>(this.employeesUrl, param, this.httpOptions)
  }

  /** DELETE: delete the employee from the server */
  deleteEmployee(id: number){
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<any>(url, this.httpOptions)
  }

  /* GET employees whose name contains search term */
  searchHeroes(term: string){
    if (!term.trim()) {
      // if not search term, return empty employee array.
      return of([]);
    }
    return this.http.get<any>(`${this.employeesUrl}/?name=${term}`)
  }

}

