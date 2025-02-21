import { useFairApplicationQuery } from '@/services/fair/mutations';
import { FairApplication } from '@/types/fair/client';
import { ChangeEventHandler, useState } from 'react';

export const useCTAButton = (id: number, applicationData: FairApplication) => {
  const { postFairApplicationMutate } = useFairApplicationQuery(id, applicationData);

  const handleSendFairApplication = () => {
    postFairApplicationMutate();
  };

  return { handleSendFairApplication };
};

export const useInput = () => {
  const [application, setApplication] = useState<FairApplication>({
    schoolName: '',
    name: '',
    type: '',
    phoneNumber: '',
    headcount: 1,
    question: '',
  });

  const handleApplicationChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleApplicationTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  return { application, handleApplicationChange, handleApplicationTextAreaChange };
};

export const useAgree = (handleSendFairApplication: () => void) => {
  const [agree, setAgree] = useState<string | null>(null);

  const handleAgreeChange = (value: string) => {
    setAgree(value);
  };

  const handleButtonClick = () => {
    if (agree !== 'agree') {
      alert('개인정보 동의서를 동의해 주세요.');
      return;
    }

    handleSendFairApplication();
  };

  return { agree, handleAgreeChange, handleButtonClick };
};
