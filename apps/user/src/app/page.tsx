'use client';

import { AlertStyleModal, NeedLoginModal } from '@/components/main';
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
import { useOverlay } from '@toss/use-overlay';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useCTAButton } from './main.hook';

const Home = () => {
  const searchParams = useSearchParams();
  const overlay = useOverlay();
  const message = searchParams.get('message');
  const warning = searchParams.get('warning');
  const { handleClose, handleConfirm } = useCTAButton();

  useEffect(() => {
    if (message) {
      overlay.open(({ isOpen, close }) => (
        <AlertStyleModal
          title={message}
          isOpen={isOpen}
          onClose={() => {
            close();
            handleClose();
          }}
        />
      ));
    } else if (warning) {
      overlay.open(({ isOpen, close }) => (
        <NeedLoginModal
          isOpen={isOpen}
          onClose={() => {
            close();
            handleClose();
          }}
          onConfirm={handleConfirm}
        />
      ));
    }
  }, [handleClose, handleConfirm, message, overlay, warning]);

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
