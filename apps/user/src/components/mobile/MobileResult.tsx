import { color } from '@maru/design-system';
import { Column } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import FirstResult from './MobileResult/first/FirstResult';
import FinalResult from './MobileResult/final/FinalResult';
import { useSchedule } from '@/services/schedule/queries';

dayjs.extend(isBetween);

const MobileResult = () => {
  const schedule = useSchedule();
  const now = dayjs();

  return (
    <StyledMobileResult>
      <Column gap={36.4} alignItems="center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/svg/maruLogo.svg" width={152} height={46} alt="logo" loading="lazy" />
        {now.isBetween(schedule.일차_합격_발표, schedule.이차_면접) && <FirstResult />}
        {now.isBetween(schedule.최종_합격_발표, schedule.입학_등록) && <FinalResult />}
      </Column>
    </StyledMobileResult>
  );
};

export default MobileResult;

const StyledMobileResult = styled.div`
  ${flex({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  width: 100%;
  height: 100%;
  padding: 43.5% 20px 27% 20px;
  background: ${color.white};
`;
