"use client";

import { Moon, Sun, Bell, User, Hexagon } from "lucide-react";
import { useTheme } from "next-themes";
import { useStore, Role } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/" },
  { name: "Transactions", href: "/transactions" },
  { name: "Insights", href: "/insights" },
];

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const pathname = usePathname();

  return (
    <div className="w-full sticky top-0 z-30 border-b bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-emerald-500"
            >
              <path d="M16 4C10 4 6 12 6 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M8 20C14 20 18 12 18 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Fintech</span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Nav */}
        <nav className="flex md:hidden items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Role & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger className="h-7 border border-input/50 bg-background/50 hover:bg-accent/50 focus-visible:ring-0 px-3 rounded-full transition-all duration-300">
                <span className="text-xs font-medium text-muted-foreground capitalize">
                  {role}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <span className="text-xs font-medium">Admin</span>
                </SelectItem>
                <SelectItem value="viewer">
                  <span className="text-xs font-medium">Viewer</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative rounded-full h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-emerald-500" />
          </Button>

          <Link href="/profile" className="h-8 w-8 rounded-full border flex items-center justify-center bg-muted hover:bg-accent transition-colors overflow-hidden relative group">
            <User className="h-4 w-4 text-muted-foreground" />
            <img 
              src="/profile-pic.png" 
              alt="Suraj" 
              className="absolute inset-0 h-full w-full object-cover" 
              onError={(e) => (e.currentTarget.style.display = 'none')} 
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
