package com.example.lccbackend.lccbackend.model.entities;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "wallet")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wallet_id;
    private Float wallet_div = 0.0f;
    private Float wallet_com = 0.0f;
    private Float wallet_ec = 0.0f;
    private String wallet_address;
    private Float retiro_total = 0.0f;
    private Float ganancia_total = 0.0f;
    private Float staterpack = 0.0f;
    private String nip="";
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    private Date fecha_ingreso = new Date();
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @Temporal(TemporalType.DATE)
    private Date mensualidad;
    private Integer rango = 0;
    @Column(nullable = false)
    private String referido;

    @OneToOne
    @JoinColumn(name = "id_user", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    @OneToOne(mappedBy = "wallet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Bonos bonos;

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true)
    @JsonManagedReference
    private List<InteresCompuesto> interesCompuesto;

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Permiso> permisos = new ArrayList<>();

    @OneToOne(mappedBy = "wallet", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true, orphanRemoval = true)
    @JsonManagedReference
    private Deuda deuda;

    {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, 1); // Sumar un mes a la fecha actual
        this.mensualidad = calendar.getTime();
    }

    /////////////// getters y setters////////////

    public Float getStaterpack() {
        return staterpack;
    }

    public void setStaterpack(Float staterpack) {
        this.staterpack = staterpack;
    }

    public Date getMensualidad() {
        return mensualidad;
    }

    public void setMensualidad(Date mensualidad) {
        this.mensualidad = mensualidad;
    }

    public List<Permiso> getPermisos() {
        return permisos;
    }

    public void setPermisos(List<Permiso> permisos) {
        this.permisos = permisos;
    }

    public Deuda getDeuda() {
        return deuda;
    }

    public void setDeuda(Deuda deuda) {
        this.deuda = deuda;
    }

    public Bonos getBonos() {
        return bonos;
    }

    public void setBonos(Bonos bonos) {
        this.bonos = bonos;
    }

    public Long getWallet_id() {
        return wallet_id;
    }

    public void setWallet_id(Long wallet_id) {
        this.wallet_id = wallet_id;
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

    public Float getWallet_ec() {
        return wallet_ec;
    }

    public void setWallet_ec(Float wallet_ec) {
        this.wallet_ec = wallet_ec;
    }

    public String getWallet_address() {
        return wallet_address;
    }

    public void setWallet_address(String wallet_address) {
        this.wallet_address = wallet_address;
    }

    public Float getRetiro_total() {
        return retiro_total;
    }

    public void setRetiro_total(Float retiro_total) {
        this.retiro_total = retiro_total;
    }

    public Float getGanancia_total() {
        return ganancia_total;
    }

    public void setGanancia_total(Float ganancia_total) {
        this.ganancia_total = ganancia_total;
    }

    public Date getFecha_ingreso() {
        return fecha_ingreso;
    }

    public void setFecha_ingreso(Date fecha_ingreso) {
        this.fecha_ingreso = fecha_ingreso;
    }

    public Integer getRango() {
        return rango;
    }

    public void setRango(Integer rango) {
        this.rango = rango;
    }

    public String getReferido() {
        return referido;
    }

    public void setReferido(String referido) {
        this.referido = referido;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getNip() {
        return nip;
    }

    public void setNip(String nip) {
        this.nip = nip;
    }

    public List<InteresCompuesto> getInteresCompuesto() {
        return interesCompuesto;
    }

    public void setInteresCompuesto(List<InteresCompuesto> interesCompuesto) {
        this.interesCompuesto = interesCompuesto;
    }

    public void addInteresCompuesto(InteresCompuesto ic) {
        this.interesCompuesto.add(ic);
        ic.setWallet(this);
    }
    
    public void removeInteresCompuesto(InteresCompuesto ic) {
        this.interesCompuesto.remove(ic);
        ic.setWallet(null);
    }
    
}
