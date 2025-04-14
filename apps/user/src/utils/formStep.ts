import type { z } from 'zod';
import type { FormStep } from '@/types/form/client';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetCorrectStore, useSetFormStepStore } from '@/stores';

type StepAdvanceParams = {
  schema?: z.ZodTypeAny;
  formData?: unknown;
  nextStep?: FormStep;
  setErrors?: (errors: Record<string, string[]>) => void;
};

const useFormStep = () => {
  const { saveFormMutate } = useSaveFormMutation();
  const setFormStep = useSetFormStepStore();
  const setCorrect = useSetCorrectStore();
  const form = useFormValueStore();

  const run = ({ schema, formData, nextStep, setErrors }: StepAdvanceParams) => {
    schema?.parse(formData);
    if (setErrors !== undefined) {
      setErrors({});
    }
    if (nextStep !== undefined) {
      setFormStep(nextStep);
    }
    saveFormMutate(form);
    setCorrect(false);
  };

  return { run };
};

export default useFormStep;
