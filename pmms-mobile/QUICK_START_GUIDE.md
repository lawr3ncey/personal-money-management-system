# 🚀 Quick Start Guide - Running Your React Native App

## 📱 Testing on Expo Go (Mobile)

### Step 1: Install Dependencies
```powershell
cd pmms-mobile
npm install
```

### Step 2: Start Expo Dev Server
```powershell
npm start
```

This will open Expo Dev Tools in your browser and show a QR code in the terminal.

### Step 3: Install Expo Go App
- **Android:** [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS:** [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Step 4: Scan QR Code
- **Android:** Use Expo Go app to scan the QR code
- **iOS:** Use Camera app to scan the QR code, then open in Expo Go

### 🎉 You're Done!
The app will load on your phone. You can now:
- Click "Demo Login" for instant access
- Or register a new account (stored locally)
- Navigate between screens using bottom tabs
- Test authentication features

---

## 🌐 Testing on Web Browser

### Option 1: Press 'w' in Terminal
After running `npm start`, press `w` in the terminal to open the web version.

### Option 2: Direct Command
```powershell
npm run web
```

### Option 3: Manual URL
Open your browser and go to:
```
http://localhost:8081
```

---

## 🔧 Troubleshooting

### Port Already in Use
If port 8081 is already in use:
```powershell
npx expo start --port 8082
```

### Clear Cache
If you see errors:
```powershell
npx expo start --clear
```

### Module Not Found Errors
Reinstall dependencies:
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### TypeScript Errors
Run type check:
```powershell
npm run type-check
```

---

## 📱 Testing Features

### ✅ What Works Now:
1. **Authentication**
   - Demo Login (email: demo@6jars.com, password: demo123)
   - Register new account
   - Logout
   - Profile view

2. **Navigation**
   - Bottom tab navigation
   - All 8 screens accessible
   - Auth flow (login → app)

3. **Data Persistence**
   - All data stored in AsyncStorage (dummy mode)
   - Persists between app restarts
   - No internet required

### ⚠️ Placeholder Screens:
- Dashboard (basic layout)
- Jars (placeholder)
- Transactions (placeholder)
- Budgets (placeholder)
- Goals (placeholder)
- Recurring (placeholder)
- Settings (placeholder)

---

## 🎯 Demo Login Credentials

For quick testing:
- **Email:** demo@6jars.com
- **Password:** demo123

---

## 📊 Expo Dev Tools

After running `npm start`, you'll see options:
- `a` - Open on Android device/emulator
- `i` - Open on iOS simulator (Mac only)
- `w` - Open in web browser
- `r` - Reload app
- `m` - Toggle menu
- `d` - Toggle developer menu
- `shift+d` - Toggle performance monitor

---

## 🔍 Viewing Logs

### In Terminal
All logs appear in the terminal where you ran `npm start`

### In Expo Go App
Shake your device → Show Developer Menu → Toggle Element Inspector

### In Browser Console
Open DevTools (F12) → Console tab

---

## 📸 Screenshots & Testing Checklist

### Test Flow:
1. ✅ Open app → See Login screen
2. ✅ Click "Demo Login" → Navigate to Dashboard
3. ✅ Tap bottom tabs → All screens load
4. ✅ Go to Profile → See user info
5. ✅ Click Logout → Return to Login screen
6. ✅ Try Register → Create new account
7. ✅ Close app and reopen → Still logged in

---

## 🚨 Known Issues

### Type Errors (Non-blocking)
Some TypeScript errors exist but won't prevent the app from running. These are related to Supabase types and will be resolved when implementing full UI.

### Placeholder Screens
Most screens show "content coming soon" - this is expected. Phase 1 focused on foundation.

---

## 📞 Need Help?

### Check Status
```powershell
npm run type-check
```

### View Errors
The app should run despite TypeScript warnings. If it crashes, check the terminal logs.

### Restart Everything
```powershell
# Stop the dev server (Ctrl+C)
npx expo start --clear
```

---

## 🎨 Next Steps After Testing

Once you confirm the app runs:
1. Implement Dashboard UI
2. Add Jars grid with actions
3. Create Transaction list
4. Build Budget tracking UI
5. Implement Goals progress UI
6. Add Export/Import features

---

## 💡 Tips

- **Hot Reload:** Changes auto-reload in Expo Go
- **Shake to Debug:** Shake device for dev menu
- **Network Inspector:** Available in dev menu
- **Element Inspector:** Toggle to see component boundaries
- **Performance:** Check FPS in dev menu

---

**Status:** ✅ App is ready to test!  
**Mode:** Dummy data (no backend required)  
**Platform:** iOS, Android, Web supported  
**Last Updated:** December 2, 2024
