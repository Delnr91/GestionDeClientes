package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidad JPA que representa un cliente en la base de datos.
 * Esta clase está anotada con Lombok para generar automáticamente getters, setters, toString y equals/hashCode.
 */
@Entity
@Table(name = "customers") // Especifica el nombre de la tabla en la base de datos.
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Customer {

    /**
     * Identificador único del cliente.
     * Generado automáticamente por la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre del cliente.
     */
    private String firstname;

    /**
     * Apellido del cliente.
     */
    private String lastname;

    /**
     * Correo electrónico del cliente.
     */
    private String email;

    /**
     * Número de teléfono del cliente.
     */
    private String phone;

    /**
     * Dirección del cliente.
     */
    private String address;
}