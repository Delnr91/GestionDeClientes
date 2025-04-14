package com.example.demo.controller;

import com.example.demo.entities.Customer;
import com.example.demo.services.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para manejar las operaciones CRUD de la entidad Customer.
 * Expone endpoints para obtener, crear, actualizar y eliminar clientes.
 */
@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173") // Permite solicitudes CORS desde el frontend en localhost:5173
public class CustomerController {

    // Inyección de dependencia del servicio que maneja la lógica de negocio de los clientes.
    @Autowired
    private ICustomerService service;

    /**
     * Obtiene todos los clientes.
     *
     * @return ResponseEntity con la lista de clientes y estado HTTP 200 (OK).
     */
    @GetMapping
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    /**
     * Obtiene un cliente por su ID.
     *
     * @param id El ID del cliente a buscar.
     * @return ResponseEntity con el cliente encontrado y estado HTTP 200 (OK), o un mensaje de error y estado HTTP 404 (NOT_FOUND) si no se encuentra.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        // Obtiene el cliente por su ID usando el servicio.
        Optional<Customer> customer = Optional.ofNullable(service.getById(id));
        // Verifica si el cliente existe.
        if (customer.isPresent()) {
            // Si el cliente existe, lo devuelve con estado HTTP 200.
            return ResponseEntity.ok(customer.get());
        } else {
            // Si el cliente no existe, devuelve un mensaje de error con estado HTTP 404.
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El cliente con ID " + id + " no existe.");
        }
    }

    /**
     * Elimina un cliente por su ID.
     *
     * @param id El ID del cliente a eliminar.
     * @return ResponseEntity con estado HTTP 204 (NO_CONTENT) si la eliminación fue exitosa.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        // Elimina el cliente usando el servicio.
        service.remove(id);
        // Devuelve una respuesta sin contenido con estado HTTP 204.
        return ResponseEntity.noContent().build();
    }

    /**
     * Guarda un nuevo cliente o actualiza uno existente.
     *
     * @param customer El objeto Customer a guardar.
     * @return ResponseEntity con el cliente guardado y estado HTTP 200 (OK).
     */
    @PostMapping
    public ResponseEntity<Customer> save(@RequestBody Customer customer) {
        // Guarda el cliente usando el servicio.
        Customer savedCustomer = service.save(customer);
        // Devuelve el cliente guardado con estado HTTP 200.
        return ResponseEntity.ok(savedCustomer);
    }
}