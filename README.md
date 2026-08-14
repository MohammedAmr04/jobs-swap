# Jobs Swap

**Jobs Swap** is a Tinder-style job discovery app. Users swipe through job listings — swipe **right** to apply, swipe **left** to ignore — so finding a job feels as easy as finding a match.

This repository contains the full application:

- **`client/`** — a mobile app built with React Native (Expo) and Expo Router.
- **`server/`** — a REST API built with Node.js (Express) and Prisma, backed by PostgreSQL.

---

## Features

- Swipeable job cards (right = apply, left = ignore)
- Applied/ignored jobs are tracked per user and hidden from future swipes
- Seed data with 10 sample jobs and a default user
- REST API with a consistent JSON response envelope

## Tech Stack

| Layer    | Technologies                                          |
| -------- | ----------------------------------------------------- |
| Client   | React Native, Expo, Expo Router, Reanimated, Gesture Handler |
| Server   | Node.js, Express, Prisma, PostgreSQL                   |
| Tooling  | TypeScript, Docker Compose, Prisma Migrate             |

---

## Project Structure

```
jobs-swap/
├── client/                  # React Native (Expo) mobile app
│   ├── app/                 # Expo Router screens (tabs, layout)
│   ├── components/          # Reusable UI components (e.g. JobCard)
│   ├── hooks/               # Custom hooks (e.g. useJobs)
│   └── constants/           # Theme and shared constants
└── server/                  # Express + Prisma REST API
    ├── prisma/              # Prisma schema and migrations
    ├── src/
    │   ├── controllers/     # Request handlers
    │   ├── routes/          # Express route definitions
    │   ├── lib/             # Shared infrastructure (Prisma client)
    │   ├── seeding/         # Initial database seed data
    │   └── utils/           # Response helpers
    └── docker-compose.yml   # PostgreSQL + backend containers
```

## API

The backend runs on `http://localhost:3000` and exposes the following endpoints under `/api`:

| Method | Endpoint       | Description                                   |
| ------ | -------------- | --------------------------------------------- |
| GET    | `/api/jobs`    | List jobs (optionally excluding applied/ignored for a `userId`) |
| POST   | `/api/jobs/create` | Create a job (`title`, `description`, `company`) |
| POST   | `/api/jobs/apply`  | Apply to a job (`userId`, `jobId`)         |
| POST   | `/api/jobs/ignore` | Ignore a job (`userId`, `jobId`)          |

Responses follow the shape `{ "status": "success" | "error", "message": string, "data": ... }`.

---

## Getting Started

### 1. Backend Server

The backend lives in the `server` directory. The easiest way to run it (with its database) is Docker Compose.

#### Option A — Docker Compose (Recommended)

```bash
cd server
docker-compose up --build
```

This starts a PostgreSQL container and the backend on port `3000`. The schema is pushed to the database and sample data is seeded on startup.

#### Option B — Local Development

```bash
cd server

# 1. Start only the database
docker-compose up db -d

# 2. Install dependencies
npm install

# 3. Create the .env file with a DATABASE_URL matching the compose DB, e.g.
#    DATABASE_URL=postgresql://postgres:0000@localhost:5432/mydb?schema=public

# 4. Sync the database and generate the Prisma client
npx prisma db push --accept-data-loss
npx prisma generate

# 5. Run in watch mode
npm run dev
```

### 2. Mobile Client (Frontend)

The app is built with React Native and Expo, located in the `client` directory.

```bash
cd client

# Install dependencies
npm install

# Start the Expo dev server
npm start
```

You can also run `npm run android`, `npm run ios`, or `npm run web` for a specific platform.

**Viewing the app:**

- Scan the QR code shown in the terminal with the **Expo Go** app on a physical iOS or Android device, or
- Press `a` in the terminal for the Android emulator or `i` for the iOS simulator.

> **Note:** The client calls the API at `http://localhost:3000/api/jobs` (and `http://<LAN-IP>:3000/api/jobs` on a physical Android device). Make sure the backend is running and reachable from your device.

---

## License

This project is for demonstration/assessment purposes. See the repository owner for licensing details.
