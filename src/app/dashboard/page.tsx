'use client';

import { useState, useEffect } from 'react';
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
import CreateUserModal from '@/components/CreateUserModal';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [dataset, setDataset] = useState<HigoData[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/higo');
      setDataset(res.data?.data?.data ?? []);
    };
    fetchData();
  }, [openModal]); // refresh setelah modal ditutup (submit data)

  function getAgeRange(age: number): string {
    if (age < 20) return '0-19';
    if (age < 30) return '20-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    return '50+';
  }

  // AGE STATS
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
      const gender = item.gender.trim().toLowerCase(); // normalize
      const formattedGender =
        gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Other';
      acc[formattedGender] = (acc[formattedGender] || 0) + 1;
      return acc;
    }, {})
  ).map(([gender, count]) => ({ gender, count }));

  // INTEREST STATS
  const interestStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      acc[item.Digital_Interest] = (acc[item.Digital_Interest] || 0) + 1;
      return acc;
    }, {})
  ).map(([interest, count]) => ({ interest, count }));

  // BRANS STATS
  const brandStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      acc[item.Brand_Device] = (acc[item.Brand_Device] || 0) + 1;
      return acc;
    }, {})
  ).map(([brand, count]) => ({ brand, count }));

  // HOUT STATS
  const hourStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      const raw = item.Login_Hour;
      if (
        typeof raw !== 'string' ||
        raw.length < 2 ||
        isNaN(Number(raw.slice(0, 2)))
      ) {
        acc['Unknown'] = (acc['Unknown'] || 0) + 1;
        return acc;
      }
      const hour = raw.slice(0, 2).padStart(2, '0') + ':00';
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {})
  ).map(([hour, count]) => ({ hour, count }));

  // LOCATION STATS
  const locationStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      acc[item.Location_Type] = (acc[item.Location_Type] || 0) + 1;
      return acc;
    }, {})
  ).map(([type, count]) => ({ type, count }));

  // BIRTH STATS
  const birthStats = Object.entries(
    dataset.reduce((acc: Record<string, number>, item) => {
      const decade = `${Math.floor(item.BirthYear / 10) * 10}s`;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    }, {})
  ).map(([decade, count]) => ({ decade, count }));

  return (
    <div className="space-y-10 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => setOpenModal(true)}>Tambah Data</Button>
      </div>

      <CreateUserModal open={openModal} onClose={() => setOpenModal(false)} />

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
