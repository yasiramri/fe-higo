'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DigitalInterestChartProps {
  data: { interest: string; count: number }[];
}

export default function DigitalInterestChart({
  data,
}: DigitalInterestChartProps) {
  return (
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Minat Digital</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="interest" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
