# ===== BUILD STAGE =====
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the Vite project
RUN npm run build

# ===== RUN STAGE =====
FROM node:20-alpine

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Install a lightweight static server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the Vite build using 'serve'
CMD ["serve", "-s", "dist", "-l", "3000"]
