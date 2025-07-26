import { HigoData } from '@/types/higo';
import GenderChart from '@/components/GenderChart';
import DataTable from '@/components/DataTable';
import api from '@/lib/api';
import AgeChart from '@/components/AgeChart';

type GenderStat = {
  gender: string;
  count: number;
};

export default async function DashboardPage() {
  const res = await api.get('/higo');
  const dataset: HigoData[] = res.data?.data?.data ?? [];

  console.log('DATA SET; ', dataset);

  function getAgeRange(age: number): string {
    if (age < 20) return '0-19';
    if (age < 30) return '20-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    return '50+';
  }

  const ageStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      const range = getAgeRange(item.Age);
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {})
  ).map(([ageRange, count]) => ({ ageRange, count }));

  const genderMap = dataset.reduce<Record<string, number>>((acc, item) => {
    acc[item.gender] = (acc[item.gender] || 0) + 1;
    return acc;
  }, {});

  const genderStats: GenderStat[] = Object.entries(genderMap).map(
    ([gender, count]) => ({ gender, count })
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <GenderChart data={genderStats} />
      <AgeChart data={ageStats} />
      <DataTable data={dataset} />
    </div>
  );
}
