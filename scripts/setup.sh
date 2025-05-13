#!/bin/bash

# CORE-SOLUTION Setup Script

echo "🚀 Setting up CORE-SOLUTION..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️ PostgreSQL is not installed. Please install PostgreSQL first."
    echo "You can continue, but make sure to set up a database before running the app."
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Backend setup
echo "🔧 Setting up backend..."
cd backend
npm install

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend .env file. Please update it with your values."
fi

# Setup database
echo "💾 Setting up database..."
npm run db:generate

# Frontend setup
echo "🎨 Setting up frontend..."
cd ../frontend
npm install

# Copy environment file
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created frontend .env.local file. Please update it with your values."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials and API keys"
echo "2. Update frontend/.env.local with your API URL"
echo "3. Run 'npm run dev' in the root directory to start both servers"
echo ""
echo "Happy coding! 🎉"