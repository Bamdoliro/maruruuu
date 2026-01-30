'use client';

import { CategoryFilter, FaqList } from '@/components/faq';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useState } from 'react';
import styled from '@emotion/styled';

const Faq = () => {
  const [category, setCategory] = useState('TOP_QUESTION');

  return (
    <AppLayout header footer>
      <StyledFaq>
        <Text fontType="H1" color={color.gray900}>
          자주 묻는 질문
        </Text>
        <CategoryFilter setCategory={setCategory} />
        <FaqList category={category} />
      </StyledFaq>
    </AppLayout>
  );
};

export default Faq;

const StyledFaq = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  padding: 82px 204px;
`;
