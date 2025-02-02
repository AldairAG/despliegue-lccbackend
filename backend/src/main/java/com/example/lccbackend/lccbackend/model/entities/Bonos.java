package com.example.lccbackend.lccbackend.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
@Table(name = "bonos")
public class Bonos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bonos_id;
    private Float fast_track=0f; 
    private Float ref_direct=0f;
    private Float matching=0f;
    private Float rango_res=0f;
    private Float membresia_mensual=0f;
    private Float dividendo_diario=0f;
    private int update_st=0;
    private int contador_ft_bronce=0;
    private int contador_ft_silver=0;

    @OneToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    @JsonBackReference
    private Wallet wallet;

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public Long getBonos_id() {
        return bonos_id;
    }

    public void setBonos_id(Long bonos_id) {
        this.bonos_id = bonos_id;
    }

    public Float getFast_track() {
        return fast_track;
    }

    public void setFast_track(Float fast_track) {
        this.fast_track = fast_track;
    }

    public Float getRef_direct() {
        return ref_direct;
    }

    public void setRef_direct(Float ref_direct) {
        this.ref_direct = ref_direct;
    }

    public Float getMatching() {
        return matching;
    }

    public void setMatching(Float matching) {
        this.matching = matching;
    }

    public Float getRango_res() {
        return rango_res;
    }

    public void setRango_res(Float rango_res) {
        this.rango_res = rango_res;
    }

    public Float getMembresia_mensual() {
        return membresia_mensual;
    }

    public void setMembresia_mensual(Float membresia_mensual) {
        this.membresia_mensual = membresia_mensual;
    }

    public Float getDividendo_diario() {
        return dividendo_diario;
    }

    public void setDividendo_diario(Float dividendo_diario) {
        this.dividendo_diario = dividendo_diario;
    }

    public int getUpdate_st() {
        return update_st;
    }

    public void setUpdate_st(int update_st) {
        this.update_st = update_st;
    }

    public int getContador_ft_bronce() {
        return contador_ft_bronce;
    }

    public void setContador_ft_bronce(int contador_ft_bronce) {
        this.contador_ft_bronce = contador_ft_bronce;
    }

    public int getContador_ft_silver() {
        return contador_ft_silver;
    }

    public void setContador_ft_silver(int contador_ft_silver) {
        this.contador_ft_silver = contador_ft_silver;
    }

}
