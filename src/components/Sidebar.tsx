"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Receipt, PieChart, Settings, LogOut, Wallet, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Transactions", icon: Receipt, href: "/transactions" },
  { name: "Insights", icon: PieChart, href: "/insights" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex flex-col w-64 h-screen glass border-r z-40 fixed left-0 top-0 pt-6 pb-4 px-4"
    >
      <div className="flex items-center gap-3 px-2 mb-10 text-emerald-500">
        <Wallet size={32} />
        <h1 className="text-xl font-bold tracking-tight text-foreground">NeoFi</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-full transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground font-bold shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Link href="/profile">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-3 rounded-3xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all cursor-pointer"
          >
            <div className="h-10 w-10 rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden relative">
              <User size={20} className="text-muted-foreground" />
              <img 
                src="/profile-pic.png" 
                alt="Suraj Yadav" 
                className="absolute inset-0 h-full w-full object-cover" 
                onError={(e) => (e.currentTarget.style.display = 'none')} 
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">Suraj Yadav</p>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Pro Admin</p>
            </div>
          </motion.div>
        </Link>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-bold"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
