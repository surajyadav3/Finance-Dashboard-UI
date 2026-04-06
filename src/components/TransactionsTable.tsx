"use client";

import { useState } from "react";
import { useStore, Transaction } from "@/store/useStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Trash2, ArrowUpDown, Pencil, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function TransactionsTable() {
  const { transactions, filters, setFilter, role, deleteTransaction, updateTransaction } = useStore();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  // Edit form state
  const [editDesc, setEditDesc] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState<"income" | "expense">("expense");

  const categories = ["All", ...Array.from(new Set(transactions.map((t) => t.category)))];

  const filteredTransactions = transactions
    .filter((t) =>
      t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.category.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((t) => filters.category === "All" || t.category === filters.category)
    .sort((a, b) => {
      let cmp = 0;
      if (filters.sortBy === "date") {
        const parseDate = (d: string) => {
          if (d.includes('/')) {
            const [da, ma, ya] = d.split('/');
            return new Date(`${ya}-${ma}-${da}`).getTime();
          }
          return new Date(d).getTime(); // Handles YYYY-MM-DD
        };
        cmp = parseDate(a.date) - parseDate(b.date);
      } else {
        cmp = a.amount - b.amount;
      }
      return filters.sortOrder === "asc" ? cmp : -cmp;
    });

  const toggleSort = (field: "date" | "amount") => {
    if (filters.sortBy === field) {
      setFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    } else {
      setFilter("sortBy", field);
      setFilter("sortOrder", "desc");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Date,Description,Amount,Category,Type"];
    const rows = filteredTransactions.map(
      (t) => `${t.date},"${t.description}",${t.amount},"${t.category}",${t.type}`
    );
    const blob = new Blob([[headers, ...rows].join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "zorvyn_transactions.csv";
    link.click();
  };

  const openEdit = (t: Transaction) => {
    setEditingTransaction(t);
    setEditDesc(t.description);
    setEditAmount(String(t.amount));
    setEditCategory(t.category);
    setEditType(t.type);
    setEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction || !editDesc || !editAmount || !editCategory) return;
    updateTransaction(editingTransaction.id, {
      description: editDesc,
      amount: parseFloat(editAmount),
      category: editCategory,
      type: editType,
      date: editingTransaction.date,
    });
    setEditOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9 h-9 rounded-lg"
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
            />
          </div>
          <Select value={filters.category} onValueChange={(val) => val && setFilter("category", val)}>
            <SelectTrigger className="w-full sm:w-[160px] h-9 rounded-lg">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {categories.map((c) => (
                <SelectItem key={c} value={c} className="rounded-lg text-sm">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg h-9" onClick={handleExportCSV}>
          <Download className="mr-2 h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[110px] cursor-pointer" onClick={() => toggleSort("date")}>
                <div className="flex items-center gap-1 text-xs">
                  Date
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-xs">Description</TableHead>
              <TableHead className="text-xs">Category</TableHead>
              <TableHead className="text-xs">Type</TableHead>
              <TableHead className="text-right cursor-pointer text-xs" onClick={() => toggleSort("amount")}>
                <div className="flex items-center justify-end gap-1">
                  Amount
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              {role === "admin" && <TableHead className="w-[80px] text-xs">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={role === "admin" ? 6 : 5} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Inbox className="h-10 w-10 opacity-40" />
                    <p className="text-sm font-medium">No transactions found</p>
                    <p className="text-xs">Try adjusting your search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((t) => (
                <TableRow
                  key={t.id}
                  className="transition-colors hover:bg-muted/50 group"
                >
                  <TableCell className="text-sm tabular-nums">{t.date}</TableCell>
                  <TableCell className="text-sm font-medium">{t.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-normal">
                      {t.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={t.type === "income" ? "default" : "secondary"}
                      className={`text-xs font-normal ${t.type === "income" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"}`}
                    >
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right text-sm font-semibold tabular-nums ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                    {t.type === "income" ? "+" : "−"}₹{t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </TableCell>
                  {role === "admin" && (
                    <TableCell>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => openEdit(t)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:bg-destructive/10"
                          onClick={() => deleteTransaction(t.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="edit-desc" className="text-sm">Description</Label>
              <Input id="edit-desc" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="edit-amount" className="text-sm">Amount (₹)</Label>
              <Input id="edit-amount" type="number" step="0.01" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
              <Label className="text-sm">Type</Label>
              <Select value={editType} onValueChange={(val: "income" | "expense" | null) => val && setEditType(val)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="edit-category" className="text-sm">Category</Label>
              <Input id="edit-category" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full mt-2">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
