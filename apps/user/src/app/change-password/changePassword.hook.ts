import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { useChangePasswordStore } from '@/stores/user/changePassword';
import { useRequestUserVerificationMutation } from '@/services/user/mutations';
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
    setIsVerificationCodeConfirmed(true);
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
  const handleChangePassword = () => {
    if (changePasswordData.password == changePasswordData.password_confirm) {
      console.log(changePasswordData);
    } else {
      alert('비밀번호가 다릅니다');
    }
  };

  return { handleChangePassword };
};
