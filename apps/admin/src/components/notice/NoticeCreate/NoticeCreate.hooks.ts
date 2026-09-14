import {
  usePostNoticeMutation,
  useNoticeFileUrlMutation,
} from '@/services/notice/mutations';
import { noticeFileAtom } from '@/store';
import { useAtom } from 'jotai';
import type { NoticeInput } from '@/types/notice/client';
import { resizeTextarea } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useNoticeCreateData = () => {
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [noticeData, setNoticeData] = useState<NoticeInput>({
    title: '',
    content: '',
    fileNameList: [],
  });

  const handleNoticeDataChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setNoticeData((prev) => ({ ...prev, [name]: value }));

    if (name === 'content') {
      resizeTextarea(contentTextareaRef);
    }
  };

  useEffect(() => resizeTextarea(contentTextareaRef), []);

  return {
    noticeData,
    setNoticeData,
    contentTextareaRef,
    handleNoticeDataChange,
  };
};

export const useNoticeCreateAction = (noticeData: NoticeInput) => {
  const { postNoticeMutate } = usePostNoticeMutation();
  const { noticeFileUrlMutateAsync } = useNoticeFileUrlMutation();
  const [fileData, setFileData] = useAtom(noticeFileAtom);

  const handleNoticeCreateButtonClick = async () => {
    let fileNameList: string[] | null = noticeData.fileNameList?.length
      ? noticeData.fileNameList
      : null;

    if (fileData?.length) {
      const responseList = await noticeFileUrlMutateAsync(fileData);
      if (responseList?.length) {
        fileNameList = responseList.map((file) => file.fileName);
      }
    }

    postNoticeMutate(
      { ...noticeData, fileNameList },
      { onSuccess: () => setFileData([]) },
    );
  };

  return { handleNoticeCreateButtonClick };
};
