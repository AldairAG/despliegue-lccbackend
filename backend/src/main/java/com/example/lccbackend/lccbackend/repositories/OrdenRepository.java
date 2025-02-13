package com.example.lccbackend.lccbackend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lccbackend.lccbackend.model.ecomerceEntities.Orden;

public interface OrdenRepository extends JpaRepository<Orden,Long> {

    Optional<Orden> findById(Long id);

    List<Orden> findByEstado(String estado);


}
