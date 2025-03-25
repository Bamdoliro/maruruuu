import { useFormListSortingTypeStore, useFormListTypeStore } from '@/store/form/formType';
import { FormListSortingType } from '@/types/form/client';

export const useFormPageState = () => {
  const [formListType, setFormListType] = useFormListTypeStore();
  const [formListSortingType, setFormListSortingType] = useFormListSortingTypeStore();

  const handleCriteriaChange = (value: string, key: string) => {
    setFormListType('정렬');
    if (value === 'RESET') {
      setFormListSortingType((prev) => ({ ...prev, [key]: null }));
    } else {
      setFormListSortingType((prev) => ({ ...prev, [key]: value }));
    }
  };

  const getCriteriaDropdownValue = (
    key: keyof FormListSortingType,
    category: Record<string, string>
  ) => {
    const value = formListSortingType[key];
    return value ? category[value] : undefined;
  };

  return {
    handleCriteriaChange,
    getCriteriaDropdownValue,
  };
};
