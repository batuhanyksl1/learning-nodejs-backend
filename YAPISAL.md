Proje yapısını inceleyip dosyaları concern'lerine göre sınıflandırıyorum.


[9 tools called]


Projedeki dosyaları concern'lerine göre sınıflandırdım:

## Proje dosyaları — concern'lere göre sınıflandırma

### 1. Application entry point (Uygulama giriş noktası)
- `src/index.ts` — Uygulamanın başlangıç noktası; sunucuyu başlatır.

### 2. Server management (Sunucu yönetimi)
- `src/server.ts` — HTTP sunucusunu başlatır ve port dinler.

### 3. Application setup (Uygulama kurulumu)
- `src/app.ts` — Express uygulamasını oluşturur, middleware'leri ve route'ları yapılandırır.

### 4. Routing (Yönlendirme)
- `src/routes.ts` — API route'larını tanımlar (ör. `/api/health`).

### 5. Configuration (Yapılandırma)
- `src/config/index.ts` — Config modülünün barrel export'u.
- `src/config/env.ts` — Ortam değişkenlerini yükler ve export eder (port, NODE_ENV).

### 6. Build & development (Derleme ve geliştirme)
- `tsconfig.json` — TypeScript derleyici ayarları.
- `package.json` — Proje metadata, bağımlılıklar ve npm script'leri.
- `package-lock.json` — Bağımlılık versiyonlarının kilidi.

### 7. Environment (Ortam)
- `.env` — Ortam değişkenleri (git'e commit edilmemeli).

## Mimari akış

```
index.ts (Entry Point)
    ↓
server.ts (Server Management)
    ↓
app.ts (Application Setup)
    ↓
routes.ts (Routing)
    ↓
config/env.ts (Configuration)
```

## Concern separation (Sorumluluk ayrımı)

- Entry point: Sadece başlatma
- Server: Sadece sunucu başlatma
- App: Express yapılandırması
- Routes: Endpoint tanımları
- Config: Yapılandırma yönetimi

Bu yapı, her dosyanın tek bir sorumluluğa odaklanmasını sağlar ve bakımı kolaylaştırır.