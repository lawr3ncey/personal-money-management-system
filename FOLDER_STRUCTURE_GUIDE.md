# 📁 Folder Structure Guide - Personal Money Management System

> **Purpose**: This guide visualizes the complete folder structure to help you replicate this architecture in other React.js and React Native Expo Go projects.

---

## 🎯 Architecture Overview

This project follows a **monorepo pattern** with separate folders for:

- **Frontend** (React.js Web Application)
- **Mobile** (React Native + Expo Go)
- **Backend** (Node.js API)

---

## 🌐 Frontend Structure (React.js Web)

### Complete Folder Tree

```
pmms-frontend/
├── public/                          # Static assets
│   ├── index.html                   # Main HTML template
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt                   # SEO robots file
│   └── images/                      # Public images
│
├── src/                             # Source code
│   ├── index.js                     # App entry point
│   ├── App.js                       # Root component
│   ├── App.css                      # Global app styles
│   ├── index.css                    # Global index styles
│   ├── dashboard.css                # Dashboard-specific styles
│   ├── setupTests.js                # Test configuration
│   ├── reportWebVitals.js           # Performance monitoring
│   │
│   ├── admin/                       # 🔐 Admin Panel Module
│   │   ├── AdminLayout.jsx          # Admin layout with sidebar
│   │   ├── AdminRoutes.jsx          # Admin routing configuration
│   │   ├── theme.js                 # Admin theme customization
│   │   │
│   │   ├── components/              # Admin-specific components
│   │   │   ├── shared/              # Reusable admin components
│   │   │   │   ├── LoadingSkeletons.jsx
│   │   │   │   ├── Modals.jsx
│   │   │   │   ├── Cards.jsx
│   │   │   │   ├── Filters.jsx
│   │   │   │   ├── Alerts.jsx
│   │   │   │   └── index.js         # Barrel export
│   │   │   │
│   │   │   └── dashboard/           # Admin dashboard widgets
│   │   │       ├── RecentActivityFeed.jsx
│   │   │       ├── Charts.jsx
│   │   │       └── SummaryCards.jsx
│   │   │
│   │   ├── pages/                   # Admin page components
│   │   │   ├── AdminDashboard.jsx   # Main admin dashboard
│   │   │   │
│   │   │   ├── finance/             # Finance management
│   │   │   │   ├── AdminJarOverview.jsx
│   │   │   │   ├── MonthlyBudgetMonitor.jsx
│   │   │   │   └── RecurringItemsOverview.jsx
│   │   │   │
│   │   │   ├── system/              # System management
│   │   │   │   ├── BackupRestoreManager.jsx
│   │   │   │   ├── CustomCategoriesManager.jsx
│   │   │   │   ├── SavingsGoalsMonitor.jsx
│   │   │   │   ├── RecurringEngineControl.jsx
│   │   │   │   ├── SystemLogsMonitor.jsx
│   │   │   │   └── AdminSettings.jsx
│   │   │   │
│   │   │   └── security/            # Security & access control
│   │   │       ├── SessionLogs.jsx
│   │   │       └── RoleManagement.jsx
│   │   │
│   │   ├── data/                    # Admin dummy data
│   │   │   ├── adminData.js         # Mock data for admin features
│   │   │   └── dummyData.js         # Additional test data
│   │   │
│   │   ├── services/                # Admin API services
│   │   │   └── adminAuth.service.js # Admin authentication
│   │   │
│   │   └── context/                 # Admin state management
│   │       └── AdminContext.jsx     # Global admin state
│   │
│   ├── components/                  # 🧩 User-Facing Components
│   │   ├── admin/                   # Admin-related components
│   │   ├── ai/                      # AI features
│   │   ├── analytics/               # Analytics components
│   │   ├── backup/                  # Backup/restore UI
│   │   ├── banking/                 # Banking integrations
│   │   ├── bills/                   # Bill tracking
│   │   ├── currency/                # Currency conversion
│   │   ├── gamification/            # Gamification features
│   │   ├── goals/                   # Savings goals
│   │   ├── jars/                    # Money jar system
│   │   ├── recurring/               # Recurring transactions
│   │   ├── reminders/               # Reminder system
│   │   ├── settings/                # User settings
│   │   ├── subscription/            # Subscription management
│   │   ├── team/                    # Team/shared budgets
│   │   ├── tips/                    # Financial tips
│   │   ├── transactions/            # Transaction management
│   │   ├── ui/                      # Generic UI components
│   │   └── widgets/                 # Dashboard widgets
│   │
│   ├── contexts/                    # ⚡ Global State Management
│   │   ├── AuthContext.jsx          # Authentication state
│   │   ├── NotificationContext.jsx  # Notification system
│   │   └── SyncContext.jsx          # Data synchronization
│   │
│   ├── pages/                       # 📄 Main App Pages
│   │   ├── Dashboard.jsx            # User dashboard
│   │   ├── BudgetsPage.jsx          # Budget management
│   │   ├── GoalsPage.jsx            # Goals tracking
│   │   └── ...                      # Other user pages
│   │
│   ├── services/                    # 🔌 API Communication
│   │   ├── api.js                   # Base API configuration
│   │   ├── auth.service.js          # Authentication API
│   │   ├── jar.service.js           # Jar management API
│   │   ├── transaction.service.js   # Transaction API
│   │   └── ...                      # Other API services
│   │
│   ├── hooks/                       # 🎣 Custom React Hooks
│   │   ├── useAnalytics.js          # Analytics hook
│   │   ├── useJars.js               # Jar management hook
│   │   ├── useTransactions.js       # Transaction hook
│   │   └── ...                      # Other custom hooks
│   │
│   ├── utils/                       # 🛠️ Utility Functions
│   │   ├── formatters.js            # Data formatting
│   │   ├── validators.js            # Input validation
│   │   ├── helpers.js               # Helper functions
│   │   └── constants.js             # App constants
│   │
│   ├── data/                        # 📊 Static Data
│   │   ├── categories.js            # Transaction categories
│   │   └── mockData.js              # Development mock data
│   │
│   └── styles/                      # 🎨 Styling
│       ├── global.css               # Global styles
│       ├── variables.css            # CSS variables
│       └── themes/                  # Theme configurations
│
├── package.json                     # Dependencies & scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS config
└── README.md                        # Frontend documentation
```

