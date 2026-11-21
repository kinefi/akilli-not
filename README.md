# Akıllı Not

Sekmeli yapıda çalışan, sürüklenebilir ve boyutlandırılabilir not kartları sunan React uygulaması.

## Özellikler

* **Sekme Yönetimi:** Yeni sekme ekleyebilir (`+` butonu) ve mevcut sekme adlarını çift tıklayarak güncelleyebilirsiniz.
* **Not Oluşturma ve Silme:** Not alanında çift tıklayarak modal pencere üzerinden not ekleyebilir, mevcut notlara çift tıklayarak silebilirsiniz.
* **Sürükleme ve Boyutlandırma:** Not kartlarını kapsayıcı alan içinde `interactjs` ile sürükleyebilir (`enableDrag`) ve isteğe bağlı olarak kenarlarından boyutlandırabilirsiniz (`enableResize`).
* **Yerel Kalıcılık (`localStorage`):** Sekme ve not verilerini tarayıcı depolamasında (`localStorage`) saklayarak sayfa yenilemelerinde verilerin korunmasını sağlayabilirsiniz.

## Teknoloji Yığını

* **UI & State:** React 19
* **Paket Yöneticisi:** `pnpm`
* **Etkileşim & Arayüz Bileşenleri:** `interactjs`, `react-tabs`, `react-modal`, `@fortawesome/react-fontawesome`

## Proje Yapısı

```text
├── public/
├── src/
│   ├── css/
│   │   └── styles.css
│   ├── components/
│   │   └── Note.jsx
│   ├── pages/
│   │   └── Notes.jsx
│   ├── utils/
│   │   ├── interact-utils.js
│   │   └── index.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Kurulum ve Çalıştırma (`pnpm`)

1. **Bağımlılıkları yükleyin:**
   ```bash
   pnpm install
   ```

2. **Geliştirme sunucusunu başlatın:**
   ```bash
   pnpm dev
   ```

3. **Üretim (production) derlemesi alın:**
   ```bash
   pnpm build
   ```

4. **Üretim derlemesini önizleyin:**
   ```bash
   pnpm preview
   ```

## Sorun Giderme: `ERR_PNPM_IGNORED_BUILDS` (`esbuild`)

`pnpm` kurulumu sırasında `esbuild` gibi paketlerin build script'leri engellenirse şu adımlarla onaylayabilirsiniz:

```bash
pnpm approve-builds
pnpm rebuild esbuild
```

Alternatif olarak `package.json` dosyasına şu alanı ekleyip `pnpm install` çalıştırabilirsiniz:

```json
{
  "pnpm": {
    "onlyBuiltDependencies": [
      "esbuild"
    ]
  }
}
```
