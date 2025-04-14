package com.example.demo.services;

import com.example.demo.entities.Supplier;
import java.util.List;

/**
 * Interfaz que define los métodos para la lógica de negocio de los proveedores.
 * Esta interfaz es implementada por la clase SupplierService.
 */
public interface ISupplierService {

    /**
     * Obtiene todos los proveedores.
     * @return Lista de todos los proveedores.
     */
    List<Supplier> getAll();

    /**
     * Obtiene un proveedor por su ID.
     * @param id El ID del proveedor a buscar.
     * @return El proveedor encontrado, o null si no existe.
     */
    Supplier getById(Long id);

    /**
     * Elimina un proveedor por su ID.
     * @param id El ID del proveedor a eliminar.
     */
    void remove(Long id);

    /**
     * Guarda un nuevo proveedor o actualiza uno existente.
     * @param supplier El objeto Supplier a guardar.
     * @return El proveedor guardado.
     */
    Supplier save(Supplier supplier);
}