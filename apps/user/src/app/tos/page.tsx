'use client';

import { AppLayout } from '@/layouts';
import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import styled from '@emotion/styled';
import Chapter01 from './Chapter01/Chapter01';
import Chapter02 from './Chapter02/Chapter02';
import Chapter03 from './Chapter03/Chapter03';
import Chapter04 from './Chapter04/Chapter04';
import Appendix from './Appendix/Appendix';

type Font = keyof typeof font;

const Tos = () => {
  return (
    <AppLayout header footer>
      <StyledTos>
        <Text fontType="H1" color={color.gray900}>
          이용약관
        </Text>
        <Column alignItems="center" style={{ marginBottom: '39px' }}>
          <Divider />
          <StyledText fontType="H1" color={color.gray900}>
            부산소프트웨어마이스터고등학교 이용약관
          </StyledText>
        </Column>
        <Column gap={36}>
          <Chapter01 />
          <Chapter02 />
          <Chapter03 />
          <Chapter04 />
          <Appendix />
        </Column>
      </StyledTos>
    </AppLayout>
  );
};

export default Tos;

const StyledTos = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 205px 114px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray400};
  margin-top: 24px;
  margin-bottom: 28px;
`;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
