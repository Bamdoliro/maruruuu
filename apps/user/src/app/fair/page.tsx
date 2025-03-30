'use client';

import { FairCategory, FairContent } from '@/components/fair';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useState } from 'react';
import styled from 'styled-components';

const Fair = () => {
  const [category, setCategory] = useState('진행 중인 신청');

  const handleTabClick = (name: string) => {
    setCategory(name);
  };

  return (
    <AppLayout header footer>
      <StyledFair>
        <Column>
          <Text fontType="H1" color={color.gray900}>
            2024학년도 부산소프트웨어마이스터고등학교
          </Text>
          <Text fontType="H1" color={color.gray900}>
            입학전형 설명회 참가 신청
          </Text>
        </Column>
        <FairCategory selectedTab={category} handleTabClick={handleTabClick} />
        <FairContent category={category} />
      </StyledFair>
    </AppLayout>
  );
};

export default Fair;

const StyledFair = styled.div`
  ${flex({ flexDirection: 'column' })}
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 82px 312px 158px;
`;
