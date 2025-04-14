package com.example.demo.services;

import com.example.demo.entities.Employee;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio que implementa la interfaz IEmployeeService para manejar la lógica de negocio de los empleados.
 * Proporciona métodos para obtener, crear, actualizar y eliminar empleados.
 */
@Service
public class EmployeeService implements IEmployeeService {

    // Inyección de dependencia del repositorio de empleados.
    @Autowired
    private EmployeeRepository repository;

    /**
     * Obtiene todos los empleados.
     * @return Lista de todos los empleados.
     */
    @Override
    public List<Employee> getAll() {
        return repository.findAll();
    }

    /**
     * Obtiene un empleado por su ID.
     * @param id El ID del empleado a buscar.
     * @return El empleado encontrado, o null si no existe.
     */
    @Override
    public Employee getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Elimina un empleado por su ID.
     * @param id El ID del empleado a eliminar.
     */
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    /**
     * Guarda un nuevo empleado o actualiza uno existente.
     * @param employee El objeto Employee a guardar.
     * @return El empleado guardado.
     */
    @Override
    public Employee save(Employee employee) {
        return repository.save(employee);
    }
}