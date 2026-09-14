import { ROUTES } from '@/constants/common/constants';
import { getUser } from '@/services/user/api';
import { useLoginMutation } from '@/services/auth/mutations';
import type { PostLoginReq } from '@/types/auth/remote';
import { useAuthState } from '@maru/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useSessionVerification = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthState();
  const [isVerified, setIsVerified] = useState(false);

  const initialIsLoggedIn = useRef(isLoggedIn);
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!initialIsLoggedIn.current || hasRequested.current) return;
    hasRequested.current = true;

    getUser()
      .then(() => setIsVerified(true))
      .catch(() => setIsLoggedIn(false));
  }, [setIsLoggedIn]);

  return { isSessionAlive: initialIsLoggedIn.current && isVerified };
};

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
