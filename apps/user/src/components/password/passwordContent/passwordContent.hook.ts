import type { ChangeEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import { changePasswordAtom } from '@/stores';
import { useAtom } from 'jotai';
import {
  useChangePasswordMutation,
  useRequestUserVerificationMutation,
  useVerificationMutation,
} from '@/services/user/mutations';
import type { SignUp } from '@/types/user/client';
import { useToast } from '@maru/hooks';

export const useInput = () => {
  const [changePassword, setChangePassword] = useAtom(changePasswordAtom);

  const handleChangePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      const numOnly = value.replace(/\D/g, '');
      setChangePassword((prev) => ({ ...prev, [name]: numOnly }));
    } else {
      setChangePassword((prev) => ({ ...prev, [name]: value }));
    }
  };

  return { changePassword, handleChangePasswordChange };
};

const RESEND_COOLDOWN_MS = 5000;

export const useVerificationCodeAction = (
  changePasswordData: SignUp,
  onRequestSuccess?: () => void,
) => {
  const [isResendCoolingDown, setIsResendCoolingDown] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isVerificationCodeConfirmed, setIsVerificationCodeConfirmed] = useState(false);
  const { verificationMutate, restMutation: confirmMutation } = useVerificationMutation(
    setIsVerificationCodeConfirmed,
  );
  const { toast } = useToast();

  const { requestVerificationMutate, restMutation } = useRequestUserVerificationMutation({
    phoneNumber: changePasswordData.phoneNumber,
    type: 'UPDATE_PASSWORD',
  });
  const isRequestPending = restMutation.isPending;

  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleRequestVerificationCode = () => {
    if (isRequestPending || isResendCoolingDown) return;

    if (changePasswordData.phoneNumber.replace(/\D/g, '').length < 11) {
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

  const handleVerificationConfirm = () => {
    if (isVerificationCodeConfirmDisabled) return;

    if (changePasswordData.code.trim().length === 0) {
      toast('인증 코드를 입력해주세요', 'ERROR');
      return;
    }

    verificationMutate({
      phoneNumber: changePasswordData.phoneNumber,
      type: changePasswordData.type,
      code: changePasswordData.code,
    });
  };

  return {
    isVerificationCodeDisabled: isRequestPending || isResendCoolingDown,
    isVerificationCodeConfirmDisabled,
    isVerificationCodeSent,
    isVerificationCodeConfirmed,
    handleRequestVerificationCode,
    handleVerificationConfirm,
  };
};

export const useChangePasswordAction = (changePasswordData: SignUp) => {
  const { changePasswordMutate } = useChangePasswordMutation(changePasswordData);

  const handleChangePassword = () => {
    if (changePasswordData.password != changePasswordData.password_confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    changePasswordMutate();
  };

  return { handleChangePassword };
};
