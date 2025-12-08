@echo off
REM Expo Starter Batch Script (Windows CMD)
REM This ensures you always run Expo from the correct directory

echo ============================================
echo    Personal Money Management - Mobile App
echo ============================================
echo.

cd /d "%~dp0"
echo Current Directory: %CD%
echo.

if not exist "node_modules\expo" (
    echo [WARNING] Expo not found! Installing dependencies...
    call npm install
    echo.
)

echo Starting Expo Development Server...
echo.
echo Available Commands:
echo   [w] - Open in web browser
echo   [a] - Open on Android device/emulator
echo   [i] - Open on iOS simulator (Mac only)
echo   [r] - Reload app
echo   [m] - Toggle menu
echo.
echo To test on mobile: Install 'Expo Go' app and scan the QR code
echo.

npx expo start --clear
