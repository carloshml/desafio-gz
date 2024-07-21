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

    @Query("select a from UserTrade a where a.instrument like :instrument  and   a.data =  :date order by instrument  ")
    Page<UserTrade> listarPorInstrumenteeData(String instrument, LocalDate date, PageRequest pageRequest);

    @Query("select count(*)  from UserTrade a where a.instrument like :instrument  and   a.data =  :date ")
    Long listarPorInstrumenteeDataTotal(String instrument, LocalDate date);

    @Query("select distinct(instrument) from UserTrade group by  instrument ")
    Optional<List<String>> listarAcoesNegociadas();

}