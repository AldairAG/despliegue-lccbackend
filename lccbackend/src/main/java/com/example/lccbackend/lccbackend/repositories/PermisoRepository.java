package com.example.lccbackend.lccbackend.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.lccbackend.lccbackend.model.entities.Permiso;
import java.util.Optional;

public interface PermisoRepository extends CrudRepository<Permiso, Long> {

    @Query("SELECT p.activo FROM Permiso p JOIN p.wallet w JOIN w.usuario u WHERE p.permisoName = :name AND u.username = :username")
    Optional<Boolean> findActivoByPermisoNameAndUsername(@Param("name") String permisoName,
            @Param("username") String username);

}
