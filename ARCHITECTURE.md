# 🏗️ SYSTEM ARCHITECTURE & TECH STACK
## 6 Jars Money Management System

**Version:** 2.0 (Planned)  
**Current Status:** Backend 100% | Frontend 19%  
**Last Updated:** November 30, 2025

---

## 📐 HIGH-LEVEL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER DEVICES                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Desktop    │  │    Tablet    │  │    Mobile    │          │
│  │   Browser    │  │    Browser   │  │    Browser   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                   │
│         └──────────────────┴──────────────────┘                   │
│                            │                                      │
└────────────────────────────┼──────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   HTTPS/TLS     │
                    └────────┬────────┘
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│                      FRONTEND LAYER                                │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                React 19 Application                           │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │   Pages     │  │ Components  │  │   Hooks     │          │ │
│  │  │ Dashboard   │  │  JarCard    │  │  useJars    │          │ │
│  │  │ JarsPage    │  │  JarModal   │  │  useBudgets │          │ │
│  │  │ BudgetsPage │  │  Charts     │  │  useGoals   │          │ │
│  │  │ GoalsPage   │  │  Modals     │  │             │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │  ┌─────────────────────────────────────────────────┐         │ │
│  │  │         State Management (Context API)           │         │ │
│  │  │  AuthContext | NotificationContext | ThemeContext│         │ │
│  │  └─────────────────────────────────────────────────┘         │ │
│  │  ┌─────────────────────────────────────────────────┐         │ │
│  │  │          API Services (Axios)                    │         │ │
│  │  │  jar.service | budget.service | goal.service     │         │ │
│  │  └─────────────────────────────────────────────────┘         │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Tech Stack:                                                       │
│  • React 19 (UI Framework)                                        │
│  • Tailwind CSS 3.4 (Styling + Glassmorphism)                    │
│  • React Router 6.21 (Navigation)                                 │
│  • Recharts 2.10 (Charts)                                         │
│  • Framer Motion 11 (Animations)                                  │
│  • Axios 1.13 (HTTP Client)                                       │
│  • React Toastify 10.0 (Notifications)                            │
│                                                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   REST API      │
                    │  (JSON over     │
                    │   HTTPS)        │
                    └────────┬────────┘
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│                       API GATEWAY LAYER                            │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                   Express Middleware                          │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐             │ │
│  │  │   CORS     │→ │Rate Limiter│→ │   Auth     │             │ │
│  │  │ (Origins)  │  │(100 req/min)│  │   (JWT)    │             │ │
│  │  └────────────┘  └────────────┘  └────────────┘             │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐             │ │
│  │  │ Validator  │→ │  Security  │→ │Error Handler│            │ │
│  │  │(express-   │  │  (Helmet)  │  │  (Global)   │            │ │
│  │  │ validator) │  │            │  │             │            │ │
│  │  └────────────┘  └────────────┘  └────────────┘             │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│                      BACKEND LAYER                                 │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                   Express 4.18 Server                         │ │
│  │                    (Node.js 18+)                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                      ROUTES (9 modules)                       │ │
│  │  /api/v1/auth       - Authentication (login, register)       │ │
│  │  /api/v1/jars       - Jar CRUD + adjust                      │ │
│  │  /api/v1/transactions - Transaction history                  │ │
│  │  /api/v1/income     - Income distribution                    │ │
│  │  /api/v1/budgets    - Budget management                      │ │
│  │  /api/v1/goals      - Savings goals                          │ │
│  │  /api/v1/recurring  - Recurring items                        │ │
│  │  /api/v1/analytics  - Charts & insights                      │ │
│  │  /api/v1/export     - Export/Import/Reset                    │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                   CONTROLLERS (9 modules)                     │ │
│  │  Business Logic Layer                                         │ │
│  │  • Request validation                                         │ │
│  │  • Database queries                                           │ │
│  │  • Response formatting                                        │ │
│  │  • Error handling                                             │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    SERVICES (Background)                      │ │
│  │  recurring.service.js  - Cron jobs (node-cron)               │ │
│  │    • Runs every hour                                          │ │
│  │    • Processes due recurring items                            │ │
│  │    • Auto-creates transactions                                │ │
│  │    • Updates jar balances                                     │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Tech Stack:                                                       │
│  • Node.js 18+ (Runtime)                                          │
│  • Express 4.18 (Web Framework)                                   │
│  • JWT + bcryptjs (Authentication)                                │
│  • express-validator (Input Validation)                           │
│  • node-cron (Scheduled Tasks)                                    │
│  • json2csv (CSV Export)                                          │
│  • date-fns (Date Utilities)                                      │
│                                                                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│                     DATA ACCESS LAYER                              │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                   Mongoose ODM 8.0                            │ │
│  │                                                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │    User     │  │     Jar     │  │ Transaction │          │ │
│  │  │   Model     │  │   Model     │  │    Model    │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │ │
│  │  │   Budget    │  │SavingsGoal  │  │ Recurring   │          │ │
│  │  │   Model     │  │   Model     │  │    Model    │          │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘          │ │
│  │  ┌─────────────┐                                              │ │
│  │  │IncomeHistory│                                              │ │
│  │  │   Model     │                                              │ │
│  │  └─────────────┘                                              │ │
│  │                                                                │ │
│  │  Features:                                                     │ │
│  │  • Schema validation                                           │ │
│  │  • Indexes for performance                                     │ │
│  │  • Decimal128 for money (precision)                           │ │
│  │  • Timestamps (createdAt, updatedAt)                          │ │
│  │  • Population (relationships)                                  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────────┐
│                       DATABASE LAYER                               │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    MongoDB 7.0                                │ │
│  │                  (localhost:27017)                            │ │
│  │                                                                │ │
│  │  Collections:                                                  │ │
│  │  • users           - User accounts                            │ │
│  │  • jars            - Money jars (6 default + custom)          │ │
│  │  • transactions    - All money movements                      │ │
│  │  • budgets         - Monthly budgets                          │ │
│  │  • savingsgoals    - Savings goals                            │ │
│  │  • recurringitems  - Recurring income/bills                   │ │
│  │  • incomehistories - Income distribution history              │ │
│  │                                                                │ │
│  │  Indexes:                                                      │ │
│  │  • userId (all collections)                                   │ │
│  │  • date fields (transactions, budgets)                        │ │
│  │  • Compound indexes (userId + date)                           │ │
│  │                                                                │ │
│  │  Performance:                                                  │ │
│  │  • Sharding ready                                             │ │
│  │  • Replication ready                                          │ │
│  │  • Backup strategy                                            │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 DATA FLOW DIAGRAMS

