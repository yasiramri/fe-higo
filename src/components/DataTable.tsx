'use client';

import { useMemo, useState } from 'react';
import { HigoData } from '@/types/higo';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DataTable({ data }: { data: HigoData[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  function formatHour(hour?: string): string {
    if (!hour || typeof hour !== 'string' || !hour.includes(':')) {
      return 'Unknown';
    }
    const [h, m] = hour.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const formattedHour = (h % 12 || 12).toString().padStart(2, '0');
    const formattedMinute = m.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute} ${period}`;
  }

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return data.filter((item) =>
      [item.Name, item.Email, item.gender, item.Digital_Interest].some(
        (field) => field.toLowerCase().includes(term)
      )
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="border rounded-md p-4 space-y-4">
      <Input
        type="text"
        placeholder="Cari nama, email, gender, minat..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full md:w-1/3"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Umur</TableHead>
            <TableHead>Tahun Lahir</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>No Telp</TableHead>
            <TableHead>Minat Digital</TableHead>
            <TableHead>Login per Jam</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.Name}</TableCell>
              <TableCell>{item.Age}</TableCell>
              <TableCell>{item.BirthYear}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.Email}</TableCell>
              <TableCell>{item.No_Telp}</TableCell>
              <TableCell>{item.Digital_Interest}</TableCell>
              <TableCell>{formatHour(item.Login_Hour)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredData.length === 0 && (
        <p className="text-center text-gray-500">Tidak ada data yang cocok.</p>
      )}

      {/* Numbered Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-4 flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
