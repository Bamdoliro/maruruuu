import { FAQ_CATEGORY, FAQ_CATEGORY_OPTIONS } from '@/constants/faq/constant';
import { color, font } from '@maru/design-system';
import { Button, Column, Dropdown, Row } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useFaqCreateAction, useFaqCreateData } from './faqCreate.hooks';
import { FaqCategory } from '@/types/faq/client';

const FaqCreate = () => {
  const { faqData, contentTextareaRef, handleFaqDataChange, handleFaqCategoryChange } =
    useFaqCreateData();

  const { handleFaqCreateButtonClick } = useFaqCreateAction(faqData);

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
              생성하기
            </Button>
          </Row>
          <Dropdown
            name="category"
            data={FAQ_CATEGORY_OPTIONS}
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
