"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from "recharts";
import { motion } from "framer-motion";

export function MonthlyComparisonChart() {
  const transactions = useStore((state) => state.transactions);

  // Group by month
  const monthlyData = transactions.reduce((acc, t) => {
    const [d, m, y] = t.date.split('/');
    const dateObj = new Date(`${y}-${m}-${d}`);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expense += t.amount;
    return acc;
  }, {} as Record<string, any>);

  const data = Object.values(monthlyData).sort((a, b) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  return (
    <Card className="glass-card rounded-[2.5rem] border-none shadow-xl h-[450px] overflow-hidden">
      <CardHeader className="pt-8 px-8 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold tracking-tight">Monthly Comparison</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Income vs Expenses over time.</p>
        </div>
      </CardHeader>
      <CardContent className="h-[340px] px-4 pb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.05} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fontWeight: 700 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 600 }} 
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              cursor={{ fill: 'currentColor', opacity: 0.05 }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))', 
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '16px'
              }}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle"
              wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
            />
            <Bar 
              dataKey="income" 
              name="Income" 
              fill="url(#incomeGradient)" 
              radius={[6, 6, 0, 0]} 
              animationDuration={1500}
            />
            <Bar 
              dataKey="expense" 
              name="Expense" 
              fill="url(#expenseGradient)" 
              radius={[6, 6, 0, 0]} 
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
