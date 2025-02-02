package com.example.lccbackend.lccbackend.helpers.objects;

public class Referido {
    private String username;
    private Float staterpack;

    public Referido(String username, Float staterpack) {
        this.username = username;
        this.staterpack = staterpack;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public Float getStaterpack() {
        return staterpack;
    }
    public void setStaterpack(Float staterpack) {
        this.staterpack = staterpack;
    }
}