### 1. Income Distribution Flow
```
User Input (Dashboard)
        │
        ├─→ Enter amount: ₱10,000
        └─→ Click "Distribute to 6 Jars"
                │
                ▼
    Frontend (Dashboard.jsx)
        │
        ├─→ Strip commas from input
        ├─→ Parse to float
        └─→ Call: incomeService.distributeIncome({ income: 10000 })
                │
                ▼
    API Request
        │
        └─→ POST /api/v1/income/distribute
            Body: { income: 10000 }
                │
                ▼
    Backend (incomeController.js)
        │
        ├─→ Validate input (must be > 0)
        ├─→ Get user's jars
        ├─→ If no jars → Create default 6 jars ✅
        │
        ├─→ For each jar:
        │   ├─→ Calculate allocation (amount × percentage / 100)
        │   ├─→ Update jar.amount
        │   └─→ Create transaction record
        │
        ├─→ Save income history
        └─→ Return response
                │
                ▼
    Frontend (Dashboard.jsx)
        │
        ├─→ Show success toast
        ├─→ Reload page
        └─→ Display updated jars
```

---

### 2. Jar Adjustment Flow
```
User Action (JarModal)
        │
        ├─→ Click "+ Add Money"
        ├─→ Enter amount: ₱500
        └─→ Enter reason: "Salary bonus"
                │
                ▼
    Frontend (JarModal.jsx)
        │
        └─→ Call: jarService.adjustJar(jarId, { type: 'add', amount: 500, reason: '...' })
                │
                ▼
    API Request
        │
        └─→ POST /api/v1/jars/:id/adjust
            Body: { type: 'add', amount: 500, reason: '...' }
                │
                ▼
    Backend (jarController.js)
        │
        ├─→ Validate input
        ├─→ Get jar from database
        ├─→ Calculate new amount:
        │   • add: oldAmount + amount
        │   • subtract: oldAmount - amount (check sufficient funds)
        │   • edit: amount (overwrite)
        │
        ├─→ Update jar.amount
        ├─→ Create transaction record:
        │   • userId, jarId
        │   • type, amount
        │   • previousAmount, newAmount
        │   • reason, category
        │
        └─→ Return updated jar
                │
                ▼
    Frontend (JarModal.jsx)
        │
        ├─→ Show success toast: "₱500 added to Education Jar"
        ├─→ Update local state
        └─→ Refresh jar balance
```

