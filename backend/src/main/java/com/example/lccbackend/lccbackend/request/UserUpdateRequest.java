package com.example.lccbackend.lccbackend.request;

public class UserUpdateRequest {
    private String username;
    private String nombres;
    private String apellidos;
    private String lada;
    private String telefono;
    private String usdtWallet;

    public String getNombres() {
        return nombres;
    }
    public void setNombres(String nombres) {
        this.nombres = nombres;
    }
    public String getApellidos() {
        return apellidos;
    }
    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }
    public String getLada() {
        return lada;
    }
    public void setLada(String lada) {
        this.lada = lada;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getUsdtWallet() {
        return usdtWallet;
    }
    public void setUsdtWallet(String usdtWallet) {
        this.usdtWallet = usdtWallet;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    

}
