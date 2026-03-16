"use client";

import { useState } from "react";
import { SankeyChart } from "./sankey-chart";
import { TransactionTable } from "./transaction-table";
import { MonthSummaryCard } from "./month-summary-card";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ToolResultRendererProps {
  toolName: string;
  result: string;
}

function CollapsibleJson({ data }: { data: unknown }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
      >
        {open ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
        {open ? "Hide" : "Show"} raw data
      </button>
      {open && (
        <pre className="mt-2 max-h-60 overflow-auto rounded bg-[var(--muted)] p-2 text-xs">
          {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export function ToolResultRenderer({
  toolName,
  result,
}: ToolResultRendererProps) {
  let parsed: unknown;
  try {
    parsed = typeof result === "string" ? JSON.parse(result) : result;
  } catch {
    return (
      <pre className="max-h-40 overflow-auto text-xs whitespace-pre-wrap">
        {String(result)}
      </pre>
    );
  }

  // Check for error responses
  if (
    parsed &&
    typeof parsed === "object" &&
    "error" in (parsed as Record<string, unknown>)
  ) {
    return (
      <div className="text-[var(--destructive)] text-xs">
        {(parsed as { error: string }).error}
      </div>
    );
  }

  if (toolName === "get_money_flow") {
    return <SankeyChart data={parsed as never} />;
  }

  const transactionTools = [
    "list_transactions",
    "get_transactions_by_account",
    "get_transactions_by_category",
    "get_transactions_by_payee",
  ];
  if (transactionTools.includes(toolName)) {
    const transactions = Array.isArray(parsed) ? parsed : [];
    if (transactions.length > 0) {
      return <TransactionTable transactions={transactions} />;
    }
  }

  if (toolName === "get_month") {
    return <MonthSummaryCard data={parsed as never} />;
  }

  return <CollapsibleJson data={parsed} />;
}
