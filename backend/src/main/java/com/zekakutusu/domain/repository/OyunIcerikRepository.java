package com.zekakutusu.domain.repository;

import com.zekakutusu.domain.enums.OyunTipi;
import com.zekakutusu.domain.model.OyunIcerik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OyunIcerikRepository extends JpaRepository<OyunIcerik, Long> {
    
    List<OyunIcerik> findByOyunTipi(OyunTipi oyunTipi);
}

