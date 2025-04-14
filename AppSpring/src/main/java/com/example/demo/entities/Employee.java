package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Entidad JPA que representa un empleado en la base de datos.
 * Utiliza Lombok para la generación automática de getters, setters, toString y equals/hashCode.
 */
@Entity
@Table(name = "employees") // Especifica el nombre de la tabla en la base de datos.
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Employee {

    /**
     * Identificador único del empleado.
     * Generado automáticamente por la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre del empleado.
     */
    private String firstname;

    /**
     * Apellido del empleado.
     */
    private String lastname;

    /**
     * Correo electrónico del empleado.
     */
    private String email;

    /**
     * Número de teléfono del empleado.
     */
    private String phone;

    /**
     * Dirección del empleado.
     */
    private String address;

    /**
     * Salario del empleado.
     */
    private Double salary;
}