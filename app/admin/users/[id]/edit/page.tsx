import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AdminEditUserForm } from "@/components/admin-edit-user-form";
import { RoleBadge } from "@/components/role-badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface EditUserPageProps {
  params: {
    id: string;
  };
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const hasAdminAccess = await isAdmin();
  if (!hasAdminAccess) {
    redirect("/");
  }

  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !user) {
    redirect("/admin/users");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/users" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar User
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
        <p className="text-gray-600">Kelola informasi dan akses user</p>
      </div>

      {/* User Info */}
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

      {/* Edit Form */}
      <AdminEditUserForm user={user} />
    </div>
  );
}
