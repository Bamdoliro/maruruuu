import { ROUTES } from '@/constants/common/constants';
import { useLoginMutation } from '@/services/auth/mutations';
import type { PostLoginReq } from '@/types/auth/remote';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useLoginAction = (loginData: PostLoginReq) => {
  const { loginMutate } = useLoginMutation('COMPUTER', loginData);

  const handleLogin = () => {
    loginMutate();
  };

  return { handleLogin };
};

export const useInput = () => {
  const [login, setLogin] = useState<PostLoginReq>({
    phoneNumber: '',
    password: '',
  });

  const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return { login, handleLoginChange };
};

export const useCTAButton = () => {
  const router = useRouter();

  const handleMoveMainPage = () => {
    router.push(ROUTES.MAIN);
  };

  return { handleMoveMainPage };
};

export const useKeyDown = (login: () => void) => {
  useEffect(() => {
    const handleEnterKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        login();
      }
    };

    document.addEventListener('keydown', handleEnterKeyPress);

    return () => {
      document.removeEventListener('keydown', handleEnterKeyPress);
    };
  }, [login]);
};
