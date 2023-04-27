package com.example.employeeManagementSystem.Exception;

public class EmployeeIdNotAvailableException extends RuntimeException{
    public EmployeeIdNotAvailableException(String message) {
        super(message);
    }
}
