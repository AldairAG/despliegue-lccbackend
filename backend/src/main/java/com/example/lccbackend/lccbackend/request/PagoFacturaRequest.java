package com.example.lccbackend.lccbackend.request;

public class PagoFacturaRequest {
    private Float monto;
    private String wallet;
    private String usernameBeneficiario;
    private String usernameBenefactor;

    public PagoFacturaRequest(Float monto, String wallet, String usernameBeneficiario, String usernameBenefactor) {
        this.monto = monto;
        this.wallet = wallet;
        this.usernameBeneficiario = usernameBeneficiario;
        this.usernameBenefactor = usernameBenefactor;
    }

    public Float getMonto() {
        return monto;
    }

    public void setMonto(Float monto) {
        this.monto = monto;
    }

    public String getWallet() {
        return wallet;
    }

    public void setWallet(String wallet) {
        this.wallet = wallet;
    }

    public String getUsernameBeneficiario() {
        return usernameBeneficiario;
    }

    public void setUsernameBeneficiario(String usernameBeneficiario) {
        this.usernameBeneficiario = usernameBeneficiario;
    }

    public String getUsernameBenefactor() {
        return usernameBenefactor;
    }

    public void setUsernameBenefactor(String usernameBenefactor) {
        this.usernameBenefactor = usernameBenefactor;
    }

}