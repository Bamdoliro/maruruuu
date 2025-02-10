'use client';

import styled from 'styled-components';
import { flex } from '@maru/utils';
import DdayBox from './DdayBox/DdayBox';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { SCHEDULE } from '@/constants/form/constants';
import ProcessEndBox from './ProcessEndDox/ProcessEndDox';
import ApplicationPeriodBox from './ApplicationPeriodBox/ApplicationPeriodBox';

dayjs.extend(isBetween);

const AdmissionTimelineBox = () => {
  const isSubmitPeriod = dayjs().isBetween(SCHEDULE.원서_접수, SCHEDULE.원서_접수_마감);
  const isAfterRegistrationEnd = dayjs().isAfter(SCHEDULE.입학_등록_마감);

  return (
    <StyledAdmissionTimelineBox>
      {isAfterRegistrationEnd ? (
        <ProcessEndBox />
      ) : isSubmitPeriod ? (
        <ApplicationPeriodBox />
      ) : (
        <DdayBox />
      )}
    </StyledAdmissionTimelineBox>
  );
};

export default AdmissionTimelineBox;

const StyledAdmissionTimelineBox = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 450px;
  max-width: 708px;
  border-radius: 32px;
  padding: 60px;
  background: rgba(0, 0, 0, 0.65) url('/images/school_background.png');
  background-repeat: no-repeat;
  background-position: center right;
  background-size: cover;
  background-blend-mode: darken;
`;
