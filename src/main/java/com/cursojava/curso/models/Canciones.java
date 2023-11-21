package com.cursojava.curso.models;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

/**
 * Clase que representa una canción en la aplicación.
 */
@Entity
@Table(name = "Canciones")
@ToString
@Getter
@Setter
@EqualsAndHashCode
public class Canciones {

        @Id
        @GeneratedValue(strategy= GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @ManyToOne(optional = false)
        @JoinColumn(name="usuario_id",nullable = false, foreignKey = @ForeignKey(name = "fk_Canciones"))
        private Usuario usuario;

        @Column(name = "titulo")
        private String titulo;

        @Column(name = "album")
        private String album;

        @Column(name = "descripcion")
        private String descripcion;

        @Column(name = "fecha_agregada")
        private Date fecha_agregada;

        @Column(name = "link")
        private String link;

}
