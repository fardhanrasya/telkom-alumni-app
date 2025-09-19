import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { ProfileForm } from "@/components/profile-form";
import { ChangePasswordForm } from "@/components/change-password-form";
import { RoleBadge } from "@/components/role-badge";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-600">
          Kelola informasi profil dan keamanan akun Anda
        </p>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {(user.full_name || user.email).charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {user.full_name || "Nama belum diisi"}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2">
              <RoleBadge role={user.role} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Bergabung:</span>
            <p className="text-gray-600">
              {new Date(user.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">
              Terakhir diupdate:
            </span>
            <p className="text-gray-600">
              {new Date(user.updated_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Info (Read-only) */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Informasi Profil</h3>
        <ProfileForm user={user} />
      </div>

      {/* Change Password Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Ubah Password</h3>
        <ChangePasswordForm />
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">Catatan Keamanan</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Jika lupa password, hubungi administrator untuk reset</li>
          <li>
            • Email dan nama lengkap hanya dapat diubah oleh administrator
          </li>
          <li>
            • Akun tidak dapat dihapus sendiri, hubungi administrator jika
            diperlukan
          </li>
          <li>• Gunakan password yang kuat dan unik</li>
        </ul>
      </div>
    </div>
  );
}
