import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Employee} from './Employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn : "root"
})
export class EmployeeService{

  private urlApiService = environment.baseUrl;
  constructor(private http: HttpClient){}

  public getEmployeeDetails(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.urlApiService}/employees`)
  }

  public addEmployeeDetails(employee: Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.urlApiService}/employees`,employee);
  }

  public deleteEmployeeDetails(employeeId: number):Observable<void>{
    return this.http.delete<void>(`${this.urlApiService}/employees/${employeeId}`);
  }

  public updateEmployeeDetails(employee: Employee):Observable<Employee>{
    return this.http.put<Employee>(`${this.urlApiService}/employees`,employee);
  }
}
