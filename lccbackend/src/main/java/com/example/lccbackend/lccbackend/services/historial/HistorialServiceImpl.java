package com.example.lccbackend.lccbackend.services.historial;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.lccbackend.lccbackend.model.entities.Historial;
import com.example.lccbackend.lccbackend.repositories.HistorialRepository;


@Service
public class HistorialServiceImpl implements HistorialService {

    @Autowired
    HistorialRepository repository;

    @Override
    public Historial save(Historial historial) {
        return repository.save(historial);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Historial> findByTipo(String tipo, String username) {
        return repository.findByTipo(tipo, username);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Historial> findByAbono(String username) {
       return repository.findByAbono(username);
    }

}
