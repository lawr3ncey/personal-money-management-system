# 🚀 PROJECT RELOCATION GUIDE
## Moving Out of XAMPP for Stability

---

## ⚠️ WHY YOU MUST MOVE OUT OF XAMPP

Your project is currently at:
```
C:\xampp\htdocs\personal-money-management-system
```

**Problems with XAMPP htdocs:**

1. **File Watcher Failures**
   - Node.js file watchers fail in Apache web roots
   - Hot reload doesn't work properly
   - Changes not detected automatically

2. **Permission Issues**
   - XAMPP runs with web server permissions
   - node_modules symlinks may fail
   - npm install can have errors

3. **Bundler Instability**
   - Webpack/Metro bundlers crash randomly
   - Cache corruption
   - Build failures

4. **Performance Issues**
   - Slower file I/O
   - Antivirus interference
   - Apache locks files

**XAMPP is ONLY for PHP projects like WordPress.**

Node.js/React/Expo should NEVER run from htdocs.

---

## ✅ RECOMMENDED PROJECT LOCATION

Move to one of these locations:

```
Option 1 (Recommended): C:\Projects\personal-money-management-system
Option 2: C:\Users\Lenovo\Projects\personal-money-management-system
Option 3: C:\Dev\personal-money-management-system
Option 4: D:\Projects\personal-money-management-system (if you have D: drive)
```

**Why these are better:**
- ✅ No web server interference
- ✅ Proper file permissions
- ✅ File watchers work correctly
- ✅ Faster performance
- ✅ No symlink issues

---

## 📦 RELOCATION METHOD 1: Simple Move (Fastest)

### Step 1: Close Everything
```powershell
# Close ALL:
# - VS Code
# - All PowerShell/CMD windows
# - Running dev servers
# - Expo DevTools
```

### Step 2: Move the Folder
```powershell
# Open PowerShell as Administrator
Move-Item "C:\xampp\htdocs\personal-money-management-system" "C:\Projects\personal-money-management-system"
```

### Step 3: Open in New Location
```powershell
cd C:\Projects\personal-money-management-system
code .
```

### Step 4: Reinstall Dependencies

**Mobile:**
```powershell
cd C:\Projects\personal-money-management-system\pmms-mobile
rm -r -fo node_modules
npm install
```

**Frontend:**
```powershell
cd C:\Projects\personal-money-management-system\pmms-frontend
rm -r -fo node_modules
npm install
```

**Backend:**
```powershell
cd C:\Projects\personal-money-management-system\pmms-backend-node
rm -r -fo node_modules
npm install
```

### Step 5: Test Everything

**Start Backend:**
```powershell
cd C:\Projects\personal-money-management-system\pmms-backend-node
npm start
```

**Start Frontend (new terminal):**
```powershell
cd C:\Projects\personal-money-management-system\pmms-frontend
npm start
```

**Start Mobile (new terminal):**
```powershell
cd C:\Projects\personal-money-management-system\pmms-mobile
npx expo start --clear
```

---

## 📦 RELOCATION METHOD 2: Fresh Clone (If Using Git)

### Step 1: Commit Current Changes
```powershell
cd C:\xampp\htdocs\personal-money-management-system
git add .
git commit -m "Backup before relocation"
git push
```

### Step 2: Clone to New Location
```powershell
cd C:\Projects
git clone <your-repository-url> personal-money-management-system
cd personal-money-management-system
```

### Step 3: Install All Dependencies
```powershell
# Mobile
cd pmms-mobile
npm install

# Frontend
cd ../pmms-frontend
npm install

# Backend
cd ../pmms-backend-node
npm install
```

### Step 4: Copy Environment Files
```powershell
# If you have .env files in the old location, copy them
Copy-Item "C:\xampp\htdocs\personal-money-management-system\pmms-mobile\.env" "C:\Projects\personal-money-management-system\pmms-mobile\.env"
Copy-Item "C:\xampp\htdocs\personal-money-management-system\pmms-frontend\.env" "C:\Projects\personal-money-management-system\pmms-frontend\.env"
Copy-Item "C:\xampp\htdocs\personal-money-management-system\pmms-backend-node\.env" "C:\Projects\personal-money-management-system\pmms-backend-node\.env"
```

### Step 5: Test and Delete Old Folder
```powershell
# Test everything works in new location first!
# Then delete old folder:
rm -r -fo C:\xampp\htdocs\personal-money-management-system
```

---

## 📦 RELOCATION METHOD 3: Manual Copy (Safest)

### Step 1: Create Projects Folder
```powershell
New-Item -ItemType Directory -Force -Path "C:\Projects"
```

### Step 2: Copy Entire Project
```powershell
Copy-Item "C:\xampp\htdocs\personal-money-management-system" "C:\Projects\personal-money-management-system" -Recurse
```

