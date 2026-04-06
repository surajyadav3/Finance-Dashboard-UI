"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthlyGoal() {
  return (
    <Card className="glass-card rounded-[2.5rem] border-none shadow-xl overflow-hidden group border-l-4 border-l-orange-500 h-full">
      <CardHeader className="pt-8 px-8 pb-0">
        <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8 pt-4">
        <div className="flex items-end justify-between mb-2">
          <div className="text-3xl font-bold text-foreground">₹45,000</div>
          <div className="text-sm text-muted-foreground font-bold italic">75% achieved</div>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "75%" }} 
            transition={{ duration: 2, ease: "easeOut" }} 
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400" 
          />
        </div>
        <p className="text-[10px] font-bold text-muted-foreground mt-4 leading-relaxed italic">
          "You're almost there! Just ₹15,000 to go until you hit your savings milestone."
        </p>
      </CardContent>
    </Card>
  );
}
