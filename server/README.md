# Nabeh Tech Assessment - Server

This is the Express & Prisma backend for the Nabeh Tech Assessment.

## Prerequisites

- Node.js (version 18 or above recommended)
- PostgreSQL (if running locally without Docker)
- Docker Desktop (Optional, for running with Docker Compose)

## Running Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   Update the `.env` file with your PostgreSQL connection string if different from the default:
   ```env
   DATABASE_URL="postgresql://postgres:0000@localhost:5432/mydb?schema=public"
   ```

3. **Prisma Setup**
   Generate the Prisma client and push your schema to the running database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the Server**
   Start the development server with live reload:
   ```bash
   npm run dev
   ```
   The backend will be running at `http://localhost:3000` and will seed the initialization data upon load.

## Running with Docker Compose

To simplify the setup, you can launch both the Postgres database and the Backend server together using Docker without needing a local development configuration for PostgreSQL.

1. Ensure Docker Desktop or Docker Engine is running on your machine.
2. Build and start the containers directly via Docker Compose from the `server` directory:
   ```bash
   docker-compose up -d --build
   ```

This command automatically:
- Starts a Postgres 15 database on port `5432`.
- Builds the backend Node.js application image.
- Starts the Express API backend on port `3000` (connected to the Postgres service).
- Ensures the database is healthy before starting the server.
- Synchronizes the database schema to the database automatically.
- Upon successful execution, the backend will become available on your local `http://localhost:3000/api`.

## Environment Variables
- `DATABASE_URL`: Defines the database connection string. When run using Docker Compose, it defaults internally to the `db` service hostname setup.
