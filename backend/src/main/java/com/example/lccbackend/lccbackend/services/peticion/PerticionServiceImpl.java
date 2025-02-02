package com.example.lccbackend.lccbackend.services.peticion;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lccbackend.lccbackend.model.DTO.PeticionDTO;
import com.example.lccbackend.lccbackend.model.entities.Peticion;
import com.example.lccbackend.lccbackend.repositories.PeticionRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class PerticionServiceImpl implements PeticionService {

    @Autowired
    PeticionRepository repository;

    @Override
    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public List<Peticion> findByTipo(String tipo) {
        return repository.findByTipo(tipo);
    }

    @Override
    @Transactional
    public Optional<Peticion> findById(Long id) {
        return repository.findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Peticion> findAll() {
        return (List<Peticion>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PeticionDTO> findByTipos(List<String> tipos) {
        List<Peticion> peticiones = repository.findByTipos(tipos);

        return peticiones.stream()
                .map(p -> new PeticionDTO(
                        p.getPeticion_id(),
                        p.getMonto(),
                        p.getTipo(),
                        p.getCode(),
                        p.getUsuario().getEmail(),
                        p.getUsuario().getUsername()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Peticion> findPeticionByCode(String code) {
        return repository.findByCode(code);
    }

    @Override
    @Transactional(readOnly = true)
    public String findUsernameById(Long id) {
        return repository.findUsernameById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public String findTipoById(Long id) {
        return repository.findTipoById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Peticion> existRetiroPendiente(String username) {
        return repository.findRetiroPendiente(username);
    }

}
