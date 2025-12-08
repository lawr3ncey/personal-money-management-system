# 🚀 MUI Admin Panel - Quick Start

## Installation (ONE COMMAND)

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid @mui/x-charts
```

## Access

**URL**: `http://localhost:3000/admin`

**Login**:
- Username: `admin`
- Password: `admin123456`

## Features

✅ **Dashboard** - Analytics with charts  
✅ **User Management** - CRUD with DataGrid  
✅ **Dark Mode** - Toggle light/dark theme  
✅ **Responsive** - Mobile-friendly  
✅ **Export** - CSV download  

## File Structure

```
src/admin/
├── AdminRoutes.jsx          # Main router
├── theme.js                 # MUI theme
├── components/              # Reusable components
├── context/                 # State management
├── data/                    # Dummy data
├── pages/                   # Page components
└── services/                # Auth & API
```

## Pages

| Page | Path | Status |
|------|------|--------|
| Login | `/admin` | ✅ |
| Dashboard | `/admin/dashboard` | ✅ |
| Users | `/admin/users` | ✅ |
| Transactions | `/admin/transactions` | 🔄 |
| Notifications | `/admin/notifications` | 🔄 |
| Logs | `/admin/logs` | 🔄 |

## Quick Actions

**View User**: Dashboard → User Management → Eye icon  
**Edit User**: Dashboard → User Management → Edit icon  
**Add User**: Dashboard → User Management → Add User button  
**Export Data**: Dashboard → User Management → Export CSV button  
**Toggle Dark Mode**: Click sun/moon icon in topbar  

## Demo Data

- 8 Users (various statuses)
- 12 Jars (6 jars × 2 users)
- 10 Transactions
- 5 Notifications
- 5 Activity Logs

## Credentials

**Super Admin**:
- user: `admin`
- pass: `admin123456`

**Regular Admin**:
- user: `moderator`
- pass: `moderator123`

---

**See `MUI_ADMIN_PANEL_SETUP.md` for detailed documentation**
