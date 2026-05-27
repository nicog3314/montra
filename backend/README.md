# Montra Backend API

Welcome to the backend repository for **Montra**—a highly secure, AI-ready fintech and banking data architecture[cite: 121, 122]. [cite_start]This service handles user authentication, transaction ledger tracking, budgeting limits, real-time fraud alerts, and administrative audit logging[cite: 122].

[cite_start]Built using **Node.js, Express, PostgreSQL, and Prisma ORM**[cite: 1, 2].

---

## 🛠️ Required Software

To collaborate on this project, ensure you have the following software installed on your machine:

1. **Node.js (v18.x or higher)** - The JavaScript server runtime.
2. [cite_start]**npm (v9.x or higher)** - Node Package Manager (comes bundled with Node.js)[cite: 277].
3. [cite_start]**Git** - For version control and repository cloning [cite: 278].
4. [cite_start]**Postman / Hopscotch / cURL** - To test your API endpoints locally [cite: 279].

[cite_start]*Note: You do **not** need a local database installation (like standard PostgreSQL or Docker Desktop) to run this app, as the project connects directly to a managed cloud sandbox[cite: 280].*

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
### 3. Configure Environmental Variables
```bash
DATABASE_URL="your_url""
```
### 4. Push Database Tables & Sync Prisma Client
```bash
npx prisma migrate dev --name structural_banking_init
```
### 5. Launch the Development Server
```bash
npm run dev
```
### 6. Database Internal Inspection (Prisma Studio)
```bash
npx prisma studio
```

