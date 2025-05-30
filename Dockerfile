# 1) Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only the pieces we need to run
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# Start in production mode
CMD ["npx", "next", "start"]