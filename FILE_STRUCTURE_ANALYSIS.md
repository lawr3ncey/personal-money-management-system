# Personal Money Management System - Complete File Structure Analysis

## 🏗️ System Architecture Overview

**Type:** Full-Stack Multi-Platform Financial Management Application
**Architecture:** Monorepo with 4 main components
**Database:** MongoDB (via Mongoose ODM) + PostgreSQL (Supabase)
**Authentication:** JWT-based authentication
**API Pattern:** RESTful API
**State Management:** React Context API

---

## 📦 Project Structure

```
personal-money-management-system/
├── pmms-backend-node/         ← Node.js/Express REST API (Primary Backend)
├── pmms-backend/              ← PHP Legacy API
├── pmms-frontend/             ← React Web Application
├── pmms-mobile/               ← React Native (Expo) Mobile App
└── Documentation Files        ← Project documentation
```

---

## 🔧 1. BACKEND API (pmms-backend-node/)

**Technology Stack:**
- Runtime: Node.js v18+
- Framework: Express.js v4.18
- Database: MongoDB (Mongoose ODM v8.0)
- Authentication: JWT (jsonwebtoken v9.0)
- Security: Helmet, bcryptjs, CORS
- Task Scheduling: node-cron v3.0
- Logging: Morgan
- Export: json2csv
- Validation: express-validator

**Directory Structure:**
```
pmms-backend-node/
├── server.js                  # Main application entry point
├── package.json               # Dependencies & scripts
├── .env                       # Environment variables
├── .env.example               # Environment template
│
├── controllers/               # Business logic layer
│   ├── authController.js      # User authentication (login, register, logout)
│   ├── jarController.js       # 6 Jars method management
│   ├── incomeController.js    # Income distribution & history
│   ├── transactionController.js  # Financial transactions CRUD
│   ├── budgetController.js    # Budget planning & tracking
│   ├── goalController.js      # Savings goals management
│   ├── recurringController.js # Recurring income/expenses
│   ├── analyticsController.js # Financial reports & insights
│   └── exportController.js    # Data export (CSV, JSON)
│
├── models/                    # MongoDB/Mongoose schemas
│   ├── User.js                # User accounts & authentication
│   ├── Jar.js                 # 6 Jars allocations
│   ├── Transaction.js         # Financial transactions
│   ├── IncomeHistory.js       # Income tracking
│   ├── Budget.js              # Budget plans
│   ├── SavingsGoal.js         # Financial goals
│   ├── RecurringItem.js       # Recurring transactions
│   └── MonthlyReport.js       # Generated analytics reports
│
├── routes/                    # API endpoint definitions
│   ├── auth.routes.js         # POST /api/auth/login, /register, /logout
│   ├── jar.routes.js          # GET/POST/PUT/DELETE /api/jars
│   ├── transaction.routes.js # GET/POST/PUT/DELETE /api/transactions
│   ├── income.routes.js       # POST /api/income/distribute
│   ├── budget.routes.js       # GET/POST/PUT/DELETE /api/budgets
│   ├── goal.routes.js         # GET/POST/PUT/DELETE /api/goals
│   ├── recurring.routes.js    # GET/POST/PUT/DELETE /api/recurring
│   ├── analytics.routes.js    # GET /api/analytics/dashboard, /reports
│   └── export.routes.js       # GET /api/export/csv, /json
│
├── middleware/                # Express middleware
│   ├── auth.js                # JWT token verification
│   ├── mockUser.js            # Development mock authentication
│   ├── validate.js            # Request data validation
│   └── errorHandler.js        # Global error handling
│
├── services/                  # Business logic services
│   ├── recurring.service.js   # Automated recurring processing (cron jobs)
│   └── budget.service.js      # Budget calculations & alerts
│
└── utils/                     # Helper functions
    ├── constants.js           # App constants (jar percentages, limits)
    ├── helpers.js             # Utility functions (date formatting, calculations)
    └── validators.js          # Custom validation rules
```

