"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-10 pb-20 pt-4"
    >
      {/* Back Button */}
      <div className="flex items-center justify-between px-2">
        <Link href="/">
          <Button variant="ghost" className="rounded-full gap-2 pl-2 pr-6 font-bold hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all duration-300">
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Profile Secure</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Card: Identity */}
        <div className="lg:col-span-5">
          <Card className="glass-card rounded-[3rem] border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] overflow-hidden relative group h-full bg-gradient-to-br from-black/40 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-primary/5 pointer-events-none" />
            
            {/* Header / Avatar Area */}
            <div className="h-48 bg-gradient-to-br from-emerald-600/30 via-cyan-600/10 to-transparent relative flex items-center justify-center pt-8">
              <div className="relative group/avatar cursor-pointer">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-xl opacity-0 group-hover/avatar:opacity-40 transition-opacity duration-700" />
                <div className="h-36 w-36 rounded-full border-4 border-background bg-secondary shadow-2xl overflow-hidden relative z-10 transition-transform duration-700 group-hover/avatar:scale-105">
                  <User className="h-16 w-16 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
                  <img 
                    src="/profile-pic.png" 
                    alt="Suraj" 
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/avatar:scale-110 z-10" 
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              </div>
            </div>

            <CardContent className="px-10 pb-12 pt-16 text-center">
              <motion.h2 className="text-4xl font-black tracking-tighter mb-2">Suraj Yadav</motion.h2>
              <div className="flex items-center justify-center gap-2 mb-10">
                <Badge variant="outline" className="rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-500 bg-emerald-500/5">Premium Member</Badge>
              </div>

              <div className="grid gap-4 mt-8">
                <Button className="w-full rounded-2xl h-14 font-black shadow-lg shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 text-white transform active:scale-95 transition-all">
                   Manage Identity
                </Button>
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full rounded-2xl h-14 font-black border-white/10 hover:bg-white/5 transform active:scale-95 transition-all">
                    Sign Out Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Card: Intel & Details */}
        <div className="lg:col-span-7 flex flex-col gap-6">


          <Card className="glass-card rounded-[3rem] border-none shadow-xl flex-1 relative overflow-hidden bg-gradient-to-br from-black/20 to-transparent">
             <div className="absolute right-0 top-0 h-64 w-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             
             <CardContent className="p-10 space-y-10">
               <div>
                 <h3 className="text-xl font-black tracking-tight mb-2 flex items-center gap-3">
                   <Zap className="h-5 w-5 text-emerald-500 fill-emerald-500" /> Account Intel
                 </h3>
                 <p className="text-sm font-medium text-muted-foreground">Detailed identity and verification summary.</p>
               </div>

               <div className="grid gap-8">
                 {[
                   { label: "Direct Email", value: "surajkosliya2004@gmail.com", icon: Mail, color: "text-blue-500" },
                   { label: "Active Location", value: "Bangalore, India", icon: MapPin, color: "text-red-500" },
                   { label: "Birth Record", value: "08/02/2004", icon: Calendar, color: "text-orange-500" },
                 ].map((detail, idx) => (
                   <motion.div 
                    key={detail.label}
                    variants={itemVariants}
                    className="flex justify-between items-center group/item"
                   >
                     <div className="flex items-center gap-6">
                       <div className={`h-14 w-14 rounded-[1.25rem] bg-muted/50 flex items-center justify-center transition-all duration-300 group-hover/item:bg-white/5 border border-white/5`}>
                         <detail.icon className={`h-6 w-6 ${detail.color}`} />
                       </div>
                       <div>
                         <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{detail.label}</p>
                         <p className="text-lg font-bold group-hover/item:text-primary transition-colors">{detail.value}</p>
                       </div>
                     </div>
                     <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                       <TrendingUp className="h-4 w-4 text-muted-foreground" />
                     </div>
                   </motion.div>
                 ))}
               </div>


             </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}


