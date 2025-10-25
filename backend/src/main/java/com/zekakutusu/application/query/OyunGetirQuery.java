package com.zekakutusu.application.query;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zekakutusu.application.dto.OyunResponse;
import com.zekakutusu.domain.enums.OyunTipi;
import com.zekakutusu.domain.model.OyunIcerik;
import com.zekakutusu.domain.repository.OyunIcerikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OyunGetirQuery {
    
    private final OyunIcerikRepository oyunIcerikRepository;
    private final ObjectMapper objectMapper;
    private final Random random = new Random();
    
    public OyunResponse execute(OyunTipi oyunTipi) {
        List<OyunIcerik> oyunlar = oyunIcerikRepository.findByOyunTipi(oyunTipi);
        
        if (oyunlar.isEmpty()) {
            throw new RuntimeException("Bu oyun tipi için veri bulunamadı: " + oyunTipi);
        }
        
        // Rastgele bir oyun seç
        OyunIcerik oyun = oyunlar.get(random.nextInt(oyunlar.size()));
        
        // JSON string'i List'e çevir
        List<String> secenekler;
        try {
            secenekler = objectMapper.readValue(
                oyun.getSeceneklerJson(), 
                new TypeReference<List<String>>() {}
            );
        } catch (Exception e) {
            throw new RuntimeException("Seçenekler parse edilemedi", e);
        }
        
        // Seçenekleri karıştır (doğru cevap her zaman farklı sırada olsun)
        Collections.shuffle(secenekler);
        
        return new OyunResponse(
            oyun.getId(),
            oyun.getHedefVeri(),
            secenekler
        );
    }
}

