# 🤖 Android SDK Setup Guide
## Fix ANDROID_HOME Path Error

---

## ⚠️ THE ERROR

```
ANDROID_HOME is set to a non-existing path: D:\AndroidStudio\SDK
```

**What this means:**
- Your system has an environment variable pointing to a non-existent location
- This only affects **Android emulator** functionality
- **Does NOT affect Expo Web** (your web app on port 8082)
- **Does NOT affect iOS** or web development

---

## 🎯 DO YOU NEED TO FIX THIS?

### ❌ Skip This Fix If:
- You only develop for **web** (Expo Web, browser testing)
- You only develop for **iOS** (iPhone, iPad)
- You test on **physical Android device** via USB
- You use **Expo Go app** on your phone

### ✅ Fix This If You Want To:
- Run **Android emulator** on your PC
- Build **native Android apps** (APK/AAB)
- Use **Android Studio** for development
- Debug on **virtual Android devices**

---

## 🔍 OPTION 1: Remove the Variable (Simplest)

If you don't need Android development, just remove the invalid variable:

### Via PowerShell (Run as Administrator)
```powershell
# Remove ANDROID_HOME
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $null, 'User')
[System.Environment]::SetEnvironmentVariable('ANDROID_SDK_ROOT', $null, 'User')

# Remove from PATH
$path = [System.Environment]::GetEnvironmentVariable('Path', 'User')
$newPath = ($path.Split(';') | Where-Object { $_ -notmatch 'AndroidStudio|Android\\Sdk' }) -join ';'
[System.Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
```

### Via GUI
1. Press `Win + X` → **System** → **Advanced system settings**
2. Click **Environment Variables**
3. Under **User variables**, find and **Delete**:
   - `ANDROID_HOME`
   - `ANDROID_SDK_ROOT`
4. Edit **Path** variable, remove any entries containing:
   - `AndroidStudio`
   - `Android\Sdk`
5. Click **OK**, restart all terminals

---

## 🔍 OPTION 2: Fix the Path (If You Have Android Studio)

### Step 1: Find Your Android SDK Location

#### Method A: Via Android Studio
1. Open **Android Studio**
2. Click **More Actions** → **SDK Manager**
3. Look at **Android SDK Location** at the top

Common locations:
```
C:\Users\Lenovo\AppData\Local\Android\Sdk
C:\Android\Sdk
D:\Android\Sdk
```

#### Method B: Search Your Computer
```powershell
# Search for SDK folder
Get-ChildItem -Path "C:\", "D:\" -Directory -Filter "Sdk" -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.FullName -match "Android" }
```

### Step 2: Verify SDK is Valid

Check if these folders exist:
```powershell
# Replace with your actual path
$sdkPath = "C:\Users\Lenovo\AppData\Local\Android\Sdk"

Test-Path "$sdkPath\platform-tools"
Test-Path "$sdkPath\tools"
Test-Path "$sdkPath\platforms"
```

All should return `True`.

### Step 3: Update Environment Variables

#### Via PowerShell (Run as Administrator)
```powershell
# Replace with your actual SDK path
$androidHome = "C:\Users\Lenovo\AppData\Local\Android\Sdk"

# Set ANDROID_HOME
[System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $androidHome, 'User')
[System.Environment]::SetEnvironmentVariable('ANDROID_SDK_ROOT', $androidHome, 'User')

# Add to PATH
$path = [System.Environment]::GetEnvironmentVariable('Path', 'User')
$newPath = "$path;$androidHome\platform-tools;$androidHome\tools;$androidHome\tools\bin;$androidHome\emulator"
[System.Environment]::SetEnvironmentVariable('Path', $newPath, 'User')

Write-Host "✅ Environment variables updated!" -ForegroundColor Green
Write-Host "⚠️ Restart all terminals for changes to take effect" -ForegroundColor Yellow
```

#### Via GUI
1. Press `Win + X` → **System** → **Advanced system settings**
2. Click **Environment Variables**
3. Under **User variables**, click **New**:
   - **Variable name:** `ANDROID_HOME`
   - **Variable value:** `C:\Users\Lenovo\AppData\Local\Android\Sdk` (your path)
4. Click **New** again:
   - **Variable name:** `ANDROID_SDK_ROOT`
   - **Variable value:** `C:\Users\Lenovo\AppData\Local\Android\Sdk` (your path)
5. Edit **Path** variable, click **New** and add these entries:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   %ANDROID_HOME%\emulator
   ```
6. Click **OK** on all dialogs
7. **Restart all terminals**

### Step 4: Verify the Fix

Open a **NEW** PowerShell window:
```powershell
# Check environment variables
$env:ANDROID_HOME
$env:ANDROID_SDK_ROOT

# Check if adb works
adb version

