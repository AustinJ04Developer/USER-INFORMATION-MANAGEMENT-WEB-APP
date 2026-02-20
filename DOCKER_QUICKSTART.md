# Docker Quick Start Guide

## Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Ensure Docker is running

## Quick Start

### 1. Start All Services (Development)
```bash
docker-compose up --build
```

This will:
- Build both frontend and backend Docker images
- Start MySQL database
- Start Express backend on `http://localhost:5000`
- Start React frontend on `http://localhost:3000`

### 2. Access Your Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:3306

### 3. View Logs
```bash
docker-compose logs -f
```

To view logs for a specific service:
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### 4. Stop Services
```bash
docker-compose down
```

To stop and remove volumes (database data):
```bash
docker-compose down -v
```

## Key Configuration

**Database Credentials** (in `.env.docker`):
- Host: `mysql` (use service name in Docker)
- Port: `3306`
- User: `root`
- Password: `Austin@2109*#`
- Database: `user_information`

**Network Communication**:
- Frontend container talks to Backend using: `http://backend:5000/api`
- Browser talks to Frontend using: `http://localhost:3000`
- Browser talks to Backend API using: `http://localhost:5000`

## Useful Commands

### Rebuild a single service
```bash
docker-compose up --build backend
```

### Execute a command in a running container
```bash
docker-compose exec backend npm list
docker-compose exec mysql mysql -u root -p user_information
```

### View running containers
```bash
docker ps
```

### Remove all stopped containers and unused images
```bash
docker system prune -a
```

## Troubleshooting

### Port already in use
If port 3000 or 5000 is already in use, modify `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "3001:3000"  # Change to available port
```

### MySQL connection error
Wait 10-20 seconds for MySQL to fully start, or check logs:
```bash
docker-compose logs mysql
```

### Frontend can't reach backend
Ensure:
1. Both containers are running: `docker ps`
2. VITE_API_URL uses `http://backend:5000/api` inside containers
3. For browser requests, use `http://localhost:5000/api`

### Start fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Technology Stack
- **Frontend**: React 19 + Vite + Tailwind CSS + Redux Toolkit
- **Backend**: Express + TypeORM + TypeScript
- **Database**: MySQL 8.0
- **Web Server**: Nginx (serves frontend)

## File Structure
```
.
├── docker-compose.yml       # Development orchestration
├── Dockerfile.prod          # Production compose config (overrides version)
├── .env.docker             # Docker environment variables
├── Backend/
│   ├── Dockerfile          # Backend container config
│   ├── .dockerignore       # Files to exclude from image
│   └── ...
├── Frontend/
│   ├── Dockerfile          # Frontend container config
│   ├── .dockerignore       # Files to exclude from image
│   ├── nginx.conf          # Nginx web server config
│   └── ...
└── README.docker.md        # Detailed Docker documentation
```

## Next Steps
- Check `README.docker.md` for detailed documentation
- Review `docker-compose.yml` for service configuration
- Check `.env.docker` for environment variable setup
