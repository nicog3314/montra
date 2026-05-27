# Montra Backend API

Welcome to the backend repository for **Montra**—a highly secure, AI-ready fintech and banking data architecture. This service handles user authentication, transaction ledger tracking, budgeting limits, real-time fraud alerts, and administrative audit logging.

Built using **Node.js, Express, PostgreSQL, and Prisma ORM**.

---

## 🛠️ Required Software

To collaborate on this project, ensure you have the following software installed on your machine:

1. **Node.js (v18.x or higher)** - The JavaScript server runtime.
2. **npm (v9.x or higher)** - Node Package Manager (comes bundled with Node.js).
3. **Git** - For version control and repository cloning.
4. **Postman / Hopscotch / cURL** - To test your API endpoints locally.

*Note: You do **not** need a local database installation (like standard PostgreSQL or Docker Desktop) to run this app, as the project connects directly to a managed cloud sandbox.*

---

## 🚀 Getting Started (Collaborator Setup)

Follow these exact steps to clone the repository, configure your environmental settings, and spin up the local development engine:

### 1. Clone the Repository
```bash
git clone <your-repository-url-here>
cd backend
```
### 2. Install Project Dependencies
 
```bash
npm install
```
 
This installs all dependencies including `prisma`, `@prisma/client`, and `@prisma/adapter-pg`.
 
### 3. Configure Environment Variables
 
Create a `.env` file inside the `backend/` directory:
 
```bash
touch .env
```
 
Add the following to `.env`:
 
```env
DATABASE_URL="your_postgres_connection_url_here"
```
 
> Ask a project maintainer for the cloud sandbox `DATABASE_URL`. It follows the format `postgres://user:password@db.prisma.io:5432/dbname`.
 
### 4. Generate the Prisma Client
 
```bash
npx prisma generate
```
 
This generates the query client into `node_modules/@prisma/client`. You must run this once after cloning, and again any time `prisma/schema.prisma` changes.
 
Expected output:
 
```
✔ Generated Prisma Client (6.x.x) to ./node_modules/@prisma/client in ~30ms
```
 
### 5. Apply Database Migrations
 
If setting up a fresh database, run:
 
```bash
npx prisma migrate deploy
```
 
For active development with schema changes, use:
 
```bash
npx prisma migrate dev --name <describe_your_change>
```
 
### 6. Launch the Development Server
 
```bash
npm run dev
```
 
The server starts on `http://localhost:3000` by default. You should see:
 
```
Montra API running on port 3000
```
 
### 7. Inspect the Database (Prisma Studio)
 
```bash
npx prisma studio
```
 
Opens a visual browser UI at `http://localhost:5555` for browsing and editing database records directly.
 
---
 
## 🗂️ Project Structure
 
```
backend/
├── index.js              # Express server entry point
├── src/
│   └── prisma.js         # Prisma client instantiation (adapter-pg)
├── prisma/
│   ├── schema.prisma     # Database schema and generator config
│   └── migrations/       # Applied migration history
├── .env                  # Local environment variables (git-ignored)
└── package.json
```
 
---
 
## 🔧 Troubleshooting
 
**`Cannot find module '@prisma/client'`**
Run `npx prisma generate`. The client must be generated locally — it is not committed to the repository.
 
**`Error: DATABASE_URL environment variable is not set`**
Ensure your `.env` file exists in the `backend/` directory and contains a valid `DATABASE_URL`.
 
**`Cannot find module 'backend/index.js'` (path doubling error)**
Make sure you are running `npm run dev` from inside the `backend/` directory, not from the monorepo root.
 
**Prisma version upgrade prompt to v7**
Do not run `npm i prisma@latest` — Prisma 7 introduces breaking changes to the schema format. This project is pinned to `^6.19.x`. Ignore the upgrade prompt.
 