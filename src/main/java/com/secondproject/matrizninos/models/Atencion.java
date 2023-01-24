package com.secondproject.matrizninos.models;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "atencion")
public class Atencion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    @Setter
    private int id;

    @Column(name = "id_paciente")
    @Getter @Setter
    private int idPaciente;

    @Column(name = "id_codigo")
    @Getter @Setter
    private int idCodigo;

    @Column(name = "fecha")
    @Getter @Setter
    private LocalDate fecha;

    @Column(name = "n_extra")
    @Getter @Setter
    private String numExtra;


    @ManyToOne
    @JoinColumn(name = "id_paciente", insertable = false, updatable = false)
    private Paciente paciente;


    @ManyToOne
    @JoinColumn(name = "id_codigo", insertable = false, updatable = false )
    @Getter @Setter
    private Codigo codigo;


}
