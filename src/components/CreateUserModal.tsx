'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/lib/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateUserModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    Name: '',
    Age: '',
    gender: '',
    Email: '',
    Number: '',
    No_Telp: '',
    Location_Type: '',
    Digital_Interest: '',
    Name_of_Location: '',
    Date: '',
    Login_Hour: '',
    Brand_Device: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setForm({
      ...form,
      Date: date?.toISOString().split('T')[0] || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/higo', {
        ...form,
        Age: parseInt(form.Age),
        Number: parseInt(form.Number),
      });
      toast.success('Data berhasil ditambahkan');
      onClose(); // Tutup modal
    } catch (error) {
      console.error(error);
      toast.error('Gagal menambahkan data');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tambah Data</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.entries(form).map(([key, value]) => {
            if (key === 'gender') {
              return (
                <div key={key} className="flex flex-col">
                  <label className="font-medium mb-1" htmlFor={key}>
                    Gender
                  </label>
                  <select
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Pilih Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              );
            }

            if (key === 'Date') {
              return (
                <div key={key} className="flex flex-col">
                  <label className="font-medium mb-1" htmlFor={key}>
                    Date
                  </label>
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="border rounded-md px-3 py-2"
                    placeholderText="Pilih tanggal"
                    wrapperClassName="w-full"
                    required
                  />
                </div>
              );
            }

            if (key === 'Login_Hour') {
              return (
                <div key={key} className="flex flex-col">
                  <label className="font-medium mb-1" htmlFor={key}>
                    Login Hour
                  </label>
                  <Input
                    id={key}
                    name={key}
                    type="time"
                    value={value}
                    onChange={handleChange}
                    required
                  />
                </div>
              );
            }

            return (
              <div key={key} className="flex flex-col">
                <label className="font-medium mb-1" htmlFor={key}>
                  {key.replace(/_/g, ' ')}
                </label>
                <Input
                  id={key}
                  name={key}
                  type={key === 'Age' || key === 'Number' ? 'number' : 'text'}
                  value={value}
                  onChange={handleChange}
                  required={key !== 'No_Telp'}
                />
              </div>
            );
          })}

          <div className="md:col-span-2 mt-4">
            <Button type="submit" className="w-full">
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
