"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export function AddTransactionModal() {
  const [open, setOpen] = useState(false);
  const role = useStore((state) => state.role);
  const addTransaction = useStore((state) => state.addTransaction);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  if (role !== "admin") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category) return;

    addTransaction({
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toLocaleDateString("en-GB"), // Produces DD/MM/YYYY
    });

    setOpen(false);
    setDescription("");
    setAmount("");
    setCategory("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-2xl bg-emerald-500 hover:bg-emerald-600 border-none p-0 flex items-center justify-center z-50 outline-none hover:scale-105 active:scale-95 transition-transform cursor-pointer">
        <Plus className="h-6 w-6 text-white" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-card border-white/10 dark:border-white/10">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Acme Corp Salary"
              className="bg-background/50 backdrop-blur-sm"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-background/50 backdrop-blur-sm"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Type</Label>
            <Select value={type} onValueChange={(val: "income" | "expense" | null) => val && setType(val)}>
              <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Salary, Software"
              className="bg-background/50 backdrop-blur-sm"
              required
            />
          </div>
          <Button type="submit" className="w-full mt-2">
            Save Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
