import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  deleteNotice,
  postNotice,
  postNoticeFile,
  putNotice,
  putNoticeFileUrl,
} from './api';
import { ROUTES } from '@/constants/common/constant';
import { PostNoticeReq, PutNoticeReq } from '@/types/notice/remote';

export const usePostNoticeMutation = () => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: postNoticeMutate, ...restMutation } = useMutation({
    mutationFn: (params: PostNoticeReq) => postNotice(params),
    onSuccess: ({ data }) => {
      toast('공지사항이 게시되었습니다.', {
        type: 'success',
      });
      router.push(`${ROUTES.NOTICE}/${data.id}`);
    },
    onError: handleError,
  });

  return { postNoticeMutate, ...restMutation };
};

export const usePutNoticeMutation = (id: number) => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: putNoticeMutate, ...restMutation } = useMutation({
    mutationFn: (params: PutNoticeReq) => putNotice(id, params),
    onSuccess: () => {
      toast('공지사항이 수정되었습니다.', {
        type: 'success',
      });
      router.push(`${ROUTES.NOTICE}/${id}`);
    },
    onError: handleError,
  });

  return { putNoticeMutate, ...restMutation };
};

export const useNoticeFileUrlMutation = () => {
  const { handleError } = useApiError();

  const { mutate: noticeFileUrlMutate, ...restMutation } = useMutation({
    mutationFn: async (files: File[]) => {
      if (files?.length) {
        const fileDataList = files.map(({ name, type, size }) => ({
          fileName: name,
          mediaType: type,
          fileSize: size,
        }));

        const responseList = await postNoticeFile(fileDataList);
        const data = await putNoticeFileUrl(files, responseList);

        return data;
      }
    },
    onSuccess: () => {
      toast('파일이 업로드되었습니다.', {
        type: 'success',
      });
    },
    onError: handleError,
  });

  return { noticeFileUrlMutate, ...restMutation };
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
