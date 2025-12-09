# 🚀 Quick Start: Activate Animated Sidebar

## Step 1: Install Dependencies

```powershell
cd pmms-frontend
npm install lucide-react
```

**OR** run the provided script:

```powershell
cd pmms-frontend
.\install-animated-sidebar.ps1
```

---

## Step 2: Switch to Animated Layout

Open `src/admin/AdminRoutes.jsx` and make this ONE-LINE change:

### Before:

```jsx
import AdminLayout from "./components/AdminLayout";
```

### After:

```jsx
import AdminLayout from "./components/AdminLayoutAnimated";
```

---

## Step 3: Start Development Server

```powershell
npm start
```

---

## ✅ That's It!

Your animated sidebar is now active with:

- ✨ Hover expand/collapse animation (desktop)
- 📱 Slide-in animation (mobile)
- 🌙 Dark mode support
- 🎯 All existing features preserved

---

## 🎨 What You'll See

### Desktop View

- Sidebar starts collapsed (60px width)
- Hover over sidebar → Expands to 300px
- Move mouse away → Collapses back to 60px
- Icons visible when collapsed
- Full labels visible when expanded

### Mobile View

- Hamburger menu icon in top bar
- Tap to open → Sidebar slides in from left
- Full-screen overlay
- Tap X or outside → Sidebar slides out

---

## 🔄 To Revert (If Needed)

Change back to the original layout:

```jsx
import AdminLayout from "./components/AdminLayout";
```

Both layouts are preserved and can be switched anytime!

---

## 📚 Full Documentation

See `ANIMATED_SIDEBAR_INTEGRATION.md` for:

- Customization guide
- Troubleshooting
- Technical details
- Styling options

---

**Ready to go!** 🎉
