package com.zekakutusu.presentation.controller;

import com.zekakutusu.application.command.CevapKontrolCommand;
import com.zekakutusu.application.dto.CevapKontrolRequest;
import com.zekakutusu.application.dto.CevapKontrolResponse;
import com.zekakutusu.application.dto.OyunResponse;
import com.zekakutusu.application.query.OyunGetirQuery;
import com.zekakutusu.domain.enums.OyunTipi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/oyun")
@RequiredArgsConstructor
public class OyunController {
    
    private final OyunGetirQuery oyunGetirQuery;
    private final CevapKontrolCommand cevapKontrolCommand;
    
    @GetMapping("/{oyunTipi}")
    public ResponseEntity<OyunResponse> oyunGetir(@PathVariable String oyunTipi) {
        OyunTipi tip = oyunTipiDonustur(oyunTipi);
        OyunResponse response = oyunGetirQuery.execute(tip);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/kontrol")
    public ResponseEntity<CevapKontrolResponse> cevapKontrol(
        @Valid @RequestBody CevapKontrolRequest request
    ) {
        CevapKontrolResponse response = cevapKontrolCommand.execute(request);
        return ResponseEntity.ok(response);
    }
    
    private OyunTipi oyunTipiDonustur(String oyunTipi) {
        return switch (oyunTipi.toLowerCase()) {
            case "ses-eslestirme" -> OyunTipi.AUDIO_MATCH;
            case "gorsel-eslestirme" -> OyunTipi.VISUAL_MATCH;
            case "siralama" -> OyunTipi.SEQUENCE;
            default -> throw new RuntimeException("Geçersiz oyun tipi: " + oyunTipi);
        };
    }
}

