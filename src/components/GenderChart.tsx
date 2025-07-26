// components/GenderChart.tsx
'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function GenderChart({
  data,
}: {
  data: { gender: string; count: number }[];
}) {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Distribusi Gender</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="gender"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
