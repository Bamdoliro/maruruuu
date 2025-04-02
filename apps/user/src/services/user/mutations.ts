import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  deleteUser,
  patchVerification,
  postRequestVerification,
  postSignUp,
} from './api';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constants';
import { useApiError } from '@/hooks';
import type {
  PatchUserVerificationReq,
  PostSignUpReq,
  PostUserVerificationReq,
} from '@/types/user/remote';
import type { Dispatch, SetStateAction } from 'react';

export const useWithdrawalMutation = (password: string) => {
  const router = useRouter();
  const { handleError } = useApiError();

  const { mutate: withdrawalMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteUser(password),
    onSuccess: () => {
      toast('회원탈퇴가 성공되었습니다.', { type: 'success' });
      localStorage.clear();
      router.replace(ROUTES.MAIN);
    },
    onError: handleError,
  });

  return { withdrawalMutate, restMutation };
};

export const useSignUpMutation = ({ phoneNumber, name, password }: PostSignUpReq) => {
  const router = useRouter();
  const { handleError } = useApiError();

  const { mutate: signUpMutate, ...restMutation } = useMutation({
    mutationFn: () => postSignUp({ phoneNumber, name, password }),
    onSuccess: () => {
      toast('회원가입 성공', { type: 'success' });
      router.replace(ROUTES.LOGIN);
    },
    onError: handleError,
  });

  return { signUpMutate, restMutation };
};

export const useRequestUserVerificationMutation = ({
  phoneNumber,
  type,
}: PostUserVerificationReq) => {
  const { handleError } = useApiError();

  const { mutate: requestVerificationMutate, ...restMutation } = useMutation({
    mutationFn: () => postRequestVerification({ phoneNumber, type }),
    onSuccess: () => {
      toast('인증번호 전송 성공', { type: 'success' });
    },
    onError: handleError,
  });

  return { requestVerificationMutate, restMutation };
};

export const useVerificationMutation = (
  setIsSuccessVerification: Dispatch<SetStateAction<boolean>>
) => {
  const { handleError } = useApiError();

  const { mutate: verificationMutate, ...restMutation } = useMutation({
    mutationFn: ({ phoneNumber, type, code }: PatchUserVerificationReq) =>
      patchVerification({ phoneNumber, type, code }),
    onSuccess: () => {
      toast('인증 성공', { type: 'success' });
      setIsSuccessVerification(true);
    },
    onError: handleError,
  });

  return { verificationMutate, restMutation };
};
