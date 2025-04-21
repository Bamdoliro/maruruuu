import { useFairFormStore } from '@/store/fair/fairType';
import { useCreateFairMutation } from '@/services/fair/mutations';
//import { formatFairRequestBody } from '@/utils/functions/getRequestBody';
//import type { FairFormInput } from '@/utils/functions/getRequestBody';
import { FairType } from '@/types/fair/client';
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

export const useFairForm = () => {
  const createFairMutation = useCreateFairMutation();
  const [form, setForm] = useFairFormStore();
  const handleChange = <K extends keyof FairFormInput>(
    key: K,
    value: FairFormInput[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof FairFormInput, value);
  };

  const handleDateChange = (value: string) => {
    const newStart = value + form.start.slice(8);
    setForm((prev) => ({ ...prev, start: newStart }));
  };

  const handleTimeChange = (value: string) => {
    const newStart = form.start.slice(0, 8) + value;
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