### 📋 Folder Purpose Summary (Frontend)

| Folder        | Purpose                             | Key Patterns                                             |
| ------------- | ----------------------------------- | -------------------------------------------------------- |
| `admin/`      | Complete admin panel with 15+ pages | Modular structure with pages, components, data, services |
| `components/` | Reusable UI components              | Feature-based folders (jars, transactions, goals)        |
| `contexts/`   | Global state management             | React Context API providers                              |
| `pages/`      | Main application routes             | Page components connected to React Router                |
| `services/`   | API communication layer             | Axios-based API calls                                    |
| `hooks/`      | Custom React hooks                  | Reusable stateful logic                                  |
| `utils/`      | Helper functions                    | Pure functions for data manipulation                     |
| `data/`       | Static/mock data                    | JSON-like data structures                                |
| `styles/`     | CSS and styling                     | Global and component-specific styles                     |

---

## 📱 Mobile Structure (React Native + Expo Go)

### Complete Folder Tree

```
pmms-mobile/
├── src/                             # Source code
│   ├── screens/                     # 📱 Screen Components
│   │   ├── HomeScreen.tsx
│   │   ├── JarsScreen.tsx
│   │   ├── TransactionsScreen.tsx
│   │   ├── GoalsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ...                      # Other screens
│   │
│   ├── navigation/                  # 🧭 Navigation Configuration
│   │   ├── AppNavigator.tsx         # Main navigation container
│   │   ├── AuthNavigator.tsx        # Authentication flow
│   │   ├── TabNavigator.tsx         # Bottom tab navigation
│   │   └── types.ts                 # Navigation types
│   │
│   ├── contexts/                    # ⚡ State Management
│   │   ├── AuthContext.tsx          # Authentication state
│   │   ├── JarContext.tsx           # Jar management state
│   │   └── ...                      # Other contexts
│   │
│   ├── services/                    # 🔌 Backend Services
│   │   ├── supabase.ts              # Supabase client config
│   │   ├── authService.ts           # Authentication API
│   │   ├── jarService.ts            # Jar management API
│   │   └── ...                      # Other API services
│   │
│   ├── types/                       # 📝 TypeScript Definitions
│   │   ├── jar.types.ts
│   │   ├── transaction.types.ts
│   │   ├── user.types.ts
│   │   └── ...                      # Other type definitions
│   │
│   └── constants/                   # 📊 App Constants
│       ├── colors.ts                # Color palette
│       ├── sizes.ts                 # Spacing/sizing
│       ├── categories.ts            # Transaction categories
│       └── config.ts                # App configuration
│
├── App.tsx                          # Root component
├── app.json                         # Expo configuration
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
├── babel.config.js                  # Babel configuration
├── eas.json                         # EAS Build config
├── supabase-schema.sql              # Database schema
└── README.md                        # Mobile documentation
```

