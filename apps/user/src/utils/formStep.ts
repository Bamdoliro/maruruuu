import type { z } from 'zod';
import type { FormStep } from '@/types/form/client';
import { useSaveFormMutation } from '@/services/form/mutations';
import { formAtom, correctAtom, formStepAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';

type StepAdvanceParams = {
  schema?: z.ZodTypeAny;
  formData?: unknown;
  nextStep?: FormStep;
  setErrors?: (errors: Record<string, string[]>) => void;
};

const useFormStep = () => {
  const { saveFormMutate } = useSaveFormMutation();
  const setFormStep = useSetAtom(formStepAtom);
  const setCorrect = useSetAtom(correctAtom);
  const form = useAtomValue(formAtom);

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
