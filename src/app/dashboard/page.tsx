import { HigoData } from '@/types/higo';
import api from '@/lib/api';

import DataTable from '@/components/DataTable';
import GenderChart from '@/components/GenderChart';
import AgeChart from '@/components/AgeChart';
import DigitalInterestChart from '@/components/DigitalInterestChart';
import BrandDeviceChart from '@/components/BrandDeviceChart';
import LoginHourChart from '@/components/LoginHourChart';
import LocationTypeChart from '@/components/LocationTypeChart';
import BirthYearChart from '@/components/BirthYearChart';

export default async function DashboardPage() {
  const res = await api.get('/higo');
  const dataset: HigoData[] = res.data?.data?.data ?? [];

  // AGE STATS
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

  // GENDER STATS
  const genderStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1;
      return acc;
    }, {})
  ).map(([gender, count]) => ({ gender, count }));

  // DIGITAL INTEREST STATS
  const interestStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      acc[item.Digital_Interest] = (acc[item.Digital_Interest] || 0) + 1;
      return acc;
    }, {})
  ).map(([interest, count]) => ({ interest, count }));

  // BRAND DEVICE STATS
  const brandStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      acc[item.Brand_Device] = (acc[item.Brand_Device] || 0) + 1;
      return acc;
    }, {})
  ).map(([brand, count]) => ({ brand, count }));

  // LOGIN HOUR STATS (di-binning per jam bulat)
  const hourStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      const raw = item.Login_Hour;

      if (typeof raw !== 'string' || !raw.includes(':')) {
        acc['Unknown'] = (acc['Unknown'] || 0) + 1;
        return acc;
      }

      const hourPart = raw.split(':')[0]?.padStart(2, '0');
      const hour = `${hourPart}:00`;
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {})
  ).map(([hour, count]) => ({ hour, count }));

  // LOCATION TYPE STATS
  const locationStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      acc[item.Location_Type] = (acc[item.Location_Type] || 0) + 1;
      return acc;
    }, {})
  ).map(([type, count]) => ({ type, count }));

  // BIRTH YEAR STATS by DECADE
  const birthStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      const decade = `${Math.floor(item.BirthYear / 10) * 10}s`;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    }, {})
  ).map(([decade, count]) => ({ decade, count }));

  return (
    <div className="space-y-10 p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <GenderChart data={genderStats} />
        <AgeChart data={ageStats} />
        <DigitalInterestChart data={interestStats} />
        <BrandDeviceChart data={brandStats} />
        <LoginHourChart data={hourStats} />
        <LocationTypeChart data={locationStats} />
        <BirthYearChart data={birthStats} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Data Lengkap</h2>
        <DataTable data={dataset} />
      </div>
    </div>
  );
}
