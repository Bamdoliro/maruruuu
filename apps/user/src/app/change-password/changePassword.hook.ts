import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { useChangePasswordStore } from '@/stores/user/changePassword';
import {
  useChangePasswordMutation,
  useRequestUserVerificationMutation,
  useVerificationMutation,
} from '@/services/user/mutations';
import type { SignUp } from '@/types/user/client';

export const useInput = () => {
  const [changePassword, setChangePassword] = useChangePasswordStore();

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

export const useVerificationCodeAction = (changePasswordData: SignUp) => {
  const [isVerificationCodeDisabled, setIsVerificationCodeDisabled] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [isVerificationCodeConfirmed, setIsVerificationCodeConfirmed] = useState(false);

  const { verificationMutate } = useVerificationMutation(setIsVerificationCodeConfirmed);

  const { requestVerificationMutate } = useRequestUserVerificationMutation({
    phoneNumber: changePasswordData.phoneNumber,
    type: 'UPDATE_PASSWORD',
  });

  const handleRequestVerificationCode = () => {
    requestVerificationMutate();

    setIsVerificationCodeDisabled(true);
    setIsVerificationCodeSent(true);
    setIsVerificationCodeConfirmed(false);

    setTimeout(() => {
      setIsVerificationCodeDisabled(false);
    }, 5000);
  };

  const handleVerificationConfirm = () => {
    if (changePasswordData.code.length == 0) {
      alert('인증 코드를 입력해주세요');
      return;
    }

    verificationMutate({
      phoneNumber: changePasswordData.phoneNumber,
      type: changePasswordData.type,
      code: changePasswordData.code,
    });
  };

  return {
    isVerificationCodeDisabled,
    isVerificationCodeSent,
    isVerificationCodeConfirmed,
    handleRequestVerificationCode,
    handleVerificationConfirm,
  };
};

export const useChangePasswordAction = (changePasswordData: SignUp) => {
  const { changePasswordMutate } = useChangePasswordMutation(changePasswordData);

  const handleChangePassword = () => {
    if (changePasswordData.name.length == 0) {
      alert('이름을 입력해주세요');
      return;
    }
    if (changePasswordData.password != changePasswordData.password_confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    changePasswordMutate();
  };

  return { handleChangePassword };
};
