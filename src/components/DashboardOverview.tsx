"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet, Plus } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export function DashboardOverview() {
  const transactions = useStore((state) => state.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Aggregate data for AreaChart (balance trend simple approx)
  const sortedTransactions = [...transactions].sort((a, b) => {
    const parseDate = (d: string) => {
      if (d.includes('/')) {
        const [da, ma, ya] = d.split('/');
        return new Date(`${ya}-${ma}-${da}`).getTime();
      }
      return new Date(d).getTime();
    };
    return parseDate(a.date) - parseDate(b.date);
  });

  const areaData = sortedTransactions.reduce((acc, t) => {
    const prevBalance = acc.length > 0 ? acc[acc.length - 1]!.balance : 0;
    const balance = prevBalance + (t.type === "income" ? t.amount : -t.amount);
    acc.push({ date: t.date, balance });
    return acc;
  }, [] as { date: string; balance: number }[]);

  // Aggregate data for PieChart (expenses by category)
  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    }),
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter">Overview.</h2>
        <p className="text-lg text-muted-foreground font-medium italic">Empowering your financial journey with real-time intelligence.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="glass-card glass-card-hover group border-l-4 border-l-primary pt-2 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-125 group-hover:text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ₹{totalBalance.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="glass-card rounded-3xl glass-card-hover group border-l-4 border-l-emerald-500 pt-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-emerald-500 transition-transform group-hover:scale-125 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ₹{totalIncome.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-emerald-500 mt-1">All time income</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
          <Card className="glass-card rounded-3xl glass-card-hover group border-l-4 border-l-destructive pt-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-destructive transition-transform group-hover:scale-125 group-hover:translate-y-1 group-hover:translate-x-1" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ₹{totalExpense.toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-destructive mt-1">All time expenses</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 relative z-10">
        <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants} className="col-span-4">
          <Card className="glass-card rounded-[2.5rem] h-[450px]">
            <CardHeader className="pb-0 pt-8 px-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold tracking-tight">Wealth Flow</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Trend</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[350px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.05} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} />
                  <Tooltip
                    cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', padding: '12px' }}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, "Total Balance"]}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={4} fill="url(#balanceGradient)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariants} className="col-span-3">
          <Card className="glass-card rounded-[2.5rem] h-[450px]">
            <CardHeader className="pb-0 pt-8 px-8">
              <CardTitle className="text-xl font-bold tracking-tight">Expense DNA</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] flex md:flex-row flex-col items-center justify-center gap-8 px-8 py-4">
              <div className="w-full md:w-1/2 h-full max-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-3 max-h-[200px] overflow-y-auto no-scrollbar pr-1 self-center">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-3 text-sm group">
                    <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="font-bold text-muted-foreground group-hover:text-foreground transition-all duration-300 transform group-hover:translate-x-1 cursor-default">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

    </div>
  );
}
