import { useFormListSortingTypeStore, useFormListTypeStore } from '@/store/form/formType';
import type { FormListSortingType } from '@/types/form/client';

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

  const handleFormListTypeAll = () => setFormListType('모두 보기');
  const handleFormListTypeReview = () => setFormListType('검토해야 하는 원서 모아보기');

  const getCriteriaDropdownValue = (
    key: keyof FormListSortingType,
    category: Record<string, string>
  ) => {
    const value = formListSortingType[key];
    return value ? category[value] : undefined;
  };

  return {
    formListType,
    handleCriteriaChange,
    handleFormListTypeReview,
    handleFormListTypeAll,
    getCriteriaDropdownValue,
  };
};
