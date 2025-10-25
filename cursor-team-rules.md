# Takım Geliştirme Kuralları

## 1. Genel Prensipler

### 1.1 İsimlendirme Konvansiyonları
- **TypeScript/Frontend:** `camelCase` (değişkenler, fonksiyonlar), `PascalCase` (componentler, tipler)
- **Java/Backend:** `camelCase` (değişkenler, metodlar), `PascalCase` (classlar), `UPPER_SNAKE_CASE` (konstantlar)
- **Dosyalar (Frontend):** `kebab-case.tsx`, componentler için `PascalCase.tsx`
- **Dosyalar (Backend):** `PascalCase.java`
- **Veritabanı:** `snake_case` (tablo ve kolonlar)
- **API Endpoint:** `kebab-case` (örn: `/api/user-profile`)
- **Git Branch:** `feature/kısa-açıklama`, `bugfix/kısa-açıklama`

### 1.2 Dil ve Dokümantasyon
- Tüm kod içi yorumlar, değişken isimleri, commit mesajları **Türkçe**
- API dokümantasyonu Türkçe
- README ve teknik dökümanlar Türkçe

### 1.3 Klasör Yapısı

#### Frontend (Next.js)
```
/src
  /app
    /api
    /(routes)
  /components
    /ui (temel componentler)
    /features (özellik bazlı)
  /lib
    /utils
    /hooks
    /api-client
  /types
  /constants
```

#### Backend (Spring Boot)
```
/src/main/java/com/project
  /domain
    /model
    /repository
  /application
    /command
    /query
    /dto
  /infrastructure
    /config
    /exception
  /presentation
    /controller
    /request
    /response
```

### 1.4 İletişim
- Her task için GitHub Issue oluştur
- Blocker durumlar hemen ilet
- Kod değişikliği gerektiren kararları PR'da tartış

---

## 2. Frontend Kuralları (Next.js + TypeScript + TailwindCSS)

### 2.1 Component Yapısı
```typescript
// Her component tek sorumluluk prensibi ile yazılır
// Props interface her zaman tanımlanır
interface ComponentNameProps {
  data: string;
  onAction: () => void;
}

export function ComponentName({ data, onAction }: ComponentNameProps) {
  // 1. State tanımlamaları
  // 2. Hook çağrıları
  // 3. Event handler'lar
  // 4. UseEffect'ler
  // 5. Return
}
```

### 2.2 State Yönetimi
- **Local state:** `useState` kullan (component içi)
- **Server state:** Next.js Server Components veya `fetch` + React Query tercih et
- **Global state:** Sadece gerçekten gerekiyorsa Context API kullan
- Prop drilling 2 seviyeden fazlaysa Context düşün

### 2.3 Styling Kuralları
- **Sadece TailwindCSS** kullan, custom CSS yazma
- Responsive: mobile-first (`sm:`, `md:`, `lg:` breakpoints)
- Renk paleti: Tailwind default palette
- Tekrar eden class combinasyonları için `clsx` veya `cn` utility kullan
- Component başına ortalama 8-10 Tailwind class

### 2.4 Import Sırası
```typescript
// 1. React/Next imports
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party libraries
import clsx from 'clsx';

// 3. Internal components
import { Button } from '@/components/ui/button';

// 4. Utils, hooks, types
import { formatDate } from '@/lib/utils';
import type { User } from '@/types';
```

### 2.5 API Çağrıları
- Tüm API çağrıları `/lib/api-client` altında tanımlansın
- Hata yönetimi her endpoint için standart
```typescript
export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('Kullanıcı alınamadı');
  return res.json();
}
```

### 2.6 Type Safety
- `any` kullanma, `unknown` tercih et
- Her external data için type guard yaz
- API response tipleri backend ile senkron

### 2.7 Performance
- Büyük listeler için `key` prop mutlaka unique
- Gereksiz re-render önlemek için `memo`, `useMemo`, `useCallback` kullan
- Image için Next.js `Image` component tercih et

---

## 3. Backend Kuralları (Java Spring Boot - DDD + CQS)

### 3.1 Mimari Prensipleri

#### Domain Driven Design (DDD)
- **Domain Layer:** Saf business logic, framework bağımsız
- **Application Layer:** Use case orchestration (Command/Query)
- **Infrastructure Layer:** External sistem entegrasyonları
- **Presentation Layer:** REST controllers

#### Command Query Separation (CQS)
- **Command:** State değiştiren operasyonlar (POST, PUT, DELETE)
- **Query:** Sadece okuma operasyonları (GET)
- Ayrı klasörler: `/application/command` ve `/application/query`

### 3.2 Katman Sorumlulukları

