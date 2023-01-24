package com.secondproject.matrizninos.dao;

import com.secondproject.matrizninos.models.Atencion;
import com.secondproject.matrizninos.models.Paciente;

import java.util.List;

public interface PacienteDao {
    List<Paciente> getAll();
    Paciente getById(Integer id);
    List<Paciente> getPacientesByName(String name);
    void create(Paciente paciente, Atencion atencion);
    void setAbo(Integer id, String estado);
}
