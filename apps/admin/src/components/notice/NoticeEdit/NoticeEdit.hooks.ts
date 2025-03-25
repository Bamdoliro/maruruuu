import {
  useNoticeFileUrlMutation,
  usePutNoticeMutation,
} from '@/services/notice/mutations';
import { useNoticeFileStore } from '@/store/notice/noticeFile';
import type { NoticeInput } from '@/types/notice/client';
import { useState, useEffect, useRef, ChangeEventHandler } from 'react';
import { useNoticeDetailQuery } from '@/services/notice/queries';
import { resizeTextarea } from '@/utils';

export const useNoticeEditData = (id: number) => {
  const { data: noticeDetailData } = useNoticeDetailQuery(id);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [noticeData, setNoticeData] = useState<NoticeInput>({
    title: '',
    content: '',
    fileNameList: [],
  });

  useEffect(() => {
    if (noticeDetailData) {
      setNoticeData({
        title: noticeDetailData.title,
        content: noticeDetailData.content,
        fileNameList: noticeDetailData.fileList?.map((file) => file.fileName) ?? [],
      });
    }
  }, [noticeDetailData]);

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

export const useNoticeEditAction = (id: number, noticeData: NoticeInput) => {
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
