-- Ses Eşleştirme Oyunları
INSERT INTO oyun_icerik (id, oyun_tipi, hedef_veri, secenekler_json, dogru_cevap, gosterim_isimleri_json) 
VALUES 
(1, 'AUDIO_MATCH', 'kopek.mp3', '["kopek.png", "kedi.png", "kus.png", "inek.png"]', 'kopek.png', '["Köpek", "Kedi", "Kuş", "İnek"]'),
(2, 'AUDIO_MATCH', 'kedi.mp3', '["kedi.png", "kopek.png", "fare.png", "balik.png"]', 'kedi.png', '["Kedi", "Köpek", "Fare", "Balık"]'),
(3, 'AUDIO_MATCH', 'kus.mp3', '["kus.png", "tavuk.png", "papagan.png", "karga.png"]', 'kus.png', '["Kuş", "Tavuk", "Papağan", "Karga"]');

-- Görsel Eşleştirme Oyunları
INSERT INTO oyun_icerik (id, oyun_tipi, hedef_veri, secenekler_json, dogru_cevap, gosterim_isimleri_json)
VALUES
(4, 'VISUAL_MATCH', 'top_mavi.png', '["top_mavi.png", "top_kirmizi.png", "kutu_mavi.png", "araba_mavi.png"]', 'top_mavi.png', '["Mavi Top", "Kırmızı Top", "Mavi Kutu", "Mavi Araba"]'),
(5, 'VISUAL_MATCH', 'elma_kirmizi.png', '["elma_kirmizi.png", "elma_yesil.png", "armut.png", "muz.png"]', 'elma_kirmizi.png', '["Kırmızı Elma", "Yeşil Elma", "Armut", "Muz"]'),
(6, 'VISUAL_MATCH', 'araba_sari.png', '["araba_sari.png", "araba_mavi.png", "otobus_sari.png", "bisiklet.png"]', 'araba_sari.png', '["Sarı Araba", "Mavi Araba", "Sarı Otobüs", "Bisiklet"]');

-- Sıralama Oyunları
INSERT INTO oyun_icerik (id, oyun_tipi, hedef_veri, secenekler_json, dogru_cevap, gosterim_isimleri_json)
VALUES
(7, 'SEQUENCE', 'civciv_hikayesi', '["catlak.png", "civciv.png", "yumurta.png"]', '["yumurta.png", "catlak.png", "civciv.png"]', '["Çatlak Yumurta", "Civciv", "Yumurta"]'),
(8, 'SEQUENCE', 'agac_hikayesi', '["agac.png", "cicek.png", "tohum.png"]', '["tohum.png", "cicek.png", "agac.png"]', '["Ağaç", "Çiçek", "Tohum"]'),
(9, 'SEQUENCE', 'kelebek_hikayesi', '["kelebek.png", "kozalak.png", "tirtiL.png"]', '["tirtiL.png", "kozalak.png", "kelebek.png"]', '["Kelebek", "Koza", "Tırtıl"]');

