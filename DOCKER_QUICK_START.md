# Docker Quick Start Guide

Your project is now configured for Docker using the native Docker engine (not podman).

## Current Status ✓

- ✓ Docker 29.4.2 installed
- ✓ Docker daemon running
- ✓ User permissions configured
- ✓ Image built: `shahriakhan/sufismarket:latest` (430MB)

## Quick Commands

### Build Image

```bash
# With sudo (if not added to docker group yet)
sudo docker build -t shahriakhan/sufismarket:latest .

# Without sudo (if docker group working)
docker build -t shahriakhan/sufismarket:latest .
```

### Push to Docker Hub

```bash
# First, login (one time only)
docker login
# Enter your Docker Hub username and password/token

# Then push
sudo docker push shahriakhan/sufismarket:latest
```

### Run Container Locally

```bash
# Using docker-compose
docker-compose up -d

# Using docker directly
docker run -d \
  --name sufis_market \
  -p 3000:3000 \
  -e NODE_ENV=production \
  shahriakhan/sufismarket:latest
```

### View Logs

```bash
# Docker-compose
docker-compose logs -f

# Docker directly
docker logs -f sufis_market
```

### Stop Container

```bash
# Docker-compose
docker-compose down

# Docker directly
docker stop sufis_market
```

## Using the Quick Deploy Script

```bash
# Make executable (one time)
chmod +x ./scripts/docker-quick-deploy.sh

# Build the image
./scripts/docker-quick-deploy.sh build

# Push to Docker Hub
./scripts/docker-quick-deploy.sh push

# Build and push together
./scripts/docker-quick-deploy.sh build-push

# Run with docker-compose
./scripts/docker-quick-deploy.sh run

# Stop containers
./scripts/docker-quick-deploy.sh stop

# View logs
./scripts/docker-quick-deploy.sh logs

# Clean up images and containers
./scripts/docker-quick-deploy.sh clean
```

## Environment Variables

Set these before building for custom behavior:

```bash
# Custom Docker Hub username
export DOCKER_USERNAME=your-username

# Custom image tag
export IMAGE_TAG=v1.0.0

# Then build
./scripts/docker-quick-deploy.sh build
```

## Dockerfile Details

The multi-stage Dockerfile includes:

1. **deps stage** - Production dependencies only
2. **builder stage** - Build Next.js app
3. **production stage** - Final optimized runtime
   - Non-root nodejs user for security
   - Health checks enabled
   - Minimal image size (~430MB)

## Docker Compose

Configuration in `docker-compose.yml`:

- Port 3000 mapping
- Production environment
- Custom API endpoints
- Google Maps API key

## Troubleshooting

### Docker command not found

```bash
# Verify Docker is installed
which docker
docker --version

# Start Docker daemon
sudo systemctl start docker
```

### Permission denied errors

```bash
# Add user to docker group (one time)
sudo usermod -aG docker $USER
newgrp docker
```

### Cannot login to Docker Hub

```bash
# Clear existing credentials
docker logout

# Login again
docker login
```

### Image too large

The multi-stage build optimizes the final image. To reduce further:

- Check `.dockerignore` for unnecessary files
- Remove devDependencies from production build
- Use `npm ci` instead of `npm install`

## Next Steps

1. **Login to Docker Hub** (if not done yet):

   ```bash
   docker login
   ```

2. **Push image**:

   ```bash
   sudo docker push shahriakhan/sufismarket:latest
   ```

3. **Verify on Docker Hub**: Visit https://hub.docker.com/r/shahriakhan/sufismarket

## Files Modified/Created

- ✓ Updated `Dockerfile` - Multi-stage optimized build
- ✓ Created `DOCKER_SETUP.md` - Detailed setup guide
- ✓ Created `scripts/setup-docker.sh` - Automated setup
- ✓ Created `scripts/docker-quick-deploy.sh` - Quick deploy utility
- ✓ Updated `.dockerignore` - Optimized build context

---

For more details, see `DOCKER_SETUP.md`
