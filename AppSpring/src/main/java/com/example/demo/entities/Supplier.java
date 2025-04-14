package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Entidad JPA que representa un proveedor en la base de datos.
 * Utiliza Lombok para la generación automática de getters, setters, toString y equals/hashCode.
 */
@Entity
@Table(name = "suppliers") // Especifica el nombre de la tabla en la base de datos.
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Supplier {

    /**
     * Identificador único del proveedor.
     * Generado automáticamente por la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre del proveedor.
     */
    private String name;

    /**
     * Correo electrónico del proveedor.
     */
    private String email;

    /**
     * Número de teléfono del proveedor.
     */
    private String phone;

    /**
     * Dirección del proveedor.
     */
    private String address;

    /**
     * Sitio web del proveedor.
     */
    private String web;

    /**
     * Nombre del contacto del proveedor.
     */
    private String contact;
}