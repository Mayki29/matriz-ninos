package com.secondproject.matrizninos.dao;

import com.secondproject.matrizninos.models.Atencion;
import com.secondproject.matrizninos.models.Paciente;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class PacienteDaoImp implements PacienteDao{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Paciente> getAll() {
        String query = "FROM Paciente ORDER BY id DESC";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public Paciente getById(Integer id) {
        return entityManager.find(Paciente.class, id);
    }

    @Override
    public List<Paciente> getPacientesByName(String name) {
        String lowerName = "%"+name.toLowerCase()+"%";
        String query = "FROM Paciente WHERE LOWER(nombre_apellido) LIKE :name";

        List<Paciente> pacientes = entityManager.createQuery(query).setParameter("name",lowerName).getResultList();
        return pacientes;
    }

    @Override
    public void create(Paciente paciente, Atencion atencion) {
        Integer idPaciente = entityManager.merge(paciente).getId();
        atencion.setIdPaciente(idPaciente);
        entityManager.merge(atencion);

       // System.out.println(atencion.toString());
    }

    @Override
    public void setAbo(Integer id, String estado) {
        Paciente paciente = entityManager.find(Paciente.class, id);
        paciente.setAbo(estado);
        entityManager.merge(paciente);
    }
}
