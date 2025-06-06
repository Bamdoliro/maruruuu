'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import AppLayout from '@/layouts/AppLayout';
import FaqTable from '@/components/faq/FaqTable/FaqTable';
import { useFaqListQuery } from '@/services/faq/queries';
import { ROUTES } from '@/constants/common/constant';
import { useDebounceInput } from '@maru/hooks';
import { Button, Column, Dropdown, Row, SearchInput, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { ExtendedFaqCategory } from '@/types/faq/client';

const FaqPage = () => {
  const router = useRouter();
  const { data: faqList } = useFaqListQuery();

  const {
    value: faqKeyword,
    onChange: handleFaqKeywordChange,
    debouncedValue: debouncedFaqTitle,
  } = useDebounceInput({ initialValue: '' });

  const [selectedCategory, setSelectedCategory] =
    useState<ExtendedFaqCategory>('ALL_FAQS');

  const handleMoveFaqCreatePage = () => {
    router.push(ROUTES.FAQ_CREATE);
  };

  const handleChangeFaqCategory = (value: string) => {
    setSelectedCategory(value as ExtendedFaqCategory);
  };

  const filteredFaqList = useMemo(() => {
    const byCategory =
      selectedCategory === 'ALL_FAQS'
        ? faqList
        : faqList?.filter((item) => item.category === selectedCategory);

    return byCategory?.filter((item) =>
      (item.title ?? '').toLowerCase().includes(debouncedFaqTitle.toLowerCase())
    );
  }, [faqList, selectedCategory, debouncedFaqTitle]);

  return (
    <AppLayout>
      <StyledFaqPage>
        <Text fontType="H1">자주 묻는 질문</Text>
        <Column gap={36}>
          <Row justifyContent="space-between" alignItems="center">
            <Row gap={16}>
              <SearchInput
                width={280}
                placeholder="검색어를 입력하세요"
                value={faqKeyword}
                onChange={handleFaqKeywordChange}
              />
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
          <FaqTable faqList={filteredFaqList ?? []} />
        </Column>
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
  padding: 64px 60px 0 60px;
`;
