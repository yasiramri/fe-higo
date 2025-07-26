'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LoginHourChartProps {
  data: { hour: string; count: number }[];
}

export default function LoginHourChart({ data }: LoginHourChartProps) {
  return (
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Distribusi Login per Jam</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
