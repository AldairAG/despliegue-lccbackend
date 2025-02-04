package com.example.lccbackend.lccbackend.model.model;

public class NewUser {
    private String username;
    private String email;
    private String password;
    private String referido;
    private String telefono;
    private String lada;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public String getReferido() {
        return referido;
    }
    public void setReferido(String referido) {
        this.referido = referido;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getLada() {
        return lada;
    }
    public void setLada(String lada) {
        this.lada = lada;
    }
    
}
