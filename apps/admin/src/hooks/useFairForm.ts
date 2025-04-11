import { useState } from 'react';

const useFairForm = () => {
  const [form, setForm] = useState({
    place: '',
    date: '',
    time: '',
    capacity: 120,
    startDate: '',
    endDate: '',
    type: 'STUDENT_AND_PARENT',
  });

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const getRequestBody = () => {
    const formatDate = (raw: string) =>
      `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;

    return {
      start: `${formatDate(form.date)}T${form.time.slice(0, 2)}:${form.time.slice(
        2,
        4
      )}:00`,
      capacity: form.capacity,
      place: form.place,
      type: form.type,
      applicationStartDate: formatDate(form.startDate),
      applicationEndDate: formatDate(form.endDate),
    };
  };

  return {
    form,
    handleChange,
    getRequestBody,
  };
};

export default useFairForm;
