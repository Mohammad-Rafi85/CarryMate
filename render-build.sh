#!/usr/bin/env bash
# Exit on error
set -o errexit

echo ">>> Building Frontend..."
cd frontend
npm install
npm run build

echo ">>> Building Backend..."
cd ../backend
mvn clean install -DskipTests

echo ">>> Build Complete!"
