'use client';

import { Box } from '@/components/policy';
import { AppLayout } from '@/layouts';
import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import styled from '@emotion/styled';
import Chpater01 from './Chapter01/Chapter01';
import Chpater02 from './Chapter02/Chapter02';
import Chpater03 from './Chapter03/Chapter03';
import Chpater04 from './Chapter04/Chapter04';
import Chpater05 from './Chapter05/Chapter05';
import Chpater06 from './Chapter06/Chapter06';
import Chpater07 from './Chapter07/Chapter07';
import Chpater08 from './Chapter08/Chapter08';
import Chpater09 from './Chapter09/Chapter09';
import Chpater10 from './Chapter10/Chapter10';
import Chpater11 from './Chapter11/Chapter11';

type Font = keyof typeof font;

const Privacy = () => {
  return (
    <AppLayout header footer>
      <StyledTos>
        <Text fontType="H1" color={color.gray900}>
          개인정보처리방침
        </Text>
        <Column alignItems="center" gap={28} style={{ marginBottom: '28px' }}>
          <Divider />
          <StyledText fontType="H1" color={color.gray900}>
            부산소프트웨어마이스터고등학교 개인정보처리방침
          </StyledText>
          <Box color={color.gray100}>
            <StyledText fontType="p2" color={color.gray900}>
              <span style={{ color: color.maruDefault }}>
                부산소프트웨어마이스터고등학교(이하 ‘우리학교’ )
              </span>
              는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한
              고충을 신속하고 원활하게 처리할 수 있도록 다음과 같은 개인정보처리방침을
              두고 있습니다.
            </StyledText>
          </Box>
        </Column>
        <Column gap={36}>
          <Chpater01 />
          <Chpater02 />
          <Chpater03 />
          <Chpater04 />
          <Chpater05 />
          <Chpater06 />
          <Chpater07 />
          <Chpater08 />
          <Chpater09 />
          <Chpater10 />
          <Chpater11 />
        </Column>
      </StyledTos>
    </AppLayout>
  );
};

export default Privacy;

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
`;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
