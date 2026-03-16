"use client";

import {
  Sankey,
  Tooltip,
  ResponsiveContainer,
  Layer,
  Rectangle,
} from "recharts";
import { formatDollars } from "@/lib/format";

interface SankeyNode {
  name: string;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

interface MoneyFlowData {
  month: string;
  total_income: number;
  total_spent: number;
  nodes: SankeyNode[];
  links: SankeyLink[];
}

interface SankeyChartProps {
  data: MoneyFlowData;
}

const COLORS = [
  "var(--primary)",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#0891b2",
  "#4f46e5",
  "#c026d3",
  "#e11d48",
  "#ca8a04",
  "#059669",
];

function SankeyNode(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: { name: string; value?: number };
}) {
  const { x, y, width, height, index, payload } = props;
  const color = COLORS[index % COLORS.length];

  return (
    <Layer>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        fillOpacity={0.9}
        rx={3}
      />
      <text
        x={x + width + 6}
        y={y + height / 2}
        textAnchor="start"
        dominantBaseline="central"
        fontSize={12}
        fill="currentColor"
      >
        {payload.name}
        {payload.value !== undefined && ` (${formatDollars(payload.value)})`}
      </text>
    </Layer>
  );
}

function SankeyLink(props: {
  sourceX: number;
  targetX: number;
  sourceY: number;
  targetY: number;
  sourceControlX: number;
  targetControlX: number;
  linkWidth: number;
  index: number;
}) {
  const {
    sourceX,
    targetX,
    sourceY,
    targetY,
    sourceControlX,
    targetControlX,
    linkWidth,
    index,
  } = props;
  const color = COLORS[(index + 1) % COLORS.length];

  return (
    <Layer>
      <path
        d={`
          M${sourceX},${sourceY + linkWidth / 2}
          C${sourceControlX},${sourceY + linkWidth / 2}
            ${targetControlX},${targetY + linkWidth / 2}
            ${targetX},${targetY + linkWidth / 2}
          L${targetX},${targetY - linkWidth / 2}
          C${targetControlX},${targetY - linkWidth / 2}
            ${sourceControlX},${sourceY - linkWidth / 2}
            ${sourceX},${sourceY - linkWidth / 2}
          Z
        `}
        fill={color}
        fillOpacity={0.3}
        strokeWidth={0}
      />
    </Layer>
  );
}

export function SankeyChart({ data }: SankeyChartProps) {
  if (!data.nodes?.length || !data.links?.length) {
    return (
      <div className="py-4 text-center text-sm text-[var(--muted-foreground)]">
        No money flow data available for this month.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">Money Flow</span>
        <span className="text-[var(--muted-foreground)]">
          Income: {formatDollars(data.total_income)} | Spent:{" "}
          {formatDollars(data.total_spent)}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={Math.max(300, data.nodes.length * 40)}>
        <Sankey
          data={data}
          nodeWidth={10}
          nodePadding={24}
          margin={{ top: 10, right: 160, bottom: 10, left: 10 }}
          node={<SankeyNode x={0} y={0} width={0} height={0} index={0} payload={{ name: "" }} />}
          link={<SankeyLink sourceX={0} targetX={0} sourceY={0} targetY={0} sourceControlX={0} targetControlX={0} linkWidth={0} index={0} />}
        >
          <Tooltip
            formatter={(value: number) => formatDollars(value)}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
