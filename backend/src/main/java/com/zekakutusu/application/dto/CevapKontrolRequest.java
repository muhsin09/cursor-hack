package com.zekakutusu.application.dto;

import jakarta.validation.constraints.NotNull;

public record CevapKontrolRequest(
    @NotNull(message = "Oyun ID boş olamaz")
    Long oyunId,
    
    @NotNull(message = "Kullanıcı cevabı boş olamaz")
    String kullaniciCevabi
) {}

