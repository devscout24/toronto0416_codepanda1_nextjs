@echo off
echo 🚀 Starting Next.js Development Server (Windows)
echo ==============================================

:: Check if bun is installed
bun --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Bun is not installed. Please install Bun first:
    echo https://bun.sh/docs/installation#windows
    pause
    exit /b 1
)

:: Install dependencies
echo 📦 Installing dependencies...
bun install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

:: Start development server
echo 🔄 Starting development server...
bun run dev
