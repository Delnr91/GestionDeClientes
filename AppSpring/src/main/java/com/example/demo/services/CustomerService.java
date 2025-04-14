package com.example.demo.services;

import com.example.demo.entities.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio que implementa la interfaz ICustomerService para manejar la lógica de negocio de los clientes.
 * Proporciona métodos para obtener, crear, actualizar y eliminar clientes.
 */
@Service
public class CustomerService implements ICustomerService {

    // Inyección de dependencia del repositorio de clientes.
    @Autowired
    private CustomerRepository repository;

    /**
     * Obtiene todos los clientes.
     * @return Lista de todos los clientes.
     */
    @Override
    public List<Customer> getAll() {
        return repository.findAll();
    }

    /**
     * Obtiene un cliente por su ID.
     * @param id El ID del cliente a buscar.
     * @return El cliente encontrado, o null si no existe.
     */
    @Override
    public Customer getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Elimina un cliente por su ID.
     * @param id El ID del cliente a eliminar.
     */
    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    /**
     * Guarda un nuevo cliente o actualiza uno existente.
     * @param customer El objeto Customer a guardar.
     * @return El cliente guardado.
     */
    @Override
    public Customer save(Customer customer) {
        return repository.save(customer);
    }
}