### 📋 Folder Purpose Summary (Mobile)

| Folder        | Purpose                          | Key Patterns                                |
| ------------- | -------------------------------- | ------------------------------------------- |
| `screens/`    | Screen components for navigation | TypeScript React components (.tsx)          |
| `navigation/` | Navigation configuration         | React Navigation setup (Stack, Tab, Drawer) |
| `contexts/`   | Global state with Context API    | Shared state across screens                 |
| `services/`   | Backend API integration          | Supabase client, API calls                  |
| `types/`      | TypeScript type definitions      | Interfaces, types, enums                    |
| `constants/`  | App-wide constants               | Colors, sizes, configurations               |

---

## 🖥️ Backend Structure (Node.js)

```
pmms-backend-node/
├── server.js                        # Express server entry
├── package.json                     # Node dependencies
│
├── controllers/                     # Request handlers
│   ├── authController.js
│   ├── jarController.js
│   ├── transactionController.js
│   ├── budgetController.js
│   ├── goalController.js
│   ├── recurringController.js
│   ├── incomeController.js
│   ├── analyticsController.js
│   └── exportController.js
│
├── models/                          # Database models
│   ├── User.js
│   ├── Jar.js
│   ├── Transaction.js
│   ├── Budget.js
│   ├── SavingsGoal.js
│   ├── RecurringItem.js
│   ├── IncomeHistory.js
│   └── MonthlyReport.js
│
├── routes/                          # API routes
│   ├── auth.routes.js
│   ├── jar.routes.js
│   ├── transaction.routes.js
│   ├── budget.routes.js
│   ├── goal.routes.js
│   ├── recurring.routes.js
│   ├── income.routes.js
│   ├── analytics.routes.js
│   └── export.routes.js
│
├── middleware/                      # Express middleware
│   ├── auth.js                      # JWT authentication
│   ├── validate.js                  # Input validation
│   ├── errorHandler.js              # Error handling
│   └── mockUser.js                  # Development mock user
│
├── services/                        # Business logic
│   ├── budget.service.js
│   └── recurring.service.js
│
└── utils/                           # Utility functions
    ├── constants.js
    ├── helpers.js
    └── validators.js
```

---

## 🎨 Naming Conventions

### File Naming Patterns

| Type             | Pattern                | Example                                 |
| ---------------- | ---------------------- | --------------------------------------- |
| React Components | PascalCase.jsx/tsx     | `AdminDashboard.jsx`, `JarsScreen.tsx`  |
| Services         | camelCase.service.js   | `auth.service.js`, `jar.service.js`     |
| Utilities        | camelCase.js           | `helpers.js`, `validators.js`           |
| Styles           | kebab-case.css         | `dashboard.css`, `global.css`           |
| Types (TS)       | camelCase.types.ts     | `jar.types.ts`, `user.types.ts`         |
| Routes           | camelCase.routes.js    | `auth.routes.js`, `jar.routes.js`       |
| Context          | PascalCase + Context   | `AuthContext.jsx`, `JarContext.tsx`     |
| Controllers      | camelCase + Controller | `authController.js`, `jarController.js` |
| Models           | PascalCase.js          | `User.js`, `Transaction.js`             |

---

## 📐 Architecture Patterns

### Frontend (React.js)

