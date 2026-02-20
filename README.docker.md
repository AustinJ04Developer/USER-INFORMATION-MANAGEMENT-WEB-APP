# Docker Setup Guide

This guide explains how to run your MERN Stack application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually comes with Docker Desktop)

## Running with Docker Compose

### Development Environment

1. **Start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MySQL: localhost:3306

3. **View logs:**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

### Production Environment

1. **Build images:**
   ```bash
   docker-compose -f docker-compose.yml build
   ```

2. **Run in production:**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost/api

## Useful Commands

### View running containers
```bash
docker ps
```

### View all containers
```bash
docker ps -a
```

### View container logs
```bash
docker logs <container-name>
```

### Stop specific service
```bash
docker-compose stop <service-name>
```

### Remove volumes (clean database)
```bash
docker-compose down -v
```

### Rebuild a specific service
```bash
docker-compose up --build <service-name>
```

### Execute command in container
```bash
docker-compose exec <service-name> <command>
```

## Troubleshooting

### Port already in use
If port 3000 or 5000 is already in use:
1. Change the port mapping in `docker-compose.yml`
2. Or stop other services using those ports

### Database connection error
1. Ensure MySQL container is healthy: `docker-compose logs mysql`
2. Give MySQL a moment to start fully (10-20 seconds)
3. Check database credentials in `.env.docker`

### Frontend can't reach backend
1. Ensure both containers are on the same network
2. Use the service name (`backend`) instead of `localhost` for API calls
3. Check nginx configuration in `nginx.conf`

### Clear everything and start fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## File Structure

- `Dockerfile` - Backend build configuration
- `Frontend/Dockerfile` - Frontend build configuration with Nginx
- `Frontend/nginx.conf` - Nginx reverse proxy configuration
- `docker-compose.yml` - Development environment orchestration
- `.env.docker` - Docker environment variables

## Network Communication

In Docker Compose:
- Frontend → Backend: Uses `http://backend:5000`
- Backend → MySQL: Uses `mysql:3306`
- Browser → Frontend: Uses `localhost:3000`
- Browser → Backend (via Nginx proxy): Uses `localhost:3000/api`