**Key Features:**
- RESTful API with 9 main route groups
- JWT authentication with bcrypt password hashing
- Automated cron jobs for recurring transactions
- MongoDB aggregation pipelines for analytics
- CORS enabled for localhost:3000, 3001
- Helmet security headers
- Request validation with express-validator
- CSV/JSON export functionality
- Monthly report generation

**API Endpoints Summary:**
```
Auth:        POST   /api/auth/register, /login, /logout
Jars:        CRUD   /api/jars (6 Jars Method allocation)
Transactions: CRUD  /api/transactions
Income:      POST   /api/income/distribute
Budgets:     CRUD   /api/budgets
Goals:       CRUD   /api/goals
Recurring:   CRUD   /api/recurring
Analytics:   GET    /api/analytics/*
Export:      GET    /api/export/csv, /json
```

---

## 🌐 2. WEB FRONTEND (pmms-frontend/)

**Technology Stack:**
- Framework: React v19.2
- Routing: React Router v6.21
- Styling: Tailwind CSS v3.4 + Custom CSS
- HTTP Client: Axios v1.13
- Charts: Recharts v2.10
- Animations: Framer Motion v11.0
- Notifications: React Toastify v10.0
- Build Tool: Create React App (react-scripts v5.0)
- Date Handling: date-fns v3.0
- File Export: file-saver v2.0

**Directory Structure:**
```
pmms-frontend/
├── public/
│   ├── index.html             # Main HTML template
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # SEO robots file
│   └── images/                # Static images
│
├── src/
│   ├── index.js               # React app entry point
│   ├── App.js                 # Main app component with routing
│   ├── App.css                # Global styles
│   ├── index.css              # Tailwind imports
│   ├── dashboard.css          # Dashboard-specific styles
│   ├── setupTests.js          # Jest test configuration
│   ├── reportWebVitals.js     # Performance monitoring
│   │
│   ├── pages/                 # Route page components
│   │   ├── Dashboard.jsx      # Main dashboard with overview
│   │   ├── JarsPage.jsx       # 6 Jars management interface
│   │   ├── TransactionsPage.jsx  # Transaction history & CRUD
│   │   ├── BudgetsPage.jsx    # Budget planning interface
│   │   ├── GoalsPage.jsx      # Savings goals tracking
│   │   ├── RecurringPage.jsx  # Recurring transactions management
│   │   ├── SettingsPage.jsx   # User settings & preferences
│   │   ├── ProfilePage.jsx    # User profile management
│   │   ├── LoginPage.jsx      # Authentication - login
│   │   └── RegisterPage.jsx   # Authentication - registration
│   │
│   ├── components/            # Reusable UI components
│   │   ├── jars/              # Jar-related components
│   │   ├── transactions/      # Transaction-related components
│   │   └── ui/                # Generic UI components (Button, Card, Modal, etc.)
│   │
│   ├── contexts/              # React Context providers
│   │   ├── AuthContext.jsx    # Authentication state & methods
│   │   ├── SyncContext.jsx    # Data synchronization state
│   │   └── NotificationContext.jsx  # Toast notifications
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useJars.js         # Jar data & operations
│   │   ├── useTransactions.js # Transaction data & operations
│   │   └── useAnalytics.js    # Analytics data fetching
│   │
│   ├── services/              # API & business logic
│   │   ├── api.js             # Axios instance configuration
│   │   ├── auth.service.js    # Authentication API calls
│   │   ├── mockAuth.service.js  # Mock auth for development
│   │   ├── mockCloud.service.js # Mock cloud sync
│   │   └── index.js           # Service exports
│   │
│   ├── utils/                 # Helper utilities
│   │   ├── constants.js       # App-wide constants
│   │   └── formatters.js      # Data formatting functions
│   │
│   └── styles/                # Additional stylesheets
│
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # Project documentation
```

**Key Features:**
- Single Page Application (SPA) with React Router
- Responsive design with Tailwind CSS
- Context API for global state management
- Protected routes with authentication
- Real-time data synchronization indicator
- Interactive charts with Recharts
- Smooth animations with Framer Motion
- Toast notifications for user feedback
- Custom hooks for data fetching & operations
- Mock services for offline development

