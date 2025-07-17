import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  deleteUser,
  patchChangePassword,
  patchVerification,
  postRequestVerification,
  postSignUp,
} from './api';
import { ROUTES } from '@/constants/common/constants';
import { useApiError, useToast } from '@/hooks';
import type {
  patchChangePasswordReq,
  PatchUserVerificationReq,
  PostSignUpReq,
  PostUserVerificationReq,
} from '@/types/user/remote';
import type { Dispatch, SetStateAction } from 'react';

export const useWithdrawalMutation = (password: string) => {
  const router = useRouter();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: withdrawalMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteUser(password),
    onSuccess: () => {
      toast('회원탈퇴에 성공했습니다.', 'SUCCESS');
      window.location.reload();
      router.replace(ROUTES.MAIN);
    },
    onError: handleError,
  });

  return { withdrawalMutate, restMutation };
};

export const useSignUpMutation = ({ phoneNumber, name, password }: PostSignUpReq) => {
  const router = useRouter();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: signUpMutate, ...restMutation } = useMutation({
    mutationFn: () => postSignUp({ phoneNumber, name, password }),
    onSuccess: () => {
      toast('회원가입에 성공했습니다.', 'SUCCESS');
      router.replace(ROUTES.LOGIN);
    },
    onError: handleError,
  });

  return { signUpMutate, restMutation };
};

export const useChangePasswordMutation = ({
  phoneNumber,
  password,
}: patchChangePasswordReq) => {
  const router = useRouter();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: changePasswordMutate, ...restMutation } = useMutation({
    mutationFn: () => patchChangePassword({ phoneNumber, password }),
    onSuccess: () => {
      toast('비밀번호 변경에 성공했습니다.', 'SUCCESS');
      router.replace(ROUTES.MAIN);
    },
    onError: handleError,
  });

  return { changePasswordMutate, ...restMutation };
};

export const useRequestUserVerificationMutation = ({
  phoneNumber,
  type,
}: PostUserVerificationReq) => {
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: requestVerificationMutate, ...restMutation } = useMutation({
    mutationFn: () => postRequestVerification({ phoneNumber, type }),
    onSuccess: () => {
      toast('문자 전송에 성공했습니다.', 'SUCCESS');
    },
    onError: handleError,
  });

  return { requestVerificationMutate, restMutation };
};

export const useVerificationMutation = (
  setIsSuccessVerification: Dispatch<SetStateAction<boolean>>
) => {
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: verificationMutate, ...restMutation } = useMutation({
    mutationFn: ({ phoneNumber, type, code }: PatchUserVerificationReq) =>
      patchVerification({ phoneNumber, type, code }),
    onSuccess: () => {
      toast('인증에 성공했습니다.', 'SUCCESS');
      setIsSuccessVerification(true);
    },
    onError: handleError,
  });

  return { verificationMutate, restMutation };
};
