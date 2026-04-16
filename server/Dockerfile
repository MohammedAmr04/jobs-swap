FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Initial prisma model generation
COPY prisma ./prisma/
RUN npx prisma generate

# Copy project files
COPY . .

# Build TS files
RUN npm run build

# Expose backend port
EXPOSE 3000

# Push DB schema on start to ensure DB is correctly set, then start
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm start"]
