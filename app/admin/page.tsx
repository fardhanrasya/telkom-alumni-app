import { createClient } from "@/lib/supabase/server";
import { Users, UserPlus, Shield, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Get user statistics
  const { data: users } = await supabase
    .from("users")
    .select("role")
    .eq("is_active", true);

  const userStats =
    users?.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

  const totalUsers = Object.values(userStats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Pengguna
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Alumni</p>
              <p className="text-2xl font-bold text-gray-900">
                {userStats?.alumni || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Guru</p>
              <p className="text-2xl font-bold text-gray-900">
                {userStats?.guru || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Siswa</p>
              <p className="text-2xl font-bold text-gray-900">
                {userStats?.siswa || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button asChild className="h-auto p-4 justify-start">
            <Link
              href="/admin/users/create"
              className="flex items-center gap-3"
            >
              <UserPlus className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Tambah Pengguna Baru</div>
                <div className="text-sm opacity-90">
                  Buat akun untuk siswa, alumni, atau guru
                </div>
              </div>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-auto p-4 justify-start"
          >
            <Link href="/admin/users" className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Kelola Pengguna</div>
                <div className="text-sm opacity-90">
                  Lihat dan edit data pengguna
                </div>
              </div>
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium">Sistem berhasil diperbarui</p>
              <p className="text-xs text-gray-500">2 jam yang lalu</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium">Backup database berhasil</p>
              <p className="text-xs text-gray-500">1 hari yang lalu</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Maintenance terjadwal</p>
              <p className="text-xs text-gray-500">3 hari yang lalu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
