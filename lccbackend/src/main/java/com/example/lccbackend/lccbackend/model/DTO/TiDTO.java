package com.example.lccbackend.lccbackend.model.DTO;

public class TiDTO {
    private Float wallet_div;
    private Float wallet_com;
    public TiDTO(Float wallet_div, Float wallet_com) {
        this.wallet_div = wallet_div;
        this.wallet_com = wallet_com;
    }
    public Float getWallet_div() {
        return wallet_div;
    }
    public void setWallet_div(Float wallet_div) {
        this.wallet_div = wallet_div;
    }
    public Float getWallet_com() {
        return wallet_com;
    }
    public void setWallet_com(Float wallet_com) {
        this.wallet_com = wallet_com;
    }

    
}
