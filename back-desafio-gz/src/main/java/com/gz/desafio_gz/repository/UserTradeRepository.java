package com.gz.desafio_gz.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gz.desafio_gz.entity.UserTrade;

@Repository
public interface UserTradeRepository extends JpaRepository<UserTrade, Long> {

        @Query("select count(*) from UserTrade")
        Long listarQtdTotal();

        @Query("select a from UserTrade a where a.instrument like :instrument  and   a.data =  :date   ")
        Page<UserTrade> listarPorInstrumenteeData(String instrument, LocalDate date, PageRequest pageRequest);

        @Query("select count(*)  from UserTrade a where a.instrument like :instrument  and   a.data =  :date ")
        Long listarPorInstrumenteeDataTotal(String instrument, LocalDate date);

        @Query("select distinct(instrument) from UserTrade group by  instrument ")
        Optional<List<String>> listarAcoesNegociadas();

        @Query("SELECT "
                        + "     instrument, "
                        + "     SUM(CASE WHEN tipoOperacao = 'C' THEN valorTotal ELSE 0 END) AS valorTotalCompra,"
                        + "     SUM(CASE WHEN tipoOperacao = 'V' THEN valorTotal ELSE 0 END) AS valorTotalVenda,"
                        + "     SUM(CASE WHEN tipoOperacao = 'C' THEN quantidade ELSE 0 END) AS quantidadeCompra, "
                        + "     SUM(CASE WHEN tipoOperacao = 'V' THEN quantidade ELSE 0 END) AS quantidadeVenda"
                        + " FROM  UserTrade a "
                        + "   where   a.instrument  like :instrument     and a.data  <=  :date "
                        + "   GROUP BY    a.instrument  order by a.instrument ")
        List<Object[]> somatorioIntrumentDate(String instrument, LocalDate date);

        @Query("SELECT "
                        + "     instrument, "
                        + "     SUM(CASE WHEN tipoOperacao = 'C' THEN valorTotal ELSE 0 END) AS valorTotalCompra,"
                        + "     SUM(CASE WHEN tipoOperacao = 'V' THEN valorTotal ELSE 0 END) AS valorTotalVenda,"
                        + "     SUM(CASE WHEN tipoOperacao = 'C' THEN quantidade ELSE 0 END) AS quantidadeCompra, "
                        + "     SUM(CASE WHEN tipoOperacao = 'V' THEN quantidade ELSE 0 END) AS quantidadeVenda"
                        + " FROM  UserTrade a "
                        + "   where   a.instrument  like :instrument     and  a.data  >=  :dIni and   a.data  <=  :dFim "
                        + "   GROUP BY    a.instrument  order by a.instrument ")
        List<Object[]> somatorioIntrumentDateInicialDataFinal(String instrument, LocalDate dIni, LocalDate dFim);

        @Query("select a from UserTrade a where a.instrument like :instrument  and  a.data  >=  :dIni and   a.data  <=  :dFim    ")
        Page<UserTrade> listarPorInstrumenteeDateInicialDataFinal(String instrument, LocalDate dIni, LocalDate dFim,
                        PageRequest pageRequest);

        @Query("select count(*)  from UserTrade a where a.instrument like :instrument  and  a.data  >=  :dIni and   a.data  <=  :dFim    ")
        Long listarPorInstrumenteDateInicialDataFinalTotal(String instrument, LocalDate dIni, LocalDate dFim);

}