---

### 3. Recurring Item Execution Flow (Automated)
```
Cron Job (Every Hour)
        │
        └─→ recurring.service.js
                │
                ├─→ Find all active recurring items
                ├─→ Filter where nextExecutionDate <= now
                │
                ├─→ For each due item:
                │   ├─→ Get linked jar
                │   │
                │   ├─→ If type === 'income':
                │   │   ├─→ Add amount to jar
                │   │   └─→ Create transaction (type: 'add')
                │   │
                │   ├─→ If type === 'expense':
                │   │   ├─→ Subtract amount from jar
                │   │   └─→ Create transaction (type: 'subtract')
                │   │
                │   ├─→ Update lastExecutionDate
                │   ├─→ Calculate nextExecutionDate:
                │   │   • daily: +1 day
                │   │   • weekly: +7 days
                │   │   • monthly: next month, same day
                │   │   • yearly: +1 year
                │   │
                │   └─→ Save recurring item
                │
                └─→ Log execution results
```

---

### 4. Savings Goal Contribution Flow
```
User Action (GoalModal)
        │
        ├─→ Click "Contribute"
        ├─→ Select jar: "Financial Freedom"
        └─→ Enter amount: ₱1,000
                │
                ▼
    Frontend (ContributeModal.jsx)
        │
        ├─→ Validate sufficient funds in jar
        └─→ Call: goalService.contributeToGoal(goalId, { jarId, amount: 1000 })
                │
                ▼
    API Request
        │
        └─→ POST /api/v1/goals/:id/contribute
            Body: { jarId, amount: 1000 }
                │
                ▼
    Backend (goalController.js)
        │
        ├─→ Get goal from database
        ├─→ Get jar from database
        ├─→ Validate jar has sufficient funds
        │
        ├─→ Deduct from jar:
        │   • jar.amount -= 1000
        │   • Save jar
        │
        ├─→ Add to goal:
        │   • goal.currentAmount += 1000
        │   • goal.contributions.push({ amount, jarId, date })
        │
        ├─→ Check if goal completed:
        │   • If currentAmount >= targetAmount:
        │     • goal.isCompleted = true
        │     • goal.completedAt = now
        │
        ├─→ Create transaction record
        └─→ Return goal + jar + notification
                │
                ▼
    Frontend (ContributeModal.jsx)
        │
        ├─→ If goal completed:
        │   ├─→ Show celebration modal 🎉
        │   └─→ Show confetti animation
        │
        ├─→ Show success toast: "₱1,000 contributed to Buy Laptop"
        ├─→ Update goal progress
        └─→ Update jar balance
```

---

## 🗄️ DATABASE SCHEMA RELATIONSHIPS

```
User (1) ──────────────────┐
    │                       │
    │ (1:N)                 │ (1:N)
    │                       │
    ▼                       ▼
Jar (N)                 Budget (N)
    │                       │
    │ (1:N)                 │ (1:1 per month)
    │                       │
    ▼                       └─→ Month/Year unique index
Transaction (N)
    │
    │ References:
    │ • userId → User._id
    │ • jarId → Jar._id
    │
    └─→ Tracks all money movements

User (1) ──────────────────┐
    │                       │
    │ (1:N)                 │ (1:N)
    │                       │
    ▼                       ▼
SavingsGoal (N)       RecurringItem (N)
    │                       │
    │ (N:M)                 │ (N:1)
    │                       │
    └─→ linkedJars[]        └─→ jarId → Jar._id
        (Array of Jar IDs)

User (1) ──────────────────┐
    │                       │
    │ (1:N)                 │
    │                       │
    ▼                       │
IncomeHistory (N)           │
    │                       │
    │ Tracks income         │
    │ distributions         │
    │                       │
    └─→ distribution[]      │
        (Array of jar       │
         allocations)       │
```

---

## 🔐 SECURITY ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
└─────────────────────────────────────────────────────────────┘

Layer 1: Transport Security
    ├─→ HTTPS/TLS (Encrypts data in transit)
    ├─→ Secure cookies (httpOnly, sameSite)
    └─→ CORS (Whitelist trusted origins)

Layer 2: Authentication
    ├─→ JWT tokens (Stateless auth)
    ├─→ bcryptjs (Password hashing)
    ├─→ Token expiration (24 hours)
    └─→ Refresh token rotation (Planned)

