import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { RoleBadge } from "@/components/role-badge";
import { Users, MessageSquare, Calendar, Trophy } from "lucide-react";

export default async function WelcomePage() {
  // Get user - middleware ensures user is authenticated
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20">
        <h1 className="text-3xl font-bold telkom-text-gradient mb-2">
          Selamat Datang di Forum Alumni!
        </h1>
        <div className="flex items-center gap-3 text-lg">
          <span className="text-muted-foreground">
            Halo,{" "}
            <span className="font-semibold text-primary">
              {user.full_name || user.email}
            </span>
            !
          </span>
          <RoleBadge role={user.role} />
        </div>
        <p className="text-muted-foreground">
          Selamat bergabung dengan komunitas SMK Telkom Jakarta.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-xl telkom-shadow border border-primary/10 text-center">
          <Users className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-bold text-2xl text-primary">1,247</h3>
          <p className="text-sm text-muted-foreground">Alumni Terdaftar</p>
        </div>
        <div className="bg-card p-6 rounded-xl telkom-shadow border border-primary/10 text-center">
          <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-bold text-2xl text-primary">3,892</h3>
          <p className="text-sm text-muted-foreground">Diskusi Aktif</p>
        </div>
        <div className="bg-card p-6 rounded-xl telkom-shadow border border-primary/10 text-center">
          <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-bold text-2xl text-primary">24</h3>
          <p className="text-sm text-muted-foreground">Event Bulan Ini</p>
        </div>
        <div className="bg-card p-6 rounded-xl telkom-shadow border border-primary/10 text-center">
          <Trophy className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-bold text-2xl text-primary">156</h3>
          <p className="text-sm text-muted-foreground">Lowongan Kerja</p>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Discussions */}
        <div className="bg-card p-6 rounded-xl telkom-shadow border border-primary/10">
          <h2 className="font-bold text-xl text-primary mb-4">
            Diskusi Terbaru
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary/30 pl-4 py-2">
              <h3 className="font-semibold text-sm">
                Tips Interview di Perusahaan Tech
              </h3>
              <p className="text-xs text-muted-foreground">
                oleh Ahmad Rizki • 2 jam lalu
              </p>
            </div>
            <div className="border-l-4 border-primary/30 pl-4 py-2">
              <h3 className="font-semibold text-sm">
                Reuni Angkatan 2020 - Planning
              </h3>
              <p className="text-xs text-muted-foreground">
                oleh Sari Dewi • 5 jam lalu
              </p>
            </div>
            <div className="border-l-4 border-primary/30 pl-4 py-2">
              <h3 className="font-semibold text-sm">
                Sharing Pengalaman Kerja di Startup
              </h3>
              <p className="text-xs text-muted-foreground">
                oleh Budi Santoso • 1 hari lalu
              </p>
            </div>
          </div>
          <button className="mt-4 text-primary text-sm font-medium hover:underline">
            Lihat Semua Diskusi →
          </button>
        </div>

        {/* Job Opportunities */}
        <div className="bg-card p-6 rounded-xl telkom-shadow border border-primary/10">
          <h2 className="font-bold text-xl text-primary mb-4">
            Lowongan Kerja Terbaru
          </h2>
          <div className="space-y-4">
            <div className="border border-primary/20 rounded-lg p-3">
              <h3 className="font-semibold text-sm">Frontend Developer</h3>
              <p className="text-xs text-muted-foreground">
                PT Teknologi Nusantara • Jakarta
              </p>
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mt-1">
                Fresh Graduate
              </span>
            </div>
            <div className="border border-primary/20 rounded-lg p-3">
              <h3 className="font-semibold text-sm">Network Engineer</h3>
              <p className="text-xs text-muted-foreground">
                PT Telkom Indonesia • Bandung
              </p>
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mt-1">
                1-2 Tahun
              </span>
            </div>
            <div className="border border-primary/20 rounded-lg p-3">
              <h3 className="font-semibold text-sm">IT Support Specialist</h3>
              <p className="text-xs text-muted-foreground">
                Bank Mandiri • Jakarta
              </p>
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mt-1">
                Entry Level
              </span>
            </div>
          </div>
          <button className="mt-4 text-primary text-sm font-medium hover:underline">
            Lihat Semua Lowongan →
          </button>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-card p-6 rounded-xl telkom-shadow border border-primary/10">
        <h2 className="font-bold text-xl text-primary mb-4">Event Mendatang</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="text-primary font-bold text-sm mb-1">
              15 Feb 2025
            </div>
            <h3 className="font-semibold text-sm mb-2">
              Workshop: Digital Marketing untuk UMKM
            </h3>
            <p className="text-xs text-muted-foreground">
              Online via Zoom • 19:00 WIB
            </p>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="text-primary font-bold text-sm mb-1">
              22 Feb 2025
            </div>
            <h3 className="font-semibold text-sm mb-2">
              Networking Night: Tech Industry
            </h3>
            <p className="text-xs text-muted-foreground">Jakarta • 18:00 WIB</p>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="text-primary font-bold text-sm mb-1">
              1 Mar 2025
            </div>
            <h3 className="font-semibold text-sm mb-2">
              Career Fair Alumni SMK Telkom
            </h3>
            <p className="text-xs text-muted-foreground">Bandung • 09:00 WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
