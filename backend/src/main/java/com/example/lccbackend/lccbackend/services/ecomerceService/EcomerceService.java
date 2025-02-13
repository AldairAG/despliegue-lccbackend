package com.example.lccbackend.lccbackend.services.ecomerceService;

import java.util.List;
import java.util.Optional;

import com.example.lccbackend.lccbackend.model.ecomerceEntities.Orden;

public interface EcomerceService {
    Optional<Orden> editOrden(Long id,Orden orden);

    Orden crearOrden(Orden orden);

    List<Orden> findAllOrdenes();

    Optional<Orden> findOrdenById(Long id);
}
