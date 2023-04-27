package com.example.employeeManagementSystem.Repository;

import com.example.employeeManagementSystem.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query(value = "SELECT * FROM employees WHERE EMPLOYEE_ID = :employeeId", nativeQuery = true)
    //@Query(value = "SELECT employee FROM Employee user WHERE employee.employeeId = :employeeId")
    Optional<Employee> findEmployeeByEmployeeId(@Param("employeeId") long id);

}

