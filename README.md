# Full-Stack Developer Portfolio

A dynamic, production-ready full-stack developer portfolio web application built with **Next.js (App Router)**, **React**, **NestJS**, **Prisma ORM**, and **PostgreSQL**.

---

## 🏗️ Project Architecture

```plaintext
MyPortfolio/
├── backend/                   # NestJS REST API + Prisma ORM + Swagger + JWT
│   ├── prisma/
│   │   └── schema.prisma      # Admin, Project, Blog, and ContactMessage models
│   ├── src/
│   │   ├── auth/              # JWT authentication & admin security
│   │   ├── projects/          # Projects CRUD REST endpoints
│   │   ├── blogs/             # Dev Notes / Blog CRUD REST endpoints
│   │   ├── contact/           # Contact form submission & inquiry management
│   │   ├── prisma/            # Global Prisma Client service
│   │   └── main.ts            # Swagger docs (/api/docs) & CORS configuration
│   └── package.json
│
└── frontend/                  # Next.js 16 (App Router) + Tailwind CSS + Lucide
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx       # Interactive landing page with tech stack & hero
    │   │   ├── projects/      # Projects showcase
    │   │   ├── blog/          # Dev notes & articles
    │   │   ├── contact/       # Contact page
    │   │   └── admin/         # Protected Admin CMS Dashboard & Login
    │   ├── components/        # Reusable UI components (Navbar, Footer, Cards, Form)
    │   └── lib/               # Typed Axios API client & Auth helpers
    └── package.json
```

---

## 🚀 Getting Started

### 1. Backend Setup
1. Open terminal in `backend/`:
   ```bash
   cd backend
   ```
2. Configure your PostgreSQL connection in `backend/.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/portfolio_db?schema=public"
   JWT_SECRET="super_secret_portfolio_key_2026"
   PORT=5000
   ```
3. Run migrations and start the dev server:
   ```bash
   npx prisma migrate dev --name init
   npm run start:dev
   ```
4. Explore interactive API Documentation:
   - **Swagger Docs:** `http://localhost:5000/api/docs`

---

### 2. Frontend Setup
1. Open a new terminal in `frontend/`:
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser:
   - **Portfolio Site:** `http://localhost:3000`
   - **Admin Portal:** `http://localhost:3000/admin`
