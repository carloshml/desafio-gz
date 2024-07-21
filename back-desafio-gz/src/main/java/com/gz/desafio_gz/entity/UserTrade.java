package com.gz.desafio_gz.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_trade")
public class UserTrade implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;
    private String tipoOperacao;
    private String mercado;
    private String prazo;
    private String instrument; 
    private String especificacao;
    private int quantidade;
    private BigDecimal preco;
    private BigDecimal valorTotal;

    public UserTrade() {
    }

    public Long getId() {
        return id;
    }

    public LocalDate getData() {
        return data;
    }

    public String getTipoOperacao() {
        return tipoOperacao;
    }

    public String getMercado() {
        return mercado;
    }

    public String getPrazo() {
        return prazo;
    }

    public String getInstrument() {
        return instrument;
    }

    public String getEspecificacao() {
        return especificacao;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    } 
  
    public void setId(Long id) {
        this.id = id;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public void setTipoOperacao(String tipoOperacao) {
        this.tipoOperacao = tipoOperacao;
    }

    public void setMercado(String mercado) {
        this.mercado = mercado;
    }

    public void setPrazo(String prazo) {
        this.prazo = prazo;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public void setEspecificacao(String especificacao) {
        this.especificacao = especificacao;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

}
