import { usePutFaqMutation } from '@/services/faq/mutations';
import type { FaqInput } from '@/types/faq/client';

export const useFaqEditAction = (id: number, faqData: FaqInput) => {
  const { putFaqMutate } = usePutFaqMutation(id);

  const handleFaqEditButtonClick = () => {
    putFaqMutate(faqData);
  };

  return {
    handleFaqEditButtonClick,
  };
};
