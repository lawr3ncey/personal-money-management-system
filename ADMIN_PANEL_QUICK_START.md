# 🚀 Quick Start: Admin Panel

## Login as Admin
To access the Admin Panel, use these credentials:

**Email:** `admin@pmms.com`  
**Password:** `admin123456`

## Access Admin Panel
1. Go to http://localhost:3000/login
2. Enter admin credentials
3. After login, **manually navigate to** http://localhost:3000/adminpanel
4. The admin panel is **hidden from navigation** for security

**Important:** Regular users cannot access `/adminpanel` - they will be redirected to dashboard.

## Test All Features

### 1. Statistics Dashboard
View 6 statistics cards at the top:
- Total Users: 6
- Active Users: 4
- Inactive Users: 1
- Suspended: 1
- Admins: 1
- New This Month: 6

### 2. Search Users
Try searching:
- `john` - finds John Doe
- `diana` - finds Diana Prince
- `+639171234567` - finds by phone
- `example.com` - finds all users

### 3. Filter Users
- **Status Filter:** Select "Active", "Inactive", or "Suspended"
- **Role Filter:** Select "Users" or "Admins"
- **Sort By:** Created Date, Name, Email, Last Login
- **Order:** Ascending or Descending

### 4. View User Details
1. Click the **👁️** icon on any user
2. See full profile information
3. Options: Close, Edit, Delete

### 5. Edit User
1. Click **✏️** icon on any user
2. Update any field (name, email, role, status, etc.)
3. Click "💾 Save Changes"
4. See success message

### 6. Add New User
1. Click "➕ Add New User" button
2. Fill in all 10 required fields:
   - Full Name
   - Username
   - Email
   - Phone (+63 or 09 format)
   - Age (18-120)
   - Gender
   - Address
   - Password (8+ characters)
   - Role (User/Admin)
   - Status (Active/Inactive/Suspended)
3. Click "➕ Create User"

### 7. Delete User
1. Click **🗑️** icon
2. Confirm deletion in modal
3. User removed from list

### 8. Bulk Operations
1. Check multiple users (click checkboxes)
2. See selection bar appear
3. Choose action:
   - **✅ Set Active** - Activate selected users
   - **⏸️ Set Inactive** - Deactivate selected users
   - **🚫 Suspend** - Suspend selected users
   - **🗑️ Delete** - Delete selected users (with confirmation)

## Sample User Credentials

All passwords are stored in plain text (dummy data only):

| Name | Email | Password | Role | Status |
|------|-------|----------|------|--------|
| System Administrator | admin@pmms.com | admin123456 | Admin | Active |
| John Doe | john@example.com | pass123 | User | Active |
| Jane Smith | jane@example.com | pass123 | User | Active |
| Bob Johnson | bob@example.com | pass123 | User | Inactive |
| Alice Williams | alice@example.com | pass123 | User | Active |
| Charlie Brown | charlie@example.com | pass123 | User | Suspended |

## Switch Between Regular User & Admin

### View as Regular User
1. Logout
2. Login as Demo User: `demo@example.com` / `demo123`
3. **Admin Panel link will NOT appear** in navigation
4. Trying to access `/adminpanel` directly will redirect to dashboard

### View as Admin
1. Logout
2. Login as Admin: `admin@pmms.com` / `admin123456`
3. Navigate directly to `/adminpanel` URL
4. Full access to all admin features

## Features to Test

### ✅ Working Features
- [x] Login as admin
- [x] See 6 statistics cards
- [x] View all 6 users in table
- [x] Search by name/email/username/phone
- [x] Filter by status (active/inactive/suspended)
- [x] Filter by role (user/admin)
- [x] Sort by different fields
- [x] View user details modal
- [x] Edit user modal with validation
- [x] Add new user form with validation
- [x] Delete user with confirmation
- [x] Select multiple users
- [x] Bulk status update
- [x] Bulk delete
- [x] Success/error messages
- [x] Loading states
- [x] Empty states
- [x] Responsive design

### 🎨 UI Elements
- Professional table layout
- User avatars (first letter of name)
- Color-coded badges:
  - ✅ Active (green)
  - ⏸️ Inactive (yellow)
  - 🚫 Suspended (red)
  - 👑 Admin (purple)
  - 👤 User (blue)
- Icon buttons for actions
- Gradient header
- Success/error message bars

## Validation Rules

### Email
- Required
- Must be valid format
- Must be unique

### Username
- Required
- Minimum 3 characters
- Letters, numbers, underscores only
- Must be unique

### Phone
- Required
- Philippine format: `+639171234567` or `09171234567`

### Password
- Required for new users
- Minimum 8 characters
- Optional when editing (leave blank to keep current)

### Age
- Required
- Between 18 and 120

## Troubleshooting

### Admin Link Not Showing
- **This is intentional!** The admin panel is hidden from navigation for security
- Access it directly via URL: `/adminpanel`

### Can't Access /adminpanel
- Make sure you're logged in as admin (admin@pmms.com)
- Only admin users can access
- Non-admins are redirected to dashboard

### Search Not Working
- Click "🔍 Search" button after typing
- Click "Clear" to reset search

### Changes Not Saving
- All data is in-memory
- Refreshing the page resets to original 6 users
- This is expected behavior for dummy data

## Next Steps

After testing the Admin Panel:
1. Review the code structure
2. Check `adminService.js` for Supabase migration comments
3. Plan Supabase database schema
4. Implement real authentication
5. Migrate to Supabase database

---

**Status:** Ready to test! 🎉  
**Login:** admin@pmms.com / admin123456  
**Route:** /adminpanel (hidden from navigation)
