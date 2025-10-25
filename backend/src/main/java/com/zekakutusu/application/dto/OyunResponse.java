package com.zekakutusu.application.dto;

import java.util.List;

public record OyunResponse(
    Long id,
    String hedefVeri,
    List<String> secenekler
) {}

