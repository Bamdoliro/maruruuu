import { useFaqListQuery } from '@/services/faq/queries';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import FaqItem from './FaqItem/FaqItem';
import { useEffect, useState } from 'react';

interface FaqListProps {
  category: string;
}

const FaqList = ({ category }: FaqListProps) => {
  const { data: faqListData } = useFaqListQuery(category);
  const [openIdex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setOpenIndex(null);
  }, [category]);

  const handleOnToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <StyledFaqList>
      {faqListData.map(({ title, content }, index) => (
        <FaqItem
          key={index}
          title={title}
          content={content}
          isOpen={openIdex === index}
          onToggle={() => handleOnToggle(index)}
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
