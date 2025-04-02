import { useState, useRef, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { usePutFaqMutation } from '@/services/faq/mutations';
import { useFaqDetailQuery } from '@/services/faq/queries';
import { resizeTextarea } from '@/utils';
import type { FaqCategory, FaqInput } from '@/types/faq/client';

export const useFaqEditData = (id: number) => {
  const { data: faqDetailData } = useFaqDetailQuery(id);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [faqData, setFaqData] = useState<FaqInput>({
    title: '',
    content: '',
    category: 'SCHOOL_LIFE',
  });

  useEffect(() => {
    if (faqDetailData) {
      setFaqData({
        title: faqDetailData.title,
        content: faqDetailData.content,
        category: faqDetailData.category,
      });
    }
  }, [faqDetailData]);

  const handleFaqDataChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFaqData((prev) => ({ ...prev, [name]: value }));

    if (name === 'content') {
      resizeTextarea(contentTextareaRef);
    }
  };

  const handleFaqCategoryChange = (value: string) => {
    setFaqData((prev) => ({ ...prev, category: value as FaqCategory }));
  };

  useEffect(() => resizeTextarea(contentTextareaRef), []);

  return {
    faqData,
    setFaqData,
    contentTextareaRef,
    handleFaqDataChange,
    handleFaqCategoryChange,
  };
};

export const useFaqEditAction = (id: number, faqData: FaqInput) => {
  const { putFaqMutate } = usePutFaqMutation(id);

  const handleFaqEditButtonClick = () => {
    putFaqMutate(faqData);
  };

  return {
    handleFaqEditButtonClick,
  };
};