**Routes:**
```
Public:
  /login          - User login
  /register       - User registration

Protected:
  /               - Dashboard (overview)
  /jars           - 6 Jars management
  /transactions   - Transaction history
  /budgets        - Budget planning
  /goals          - Savings goals
  /recurring      - Recurring items
  /settings       - App settings
  /profile        - User profile
```

---

## 📱 3. MOBILE APP (pmms-mobile/)

**Technology Stack:**
- Framework: Expo SDK v50.0
- Language: TypeScript v5.3
- UI Library: React Native v0.73.4
- Navigation: React Navigation v6 (Native Stack + Bottom Tabs)
- Backend: Supabase v2.39 (PostgreSQL + Auth + Storage)
- Local Storage: AsyncStorage v1.23
- Secure Storage: expo-secure-store v12.8
- Gestures: react-native-gesture-handler v2.14
- Animations: react-native-reanimated v3.6
- Icons: @expo/vector-icons v14.0
- File System: expo-file-system v16.0
- Sharing: expo-sharing v12.0
- Build Tool: EAS Build
- Linting: ESLint + TypeScript ESLint

**Directory Structure:**
```
pmms-mobile/
├── App.tsx                    # Main app entry point
├── app.json                   # Expo configuration
├── eas.json                   # EAS Build configuration
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── babel.config.js            # Babel with module resolver
│
├── src/
│   ├── navigation/            # Navigation configuration
│   │   ├── AppNavigator.tsx   # Root navigator
│   │   ├── AuthNavigator.tsx  # Authentication stack
│   │   ├── MainNavigator.tsx  # Main app stack
│   │   └── index.ts           # Navigation exports
│   │
│   ├── screens/               # Screen components
│   │   ├── DashboardScreen.tsx     # Main dashboard
│   │   ├── JarsScreen.tsx          # 6 Jars management
│   │   ├── TransactionsScreen.tsx  # Transaction list & CRUD
│   │   ├── BudgetsScreen.tsx       # Budget management
│   │   ├── GoalsScreen.tsx         # Savings goals
│   │   ├── RecurringScreen.tsx     # Recurring items
│   │   ├── SettingsScreen.tsx      # App settings
│   │   ├── ProfileScreen.tsx       # User profile
│   │   ├── LoginScreen.tsx         # Login form
│   │   └── RegisterScreen.tsx      # Registration form
│   │
│   ├── contexts/              # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   ├── SyncContext.tsx    # Data synchronization
│   │   ├── NotificationContext.tsx  # In-app notifications
│   │   └── index.ts           # Context exports
│   │
│   ├── services/              # API & business logic
│   │   ├── supabase.service.ts    # Supabase client & config
│   │   ├── auth.service.ts        # Authentication operations
│   │   ├── jar.service.ts         # Jar CRUD operations
│   │   ├── transaction.service.ts # Transaction operations
│   │   ├── budget.service.ts      # Budget operations
│   │   ├── goal.service.ts        # Goal operations
│   │   ├── recurring.service.ts   # Recurring operations
│   │   ├── sync.service.ts        # Data sync logic
│   │   ├── storage.service.ts     # Local/secure storage
│   │   ├── export.service.ts      # Data export
│   │   └── index.ts               # Service exports
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── database.types.ts  # Supabase database types
│   │
│   └── constants/             # App constants
│       └── config.ts          # Configuration values
│
├── supabase-schema.sql        # Database schema for Supabase
└── Documentation files        # Setup guides & implementation status
```

**Key Features:**
- Cross-platform (iOS, Android, Web) with Expo
- TypeScript for type safety
- Supabase backend (PostgreSQL database)
- Native navigation with React Navigation
- Secure credential storage with expo-secure-store
- Offline-first architecture with AsyncStorage
- File export & sharing capabilities
- Gesture-based interactions
- Smooth animations with Reanimated
- Path aliases for clean imports (@/, @screens/, etc.)
- EAS Build for production builds
- Over-the-air (OTA) updates with EAS Update

**Navigation Structure:**
```
AppNavigator (Root)
├── AuthNavigator (Stack)
│   ├── Login
│   └── Register
│
└── MainNavigator (Bottom Tabs)
    ├── Dashboard Tab
    ├── Jars Tab
    ├── Transactions Tab
    ├── Budgets Tab
    ├── Goals Tab
    ├── Recurring Tab
    ├── Settings Tab
    └── Profile Tab
```

