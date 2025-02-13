'use client';

import {
  AdmissionTimelineBox,
  ApplicationBox,
  GuidelineBox,
  ScheduleList,
  SimulatorBox,
} from '@/components/main';
import AppLayout from '@/layouts/AppLayout';
import { Row } from '@maru/ui';
import { flex } from '@maru/utils';
import React from 'react';
import styled from 'styled-components';

export default function Home() {
  return (
    <AppLayout header footer>
      <StyledHome>
        <Row gap={80} width="100%" justifyContent="center">
          <AdmissionTimelineBox />
          <ScheduleList />
        </Row>
        <Row gap={48} width="100%" justifyContent="flex-start">
          <GuidelineBox />
          <ApplicationBox />
          <SimulatorBox />
        </Row>
      </StyledHome>
    </AppLayout>
  );
}

const StyledHome = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  gap: 80px;
  padding: 52px 96px 111px;
`;
