export class Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  salary: number;
  address: string;
  job_title: string;
  email: string;
  phone: string;

  constructor() {
    this.employee_id = 0;
    this.first_name = '';
    this.last_name = '';
    this.date_of_birth = new Date();
    this.salary = 0;
    this.address = '';
    this.job_title = '';
    this.email = '';
    this.phone = '';
  }
}
