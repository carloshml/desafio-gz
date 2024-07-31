package com.gz.desafio_gz.dto;

import java.math.BigDecimal;
import java.math.RoundingMode;

import com.gz.desafio_gz.entity.InstrumentQuote;

public class SomatorioResponse {
    private String instrument;
    private BigDecimal valorTotalCompra;
    private BigDecimal valorTotalVenda;
    private Long quantidadeCompra;
    private Long quantidadeVenda;
    private Long quantidadeAtual;
    private BigDecimal valorCompra;
    private BigDecimal precoMedioCompra;
    private BigDecimal precoMercado;
    private BigDecimal vendaMercado;
    private BigDecimal rendimento;
    private BigDecimal rendimentoPercent;

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

    public Long getQuantidadeVenda() {
        return quantidadeVenda;
    }

    public void setQuantidadeVenda(Long quantidadeVenda) {
        this.quantidadeVenda = quantidadeVenda;
    }

    public Long getQuantidadeCompra() {
        return quantidadeCompra;
    }

    public void setQuantidadeCompra(Long quantidadeCompra) {
        this.quantidadeCompra = quantidadeCompra;
    }

    public Long getQuantidadeAtual() {
        return quantidadeAtual;
    }

    public void setQuantidadeAtual(Long quantidadeAtual) {
        this.quantidadeAtual = quantidadeAtual;
    }

    public BigDecimal getValorCompra() {
        return valorCompra;
    }

    public void setValorCompra(BigDecimal valorCompra) {
        this.valorCompra = valorCompra;
    }

    public BigDecimal getPrecoMedioCompra() {
        return precoMedioCompra;
    }

    public void setPrecoMedioCompra(BigDecimal precoMedioCompra) {
        this.precoMedioCompra = precoMedioCompra;
    }

    public BigDecimal getPrecoMercado() {
        return precoMercado;
    }

    public void setPrecoMercado(BigDecimal precoMercado) {
        this.precoMercado = precoMercado;
    }

    public BigDecimal getVendaMercado() {
        return vendaMercado;
    }

    public void setVendaMercado(BigDecimal vendaMercado) {
        this.vendaMercado = vendaMercado;
    }

    public BigDecimal getRendimento() {
        return rendimento;
    }

    public void setRendimento(BigDecimal rendimento) {
        this.rendimento = rendimento;
    }

    public BigDecimal getRendimentoPercent() {
        return rendimentoPercent;
    }

    public void setRendimentoPercent(BigDecimal rendimentoPercent) {
        this.rendimentoPercent = rendimentoPercent;
    }

    public SomatorioResponse calcularValores(Object[] obj, InstrumentQuote result) {
        this.setInstrument("" + obj[0]);
        this.setValorTotalCompra(new BigDecimal("" + obj[1]));
        this.setValorTotalVenda(new BigDecimal("" + obj[2]));
        this.setQuantidadeCompra(Long.valueOf("" + obj[3]));
        this.setQuantidadeVenda(Long.valueOf("" + obj[4]));
        this.quantidadeAtual = this.quantidadeCompra - this.quantidadeVenda;
        if (this.quantidadeCompra != 0L && this.valorTotalCompra.compareTo(BigDecimal.ZERO) != 0) {
            this.precoMedioCompra = this.valorTotalCompra.divide(new BigDecimal(this.quantidadeCompra), 2,
                    RoundingMode.HALF_UP);
        }

        if (this.precoMedioCompra != null) {
            this.valorCompra = this.precoMedioCompra.multiply(new BigDecimal(this.quantidadeAtual));
        }

        if (result != null) {
            this.precoMercado = result.getPrice();
            this.vendaMercado = this.precoMercado.multiply(new BigDecimal(this.quantidadeAtual));
            if (this.valorCompra != null) {
                this.rendimento = this.vendaMercado.subtract(this.valorCompra);
            }
            this.rendimentoPercent = (this.rendimento != null && this.valorTotalCompra != null)
                    ? rendimento.divide(this.valorTotalCompra.divide(new BigDecimal(100), 2, RoundingMode.HALF_UP), 2,
                            RoundingMode.HALF_UP)
                    : BigDecimal.ZERO;
        }
        return this;
    }

}