**Babel Configuration:**
- Module resolver with path aliases
- Extensions: .ios.js, .android.js, .js, .ts, .tsx, .json
- Aliases: @/, @components/, @screens/, @services/, @contexts/, @hooks/, @types/, @utils/, @constants/, @navigation/
- React Native Reanimated plugin

---

## 🗄️ 4. LEGACY PHP BACKEND (pmms-backend/)

**Technology Stack:**
- Language: PHP
- Database: MySQL (via mysqli)

**Directory Structure:**
```
pmms-backend/
└── api/
    ├── db.php              # Database connection
    ├── get_jars.php        # Retrieve jars
    ├── save_jars.php       # Save jar configuration
    ├── save_income123.php  # Save income data
    ├── distribute.php      # Income distribution
    └── update_jar.php      # Update jar values
```

**Status:** Legacy API, replaced by pmms-backend-node. May still be used for specific features or during migration.

---

## 📊 DATABASE SCHEMAS

### MongoDB Collections (pmms-backend-node):

**Users Collection:**
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed with bcrypt),
  name: String,
  currency: String (default: 'USD'),
  monthlyIncome: Number,
  jarPercentages: {
    necessities: Number (55%),
    financial: Number (10%),
    education: Number (10%),
    longTerm: Number (10%),
    play: Number (10%),
    give: Number (5%)
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Jars Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  name: String (necessities/financial/education/longTerm/play/give),
  balance: Number,
  percentage: Number,
  target: Number,
  color: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Transactions Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  jarId: ObjectId (ref: 'Jar'),
  type: String (income/expense/transfer),
  amount: Number,
  description: String,
  category: String,
  date: Date,
  recurring: Boolean,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Budgets Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  category: String,
  amount: Number,
  period: String (monthly/yearly),
  startDate: Date,
  endDate: Date,
  spent: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**SavingsGoals Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  name: String,
  targetAmount: Number,
  currentAmount: Number,
  deadline: Date,
  priority: String (low/medium/high),
  status: String (active/completed/cancelled),
  createdAt: Date,
  updatedAt: Date
}
```

**RecurringItems Collection:**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  type: String (income/expense),
  amount: Number,
  description: String,
  frequency: String (daily/weekly/monthly/yearly),
  nextDate: Date,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### PostgreSQL (Supabase for pmms-mobile):
- Similar schema to MongoDB but adapted for PostgreSQL
- Uses Supabase Auth for user management
- Row Level Security (RLS) policies for data access
- Real-time subscriptions enabled

---

## 🔄 SYSTEM INTEGRATION

**Frontend (React) ↔ Backend (Node.js/Express):**
- REST API over HTTP/HTTPS
- JSON data format
- JWT authentication in Authorization header
- CORS enabled for localhost:3000, 3001
- Axios HTTP client with interceptors

**Mobile (React Native) ↔ Backend (Supabase):**
- Supabase JavaScript client
- PostgreSQL database
- Real-time subscriptions for live updates
- Supabase Auth for authentication
- Row Level Security for data isolation

**Data Flow:**
1. User authentication → JWT token issued
2. Frontend/Mobile sends requests with JWT
3. Backend validates JWT and processes request
4. Database operations performed
5. Response sent back to client
6. UI updates with new data

---

## 🎨 DESIGN SYSTEM

**6 Jars Method (Core Concept):**
1. **Necessities (55%)** - Bills, rent, food, transport
2. **Financial Freedom (10%)** - Investments, passive income
3. **Education (10%)** - Self-improvement, courses, books
4. **Long-term Saving (10%)** - Emergency fund, large purchases
5. **Play (10%)** - Entertainment, hobbies, fun
6. **Give (5%)** - Charity, gifts, donations

**Color Scheme:**
- Necessities: Blue
- Financial: Green
- Education: Purple
- Long-term: Orange
- Play: Pink
- Give: Red

---

## 🚀 DEPLOYMENT & BUILD

**Backend (Node.js):**
```bash
npm start          # Production
npm run dev        # Development with nodemon
npm test           # Run tests
```

**Frontend (React):**
```bash
npm start          # Development server (port 3000)
npm run build      # Production build
npm test           # Run tests
```

**Mobile (Expo):**
```bash
npm start          # Start Expo dev server
npx expo start --web     # Web version
npx expo start --android # Android
npx expo start --ios     # iOS
eas build --platform android  # Production Android build
eas build --platform ios       # Production iOS build
eas update         # OTA update
```

---

## 📝 CONFIGURATION FILES

**Environment Variables (.env):**
```
Backend:
- PORT=8080
- MONGODB_URI=mongodb://localhost:27017/pmms
- JWT_SECRET=<secret>
- NODE_ENV=development

