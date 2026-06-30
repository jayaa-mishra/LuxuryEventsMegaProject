# Luxury Events — Jayaa Mishra Studio

A full-stack luxury event management platform for Jayaa Mishra's studio. Handles public marketing, client inquiry-to-booking flow, payment collection, quotation PDFs, gallery management, and admin operations — all under one roof.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│              React 18 + TypeScript + Vite + Tailwind            │
│   Public Site │ Client Portal (/client/*) │ Admin (/admin/*)    │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST API (JSON)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS 5 API SERVER                         │
│                  TypeScript + Mongoose 9                        │
│                                                                 │
│  Route → Controller → Service → Repository → Model             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Auth (JWT)   │  │ Razorpay     │  │ Cloudinary (images)  │  │
│  │ bcryptjs     │  │ Payments     │  │ multer (upload)      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Redis (ioredis)                       │   │
│  │  ① Response cache  ②  BullMQ notification queue         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                  │                              │
│                                  ▼ (async jobs)                 │
│                    ┌─────────────────────────┐                  │
│                    │  Notification Worker    │                  │
│                    │  BullMQ Consumer        │                  │
│                    │  nodemailer (SMTP)      │                  │
│                    │  pdfkit (PDF gen)       │                  │
│                    └─────────────────────────┘                  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   MongoDB Atlas      │
                    │   Mongoose ODM       │
                    └──────────────────────┘
```

---

## Tech Stack

| Layer | Technology | How it optimises the project |
|---|---|---|
| Frontend framework | React 18 + TypeScript | Component reuse, type-safe props, zero runtime type errors |
| Build tool | Vite | Sub-second HMR in dev; tree-shaken, code-split production bundles |
| Styling | Tailwind CSS v4 | Utility-first; custom `blush`, `plum`, `rose`, `peach` tokens; no unused CSS in prod |
| Routing | React Router v6 | Nested layouts (Main / Client / Admin); lazy-loaded route chunks |
| Backend | Express 5 + TypeScript | Async/await error propagation out of the box; clean middleware chain |
| Database | MongoDB + Mongoose 9 | Flexible document model for events / quotations / bookings |
| Cache | ioredis → Redis | API response caching; hot routes served from memory without hitting DB |
| Job queue | BullMQ (over Redis) | Decouples slow email/PDF jobs from HTTP request latency |
| Payments | Manual records (MongoDB) | Admin records payments; clients view history via client portal |
| Image storage | Cloudinary | Auto-optimised CDN delivery (WebP/AVIF); no binaries in MongoDB |
| Email | nodemailer | Transactional emails (booking confirmation, quotation delivery) |
| PDF generation | pdfkit | Server-side quotation PDFs streamed directly to Cloudinary |
| Auth | JWT + bcryptjs | Stateless auth, role-based (`admin` / `client`); refresh token support |
| API docs | Swagger (swagger-jsdoc + swagger-ui-express) | Auto-generated interactive docs at `/api/docs` |
| Logging | Winston + Morgan | Structured request logs; error traces with stack in dev |
| Security | helmet, express-rate-limit, express-validator | HTTP header hardening, brute-force protection, input validation |

---

## Project Structure

```
LuxuryEventsMegaProject/
├── src/                            # React frontend
│   ├── components/
│   │   └── layout/                 # Navbar, Footer, ScrollReveal
│   ├── layouts/                    # MainLayout, ClientLayout, AdminLayout
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── PressPage.tsx
│   │   ├── PortfolioPage.tsx       # Auto-carousel with pause-on-hover
│   │   ├── InquiryPage.tsx
│   │   ├── MetropolitanGalaPage.tsx
│   │   ├── LakeComoPage.tsx
│   │   ├── press/                  # 6 full editorial pages
│   │   │   ├── EditorialVogue.tsx
│   │   │   ├── EditorialFT.tsx
│   │   │   ├── EditorialAD.tsx
│   │   │   ├── EditorialHarpers.tsx
│   │   │   ├── EditorialConde.tsx
│   │   │   └── EditorialWallpaper.tsx
│   │   ├── client/                 # Protected client portal
│   │   │   ├── ClientPortal.tsx
│   │   │   ├── ClientBookings.tsx
│   │   │   ├── ClientQuotations.tsx
│   │   │   ├── ClientPayments.tsx
│   │   │   └── ClientProfile.tsx
│   │   └── admin/                  # Protected admin panel
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminLeads.tsx
│   │       ├── AdminBookings.tsx
│   │       ├── AdminPackages.tsx
│   │       ├── AdminQuotations.tsx
│   │       ├── AdminGallery.tsx
│   │       ├── AdminPayments.tsx
│   │       └── AdminAuditLogs.tsx
│   ├── routes/
│   │   ├── AppRouter.tsx
│   │   └── ProtectedRoute.tsx      # Role-based redirect
│   └── hooks/                      # useClientData, useAuth, usePayment
│
└── server/                         # Express API
    └── src/
        ├── config/
        │   ├── db.ts               # Mongoose connection
        │   ├── redis.ts            # ioredis + graceful degradation
        │   └── env.ts              # Parsed & validated env vars
        ├── models/                 # Mongoose schemas
        ├── repositories/           # DB access layer (no business logic)
        ├── services/               # Business logic
        │   ├── payment.service.ts  # Razorpay + mock fallback
        │   ├── notification.service.ts
        │   ├── quotation.service.ts
        │   └── receipt.service.ts
        ├── controllers/            # HTTP layer (thin, delegates to service)
        ├── routes/                 # Express routers
        ├── queues/
        │   └── notification.queue.ts   # BullMQ queue definition
        ├── workers/                # BullMQ consumers (email, PDF)
        ├── middlewares/            # auth, validate, rateLimiter, upload
        └── seeds/                  # Admin + demo data seeds
```

---

## How Redis Optimises the Project

Redis serves two distinct purposes:

**1. Response Caching**

Hot API routes (packages list, portfolio gallery) write their JSON response to Redis with a TTL. Subsequent requests are served from memory without touching MongoDB.

```
Request → Redis HIT  → return cached JSON          (< 5 ms)
Request → Redis MISS → MongoDB → write cache → return JSON
```

**2. BullMQ Notification Queue**

When a booking is confirmed or a quotation is generated, the API enqueues a job and responds to the client immediately. A separate worker processes the job asynchronously — generating the PDF with pdfkit, uploading to Cloudinary, and emailing via nodemailer. This prevents SMTP latency from blocking the HTTP response.

```
API handler → enqueue job → respond 200 in ~50 ms
                 ↓ (async)
           BullMQ worker → PDF → Cloudinary → email → done
```

If Redis is unavailable (local dev without Redis), both cache and queue degrade gracefully — caching is a no-op and email is sent inline.

---

## Local Setup

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas URI)
- Redis (optional — app works without it)
- Razorpay test keys (optional — mock fallback included)

### Environment Variables

Create `server/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/luxuryevents
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# Optional — app works without these in dev
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_TTL_SECONDS=300

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
```

Create `.env` (frontend root):

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Install & Run

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd server && npm install && cd ..

# 3. Seed the database (creates admin user + demo data)
cd server && npm run seed && cd ..

# 4. Start backend — port 5000
cd server && npm run dev

# 5. Start frontend — port 5173 (new terminal)
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:5000/api/v1 |
| Swagger docs | http://localhost:5000/api/docs |

---

## Route Map

### Public Pages

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About Jayaa Mishra & the Studio |
| `/portfolio` | Portfolio auto-carousel |
| `/portfolio/:id` | Portfolio item detail |
| `/press` | Press features & awards |
| `/press/vogue-living` | Vogue Living editorial |
| `/press/financial-times` | FT How to Spend It editorial |
| `/press/architectural-digest` | Architectural Digest India editorial |
| `/press/harpers-bazaar` | Harper's Bazaar editorial |
| `/press/conde-nast` | Condé Nast Traveller editorial |
| `/press/wallpaper` | Wallpaper* editorial |
| `/commissions/metropolitan-gala` | The Metropolitan Gala commission page |
| `/commissions/lake-como` | Lake Como Estate commission page |
| `/inquiry` | Inquiry / contact form |

### Client Portal

| Path | Page |
|---|---|
| `/client/login` | Client login |
| `/client/register` | Client registration |
| `/client/portal` | Dashboard overview |
| `/client/bookings` | My bookings |
| `/client/quotations` | My quotations + PDF download |
| `/client/payments` | Payment history |
| `/client/profile` | Profile settings |
| `/client/portfolio` | My event gallery |

### Admin Panel

| Path | Page |
|---|---|
| `/admin/login` | Admin login |
| `/admin/dashboard` | Overview stats |
| `/admin/leads` | Inquiry leads |
| `/admin/bookings` | All bookings |
| `/admin/packages` | Package CRUD |
| `/admin/quotations` | Quotation management + PDF gen |
| `/admin/gallery` | Gallery upload |
| `/admin/payments` | Payment records |
| `/admin/audit` | Audit logs |

---

## Admin Login

| Field | Value |
|---|---|
| URL | http://localhost:5173/admin/login |
| Email | `admin@thestudio.com` |
| Password | `admin123` |

> Run `cd server && npm run seed` first to create the admin account in the database.

---

## API Documentation

Interactive Swagger UI is available at `http://localhost:5000/api/docs` once the server is running. All endpoints are documented with request/response schemas, auth requirements, and example payloads.

---

## Key Design Decisions

- **Layered backend**: Route → Controller → Service → Repository → Model. Each layer has exactly one responsibility. Controllers never touch Mongoose directly; services never import Express types.
- **Graceful Redis degradation**: Redis connection errors are caught silently. The app behaves identically without Redis — caching is skipped and email is sent inline.
- **BullMQ over inline email**: Quotation emails with PDF attachments take 2–4 seconds. Moving them to a queue keeps API response times under 100 ms and retries automatically on failure.
- **Cloudinary for all media**: No binary assets in MongoDB. Upload → Cloudinary URL stored in DB → CDN serves images globally with auto-format (WebP/AVIF) and responsive sizing.
- **ScrollReveal animations**: Every public page uses a shared `ScrollReveal` wrapper (IntersectionObserver) so elements fade in as the user scrolls — no heavy animation library dependency.
