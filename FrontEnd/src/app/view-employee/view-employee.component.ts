import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { tap, catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  public employees: Employee[] = [];
  public updateEmployee: Employee = new Employee;

  constructor(private router: Router, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService
      .getEmployeeDetails()
      .pipe(
        tap((empResponse: Employee[]) => {
          this.employees = empResponse;
          console.log(empResponse);
        }),
        catchError((err: HttpErrorResponse) => {
          alert(err.message);
          console.log(err);
          throw err;
        })
      )
      .subscribe();
  }

  public updateEmployees(emp : Employee) : void{
    this.employeeService.updateEmployeeDetails(emp).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  editEmployee(emp : Employee) : void{
    this.updateEmployee = emp;
    const cont = document.getElementById('m-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#editEmployeeModal');
    cont?.appendChild(button);
    button.click();
  }

  public deleteEmployee(emp : Employee) {
    this.employeeService.deleteEmployeeDetails(emp.employee_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