# Check available emulators
emulator -list-avds
```

---

## 🔍 OPTION 3: Install Android Studio (If Not Installed)

### Step 1: Download Android Studio
- Go to: https://developer.android.com/studio
- Download for Windows
- Run installer

### Step 2: Install Android SDK
During installation:
- ✅ Check **Android SDK**
- ✅ Check **Android SDK Platform**
- ✅ Check **Android Virtual Device**

Default location:
```
C:\Users\Lenovo\AppData\Local\Android\Sdk
```

### Step 3: Complete First-Time Setup
1. Open Android Studio
2. Follow the setup wizard
3. Install recommended components
4. Note the SDK location shown

### Step 4: Set Environment Variables
Use **Option 2, Step 3** above with the SDK path from the installation.

---

## ✅ VERIFICATION CHECKLIST

After fixing, verify in a **new** terminal:

### Check Environment Variables
```powershell
echo $env:ANDROID_HOME
# Should output: C:\Users\Lenovo\AppData\Local\Android\Sdk (or your path)

echo $env:ANDROID_SDK_ROOT
# Should output: C:\Users\Lenovo\AppData\Local\Android\Sdk (or your path)
```

### Check ADB (Android Debug Bridge)
```powershell
adb version
# Should output version info, not "command not found"
```

### Check Emulator
```powershell
emulator -version
# Should output version info
```

### Test with Expo
```powershell
cd pmms-mobile
npx expo start
# Press 'a' for Android emulator
# Should launch emulator without SDK path errors
```

---

## 🚨 TROUBLESHOOTING

### Error: "adb: command not found"
**Fix:** Environment variables not applied yet
```powershell
# Close ALL terminals and open a new one
# Or restart computer
```

### Error: "SDK location not found"
**Fix:** Double-check the path exists
```powershell
Test-Path "C:\Users\Lenovo\AppData\Local\Android\Sdk"
# Should return: True
```

### Error: "platform-tools not found"
**Fix:** Install SDK Platform-Tools
1. Open Android Studio
2. **Tools** → **SDK Manager**
3. **SDK Tools** tab
4. Check **Android SDK Platform-Tools**
5. Click **Apply**

### Emulator Won't Start
**Fix:** Create a virtual device
1. Open Android Studio
2. **Tools** → **Device Manager**
3. Click **Create Device**
4. Choose a device (e.g., Pixel 5)
5. Download a system image (e.g., Android 13)
6. Finish setup

---

## 📊 COMPARISON: Before vs After

### Before Fix
```powershell
$ echo $env:ANDROID_HOME
D:\AndroidStudio\SDK    ❌ Does not exist

$ adb version
adb: command not found  ❌

$ npx expo start
⚠️ Warning: ANDROID_HOME is set to a non-existing path
```

### After Fix
```powershell
$ echo $env:ANDROID_HOME
C:\Users\Lenovo\AppData\Local\Android\Sdk  ✅

$ adb version
Android Debug Bridge version 1.0.41  ✅

$ npx expo start
✅ No warnings about ANDROID_HOME
Press 'a' to launch Android emulator  ✅
```

---

## 🎯 RECOMMENDED APPROACH

**For most users:**

1. **If you don't need Android emulator:**
   - Choose **Option 1** (Remove the variable)
   - Takes 2 minutes
   - No downloads needed

2. **If you want Android emulator:**
   - Choose **Option 2** (Fix the path) if Android Studio is already installed
   - Choose **Option 3** (Install Android Studio) if not installed
   - Takes 30-60 minutes (includes downloading Android Studio)

3. **If you only test on physical device:**
   - Choose **Option 1**
   - Connect phone via USB
   - Enable USB debugging
   - Use `adb devices` to verify

---

## 💡 ALTERNATIVE: Use Expo Go App

**Easiest way to test on Android without emulator:**

1. Install **Expo Go** from Google Play Store on your phone
2. Connect phone and PC to **same Wi-Fi**
3. Run in mobile folder:
   ```powershell
   npx expo start
   ```
4. Scan the QR code with Expo Go app
5. **No Android SDK needed!** ✅

---

## 📱 DEVELOPMENT OPTIONS COMPARISON

| Method | Requires Android SDK? | Setup Time | Best For |
|--------|----------------------|------------|----------|
| **Expo Web** | ❌ No | 0 min | Browser testing |
| **Expo Go App** | ❌ No | 5 min | Real device testing |
| **USB Debugging** | ✅ Yes (ADB only) | 10 min | Physical device dev |
| **Android Emulator** | ✅ Yes (Full SDK) | 30-60 min | No physical device |
| **Cloud Build (EAS)** | ❌ No | 10 min | Building APKs |

---

## 📚 ADDITIONAL RESOURCES

- [Expo Android Setup](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Android Studio Download](https://developer.android.com/studio)
- [ADB Setup Guide](https://developer.android.com/studio/command-line/adb)
- [Expo Go App](https://expo.dev/client)

---

## 🔄 RELATED GUIDES

This fix is **optional** for your main issue. See:

- `../CRITICAL_FIXES_GUIDE.md` - Main fixes (Babel, XAMPP)
- `../PROJECT_RELOCATION_GUIDE.md` - Moving out of XAMPP
- `./EXPO_FIX_APPLIED.md` - Expo Web blank screen fix

---

*Guide created: December 3, 2025*
*Priority: OPTIONAL (only for Android emulator development)*
*Status: Choose Option 1, 2, or 3 based on your needs*
