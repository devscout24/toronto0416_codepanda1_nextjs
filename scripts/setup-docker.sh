#!/bin/bash

# Docker Setup Script for Fedora
# Removes podman and installs Docker, then authenticates with Docker Hub

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==========================================${NC}"
echo -e "${BLUE}Docker Setup Script for Fedora${NC}"
echo -e "${BLUE}==========================================${NC}\n"

# Check if running on Fedora
if [ ! -f /etc/fedora-release ]; then
    echo -e "${YELLOW}⚠️  This script is designed for Fedora. You may be on a different distribution.${NC}\n"
fi

# Step 1: Remove podman nodocker message
echo -e "${YELLOW}Step 1: Suppressing podman messages...${NC}"
if [ ! -f /etc/containers/nodocker ]; then
    sudo touch /etc/containers/nodocker
    echo -e "${GREEN}✓ Created /etc/containers/nodocker${NC}\n"
else
    echo -e "${GREEN}✓ /etc/containers/nodocker already exists${NC}\n"
fi

# Step 2: Check if Docker is already installed
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo -e "${GREEN}✓ Docker is already installed: $DOCKER_VERSION${NC}\n"
else
    echo -e "${YELLOW}Step 2: Installing Docker...${NC}"
    
    # Remove podman-docker if it exists
    if sudo dnf list installed podman-docker &> /dev/null; then
        echo "Removing podman-docker..."
        sudo dnf remove -y podman-docker || true
    fi
    
    # Install Docker
    echo "Installing Docker from Fedora repositories..."
    sudo dnf install -y docker
    echo -e "${GREEN}✓ Docker installed successfully${NC}\n"
fi

# Step 3: Start and enable Docker daemon
echo -e "${YELLOW}Step 3: Starting Docker daemon...${NC}"
sudo systemctl start docker
sudo systemctl enable docker
echo -e "${GREEN}✓ Docker daemon started and enabled${NC}\n"

# Step 4: Add user to docker group
echo -e "${YELLOW}Step 4: Adding user to docker group...${NC}"
if ! groups "$USER" | grep -q docker; then
    sudo usermod -aG docker "$USER"
    echo -e "${YELLOW}⚠️  You may need to log out and log back in for group changes to take effect.${NC}"
    echo -e "${YELLOW}    Or run: newgrp docker${NC}\n"
else
    echo -e "${GREEN}✓ User already in docker group${NC}\n"
fi

# Step 5: Verify installation
echo -e "${YELLOW}Step 5: Verifying Docker installation...${NC}"
docker --version
docker ps --no-trunc > /dev/null 2>&1 && echo -e "${GREEN}✓ Docker daemon is accessible${NC}\n" || echo -e "${YELLOW}⚠️  May need to add user to docker group (see Step 4)${NC}\n"

# Step 6: Docker Hub Authentication
echo -e "${YELLOW}Step 6: Docker Hub Authentication${NC}"
read -p "Do you want to login to Docker Hub now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker login
    echo -e "${GREEN}✓ Docker Hub authentication complete${NC}\n"
else
    echo -e "${YELLOW}⚠️  You can login later with: docker login${NC}\n"
fi

# Summary
echo -e "${BLUE}==========================================${NC}"
echo -e "${GREEN}✓ Setup complete!${NC}"
echo -e "${BLUE}==========================================${NC}\n"

echo "Next steps:"
echo "1. Build the Docker image:"
echo "   docker build -t shahriakhan/sufismarket:latest ."
echo ""
echo "2. Push to Docker Hub:"
echo "   docker push shahriakhan/sufismarket:latest"
echo ""
echo "Or use the deployment script:"
echo "   export DOCKER_USERNAME=shahriakhan"
echo "   ./scripts/docker-deploy.sh latest build"
echo "   ./scripts/docker-deploy.sh latest push"
