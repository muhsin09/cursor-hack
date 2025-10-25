-- Ses Eşleştirme Oyunları
INSERT INTO oyun_icerik (id, oyun_tipi, hedef_veri, secenekler_json, dogru_cevap, gosterim_isimleri_json) 
VALUES 
(1, 'AUDIO_MATCH', 'kopek.mp3', '["kopek.png", "kedi.png", "kus.png", "inek.png"]', 'kopek.png', '["Köpek", "Kedi", "Kuş", "İnek"]'),
(2, 'AUDIO_MATCH', 'kedi.mp3', '["kedi.png", "kopek.png", "fare.png", "balik.png"]', 'kedi.png', '["Kedi", "Köpek", "Fare", "Balık"]'),
(3, 'AUDIO_MATCH', 'kus.mp3', '["kus.png", "tavuk.png", "papagan.png", "karga.png"]', 'kus.png', '["Kuş", "Tavuk", "Papağan", "Karga"]'),
(4, 'AUDIO_MATCH', 'inek.mp3', '["inek.png", "kopek.png", "kedi.png", "tavuk.png"]', 'inek.png', '["İnek", "Köpek", "Kedi", "Tavuk"]'),
(5, 'AUDIO_MATCH', 'tavuk.mp3', '["tavuk.png", "civciv.png", "papagan.png", "kus.png"]', 'tavuk.png', '["Tavuk", "Civciv", "Papağan", "Kuş"]');

-- Görsel Eşleştirme Oyunları
INSERT INTO oyun_icerik (id, oyun_tipi, hedef_veri, secenekler_json, dogru_cevap, gosterim_isimleri_json)
VALUES
(6, 'VISUAL_MATCH', 'top_mavi.png', '["top_mavi.png", "top_kirmizi.png", "kutu_mavi.png", "araba_mavi.png"]', 'top_mavi.png', '["Mavi Top", "Kırmızı Top", "Mavi Kutu", "Mavi Araba"]'),
(7, 'VISUAL_MATCH', 'elma_kirmizi.png', '["elma_kirmizi.png", "elma_yesil.png", "armut.png", "muz.png"]', 'elma_kirmizi.png', '["Kırmızı Elma", "Yeşil Elma", "Armut", "Muz"]'),
(8, 'VISUAL_MATCH', 'araba_sari.png', '["araba_sari.png", "araba_mavi.png", "otobus_sari.png", "bisiklet.png"]', 'araba_sari.png', '["Sarı Araba", "Mavi Araba", "Sarı Otobüs", "Bisiklet"]'),
(9, 'VISUAL_MATCH', 'kedi.png', '["kedi.png", "kopek.png", "fare.png", "balik.png"]', 'kedi.png', '["Kedi", "Köpek", "Fare", "Balık"]'),
(10, 'VISUAL_MATCH', 'cicek.png', '["cicek.png", "agac.png", "tohum.png", "kelebek.png"]', 'cicek.png', '["Çiçek", "Ağaç", "Tohum", "Kelebek"]');

-- Sıralama Oyunları
INSERT INTO oyun_icerik (id, oyun_tipi, hedef_veri, secenekler_json, dogru_cevap, gosterim_isimleri_json)
VALUES
(11, 'SEQUENCE', 'civciv_hikayesi', '["catlak.png", "civciv.png", "yumurta.png"]', '["yumurta.png", "catlak.png", "civciv.png"]', '["Çatlak Yumurta", "Civciv", "Yumurta"]'),
(12, 'SEQUENCE', 'agac_hikayesi', '["agac.png", "cicek.png", "tohum.png"]', '["tohum.png", "cicek.png", "agac.png"]', '["Ağaç", "Çiçek", "Tohum"]'),
(13, 'SEQUENCE', 'kelebek_hikayesi', '["kelebek.png", "kozalak.png", "tirtiL.png"]', '["tirtiL.png", "kozalak.png", "kelebek.png"]', '["Kelebek", "Koza", "Tırtıl"]'),
(14, 'SEQUENCE', 'araba_hikayesi', '["otobus_sari.png", "araba_sari.png", "bisiklet.png"]', '["bisiklet.png", "araba_sari.png", "otobus_sari.png"]', '["Sarı Otobüs", "Sarı Araba", "Bisiklet"]'),
(15, 'SEQUENCE', 'hayvan_hikayesi', '["tavuk.png", "civciv.png", "yumurta.png"]', '["yumurta.png", "civciv.png", "tavuk.png"]', '["Tavuk", "Civciv", "Yumurta"]');

