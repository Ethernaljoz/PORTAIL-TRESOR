FROM node:22.20.0-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc package.json ./

FROM base AS deps
RUN pnpm install --frozen-lockfile

FROM deps AS builder
ARG NUXT_PUBLIC_API_BASE
RUN if [ -n "$NUXT_PUBLIC_API_BASE" ]; then echo "NUXT_PUBLIC_API_BASE=$NUXT_PUBLIC_API_BASE" > .env; fi
COPY . .
RUN pnpm build

FROM node:22.20.0-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV NUXT_PUBLIC_API_BASE=http://localhost:7000/api
ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
