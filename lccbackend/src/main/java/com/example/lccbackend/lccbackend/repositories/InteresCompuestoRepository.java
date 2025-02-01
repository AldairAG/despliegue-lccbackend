package com.example.lccbackend.lccbackend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.lccbackend.lccbackend.model.DTO.ICDTO;
import com.example.lccbackend.lccbackend.model.entities.InteresCompuesto;

public interface InteresCompuestoRepository extends CrudRepository<InteresCompuesto, Long> {

    @Query("SELECT ic FROM InteresCompuesto ic WHERE ic.interes_compuesto_id = :id")
    InteresCompuesto findByInteres_compuesto_id(@Param("id") Long id);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.ICDTO(w.wallet_div,w.staterpack,u.username,ic.interes_compuesto_id) FROM InteresCompuesto ic JOIN ic.wallet w JOIN w.usuario u where ic.tipo ='div' AND ic.activo = true ")
    List<ICDTO> findDataForICDiv();

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.ICDTO(w.wallet_com,w.staterpack,u.username,null) FROM InteresCompuesto ic JOIN ic.wallet w JOIN w.usuario u where ic.tipo ='com' AND ic.activo = true AND w.wallet_com >= 100")
    List<ICDTO> findDataForICCom();

    @Query("SELECT ic FROM InteresCompuesto ic WHERE ic.interes_compuesto_id =:id")
    Optional<InteresCompuesto> findById(@Param("id") Long id);
}
