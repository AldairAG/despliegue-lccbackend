package com.example.lccbackend.lccbackend.services.permiso;

import java.util.Optional;

import com.example.lccbackend.lccbackend.model.entities.Permiso;

public interface PermisoService {
    Permiso save(Permiso permiso);

    Optional<Permiso> findById(Long id);

    Optional<Permiso> update(Long id);

    Optional<Boolean> findActivoByPermisoName(String permisoName, String username);
    

}
