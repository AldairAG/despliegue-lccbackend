package com.example.lccbackend.lccbackend.model.DTO;

public class RangoResDTO {
    private int rango;
    private String username;

    public RangoResDTO(int rango, String username) {
        this.rango = rango;
        this.username = username;
    }
    public int getRango() {
        return rango;
    }
    public void setRango(int rango) {
        this.rango = rango;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
