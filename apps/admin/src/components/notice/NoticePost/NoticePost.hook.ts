import {
  usePostNoticeMutation,
  useNoticeFileUrlMutation,
} from '@/services/notice/mutations';
import { useNoticeFileStore } from '@/store/notice/noticeFile';
import type { PostNoticeReq } from '@/types/notice/remote';

export const useNoticePostAction = (noticeData: PostNoticeReq) => {
  const { postNoticeMutate } = usePostNoticeMutation();
  const { noticeFileUrlMutate } = useNoticeFileUrlMutation();
  const [fileData, setFileData] = useNoticeFileStore();

  const handleNoticePostButtonClick = async () => {
    const fileNameList = noticeData.fileNameList ?? [];

    if (fileData?.length) {
      const fileInfoList = fileData.map(({ name, type, size }) => ({
        fileName: name,
        mediaType: type,
        fileSize: size,
      }));

      await noticeFileUrlMutate(fileInfoList);
    }

    postNoticeMutate(
      { ...noticeData, fileNameList },
      { onSuccess: () => setFileData([]) }
    );
  };

  return { handleNoticePostButtonClick };
};
