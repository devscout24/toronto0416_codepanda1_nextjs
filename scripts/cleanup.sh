#!/bin/bash

# Cleanup Docker Script for Capital H App
echo "🧹 Cleaning up Docker resources..."

# Stop all containers
echo "🛑 Stopping all containers..."
docker compose --profile dev --profile prod down

# Remove containers
echo "🗑️ Removing containers..."
docker compose --profile dev --profile prod rm -f

# Remove images (optional)
read -p "Remove Docker images? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Removing images..."
    docker image rm $(docker images "capital_h_*" -q) 2>/dev/null || true
fi

# Remove volumes (optional)
read -p "Remove Docker volumes (will delete database data)? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ Removing volumes..."
    docker compose --profile dev --profile prod down -v
fi

# System cleanup
echo "🧹 Running Docker system cleanup..."
docker system prune -f

echo "✅ Cleanup completed!"
