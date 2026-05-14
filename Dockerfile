FROM node:22-alpine AS deps
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --config.confirmModulesPurge=false && pnpm approve-builds sharp

FROM node:22-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG SITE_LOCALE=en
ARG THEME_KEY=elegant
ARG NEXT_PUBLIC_CMS_URL=https://cms.zojewel.com
ARG NEXT_PUBLIC_SITE_DOMAIN=zojewel.com
ARG NEXT_PUBLIC_STORE_NAME=Velori
ENV SITE_LOCALE=
ENV THEME_KEY=
ENV NEXT_PUBLIC_CMS_URL=
ENV NEXT_PUBLIC_SITE_DOMAIN=
ENV NEXT_PUBLIC_STORE_NAME=
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
