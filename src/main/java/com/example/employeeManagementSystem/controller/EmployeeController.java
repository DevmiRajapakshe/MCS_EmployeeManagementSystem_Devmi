package com.example.employeeManagementSystem.controller;

import com.example.employeeManagementSystem.dto.EmployeeDto;
import com.example.employeeManagementSystem.service.EmployeeService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    @PostMapping("")
    public ResponseEntity<EmployeeDto> addEmployee(@RequestBody EmployeeDto employee) {
        try {
            return new ResponseEntity<>(employeeService.createEmployee(employee), HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("Exception occurred when adding employee. Make sure that the entered details are correct");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("")
    public ResponseEntity<List<EmployeeDto>> getEmployees() {
        return new ResponseEntity<>(employeeService.getEmployeeList(), HttpStatus.OK);
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable(name = "employeeId" ) int employeeId) {
        return new ResponseEntity<>(employeeService.getEmployee(employeeId), HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<?> deleteEmployeeRecord(@PathVariable("employeeId") int employeeId) {
        try{
            employeeService.deleteEmployee(employeeId);
            return new ResponseEntity<>( HttpStatus.OK);
        }catch(EmptyResultDataAccessException e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("")
    public ResponseEntity<EmployeeDto> updateEmployeeDetails(@RequestBody EmployeeDto employeeDto){
        return new ResponseEntity<>(employeeService.updateEmployee(employeeDto),HttpStatus.OK);
    }

}
