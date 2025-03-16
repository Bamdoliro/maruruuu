'use client';

import { useState } from 'react';
import { Button, Column, Dropdown, Row, SearchInput, Text } from '@maru/ui';
import { styled } from 'styled-components';
import AppLayout from '@/layouts/AppLayout';
import FaqTable from '@/components/faq/FaqTable/FaqTable';
import { flex } from '@maru/utils';
import type { ExtendedFaqCategory } from '@/types/faq/client';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constant';

const FaqPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<ExtendedFaqCategory>('ALL_FAQS');

  const handleMoveFaqCreatePage = () => {
    router.push(ROUTES.FAQ_CREATE);
  };

  const handleChangeFaqCategory = (value: string) => {
    setSelectedCategory(value as ExtendedFaqCategory);
  };

  return (
    <AppLayout>
      <StyledFaqPage>
        <Text fontType="H1">자주 묻는 질문</Text>
        <Column gap={36}>
          <Row justifyContent="space-between">
            <Row gap={16}>
              <SearchInput width={280} placeholder="검색어를 입력하세요" />
              <Dropdown
                data={[
                  { value: 'ALL_FAQS', label: '전체 보기' },
                  { value: 'SCHOOL_LIFE', label: '학교 생활' },
                  { value: 'SUBMIT_DOCUMENT', label: '관련 제출 서류' },
                  { value: 'ADMISSION_PROCESS', label: '입학 과정' },
                  { value: 'TOP_QUESTION', label: '질문 TOP' },
                ]}
                size="SMALL"
                width={140}
                placeholder="카테고리"
                onChange={handleChangeFaqCategory}
                name="category"
              />
            </Row>
            <Button size="SMALL" icon="ADD_ICON" onClick={handleMoveFaqCreatePage}>
              자주 묻는 질문 작성
            </Button>
          </Row>
        </Column>
        <FaqTable selectedCategory={selectedCategory} />
      </StyledFaqPage>
    </AppLayout>
  );
};

export default FaqPage;

const StyledFaqPage = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px;
`;
