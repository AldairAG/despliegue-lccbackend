package com.example.lccbackend.lccbackend.services.peticion;

import java.util.List;
import java.util.Optional;

import com.example.lccbackend.lccbackend.model.DTO.PeticionDTO;
import com.example.lccbackend.lccbackend.model.entities.Peticion;

public interface PeticionService {

    void delete(Long id);

    List<Peticion> findByTipo(String tipo);

    List<PeticionDTO> findByTipos(List<String> tipo);

    Optional<Peticion> findById(Long id);

    List<Peticion> findAll();

    Optional<Peticion> findPeticionByCode(String code);

    String findUsernameById(Long id);

    String findTipoById(Long id);

    Optional<Peticion> existRetiroPendiente(String username);

}
