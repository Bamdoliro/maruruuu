import {
  useNoticeFileUrlMutation,
  usePutNoticeMutation,
} from '@/services/notice/mutations';
import { useNoticeFileStore } from '@/store/notice/noticeFile';
import type { PutNoticeReq } from '@/types/notice/remote';

export const useNoticeEditAction = (id: number, noticeData: PutNoticeReq) => {
  const { putNoticeMutate } = usePutNoticeMutation(id);
  const { noticeFileUrlMutate } = useNoticeFileUrlMutation();
  const [fileData, setFileData] = useNoticeFileStore();

  const handleNoticeEditButtonClick = async () => {
    const fileNameList = noticeData.fileNameList ?? [];

    if (fileData?.length) {
      await noticeFileUrlMutate(fileData);
    }

    putNoticeMutate(
      { ...noticeData, fileNameList },
      { onSuccess: () => setFileData([]) }
    );
  };

  return { handleNoticeEditButtonClick };
};
