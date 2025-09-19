# Setup Instructions - Forum Alumni SMK Telkom Jakarta

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Buat file `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-supabase-anon-key
```

### 3. Database Setup

#### A. Jalankan Schema

Di Supabase SQL Editor, jalankan:

```sql
-- File: db-migration/custom-auth-schema.sql
-- Copy dan paste seluruh isi file
```

#### B. Buat Admin User

```sql
-- File: db-migration/create-admin-with-hash.sql
INSERT INTO users (email, password_hash, role, full_name, is_active)
VALUES (
  'admin@admin.com',
  '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'admin',
  'Administrator',
  true
);
```

### 4. Run Application

```bash
pnpm dev
```

### 5. Login

- URL: http://localhost:3000
- Email: `admin@admin.com`
- Password: `password`

## ✅ Features

- **Custom Authentication** - No Supabase Auth complexity
- **Multi-Role System** - Siswa, Alumni, Guru, Admin
- **Admin Dashboard** - User management and statistics
- **Session Management** - Secure cookie-based sessions
- **Password Security** - bcrypt hashing

## 🔧 Admin Features

After login as admin:

- View user statistics
- Create new users with auto-generated passwords
- Manage user roles
- Access admin-only dashboard

## 📁 File Structure

```
app/
├── (main)/           # Protected main pages
├── admin/            # Admin dashboard
├── auth/login/       # Login page
└── api/auth/         # Auth API endpoints

lib/
├── auth.ts           # Custom auth functions
├── middleware.ts     # Route protection
└── types.ts          # TypeScript types

db-migration/
├── custom-auth-schema.sql      # Database schema
└── create-admin-with-hash.sql  # Admin user creation
```

## 🚨 Troubleshooting

**Login Issues:**

- Pastikan database schema sudah dijalankan
- Pastikan admin user sudah dibuat
- Check browser console untuk errors

**Database Errors:**

- Verify Supabase connection
- Check environment variables
- Ensure SQL scripts ran successfully

---

**System is now clean and simplified! 🎉**
