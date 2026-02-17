# Supabase Auth Setup Guide

## What Was Implemented

✅ Supabase Auth integration with Next.js App Router
✅ Protected `/admin` routes with middleware
✅ Login page at `/admin/login`
✅ Session management with cookies
✅ Sign-out functionality

## Setup Steps (Required)

### 1. Enable Email Auth in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication > Providers**
3. Enable **Email** provider
4. (Optional) Configure email templates under **Authentication > Email Templates**

### 2. Create Your Admin User

Run this in your Supabase SQL Editor or use the Dashboard:

```sql
-- This will send a confirmation email
-- Or you can create directly in the Dashboard under Authentication > Users
```

**Option A: Via Supabase Dashboard**
1. Go to **Authentication > Users**
2. Click **Add user**
3. Enter email and password
4. Click **Create user**

**Option B: Via SQL (auto-confirmed)**
```sql
-- Replace with your email and password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'your-email@example.com', -- CHANGE THIS
  crypt('your-password-here', gen_salt('bf')), -- CHANGE THIS
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

### 3. Configure Email Settings (Optional but Recommended)

For production, configure SMTP settings in **Authentication > Email**:
- Use a service like SendGrid, Mailgun, or AWS SES
- Set up custom email templates
- Configure redirect URLs

### 4. Environment Variables (Already Set)

Make sure these are in your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Usage

### Login
1. Navigate to `/admin/login`
2. Enter your email and password
3. You'll be redirected to `/admin` on success

### Sign Out
Click the "Sign Out" button in the top-right of the admin panel

## Security Features

✅ **Protected Routes**: All `/admin/*` routes require authentication
✅ **Server-Side Auth Check**: Session verified on the server
✅ **Cookie-Based Sessions**: Secure, HTTP-only cookies
✅ **Automatic Redirects**: 
   - Not logged in → redirect to login
   - Already logged in → redirect to admin panel

## Files Created/Modified

- `lib/supabase.ts` - Added server client with cookie handling
- `middleware.ts` - Route protection
- `app/admin/login/page.tsx` - Login page
- `app/admin/login/LoginForm.tsx` - Login form component
- `app/admin/page.tsx` - Auth check added
- `app/admin/AdminPanel.tsx` - Sign-out button added

## Next Steps (Optional)

1. **Add password reset flow**
2. **Implement OAuth providers** (Google, GitHub, etc.)
3. **Add role-based access control** (if multiple admins)
4. **Set up email templates** in Supabase
5. **Enable MFA** for extra security

## Troubleshooting

**Can't log in?**
- Check that you created a user in Supabase Dashboard
- Verify email is confirmed (check `auth.users` table)
- Check browser console for errors

**Getting redirected to login repeatedly?**
- Clear cookies and try again
- Check that environment variables are set correctly

**Email not sending?**
- Supabase has rate limits on development (4 emails/hour)
- Configure custom SMTP for production
