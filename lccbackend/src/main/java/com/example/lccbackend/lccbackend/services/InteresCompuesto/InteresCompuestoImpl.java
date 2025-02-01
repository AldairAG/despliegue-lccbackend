package com.example.lccbackend.lccbackend.services.InteresCompuesto;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.lccbackend.lccbackend.model.DTO.ICDTO;
import com.example.lccbackend.lccbackend.model.entities.InteresCompuesto;
import com.example.lccbackend.lccbackend.repositories.InteresCompuestoRepository;

@Service
public class InteresCompuestoImpl implements InteresCompuestoService {
    @Autowired
    private InteresCompuestoRepository repository;

    @Override
    @Transactional(readOnly = true)
    public InteresCompuesto findById(Long id) {
        return repository.findByInteres_compuesto_id(id);
    }

    @Override
    @Transactional
    public InteresCompuesto updateInteresCompuesto(InteresCompuesto interesCompuesto) {
        return repository.save(interesCompuesto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ICDTO> findDataForIcDiv() {
        return repository.findDataForICDiv();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ICDTO> findDataForIcCom() {
        return repository.findDataForICCom();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InteresCompuesto> findIcById(Long id) {
        return repository.findById(id);
    }

}
