package com.example.lccbackend.lccbackend.services.permiso;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.lccbackend.lccbackend.model.entities.Permiso;
import com.example.lccbackend.lccbackend.repositories.PermisoRepository;

@Service
public class PermisoServiceImpl implements PermisoService {
    @Autowired
    private PermisoRepository repository;

    @Override
    @Transactional
    public Permiso save(Permiso permiso) {
        return repository.save(permiso);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Permiso> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Permiso> update(Long id) {
        Optional<Permiso> permiso = repository.findById(id);
        if (permiso.isPresent()) {
            permiso.get().setActivo(!permiso.get().isActivo());
            repository.save(permiso.get());
            return permiso;
        }

        return Optional.empty();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Boolean> findActivoByPermisoName(String permisoName, String username) {
        return repository.findActivoByPermisoNameAndUsername(permisoName, username);
    }
}
