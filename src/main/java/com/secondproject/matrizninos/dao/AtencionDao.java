package com.secondproject.matrizninos.dao;

import com.secondproject.matrizninos.models.Atencion;

import java.util.List;

public interface AtencionDao {
    List<Atencion> getByIdPaciente(Integer id);
}