#### Domain Layer (`/domain`)
```java
// Entity: ID ve lifecycle olan objeler
@Entity
public class User {
    @Id
    private Long id;
    private String email;
    // Business logic metodları buraya
    public void aktivEt() { }
}

// Repository interface (implementation Infrastructure'da)
public interface UserRepository {
    Optional<User> findById(Long id);
    User save(User user);
}
```

#### Application Layer (`/application`)
```java
// Command
@Service
public class UserCreateCommand {
    public UserResponseDto execute(UserCreateRequest request) {
        // Validasyon
        // Business logic çağrısı
        // DTO dönüşümü
    }
}

// Query
@Service
public class UserGetQuery {
    public UserResponseDto execute(Long id) {
        // Repository'den çek
        // DTO'ya çevir
    }
}
```

#### Presentation Layer (`/presentation`)
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @PostMapping
    public ResponseEntity<UserResponseDto> create(@Valid @RequestBody UserCreateRequest request) {
        return ResponseEntity.ok(userCreateCommand.execute(request));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(userGetQuery.execute(id));
    }
}
```

### 3.3 Validasyon
- DTO seviyesinde `@Valid` + Bean Validation annotations
- Business kuralları Domain layer'da
- Controller'da sadece `@Valid` kullan, manuel validasyon yapma

```java
public record UserCreateRequest(
    @NotBlank(message = "Email boş olamaz")
    @Email(message = "Geçersiz email formatı")
    String email,
    
    @Size(min = 3, max = 50, message = "İsim 3-50 karakter arası olmalı")
    String name
) {}
```

### 3.4 REST API Standardı

#### Endpoint Formatı
```
GET    /api/resources         - Liste
GET    /api/resources/{id}    - Tekil
POST   /api/resources         - Oluştur
PUT    /api/resources/{id}    - Güncelle
DELETE /api/resources/{id}    - Sil
```

#### Response Formatı
```json
// Başarılı
{
  "data": { },
  "message": "İşlem başarılı"
}

// Hata
{
  "error": "VALIDATION_ERROR",
  "message": "Email formatı geçersiz",
  "details": ["email: Geçersiz email formatı"]
}
```

### 3.5 Hata Yönetimi
```java
// Global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handle(EntityNotFoundException ex) {
        return ResponseEntity.status(404)
            .body(new ErrorResponse("NOT_FOUND", ex.getMessage()));
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handle(MethodArgumentNotValidException ex) {
        // Validation hatalarını topla
        return ResponseEntity.status(400)
            .body(new ErrorResponse("VALIDATION_ERROR", "Validasyon hatası", details));
    }
}
```

### 3.6 DTO Kuralları
- Request DTO: `record` kullan (immutable)
- Response DTO: `record` kullan
- Entity → DTO mapping için mapper class yaz
- DTO'lar `/application/dto` veya `/presentation/request-response` altında

### 3.7 Dependency Injection
- Constructor injection kullan (`@RequiredArgsConstructor` + Lombok)
- Field injection yapma
- Circular dependency oluşturma

### 3.8 Configuration
- Environment-specific ayarlar `application-{env}.yml`
- Hassas bilgiler environment variable'lardan al
- Magic number kullanma, constants tanımla

---

## 4. İşbirliği Kuralları (GitHub Workflow)

### 4.1 Git Workflow

#### Branch Stratejisi
```
main (production-ready)
  └── feature/kullanıcı-login-ekranı
  └── feature/ürün-listeleme-api
  └── bugfix/api-timeout-sorunu
```

#### Branch Kuralları
- `main` branch her zaman stable
- Doğrudan `main`'e commit atma
- Her feature için yeni branch
- Branch isimleri kısa ve açıklayıcı (Türkçe)

### 4.2 Issue Format
```markdown
## Açıklama
[Özelliğin veya bug'ın açıklaması]

## Kabul Kriterleri
- [ ] Kriter 1
- [ ] Kriter 2

## Teknik Notlar
[Varsa ek bilgiler]

## Labels
- `frontend` veya `backend`
- `bug`, `feature`, `enhancement`
```

### 4.3 Commit Mesajları
```
Format: <tip>: <kısa açıklama>

Tipler:
- feat: Yeni özellik
- fix: Bug düzeltme
- refactor: Kod iyileştirme
- style: Format, stil değişiklikleri
- docs: Dokümantasyon

Örnekler:
feat: kullanıcı login api endpoint eklendi
fix: token validation hatası düzeltildi
refactor: user service kodları iyileştirildi
```

### 4.4 Pull Request Template
```markdown
## Değişiklikler
[Ne yapıldığını kısaca açıkla]

## İlgili Issue
Closes #[issue-number]

## Test
- [ ] Local'de test edildi
- [ ] API endpoint'ler çalışıyor
- [ ] UI responsive

## Ekran Görüntüsü (Frontend için)
[Varsa ekle]
```

### 4.5 Code Review Kuralları
- Her PR en az 1 kişi tarafından review edilmeli
- Review süresini 15 dakika ile sınırla (hackathon için hız önemli)
- Blocking issue yoksa approve et
- Minör öneriler için PR'ı bloke etme

### 4.6 Merge Stratejisi
- Squash merge kullan (commit history temiz kalsın)
- Merge sonrası feature branch'i sil
- Conflict durumunda kişisel iletişime geç

---

## 5. Cursor Davranış Talimatları

### 5.1 Kod Üretim Kuralları
- **Kısa açıklamalar:** Her değişikliği 1-2 cümle ile açıkla
- **Türkçe yanıtlar:** Tüm açıklamalar Türkçe
- **Minimal yorumlar:** Sadece karmaşık logic için yorum ekle
- **Naming tutarlılığı:** Yukarıdaki konvansiyonlara uy
- **Type-safe kod:** TypeScript ve Java için her zaman tip tanımla

### 5.2 Component Oluşturma
```typescript
// ✅ YAPILACAK
export function UserCard({ user }: { user: User }) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
  );
}

