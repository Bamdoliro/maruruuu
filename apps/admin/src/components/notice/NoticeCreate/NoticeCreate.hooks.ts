import {
  usePostNoticeMutation,
  useNoticeFileUrlMutation,
} from '@/services/notice/mutations';
import { useNoticeFileStore } from '@/store/notice/noticeFile';
import type { PostNoticeReq } from '@/types/notice/remote';

export const useNoticeCreateAction = (noticeData: PostNoticeReq) => {
  const { postNoticeMutate } = usePostNoticeMutation();
  const { noticeFileUrlMutate } = useNoticeFileUrlMutation();
  const [fileData, setFileData] = useNoticeFileStore();

  const handleNoticeCreateButtonClick = async () => {
    const fileNameList = noticeData.fileNameList ?? [];

    if (fileData?.length) {
      await noticeFileUrlMutate(fileData);
    }

    postNoticeMutate(
      { ...noticeData, fileNameList },
      { onSuccess: () => setFileData([]) }
    );
  };

  return { handleNoticeCreateButtonClick };
};
