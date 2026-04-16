# Project Overview

This repository contains a full-stack application with a React Native (Expo) client and a Node.js (Express) backend using Prisma and PostgreSQL.

Here are the instructions to get everything up and running!

---

## 1. Backend Server

The backend is located in the `server` directory. The easiest way to run the backend and its database is through Docker Compose.

### Running via Docker (Recommended)

1. Navigate into the `server` directory:
   ```bash
   cd server
   ```
2. Start the database and backend services using Docker:
   ```bash
   docker-compose up --build
   ```
   _This will start a PostgreSQL container and your Node.js backend container automatically on port 3000._

### Local Development (Without Dockerizing the Backend)

If you prefer to develop the backend directly on your machine:

1. Start just the PostgreSQL database in the background:
   ```bash
   cd server
   docker-compose up db -d
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env` configuration (make sure your `.env` contains `DATABASE_URL=postgresql://postgres:0000@localhost:5432/mydb?schema=public` to match the DB).
4. Run Prisma database sync and client generation:
   ```bash
   npx prisma db push --accept-data-loss
   npx prisma generate
   ```
5. Start the backend in development watch mode:
   ```bash
   npm run dev
   ```

---

## 2. Mobile Client (Frontend)

The frontend is built using React Native and Expo, located in the `client` directory.

1. Open a new terminal and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install all the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:

   ```bash
   npm start
   ```

   _(or `npm run android`, `npm run ios`, `npm run web` depending on your target platform)_

4. **Viewing the App:**
   - Scan the QR code shown in the terminal using the **Expo Go** app on your physical iOS or Android device.
   - Alternatively, press `a` in the terminal to run it on an Android Emulator or `i` for an iOS Simulator.
