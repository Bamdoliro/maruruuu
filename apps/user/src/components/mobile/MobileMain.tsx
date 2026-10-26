import { color } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useMobile } from './Mobile.hook';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { formatResultDateTime, formatYear } from '@/utils';
import { useSchedule } from '@/services/schedule/queries';

dayjs.extend(isBetween);

const MobileMain = () => {
  const schedule = useSchedule();
  const { handleMoveStep } = useMobile('RESULT');
  const now = dayjs();
  const first = now.isBetween(schedule.일차_합격_발표, schedule.이차_면접);
  const final = now.isBetween(schedule.최종_합격_발표, schedule.입학_등록);

  return (
    <StyledMobileMain>
      <Column alignItems="center" gap={36.4}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/svg/maruLogo.svg" width={152} height={46} alt="logo" loading="lazy" />
        <Column alignItems="center" gap={40}>
          <Column alignItems="center" gap={4}>
            <Text fontType="p3" color={color.gray900}>
              {formatYear(schedule.원서_접수, true)}학년도 부산소프트웨어마이스터고등학교
            </Text>
            <Text fontType="H3" color={color.gray900}>
              {first && '1차 합격자 발표'}
              {final && '최종 합격자 발표'}
            </Text>
          </Column>
          <MainBox>
            <Text fontType="p3" color={color.gray700}>
              일시: {first && formatResultDateTime(schedule.일차_합격_발표)}
              {final && formatResultDateTime(schedule.최종_합격_발표)}
            </Text>
            <Text fontType="p3" color={color.gray700}>
              모집 정원:{' '}
              {first && (
                <>
                  일반전형 및 특별전형 각각
                  <br />
                  모집정원의 130% 이내
                </>
              )}
              {final && <> 일반전형 48명, 특별전형 16명 </>}
            </Text>
            <Text fontType="p3" color={color.gray700}>
              장소: 본교 입학전형 서비스 (마루)
            </Text>
          </MainBox>
        </Column>
      </Column>
      <Button size="SMALL" onClick={handleMoveStep}>
        결과 확인하기
      </Button>
    </StyledMobileMain>
  );
};

export default MobileMain;

const StyledMobileMain = styled.div`
  ${flex({
    flexDirection: 'column',
    alignItems: 'center',
  })}
  width: 100%;
  height: 100%;
  padding: 44.1% 20px 27% 20px;
  gap: 40px;
  background: ${color.white};
`;

const MainBox = styled.div`
  ${flex({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  })}
  width: calc(100vw - 40px);
  height: 152px;
  padding: 20px 58.5px;
  border-radius: 12px;
  gap: 12px;
  background-color: ${color.gray50};
`;
