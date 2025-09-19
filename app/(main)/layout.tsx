import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
    <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-8 items-center">
        <nav className="w-full flex justify-center border-b border-b-primary/20 h-16 bg-white/80 backdrop-blur-sm">
            <div className="w-full max-w-6xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-bold">
            <Link href={"/"} className="telkom-text-gradient text-lg">
                Forum Alumni SMK Telkom Jakarta
            </Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
        </nav>
        <div className="flex-1 flex flex-col gap-8 max-w-6xl p-5 w-full">
        {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t border-primary/20 mx-auto text-center text-sm gap-8 py-8 bg-muted/30">
        <div className="flex flex-col items-center gap-2">
            <p className="font-semibold text-primary">
            Forum Alumni SMK Telkom Jakarta
            </p>
            <p className="text-muted-foreground text-xs">
            © 2025 Alumni SMK Telekomunikasi Jakarta
            </p>
        </div>
        <ThemeSwitcher />
        </footer>
    </div>
    </main>
);
}
