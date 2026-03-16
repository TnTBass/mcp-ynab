"use client";

import { formatMilliunits, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Transaction {
  date: string;
  amount: number;
  payee?: string;
  payee_name?: string;
  category?: string;
  category_name?: string;
  account?: string;
  account_name?: string;
  memo?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="py-4 text-center text-sm text-[var(--muted-foreground)]">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-[var(--border)] text-left text-[var(--muted-foreground)]">
            <th className="pb-2 pr-3 font-medium">Date</th>
            <th className="pb-2 pr-3 font-medium">Payee</th>
            <th className="pb-2 pr-3 font-medium">Category</th>
            <th className="pb-2 font-medium text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 50).map((tx, i) => (
            <tr
              key={i}
              className="border-b border-[var(--border)] last:border-0"
            >
              <td className="py-1.5 pr-3 whitespace-nowrap">
                {formatDate(tx.date)}
              </td>
              <td className="py-1.5 pr-3 max-w-[200px] truncate">
                {tx.payee ?? tx.payee_name ?? "—"}
              </td>
              <td className="py-1.5 pr-3 max-w-[150px] truncate text-[var(--muted-foreground)]">
                {tx.category ?? tx.category_name ?? "—"}
              </td>
              <td
                className={cn(
                  "py-1.5 text-right whitespace-nowrap font-mono",
                  tx.amount >= 0 ? "text-green-600" : "text-red-500"
                )}
              >
                {formatMilliunits(tx.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length > 50 && (
        <p className="mt-2 text-xs text-[var(--muted-foreground)]">
          Showing 50 of {transactions.length} transactions
        </p>
      )}
    </div>
  );
}
