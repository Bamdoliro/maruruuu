import { useSaveFormMutation } from '@/services/form/mutations';
import {
  formAtom,
  GEDSubjectListAtom,
  newGEDSubjectListAtom,
  formGradeStepAtom,
  formStepAtom,
  subjectListAtom,
} from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const subjectList = useAtomValue(subjectListAtom);
  const GEDSubjectList = useAtomValue(GEDSubjectListAtom);
  const newGEDSubjectList = useAtomValue(newGEDSubjectListAtom);

  const setFormStep = useSetAtom(formStepAtom);
  const setFormGradeStep = useSetAtom(formGradeStepAtom);

  const { saveFormMutate } = useSaveFormMutation();

  const [subjectError, setSubjectError] = useState<boolean[]>([]);

  const validateGEDSubjects = () => {
    if (newGEDSubjectList.some(({ subjectName }) => !subjectName)) {
      alert('추가한 선택과목의 과목명을 선택해주세요.');
      return false;
    }

    const hasEmptyScore = [...GEDSubjectList, ...newGEDSubjectList].some(
      ({ score }) => !Number(score),
    );

    if (hasEmptyScore) {
      alert('모든 과목의 점수를 입력해주세요.');
      return false;
    }

    return true;
  };

  const validateSubjects = () => {
    const type = form.education.graduationType === 'QUALIFICATION_EXAMINATION';

    if (type) {
      return validateGEDSubjects();
    }

    const subjectErrors = subjectList.map(
      (subject) =>
        subject.achievementLevel21 === '-' ||
        subject.achievementLevel22 === '-' ||
        subject.achievementLevel31 === '-',
    );

    setSubjectError(subjectErrors);

    const hasError = subjectErrors.some((error) => error);

    if (hasError) {
      alert('‘-‘을 미이수 또는 자신의 성취수준으로 입력해주세요');
    }

    return !hasError;
  };

  const handleNextStep = () => {
    if (validateSubjects()) {
      if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
        setFormGradeStep('봉사시간');
      } else {
        setFormGradeStep('출결상황');
      }
      saveFormMutate(form);
    }
  };

  const handlePreviousStep = () => {
    setFormStep('전형선택');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep, subjectError };
};
