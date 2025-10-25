# 🎮 Zeka Kutusu (MindBox)

Okul öncesi (3-6 yaş) çocuklar için temel bilişsel becerileri geliştiren 3-in-1 dijital aktivite platformu.

## 📋 Proje Yapısı

```
cursor-hack/
├── backend/          # Spring Boot + H2 (Java 21)
│   ├── src/main/
│   │   ├── java/com/zekakutusu/
│   │   │   ├── domain/           # Entity, Repository, Enum
│   │   │   ├── application/      # Command, Query, DTO
│   │   │   ├── presentation/     # Controller
│   │   │   └── infrastructure/   # Config, Exception
│   │   └── resources/
│   │       ├── static/media/     # Resim ve ses dosyaları
│   │       ├── application.yml
│   │       └── data.sql
│   └── pom.xml
│
└── frontend/         # Next.js + TypeScript + TailwindCSS
    ├── app/
    │   ├── page.tsx              # Lobi (Ana Menü)
    │   └── oyun/[tip]/page.tsx   # Dinamik oyun sayfası
    ├── components/
    │   └── ui/feedback-overlay.tsx
    ├── lib/
    │   └── api-client.ts
    └── types/
        └── oyun.ts
```

## 🎯 Özellikler

### 3 Oyun Modülü

1. **🎧 Ses Eşleştirme** - Sesi dinle, doğru resmi bul
2. **👁️ Görsel Eşleştirme** - Aynı resmi bul
3. **📚 Hikaye Sıralama** - Olayları doğru sıraya koy

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Java 21 (veya Maven wrapper ile)
- Node.js 18+
- npm veya yarn

### Backend Kurulumu

```bash
cd backend

# Maven wrapper ile çalıştır (Java kurulu değilse)
./mvnw spring-boot:run

# Veya Maven kuruluysa
mvn spring-boot:run
```

Backend http://localhost:8080 adresinde çalışacak.

**H2 Console:** http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:zekakutusu`
- Username: `sa`
- Password: (boş)

### Frontend Kurulumu

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev
```

Frontend http://localhost:3000 adresinde çalışacak.

## 📁 Medya Dosyaları

Medya dosyaları `backend/src/main/resources/static/media/` klasörüne eklenmelidir:

### Ses Dosyaları (`/media/audio/`)
- kopek.mp3
- kedi.mp3
- kus.mp3
- inek.mp3

### Resim Dosyaları (`/media/images/`)

**Hayvanlar:**
- kopek.png, kedi.png, kus.png, inek.png, fare.png, balik.png
- tavuk.png, papagan.png, karga.png

**Nesneler:**
- top_mavi.png, top_kirmizi.png, kutu_mavi.png, araba_mavi.png
- elma_kirmizi.png, elma_yesil.png, armut.png, muz.png
- araba_sari.png, otobus_sari.png, bisiklet.png

**Hikayeler:**
- yumurta.png, catlak.png, civciv.png (Civciv hikayesi)
- tohum.png, cicek.png, agac.png (Ağaç hikayesi)
- tirtiL.png, kozalak.png, kelebek.png (Kelebek hikayesi)

## 🛠️ Teknoloji Stack

### Backend
- **Framework:** Spring Boot 3.2+
- **Dil:** Java 21
- **Veritabanı:** H2 (In-memory)
- **Mimari:** DDD (Domain-Driven Design) + CQS (Command-Query Separation)
- **Araçlar:** Lombok, Jackson

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Styling:** TailwindCSS
- **HTTP Client:** Fetch API

## 🎮 API Endpoints

### GET `/api/oyun/{oyunTipi}`
Rastgele bir oyun verisi döner.

**Oyun Tipleri:**
- `ses-eslestirme` → AUDIO_MATCH
- `gorsel-eslestirme` → VISUAL_MATCH
- `siralama` → SEQUENCE

**Response:**
```json
{
  "id": 1,
  "hedefVeri": "kopek.mp3",
  "secenekler": ["kopek.png", "kedi.png", "kus.png", "inek.png"]
}
```

### POST `/api/oyun/kontrol`
Kullanıcı cevabını kontrol eder.

**Request:**
```json
{
  "oyunId": 1,
  "kullaniciCevabi": "kopek.png"
}
```

**Response:**
```json
{
  "dogru": true,
  "mesaj": "Harika! Doğru cevap! 🎉"
}
```

## 🎨 İsimlendirme Kuralı

Projede **Türkçe isimlendirme** ama **İngilizce karakterler** kullanılıyor:
- ç → c (cevap, civciv)
- ğ → g (dogru)
- ı → i (siralama)
- ö → o (gorsel)
- ş → s (eslestirme)
- ü → u (urun)

## 📝 Geliştirme Notları

- Backend önce başlatılmalı (Frontend API bağlantısı için)
- CORS localhost:3000 için açık
- H2 veritabanı her restart'ta sıfırlanır (data.sql'den yüklenir)
- Medya dosyaları static olarak serve edilir
- Tüm validasyon mesajları Türkçe

## 🐛 Troubleshooting

**Backend çalışmıyor:**
- Java 21 kurulu olduğundan emin olun: `java --version`
- Maven wrapper kullanın: `./mvnw spring-boot:run`

**Frontend API'ye bağlanamıyor:**
- Backend'in çalıştığından emin olun: http://localhost:8080
- CORS ayarlarını kontrol edin

**Resim/Ses dosyaları yüklenmiyor:**
- Dosyaların `backend/src/main/resources/static/media/` altında olduğundan emin olun
- Backend'i restart edin

## 👥 Takım

2 kişilik full-stack takım için 3 saatlik hackathon projesi.

## 📄 Lisans

MIT License

