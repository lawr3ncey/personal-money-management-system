# Animated Sidebar Installation Script
# Run this script to complete the animated sidebar integration

Write-Host "🎨 Animated Sidebar Integration Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the correct directory
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the pmms-frontend directory." -ForegroundColor Yellow
    Write-Host "Example: cd pmms-frontend" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Installing lucide-react icons..." -ForegroundColor Yellow
npm install lucide-react

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ lucide-react installed successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️  lucide-react installation failed, but the sidebar will work with built-in SVG icons." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Open src/admin/AdminRoutes.jsx" -ForegroundColor White
Write-Host "2. Replace this line:" -ForegroundColor White
Write-Host "   import AdminLayout from './components/AdminLayout';" -ForegroundColor Gray
Write-Host "   with:" -ForegroundColor White
Write-Host "   import AdminLayout from './components/AdminLayoutAnimated';" -ForegroundColor Green
Write-Host ""
Write-Host "3. Start the dev server:" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Read ANIMATED_SIDEBAR_INTEGRATION.md for full documentation" -ForegroundColor Cyan
Write-Host ""
