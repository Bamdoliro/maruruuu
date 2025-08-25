import { Button, Column, Text } from '@maru/ui';
import { useSchoolRecruitDate } from './ApplicationPeriodBox.hook';
import { color } from '@maru/design-system';
import styled from 'styled-components';
import { flex } from '@maru/utils';
import { formatYear } from '@/utils';
import { SCHEDULE } from '@/constants/form/constants';

const ApplicationPeriodBox = () => {
  const { applicationStart, applicationEnd, handleMoveFormPage } = useSchoolRecruitDate();

  return (
    <StyledApplicationPeriodBox>
      <Column gap={36}>
        <Text fontType="H1" color={color.white}>
          부산소프트웨어마이스터고등학교 <br />
          {formatYear(SCHEDULE.원서_접수, true)}학년도 신입생 모집
        </Text>
        <Text fontType="p2" color={color.gray300}>
          {applicationStart} ~ {applicationEnd}
        </Text>
      </Column>
      <Button width={250} size="LARGE" styleType="PRIMARY" onClick={handleMoveFormPage}>
        원서 작성하기
      </Button>
    </StyledApplicationPeriodBox>
  );
};

export default ApplicationPeriodBox;

const StyledApplicationPeriodBox = styled.div`
  ${flex({ justifyContent: 'space-between', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
