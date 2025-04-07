import { useEditSecondRoundResultMutation } from '@/services/form/mutations';
import { useFormListSortingTypeStore, useFormListTypeStore } from '@/store/form/formType';
import { useIsSecondRoundResultEditingStore } from '@/store/form/isSecondRoundResultEditing';
import { useSecondRoundResultValueStore } from '@/store/form/secondRoundResult';
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

export const useEditSecondRoundResultActions = () => {
  const [isSecondRoundResultEditing, setIsSecondRoundResultEditing] =
    useIsSecondRoundResultEditingStore();

  const setIsSecondRoundResultEditingTrue = () => setIsSecondRoundResultEditing(true);
  const setIsSecondRoundResultEditingFalse = () => {
    setIsSecondRoundResultEditing(false);
  };

  const secondRoundResult = useSecondRoundResultValueStore();
  const secondRoundResultData = {
    formList: Object.entries(secondRoundResult).map(([formId, passStatus]) => {
      return {
        formId: Number(formId),
        pass: passStatus === '미정' ? null : passStatus === '합격',
      };
    }),
  };
  const { editSecondRoundResult } =
    useEditSecondRoundResultMutation(secondRoundResultData);

  const handleSecondRoundResultEditCompleteButtonClick = () => {
    editSecondRoundResult();
  };

  return {
    isSecondRoundResultEditing,
    setIsSecondRoundResultEditingTrue,
    setIsSecondRoundResultEditingFalse,
    handleSecondRoundResultEditCompleteButtonClick,
  };
};
