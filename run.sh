#!/bin/bash

set -e

echo "Checking Docker availability..."
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed or not in PATH"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Error: docker-compose is not installed or not in PATH"
    exit 1
fi

echo "Building and starting containers..."
docker-compose up --build -d

echo "Waiting for services to be healthy..."

check_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            echo "$name is healthy"
            return 0
        fi
        echo "Waiting for $name... (attempt $attempt/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done

    echo "Error: $name failed to become healthy"
    return 1
}

check_service "http://localhost:8000/api/health" "Backend"
check_service "http://localhost:3000" "Frontend"

echo ""
echo "========================================="
echo "  Calcu is running!"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "========================================="