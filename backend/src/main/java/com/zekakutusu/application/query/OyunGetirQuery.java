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
        List<String> gosterimIsimleri;
        try {
            secenekler = objectMapper.readValue(
                oyun.getSeceneklerJson(), 
                new TypeReference<List<String>>() {}
            );
            
            // Gösterim isimlerini parse et
            if (oyun.getGosterimIsimleriJson() != null) {
                gosterimIsimleri = objectMapper.readValue(
                    oyun.getGosterimIsimleriJson(),
                    new TypeReference<List<String>>() {}
                );
            } else {
                // Eğer gösterim isimleri yoksa dosya isimlerini kullan
                gosterimIsimleri = secenekler.stream()
                    .map(s -> s.replace(".png", "").replace("_", " "))
                    .toList();
            }
        } catch (Exception e) {
            throw new RuntimeException("Seçenekler parse edilemedi", e);
        }
        
        // Hedef veri için gösterim ismini bul
        String hedefVeriGosterimIsmi;
        int hedefIndex = secenekler.indexOf(oyun.getHedefVeri());
        if (hedefIndex >= 0) {
            hedefVeriGosterimIsmi = gosterimIsimleri.get(hedefIndex);
        } else {
            // Hedef veri seçeneklerde yoksa dosya isminden oluştur
            hedefVeriGosterimIsmi = oyun.getHedefVeri()
                .replace(".png", "")
                .replace(".mp3", "")
                .replace("_", " ");
        }
        
        // Seçenekleri ve gösterim isimlerini aynı sırada karıştır
        java.util.List<Integer> indices = new java.util.ArrayList<>();
        for (int i = 0; i < secenekler.size(); i++) {
            indices.add(i);
        }
        Collections.shuffle(indices);
        
        List<String> karisikSecenekler = new java.util.ArrayList<>();
        List<String> karisikGosterimIsimleri = new java.util.ArrayList<>();
        for (int i : indices) {
            karisikSecenekler.add(secenekler.get(i));
            karisikGosterimIsimleri.add(gosterimIsimleri.get(i));
        }
        
        return new OyunResponse(
            oyun.getId(),
            oyun.getHedefVeri(),
            hedefVeriGosterimIsmi,
            karisikSecenekler,
            karisikGosterimIsimleri
        );
    }
}

