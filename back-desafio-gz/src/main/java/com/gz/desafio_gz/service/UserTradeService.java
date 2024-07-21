package com.gz.desafio_gz.service;

import java.time.LocalDate;
import java.time.Month;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public List<UserTrade> findAllPaginado(int page, int qtd) {
        PageRequest pageRequest = PageRequest.of(
                page,
                qtd,
                Sort.Direction.DESC,
                "data");
        Page<UserTrade> pagerProcessos = userTradeRepositoryRepository.findAll(pageRequest);
        return pagerProcessos.getContent();
    }

    public Long listarQtdTotal() {
        return userTradeRepositoryRepository.listarQtdTotal();
    }

    public List<UserTrade> listarPorInstrumenteeData(String instrument, String date, int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
        List<Integer> detData = Arrays.asList(date.split("-")).stream().map(a -> Integer.parseInt(a)).toList();
        LocalDate dataPesquisa = LocalDate.of(detData.get(0), Month.of(detData.get(1)), detData.get(2));
        Page<UserTrade> userTradesPage = userTradeRepositoryRepository.listarPorInstrumenteeData(instrument,
                dataPesquisa,
                pageRequest);
        return userTradesPage.getContent();
    }
}
