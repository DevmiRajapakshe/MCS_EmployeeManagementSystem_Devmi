package com.example.employeeManagementSystem.service;

import com.example.employeeManagementSystem.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employee);

    List<EmployeeDto> getEmployeeList();

    EmployeeDto getEmployee(int employeeId);

    void deleteEmployee(int employeeId);

    EmployeeDto updateEmployee(EmployeeDto employeeDto);
}
