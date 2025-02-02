package com.example.lccbackend.lccbackend.model.DTO;

public class BonoMensualidad {
    private String referido;
    private Float membresia_mensual;
    private Float ganancia_total;
    private Float wallet_com;

    public BonoMensualidad(String referido, Float membresia_mensual,
            Float ganancia_total, Float wallet_com) {
        this.referido = referido;
        this.membresia_mensual = membresia_mensual;
        this.ganancia_total = ganancia_total;
        this.wallet_com = wallet_com;
    }

    public String getReferido() {
        return referido;
    }

    public void setReferido(String referido) {
        this.referido = referido;
    }

    public Float getMembresia_mensual() {
        return membresia_mensual;
    }

    public void setMembresia_mensual(Float membresia_mensual) {
        this.membresia_mensual = membresia_mensual;
    }

    public Float getGanancia_total() {
        return ganancia_total;
    }

    public void setGanancia_total(Float ganancia_total) {
        this.ganancia_total = ganancia_total;
    }

    public Float getWallet_com() {
        return wallet_com;
    }

    public void setWallet_com(Float wallet_com) {
        this.wallet_com = wallet_com;
    }

}
