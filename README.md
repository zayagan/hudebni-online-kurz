# Hudebni kurz - Stripe backend (test)

## 1) Instalace

```bash
npm install
cp .env.example .env
```

Vypln `.env` hodnotami z test Stripe dashboardu.
Vychozi castky jsou nastavene na `200` (jednorazove) a `100` (mesicni predplatne) v `CZK`.
Castky zapisuj v bezne menove jednotce (`200` CZK), backend je prepocita pro Stripe automaticky.

## 2) Spusteni aplikace

```bash
npm start
```

Aplikace bezi na `http://localhost:8000`.

## 3) Stripe webhook lokalne

```bash
stripe listen --forward-to localhost:8000/stripe/webhook
```

Stripe CLI vypise `Signing secret` (`whsec_...`). Vloz ho do `.env` jako `STRIPE_WEBHOOK_SECRET`.

## 4) Co je implementovano

- `POST /api/create-checkout-session` pro jednorazovou i predplatne
- `POST /stripe/webhook` s overenim Stripe podpisu
- `GET /api/checkout-status?session_id=...` pro potvrzeni platby po navratu z checkoutu
- Uspesne session se ukladaji do `data/payments.json`

## 5) Frontend flow

1. Uzivatel klikne na "Koupit".
2. Frontend zavola `POST /api/create-checkout-session`.
3. Stripe vrati checkout URL, frontend presmeruje.
4. Po zaplaceni Stripe vrati na `/?session_id=...`.
5. Frontend overi stav pres `GET /api/checkout-status`.

## 6) Deploy na Render

1. Pushni projekt na GitHub.
2. V Renderu vytvor novou `Web Service` z repo.
3. Render nacte `render.yaml` automaticky.
4. Nastav environment variables:
   - `APP_URL` = tvoje Render URL (napr. `https://hudebni-kurz-app.onrender.com`)
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_CURRENCY` (napr. `czk`)
   - `STRIPE_AMOUNT_ONE_TIME` (napr. `200`)
   - `STRIPE_AMOUNT_SUBSCRIPTION` (napr. `100`)
   - volitelne: `STRIPE_PRICE_ONE_TIME`, `STRIPE_PRICE_SUBSCRIPTION`
5. Ve Stripe dashboardu nastav webhook endpoint:
   - `https://TVOJE-DOMENA/stripe/webhook`
   - event: `checkout.session.completed`

## 7) Deploy na Railway

1. Pushni projekt na GitHub.
2. V Railway vytvor projekt z repo.
3. Nastav stejné proměnné jako u Renderu:
   - `APP_URL` (doména Railway služby)
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_CURRENCY`
   - `STRIPE_AMOUNT_ONE_TIME`
   - `STRIPE_AMOUNT_SUBSCRIPTION`
   - volitelne: `STRIPE_PRICE_ONE_TIME`, `STRIPE_PRICE_SUBSCRIPTION`
4. Ve Stripe dashboardu nastav webhook endpoint:
   - `https://TVOJE-DOMENA/stripe/webhook`
   - event: `checkout.session.completed`

## 8) Dulezite poznamky

- `data/payments.json` je lokalni uloziste. Na free hostingach neni perzistentni.
- Pro produkci je vhodne prejit na databazi (napr. Postgres).

## 9) AI asistent nad tvymi PDF/vypisky (RAG)

1. Vloz podklady do slozky `knowledge/` (`.pdf`, `.md`, `.txt`).
2. Ujisti se, ze v `.env` mas `OPENAI_API_KEY`.
   Pro PDF je potreba `pdftotext` (poppler):

```bash
brew install poppler
```

3. Spust indexaci:

```bash
npm run build:knowledge
```

4. Zkontroluj stav indexu:

```bash
curl -s http://localhost:8000/api/knowledge-status
```

5. Chat endpoint `/api/chat` automaticky pouzije podklady z indexu (pokud existuji).
