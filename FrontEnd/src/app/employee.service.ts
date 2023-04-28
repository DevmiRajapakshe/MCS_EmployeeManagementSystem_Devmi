import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from './Employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private urlApiService = environment.baseUrl;
  constructor(private http: HttpClient) {}

  //send HTTP GET request to the endpoint to get the details of all employees
  public getEmployeeDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.urlApiService}/employees`);
  }

  //send HTTP POST request to the endpoint to add the details of an employee
  public addEmployeeDetails(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.urlApiService}/employees`,
      employee
    );
  }

  //send HTTP DELETE request to the endpoint to delete the details of an employee
  public deleteEmployeeDetails(employeeId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.urlApiService}/employees/${employeeId}`
    );
  }

  //send HTTP PUT request to the endpoint to update the details of an employee
  public updateEmployeeDetails(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.urlApiService}/employees`, employee);
  }
}
