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
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  public employees: Employee[] = [];
  public updateEmployee: Employee = new Employee();

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  //display employee details everytime the component is initialized
  ngOnInit(): void {
    this.getEmployees();
  }

  //get the details of all the employees
  public getEmployees(): void {
    this.employeeService
      .getEmployeeDetails()
      .pipe(
        tap((empResponse: Employee[]) => {
          this.employees = empResponse;
          console.log(empResponse);
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          alert(err.message);
          throw err;
        })
      )
      .subscribe();
  }

  //update the details of a particular employee
  public updateEmployees(emp: Employee): void {
    this.employeeService.updateEmployeeDetails(emp).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  //once the edit employee button is pressed used to specify that the dialog
  //with the form should be displayed.
  editEmployee(emp: Employee): void {
    this.updateEmployee = emp;
    const cont = document.getElementById('m-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#editEmployeeModal');
    cont?.appendChild(button);
    //call the dev element with id editEmployeeModal
    button.click();
  }

  //get the current date in the format required
  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const day = date.getDate().toString().padStart(2, '0');
    const month = new Date().toLocaleString('default', { month: '2-digit' });
    return `${year}-${month}-${day}`;
  }

  //Delete the details of the particular employee
  public deleteEmployee(emp: Employee) {
    this.employeeService.deleteEmployeeDetails(emp.employee_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  //allow user to only enter letters
  checkOnlyLetterInputs(event: any) {
    const pattern = /[a-zA-Z]/;
    const input = String.fromCharCode(event.keyCode);

    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }

  //allow user to only enter numbers
  checkOnlyNumberInputs(event: any) {
    const pattern = /^[0-9]*$/;
    const input = String.fromCharCode(event.keyCode);

    if (!pattern.test(input)) {
      event.preventDefault();
    }
  }
}
