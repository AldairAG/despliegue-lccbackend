package com.example.lccbackend.lccbackend.model.model;

public class NewUser {
    private String username;
    private String email;
    private String password;
    private String referido;

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
}
