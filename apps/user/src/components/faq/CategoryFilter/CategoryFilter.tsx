import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Category from './Category/Category';
import { flex } from '@maru/utils';

interface CategoryFilterProps {
  setCategory: Dispatch<SetStateAction<string>>;
}

const CATEGORY_LIST = [
  { id: 0, category: '질문 TOP', value: 'TOP_QUESTION' },
  { id: 1, category: '입학 과정', value: 'ADMISSION_PROCESS' },
  { id: 2, category: '학교 생활', value: 'SCHOOL_LIFE' },
  { id: 3, category: '관련 서류 제출', value: 'SUBMIT_DOCUMENT' },
];

const CategoryFilter = ({ setCategory }: CategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <StyledCategoryFilter>
      {CATEGORY_LIST.map(({ id, category, value }) => (
        <Category
          key={id}
          isSelected={selectedCategory === id}
          onClick={() => {
            setCategory(value);
            setSelectedCategory(id);
          }}
        >
          {category}
        </Category>
      ))}
    </StyledCategoryFilter>
  );
};

export default CategoryFilter;

const StyledCategoryFilter = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 36px;
  gap: 12px;
  margin: 36px 0 40px;
`;
