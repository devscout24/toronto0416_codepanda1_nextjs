#!/bin/bash

# Production Docker Script for Capital H
echo "🚀 Starting Capital H App in Production Mode..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ .env.production file not found. Please create it from .env.example."
    exit 1
fi

# Stop existing prod container
echo "🛑 Stopping existing production container..."
docker compose --profile prod down

# Build and start production environment
echo "🏗️ Building and starting production environment..."
docker compose --profile prod up --build -d

# Wait for service to be ready
echo "⏳ Waiting for service to be ready..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
docker compose --profile prod ps

echo "✅ Production environment is ready!"
echo "🌐 App is available at: http://localhost:3000"

# Show logs (optional)
read -p "Show application logs? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker compose --profile prod logs -f app-prod
fi
