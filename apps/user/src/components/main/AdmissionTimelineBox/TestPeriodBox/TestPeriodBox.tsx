import { Button, Column, Text } from '@maru/ui';
import { useSchoolRecruitDate } from './TestPeriodBox.hook';
import { color } from '@maru/design-system';
import styled from '@emotion/styled';
import { flex } from '@maru/utils';

const TestPeriodBox = () => {
  const { applicationStart, applicationEnd, handleMoveFormPage } = useSchoolRecruitDate();

  return (
    <StyledApplicationPeriodBox>
      <Column gap={36}>
        <Text fontType="H1" color={color.white}>
          테스트 진행 중입니다.
        </Text>
        <Text fontType="p2" color={color.gray300}>
          자세한 사항은 공지사항을 확인해 주세요.
          <br />
          원서 접수 가능 기간: {applicationStart} ~ {applicationEnd}
        </Text>
      </Column>
      <Button width={250} size="LARGE" styleType="PRIMARY" onClick={handleMoveFormPage}>
        원서 작성하기
      </Button>
    </StyledApplicationPeriodBox>
  );
};

export default TestPeriodBox;

const StyledApplicationPeriodBox = styled.div`
  ${flex({ justifyContent: 'space-between', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
