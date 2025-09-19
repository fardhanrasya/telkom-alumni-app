"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole } from "@/lib/types";
import { Eye, EyeOff, Trash2 } from "lucide-react";

interface AdminEditUserFormProps {
  user: User;
}

export function AdminEditUserForm({ user }: AdminEditUserFormProps) {
  const [profileData, setProfileData] = useState({
    full_name: user.full_name || "",
    email: user.email,
    role: user.role,
  });
  const [passwordData, setPasswordData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingProfile(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/admin/users/${user.id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengupdate user");
      }

      setSuccess("Profil user berhasil diupdate!");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingPassword(true);
    setError(null);
    setSuccess(null);

    if (passwordData.new_password !== passwordData.confirm_password) {
      setError("Password dan konfirmasi tidak cocok");
      setIsLoadingPassword(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          new_password: passwordData.new_password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal reset password");
      }

      setSuccess(
        `Password berhasil direset! Password baru: ${passwordData.new_password}`
      );
      setPasswordData({
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsLoadingDelete(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/admin/users/${user.id}/delete`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus user");
      }

      setSuccess("User berhasil dihapus!");
      setTimeout(() => {
        router.push("/admin/users");
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoadingDelete(false);
      setShowDeleteConfirm(false);
    }
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasswordData((prev) => ({
      ...prev,
      new_password: password,
      confirm_password: password,
    }));
  };

  const hasProfileChanges =
    profileData.full_name !== (user.full_name || "") ||
    profileData.email !== user.email ||
    profileData.role !== user.role;

  return (
    <div className="space-y-8">
      {/* Edit Profile */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Edit Profil User</h3>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nama Lengkap</Label>
              <Input
                id="full_name"
                type="text"
                value={profileData.full_name}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    full_name: e.target.value,
                  }))
                }
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Masukkan email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={profileData.role}
              onValueChange={(value: UserRole) =>
                setProfileData((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="siswa">Siswa</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="guru">Guru</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isLoadingProfile || !hasProfileChanges}
            >
              {isLoadingProfile ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>

            {hasProfileChanges && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setProfileData({
                    full_name: user.full_name || "",
                    email: user.email,
                    role: user.role,
                  })
                }
              >
                Reset
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Reset Password */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Reset Password User</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="new_password">Password Baru</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generatePassword}
              >
                Generate
              </Button>
            </div>
            <div className="relative">
              <Input
                id="new_password"
                type={showPassword ? "text" : "password"}
                value={passwordData.new_password}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    new_password: e.target.value,
                  }))
                }
                placeholder="Password baru (min. 6 karakter)"
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Konfirmasi Password</Label>
            <Input
              id="confirm_password"
              type={showPassword ? "text" : "password"}
              value={passwordData.confirm_password}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirm_password: e.target.value,
                }))
              }
              placeholder="Ulangi password baru"
              required
            />
          </div>

          <Button type="submit" disabled={isLoadingPassword} className="w-full">
            {isLoadingPassword ? "Mereset Password..." : "Reset Password"}
          </Button>
        </form>
      </div>

      {/* Delete User */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-red-200">
        <h3 className="text-lg font-semibold mb-4 text-red-800">Hapus User</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-2">Peringatan!</h4>
            <p className="text-sm text-red-700">
              Menghapus user akan menghilangkan semua data yang terkait dengan
              akun ini. Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>

          {!showDeleteConfirm ? (
            <Button
              type="button"
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Hapus User
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-red-800">
                Yakin ingin menghapus user "{user.full_name || user.email}"?
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteUser}
                  disabled={isLoadingDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {isLoadingDelete ? "Menghapus..." : "Ya, Hapus"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Batal
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded">
          <div className="font-medium mb-1">Berhasil!</div>
          <div className="whitespace-pre-line">{success}</div>
          {success.includes("Password baru:") && (
            <div className="mt-2 text-xs">
              Berikan password ini kepada user yang bersangkutan.
            </div>
          )}
        </div>
      )}

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">Catatan Admin</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Perubahan role akan mempengaruhi akses user ke sistem</li>
          <li>• Password yang direset harus diberikan kepada user</li>
          <li>
            • Penghapusan user bersifat permanen dan tidak dapat dibatalkan
          </li>
          <li>• User tidak dapat menghapus akun sendiri</li>
        </ul>
      </div>
    </div>
  );
}
