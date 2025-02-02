package com.example.lccbackend.lccbackend.model.DTO;

public class BonoIgualacionDTO {
    private String username;
    private Float wallet_com;
    private Float ganancia_total;
    private Float matching;

    public BonoIgualacionDTO(String username, Float wallet_com, Float ganancia_total, Float matching) {
        this.username = username;
        this.wallet_com = wallet_com;
        this.ganancia_total = ganancia_total;
        this.matching = matching;
    }

    public Float getWallet_com() {
        return wallet_com;
    }

    public void setWallet_com(Float wallet_com) {
        this.wallet_com = wallet_com;
    }

    public Float getGanancia_total() {
        return ganancia_total;
    }

    public void setGanancia_total(Float ganancia_total) {
        this.ganancia_total = ganancia_total;
    }

    public Float getMatching() {
        return matching;
    }

    public void setMatching(Float matching) {
        this.matching = matching;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
