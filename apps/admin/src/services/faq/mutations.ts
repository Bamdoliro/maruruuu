import { useApiError } from '@/hooks';
import { useRouter } from 'next/navigation';
import { deleteFaq, postFaq, putFaq } from './api';
import { PostFaqReq, PutFaqReq } from '@/types/faq/remote';
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

export const usePutFaqMutation = (id: number) => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: putFaqMutate, ...restMutation } = useMutation({
    mutationFn: (params: PutFaqReq) => putFaq(id, params),
    onSuccess: () => {
      toast('게시물이 수정되었습니다.', {
        type: 'success',
      });
      router.push(`${ROUTES.FAQ}/${id}`);
    },
    onError: handleError,
  });

  return { putFaqMutate, ...restMutation };
};

export const useDeleteFaqMutation = (id: number) => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: deleteFaqMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteFaq(id),
    onSuccess: () => {
      toast('게시물이 삭제되었습니다.', {
        type: 'success',
      });
      router.push(ROUTES.FAQ);
    },
    onError: handleError,
  });
  return { deleteFaqMutate, ...restMutation };
};
