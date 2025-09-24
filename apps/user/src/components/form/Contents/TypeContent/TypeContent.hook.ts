import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormStore, useFormValueStore, useSetFormStepStore } from '@/stores';
import { useFormStep } from '@/utils';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    FormStep({
      nextStep: '성적입력',
    });
  };

  const handlePreviousStep = () => {
    setFormStep('출신학교및학력');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};

export const useRadio = () => {
  const [form, setForm] = useFormStore();

  const handleFormTypeChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    if (
      form.education.graduationType === 'QUALIFICATION_EXAMINATION' &&
      value === 'MEISTER_TALENT'
    ) {
      alert('서류상으로 검정고시 합격자는 마이스터 인재전형 지원이 불가능해요.');
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { handleFormTypeChange };
};