Layer 3: Authorization
    ├─→ Middleware checks req.user.id
    ├─→ Database queries filter by userId
    └─→ Users can only access their own data

Layer 4: Input Validation
    ├─→ express-validator (Schema validation)
    ├─→ Type checking (String, Number, Boolean)
    ├─→ Range validation (min/max)
    └─→ Sanitization (trim, escape)

Layer 5: Database Security
    ├─→ MongoDB authentication
    ├─→ Mongoose schema validation
    ├─→ NoSQL injection prevention (mongo-sanitize)
    └─→ Indexes for performance (prevents DoS)

Layer 6: API Security (Planned)
    ├─→ Rate limiting (100 req/min per IP)
    ├─→ Helmet.js (Security headers)
    ├─→ XSS protection (xss-clean)
    └─→ CSRF tokens

Layer 7: Data Security (Planned)
    ├─→ Encryption at rest
    ├─→ Audit logs (who changed what)
    ├─→ Backup encryption
    └─→ GDPR compliance
```

---

## 📊 SCALABILITY ARCHITECTURE

### Current Setup (Development)
```
Single Server (localhost)
    ├─→ Frontend: React Dev Server (port 3001)
    ├─→ Backend: Node.js (port 5000)
    └─→ Database: MongoDB (port 27017)

Limitations:
    • No load balancing
    • No caching
    • No CDN
    • Single point of failure
    • Limited concurrent users (~10)
```

### Recommended Production Setup
```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│                 (Global Distribution)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │        CDN (Cloudflare)         │
        │  • Cache static assets (JS, CSS)│
        │  • Cache jar images (1 year)    │
        │  • DDoS protection              │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   Load Balancer (Nginx)         │
        │  • Round-robin distribution     │
        │  • Health checks                │
        │  • SSL termination              │
        └────────────┬───────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌─────────┐            ┌─────────┐
    │ Node.js │            │ Node.js │
    │ Server 1│            │ Server 2│
    │ (PM2)   │            │ (PM2)   │
    └────┬────┘            └────┬────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │      Redis (Cache Layer)        │
        │  • Session storage              │
        │  • API response cache (5 min)   │
        │  • Rate limiting counters       │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │   MongoDB Atlas (Cluster)       │
        │  • Primary + 2 Replicas         │
        │  • Auto-scaling                 │
        │  • Automated backups            │
        │  • Point-in-time recovery       │
        └────────────────────────────────┘

Scalability Metrics:
    • Concurrent Users: 10,000+
    • Requests/Second: 1,000+
    • Database Size: 100 GB+
    • Uptime: 99.9%
    • Response Time: <200ms (p95)
```

---

## 🚀 DEPLOYMENT PIPELINE

```
┌─────────────────────────────────────────────────────────────┐
│                  DEVELOPMENT WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘

1. Developer writes code
   └─→ git add .
   └─→ git commit -m "feat: Add transaction history"
   └─→ git push origin feature-branch

2. GitHub Actions triggers on push
   ├─→ Run linter (ESLint)
   ├─→ Run type checker (TypeScript)
   ├─→ Run unit tests (Vitest/Jest)
   ├─→ Run integration tests
   └─→ Build frontend & backend

3. Pull Request Review
   ├─→ Code review by team
   ├─→ Automated checks (must pass)
   └─→ Merge to main branch

4. Deployment (on merge to main)
   ├─→ Frontend → Vercel
   │   ├─→ Build: npm run build
   │   ├─→ Deploy to CDN
   │   └─→ Invalidate cache
   │
   ├─→ Backend → Railway/Render
   │   ├─→ Build: npm run build
   │   ├─→ Run migrations
   │   ├─→ Deploy with zero downtime
   │   └─→ Health check
   │
   └─→ Database Migrations
       ├─→ MongoDB Atlas
       ├─→ Run migration scripts
       └─→ Create backup before migration

5. Post-Deployment
   ├─→ Smoke tests (critical flows)
   ├─→ Monitor error rates (Sentry)
   ├─→ Monitor performance (New Relic)
   └─→ Send Slack notification
