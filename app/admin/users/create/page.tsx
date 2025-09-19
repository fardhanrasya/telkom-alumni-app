import { CreateUserForm } from "@/components/create-user-form";

export default function CreateUserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Tambah Pengguna Baru
        </h1>
        <p className="text-gray-600">
          Buat akun baru untuk memberikan akses ke forum alumni
        </p>
      </div>

      <CreateUserForm />
    </div>
  );
}
