package com.example.demo.repository;

import com.example.demo.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para la entidad Employee.
 * Extiende JpaRepository, proporcionando métodos CRUD estándar para la entidad Employee.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // No se necesitan métodos adicionales aquí, ya que JpaRepository proporciona los métodos básicos.
    // Si se requirieran consultas personalizadas, se podrían agregar aquí.
}