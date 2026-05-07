# Docker Deployment Guide

## Prerequisites

- Docker installed (v20+)
- Docker Compose installed (v2+)
- Docker Hub account (or your private registry)

## Quick Start

### 1. Setup Environment Variables

```bash
cp .env.production .env.production.local
# Edit .env.production.local with your actual values
```

### 2. Build Docker Image

```bash
# Build for production
docker build -t sufis_market:latest .

# Or using the helper script
./scripts/docker-deploy.sh v1.0.0 build
```

### 3. Run Container

```bash
# Using docker-compose (recommended)
docker-compose up -d

# Or using helper script
./scripts/docker-deploy.sh run
```

### 4. View Logs

```bash
docker-compose logs -f

# Or using helper script
./scripts/docker-deploy.sh logs
```

### 5. Stop Container

```bash
docker-compose down

# Or using helper script
./scripts/docker-deploy.sh stop
```

## Pushing to Registry

### Docker Hub

```bash
# Login to Docker Hub
docker login

# Build and tag
docker build -t your-username/sufis_market:v1.0.0 .

# Push
docker push your-username/sufis_market:v1.0.0

# Or using helper script (set DOCKER_USERNAME env var)
export DOCKER_USERNAME=your-username
./scripts/docker-deploy.sh v1.0.0 build
./scripts/docker-deploy.sh v1.0.0 push
```

### Private Registry

```bash
# Login to private registry
docker login registry.example.com

# Build and tag
docker build -t registry.example.com/sufis_market:v1.0.0 .

# Push
docker push registry.example.com/sufis_market:v1.0.0
```

## Development

### Run Development Container

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This mounts your source code for live reloading:

- Volumes: Your entire project is mounted (except node_modules and .next)
- Hot reload enabled via Next.js dev server
- Port 3000 exposed for browser access

### Stop Development Container

```bash
docker-compose -f docker-compose.dev.yml down
```

## Key Features

✅ **Multi-stage Build**: Optimized layer caching and reduced final image size
✅ **Security**: Non-root user (nodejs) runs the application
✅ **Signal Handling**: dumb-init ensures proper signal forwarding
✅ **Health Checks**: Automatic container health monitoring
✅ **Resource Limits**: CPU and memory limits for production
✅ **Logging**: Structured JSON logging with rotation
✅ **Networking**: Custom network bridge for service communication
✅ **Performance**: npm ci for reproducible installs, production-only dependencies

## Troubleshooting

### Container exits immediately

```bash
# Check logs
docker-compose logs app

# Check if .env.production.local exists and has required variables
```

### Port already in use

```bash
# Change port in docker-compose.yml
# ports:
#   - "3001:3000"
```

### Health check failing

```bash
# Verify app is running
docker exec sufis_market wget -qO- http://localhost:3000

# Check application logs
docker logs sufis_market
```

### Out of memory

```bash
# Increase memory limit in docker-compose.yml
# deploy:
#   resources:
#     limits:
#       memory: 4G
```

## Production Deployment

### Using Docker Swarm

```bash
docker stack deploy -c docker-compose.yml sufis_market
```

### Using Kubernetes

Convert docker-compose to Kubernetes manifests:

```bash
# Install kompose
kumpose convert -f docker-compose.yml

# Deploy
kubectl apply -f .
```

### Using cloud platforms

- **AWS ECS**: Use ECR as image registry, deploy via ECS console
- **Google Cloud Run**: Push to GCR, deploy via Cloud Run
- **Azure Container Instances**: Push to ACR, deploy via ACI
- **DigitalOcean App Platform**: Connect GitHub repo, auto-deploy

## Maintenance

### Cleanup old images

```bash
docker image prune -a
```

### Cleanup stopped containers

```bash
docker container prune
```

### Update image

```bash
docker pull your-username/sufis_market:latest
docker-compose pull
docker-compose up -d
```

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment/docker)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
