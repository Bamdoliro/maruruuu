import {
  useEditSecondRoundResultMutation,
  usePrintFormUrlMutation,
} from '@/services/form/mutations';
import {
  useExportAllAddmissionTicket,
  useExportFirstScoreExcel,
} from '@/services/form/queries';
import {
  useFormToPrintValueStore,
  useSetFormToPrintStore,
} from '@/store/form/formToPrint';
import { useFormListSortingTypeStore, useFormListTypeStore } from '@/store/form/formType';
import { useIsFormToPrintSelectingStore } from '@/store/form/isFormToPrintSelecting';
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

export const usePrintFormURLActions = () => {
  const [isFormToPrintSelecting, setIsFormToPrintSelecting] =
    useIsFormToPrintSelectingStore();
  const setFormToPrint = useSetFormToPrintStore();

  const setIsFormToPrintSelectingTrue = () => {
    setIsFormToPrintSelecting(true);
  };
  const setIsFormToPrintSelectingFalse = () => {
    setIsFormToPrintSelecting(false);
    setFormToPrint({});
  };

  const formToPrint = useFormToPrintValueStore();
  const formIdList = Object.entries(formToPrint).reduce(
    (acc: number[], [formId, isSelected]) =>
      isSelected ? [...acc, Number(formId)] : acc,
    []
  );
  const { printFormUrl } = usePrintFormUrlMutation();
  const handlePrintFormUrlButtonClick = () => {
    const check = window.open('');
    check?.close();
    printFormUrl(formIdList);
  };

  return {
    isFormToPrintSelecting,
    setIsFormToPrintSelectingTrue,
    setIsFormToPrintSelectingFalse,
    handlePrintFormUrlButtonClick,
  };
};

export const useExportAllAddmissionTicketAction = () => {
  const { data: exportTicketData } = useExportAllAddmissionTicket();

  const handleExportAllAdmissionTicketButtonClick = () => {
    if (!exportTicketData) return;
    const ticketURL = window.URL.createObjectURL(new Blob([exportTicketData]));

    const link = document.createElement('a');
    link.href = ticketURL;
    link.download = '전체 접수증.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(ticketURL);
  };

  return { handleExportAllAdmissionTicketButtonClick };
};

export const useExportFirstScoreAction = () => {
  const { data: exportFirstScoreData } = useExportFirstScoreExcel();

  const handleExportFirstScoreButtonClick = () => {
    if (!exportFirstScoreData) return;
    const scoreURL = window.URL.createObjectURL(new Blob([exportFirstScoreData]));

    const link = document.createElement('a');
    link.href = scoreURL;
    link.download = '1차 점수.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(scoreURL);
  };
  return { handleExportFirstScoreButtonClick };
};
