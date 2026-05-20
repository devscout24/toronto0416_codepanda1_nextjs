# Windows PowerShell script for development
Write-Host "🚀 Starting Next.js Development Server (Windows)" -ForegroundColor Green
Write-Host "=============================================="

# Check if bun is installed
if (!(Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Bun is not installed. Please install Bun first:" -ForegroundColor Red
    Write-Host "https://bun.sh/docs/installation#windows"
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
bun install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Start development server
Write-Host "🔄 Starting development server..." -ForegroundColor Green
bun run dev
