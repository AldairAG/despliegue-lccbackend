package com.example.lccbackend.lccbackend.services.InteresCompuesto;

import java.util.List;
import java.util.Optional;

import com.example.lccbackend.lccbackend.model.DTO.ICDTO;
import com.example.lccbackend.lccbackend.model.entities.InteresCompuesto;

public interface InteresCompuestoService {
    InteresCompuesto findById(Long id);

    InteresCompuesto updateInteresCompuesto(InteresCompuesto interesCompuesto);

    List<ICDTO> findDataForIcDiv();

    List<ICDTO> findDataForIcCom();

    Optional<InteresCompuesto> findIcById(Long id);
}
