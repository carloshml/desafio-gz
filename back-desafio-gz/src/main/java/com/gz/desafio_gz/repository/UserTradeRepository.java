package com.gz.desafio_gz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gz.desafio_gz.entity.UserTrade;

@Repository
public interface UserTradeRepository extends JpaRepository<UserTrade, Long> {
    
    @Query("select count(*) from UserTrade")
    Long listarQtdTotal();

}