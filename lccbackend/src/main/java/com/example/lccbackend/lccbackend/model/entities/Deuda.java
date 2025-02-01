package com.example.lccbackend.lccbackend.model.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "deuda")
public class Deuda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deuda_id;
    private Float deuda=0f;
    private Float wallet_deuda=0f;

    @OneToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    @JsonBackReference
    private Wallet wallet;

    public Long getDeuda_id() {
        return deuda_id;
    }

    public void setDeuda_id(Long deuda_id) {
        this.deuda_id = deuda_id;
    }

    public Float getDeuda() {
        return deuda;
    }

    public void setDeuda(Float deuda) {
        this.deuda = deuda;
    }

    public Float getWallet_deuda() {
        return wallet_deuda;
    }

    public void setWallet_deuda(Float wallet_deuda) {
        this.wallet_deuda = wallet_deuda;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

}
