'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BrandDeviceChartProps {
  data: { brand: string; count: number }[];
}

export default function BrandDeviceChart({ data }: BrandDeviceChartProps) {
  return (
    <div className="p-4 border rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Penggunaan Brand Device</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="brand" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
