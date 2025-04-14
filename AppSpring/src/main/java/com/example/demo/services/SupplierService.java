package com.example.demo.services;

import com.example.demo.entities.Supplier;
import com.example.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio que implementa la interfaz ISupplierService para manejar la lógica de negocio de los proveedores.
 * Proporciona métodos para obtener, crear, actualizar y eliminar proveedores.
 */
@Service
public class SupplierService implements ISupplierService {

    // Inyección de dependencia del repositorio de proveedores.
    @Autowired
    private SupplierRepository repository;

    /**
     * Obtiene todos los proveedores.
     * @return Lista de todos los proveedores.
     */
    @Override
    public List<Supplier> getAll() {
        return repository.findAll();
    }

    /**
     * Obtiene un proveedor por su ID.
     * @param id El ID del proveedor a buscar.
     * @return El proveedor encontrado, o null si no existe.
     */
    @Override
    public Supplier getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Elimina un proveedor por su ID.
     * @param id El ID del proveedor a eliminar.
     */
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    /**
     * Guarda un nuevo proveedor o actualiza uno existente.
     * @param supplier El objeto Supplier a guardar.
     * @return El proveedor guardado.
     */
    @Override
    public Supplier save(Supplier supplier) {
        return repository.save(supplier);
    }
}