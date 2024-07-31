package com.gz.desafio_gz.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gz.desafio_gz.entity.InstrumentQuote;

@Repository
public interface InstrumentQuoteRepository extends JpaRepository<InstrumentQuote, Long> {

    @Query("select count(*) from InstrumentQuote")
    Long listarQtdTotal();

    @Query("select a from InstrumentQuote a where a.simbol like :simbol  and   a.date =  :date order by simbol")
    Optional<List<InstrumentQuote>> listarPorInstrumenteeDataTotal(String simbol, LocalDate date);

}
