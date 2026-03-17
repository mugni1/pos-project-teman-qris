# ===== Stage 1: Build =====
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

ARG NEXT_PUBLIC_BASE_API_URL
ARG NEXT_PUBLIC_BASE_ORIGIN_URL
ARG NEXT_PUBLIC_TIMEOUT
ENV NEXT_PUBLIC_BASE_API_URL=$NEXT_PUBLIC_BASE_API_URL
ENV NEXT_PUBLIC_BASE_ORIGIN_URL=$NEXT_PUBLIC_BASE_ORIGIN_URL
ENV NEXT_PUBLIC_TIMEOUT=$NEXT_PUBLIC_TIMEOUT

# Copy deps
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# Copy source
COPY . .

# Build Next.js
RUN pnpm build


# ===== Stage 2: Run =====
FROM node:20-alpine

WORKDIR /app

# Copy hasil standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]