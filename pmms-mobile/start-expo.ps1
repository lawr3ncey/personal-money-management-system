# Expo Starter Script
# This ensures you always run Expo from the correct directory

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Personal Money Management - Mobile App   " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Get the directory where this script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "Current Directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Verify expo exists
if (-Not (Test-Path ".\node_modules\expo")) {
    Write-Host "⚠️  Expo not found! Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Show available commands
Write-Host "Starting Expo Development Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Available Commands:" -ForegroundColor Yellow
Write-Host "  [w] - Open in web browser"
Write-Host "  [a] - Open on Android device/emulator"
Write-Host "  [i] - Open on iOS simulator (Mac only)"
Write-Host "  [r] - Reload app"
Write-Host "  [m] - Toggle menu"
Write-Host ""
Write-Host "📱 To test on mobile: Install 'Expo Go' app and scan the QR code" -ForegroundColor Cyan
Write-Host ""

# Start Expo
npx expo start --clear
