import { useState } from 'react';
import { formatFairRequestBody } from '@/utils/functions/getRequestBody';
import type { FairFormInput } from '@/utils/functions/getRequestBody';
import type { FairType } from '@/types/fair/client';

export const useFairForm = () => {
  const handleChange = (key: keyof Omit<FairFormInput, 'type'>, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [form, setForm] = useState<Omit<FairFormInput, 'type'>>({
    date: '',
    time: '',
    capacity: '',
    place: '',
    startDate: '',
    endDate: '',
  });

  const [type, setType] = useState<FairType>('STUDENT_AND_PARENT');

  const getRequestBody = () => {
    return formatFairRequestBody({ ...form, type });
  };

  return {
    form,
    setForm,
    type,
    setType,
    handleChange,
    getRequestBody,
  };
};
