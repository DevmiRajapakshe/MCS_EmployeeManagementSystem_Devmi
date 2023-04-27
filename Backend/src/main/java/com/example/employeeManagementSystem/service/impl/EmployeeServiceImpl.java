package com.example.employeeManagementSystem.service.impl;

import com.example.employeeManagementSystem.Exception.EmployeeIdNotAvailableException;
import com.example.employeeManagementSystem.Repository.EmployeeRepository;
import com.example.employeeManagementSystem.dto.EmployeeDto;
import com.example.employeeManagementSystem.entity.Employee;
import com.example.employeeManagementSystem.service.EmployeeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDto, employee);
        employee = employeeRepository.save(employee);
        BeanUtils.copyProperties(employee, employeeDto);
        return employeeDto;
    }

    @Override
    public List<EmployeeDto> getEmployeeList() {
        return employeeRepository.findAll()
                .stream()
                .map(employee -> {
                    EmployeeDto employeeDto = new EmployeeDto();
                    BeanUtils.copyProperties(employee, employeeDto);
                    return employeeDto;
                }).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto getEmployee(int employeeId) {
        try {
            return employeeRepository.findEmployeeByEmployeeId(employeeId)
                    .map(employee -> {
                        EmployeeDto employeeDto = new EmployeeDto();
                        BeanUtils.copyProperties(employee, employeeDto);
                        return employeeDto;
                    })
                    .orElseThrow(()->new EmployeeIdNotAvailableException("Employee id" + employeeId + "not available"));
        } catch(Exception e) {
            return null;
        }
    }

    @Override
    public void deleteEmployee(int employeeId) {
        employeeRepository.deleteById(employeeId);
    }

    @Override
    public EmployeeDto updateEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeDto, employee);
        employee = employeeRepository.save(employee);
        BeanUtils.copyProperties(employee, employeeDto);
        return employeeDto;
    }
}
