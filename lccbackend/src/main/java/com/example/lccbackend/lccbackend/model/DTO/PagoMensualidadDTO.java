package com.example.lccbackend.lccbackend.model.DTO;

import java.util.Date;

public class PagoMensualidadDTO {
    private Float wallet_div;
    private Date mensualidad;
    private String referido;
    private String username;

    public PagoMensualidadDTO(Float wallet_div, Date mensualidad, String referido, String username) {
        this.wallet_div = wallet_div;
        this.mensualidad = mensualidad;
        this.referido = referido;
        this.username = username;
    }

    public Float getWallet_div() {
        return wallet_div;
    }

    public void setWallet_div(Float wallet_div) {
        this.wallet_div = wallet_div;
    }

    public Date getMensualidad() {
        return mensualidad;
    }

    public void setMensualidad(Date mensualidad) {
        this.mensualidad = mensualidad;
    }

    public String getReferido() {
        return referido;
    }

    public void setReferido(String referido) {
        this.referido = referido;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    

    
}
