package com.secondproject.matrizninos.models;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "codigos")
public class Codigo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter @Setter
    private int id;

    @Column(name = "codigo")
    @Getter @Setter
    private String codigo;

    @Column(name = "descripcion")
    @Getter @Setter
    private String descripcion;

    @OneToMany(mappedBy = "codigo")
    private List<Atencion> atenciones;
}
