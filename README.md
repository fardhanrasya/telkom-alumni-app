# Forum Alumni SMK Telkom Jakarta

Platform forum eksklusif untuk komunitas SMK Telkom Jakarta yang dibangun dengan Next.js dan Supabase.

## Fitur Utama

- **Sistem Multi-Role**: Mendukung 4 role berbeda (Siswa, Alumni, Guru, Administrator)
- **Dashboard Admin**: Panel administrasi untuk mengelola pengguna dan sistem
- **Profile Management**: User dapat melihat dan edit profil, ganti password
- **Admin User Management**: Admin dapat edit profil user lain dan reset password
- **Custom Authentication**: Sistem autentikasi sendiri dengan bcrypt password hashing
- **Session Management**: Cookie-based session management
- **Halaman Terproteksi**: Konten forum hanya dapat diakses oleh user yang sudah login
- **Dashboard Role-based**: Tampilan yang disesuaikan berdasarkan role pengguna
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile
- **Modern Tech Stack**: Next.js 14, Supabase (database only), Tailwind CSS

## Struktur Aplikasi

### Halaman Publik

- `/auth/login` - Halaman login

### Halaman Terproteksi

- `/` - Dashboard utama (memerlukan login, tampilan berbeda berdasarkan role)
- `/profile` - Halaman profil user (edit profil, ganti password)
- `/admin` - Dashboard administrator (khusus admin)
- `/admin/users` - Kelola pengguna (khusus admin)
- `/admin/users/create` - Tambah pengguna baru (khusus admin)
- `/admin/users/[id]/edit` - Edit user dan reset password (khusus admin)

## Sistem Keamanan & Role

- **Multi-Role System**: 4 level akses (Siswa, Alumni, Guru, Admin)
- **Custom Authentication**: Sistem auth sendiri dengan bcrypt password hashing
- **Session-based Security**: Cookie-based session management
- **Middleware Protection**: Otomatis melindungi halaman berdasarkan role
- **Admin-Only Features**: Dashboard admin hanya dapat diakses oleh administrator
- **Controlled Registration**: Hanya admin yang dapat membuat akun baru

## Setup Development

1. **Clone repository dan install dependencies**

```bash
npm install
```

2. **Setup Supabase project**

   - Buat project baru di [Supabase Dashboard](https://supabase.com/dashboard)
   - Jalankan SQL dari file `db-migration/custom-auth-schema.sql` di SQL Editor
   - Copy Project URL dan anon key
   - Jalankan SQL dari file `db-migration/create-admin-with-hash.sql` untuk membuat admin pertama

3. **Setup environment variables**

```bash
cp .env.example .env.local
```

Isi file `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
```

4. **Jalankan development server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## Teknologi yang Digunakan

- **Framework**: Next.js 14 dengan App Router
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Deployment

Aplikasi dapat di-deploy ke Vercel dengan mudah:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/telkom-alumni-forum)

## Kontribusi

Untuk melaporkan bug atau request fitur, silakan buat issue di repository ini.

---

© 2025 Alumni SMK Telekomunikasi Jakarta

## Sistem Role & Permissions

### Role Hierarchy

1. **Siswa** - Akses dasar ke forum
2. **Alumni** - Akses penuh ke forum alumni
3. **Guru** - Akses moderasi dan konten edukatif
4. **Admin** - Akses penuh sistem termasuk manajemen pengguna

### Admin Features

- Dashboard statistik pengguna
- Membuat akun baru untuk semua role
- Mengelola data pengguna
- Generate password otomatis
- Monitoring aktivitas sistem

### Setup Admin Pertama

Setelah menjalankan migration SQL:

1. Buat user di Supabase Auth Dashboard
2. Insert ke tabel user_profiles:

```sql
INSERT INTO user_profiles (id, email, role, full_name)
VALUES ('user-uuid-from-auth', 'admin@example.com', 'admin', 'Administrator');
```

## API Endpoints

- `POST /api/admin/create-user` - Membuat pengguna baru (admin only)
