package com.example.demo.repository;

import com.example.demo.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para la entidad Customer.
 * Extiende JpaRepository, proporcionando métodos CRUD estándar para la entidad Customer.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // No se necesitan métodos adicionales aquí, ya que JpaRepository proporciona los métodos básicos.
    // Si se requirieran consultas personalizadas, se podrían agregar aquí.
}