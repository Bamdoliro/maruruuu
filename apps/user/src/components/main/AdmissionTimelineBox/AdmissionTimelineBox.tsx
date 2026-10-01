'use client';

import styled from '@emotion/styled';
import { flex } from '@maru/utils';
import DdayBox from './DdayBox/DdayBox';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import ProcessEndBox from './ProcessEndDox/ProcessEndDox';
import ApplicationPeriodBox from './ApplicationPeriodBox/ApplicationPeriodBox';
import TestPeriodBox from './TestPeriodBox/TestPeriodBox';
import { SCHEDULE, FLAG } from '@/constants/common/constants';

dayjs.extend(isBetween);

const AdmissionTimelineBox = () => {
  const isTestEnabled = FLAG.테스트_진행;
  const isSubmitPeriod = dayjs().isBetween(SCHEDULE.원서_접수, SCHEDULE.원서_접수_마감);
  const isAfterRegistrationEnd = dayjs().isAfter(SCHEDULE.입학_등록_마감);

  const renderTimelineContent = () => {
    if (isTestEnabled) return <TestPeriodBox />;
    if (isAfterRegistrationEnd) return <ProcessEndBox />;
    if (isSubmitPeriod) return <ApplicationPeriodBox />;
    return <DdayBox />;
  };

  return (
    <StyledAdmissionTimelineBox>{renderTimelineContent()}</StyledAdmissionTimelineBox>
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
  background: rgba(0, 0, 0, 0.65) url('/images/school_background.webp');
  background-repeat: no-repeat;
  background-position: center right;
  background-size: cover;
  background-blend-mode: darken;
`;
