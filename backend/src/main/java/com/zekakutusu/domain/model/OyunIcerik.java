package com.zekakutusu.domain.model;

import com.zekakutusu.domain.enums.OyunTipi;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "oyun_icerik")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OyunIcerik {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "oyun_tipi", nullable = false)
    private OyunTipi oyunTipi;
    
    @Column(name = "hedef_veri", nullable = false)
    private String hedefVeri;
    
    @Column(name = "secenekler_json", length = 1000, nullable = false)
    private String seceneklerJson;
    
    @Column(name = "dogru_cevap", length = 500, nullable = false)
    private String dogruCevap;
}