1. **Component Organization**

   - Feature-based folders under `components/` (e.g., `jars/`, `transactions/`)
   - Shared components in dedicated folders (e.g., `ui/`, `widgets/`)
   - Admin panel isolated in `admin/` with its own sub-structure

2. **State Management**

   - React Context API for global state (`contexts/`)
   - Custom hooks for reusable logic (`hooks/`)
   - Local state with `useState` for component-specific data

3. **Routing**

   - React Router v6 for navigation
   - Separate route configs for user and admin panels
   - Lazy loading for code splitting

4. **Styling**
   - Tailwind CSS for utility-first approach
   - Material-UI (MUI) for admin panel components
   - Component-specific CSS files when needed

### Mobile (React Native + Expo)

1. **Screen Organization**

   - All screens in `screens/` folder
   - TypeScript for type safety
   - Functional components with hooks

2. **Navigation**

   - React Navigation for native navigation
   - Stack Navigator for screen transitions
   - Bottom Tab Navigator for main sections

3. **Backend Integration**

   - Supabase for backend services (Auth, Database, Storage)
   - Service layer abstracts API calls
   - AsyncStorage for offline persistence

4. **Type Safety**
   - TypeScript throughout the codebase
   - Centralized type definitions in `types/`
   - Navigation types for type-safe routing

### Backend (Node.js)

1. **MVC Pattern**

   - Models for database schemas
   - Controllers for request handling
   - Routes for API endpoints

2. **Middleware Pipeline**

   - Authentication with JWT
   - Input validation
   - Error handling

3. **Service Layer**
   - Business logic separated from controllers
   - Reusable services for complex operations

---

## 🔄 Data Flow

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │ ──HTTP─→│   Backend   │ ──SQL──→│   Database  │
│  (React.js) │ ←─JSON──│  (Node.js)  │ ←─Data──│   (MySQL)   │
└─────────────┘         └─────────────┘         └─────────────┘
       │
       │ Context API
       ↓
┌─────────────┐
│  Components │
│   (Pages)   │
└─────────────┘

┌─────────────┐         ┌─────────────┐
│    Mobile   │ ──HTTP─→│   Supabase  │
│ (React RN)  │ ←─JSON──│  (Backend)  │
└─────────────┘         └─────────────┘
       │
       │ Context API
       ↓
┌─────────────┐
│   Screens   │
└─────────────┘
```

---

## ✅ Replication Checklist

When mimicking this structure in your new project:

### Frontend (React.js)

- [ ] Create `src/` folder with 9 main subfolders
- [ ] Set up `admin/` module with pages, components, data, services, context
- [ ] Organize `components/` by feature (jars, transactions, goals, etc.)
- [ ] Create `contexts/` for global state (Auth, Notification, Sync)
- [ ] Set up `pages/` for main app routes
- [ ] Create `services/` for API communication
- [ ] Add `hooks/` for custom React hooks
- [ ] Set up `utils/` for helper functions
- [ ] Create `data/` for static/mock data
- [ ] Add `styles/` for CSS organization

### Mobile (React Native + Expo)

- [ ] Create `src/` folder with 6 main subfolders
- [ ] Set up `screens/` for all app screens (.tsx files)
- [ ] Create `navigation/` with Stack, Tab navigators
- [ ] Add `contexts/` for global state (Auth, Jar, etc.)
- [ ] Set up `services/` for Supabase integration
- [ ] Create `types/` for TypeScript definitions
- [ ] Add `constants/` for colors, sizes, config

### Backend (Node.js)

- [ ] Create 7 main folders (controllers, models, routes, middleware, services, utils)
- [ ] Set up Express server in `server.js`
- [ ] Organize routes by feature
- [ ] Create models for database entities
- [ ] Add middleware for auth, validation, error handling

---

## 📝 Notes

- This structure supports **scalability** - easy to add new features
- **Separation of concerns** - clear boundaries between layers
- **DRY principle** - reusable components, hooks, and services
- **Type safety** - TypeScript in mobile for better development experience
- **Modularity** - admin panel completely isolated from user features

---

**Created**: January 2025  
**Last Updated**: January 2025  
**Version**: 1.0.0
