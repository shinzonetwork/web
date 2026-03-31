FROM oven/bun:1-alpine
WORKDIR /app
COPY apps/health-proxy/package.json .
RUN bun install
COPY apps/health-proxy/index.ts .
EXPOSE 3001
CMD ["bun", "run", "index.ts"]
