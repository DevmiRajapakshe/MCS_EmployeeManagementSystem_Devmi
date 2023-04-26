import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';
import { Subscriber } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import{ tap, catchError} from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'EmployeeService'

  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService){

  }

  public getEmployees(): void {
  this.employeeService.getEmployeeDetails().pipe(
    tap((empResponse: Employee[]) => {
      this.employees = empResponse;
      console.log(empResponse);
    }),
    catchError((err: HttpErrorResponse) => {
      alert(err.message);
      console.log(err);
      throw err;
    })
  ).subscribe();
 }

 onSubmit(addDetails: NgForm): void{
  this.employeeService.addEmployeeDetails(addDetails.value).subscribe(
    (response: Employee) => {
      addDetails.reset();
      console.log(response);
    },
    (err : HttpErrorResponse) => {
      alert(err.message);
    }
  );
}

  public ngOnInit() {
    this.getEmployees();
  }

}
