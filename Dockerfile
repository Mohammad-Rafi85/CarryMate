# --- Stage 1: Build the React Frontend ---
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Install common build tools for native modules (esbuild, etc)
RUN apt-get update && apt-get install -y python3 make g++ 

# Copy package files (we will NOT copy package-lock.json from local to avoid architecture issues)
COPY frontend/package.json ./

# RUN clean install inside the container
RUN npm install

# Copy frontend source and build (ignore node_modules via .dockerignore)
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build the Spring Boot Backend ---
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend
# Copy backend source
COPY backend/ ./
# Copy built frontend from Stage 1 into the Spring Boot static folder
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
# Build the final JAR
RUN mvn clean package -DskipTests

# --- Stage 3: Runtime Image ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Find and copy the built JAR into the final image
COPY --from=backend-build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
