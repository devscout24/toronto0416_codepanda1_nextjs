#!/bin/bash

# Docker deployment helper script
# Usage: ./scripts/docker-deploy.sh <action> [options]

set -e

PROJECT_NAME="sufis_market"
DOCKER_REGISTRY="${DOCKER_REGISTRY:-docker.io}"
DOCKER_USERNAME="${DOCKER_USERNAME}"
IMAGE_NAME="${DOCKER_USERNAME}/${PROJECT_NAME}"
IMAGE_TAG="${1:-latest}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Docker Deployment Helper${NC}"
echo "========================="

case "${2}" in
  "build")
    echo -e "${GREEN}Building Docker image: ${IMAGE_NAME}:${IMAGE_TAG}${NC}"
    docker build \
      --tag ${IMAGE_NAME}:${IMAGE_TAG} \
      --tag ${IMAGE_NAME}:latest \
      --build-arg NODE_ENV=production \
      .
    echo -e "${GREEN}Build complete!${NC}"
    ;;
  "push")
    echo -e "${GREEN}Pushing image to registry...${NC}"
    docker push ${IMAGE_NAME}:${IMAGE_TAG}
    docker push ${IMAGE_NAME}:latest
    echo -e "${GREEN}Push complete!${NC}"
    ;;
  "run")
    echo -e "${GREEN}Running container in production mode...${NC}"
    docker-compose -f docker-compose.yml up -d
    echo -e "${GREEN}Container started!${NC}"
    docker-compose -f docker-compose.yml ps
    ;;
  "stop")
    echo -e "${YELLOW}Stopping containers...${NC}"
    docker-compose -f docker-compose.yml down
    echo -e "${GREEN}Stopped!${NC}"
    ;;
  "logs")
    echo -e "${GREEN}Showing logs...${NC}"
    docker-compose -f docker-compose.yml logs -f
    ;;
  "dev")
    echo -e "${GREEN}Running container in development mode...${NC}"
    docker-compose -f docker-compose.dev.yml up -d
    echo -e "${GREEN}Development container started!${NC}"
    docker-compose -f docker-compose.dev.yml ps
    ;;
  "dev-stop")
    echo -e "${YELLOW}Stopping development container...${NC}"
    docker-compose -f docker-compose.dev.yml down
    echo -e "${GREEN}Stopped!${NC}"
    ;;
  *)
    echo -e "${RED}Available commands:${NC}"
    echo "  ./scripts/docker-deploy.sh <tag> build    - Build Docker image"
    echo "  ./scripts/docker-deploy.sh <tag> push     - Push to registry"
    echo "  ./scripts/docker-deploy.sh <tag> run      - Run production container"
    echo "  ./scripts/docker-deploy.sh stop           - Stop containers"
    echo "  ./scripts/docker-deploy.sh logs           - View container logs"
    echo "  ./scripts/docker-deploy.sh dev            - Run development container"
    echo "  ./scripts/docker-deploy.sh dev-stop       - Stop development container"
    echo ""
    echo -e "${YELLOW}Example:${NC}"
    echo "  ./scripts/docker-deploy.sh v1.0.0 build"
    echo "  ./scripts/docker-deploy.sh v1.0.0 push"
    exit 1
    ;;
esac
