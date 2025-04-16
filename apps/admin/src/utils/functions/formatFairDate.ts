import { formatFairRequestBody } from '@/utils/functions/getRequestBody';
import type { FairFormInput } from '@/utils/functions/getRequestBody';
import { useRecoilState } from 'recoil';
import { fairFormAtom, fairTypeAtom } from '@/store/fair/fairType';
import formatDate from './formatDate';

const useFairForm = () => {
  const [form, setForm] = useRecoilState(fairFormAtom);
  const [type, setType] = useRecoilState(fairTypeAtom);

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
      type: type,
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
