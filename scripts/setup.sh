#!/bin/bash

# This script sets up the development environment for the SME Crowdfunding project.

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Install Node.js and npm
echo "Installing Node.js and npm..."
sudo apt-get install -y nodejs npm

# Install Yarn
echo "Installing Yarn..."
sudo npm install -g yarn

# Install dependencies for frontend
echo "Installing frontend dependencies..."
cd frontend
yarn install

# Install dependencies for backend
echo "Installing backend dependencies..."
cd ../backend
yarn install

# Setup database (if applicable)
# echo "Setting up the database..."
# Uncomment and modify the following line based on your database setup
# npx prisma migrate dev

echo "Development environment setup complete!"