```

---

## 📦 RECOMMENDED FOLDER STRUCTURE (Final)

```
personal-money-management-system/
│
├── pmms-frontend/                 # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── images/
│   │       ├── jars/              # 3D jar images (competitive advantage)
│   │       │   ├── necessities.png
│   │       │   ├── financial-freedom.png
│   │       │   ├── education.png
│   │       │   ├── long-term-savings.png
│   │       │   ├── play.png
│   │       │   └── give.png
│   │       └── icons/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── jars/
│   │   │   │   ├── JarCard.jsx
│   │   │   │   ├── JarGrid.jsx
│   │   │   │   ├── JarModal.jsx          ✅ Exists
│   │   │   │   ├── CreateJarModal.jsx    🔴 TODO
│   │   │   │   ├── EditJarModal.jsx      🔴 TODO
│   │   │   │   └── JarTrendChart.jsx     🔴 TODO
│   │   │   │
│   │   │   ├── transactions/
│   │   │   │   ├── TransactionList.jsx   ✅ Exists
│   │   │   │   ├── TransactionItem.jsx   ✅ Exists
│   │   │   │   ├── TransactionFilter.jsx ✅ Exists
│   │   │   │   ├── TransactionDetailModal.jsx  🔴 TODO
│   │   │   │   └── TransactionTimeline.jsx     🔴 TODO
│   │   │   │
│   │   │   ├── budgets/           🔴 NEW FOLDER
│   │   │   │   ├── BudgetCard.jsx
│   │   │   │   ├── BudgetForm.jsx
│   │   │   │   ├── BudgetProgress.jsx
│   │   │   │   └── BudgetAlertBanner.jsx
│   │   │   │
│   │   │   ├── goals/             🔴 NEW FOLDER
│   │   │   │   ├── GoalCard.jsx
│   │   │   │   ├── GoalModal.jsx
│   │   │   │   ├── ContributeModal.jsx
│   │   │   │   └── GoalProgress.jsx
│   │   │   │
│   │   │   ├── recurring/         🔴 NEW FOLDER
│   │   │   │   ├── RecurringList.jsx
│   │   │   │   ├── RecurringModal.jsx
│   │   │   │   ├── RecurringCard.jsx
│   │   │   │   └── RecurringCalendar.jsx
│   │   │   │
│   │   │   ├── charts/            🔴 NEW FOLDER
│   │   │   │   ├── JarTrendChart.jsx
│   │   │   │   ├── SpendingBreakdown.jsx
│   │   │   │   ├── IncomeVsExpensesChart.jsx
│   │   │   │   └── CategoryChart.jsx
│   │   │   │
│   │   │   ├── settings/          🔴 NEW FOLDER
│   │   │   │   ├── ExportSection.jsx
│   │   │   │   ├── ImportSection.jsx
│   │   │   │   └── ResetSection.jsx
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Button.jsx     ✅ Exists
│   │   │       ├── Card.jsx       ✅ Exists
│   │   │       ├── Input.jsx      ✅ Exists
│   │   │       ├── Modal.jsx      ✅ Exists
│   │   │       ├── Spinner.jsx    ✅ Exists
│   │   │       ├── EmptyState.jsx ✅ Exists
│   │   │       ├── ProgressBar.jsx      🔴 TODO
│   │   │       ├── DatePicker.jsx       🔴 TODO
│   │   │       ├── ColorPicker.jsx      🔴 TODO
│   │   │       ├── IconSelector.jsx     🔴 TODO
│   │   │       ├── ConfirmDialog.jsx    🔴 TODO
│   │   │       ├── Dropdown.jsx         🔴 TODO
│   │   │       └── Tabs.jsx             🔴 TODO
│   │   │
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx          ✅ Exists
│   │   │   ├── NotificationContext.jsx  ✅ Exists
│   │   │   └── ThemeContext.jsx         🔴 TODO
│   │   │
│   │   ├── hooks/
│   │   │   ├── useJars.js               ✅ Exists
│   │   │   ├── useTransactions.js       ✅ Exists
│   │   │   ├── useAnalytics.js          ✅ Exists
│   │   │   ├── useBudgets.js            🔴 TODO
│   │   │   ├── useGoals.js              🔴 TODO
│   │   │   ├── useRecurring.js          🔴 TODO
│   │   │   └── useMediaQuery.js         🔴 TODO
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx            ✅ Exists
│   │   │   ├── JarsPage.jsx             ✅ Exists
│   │   │   ├── TransactionsPage.jsx     ✅ Exists
│   │   │   ├── BudgetsPage.jsx          🔴 TODO
│   │   │   ├── GoalsPage.jsx            🔴 TODO
│   │   │   ├── RecurringPage.jsx        🔴 TODO
│   │   │   ├── AnalyticsPage.jsx        🔴 TODO
│   │   │   └── SettingsPage.jsx         🔴 TODO
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                   ✅ Exists
│   │   │   ├── auth.service.js          ✅ Exists
│   │   │   ├── jar.service.js           ✅ Exists (partial)
│   │   │   ├── transaction.service.js   ✅ Exists (partial)
│   │   │   ├── budget.service.js        🔴 TODO
│   │   │   ├── goal.service.js          🔴 TODO
│   │   │   ├── recurring.service.js     🔴 TODO
│   │   │   └── export.service.js        🔴 TODO
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js             ✅ Exists
│   │   │   ├── formatters.js            ✅ Exists
│   │   │   └── validators.js            🔴 TODO
│   │   │
│   │   └── styles/
│   │       ├── globals.css              ✅ Exists
│   │       └── dashboard.css            ✅ Exists
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── pmms-backend-node/                # Node.js Backend
│   ├── controllers/
│   │   ├── analyticsController.js       ✅ Complete
│   │   ├── authController.js            ✅ Complete
│   │   ├── budgetController.js          ✅ Complete
│   │   ├── exportController.js          ✅ Complete
│   │   ├── goalController.js            ✅ Complete
│   │   ├── incomeController.js          ✅ Complete
│   │   ├── jarController.js             ✅ Complete
│   │   ├── recurringController.js       ✅ Complete
│   │   └── transactionController.js     ✅ Complete
│   │
│   ├── middleware/
│   │   ├── auth.js                      ✅ Complete
│   │   ├── errorHandler.js              ✅ Complete
│   │   ├── validate.js                  ✅ Complete
│   │   └── mockUser.js                  ✅ Complete (dev only)
│   │
│   ├── models/
│   │   ├── User.js                      ✅ Complete
│   │   ├── Jar.js                       ✅ Complete
│   │   ├── Transaction.js               ✅ Complete
│   │   ├── Budget.js                    ✅ Complete
│   │   ├── SavingsGoal.js               ✅ Complete
│   │   ├── RecurringItem.js             ✅ Complete
│   │   └── IncomeHistory.js             ✅ Complete
│   │
│   ├── routes/
│   │   ├── analytics.routes.js          ✅ Complete
│   │   ├── auth.routes.js               ✅ Complete
│   │   ├── budget.routes.js             ✅ Complete
│   │   ├── export.routes.js             ✅ Complete
│   │   ├── goal.routes.js               ✅ Complete
│   │   ├── income.routes.js             ✅ Complete
│   │   ├── jar.routes.js                ✅ Complete
│   │   ├── recurring.routes.js          ✅ Complete
│   │   └── transaction.routes.js        ✅ Complete
│   │
│   ├── services/
│   │   └── recurring.service.js         ✅ Complete (cron)
│   │
│   ├── utils/
│   │   ├── constants.js                 ✅ Complete
│   │   ├── helpers.js                   ✅ Complete
│   │   └── validators.js                ✅ Complete
│   │
│   ├── package.json
│   └── server.js                        ✅ Complete
│
├── COMPREHENSIVE_ANALYSIS.md            ✅ Created
├── IMPLEMENTATION_CHECKLIST.md          ✅ Created
├── ARCHITECTURE.md                      ✅ Created (this file)
├── README.md                            ✅ Exists
├── PROJECT_SUMMARY.md                   ✅ Exists
└── .gitignore

Legend:
  ✅ Complete (working)
  🔴 TODO (missing)
  🟡 Partial (needs work)
```

---

## 🎯 NEXT IMMEDIATE ACTIONS

**Start with these 3 files:**

1. **Transaction History in Jar Modal**
   ```
   File: pmms-frontend/src/components/jars/JarModal.jsx
   Action: Add "History" tab, fetch transactions, display timeline
   Estimated Time: 2-3 hours
   ```

2. **Real Dashboard Charts**
   ```
   File: pmms-frontend/src/pages/Dashboard.jsx
   Action: Replace mock chart with real analytics data
   Estimated Time: 3-4 hours
   ```

3. **Custom Jar Creation Modal**
   ```
   File: pmms-frontend/src/components/jars/CreateJarModal.jsx (NEW)
   Action: Create modal with name/percentage/color/icon inputs
   Estimated Time: 4-6 hours
   ```

---

**Your system has world-class architecture. Now execute the frontend and dominate the market! 🚀**

