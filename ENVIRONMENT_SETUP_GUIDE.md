# ⚙️ Environment Setup Guide - Personal Money Management System

> **Purpose**: Complete documentation of the development environment setup to help you replicate this configuration in other React.js and React Native Expo Go projects.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Setup (React.js)](#frontend-setup-reactjs)
3. [Mobile Setup (React Native + Expo)](#mobile-setup-react-native--expo)
4. [Backend Setup (Node.js)](#backend-setup-nodejs)
5. [Environment Variables](#environment-variables)
6. [Common Commands](#common-commands)
7. [Troubleshooting](#troubleshooting)

---

## 🛠️ Prerequisites

### Required Software

| Software    | Minimum Version | Recommended      | Purpose                   |
| ----------- | --------------- | ---------------- | ------------------------- |
| **Node.js** | 16.x            | 18.x or 20.x LTS | JavaScript runtime        |
| **npm**     | 8.x             | 9.x or higher    | Package manager           |
| **Git**     | 2.x             | Latest           | Version control           |
| **VS Code** | -               | Latest           | Code editor (recommended) |

### Optional Tools

- **Expo CLI**: For mobile development
- **MySQL**: For backend database (v8.0+)
- **Postman/Insomnia**: For API testing

---

## 🌐 Frontend Setup (React.js)

### Tech Stack

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-scripts": "5.0.1",
  "@mui/material": "7.3.6",
  "@mui/icons-material": "7.3.6",
  "@mui/x-data-grid": "7.3.6",
  "@mui/x-charts": "7.3.6",
  "react-router-dom": "6.21.1",
  "axios": "1.13.1",
  "recharts": "2.10.3",
  "tailwindcss": "3.4.0"
}
```

### Step-by-Step Installation

#### 1. Create React App

```powershell
# Navigate to your projects folder
cd C:\Users\YourName\Projects

# Create new React app with Create React App
npx create-react-app your-project-name

# Navigate into project
cd your-project-name
```

#### 2. Install Core Dependencies

```powershell
# Install React Router for routing
npm install react-router-dom@6.21.1

# Install Axios for API calls
npm install axios@1.13.1
```

#### 3. Install Material-UI (MUI) Suite

```powershell
# Install MUI core
npm install @mui/material@7.3.6 @emotion/react@11.13.3 @emotion/styled@11.13.0

# Install MUI Icons
npm install @mui/icons-material@7.3.6

# Install MUI Data Grid
npm install @mui/x-data-grid@7.3.6

# Install MUI Charts
npm install @mui/x-charts@7.3.6
```

#### 4. Install Tailwind CSS

```powershell
# Install Tailwind and dependencies
npm install -D tailwindcss@3.4.0 postcss autoprefixer

# Initialize Tailwind config
npx tailwindcss init -p
```

**Configure Tailwind** (`tailwind.config.js`):

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Add Tailwind directives** (`src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 5. Install Additional Libraries

```powershell
# Recharts for additional charts
npm install recharts@2.10.3

# Date formatting
npm install date-fns

# Testing libraries (usually pre-installed with CRA)
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

#### 6. Configure Port (Optional)

**Create `.env` file** in root:

```env
PORT=3001
```

#### 7. Start Development Server

```powershell
npm start
```

**Expected Output:**

```
Compiled successfully!

You can now view your-project-name in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.1.x:3001
```

---

## 📱 Mobile Setup (React Native + Expo)

### Tech Stack

```json
{
  "react": "18.2.0",
  "react-native": "0.73.4",
  "expo": "~50.0.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@supabase/supabase-js": "^2.39.0",
  "@react-native-async-storage/async-storage": "1.21.0",
  "expo-secure-store": "~12.8.1"
}
```

### Step-by-Step Installation

#### 1. Install Expo CLI Globally

```powershell
# Install Expo CLI
npm install -g expo-cli

# Verify installation
expo --version
```

#### 2. Create New Expo Project

```powershell
# Create new Expo app
npx create-expo-app@latest your-mobile-app --template blank-typescript

# Navigate into project
cd your-mobile-app
```

#### 3. Install React Navigation

```powershell
# Install core navigation
npm install @react-navigation/native@^6.1.9

# Install dependencies
npx expo install react-native-screens react-native-safe-area-context

# Install navigators
npm install @react-navigation/stack@^6.3.20
npm install @react-navigation/bottom-tabs@^6.5.11

# Install gesture handler
npx expo install react-native-gesture-handler
```

#### 4. Install Supabase (Backend)

```powershell
# Install Supabase client
npm install @supabase/supabase-js@^2.39.0

# Install secure storage for tokens
npx expo install expo-secure-store

# Install async storage
npx expo install @react-native-async-storage/async-storage
```

#### 5. Install Additional Expo Modules

```powershell
# File system for local storage
npx expo install expo-file-system

# Linking for deep links
npx expo install expo-linking

# Device info
npx expo install expo-device

# App constants
npx expo install expo-constants
```

#### 6. Configure EAS (Expo Application Services)

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure
```

#### 7. Start Development Server

```powershell
# Start Expo dev server
npx expo start

# Or with specific options
npx expo start --clear
```

**Development Options:**

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on physical device

---

## 🖥️ Backend Setup (Node.js)

### Tech Stack

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}
```

### Step-by-Step Installation

#### 1. Initialize Node.js Project

```powershell
# Create backend folder
mkdir your-backend
cd your-backend

# Initialize npm
npm init -y
```

#### 2. Install Core Dependencies

```powershell
# Express framework
npm install express@^4.18.2

# Environment variables
npm install dotenv@^16.3.1

# CORS middleware
npm install cors@^2.8.5

# Body parser (included in Express 4.16+)
# No need to install separately
```

#### 3. Install Database & Authentication

```powershell
# MySQL driver
npm install mysql2@^3.6.5

# JWT for authentication
npm install jsonwebtoken@^9.0.2

# Password hashing
npm install bcryptjs@^2.4.3
```

#### 4. Install Validation & Utils

```powershell
# Input validation
npm install express-validator@^7.0.1

# Date utilities
npm install date-fns
```

#### 5. Install Development Tools

```powershell
# Nodemon for auto-restart
npm install --save-dev nodemon

# ESLint for code quality (optional)
npm install --save-dev eslint
```

#### 6. Configure Database

**Create `.env` file**:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pmms_db
DB_PORT=3306

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3001
```

#### 7. Create MySQL Database

```sql
CREATE DATABASE pmms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE pmms_db;

-- Create tables (example)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add other tables as needed
```

#### 8. Start Development Server

```powershell
# With nodemon (auto-restart)
npm run dev

# Or with node
node server.js
```

---

## 🔐 Environment Variables

### Frontend (.env)

```env
# Development server
PORT=3001

# API endpoint
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENV=development

# Feature flags
REACT_APP_ENABLE_ADMIN=true
REACT_APP_ENABLE_ANALYTICS=true
```

### Mobile (.env)

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# API endpoints
EXPO_PUBLIC_API_URL=http://localhost:5000/api

# Environment
EXPO_PUBLIC_ENV=development
```

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pmms_db
DB_PORT=3306

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3001

# Email (if needed)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📦 Package.json Scripts

### Frontend Scripts

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{js,jsx}",
    "format": "prettier --write src/**/*.{js,jsx,json,css}"
  }
}
```

### Mobile Scripts

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "submit:android": "eas submit --platform android",
    "submit:ios": "eas submit --platform ios"
  }
}
```

### Backend Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "migrate": "node scripts/migrate.js",
    "seed": "node scripts/seed.js"
  }
}
```

---

## 🚀 Common Commands

### Frontend Development

```powershell
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Install new package
npm install package-name

# Update dependencies
npm update
```

### Mobile Development

```powershell
# Start Expo server
npx expo start

# Clear cache and restart
npx expo start --clear

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Build standalone app
eas build --platform android
```

### Backend Development

```powershell
# Start with nodemon (auto-restart)
npm run dev

# Start production
npm start

# Run database migrations
npm run migrate

# Seed database
npm run seed
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Frontend

**Issue**: `Cannot find module '@mui/material'`

```powershell
# Solution: Install MUI dependencies
npm install @mui/material @emotion/react @emotion/styled
```

**Issue**: Port 3000 already in use

```powershell
# Solution: Change port in .env or kill process
# Create .env file with: PORT=3001
```

**Issue**: React 19 compatibility issues with MUI

```powershell
# Solution: Downgrade to React 18
npm install react@18.2.0 react-dom@18.2.0
```

#### Mobile

**Issue**: Metro bundler cache issues

```powershell
# Solution: Clear cache
npx expo start --clear
```

**Issue**: Expo Go app not connecting

```powershell
# Solution: Ensure same WiFi network, or use tunnel
npx expo start --tunnel
```

**Issue**: TypeScript errors

```powershell
# Solution: Check tsconfig.json and install types
npm install --save-dev @types/react @types/react-native
```

#### Backend

**Issue**: Cannot connect to MySQL

```powershell
# Solution: Check MySQL service is running
# Windows: services.msc → MySQL80
# Verify credentials in .env file
```

**Issue**: CORS errors in browser

```powershell
# Solution: Install and configure CORS
npm install cors
# Add to server.js: app.use(cors({ origin: 'http://localhost:3001' }))
```

**Issue**: JWT token errors

```powershell
# Solution: Ensure JWT_SECRET is set in .env
# Verify token format in authentication middleware
```

---

## 📊 Version Compatibility Matrix

| Frontend     | Mobile    | Backend        | Node.js     | Notes                                   |
| ------------ | --------- | -------------- | ----------- | --------------------------------------- |
| React 18.2.0 | RN 0.73.4 | Express 4.18.2 | 16.x - 20.x | ✅ Recommended                          |
| React 19.x   | RN 0.74+  | Express 5.x    | 18.x+       | ⚠️ MUI not compatible with React 19 yet |
| React 17.x   | RN 0.72   | Express 4.17.x | 14.x - 18.x | ⚠️ Older, consider upgrading            |

---

## 🔧 IDE Configuration

### VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Prettier** - Code formatter
- **ESLint** - Linting
- **Auto Rename Tag** - HTML/JSX tag renaming
- **Path Intellisense** - File path autocomplete
- **Expo Tools** - Expo project support
- **Material Icon Theme** - File icons

### VS Code Settings (`settings.json`)

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

---

## 📝 Development Workflow

### 1. Starting a New Feature

```powershell
# Frontend
cd pmms-frontend
git checkout -b feature/new-feature
npm start

# Mobile
cd pmms-mobile
git checkout -b feature/new-feature
npx expo start

# Backend
cd pmms-backend-node
git checkout -b feature/new-feature
npm run dev
```

### 2. Testing Changes

```powershell
# Frontend
npm test

# Backend (if tests configured)
npm test
```

### 3. Building for Production

```powershell
# Frontend
npm run build

# Mobile
eas build --platform all

# Backend
# No build step needed, just ensure .env is production-ready
```

---

## 🌍 Port Configuration

| Service | Default Port | Purpose |
|---------|-------------|---------||
| Frontend (React) | 3001 | Web application |
| Backend (Node.js) | 5000 | API server |
| MySQL Database | 3306 | Database |
| Expo Dev Server | 19000-19002 | Mobile dev server |

---

## ✅ Setup Verification Checklist

### Frontend Setup

- [ ] Node.js and npm installed
- [ ] Create React App project created
- [ ] All dependencies installed (MUI, React Router, Axios, Tailwind)
- [ ] Development server starts on `http://localhost:3001`
- [ ] Tailwind CSS working (test with utility classes)
- [ ] MUI components rendering correctly

### Mobile Setup

- [ ] Expo CLI installed globally
- [ ] Expo project created with TypeScript template
- [ ] React Navigation installed and configured
- [ ] Supabase client configured
- [ ] Expo Go app installed on test device
- [ ] QR code scan works and app loads

### Backend Setup

- [ ] Node.js installed
- [ ] Express server created
- [ ] MySQL installed and running
- [ ] Database created with tables
- [ ] `.env` file configured with correct credentials
- [ ] Server starts on `http://localhost:5000`
- [ ] API endpoints responding (test with Postman)
- [ ] CORS configured for frontend origin

---

## 🎯 Next Steps After Setup

1. **Frontend**: Create folder structure following `FOLDER_STRUCTURE_GUIDE.md`
2. **Mobile**: Set up navigation and screens structure
3. **Backend**: Create controllers, models, and routes
4. **Database**: Run migrations and seed initial data
5. **Integration**: Connect frontend/mobile to backend APIs
6. **Testing**: Write unit tests for components and API endpoints

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Material-UI Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## ⚠️ Important Notes

1. **Version Locking**: Always lock major versions in `package.json` to prevent breaking changes
2. **Environment Security**: Never commit `.env` files to version control
3. **React 19 Warning**: Current setup uses React 18.2.0 for MUI compatibility
4. **Database Credentials**: Use strong passwords in production
5. **JWT Secrets**: Generate cryptographically secure secrets for production
6. **CORS Configuration**: Restrict origins in production (don't use `*`)
7. **Port Conflicts**: Check for port availability before starting servers

---

**Created**: January 2025  
**Last Updated**: January 2025  
**Version**: 1.0.0

---

## 🛡️ Safety Notice

✅ **This documentation is SAFE**:

- Contains no code modifications
- Only provides setup instructions
- Won't harm your existing project
- Can be used as a reference for new projects
- Replicates the exact environment configuration of this project
