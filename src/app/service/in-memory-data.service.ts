import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { employeesData } from 'src/assets/dummy-employee';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = employeesData
    return {employees};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(employees : any): number {
    return employees.length > 0 ? Math.max(...employees.map((employee: any) => employee.id)) + 1 : 11;
  }
}