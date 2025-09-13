#!/bin/bash

# Development Docker Script
echo "🚀 Starting Capital H App in Development Mode..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi


# Stop existing dev container
echo "🛑 Stopping existing dev container..."
docker compose --profile dev down


# Build and start development environment
echo "🏗️ Building and starting development environment..."
docker compose --profile dev up --build -d


# Wait for service to be ready
echo "⏳ Waiting for service to be ready..."
sleep 5


# Check service status
echo "🔍 Checking service status..."
docker compose --profile dev ps


# Show logs
echo "📋 Showing application logs..."
docker compose --profile dev logs -f app-dev