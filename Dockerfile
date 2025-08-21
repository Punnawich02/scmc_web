# ---- Stage 1: Build Next.js ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json ก่อนเพื่อลด rebuild
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm ci

# Copy source code ทั้งหมด (รวม prisma folder)
COPY . .

# ตรวจ schema
RUN ls -la ./prisma/schema.prisma

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build

# ---- Stage 2: Run Next.js ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
ENV HOST=0.0.0.0  

# ติดตั้ง production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build result
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copy Prisma schema + client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Run migrations ก่อน start container
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

EXPOSE 3002
