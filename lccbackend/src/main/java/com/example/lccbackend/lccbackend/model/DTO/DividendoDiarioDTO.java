package com.example.lccbackend.lccbackend.model.DTO;

public class DividendoDiarioDTO {
    private String username;
    private Float staterpack;
    private Float wallet_div;
    private Float dividendo_diario;
    private Float ganancia_total;

    public DividendoDiarioDTO(String username, Float staterpack, Float wallet_div, Float dividendo_diario,
            Float ganancia_total) {
        this.username = username;
        this.staterpack = staterpack;
        this.wallet_div = wallet_div;
        this.dividendo_diario = dividendo_diario;
        this.ganancia_total = ganancia_total;
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

    public Float getWallet_div() {
        return wallet_div;
    }

    public void setWallet_div(Float wallet_div) {
        this.wallet_div = wallet_div;
    }

    public Float getDividendo_diario() {
        return dividendo_diario;
    }

    public void setDividendo_diario(Float dividendo_diario) {
        this.dividendo_diario = dividendo_diario;
    }

    public Float getGanancia_total() {
        return ganancia_total;
    }

    public void setGanancia_total(Float ganancia_total) {
        this.ganancia_total = ganancia_total;
    }

}
