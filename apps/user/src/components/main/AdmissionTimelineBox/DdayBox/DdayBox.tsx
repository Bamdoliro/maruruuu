import { color } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
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
      <Column gap={4}>
        <Text fontType="p2" color={color.gray400}>
          모든 원서 서류는 원서접수 사이트에서 PDF 파일로 최종 제출해야 하며,
        </Text>
        <Text fontType="p2" color={color.gray400}>
          직인 날인 등 필요한 절차를 완료한 원본 서류도 반드시 본교에 제출해야 합니다.
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
