import { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "guru":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "alumni":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "siswa":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleDisplayName = (role: UserRole): string => {
    const roleNames: Record<UserRole, string> = {
      siswa: "Siswa",
      alumni: "Alumni",
      guru: "Guru",
      admin: "Administrator",
    };

    return roleNames[role];
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getRoleColor(role),
        className
      )}
    >
      {getRoleDisplayName(role)}
    </span>
  );
}
