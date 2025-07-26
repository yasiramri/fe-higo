'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BirthYearChartProps {
  data: { decade: string; count: number }[];
}

export default function BirthYearChart({ data }: BirthYearChartProps) {
  return (
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Distribusi Tahun Lahir</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="decade" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#a36fff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
