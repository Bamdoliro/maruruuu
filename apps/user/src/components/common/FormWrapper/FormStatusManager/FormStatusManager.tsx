import { useFormStatusQuery } from '@/services/form/queries';
import { useSetFormStepStore } from '@/stores';
import { useEffect } from 'react';

const FormStatusManager = () => {
  const { data: formStatusData } = useFormStatusQuery();
  const setFormStep = useSetFormStepStore();

  useEffect(() => {
    if (formStatusData) {
      const { status } = formStatusData;

      if (status === 'SUBMITTED') setFormStep('초안제출완료');
      else if (
        status === 'RECEIVED' ||
        status === 'APPROVED' ||
        status === 'FINAL_SUBMITTED'
      )
        setFormStep('최종제출완료');
      else if (status === 'REJECTED') setFormStep('지원자정보');
    }
  }, [formStatusData, setFormStep]);

  return null;
};

export default FormStatusManager;
