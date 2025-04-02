import { ROUTES } from '@/constants/common/constants';
import { useWithdrawalMutation } from '@/services/user/mutations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useWithdrawalAction = (password: string) => {
  const { withdrawalMutate } = useWithdrawalMutation(password);

  const handleWithrawal = () => {
    withdrawalMutate();
  };

  return { handleWithrawal };
};

export const useCTAButton = () => {
  const router = useRouter();

  const handleMoveMain = () => {
    router.push(ROUTES.MAIN);
  };

  return { handleMoveMain };
};

export const useInput = () => {
  const [withdrawal, setWithdrawal] = useState({
    password: '',
  });

  const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setWithdrawal({ ...withdrawal, [name]: value });
  };

  return { withdrawal, handleLoginChange };
};
