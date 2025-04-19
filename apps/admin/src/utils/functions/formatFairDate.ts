import { formatFairRequestBody } from '@/utils/functions/getRequestBody';
import type { FairFormInput } from '@/utils/functions/getRequestBody';
import { useFairTypeStore, useFairFormStore } from '@/store/fair/fairType';
import formatDate from './formatDate';

const useFairForm = () => {
  const [form, setForm] = useFairTypeStore();
  const [type, setType] = useFairFormStore();

  const handleChange = (key: keyof FairFormInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getRequestBody = () => {
    const requestBody = formatFairRequestBody({
      start: form.start ?? '',
      capacity: Number(form.capacity),
      place: form.place,
      type: form.type,
      applicationStartDate: formatDate.toDashedDate(form.applicationStartDate ?? ''),
      applicationEndDate: formatDate.toDashedDate(form.applicationEndDate ?? ''),
    });

    return requestBody;
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

export default useFairForm;
