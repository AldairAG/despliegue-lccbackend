package com.example.lccbackend.lccbackend.request;

import java.util.Date;

public class IcRequest {
    private Long id;    
    private Long wallet_id;    
    private String tipo;
    private Boolean activo;
    private Date fecha_fin;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Long getWallet_id() {
        return wallet_id;
    }
    public void setWallet_id(Long wallet_id) {
        this.wallet_id = wallet_id;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public Boolean getActivo() {
        return activo;
    }
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
    public Date getFecha_fin() {
        return fecha_fin;
    }
    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }
    
    
}
