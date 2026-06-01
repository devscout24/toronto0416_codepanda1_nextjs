# Docker Setup Guide

This project uses Docker for containerization. On Fedora systems, Docker commands may be aliased to podman by default, which can cause authentication issues with Docker Hub.

## Remove Podman Alias and Install Docker

### 1. Remove Podman Alias (Quiet the Message)

Create the nodocker file to suppress the podman emulation message:

```bash
sudo touch /etc/containers/nodocker
```

### 2. Install Docker (Not Podman)

#### For Fedora:

```bash
# Remove podman if already installed (optional)
sudo dnf remove -y podman podman-docker

# Install Docker
sudo dnf install -y docker

# Start and enable Docker daemon
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (optional - to avoid sudo)
sudo usermod -aG docker $USER
newgrp docker
```

#### Verify Installation:

```bash
docker --version
which docker
```

### 3. Authenticate with Docker Hub

```bash
docker login
# Enter your Docker Hub username and password/token
```

### 4. Build and Push Image

```bash
# Build the image
docker build -t shahriakhan/sufismarket:latest .

# Push to Docker Hub
docker push shahriakhan/sufismarket:latest
```

## Using the Deployment Script

```bash
# Set your Docker Hub username
export DOCKER_USERNAME=shahriakhan

# Build the image
./scripts/docker-deploy.sh latest build

# Push to Docker Hub
./scripts/docker-deploy.sh latest push

# Run the container
./scripts/docker-deploy.sh run

# Stop the container
./scripts/docker-deploy.sh stop

# View logs
./scripts/docker-deploy.sh logs
```

## Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart
```

## Troubleshooting

### Error: "requested access to the resource is denied"

- Run `docker login` and verify credentials
- Ensure the repository exists on Docker Hub
- Check that your Docker Hub account has push permissions

### Docker daemon not running

```bash
sudo systemctl start docker
```

### Permission denied errors

```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in, or run:
newgrp docker
```
