package com.example.demo.services;

import com.example.demo.entities.Employee;
import java.util.List;

/**
 * Interfaz que define los métodos para la lógica de negocio de los empleados.
 * Esta interfaz es implementada por la clase EmployeeService.
 */
public interface IEmployeeService {

    /**
     * Obtiene todos los empleados.
     * @return Lista de todos los empleados.
     */
    List<Employee> getAll();

    /**
     * Obtiene un empleado por su ID.
     * @param id El ID del empleado a buscar.
     * @return El empleado encontrado, o null si no existe.
     */
    Employee getById(Long id);

    /**
     * Elimina un empleado por su ID.
     * @param id El ID del empleado a eliminar.
     */
    void remove(Long id);

    /**
     * Guarda un nuevo empleado o actualiza uno existente.
     * @param employee El objeto Employee a guardar.
     * @return El empleado guardado.
     */
    Employee save(Employee employee);
}