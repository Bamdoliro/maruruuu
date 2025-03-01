import { Th } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

const AttendanceCalculatorHeader = () => {
  return (
    <StyledAttendanceCalculatorHeader>
      <Th borderTopLeftRadius={12} width="20%" height={56}>
        학년
      </Th>
      <Th width="20%" height={56}>
        미인정 결석
      </Th>
      <Th width="20%" height={56}>
        미인정 지각
      </Th>
      <Th width="20%" height={56}>
        미인정 조퇴
      </Th>
      <Th borderTopRightRadius={12} width="20%" height={56}>
        미인정 결과
      </Th>
    </StyledAttendanceCalculatorHeader>
  );
};

export default AttendanceCalculatorHeader;

const StyledAttendanceCalculatorHeader = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
