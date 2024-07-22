package com.gz.desafio_gz.dto;

import java.math.BigDecimal;

public class SomatorioResponse {
    private String instrument;
    private BigDecimal valorTotalCompra;
    private BigDecimal valorTotalVenda;
    private Long quantidade;

   
    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    
    public BigDecimal getValorTotalCompra() {
        return valorTotalCompra;
    }

    public void setValorTotalCompra(BigDecimal valorTotalCompra) {
        this.valorTotalCompra = valorTotalCompra;
    }

   
    public BigDecimal getValorTotalVenda() {
        return valorTotalVenda;
    }

    public void setValorTotalVenda(BigDecimal valorTotalVenda) {
        this.valorTotalVenda = valorTotalVenda;
    }

 
    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

}
