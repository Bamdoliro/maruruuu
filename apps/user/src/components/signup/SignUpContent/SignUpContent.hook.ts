import {
  useRequestUserVerificationMutation,
  useSignUpMutation,
  useVerificationMutation,
} from '@/services/user/mutations';
import { useSignUpStore } from '@/stores';
import type { SignUp } from '@/types/user/client';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { useToast } from '@/hooks';

export const useSignUpAction = (signUpData: SignUp, termsAgree: boolean) => {
  const { signUpMutate } = useSignUpMutation(signUpData);
  const { toast } = useToast();
  const handleSignUp = () => {
    if (signUpData.password === signUpData.password_confirm) {
      if (termsAgree) {
        signUpMutate();
      } else {
        toast('이용약관 동의를 해주세요.', 'ERROR');
      }
    } else {
      toast('비밀번호를 한번만 확인해주세요', 'ERROR');
    }
  };

  return { handleSignUp };
};

export const useVerificationCodeAction = (signUpData: SignUp) => {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isVerificationCodeDisabled, setIsVerificationCodeDisabled] = useState(false);
  const [isVerificationCodeConfirmed, setIsVerificationCodeConfirmed] = useState(false);
  const { toast } = useToast();
  const { requestVerificationMutate } = useRequestUserVerificationMutation({
    phoneNumber: signUpData.phoneNumber,
    type: 'SIGNUP',
  });
  const [signUp] = useSignUpStore();
  const { verificationMutate } = useVerificationMutation(setIsVerificationCodeConfirmed);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRequestVerificationCode = () => {
    if (signUp.phoneNumber.replace(/\D/g, '').length < 11) {
      toast('올바른 전화번호를 입력해주세요.', 'ERROR');
    } else {
      timerRef.current = setTimeout(() => {
        requestVerificationMutate();
        setIsVerificationCodeDisabled(false);
        setIsVerificationCodeDisabled(true);
        setIsVerificationCodeSent(true);
        setIsVerificationCodeConfirmed(false);
      }, 5000);
    }
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
      toast('인증번호를 입력해주세요.', 'ERROR');
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
    } else if (name === 'name') {
      const hangulOnly = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
      setSignUp((prev) => ({ ...prev, [name]: hangulOnly }));
    } else {
      setSignUp((prev) => ({ ...prev, [name]: value }));
    }
  };

  return { signUp, handleSignUpChange };
};
