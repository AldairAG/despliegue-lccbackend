package com.example.lccbackend.lccbackend.model.ecomerceEntities;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ordenes")
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String estado;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date fecha;
    private String numeroOrder;
    private String numeroRastreo;
    private String username;
    private List<String> productos;
    private Float total;

    {
        Calendar calendar = Calendar.getInstance();
        this.fecha = calendar.getTime();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getNumeroOrder() {
        return numeroOrder;
    }

    public void setNumeroOrder(String numeroOrder) {
        this.numeroOrder = numeroOrder;
    }

    public String getNumeroRastreo() {
        return numeroRastreo;
    }

    public void setNumeroRastreo(String numeroRastreo) {
        this.numeroRastreo = numeroRastreo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getProductos() {
        return productos;
    }

    public void setProductos(List<String> productos) {
        this.productos = productos;
    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

}
