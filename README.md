# Luxury Event Management Platform

A premium, bespoke web application designed for high-end event planning agencies. Built with modern web technologies, this platform delivers an editorial-style client experience alongside a powerful administrative dashboard.

## ✨ Features
- **Cinematic Homepage:** Immersive imagery, scroll-revealed storytelling, and high-impact statistics.
- **Client Portal:** Secure access for clients to view bespoke proposals, event timelines, and process payments.
- **Admin Dashboard:** Comprehensive lead management, custom package creation, quotation generation, and financial tracking.
- **Dynamic Portfolio:** An elegant masonry gallery showcasing past luxury events.
- **Real-time Notifications:** Automated alerts for leads, bookings, and payments.

## 🏛️ Architecture
The platform operates on a decoupled client-server architecture:
- **Client:** React Single Page Application (SPA) communicating via REST APIs.
- **Server:** Node.js/Express backend handling business logic, authentication, and database operations.
- **Database:** MongoDB for scalable, schema-based data persistence.

## 💻 Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Router v6.
- **Backend:** Node.js, Express, TypeScript, Mongoose.
- **Security:** JWT Authentication, Bcrypt, Helmet, Express Rate Limit.
- **Media:** Cloudinary integration for image hosting.

## 🚀 Installation & Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URL)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/luxury-events.git
cd luxury-events
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```

### 3. Frontend Setup
```bash
# From the project root
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in the `server` directory:
```env
# Server
PORT=5000
MONGO_URI=mongodb://localhost:27017/luxury_events
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (For Payments)
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

## 📸 Screenshots
*(Screenshots are stored in `/docs/screenshots/`)*
- `homepage.png` - The cinematic landing experience.
- `portfolio.png` - Masonry gallery showcase.
- `admin_dashboard.png` - The backend management interface.
- `client_portal.png` - Client-facing quotation and payment view.

## 🎭 Demo Credentials
After running the database seed script (`cd server && npx ts-node src/scripts/seed.ts`), you can log in with:

**Admin Access:**
- Email: `admin@thestudio.com`
- Password: `admin123`

**Client Access:**
- Email: `client@sterling.com`
- Password: `client123`
