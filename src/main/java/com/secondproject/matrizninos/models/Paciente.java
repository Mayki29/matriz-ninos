package com.secondproject.matrizninos.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "pacientes")
@ToString
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter @Setter
    private int id;

    @Column(name = "hc")
    @Getter @Setter
    private String hc;

    @Column(name = "dni")
    @Getter @Setter
    private String dni;

    @Column(name = "nombre_apellido")
    @Getter @Setter
    private String nombreApellido;

    @Column(name = "celular")
    @Getter @Setter
    private String celular;

    @Column(name = "abo")
    @Getter @Setter
    private String abo;

    @OneToMany(mappedBy = "paciente")
    private List<Atencion> atenciones;
}
