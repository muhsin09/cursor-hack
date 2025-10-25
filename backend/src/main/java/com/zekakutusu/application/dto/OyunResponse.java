package com.zekakutusu.application.dto;

import java.util.List;

public record OyunResponse(
    Long id,
    String hedefVeri,
    String hedefVeriGosterimIsmi,
    List<String> secenekler,
    List<String> gosterimIsimleri
) {}

