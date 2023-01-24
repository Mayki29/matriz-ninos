package com.secondproject.matrizninos.dao;

import com.secondproject.matrizninos.models.Atencion;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class AtencionDaoImp implements AtencionDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Atencion> getByIdPaciente(Integer id) {
        String query = "FROM Atencion WHERE id_paciente = :idp";
        List<Atencion> obj = entityManager.createQuery(query).setParameter("idp",id).getResultList();
        return obj;
    }
}
