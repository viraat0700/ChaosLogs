# --- Stage 1: Build Frontend ---
FROM node:18-alpine AS client-builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# --- Stage 2: Setup Server & Final Image ---
FROM node:18-alpine

WORKDIR /app

# Install server dependencies
COPY api/package*.json ./api/
WORKDIR /app/api
RUN npm install --production
# Install Transformers.js specifically if needed, likely already in package.json

# Copy server code
COPY api/ ./

# Copy built frontend from Stage 1 to server's public folder (or specialized folder)
# We'll need to instruct Express to serve this.
COPY --from=client-builder /app/client/dist ./public

# Create directory for persistent data if verified volume mount point
RUN mkdir -p /data

# Expore Port
ENV PORT=3000
EXPOSE 3000

# Start command
CMD ["node", "index.js"]
