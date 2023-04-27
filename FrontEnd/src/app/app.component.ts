import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';
import { Subscriber } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import{ tap, catchError} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  title = 'EmployeeService'

  constructor(private router: Router,private employeeService: EmployeeService){

  }

}
