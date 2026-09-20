import {
  useRequestUserVerificationMutation,
  useSignUpMutation,
  useVerificationMutation,
} from '@/services/user/mutations';
import { signUpAtom } from '@/stores';
import { useAtom, useAtomValue } from 'jotai';
import type { SignUp } from '@/types/user/client';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { useToast } from '@maru/hooks';

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
      toast('비밀번호를 확인해주세요', 'ERROR');
    }
  };

  return { handleSignUp };
};

const RESEND_COOLDOWN_MS = 5000;

export const useVerificationCodeAction = (
  signUpData: SignUp,
  onRequestSuccess?: () => void,
) => {
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isResendCoolingDown, setIsResendCoolingDown] = useState(false);
  const [isVerificationCodeConfirmed, setIsVerificationCodeConfirmed] = useState(false);
  const { toast } = useToast();
  const { requestVerificationMutate, restMutation } = useRequestUserVerificationMutation({
    phoneNumber: signUpData.phoneNumber,
    type: 'SIGNUP',
  });
  const isRequestPending = restMutation.isPending;
  const signUp = useAtomValue(signUpAtom);
  const { verificationMutate, restMutation: confirmMutation } = useVerificationMutation(
    setIsVerificationCodeConfirmed,
  );

  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRequestVerificationCode = () => {
    if (isRequestPending || isResendCoolingDown) return;

    if (signUp.phoneNumber.replace(/\D/g, '').length < 11) {
      toast('올바른 전화번호를 입력해주세요.', 'ERROR');
      return;
    }

    requestVerificationMutate(undefined, {
      onSuccess: () => {
        setIsVerificationCodeSent(true);
        setIsVerificationCodeConfirmed(false);
        setIsResendCoolingDown(true);
        cooldownTimerRef.current = setTimeout(() => {
          setIsResendCoolingDown(false);
        }, RESEND_COOLDOWN_MS);
        onRequestSuccess?.();
      },
    });
  };

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const isVerificationCodeConfirmDisabled =
    confirmMutation.isPending || isVerificationCodeConfirmed;

  const handleVerificationCodeConfirm = () => {
    if (isVerificationCodeConfirmDisabled) return;

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
    isVerificationCodeDisabled: isRequestPending || isResendCoolingDown,
    isVerificationCodeConfirmDisabled,
    isVerificationCodeConfirmed,
    isVerificationCodeSent,
  };
};

export const useInput = () => {
  const [signUp, setSignUp] = useAtom(signUpAtom);
  const { toast } = useToast();
  const handleSignUpChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const numOnly = value.replace(/\D/g, '');
      if (numOnly.length > 11) {
        toast('전화번호는 11자리 숫자만 입력 가능합니다.', 'ERROR');
      }
      setSignUp((prev) => ({ ...prev, [name]: numOnly }));
    } else if (name === 'name') {
      const hangulOnly = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
      if (/[^ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
        toast('이름은 한글만 입력 가능합니다.', 'ERROR');
      }
      setSignUp((prev) => ({ ...prev, [name]: hangulOnly }));
    } else {
      setSignUp((prev) => ({ ...prev, [name]: value }));
    }
  };

  return { signUp, handleSignUpChange };
};
