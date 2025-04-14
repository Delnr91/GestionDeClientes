package com.example.demo.controller;

import com.example.demo.entities.Supplier;
import com.example.demo.services.ISupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para manejar las operaciones CRUD de la entidad Supplier.
 * Expone endpoints para obtener, crear, actualizar y eliminar proveedores.
 */
@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:5173") // Permite solicitudes CORS desde el frontend en localhost:5173
public class SupplierController {

    // Inyección de dependencia del servicio que maneja la lógica de negocio de los proveedores.
    @Autowired
    private ISupplierService service;

    /**
     * Obtiene todos los proveedores.
     *
     * @return ResponseEntity con la lista de proveedores y estado HTTP 200 (OK).
     */
    @GetMapping
    public ResponseEntity<List<Supplier>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    /**
     * Obtiene un proveedor por su ID.
     *
     * @param id El ID del proveedor a buscar.
     * @return ResponseEntity con el proveedor encontrado y estado HTTP 200 (OK), o un mensaje de error y estado HTTP 404 (NOT_FOUND) si no se encuentra.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        // Obtiene el proveedor por su ID usando el servicio.
        Optional<Supplier> supplier = Optional.ofNullable(service.getById(id));
        // Verifica si el proveedor existe.
        if (supplier.isPresent()) {
            // Si el proveedor existe, lo devuelve con estado HTTP 200.
            return ResponseEntity.ok(supplier.get());
        } else {
            // Si el proveedor no existe, devuelve un mensaje de error con estado HTTP 404.
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El proveedor con ID " + id + " no existe."); // Nota: Mensaje corregido a "proveedor" en lugar de "cliente".
        }
    }

    /**
     * Elimina un proveedor por su ID.
     *
     * @param id El ID del proveedor a eliminar.
     * @return ResponseEntity con estado HTTP 204 (NO_CONTENT) si la eliminación fue exitosa.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        // Elimina el proveedor usando el servicio.
        service.remove(id);
        // Devuelve una respuesta sin contenido con estado HTTP 204.
        return ResponseEntity.noContent().build();
    }

    /**
     * Guarda un nuevo proveedor o actualiza uno existente.
     *
     * @param supplier El objeto Supplier a guardar.
     * @return ResponseEntity con el proveedor guardado y estado HTTP 200 (OK).
     */
    @PostMapping
    public ResponseEntity<Supplier> save(@RequestBody Supplier supplier) {
        // Guarda el proveedor usando el servicio.
        Supplier savedSupplier = service.save(supplier);
        // Devuelve el proveedor guardado con estado HTTP 200.
        return ResponseEntity.ok(savedSupplier);
    }
}