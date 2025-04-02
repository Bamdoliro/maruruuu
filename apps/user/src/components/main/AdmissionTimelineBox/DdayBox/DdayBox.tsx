import { color } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useButtonStatus, useRemainDate } from './DdayBox.hooks';

const DdayBox = () => {
  const { status, remainTime, targetDate } = useRemainDate();
  const { buttonText, buttonStyleType, handleMovePage } = useButtonStatus();

  return (
    <StyledDdayBox>
      <Column gap={16}>
        <Column gap={8}>
          <Text fontType="H2" color={color.gray400}>
            {status}
          </Text>
          <Text fontType="D1" color={color.white}>
            {remainTime}
          </Text>
        </Column>
        <Text fontType="p1" color={color.gray300}>
          {targetDate}
        </Text>
      </Column>
      <Button
        width={250}
        size="LARGE"
        styleType={buttonStyleType}
        onClick={handleMovePage}
      >
        {buttonText}
      </Button>
    </StyledDdayBox>
  );
};

export default DdayBox;

const StyledDdayBox = styled.div`
  ${flex({ justifyContent: 'space-between', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
