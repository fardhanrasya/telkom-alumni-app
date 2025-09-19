"use client";

import { User } from "@/lib/types";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <div className="p-3 bg-gray-50 rounded-md border">
            <span className="text-gray-900">
              {user.full_name || "Belum diisi"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="p-3 bg-gray-50 rounded-md border">
            <span className="text-gray-900">{user.email}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Informasi</h4>
        <p className="text-sm text-blue-700">
          Email dan nama lengkap hanya dapat diubah oleh administrator. Hubungi
          admin jika perlu mengubah informasi ini.
        </p>
      </div>
    </div>
  );
}
