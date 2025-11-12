import { color } from '@maru/design-system';
import { Column } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import FirstResult from './MobileResult/first/FirstResult';
import FinalResult from './MobileResult/final/FinalResult';
import { SCHEDULE } from '@/constants/common/constants';

dayjs.extend(isBetween);

const MobileResult = () => {
  const now = dayjs();

  return (
    <StyledMobileResult>
      <Column gap={36.4} alignItems="center">
        <img src="/svg/maruLogo.svg" width={152} height={46} alt="logo" loading="lazy" />
        {now.isBetween(SCHEDULE.일차_합격_발표, SCHEDULE.이차_면접) && <FirstResult />}
        {now.isBetween(SCHEDULE.최종_합격_발표, SCHEDULE.입학_등록) && <FinalResult />}
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
