# Language-House-Academy API

A backend API built with **TypeScript**, **Express**, and **MySQL** for managing the Language House Academy platform.

## 🚀 Features

- 🧱 Modular structure using Domain-Driven Design (DDD)
- 🛡️ Zod validation
- 🔐 JWT-based authentication
- 🧪 Jest & Supertest testing setup
- 🧹 Linting and formatting with ESLint + Prettier

## 📂 Project Structure

```bash
src/
├── common/ # Shared config, utilities
├── core/ # Core logic (e.g., error handling, middleware)
├── domains/ # feature modules
├── routes/ # Entry point routers
├── app.ts # Express app setup
└── server.ts # App bootstrap and start
```

## 🛠️ Tech Stack

- Node.js + Express
- TypeScript
- MySQL (with `mysql2`)
- Zod
- Jest + Supertest
- Dotenv
- Cloudinary

## 📦 Scripts

| Script        | Description                  |
| ------------- | ---------------------------- |
| `pnpm dev`    | Run in dev mode with nodemon |
| `pnpm build`  | Compile TypeScript           |
| `pnpm start`  | Run the compiled app         |
| `pnpm test`   | Run all tests                |
| `pnpm lint`   | Run ESLint                   |
| `pnpm format` | Format code using Prettier   |

## 🧪 Testing

```bash
pnpm test
```

### Uses:

- Jest as the test runner

- Supertest for API testing

- ts-jest for TypeScript support

## 📄 Environment Variables

Create a .env.development file based on .env.example.

```bash
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
MAIL_PASSWORD=
```

## 🔧 Linting & Formatting

- ESLint with TypeScript rules and Prettier

- Pre-commit hooks with Husky and lint-staged
