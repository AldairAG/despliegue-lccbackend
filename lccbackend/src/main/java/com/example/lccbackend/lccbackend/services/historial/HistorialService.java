package com.example.lccbackend.lccbackend.services.historial;

import java.util.List;

import com.example.lccbackend.lccbackend.model.entities.Historial;

public interface HistorialService {
    Historial save(Historial historial);
    
    List<Historial> findByTipo(String tipo,String username);

    List<Historial> findByAbono(String username);
}
