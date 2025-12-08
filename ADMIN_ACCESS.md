# 🔐 Admin Panel Access

## Admin Credentials
**Email:** `admin@pmms.com`  
**Password:** `admin123456`

## How to Access
1. Login with admin credentials at `/login`
2. Navigate directly to: **`/adminpanel`**
3. The admin panel is **hidden from navigation** for security

## Security Features
✅ Only users with `role: 'admin'` can access  
✅ Regular users are redirected to dashboard  
✅ Not visible in navigation menu  
✅ Direct URL access only  

## For Production
When you deploy to production, access via:
```
https://yourdomain.com/adminpanel
```

**Important:** Keep admin credentials secure and change them in production!
