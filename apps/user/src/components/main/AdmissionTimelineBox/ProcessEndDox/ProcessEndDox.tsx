import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { processEnd } from './ProcessEndDox.helper';

const ProcessEndBox = () => {
  const { today, startDate, overDay } = processEnd();

  return (
    <StyledDdayBox>
      <Column gap={16}>
        <Column gap={8}>
          <Text fontType="H2" color={color.gray400}>
            입학 전형 종료
          </Text>
          <Text fontType="D1" color={color.white}>
            {overDay}
          </Text>
        </Column>
        <Text fontType="p1" color={color.gray300}>
          {startDate} ~ {today}
        </Text>
      </Column>
    </StyledDdayBox>
  );
};

export default ProcessEndBox;

const StyledDdayBox = styled.div`
  ${flex({ justifyContent: 'space-between', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
