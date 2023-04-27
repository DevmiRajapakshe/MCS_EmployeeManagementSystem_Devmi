import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  title = 'EmployeeService';

  public employees: Employee[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService
    ) {}

  public ngOnInit() {

  }

  onSubmit(addDetails: NgForm): void {
    this.employeeService.addEmployeeDetails(addDetails.value).subscribe(
      (response: Employee) => {
        addDetails.reset();
        console.log(response);
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }
}
