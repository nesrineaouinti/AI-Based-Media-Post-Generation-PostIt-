#!/bin/bash

echo "Starting PostIt Project Setup"

#Step 1: Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

#"""Step 2: Check if Python is installed"""
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install it first."
    exit 1
fi

#"""Step 3: Load environment variables"""
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
    echo "✅ Environment variables loaded."
else
    echo "⚠️ .env file not found. Using default settings."
fi

#"""Step 4: Set up and run the backend"""
echo "Setting up the Django backend..."
cd postit_backend || exit
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput &
python manage.py runserver 0.0.0.0:8000 &
cd ..

#"""Step 5: Set up and run the frontend"""
echo "Setting up the React frontend..."
cd postit || exit
npm install
npm start &
cd ..

echo "✅ PostIt is running!"
echo "🌍 Frontend: http://localhost:3000"
echo "🛠️ Backend API: http://http://127.0.0.1:8000/"
