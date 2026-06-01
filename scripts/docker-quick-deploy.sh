#!/bin/bash

# Quick Docker Build & Push Script
# Usage: ./scripts/docker-quick-deploy.sh [action]
# Actions: build, push, build-push, run, stop, logs, clean

set -e

# Configuration
PROJECT_NAME="sufismarket"
DOCKER_USERNAME="${DOCKER_USERNAME:-shahriakhan}"
IMAGE_NAME="${DOCKER_USERNAME}/${PROJECT_NAME}"
IMAGE_TAG="${IMAGE_TAG:-latest}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_usage() {
    echo -e "${BLUE}Docker Quick Deploy Script${NC}"
    echo ""
    echo "Usage: $0 [action]"
    echo ""
    echo "Actions:"
    echo "  build       - Build Docker image"
    echo "  push        - Push image to Docker Hub"
    echo "  build-push  - Build and push (default)"
    echo "  run         - Run container with docker-compose"
    echo "  stop        - Stop running containers"
    echo "  logs        - View container logs"
    echo "  clean       - Remove image and stopped containers"
    echo ""
    echo "Environment variables:"
    echo "  DOCKER_USERNAME  - Docker Hub username (default: shahriakhan)"
    echo "  IMAGE_TAG        - Image tag (default: latest)"
    echo ""
    echo "Examples:"
    echo "  $0 build"
    echo "  DOCKER_USERNAME=myuser $0 build-push"
    echo "  IMAGE_TAG=v1.0.0 $0 build-push"
}

build_image() {
    echo -e "${YELLOW}Building image: ${IMAGE_NAME}:${IMAGE_TAG}${NC}"
    docker build \
        --tag "${IMAGE_NAME}:${IMAGE_TAG}" \
        --tag "${IMAGE_NAME}:latest" \
        --build-arg NODE_ENV=production \
        .
    echo -e "${GREEN}✓ Build complete!${NC}\n"
}

push_image() {
    echo -e "${YELLOW}Pushing image to Docker Hub...${NC}"
    docker push "${IMAGE_NAME}:${IMAGE_TAG}"
    docker push "${IMAGE_NAME}:latest"
    echo -e "${GREEN}✓ Push complete!${NC}\n"
}

run_container() {
    echo -e "${YELLOW}Starting container...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✓ Container started!${NC}"
    echo ""
    docker-compose ps
    echo ""
}

stop_container() {
    echo -e "${YELLOW}Stopping container...${NC}"
    docker-compose down
    echo -e "${GREEN}✓ Container stopped!${NC}\n"
}

view_logs() {
    echo -e "${YELLOW}Displaying logs (Ctrl+C to exit)...${NC}\n"
    docker-compose logs -f
}

clean_up() {
    echo -e "${YELLOW}Cleaning up images and containers...${NC}"
    docker-compose down --rmi all 2>/dev/null || true
    docker rmi "${IMAGE_NAME}:${IMAGE_TAG}" 2>/dev/null || true
    docker rmi "${IMAGE_NAME}:latest" 2>/dev/null || true
    echo -e "${GREEN}✓ Cleanup complete!${NC}\n"
}

# Main logic
ACTION="${1:-build-push}"

case "${ACTION}" in
    build)
        build_image
        ;;
    push)
        push_image
        ;;
    build-push)
        build_image
        push_image
        ;;
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    logs)
        view_logs
        ;;
    clean)
        clean_up
        ;;
    *)
        print_usage
        exit 1
        ;;
esac
