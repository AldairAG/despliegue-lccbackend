package com.example.lccbackend.lccbackend.model.DTO;

public class ICDTO {
    private Float wallet;
    private Float staterpack;
    private String username;
    private Long ic_id;

    public ICDTO(Float wallet, Float staterpack, String username,Long ic_id) {
        this.wallet = wallet;
        this.staterpack = staterpack;
        this.username = username;
        this.ic_id = ic_id;
    }

    public Float getWallet() {
        return wallet;
    }

    public void setWallet(Float wallet) {
        this.wallet = wallet;
    }

    public Float getStaterpack() {
        return staterpack;
    }

    public void setStaterpack(Float staterpack) {
        this.staterpack = staterpack;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getIc_id() {
        return ic_id;
    }

    public void setIc_id(Long ic_id) {
        this.ic_id = ic_id;
    }

    

    
}
