# Demo mock API

Zero-dependency Node server that stands in for the original `https://localhost:7275` backend so the Angular client can show **visual happy paths** offline.

## Happy paths

| Path | How to exercise in the UI |
|------|---------------------------|
| **Product list** | Open `/products` — cards load from fixtures (placeholder images) |
| **Login** | Open `/login` — username **`demo`**, password **`demo`** → JWT → admin routes |

## Run

```bash
# from repo root
npm run api
# → http://localhost:3333
```

With the Angular app (separate terminal):

```bash
npm start
# → http://localhost:4200
```

Or both (simple shell helper):

```bash
npm run demo
```

## Endpoints (client-compatible)

| Method | Path | Notes |
|--------|------|--------|
| GET | `/health` | Liveness |
| GET | `/api/products?page=&size=` | Paginated list |
| POST | `/api/products` | Create (in-memory) |
| DELETE | `/api/products/:id` | Delete (in-memory) |
| GET | `/api/products/getProductImages/:id` | Image list |
| POST | `/api/auth/login` | `demo` / `demo` |
| POST | `/api/auth/refreshtokenlogin` | Always issues new token |
| POST | `/api/auth/google-login` | Stub accept |
| POST | `/api/auth/facebook-login` | Stub accept |
| POST | `/api/users` | Register stub |
| GET | `/api/files/GetBaseStorageUrl` | `{ url: "" }` → UI uses `assets/product.png` |

## Credentials

- **Username / email:** `demo`  
- **Password:** `demo`

## Notes

- CORS open (`*`) for local `ng serve`.
- SignalR is **disabled** in the Angular environment for offline demos; this server does not host a hub.
- Product mutations are **in-memory** — restart resets to `fixtures/products.json`.
