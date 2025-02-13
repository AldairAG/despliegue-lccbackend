package com.example.lccbackend.lccbackend.services.ecomerceService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.lccbackend.lccbackend.model.ecomerceEntities.Orden;
import com.example.lccbackend.lccbackend.repositories.OrdenRepository;

@Service
public class EcomerceServiceImpl implements EcomerceService {

    @Autowired
    OrdenRepository ordenRepository;

    @Override
    @Transactional
    public Optional<Orden> editOrden(Long id, Orden patchOrden) {
        return ordenRepository.findById(id).map(orden -> {
            if (patchOrden.getEstado() != null)orden.setEstado(patchOrden.getEstado());
            if (patchOrden.getNumeroRastreo() != null) orden.setNumeroRastreo(patchOrden.getNumeroRastreo());
            if (patchOrden.getTotal() != null) orden.setTotal(patchOrden.getTotal());

            return ordenRepository.save(orden);
        });
    }

    @Override
    @Transactional
    public Orden crearOrden( Orden orden) {
       return ordenRepository.save(orden);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Orden> findAllOrdenes() {
        return ordenRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Orden> findOrdenById(Long id) {
        return ordenRepository.findById(id);
        
    }

}
