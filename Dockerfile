FROM node:20-alpine AS base
WORKDIR /app

# Stage: install dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Stage: build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG PAYLOAD_SECRET
ARG DATABASE_URI
ARG PAYLOAD_PUBLIC_SERVER_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV PAYLOAD_PUBLIC_SERVER_URL=$PAYLOAD_PUBLIC_SERVER_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage: production runner
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3001

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001
CMD ["node", "server.js"]
