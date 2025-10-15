'use client';

import {
  AdmissionTimelineBox,
  ApplicationBox,
  FaqBox,
  GuidelineBox,
  NoticeBox,
  ScheduleList,
  SimulationBox,
} from '@/components/main';
import { AppLayout } from '@/layouts';
import { Row } from '@maru/ui';
import { flex } from '@maru/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useOverlay } from '@toss/use-overlay';
import NoticeModal from '@/components/main/NoticeModal/NoticeModal';

const Home = () => {
  const overlay = useOverlay();
  useEffect(() => {
    overlay.open(({ isOpen, close }) => <NoticeModal isOpen={isOpen} onClose={close} />);
  }, [overlay]);

  return (
    <AppLayout header footer>
      <StyledHome>
        <Row gap={80} width="100%" justifyContent="flex-start">
          <AdmissionTimelineBox />
          <ScheduleList />
        </Row>
        <Row gap={48} width="100%" justifyContent="flex-start">
          <GuidelineBox />
          <ApplicationBox />
          <SimulationBox />
        </Row>
        <Row gap={48} width="100%" justifyContent="flex-start">
          <NoticeBox />
          <FaqBox />
        </Row>
      </StyledHome>
    </AppLayout>
  );
};

export default Home;

const StyledHome = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  gap: 80px;
  padding: 52px 96px 146px;
`;
