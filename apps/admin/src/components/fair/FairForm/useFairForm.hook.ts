import { formatFairRequestBody } from '@/utils/functions/getRequestBody';
import type { FairFormInput } from '@/utils/functions/getRequestBody';
import { useRecoilState } from 'recoil';
import { fairFormAtom, fairTypeAtom } from '@/store/fair/fairType';

export const useFairForm = () => {
  const handleChange = (key: keyof FairFormInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [form, setForm] = useRecoilState(fairFormAtom);
  const [type, setType] = useRecoilState(fairTypeAtom);

  const getRequestBody = () => {
    return formatFairRequestBody({
      start: form.start,
      place: form.place,
      capacity: form.capacity,
      type: type,
      date: form.date,
      time: form.time,
      applicationStartDate: form.applicationStartDate,
      applicationEndDate: form.applicationEndDate,
    });
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