// ❌ YAPILMAYACAK
// Aşırı yorum, inconsistent naming, inline styles
```

### 5.3 Backend Class Oluşturma
```java
// ✅ YAPILACAK
@Service
@RequiredArgsConstructor
public class UserCreateCommand {
    
    private final UserRepository userRepository;
    
    public UserResponseDto execute(UserCreateRequest request) {
        User user = User.builder()
            .email(request.email())
            .name(request.name())
            .build();
            
        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }
}

// ❌ YAPILMAYACAK
// Field injection, validation in command, entity dönme
```

### 5.4 Dosya Organizasyonu
- Yeni dosya oluştururken doğru klasör yapısını kullan
- Import path'leri `@/` alias ile yaz (Next.js)
- Unused import bırakma

### 5.5 Hata Mesajları
- Hata mesajları Türkçe ve user-friendly
- Developer için console log ekle
- Production'da sensitive data loglama

### 5.6 Test Yaklaşımı
- Hackathon için unit test yazma (hız öncelikli)
- Manual test yeterli
- Critical path'leri mutlaka test et

### 5.7 Optimizasyon
- Premature optimization yapma
- Önce çalışır kod, sonra optimize et
- Performance issue varsa bildir

### 5.8 Dokümantasyon
- Karmaşık algoritmalar için kısa açıklama yaz
- API endpoint'ler için request/response örneği ekle
- README'ye yeni environment variable eklemeyi unutma

### 5.9 Kod Stili Tercihleri
- **Fonksiyon uzunluğu:** Max 30 satır (mümkünse)
- **Parametre sayısı:** Max 4 (fazlaysa object kullan)
- **Nested if:** Max 2 seviye (daha fazlaysa refactor et)
- **Magic number:** Constant olarak tanımla

### 5.10 Framework Özellikleri
- Next.js 14+ App Router kullan
- Server Components default olarak kullan
- Spring Boot 3+ ve Java 17+ features kullan
- Lombok annotations aktif kullan (`@Data`, `@Builder`, `@RequiredArgsConstructor`)

---

## 6. Özel Durumlar

### 6.1 Zaman Baskısı
- 3 saatlik süre kısıtlı, pragmatik ol
- Perfect yerine working code tercih et
- Refactoring için TODO bırak, ilerle

### 6.2 Conflict Çözümü
- Git conflict'te communication öncelikli
- Küçük, sık commit at (conflict riskini azalt)
- Aynı dosyada çalışmaktan kaçın

### 6.3 Third-party Library
- Yeni library eklemeden önce mutlaka danış
- Dokümante et ve README'ye ekle
- Hafif ve popular library'leri tercih et

### 6.4 Environment Setup
- `.env.example` dosyası oluştur
- Tüm environment variable'ları dokümante et
- Local development için docker-compose kullan (opsiyonel)

---

## Hızlı Referans

### Frontend Checklist
- [ ] Component PascalCase
- [ ] Props interface tanımlı
- [ ] Sadece Tailwind CSS
- [ ] Import sırası doğru
- [ ] Type tanımlı

### Backend Checklist
- [ ] DDD katmanları ayrı
- [ ] Command/Query ayrımı net
- [ ] DTO kullanılıyor
- [ ] Validation eklendi
- [ ] Exception handling var
- [ ] REST standartlarına uygun

### Git Checklist
- [ ] Branch ismi doğru format
- [ ] Commit message standart
- [ ] PR template dolduruldu
- [ ] Issue linkli
- [ ] Review talep edildi

---

**Son Güncelleme:** Hackathon başlangıcı  
**Versiyon:** 1.0  
**Takım:** 2 Full-Stack Developer  
**Süre:** 3 saat  
**Motto:** Hızlı, tutarlı, temiz kod.

