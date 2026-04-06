"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Lightbulb, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function InsightsCards() {
  const transactions = useStore((state) => state.transactions);

  const incomeTransactions = transactions.filter((t) => t.type === "income");
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  const highestIncome = [...incomeTransactions].sort((a, b) => b.amount - a.amount)[0];
  const highestExpense = [...expenseTransactions].sort((a, b) => b.amount - a.amount)[0];
  const latestIncome = [...incomeTransactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const expenseByCategory = expenseTransactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(expenseByCategory).reduce((max, [name, value]) => {
    return value > max.value ? { name, value } : max;
  }, { name: "N/A", value: 0 });

  const cards = [
    {
      title: "Highest Income",
      value: highestIncome ? `₹${highestIncome.amount.toLocaleString("en-IN")}` : "₹0",
      subValue: highestIncome ? `From: ${highestIncome.description}` : "No income yet",
      icon: TrendingUp,
      color: "text-emerald-500",
      border: "border-l-emerald-500",
      glow: "from-emerald-500/20 to-emerald-500/0",
    },
    {
      title: "Highest Expense",
      value: highestExpense ? `₹${highestExpense.amount.toLocaleString("en-IN")}` : "₹0",
      subValue: highestExpense ? `On: ${highestExpense.description}` : "No expenses yet",
      icon: TrendingDown,
      color: "text-red-500",
      border: "border-l-red-500",
      glow: "from-red-500/20 to-red-500/0",
    },
    {
      title: "Latest Income",
      value: latestIncome ? `₹${latestIncome.amount.toLocaleString("en-IN")}` : "₹0",
      subValue: latestIncome ? `Source: ${latestIncome.description} (${latestIncome.date})` : "N/A",
      icon: Lightbulb,
      color: "text-blue-500",
      border: "border-l-blue-500",
      glow: "from-blue-500/20 to-blue-500/0",
    },
    {
      title: "Top Spending Category",
      value: highestCategory.name,
      subValue: `Total: ₹${highestCategory.value.toLocaleString("en-IN")}`,
      icon: AlertCircle,
      color: "text-amber-500",
      border: "border-l-amber-500",
      glow: "from-amber-500/20 to-amber-500/0",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map((card, i) => (
        <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className={`glass-card glass-card-hover border-l-4 ${card.border} pt-2 h-full rounded-3xl overflow-hidden group`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${card.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-xl bg-background/50 backdrop-blur-md`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {card.subValue}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
