"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatMilliunits, formatMonth } from "@/lib/format";
import { cn } from "@/lib/utils";

interface MonthData {
  month: string;
  income?: number;
  budgeted?: number;
  activity?: number;
  to_be_budgeted?: number;
  age_of_money?: number;
  categories?: CategoryData[];
}

interface CategoryData {
  name?: string;
  category_group?: string;
  budgeted?: number;
  activity?: number;
  balance?: number;
}

interface MonthSummaryCardProps {
  data: MonthData;
}

export function MonthSummaryCard({ data }: MonthSummaryCardProps) {
  return (
    <Card className="border-[var(--border)]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          {data.month ? formatMonth(data.month) : "Month Summary"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          {data.income !== undefined && (
            <Stat label="Income" value={data.income} positive />
          )}
          {data.budgeted !== undefined && (
            <Stat label="Budgeted" value={data.budgeted} />
          )}
          {data.activity !== undefined && (
            <Stat label="Activity" value={data.activity} />
          )}
          {data.to_be_budgeted !== undefined && (
            <Stat
              label="To Be Budgeted"
              value={data.to_be_budgeted}
              highlight
            />
          )}
        </div>
        {data.age_of_money !== undefined && (
          <p className="text-xs text-[var(--muted-foreground)]">
            Age of Money: {data.age_of_money} days
          </p>
        )}
        {data.categories && data.categories.length > 0 && (
          <>
            <Separator />
            <div className="space-y-1">
              <p className="text-xs font-medium text-[var(--muted-foreground)]">
                Categories with activity
              </p>
              {data.categories
                .filter((c) => c.activity && c.activity !== 0)
                .slice(0, 15)
                .map((cat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="truncate pr-2">
                      {cat.name ?? "Unknown"}
                    </span>
                    <span
                      className={cn(
                        "font-mono whitespace-nowrap",
                        (cat.activity ?? 0) >= 0
                          ? "text-green-600"
                          : "text-red-500"
                      )}
                    >
                      {formatMilliunits(cat.activity ?? 0)}
                    </span>
                  </div>
                ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  positive,
  highlight,
}: {
  label: string;
  value: number;
  positive?: boolean;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
      <p
        className={cn(
          "font-mono font-medium",
          highlight && value > 0 && "text-green-600",
          highlight && value < 0 && "text-red-500",
          positive && "text-green-600"
        )}
      >
        {formatMilliunits(value)}
      </p>
    </div>
  );
}
