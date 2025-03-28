package com.example.lccbackend.lccbackend.services.deuda;

import java.util.Optional;

import com.example.lccbackend.lccbackend.model.DTO.DeudaResponse;
import com.example.lccbackend.lccbackend.model.entities.Deuda;
import com.example.lccbackend.lccbackend.request.DeudaRequest;

public interface DeudaService {
    Deuda save(Deuda deuda);

    Deuda editar(DeudaRequest newDeuda,Deuda deuda);

    Optional<Deuda> getDeudaByWalletId(Long id);

    DeudaResponse existDeuda(Deuda deuda,Float bono,Long id);

    void updateDeuda(Long id,Float newDeuda);
}
