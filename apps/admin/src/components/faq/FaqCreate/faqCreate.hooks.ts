import { usePostFaqMutation } from '@/services/faq/mutations';
import { useState, useRef, useEffect } from 'react';
import { resizeTextarea } from '@/utils';
import type { FaqCategory, FaqInput } from '@/types/faq/client';
import type { ChangeEventHandler } from 'react';

export const useFaqCreateData = () => {
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [faqData, setFaqData] = useState<FaqInput>({
    title: '',
    content: '',
    category: 'SCHOOL_LIFE',
  });

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

export const useFaqCreateAction = (faqData: FaqInput) => {
  const { postFaqMutate } = usePostFaqMutation();

  const handleFaqCreateButtonClick = () => {
    postFaqMutate(faqData);
  };

  return { handleFaqCreateButtonClick };
};
