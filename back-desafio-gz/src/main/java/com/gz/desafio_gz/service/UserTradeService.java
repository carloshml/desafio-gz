package com.gz.desafio_gz.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gz.desafio_gz.entity.UserTrade;
import com.gz.desafio_gz.repository.UserTradeRepository;

@Service
public class UserTradeService {

    UserTradeRepository userTradeRepositoryRepository;

    public UserTradeService(UserTradeRepository iqr) {
        userTradeRepositoryRepository = iqr;
    }

    public UserTrade getById(Long id) {
        var intrumQuote = userTradeRepositoryRepository.findById(id);
        return intrumQuote.get();
    }

    public List<UserTrade> getAll() {
        return userTradeRepositoryRepository.findAll();
    }

    public List<UserTrade> findAllPaginado(PageRequest pageRequest) {
        Page<UserTrade> pagerProcessos = userTradeRepositoryRepository.findAll(pageRequest);
        return pagerProcessos.getContent();
    }

    public Long listarQtdTotal() {
        return userTradeRepositoryRepository.listarQtdTotal();
    }

}
