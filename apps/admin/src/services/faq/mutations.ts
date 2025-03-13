import { useApiError } from '@/hooks';
import { useRouter } from 'next/router';
import { postFaq } from './api';
import { PostFaqReq } from '@/types/faq/remote';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constant';

export const usePostFaqMutation = () => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: postFaqMutate, ...restMutation } = useMutation({
    mutationFn: (params: PostFaqReq) => postFaq(params),
    onSuccess: ({ data }) => {
      toast('게시물이 게시되었습니다.', {
        type: 'success',
      });
      router.push(`${ROUTES.FAQ}/${data.id}`);
    },
    onError: handleError,
  });

  return { postFaqMutate, ...restMutation };
};
