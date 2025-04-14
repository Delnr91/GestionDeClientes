package com.example.demo.repository;

import com.example.demo.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para la entidad Supplier.
 * Extiende JpaRepository, proporcionando métodos CRUD estándar para la entidad Supplier.
 */
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    // No se necesitan métodos adicionales aquí, ya que JpaRepository proporciona los métodos básicos.
    // Si se requirieran consultas personalizadas, se podrían agregar aquí.
}