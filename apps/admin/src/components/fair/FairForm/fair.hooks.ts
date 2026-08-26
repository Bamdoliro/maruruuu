import { fairFormAtom } from '@/store';
import { useAtom } from 'jotai';
import { useCreateFairMutation } from '@/services/fair/mutations';
import type { FairType } from '@/types/fair/client';
import convertToApiDateFormat from '@/utils/functions/convertToApiDateFormat';
import convertToApiDateTimeFormat from '@/utils/functions/convertToApiDateTimeFormat';

export interface FairFormInput {
  start: string;
  place: string;
  capacity: number;
  type: FairType;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
}

const extractDigits = (value: string) => value.replace(/\D/g, '');

export const formatDateInput = (value: string) => {
  const digits = extractDigits(value).slice(0, 8);

  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;

  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
};

export const formatTimeInput = (value: string) => {
  const digits = extractDigits(value).slice(0, 4);

  if (digits.length <= 2) return digits;

  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
};

export const useFairForm = () => {
  const createFairMutation = useCreateFairMutation();
  const [form, setForm] = useAtom(fairFormAtom);
  const handleChange = <K extends keyof FairFormInput>(
    key: K,
    value: FairFormInput[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'applicationStartDate' || name === 'applicationEndDate') {
      handleChange(name, extractDigits(value).slice(0, 8));
      return;
    }

    handleChange(name as keyof FairFormInput, value);
  };

  const handleDateChange = (value: string) => {
    const date = extractDigits(value).slice(0, 8);
    const time = extractDigits(form.start).slice(8, 12);
    const newStart = date + time;

    setForm((prev) => ({ ...prev, start: newStart }));
  };

  const handleTimeChange = (value: string) => {
    const date = extractDigits(form.start).slice(0, 8);
    const time = extractDigits(value).slice(0, 4);
    const newStart = date + time;

    setForm((prev) => ({ ...prev, start: newStart }));
  };

  const handleSubmit = () => {
    const body = formatFairRequestBody(form);
    createFairMutation.mutate(body);
  };

  return {
    form,
    handleChange,
    handleInputChange,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
  };
};

export const formatFairRequestBody = ({
  start,
  type,
  place,
  capacity,
  applicationStartDate,
  applicationEndDate,
}: FairFormInput) => {
  return {
    start: convertToApiDateTimeFormat(start),
    capacity: Number(capacity),
    place,
    type,
    applicationStartDate: convertToApiDateFormat(applicationStartDate),
    applicationEndDate: convertToApiDateFormat(applicationEndDate),
  };
};

export type FairApiRequestBody = ReturnType<typeof formatFairRequestBody>;
