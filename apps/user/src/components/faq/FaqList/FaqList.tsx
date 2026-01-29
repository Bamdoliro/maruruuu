import { useFaqListQuery } from '@/services/faq/queries';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import FaqItem from './FaqItem/FaqItem';
import { useEffect, useState } from 'react';

interface FaqListProps {
  category: string;
}

const FaqList = ({ category }: FaqListProps) => {
  const { data: faqListData } = useFaqListQuery(category);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setOpenIndex(null);
  }, [category]);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <StyledFaqList>
      {faqListData?.map(({ title, content }, index) => (
        <FaqItem
          key={`faq ${index}`}
          title={title}
          content={content}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </StyledFaqList>
  );
};

export default FaqList;

const StyledFaqList = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  position: relative;
`;
