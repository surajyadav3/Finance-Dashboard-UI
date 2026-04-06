import { TransactionsTable } from "@/components/TransactionsTable";
import { AddTransactionModal } from "@/components/AddTransactionModal";

export default function TransactionsPage() {
  return (
    <div className="w-full space-y-6 relative">
      <div className="flex flex-col gap-1 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter">Transactions.</h2>
        <p className="text-lg text-muted-foreground font-medium">Manage and track your financial activities.</p>
      </div>

      <TransactionsTable />
      <AddTransactionModal />
    </div>
  );
}
