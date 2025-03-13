import { usePostFaqMutation } from '@/services/faq/mutations';
import { FaqInput } from '@/types/faq/client';

export const useFaqCreateAction = (faqData: FaqInput) => {
  const { postFaqMutate } = usePostFaqMutation();

  const handleFaqCreateButtonClick = () => {
    postFaqMutate(faqData);
  };

  return { handleFaqCreateButtonClick };
};
