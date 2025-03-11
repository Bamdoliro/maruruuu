import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteNotice, postNotice } from './api';
import { ROUTES } from '@/constants/common/constant';
import { PostNoticeReq } from '@/types/notice/remote';

export const usePostNoticeMutation = () => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: usePostNoticeMutate, ...restMutate } = useMutation({
    mutationFn: (params: PostNoticeReq) => postNotice(params),
    onSuccess: ({ data }) => {
      toast('공지사항이 게시되었습니다.', {
        type: 'success',
      });
      router.push(`${ROUTES.NOTICE}/${data.id}`);
    },
    onError: handleError,
  });

  return { usePostNoticeMutate, ...restMutate };
};

export const useDeleteNoticeMutation = (id: number) => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: deleteNoticeMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteNotice(id),
    onSuccess: () => {
      toast('공지사항이 삭제되었습니다.', {
        type: 'success',
      });
      router.push(ROUTES.NOTICE);
    },
    onError: handleError,
  });
  return { deleteNoticeMutate, ...restMutation };
};
