package com.gz.desafio_gz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gz.desafio_gz.entity.InstrumentQuote;


@Repository
public interface InstrumentQuoteRepository extends JpaRepository<InstrumentQuote, Long> {

    @Query("select count(*) from InstrumentQuote")
    Long listarQtdTotal();

}
