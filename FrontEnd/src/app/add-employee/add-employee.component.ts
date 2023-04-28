import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  title = 'EmployeeService';

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  public ngOnInit() {}

  //submit and add the details of the employees
  onSubmit(addDetails: NgForm): void {
    this.employeeService
      .addEmployeeDetails({ ...addDetails.value, employee_id: NaN })
      .subscribe(
        (emp: Employee) => {
          console.log(emp);
          addDetails.reset();
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

  //get the current date
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const day = today.getDate().toString().padStart(2, '0');
    const month = new Date().toLocaleString('default', { month: '2-digit' });
    return `${year}-${month}-${day}`;
  }
}
