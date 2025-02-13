'use client';

import { CategoryFilter, FaqList } from '@/components/faq';
import AppLayout from '@/layouts/AppLayout';
import { color } from '@maru/design-system';
import { Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { Suspense, useState } from 'react';
import styled from 'styled-components';

const Faq = () => {
  const [category, setCategory] = useState('TOP_QUESTION');

  return (
    <AppLayout header footer>
      <StyledFaq>
        <Text fontType="H1" color={color.gray900}>
          자주 묻는 질문
        </Text>
        <CategoryFilter setCategory={setCategory} />
        <Suspense fallback={<Loader />}>
          <FaqList category={category} />
        </Suspense>
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
