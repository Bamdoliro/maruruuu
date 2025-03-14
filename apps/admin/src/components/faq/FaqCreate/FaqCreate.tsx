import { FAQ_CATEGORY } from '@/constants/faq/constant';
import { useFaqDetailQuery } from '@/services/faq/queries';
import { resizeTextarea } from '@/utils';
import { color, font } from '@maru/design-system';
import { Button, Column, Dropdown, Row } from '@maru/ui';
import { flex } from '@maru/utils';
import type { ChangeEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFaqCreateAction } from './faqCreate.hooks';
import { FaqCategory, FaqInput } from '@/types/faq/client';

const FaqCreate = () => {
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [faqData, setFaqData] = useState<FaqInput>({
    title: '',
    content: '',
    category: '',
  });

  const { handleFaqCreateButtonClick } = useFaqCreateAction(faqData);

  const handleFaqDataChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value });

    resizeTextarea(contentTextareaRef);
  };

  const handleFaqCategoryChange = (value: string, name: string) => {
    setFaqData({ ...faqData, [name]: value });
  };

  useEffect(() => resizeTextarea(contentTextareaRef), []);

  return (
    <StyledFaqCreate>
      <Column gap={36}>
        <FaqCreateHeader>
          <Row justifyContent="space-between" alignItems="center">
            <TitleInput
              name="title"
              value={faqData.title}
              onChange={handleFaqDataChange}
              placeholder="제목을 입력해주세요"
            />
            <Button size="SMALL" onClick={handleFaqCreateButtonClick}>
              수정하기
            </Button>
          </Row>
          <Dropdown
            name="category"
            data={[
              { value: 'SCHOOL_LIFE', label: '학교생활' },
              { value: 'SUBMIT_DOCUMENT', label: '관련 제출 서류' },
              { value: 'ADMISSION_PROCESS', label: '입학 과정' },
              { value: 'TOP_QUESTION', label: '질문 TOP' },
            ]}
            size="SMALL"
            width={140}
            value={FAQ_CATEGORY[faqData.category as FaqCategory]}
            placeholder="카테고리"
            onChange={handleFaqCategoryChange}
          />
        </FaqCreateHeader>
        <ContentTextarea
          ref={contentTextareaRef}
          name="content"
          value={faqData.content}
          onChange={handleFaqDataChange}
          placeholder="내용을 작성해주세요."
          rows={1}
        />
      </Column>
    </StyledFaqCreate>
  );
};

export default FaqCreate;

const StyledFaqCreate = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 36px;
`;

const FaqCreateHeader = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 16px;
  border-bottom: 1px solid ${color.gray200};
  padding-bottom: 16px;
`;

const TitleInput = styled.input`
  ${font.H1}
  color: ${color.gray900};
  width: 100%;

  &::placeholder {
    color: ${color.gray400};
  }
`;

const ContentTextarea = styled.textarea`
  ${font.p2};
  color: ${color.gray900};

  &::placeholder {
    color: ${color.gray500};
  }
  resize: none;
`;
