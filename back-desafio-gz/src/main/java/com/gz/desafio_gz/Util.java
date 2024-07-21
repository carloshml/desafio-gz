package com.gz.desafio_gz;

import java.time.LocalDate;
import java.time.Month;
import java.util.Arrays;
import java.util.List;


 
public class Util {

    public LocalDate stringToLocalDate(String date) {
        List<Integer> detData = Arrays.asList(date.split("-")).stream().map(a -> Integer.parseInt(a)).toList();
        return LocalDate.of(detData.get(0), Month.of(detData.get(1)), detData.get(2));
    }

}