### Step 3: Clean and Reinstall
```powershell
cd C:\Projects\personal-money-management-system

# Mobile
cd pmms-mobile
rm -r -fo node_modules, .expo, .expo-shared, package-lock.json
npm install

# Frontend  
cd ../pmms-frontend
rm -r -fo node_modules, package-lock.json
npm install

# Backend
cd ../pmms-backend-node
rm -r -fo node_modules, package-lock.json
npm install
```

### Step 4: Test Everything
```powershell
# Test all three apps work correctly
# If successful, delete the old folder:
rm -r -fo C:\xampp\htdocs\personal-money-management-system
```

---

## 🔧 UPDATE GIT REMOTE (If Applicable)

If your Git remote URLs were using local paths:

```powershell
cd C:\Projects\personal-money-management-system

# Check current remote
git remote -v

# If it shows local paths, update to your actual repository URL
git remote set-url origin https://github.com/yourusername/personal-money-management-system.git
```

---

## 📝 UPDATE VS CODE WORKSPACE SETTINGS

After moving, update your `.vscode/settings.json` if you have workspace-specific settings:

```powershell
cd C:\Projects\personal-money-management-system
code .vscode/settings.json
```

Update any absolute paths to reflect the new location.

---

## ⚡ UPDATE ENVIRONMENT VARIABLES

If you have any `.env` files with absolute paths, update them:

### pmms-mobile/.env
```env
# OLD (if you had this)
API_BASE_URL=http://localhost:8080

# No change needed - relative URLs work from anywhere
```

### pmms-backend-node/.env
```env
# Check for any absolute file paths and update if needed
```

---

## ✅ VERIFICATION CHECKLIST

After relocation, verify:

- [ ] Git status shows correct repository
- [ ] All node_modules installed without errors
- [ ] Backend starts: `npm start` in pmms-backend-node
- [ ] Frontend starts: `npm start` in pmms-frontend
- [ ] Mobile starts: `npx expo start` in pmms-mobile
- [ ] Hot reload works (make a change, see it update)
- [ ] No file watcher errors in console
- [ ] Build commands work
- [ ] Tests run successfully

---

## 🚨 COMMON ISSUES AFTER MOVING

### Issue: "Cannot find module"
**Fix:**
```powershell
rm -r -fo node_modules, package-lock.json
npm install
```

### Issue: "Permission denied"
**Fix:**
```powershell
# Run PowerShell as Administrator, then:
npm cache clean --force
npm install
```

### Issue: "Port already in use"
**Fix:**
```powershell
# Kill processes using the port
netstat -ano | findstr :8080
taskkill /PID <process_id> /F
```

### Issue: Git shows all files as changed
**Fix:**
```powershell
# Line ending issue, normalize:
git config core.autocrlf true
git rm -rf --cached .
git add .
```

---

## 💾 WHAT ABOUT THE PHP BACKEND?

If you need to keep `pmms-backend/` (PHP API) in XAMPP:

**Option 1: Keep it in XAMPP**
```
C:\xampp\htdocs\pmms-backend\    ← PHP stays here
C:\Projects\...                   ← Node/React/Expo move here
```

**Option 2: Move it too and use PHP built-in server**
```powershell
cd C:\Projects\personal-money-management-system\pmms-backend
php -S localhost:8000
```

**Option 3: Remove it (if not needed)**
```powershell
# If pmms-backend-node is your main API, you may not need the PHP version
```

---

## 📊 BEFORE vs AFTER

### BEFORE (Current - Bad)
```
C:\xampp\htdocs\personal-money-management-system\
├── pmms-mobile/          ❌ File watcher issues
├── pmms-frontend/        ❌ Hot reload fails
└── pmms-backend-node/    ❌ Permission problems
```

### AFTER (Recommended - Good)
```
C:\Projects\personal-money-management-system\
├── pmms-mobile/          ✅ Everything works
├── pmms-frontend/        ✅ Hot reload works
└── pmms-backend-node/    ✅ No issues
```

---

## 🎯 TIMELINE

**Estimated Time:** 15-30 minutes

1. **Backup/Commit** → 2 minutes
2. **Move/Clone** → 5 minutes
3. **Reinstall Dependencies** → 10 minutes (depends on internet)
4. **Testing** → 5-10 minutes

**Worth it?** ✅ YES - saves hours of debugging bundler issues later!

---

## 🆘 NEED HELP?

If you encounter issues during relocation:

1. **Don't delete the old folder** until new location is tested
2. **Check error messages** carefully
3. **Verify Node.js version:** `node --version` (should be >= 18.x)
4. **Clear all caches:**
   ```powershell
   npm cache clean --force
   npx expo start --clear
   ```

---

## 📚 ADDITIONAL RESOURCES

- [Node.js Best Practices](https://nodejs.org/en/docs/guides)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Setup](https://reactnative.dev/docs/environment-setup)

---

*Guide created: December 3, 2025*
*Purpose: Move project out of XAMPP for stability*
*Priority: HIGH - Do this ASAP to prevent future issues*
