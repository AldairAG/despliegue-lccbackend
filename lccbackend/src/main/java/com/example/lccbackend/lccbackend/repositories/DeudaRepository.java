package com.example.lccbackend.lccbackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.lccbackend.lccbackend.model.entities.Deuda;

public interface DeudaRepository extends CrudRepository<Deuda, Long> {

    @Query("SELECT d FROM Deuda d JOIN d.wallet w WHERE w.wallet_id = :walletId")
    Optional<Deuda> findByWalletId(@Param("walletId") Long walletId);

    @Modifying
    @Query("UPDATE Deuda d SET d.deuda = :newDeuda WHERE d.deuda_id = :id")
    void updateDeuda(@Param("id") Long id, @Param("newDeuda") Float newDeuda);
}
