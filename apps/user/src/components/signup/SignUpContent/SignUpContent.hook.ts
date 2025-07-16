import {
  useRequestUserVerificationMutation,
  useSignUpMutation,
  useVerificationMutation,
} from '@/services/user/mutations';
import { useSignUpStore } from '@/stores';
import type { SignUp } from '@/types/user/client';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useSignUpAction = (signUpData: SignUp, termsAgree: boolean) => {
  const { signUpMutate } = useSignUpMutation(signUpData);

  const handleSignUp = () => {
    if (signUpData.password === signUpData.password_confirm) {
      if (termsAgree) {
        signUpMutate();
      } else {
        alert('이용약관 동의를 해주세요.');
      }
    } else {
      alert('비밀번호를 한번만 확인해주세요');
    }
  };

  return { handleSignUp };
};

export const useVerificationCodeAction = (signUpData: SignUp) => {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isVerificationCodeDisabled, setIsVerificationCodeDisabled] = useState(false);
  const [isVerificationCodeConfirmed, setIsVerificationCodeConfirmed] = useState(false);

  const { requestVerificationMutate } = useRequestUserVerificationMutation({
    phoneNumber: signUpData.phoneNumber,
    type: 'SIGNUP',
  });
  const { verificationMutate } = useVerificationMutation(setIsVerificationCodeConfirmed);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRequestVerificationCode = () => {
    requestVerificationMutate();
    setIsVerificationCodeDisabled(true);
    setIsVerificationCodeSent(true);
    setIsVerificationCodeConfirmed(false);

    timerRef.current = setTimeout(() => {
      setIsVerificationCodeDisabled(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleVerificationCodeConfirm = () => {
    if (!signUpData.code) {
      // toast('인증번호를 입력해주세요', { type: 'error' });
      return;
    }

    verificationMutate({
      phoneNumber: signUpData.phoneNumber,
      type: 'SIGNUP',
      code: signUpData.code,
    });
  };

  return {
    handleRequestVerificationCode,
    handleVerificationCodeConfirm,
    isVerificationCodeDisabled,
    isVerificationCodeConfirmed,
    isVerificationCodeSent,
  };
};

export const useInput = () => {
  const [signUp, setSignUp] = useSignUpStore();

  const handleSignUpChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const numOnly = value.replace(/\D/g, '');
      setSignUp((prev) => ({ ...prev, [name]: numOnly }));
    } else {
      setSignUp((prev) => ({ ...prev, [name]: value }));
    }
  };

  return { signUp, handleSignUpChange };
};
