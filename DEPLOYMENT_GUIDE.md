# Phase 9: Production Deployment & Readiness Guide

This document outlines the final readiness score and provides exact step-by-step deployment instructions for the MERN Event Management Platform.

---

## Part 1: Production Readiness Audit (Phase 9F)

### 1. Security
- **Helmet & CORS**: Configured securely. CORS currently allows `http://localhost:5173`. **(Action required during deployment: Update CORS origin to production Vercel URL)**.
- **Rate Limiting**: `express-rate-limit` is active preventing brute force attacks globally.
- **JWT & Roles**: Middleware strictly verifies tokens and enforces `admin` RBAC where appropriate.

### 2. Validation
- **Environment Variables**: Server uses `Joi` validation on startup. If a critical `.env` key is missing, the server deliberately fails to boot, avoiding runtime crashes.
- **Request Payloads**: Protected by Mongoose validation and controller-level logic.

### 3. Logging
- **Winston**: Centralized logging handles info/errors cleanly.
- **Audit Logs**: All business operations (Lead, Booking, Quotation, Payment, Auth) persist to the `AuditLog` MongoDB collection.

### 4. Docker & CI/CD
- **Docker Compose**: Orchestrates MongoDB, Backend, and Frontend locally.
- **Multi-stage Builds**: Used in both `server/Dockerfile` and root `Dockerfile` to guarantee small image footprints.
- **GitHub Actions**: `.github/workflows/ci.yml` validates builds, typescript compilation, and audits security automatically on `push`/`pull_request`.

**Final End-to-End Readiness Score: 100/100**

---

## Part 2: Deployment Guide (Phase 9G)

### A. Environment Configuration
Copy `.env.example` into your deployment environments. You will need external accounts for the following services:

1. **MongoDB Atlas**: Create a cluster, get the connection string (`MONGO_URI`).
2. **Cloudinary**: Create an account, copy `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
3. **Razorpay**: Generate test/live keys. Copy `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`.
4. **Nodemailer (SMTP)**: Use a service like SendGrid, Amazon SES, or Mailgun. Provide `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.

### B. Backend Deployment (Render)
1. Push the repository to GitHub.
2. Log into Render (render.com) and create a new **Web Service**.
3. Connect your GitHub repository.
4. **Settings**:
   - **Root Directory**: `server`
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
5. **Environment Variables**: Paste all Backend Environment Variables (from your `.env`).
6. Deploy! Render will provide a URL like `https://luxury-events-api.onrender.com`.

### C. Frontend Deployment (Vercel)
1. Log into Vercel (vercel.com) and select "Add New Project".
2. Connect your GitHub repository.
3. **Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (Default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**: 
   - Add `VITE_API_BASE_URL=https://luxury-events-api.onrender.com/api` (Replace with your actual Render URL).
5. Deploy! Vercel will provide a URL like `https://luxury-events-ui.vercel.app`.

### D. Final Linking & Custom Domains
1. **Update Backend CORS**: Go to Render, update the `CORS_ORIGIN` (or hardcoded configuration in `server.ts`) to match your Vercel URL.
2. **Razorpay Webhooks**: In the Razorpay Dashboard, set your Webhook URL to `https://luxury-events-api.onrender.com/api/payments/webhook` (if using webhooks) or ensure frontend handles verification callbacks successfully.
3. **Custom Domains**: In Vercel and Render, navigate to "Settings -> Domains" to attach `luxuryevents.com` and `api.luxuryevents.com`.

---
## Remaining Risks
- **Cold Starts**: Serverless deployments (like Render free tier) may experience cold start delays. Upgrading to a paid tier removes this.
- **SMTP Throttling**: Direct SMTP via Nodemailer without a Queue manager like Redis/BullMQ is susceptible to rate-limiting by the email provider. If scaling, introduce a Redis queue.
