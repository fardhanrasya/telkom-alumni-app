# Forum Alumni SMK Telkom Jakarta

Platform forum eksklusif untuk alumni SMK Telkom Jakarta yang dibangun dengan Next.js dan Supabase.

## Fitur Utama

- **Sistem Autentikasi Lengkap**: Login, register, dan forgot password menggunakan Supabase Auth
- **Halaman Terproteksi**: Seluruh konten forum hanya dapat diakses oleh user yang sudah login
- **Dashboard Alumni**: Halaman welcome dengan statistik dan informasi terkini
- **Responsive Design**: Tampilan yang optimal di desktop dan mobile
- **Modern Tech Stack**: Next.js 14, Supabase, Tailwind CSS

## Struktur Aplikasi

### Halaman Publik

- `/` - Landing page dengan informasi forum dan tombol login
- `/auth/login` - Halaman login
- `/auth/register` - Halaman registrasi
- `/auth/forgot-password` - Halaman reset password

### Halaman Terproteksi

- `/` - Dashboard utama alumni (memerlukan login)

## Sistem Keamanan

- Middleware otomatis melindungi halaman `/`
- User yang belum login akan diarahkan ke halaman login
- User yang sudah login akan diarahkan ke dashboard saat mengakses landing page

## Setup Development

1. **Clone repository dan install dependencies**

```bash
npm install
```

2. **Setup Supabase project**

   - Buat project baru di [Supabase Dashboard](https://supabase.com/dashboard)
   - Jalankan SQL snippet "User Management Starter" di SQL Editor
   - Copy Project URL dan anon key

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
