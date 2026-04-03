# Finance Dashboard Backend

A robust financial management backend system built with NestJS, Prisma, and PostgreSQL/MySQL (or your chosen DB). This system provides secure APIs for user authentication, role-based access control (RBAC), managing financial records (income/expenses), and extracting comprehensive dashboard metrics.

## Features

- **User Authentication:** Registration and JWT-based login mechanisms using `@nestjs/passport` and bcrypt for secure password hashing.
- **Role-Based Access Control (RBAC):** Three distinct roles restrict and customize API access:
  - **Viewer:** Read-only access to standard financial records.
  - **Analyst:** Read-only access to standard records + Full access to Dashboard analytics endpoints.
  - **Admin:** Full read/write/delete permissions across the system.
- **Financial Records Management:** Complete CRUD endpoints allowing users (or admins) to track income and expenses securely.
- **Dashboard API:** Powerful endpoints specifically tailored for data analysis and visualization natively returning:
  - `Total Income`, `Total Expense`, and `Net Balance`
  - `Category-wise Totals` directly aggregated from records
  - `Monthly Trends`
  - `Recent Transactions` sorted chronologically

## Tech Stack

- **Framework:** [Nest] (https://nestjs.com/)
- **ORM / Database Tooling:** [Prisma] (https://www.prisma.io/)
- **Authentication:** Passport.js (JWT)
- **Language:** TypeScript

## Setup & Installation

1. Copy the environment configuration:
```bash
cp .env.example .env
```
*(Make sure to populate your `.env` with `DATABASE_URL` and `JWT_SECRET`)*

2. Install dependencies:
```bash
npm install
```

3. Spin up your database and push the Prisma schema:
```bash
npx prisma generate
npx prisma db push
```
*(Alternatively, use `npx prisma migrate dev` if you prefer migrations).*

## Running the application

```bash
# development
npm run start

# watch mode (most common for development)
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

When the application is running, Swagger UI is available by navigating to:
**http://localhost:3000/api**

From the Swagger UI, you can view the full spec of all endpoints and conveniently test `GET`, `POST`, `PATCH`, and `DELETE` events utilizing your Bearer JWT token natively.
