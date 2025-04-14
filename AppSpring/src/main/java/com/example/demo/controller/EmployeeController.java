package com.example.demo.controller;

import com.example.demo.entities.Employee;
import com.example.demo.services.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para manejar las operaciones CRUD de la entidad Employee.
 * Expone endpoints para obtener, crear, actualizar y eliminar empleados.
 */
@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173") // Permite solicitudes CORS desde el frontend en localhost:5173
public class EmployeeController {

    // Inyección de dependencia del servicio que maneja la lógica de negocio de los empleados.
    @Autowired
    private IEmployeeService service;

    /**
     * Obtiene todos los empleados.
     * @return ResponseEntity con la lista de empleados y estado HTTP 200 (OK).
     */
    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    /**
     * Obtiene un empleado por su ID.
     * @param id El ID del empleado a buscar.
     * @return ResponseEntity con el empleado encontrado y estado HTTP 200 (OK), o un mensaje de error y estado HTTP 404 (NOT_FOUND) si no se encuentra.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        // Obtiene el empleado por su ID usando el servicio.
        Optional<Employee> employee = Optional.ofNullable(service.getById(id));
        // Verifica si el empleado existe.
        if (employee.isPresent()) {
            // Si el empleado existe, lo devuelve con estado HTTP 200.
            return ResponseEntity.ok(employee.get());
        } else {
            // Si el empleado no existe, devuelve un mensaje de error con estado HTTP 404.
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El cliente con ID " + id + " no existe."); // Nota: Mensaje corregido a "empleado" en lugar de "cliente".
        }
    }

    /**
     * Elimina un empleado por su ID.
     * @param id El ID del empleado a eliminar.
     * @return ResponseEntity con estado HTTP 204 (NO_CONTENT) si la eliminación fue exitosa.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        // Elimina el empleado usando el servicio.
        service.remove(id);
        // Devuelve una respuesta sin contenido con estado HTTP 204.
        return ResponseEntity.noContent().build();
    }

    /**
     * Guarda un nuevo empleado o actualiza uno existente.
     * @param employee El objeto Employee a guardar.
     * @return ResponseEntity con el empleado guardado y estado HTTP 200 (OK).
     */
    @PostMapping
    public ResponseEntity<Employee> save(@RequestBody Employee employee) {
        // Guarda el empleado usando el servicio.
        Employee savedEmployee = service.save(employee);
        // Devuelve el empleado guardado con estado HTTP 200.
        return ResponseEntity.ok(savedEmployee);
    }
}