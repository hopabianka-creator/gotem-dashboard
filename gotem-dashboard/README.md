# GOT'EM PM Dashboard — Instrukcja wdrożenia

## Co to jest?
Aplikacja webowa połączona z Twoim sklepem Shopify przez bezpieczny backend na Vercel.
Token Shopify nigdy nie trafia do przeglądarki — jest bezpiecznie przechowywany na serwerze Vercel.

---

## Masz już wszystko czego potrzebujesz:
- **Token:** `shpat_WKLEJ_TUTAJ_SWOJ_TOKEN` (zapisz go bezpiecznie!)
- **Domena sklepu:** `gotem.myshopify.com`
- **Aplikacja:** AutoFeedSync (zainstalowana, uprawnienia OK)

---

## Krok 1 — Załóż darmowe konto GitHub

1. Wejdź na https://github.com/signup
2. Zarejestruj się (email + hasło)
3. Potwierdź email

---

## Krok 2 — Wgraj kod na GitHub

1. Zaloguj się na https://github.com
2. Kliknij **"+" → "New repository"**
3. Nazwij: `gotem-dashboard`
4. Zostaw ustawienia domyślne → kliknij **"Create repository"**
5. Na stronie repozytorium kliknij **"Add file" → "Upload files"**
6. Wgraj WSZYSTKIE pliki z rozpakowanego ZIP-a zachowując strukturę:
   ```
   api/shopify.js
   public/index.html
   vercel.json
   package.json
   README.md
   ```
   ⚠️ Ważne: folder `api` i folder `public` muszą być osobnymi folderami, nie wszystko w jednym miejscu.
7. Kliknij **"Commit changes"**

---

## Krok 3 — Wdróż na Vercel (darmowe)

1. Wejdź na https://vercel.com
2. Kliknij **"Sign up"** → **"Continue with GitHub"** → autoryzuj
3. Kliknij **"Add New Project"**
4. Znajdź `gotem-dashboard` na liście → kliknij **"Import"**
5. Zostaw wszystkie ustawienia domyślne → kliknij **"Deploy"**
6. Poczekaj ~1 minutę
7. Vercel pokaże Ci URL, np. `https://gotem-dashboard.vercel.app` — **skopiuj go**

---

## Krok 4 — Dodaj token Shopify do Vercel

To jest kluczowy krok — bez tego aplikacja nie połączy się ze sklepem.

1. W Vercel → kliknij swój projekt `gotem-dashboard`
2. Kliknij **"Settings"** (górne menu)
3. Kliknij **"Environment Variables"** (lewe menu)
4. Dodaj pierwszą zmienną:
   - **Name:** `SHOPIFY_SHOP`
   - **Value:** `gotem.myshopify.com`
   - Kliknij **"Save"**
5. Dodaj drugą zmienną:
   - **Name:** `SHOPIFY_TOKEN`
   - **Value:** `shpat_WKLEJ_TUTAJ_SWOJ_TOKEN`
   - Kliknij **"Save"**
6. Przejdź do **"Deployments"** → kliknij **"Redeploy"** na najnowszym deploymencie → potwierdź

---

## Krok 5 — Otwórz aplikację i połącz

1. Otwórz URL swojej aplikacji (np. `https://gotem-dashboard.vercel.app`)
2. Kliknij **"Połącz Shopify"** w prawym górnym rogu
3. Wpisz:
   - URL backendu: `https://gotem-dashboard.vercel.app` (Twój URL z Vercel)
   - Domena sklepu: `gotem.myshopify.com`
4. Kliknij **"Połącz i pobierz dane"**

Gotowe! Aplikacja załaduje produkty i zamówienia ze sklepu.

---

## Co robi aplikacja?

| Zakładka | Co pokazuje |
|----------|-------------|
| **Przegląd** | Przychód 30d, AOV, top produkty wg sprzedaży, ostatnie zamówienia |
| **Produkty** | Każdy produkt z typem + kanałem + zalecanym działaniem |
| **Zamówienia** | Historia zamówień z filtrami i statusami |
| **Magazyn** | Produkty z niskim stockiem, wyprzedane, priorytety reorderu |
| **Segmentacja** | Cały asortyment pogrupowany wg typu |
| **Analiza AI** | Chat z asystentem który widzi Twoje dane i odpowiada po polsku |

---

## Typy produktów (Twój format GOT'EM)

| Typ | Znaczenie | Kanał |
|-----|-----------|-------|
| **TRAFFIC** | Hype, duże wolumeny, przyciąga ruch | perfo + SM |
| **PROFIT** | Pewna marża, stabilna rotacja | perfo |
| **STYLE** | Pokazowe, storytelling, budują markę | SM + newsletter |
| **CLEARANCE** | Słaba rotacja lub nadmiar stocku | SM + newsletter |
| **HOLD** | Zimowe, poza sezonem | — (wróć we wrześniu) |

---

## Odświeżanie danych

Kliknij **"↻ Odśwież"** w prawym górnym rogu — pobiera świeże dane ze Shopify w czasie rzeczywistym.

---

## Problemy?

**Błąd CORS lub 500** → sprawdź czy zrobiłaś Redeploy po dodaniu zmiennych środowiskowych w Vercel.

**Błąd 401 Unauthorized** → token wygasł lub złe uprawnienia. Wygeneruj nowy token w Shopify → Aplikacje → AutoFeedSync → Poświadczenia API.

**Błąd 404** → sprawdź czy plik `vercel.json` jest w głównym folderze repozytorium (nie w podfolderze).

**Aplikacja się ładuje ale brak danych** → sprawdź czy zmienna `SHOPIFY_SHOP` ma wartość `gotem.myshopify.com` (bez https://).