Frontend:
- REACT_APP_API_URL=http://localhost:8080/api
- REACT_APP_ENV=development

Mobile:
- EXPO_PUBLIC_SUPABASE_URL=<url>
- EXPO_PUBLIC_SUPABASE_ANON_KEY=<key>
```

---

## 📦 DEPENDENCIES SUMMARY

**Backend (Node.js):**
- express, mongoose, jsonwebtoken, bcryptjs
- cors, helmet, morgan
- node-cron, json2csv, date-fns
- express-validator

**Frontend (React):**
- react, react-dom, react-router-dom
- axios, tailwindcss, recharts
- framer-motion, react-toastify
- date-fns, file-saver

**Mobile (React Native):**
- expo, react-native, typescript
- @react-navigation/native, @react-navigation/bottom-tabs
- @supabase/supabase-js
- @react-native-async-storage/async-storage
- expo-secure-store, react-native-reanimated

---

## 🔒 SECURITY FEATURES

- JWT-based authentication
- Password hashing with bcrypt
- Helmet security headers
- CORS configuration
- Input validation with express-validator
- Supabase Row Level Security (RLS)
- Secure credential storage (expo-secure-store)
- HTTPS in production
- Environment variable protection

---

## 🎯 KEY FEATURES IMPLEMENTED

1. **6 Jars Money Management System**
2. **Transaction Tracking** (income/expense/transfer)
3. **Budget Planning & Monitoring**
4. **Savings Goals Tracking**
5. **Recurring Transactions** (automated with cron)
6. **Financial Analytics & Reports**
7. **Data Export** (CSV, JSON)
8. **Multi-platform** (Web + Mobile)
9. **Real-time Sync** (Mobile with Supabase)
10. **User Authentication & Authorization**

---

## 📱 PLATFORM SUPPORT

- **Web:** Chrome, Firefox, Safari, Edge (React SPA)
- **Mobile:** iOS 13+, Android 5+ (React Native)
- **Desktop:** PWA support planned

---

## 🛠️ DEVELOPMENT TOOLS

- **Version Control:** Git
- **Package Manager:** npm
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint
- **Type Checking:** TypeScript (mobile)
- **Build Tools:** Create React App, Expo, Webpack
- **API Testing:** Postman/Thunder Client recommended

---

## 📚 PROJECT DOCUMENTATION

Located in root directory:
- ARCHITECTURE.md - System architecture
- COMPREHENSIVE_ANALYSIS.md - Full analysis
- IMPLEMENTATION_STATUS.md - Development status
- QUICK_START.md - Getting started guide
- FRONTEND_STATUS.md - Frontend implementation status
- And more...

---

## 🎓 LEARNING RESOURCES

This project demonstrates:
- Full-stack JavaScript development
- React ecosystem (React, React Native, React Router)
- RESTful API design
- MongoDB & PostgreSQL databases
- JWT authentication
- Mobile app development with Expo
- TypeScript usage
- Modern CSS with Tailwind
- State management with Context API
- Responsive design principles
- Cross-platform development

---

**Total Files:** ~179 source files
**Lines of Code:** ~20,000+ (estimated)
**Languages:** JavaScript, TypeScript, PHP, CSS, HTML
**Databases:** MongoDB, PostgreSQL (Supabase)
**Platforms:** Web, iOS, Android

This is a production-ready, full-stack financial management application following the 6 Jars Method for personal money management.
