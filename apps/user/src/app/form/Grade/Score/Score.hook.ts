import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useFormValueStore,
  useNewSubjectListValueStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
  useSubjectListValueStore,
} from '@/stores';
import { useState } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const subjectList = useSubjectListValueStore();
  const newSubjectList = useNewSubjectListValueStore();

  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();

  const { saveFormMutate } = useSaveFormMutation();

  const [subjectError, setSubjectError] = useState<boolean[]>([]);
  const [newSubjectError, setNewSubjectError] = useState<boolean[]>([]);

  const validateSubjects = () => {
    const type = form.education.graduationType === 'QUALIFICATION_EXAMINATION';

    if (type) {
      return true;
    }

    const subjectErrors = subjectList.map(
      (subject) =>
        subject.achievementLevel21 === '-' ||
        subject.achievementLevel22 === '-' ||
        subject.achievementLevel31 === '-'
    );

    const newSubjectErrors = newSubjectList.map(
      (subject) =>
        subject.achievementLevel21 === '-' ||
        subject.achievementLevel22 === '-' ||
        subject.achievementLevel31 === '-'
    );

    setSubjectError(subjectErrors);
    setNewSubjectError(newSubjectErrors);

    const hasError =
      subjectErrors.some((error) => error) || newSubjectErrors.some((error) => error);

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
    if (validateSubjects()) {
      setFormStep('전형선택');
      saveFormMutate(form);
    }
  };

  return { handleNextStep, handlePreviousStep, subjectError, newSubjectError };
};
