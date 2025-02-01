package com.example.lccbackend.lccbackend.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.lccbackend.lccbackend.model.entities.Peticion;
import java.util.List;
import java.util.Optional;

public interface PeticionRepository extends CrudRepository<Peticion, Long> {
    List<Peticion> findByTipo(String tipo);

    @Query("SELECT p FROM Peticion p WHERE p.tipo IN :tipos")
    List<Peticion> findByTipos(@Param("tipos") List<String> tipos);

    Optional<Peticion> findByCode(String code);

    @Query("SELECT u.username FROM Peticion p JOIN p.usuario u WHERE p.peticion_id=:id")
    String findUsernameById(@Param("id") Long id);

    @Query("SELECT p.tipo FROM Peticion p WHERE p.peticion_id=:id")
    String findTipoById(@Param("id") Long id);

    /*
     * @Query("SELECT COUNT(p) > 0 FROM Peticion p JOIN p.usuario u WHERE (p.tipo = 'rcw' OR p.tipo = 'rcd') AND u.username = :username"
     * )
     * Optional<Boolean> existsRetiroPeticion(@Param("username") String username);
     */

    @Query("SELECT p FROM Peticion p JOIN p.usuario u WHERE (p.tipo = 'rwc' OR p.tipo = 'rwd') AND u.username = :username")
    Optional<Peticion> findRetiroPendiente(@Param("username") String username);

}
