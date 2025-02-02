package com.example.lccbackend.lccbackend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.CrudRepository;

import com.example.lccbackend.lccbackend.model.entities.Historial;

public interface HistorialRepository extends CrudRepository<Historial, Long>{

    @Query("SELECT h FROM Historial h JOIN h.usuario u WHERE h.tipo=:tipo AND u.username=:username")
    List<Historial> findByTipo(@Param("tipo") String tipo,@Param("username") String username);

    @Query("SELECT h FROM Historial h JOIN h.usuario u WHERE h.abono=true AND u.username=:username")
    List<Historial> findByAbono(@Param("username") String username);
}
