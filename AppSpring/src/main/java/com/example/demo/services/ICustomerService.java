package com.example.demo.services;

import com.example.demo.entities.Customer;
import java.util.List;

/**
 * Interfaz que define los métodos para la lógica de negocio de los clientes.
 * Esta interfaz es implementada por la clase CustomerService.
 */
public interface ICustomerService {

    /**
     * Obtiene todos los clientes.
     * @return Lista de todos los clientes.
     */
    List<Customer> getAll();

    /**
     * Obtiene un cliente por su ID.
     * @param id El ID del cliente a buscar.
     * @return El cliente encontrado, o null si no existe.
     */
    Customer getById(Long id);

    /**
     * Elimina un cliente por su ID.
     * @param id El ID del cliente a eliminar.
     */
    void remove(Long id);

    /**
     * Guarda un nuevo cliente o actualiza uno existente.
     * @param customer El objeto Customer a guardar.
     * @return El cliente guardado.
     */
    Customer save(Customer customer);
}