'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF8042', '#00C49F'];

interface LocationTypeChartProps {
  data: { type: string; count: number }[];
}

export default function LocationTypeChart({ data }: LocationTypeChartProps) {
  return (
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Tipe Lokasi</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="type"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
