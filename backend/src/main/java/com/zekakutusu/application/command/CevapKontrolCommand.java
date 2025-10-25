package com.zekakutusu.application.command;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zekakutusu.application.dto.CevapKontrolRequest;
import com.zekakutusu.application.dto.CevapKontrolResponse;
import com.zekakutusu.domain.model.OyunIcerik;
import com.zekakutusu.domain.repository.OyunIcerikRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CevapKontrolCommand {
    
    private final OyunIcerikRepository oyunIcerikRepository;
    private final ObjectMapper objectMapper;
    
    public CevapKontrolResponse execute(CevapKontrolRequest request) {
        OyunIcerik oyun = oyunIcerikRepository.findById(request.oyunId())
            .orElseThrow(() -> new RuntimeException("Oyun bulunamadı: " + request.oyunId()));
        
        boolean dogru = cevapKontrolEt(oyun, request.kullaniciCevabi());
        
        String mesaj = dogru ? "Harika! Doğru cevap! 🎉" : "Tekrar dene! 🔄";
        
        return new CevapKontrolResponse(dogru, mesaj);
    }
    
    private boolean cevapKontrolEt(OyunIcerik oyun, String kullaniciCevabi) {
        String dogruCevap = oyun.getDogruCevap();
        
        // SEQUENCE tipi için array karşılaştırması
        if (dogruCevap.startsWith("[")) {
            try {
                List<String> dogruListe = objectMapper.readValue(
                    dogruCevap, 
                    new TypeReference<List<String>>() {}
                );
                List<String> kullaniciListe = objectMapper.readValue(
                    kullaniciCevabi, 
                    new TypeReference<List<String>>() {}
                );
                return dogruListe.equals(kullaniciListe);
            } catch (Exception e) {
                return false;
            }
        }
        
        // Basit string karşılaştırması (AUDIO_MATCH ve VISUAL_MATCH için)
        return dogruCevap.equals(kullaniciCevabi);
    }
}

