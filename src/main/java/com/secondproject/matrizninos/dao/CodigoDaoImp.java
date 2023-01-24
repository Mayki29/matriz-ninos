package com.secondproject.matrizninos.dao;

import com.secondproject.matrizninos.models.Codigo;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;


@Repository
@Transactional
public class CodigoDaoImp implements CodigoDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Codigo> getAll() {
        String query = "FROM Codigo";
        return entityManager.createQuery(query).getResultList();
    }
}
